from datetime import datetime, timezone
from typing import Optional

from sqlmodel import Field, SQLModel


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Post(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    # "text" | "video" | "leetcode"
    kind: str = Field(index=True)
    title: str
    body: str = ""
    url: str = ""
    # e.g. YouTube video id or LeetCode submission id; unique per kind so syncs never duplicate
    external_id: Optional[str] = Field(default=None, index=True)
    tags: str = ""  # comma separated
    created_at: datetime = Field(default_factory=utcnow, index=True)


class PostIn(SQLModel):
    kind: str = "text"  # "text" | "video" | "link"
    title: str = ""
    body: str = ""
    url: str = ""
    tags: str = ""
