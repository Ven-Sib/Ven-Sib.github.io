import { useCallback, useEffect, useState } from 'react';
import { createPost, deletePost, fetchPosts, syncNow, timeAgo, type Post } from '../lib/api';

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token') ?? '');
  const [kind, setKind] = useState('video');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [msg, setMsg] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  const load = useCallback(() => { fetchPosts(100).then(setPosts).catch(() => setMsg('Backend not reachable')); }, []);
  useEffect(load, [load]);
  useEffect(() => { sessionStorage.setItem('admin_token', token); }, [token]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('Saving…');
    try {
      await createPost(token, { kind, title, body, url, tags });
      setTitle(''); setBody(''); setUrl(''); setTags('');
      setMsg('Posted ✓');
      load();
    } catch (err) { setMsg((err as Error).message); }
  }

  async function remove(id: number) {
    try { await deletePost(token, id); load(); } catch (err) { setMsg((err as Error).message); }
  }

  async function sync() {
    setMsg('Syncing…');
    try { setMsg('Sync result: ' + JSON.stringify(await syncNow(token))); load(); }
    catch (err) { setMsg((err as Error).message); }
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <a href="#top" onClick={() => { window.location.hash = ''; }} className="font-mono text-sm text-mute hover:text-ink">← back to site</a>
      <h1 className="h-display text-4xl mt-6 mb-8">Admin</h1>

      <div className="glass p-6 space-y-3">
        <label className="block text-sm text-mute">Admin token (the ADMIN_TOKEN from backend/.env)</label>
        <input className="input" type="password" value={token} onChange={(e) => setToken(e.target.value)} />
      </div>

      <form onSubmit={submit} className="glass p-6 mt-5 space-y-3">
        <div className="flex gap-2">
          {[['video', 'YouTube video'], ['text', 'Note'], ['link', 'Link']].map(([k, l]) => (
            <button type="button" key={k} onClick={() => setKind(k)} className={`chip chip-btn ${kind === k ? 'active' : ''}`}>{l}</button>
          ))}
        </div>
        {(kind === 'video' || kind === 'link') && (
          <input className="input" placeholder={kind === 'video' ? 'Paste any YouTube URL' : 'https://…'} value={url} onChange={(e) => setUrl(e.target.value)} required />
        )}
        <input className="input" placeholder={kind === 'video' ? 'Title (leave empty to fetch it from YouTube)' : 'Title'} value={title} onChange={(e) => setTitle(e.target.value)} required={kind !== 'video'} />
        <textarea className="input min-h-28" placeholder={kind === 'video' ? 'What did you learn from it? (optional)' : 'Write your note…'} value={body} onChange={(e) => setBody(e.target.value)} />
        <input className="input" placeholder="tags, comma separated (e.g. system-design, aws)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <div className="flex items-center gap-3">
          <button className="btn btn-primary" type="submit">Post</button>
          <button className="btn btn-ghost" type="button" onClick={sync}>Sync LeetCode / channel now</button>
          <span className="text-sm text-mute">{msg}</span>
        </div>
      </form>

      <h2 className="h-display text-2xl mt-10 mb-4">All postings</h2>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id} className="glass !rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            <span className="text-sm min-w-0 truncate"><span className="font-mono text-xs text-aqua mr-2">{p.kind}</span>{p.title}</span>
            <span className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-mute">{timeAgo(p.created_at)}</span>
              <button onClick={() => remove(p.id)} className="text-xs text-mute hover:text-red-300">delete</button>
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
