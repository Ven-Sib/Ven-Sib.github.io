import { useEffect, useState } from 'react';
import { fetchPosts, type Post } from './api';

/**
 * Loads posts. The free hosting puts the API to sleep when nobody visits, and waking it
 * takes about a minute — so on failure we keep retrying instead of giving up immediately.
 *   waking = true  -> show "server is waking up…"
 *   error  = true  -> gave up after ~2 minutes
 */
export function usePosts(limit = 100) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState(false);
  const [waking, setWaking] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;
    const slowTimer = window.setTimeout(() => { if (!cancelled) setWaking(true); }, 3000);

    async function attempt(n: number) {
      try {
        const data = await fetchPosts(limit);
        if (cancelled) return;
        setPosts(data); setWaking(false); setError(false);
      } catch {
        if (cancelled) return;
        if (n >= 20) { setWaking(false); setError(true); return; }
        timer = window.setTimeout(() => attempt(n + 1), 6000);
      }
    }
    attempt(0);
    return () => { cancelled = true; clearTimeout(timer); clearTimeout(slowTimer); };
  }, [limit]);

  return { posts, error, waking };
}
