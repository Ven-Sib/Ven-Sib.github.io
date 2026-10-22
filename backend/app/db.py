from sqlmodel import Session, SQLModel, create_engine

from .config import settings


def _normalise(url: str) -> str:
    """Neon/Render hand out postgres:// or postgresql:// URLs; SQLAlchemy needs the driver name."""
    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://"):]
    if url.startswith("postgresql://"):
        url = "postgresql+psycopg://" + url[len("postgresql://"):]
    return url


db_url = _normalise(settings.database_url)
is_sqlite = db_url.startswith("sqlite")
engine = create_engine(
    db_url,
    connect_args={"check_same_thread": False} if is_sqlite else {},
    pool_pre_ping=True,   # re-connect if the free database was suspended
    pool_recycle=300,
)


def init_db() -> None:
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
