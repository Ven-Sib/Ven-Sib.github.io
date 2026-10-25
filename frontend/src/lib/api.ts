export type Post = {
  id: number;
  kind: string; // "text" | "video" | "leetcode" | "link"
  title: string;
  body: string;
  url: string;
  external_id: string | null;
  tags: string;
  created_at: string;
};

export const API_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:8000';

export async function fetchPosts(limit = 60): Promise<Post[]> {
  const res = await fetch(`${API_URL}/api/posts?limit=${limit}`);
  if (!res.ok) throw new Error(`API returned ${res.status}`);
  return res.json();
}

function checkAuth(res: Response) {
  if (res.status === 401) throw new Error('Wrong admin token');
  if (res.status === 429) throw new Error('Too many wrong attempts. Wait a few minutes and try again.');
}

/** Asks the server whether this token is correct. Resolves only if it is. */
export async function verifyAdmin(token: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/admin/verify`, { method: 'POST', headers: adminHeaders(token) });
  checkAuth(res);
  if (!res.ok) throw new Error(`Server error (${res.status})`);
}

function adminHeaders(token: string) {
  return { 'Content-Type': 'application/json', 'X-Admin-Token': token };
}

export async function createPost(
  token: string,
  data: { kind: string; title: string; body: string; url: string; tags: string }
): Promise<Post> {
  const res = await fetch(`${API_URL}/api/posts`, {
    method: 'POST',
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  checkAuth(res);
  if (!res.ok) throw new Error(`Could not create post (${res.status})`);
  return res.json();
}

export async function deletePost(token: string, id: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/posts/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(token),
  });
  checkAuth(res);
  if (!res.ok) throw new Error(`Could not delete (${res.status})`);
}

export async function syncNow(token: string): Promise<Record<string, unknown>> {
  const res = await fetch(`${API_URL}/api/sync`, { method: 'POST', headers: adminHeaders(token) });
  checkAuth(res);
  if (!res.ok) throw new Error(`Sync failed (${res.status})`);
  return res.json();
}

// backend sometimes sends UTC without a trailing "Z"; treat it as UTC
export function parseDate(iso: string): Date {
  return new Date(/[zZ]|[+-]\d\d:\d\d$/.test(iso) ? iso : iso + 'Z');
}

export function timeAgo(iso: string): string {
  const d = parseDate(iso);
  const s = Math.max(1, Math.floor((Date.now() - d.getTime()) / 1000));
  const steps: [number, string][] = [[31536000, 'y'], [2592000, 'mo'], [86400, 'd'], [3600, 'h'], [60, 'm']];
  for (const [n, label] of steps) if (s >= n) return `${Math.floor(s / n)}${label} ago`;
  return 'just now';
}
