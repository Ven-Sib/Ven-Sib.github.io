"""Pulls external activity (YouTube, LeetCode) into the posts table."""
import re
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

import httpx
from sqlmodel import Session, select

from .config import settings
from .models import Post, PostIn

NS = {
    "a": "http://www.w3.org/2005/Atom",
    "yt": "http://www.youtube.com/xml/schemas/2015",
    "media": "http://search.yahoo.com/mrss/",
}


def parse_youtube_feed(xml_text: str) -> list[dict]:
    root = ET.fromstring(xml_text)
    items = []
    for entry in root.findall("a:entry", NS):
        vid = entry.findtext("yt:videoId", namespaces=NS)
        published = entry.findtext("a:published", namespaces=NS)
        desc = entry.findtext("media:group/media:description", default="", namespaces=NS)
        items.append(
            {
                "kind": "video",
                "external_id": vid,
                "title": entry.findtext("a:title", default="", namespaces=NS),
                "body": (desc or "")[:500],
                "url": f"https://www.youtube.com/watch?v={vid}",
                "created_at": datetime.fromisoformat(published.replace("Z", "+00:00")),
            }
        )
    return items


LEETCODE_QUERY = """
query recent($username: String!, $limit: Int!) {
  recentAcSubmissionList(username: $username, limit: $limit) {
    id title titleSlug timestamp
  }
}
"""


def parse_leetcode(data: dict) -> list[dict]:
    items = []
    for s in (data.get("data") or {}).get("recentAcSubmissionList") or []:
        items.append(
            {
                "kind": "leetcode",
                "external_id": str(s["id"]),
                "title": s["title"],
                "body": "Solved on LeetCode / NeetCode",
                "url": f"https://leetcode.com/problems/{s['titleSlug']}/",
                "created_at": datetime.fromtimestamp(int(s["timestamp"]), tz=timezone.utc),
            }
        )
    return items


def fetch_youtube() -> list[dict]:
    if not settings.youtube_channel_id:
        return []
    url = f"https://www.youtube.com/feeds/videos.xml?channel_id={settings.youtube_channel_id}"
    r = httpx.get(url, timeout=15)
    r.raise_for_status()
    return parse_youtube_feed(r.text)


def fetch_leetcode() -> list[dict]:
    if not settings.leetcode_username:
        return []
    r = httpx.post(
        "https://leetcode.com/graphql",
        json={"query": LEETCODE_QUERY, "variables": {"username": settings.leetcode_username, "limit": 20}},
        headers={"Referer": "https://leetcode.com"},
        timeout=15,
    )
    r.raise_for_status()
    return parse_leetcode(r.json())


def save_new(session: Session, items: list[dict]) -> int:
    added = 0
    for item in items:
        ca = item.get("created_at")
        if ca is not None and ca.tzinfo is None:  # always store timezone-aware UTC
            item["created_at"] = ca.replace(tzinfo=timezone.utc)
        exists = session.exec(
            select(Post).where(Post.kind == item["kind"], Post.external_id == item["external_id"])
        ).first()
        if not exists:
            session.add(Post(**item))
            added += 1
    session.commit()
    return added


def run_sync(session: Session) -> dict:
    result = {}
    for name, fetcher in (("youtube", fetch_youtube), ("leetcode", fetch_leetcode)):
        try:
            result[name] = save_new(session, fetcher())
        except Exception as e:  # one source failing must not break the other
            result[name] = f"error: {e}"
    return result


YT_ID = re.compile(r"(?:v=|youtu\.be/|shorts/|embed/)([A-Za-z0-9_-]{11})")


def youtube_id(url: str) -> str | None:
    m = YT_ID.search(url or "")
    return m.group(1) if m else None


def enrich_post_in(data: PostIn) -> PostIn:
    """For video posts: normalise the URL and fetch the title from YouTube if you left it empty."""
    if data.kind == "video":
        vid = youtube_id(data.url)
        if vid:
            data.url = f"https://www.youtube.com/watch?v={vid}"
            if not data.title:
                try:
                    r = httpx.get("https://www.youtube.com/oembed",
                                  params={"url": data.url, "format": "json"}, timeout=10)
                    data.title = r.json().get("title", "")
                except Exception:
                    data.title = "YouTube video"
    return data
