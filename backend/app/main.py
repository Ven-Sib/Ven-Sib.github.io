import asyncio
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import Depends, FastAPI, Header, HTTPException
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


def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    if x_admin_token != settings.admin_token:
        raise HTTPException(status_code=401, detail="Invalid admin token")


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
