import asyncio
import secrets
import time
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import Depends, FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from .config import settings
from .db import engine, get_session, init_db
from .models import Post, PostIn
from .sync import enrich_post_in, run_sync


async def sync_loop():
    while True:
        def job():
            with Session(engine) as s:
                return run_sync(s)

        await asyncio.to_thread(job)
        await asyncio.sleep(settings.sync_interval_minutes * 60)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    task = asyncio.create_task(sync_loop())
    yield
    task.cancel()


app = FastAPI(title="Portfolio API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip().rstrip("/") for o in settings.frontend_origin.split(",") if o.strip()],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- admin protection -------------------------------------------------------
# The real protection is a long random ADMIN_TOKEN, compared in constant time.
# On top of that, repeated wrong guesses from one address are slowed down.
MAX_FAILS = 8        # wrong tokens allowed ...
FAIL_WINDOW = 600    # ... per 10 minutes, per address
_fails: dict[str, deque] = defaultdict(deque)


def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:  # the last entry is the one added by the host's own proxy
        return fwd.split(",")[-1].strip()
    return request.client.host if request.client else "unknown"


def require_admin(request: Request, x_admin_token: Optional[str] = Header(default=None)):
    ip = _client_ip(request)
    now = time.monotonic()
    q = _fails[ip]
    while q and now - q[0] > FAIL_WINDOW:
        q.popleft()
    if len(q) >= MAX_FAILS:
        raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in a few minutes.")
    supplied = (x_admin_token or "").encode()
    if not secrets.compare_digest(supplied, settings.admin_token.encode()):
        q.append(now)
        raise HTTPException(status_code=401, detail="Invalid admin token")


@app.post("/api/admin/verify", dependencies=[Depends(require_admin)])
def admin_verify():
    """Used by the admin lock screen: 200 only if the token is correct."""
    return {"ok": True}


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/posts")
def list_posts(kind: Optional[str] = None, limit: int = 30, offset: int = 0,
               session: Session = Depends(get_session)):
    q = select(Post).order_by(Post.created_at.desc()).offset(offset).limit(min(limit, 100))
    if kind:
        q = q.where(Post.kind == kind)
    return session.exec(q).all()


@app.post("/api/posts", dependencies=[Depends(require_admin)])
def create_post(data: PostIn, session: Session = Depends(get_session)):
    data = enrich_post_in(data)
    if not data.title:
        raise HTTPException(422, "title is required")
    post = Post(**data.model_dump())
    session.add(post)
    session.commit()
    session.refresh(post)
    return post


@app.delete("/api/posts/{post_id}", dependencies=[Depends(require_admin)])
def delete_post(post_id: int, session: Session = Depends(get_session)):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(404, "Not found")
    session.delete(post)
    session.commit()
    return {"deleted": post_id}


@app.post("/api/sync", dependencies=[Depends(require_admin)])
def sync_now(session: Session = Depends(get_session)):
    return run_sync(session)
