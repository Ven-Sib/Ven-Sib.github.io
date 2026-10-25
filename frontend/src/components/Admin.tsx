import { useCallback, useEffect, useState } from 'react';
import { createPost, deletePost, fetchPosts, syncNow, timeAgo, verifyAdmin, type Post } from '../lib/api';
import BackButton from './BackButton';

const KEY = 'admin_token';

function saved(): { token: string; remembered: boolean } {
  try {
    const l = localStorage.getItem(KEY);
    if (l) return { token: l, remembered: true };
    return { token: sessionStorage.getItem(KEY) ?? '', remembered: false };
  } catch { return { token: '', remembered: false }; }
}
function store(token: string, remember: boolean) {
  try {
    localStorage.removeItem(KEY); sessionStorage.removeItem(KEY);
    if (token) (remember ? localStorage : sessionStorage).setItem(KEY, token);
  } catch { /* storage blocked: the gate still works, you just re-enter the token */ }
}

/* ---------- Lock screen: nothing below is shown until the SERVER accepts the token ---------- */
function LockScreen({ onUnlock, startToken, startRemember }: { onUnlock: (t: string, r: boolean) => void; startToken: string; startRemember: boolean }) {
  const [token, setToken] = useState('');
  const [remember, setRemember] = useState(startRemember);
  const [busy, setBusy] = useState(!!startToken);
  const [err, setErr] = useState('');

  const attempt = useCallback(async (t: string, r: boolean, silent = false) => {
    setBusy(true); setErr('');
    try { await verifyAdmin(t); onUnlock(t, r); }
    catch (e) {
      const m = (e as Error).message;
      setErr(silent && m === 'Wrong admin token' ? '' : m === 'Failed to fetch' ? 'Server not reachable. If it was asleep, wait a minute and try again.' : m);
      if (silent) store('', false);
    }
    finally { setBusy(false); }
  }, [onUnlock]);

  useEffect(() => { if (startToken) attempt(startToken, startRemember, true); }, [startToken, startRemember, attempt]);

  return (
    <div className="max-w-sm mx-auto mt-16">
      <form onSubmit={(e) => { e.preventDefault(); if (token) attempt(token, remember); }} className="glass p-7 space-y-4">
        <div>
          <p className="eyebrow mb-2">Restricted</p>
          <h1 className="h-display text-3xl">Owner access</h1>
          <p className="text-sm text-mute mt-2">Enter the admin token to manage postings.</p>
        </div>
        <input className="input" type="password" autoComplete="current-password" placeholder="Admin token" value={token}
          onChange={(e) => setToken(e.target.value)} autoFocus />
        <label className="flex items-center gap-2 text-sm text-mute">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Remember me on this device
        </label>
        {err && <p role="alert" className="text-sm text-red-300">{err}</p>}
        <button className="btn btn-primary w-full justify-center" type="submit" disabled={busy || !token}>
          {busy ? 'Checking…' : 'Unlock'}
        </button>
      </form>
    </div>
  );
}

/* ---------- The real admin panel ---------- */
function Panel({ token, onLock }: { token: string; onLock: () => void }) {
  const [kind, setKind] = useState('video');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [msg, setMsg] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  const load = useCallback(() => { fetchPosts(100).then(setPosts).catch(() => setMsg('Backend not reachable')); }, []);
  useEffect(load, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('Saving…');
    try {
      await createPost(token, { kind, title, body, url, tags });
      setTitle(''); setBody(''); setUrl(''); setTags('');
      setMsg('Posted ✓'); load();
    } catch (err) { setMsg((err as Error).message); }
  }
  async function remove(p: Post) {
    if (!window.confirm(`Delete this post?\n\n"${p.title}"`)) return;
    try { await deletePost(token, p.id); load(); } catch (err) { setMsg((err as Error).message); }
  }
  async function sync() {
    setMsg('Syncing…');
    try { setMsg('Sync result: ' + JSON.stringify(await syncNow(token))); load(); }
    catch (err) { setMsg((err as Error).message); }
  }

  return (
    <>
      <div className="flex items-end justify-between gap-4 mb-8">
        <h1 className="h-display text-4xl">Admin</h1>
        <button onClick={onLock} className="btn btn-ghost !py-1.5 text-sm">Lock</button>
      </div>

      <form onSubmit={submit} className="glass p-6 space-y-3">
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
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-primary" type="submit">Post</button>
          <button className="btn btn-ghost" type="button" onClick={sync}>Sync LeetCode / channel now</button>
          <span className="text-sm text-mute">{msg}</span>
        </div>
      </form>

      <h2 className="h-display text-2xl mt-10 mb-4">All postings</h2>
      <ul className="space-y-2">
        {posts.length === 0 && <li className="text-sm text-mute">No postings yet.</li>}
        {posts.map((p) => (
          <li key={p.id} className="glass !rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            <span className="text-sm min-w-0 truncate"><span className="font-mono text-xs text-aqua mr-2">{p.kind}</span>{p.title}</span>
            <span className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-mute">{timeAgo(p.created_at)}</span>
              <button onClick={() => remove(p)} className="text-xs text-mute hover:text-red-300">delete</button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Admin() {
  const [initial] = useState(saved);
  const [auth, setAuth] = useState<{ token: string } | null>(null);

  return (
    <main className="mx-auto max-w-3xl px-5 pt-10 pb-16">
      <BackButton />
      {auth ? (
        <div className="mt-6">
          <Panel token={auth.token} onLock={() => { store('', false); setAuth(null); }} />
        </div>
      ) : (
        <LockScreen
          startToken={initial.token}
          startRemember={initial.remembered}
          onUnlock={(t, r) => { store(t, r); setAuth({ token: t }); }}
        />
      )}
    </main>
  );
}
