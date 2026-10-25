import { useEffect, useRef, useState } from 'react';
import { parseDate, timeAgo, type Post } from '../lib/api';
import { usePosts } from '../lib/usePosts';
import { youtubeId } from '../lib/youtube';
import Page from './Page';

type Section = {
  key: string; // url part: #/postings/<key>
  kind: string; // backend kind
  label: string;
  blurb: string;
  empty: string;
};

const SECTIONS: Section[] = [
  { key: 'videos', kind: 'video', label: 'Videos', blurb: 'Talks and tutorials I\'m learning from.', empty: 'No videos yet. Add one from the admin page.' },
  { key: 'leetcode', kind: 'leetcode', label: 'LeetCode', blurb: 'Problems I\'ve solved, synced automatically.', empty: 'No submissions yet. Add your LeetCode username in backend/.env and press Sync.' },
  { key: 'notes', kind: 'text', label: 'Notes', blurb: 'Short write-ups on what I\'m studying.', empty: 'No notes yet.' },
  { key: 'articles', kind: 'link', label: 'Articles & links', blurb: 'Reading worth sharing.', empty: 'No links yet.' },
];

const tagsOf = (p: Post) => p.tags.split(',').map((t) => t.trim()).filter(Boolean);
const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };

/* ---------- Tags ---------- */
function Tags({ p }: { p: Post }) {
  const t = tagsOf(p);
  if (!t.length) return null;
  return <ul className="mt-3 flex flex-wrap gap-1.5">{t.map((x) => <li key={x} className="chip">#{x}</li>)}</ul>;
}

/* ---------- Videos: grid of embeds ---------- */
function VideoCard({ p }: { p: Post }) {
  const id = youtubeId(p.url);
  const [playing, setPlaying] = useState(false);
  return (
    <article className="glass glass-hover overflow-hidden flex flex-col">
      {id && (
        <div className="relative aspect-video bg-black/40">
          {playing ? (
            <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
              title={p.title} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          ) : (
            <button onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full" aria-label={`Play ${p.title}`}>
              <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid place-items-center w-14 h-14 rounded-full bg-deep/70 border border-aqua/50 text-aqua group-hover:scale-110 transition-transform">▶</span>
              </span>
            </button>
          )}
        </div>
      )}
      <div className="p-5">
        <h3 className="font-medium leading-snug">{p.title}</h3>
        {p.body && <CollapsibleText text={p.body} />}
        <Tags p={p} />
        <p className="mt-3 font-mono text-[11px] text-mute">{timeAgo(p.created_at)}</p>
      </div>
    </article>
  );
}

/** Shows ~2 lines; "Read more" appears only if the text is actually longer. */
function CollapsibleText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => { if (!open) setOverflows(el.scrollHeight > el.clientHeight + 1); };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [text, open]);

  return (
    <div className="mt-2">
      <p ref={ref} className={`text-sm text-mute leading-relaxed whitespace-pre-line ${open ? '' : 'line-clamp-2'}`}>{text}</p>
      {(overflows || open) && (
        <button onClick={() => setOpen(!open)} aria-expanded={open} className="mt-1 text-xs text-aqua hover:underline">
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
const VideoGrid = ({ posts }: { posts: Post[] }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{posts.map((p) => <VideoCard key={p.id} p={p} />)}</div>
);

/* ---------- LeetCode: compact rows grouped by month ---------- */
function LeetRows({ posts, grouped }: { posts: Post[]; grouped: boolean }) {
  const groups = new Map<string, Post[]>();
  for (const p of posts) {
    const k = grouped ? parseDate(p.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '';
    groups.set(k, [...(groups.get(k) ?? []), p]);
  }
  return (
    <div className="space-y-6">
      {[...groups.entries()].map(([month, items]) => (
        <div key={month}>
          {grouped && <p className="font-mono text-xs uppercase tracking-wider text-mute mb-2">{month} · {items.length} solved</p>}
          <ul className="glass divide-y divide-line overflow-hidden">
            {items.map((p) => (
              <li key={p.id}>
                <a href={p.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[.03] transition-colors">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-aqua/15 text-aqua text-xs shrink-0">✓</span>
                  <span className="flex-1 min-w-0 truncate">{p.title}</span>
                  <span className="hidden sm:flex gap-1.5">{tagsOf(p).slice(0, 3).map((t) => <span key={t} className="chip">#{t}</span>)}</span>
                  <span className="font-mono text-xs text-mute shrink-0">{parseDate(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---------- Notes: single-column feed ---------- */
const NoteFeed = ({ posts }: { posts: Post[] }) => (
  <div className="space-y-4 max-w-3xl">
    {posts.map((p) => (
      <article key={p.id} className="glass p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-aqua">Note</span>
          <span className="font-mono text-[11px] text-mute">{timeAgo(p.created_at)}</span>
        </div>
        <h3 className="h-display text-2xl leading-snug">{p.title}</h3>
        {p.body && <p className="mt-3 text-ink/90 leading-relaxed whitespace-pre-line">{p.body}</p>}
        <Tags p={p} />
      </article>
    ))}
  </div>
);

/* ---------- Articles: link list ---------- */
const LinkList = ({ posts }: { posts: Post[] }) => (
  <ul className="glass divide-y divide-line overflow-hidden max-w-3xl">
    {posts.map((p) => (
      <li key={p.id}>
        <a href={p.url} target="_blank" rel="noreferrer" className="block px-5 py-4 hover:bg-white/[.03] transition-colors">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-medium">{p.title} <span className="text-aqua">↗</span></span>
            <span className="font-mono text-xs text-mute shrink-0">{timeAgo(p.created_at)}</span>
          </div>
          <p className="font-mono text-xs text-mute mt-0.5">{host(p.url)}</p>
          {p.body && <p className="mt-2 text-sm text-mute leading-relaxed">{p.body}</p>}
        </a>
      </li>
    ))}
  </ul>
);

function renderList(kind: string, posts: Post[], full: boolean) {
  if (kind === 'video') return <VideoGrid posts={posts} />;
  if (kind === 'leetcode') return <LeetRows posts={posts} grouped={full} />;
  if (kind === 'text') return <NoteFeed posts={posts} />;
  return <LinkList posts={posts} />;
}

/* ---------- Page ---------- */
export default function Postings({ sub }: { sub: string }) {
  const { posts, error, waking } = usePosts(200);
  const [tag, setTag] = useState('');
  const active = SECTIONS.find((s) => s.key === sub); // undefined => overview
  const byKind = (kind: string) => (posts ?? []).filter((p) => p.kind === kind);
  const solved = byKind('leetcode').length;

  const full = active ? byKind(active.kind) : [];
  const allTags = [...new Set(full.flatMap(tagsOf))];
  const filtered = tag ? full.filter((p) => tagsOf(p).includes(tag)) : full;

  return (
    <Page eyebrow="Postings" title="Learning in public" intro="Everything I study, grouped by type. This page updates itself — videos and notes I add, plus LeetCode submissions synced automatically.">
      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 self-start space-y-4">
          <nav className="glass p-2 flex lg:block gap-1 overflow-x-auto tabs-scroll">
            <a href="#/postings" onClick={() => setTag('')} className={`side-btn ${!active ? 'active' : ''}`}>
              <span>Overview</span><span className="font-mono text-xs">{posts?.length ?? 0}</span>
            </a>
            {SECTIONS.map((s) => (
              <a key={s.key} href={`#/postings/${s.key}`} onClick={() => setTag('')} className={`side-btn ${active?.key === s.key ? 'active' : ''}`}>
                <span className="whitespace-nowrap">{s.label}</span><span className="font-mono text-xs">{byKind(s.kind).length}</span>
              </a>
            ))}
          </nav>
          <div className="glass p-5 hidden lg:block">
            <p className="font-mono text-[11px] uppercase tracking-wider text-mute">LeetCode</p>
            <p className="h-display text-4xl mt-1">{solved}</p>
            <p className="text-sm text-mute">recent problems solved</p>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0">
          {error && (
            <div className="glass p-6 text-mute text-sm">
              Couldn't reach the postings server. Please refresh in a minute. (Running locally? Start the backend with <code className="font-mono text-ink">uvicorn app.main:app --reload --port 8000</code>.)
            </div>
          )}
          {!error && posts === null && (
            <div className="glass p-6 text-mute text-sm">
              {waking
                ? 'The server is waking up after being idle — this can take up to a minute. Your postings will appear automatically…'
                : 'Loading…'}
            </div>
          )}

          {posts && !active && (
            <div className="space-y-14">
              {SECTIONS.map((s) => {
                const items = byKind(s.kind);
                const preview = items.slice(0, s.kind === 'leetcode' ? 5 : s.kind === 'video' ? 3 : 2);
                return (
                  <section key={s.key}>
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <h2 className="h-display text-2xl">{s.label}</h2>
                        <p className="text-sm text-mute">{s.blurb}</p>
                      </div>
                      {items.length > preview.length && (
                        <a href={`#/postings/${s.key}`} className="text-sm text-aqua hover:underline shrink-0">View all {items.length} →</a>
                      )}
                    </div>
                    {preview.length ? renderList(s.kind, preview, false) : <div className="glass p-5 text-sm text-mute">{s.empty}</div>}
                  </section>
                );
              })}
            </div>
          )}

          {posts && active && (
            <section>
              <div className="mb-5">
                <h2 className="h-display text-3xl">{active.label}</h2>
                <p className="text-sm text-mute">{active.blurb}</p>
              </div>
              {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <button onClick={() => setTag('')} className={`chip chip-btn ${!tag ? 'active' : ''}`}>All</button>
                  {allTags.map((t) => <button key={t} onClick={() => setTag(t)} className={`chip chip-btn ${tag === t ? 'active' : ''}`}>#{t}</button>)}
                </div>
              )}
              {filtered.length ? renderList(active.kind, filtered, true) : <div className="glass p-5 text-sm text-mute">{active.empty}</div>}
            </section>
          )}
        </div>
      </div>
    </Page>
  );
}
