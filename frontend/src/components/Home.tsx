import { useState } from 'react';
import { categories, focus, profile } from '../data/portfolio';
import { usePosts } from '../lib/usePosts';
import { timeAgo } from '../lib/api';

const KIND_LABEL: Record<string, string> = { video: 'Video', leetcode: 'LeetCode', text: 'Note', link: 'Article' };

function Photo() {
  const [missing, setMissing] = useState(false);
  return (
    <div className="relative mx-auto w-48 sm:w-64 md:w-80 shrink-0">
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-aqua/25 via-transparent to-steel/20 blur-xl" aria-hidden />
      <div className="glass relative !rounded-[1.75rem] overflow-hidden aspect-[4/5]">
        {missing ? (
          <div className="w-full h-full grid place-items-center h-display text-7xl text-aqua/70">VS</div>
        ) : (
          <img src="/me.jpeg" alt={profile.name} onError={() => setMissing(true)} className="w-full h-full object-cover" />
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const { posts, error } = usePosts(6);
  const latest = (posts ?? []).slice(0, 4);

  return (
    <div className="page">
      <section className="mx-auto max-w-6xl px-5 pt-40 md:pt-36 pb-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1">
            <p className="eyebrow mb-6">{profile.role}</p>
            <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08]">{profile.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-mute leading-relaxed">{profile.intro}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {categories.map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#/projects" className="btn btn-primary">View projects</a>
              <a href="#/postings" className="btn btn-ghost">What I'm learning</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
            </div>
          </div>
          <Photo />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <p className="eyebrow mb-3">What I work on</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {focus.map((f, i) => (
            <a key={f.title} href="#/about" className="glass glass-hover p-5 block">
              <span className="font-mono text-xs text-mute">0{i + 1}</span>
              <h3 className="h-display text-xl mt-1">{f.title}</h3>
              <p className="text-sm text-mute mt-2 leading-relaxed">{f.blurb}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="eyebrow mb-2">Latest from my postings</p>
            <h2 className="h-display text-3xl">Learning in public</h2>
          </div>
          <a href="#/postings" className="text-sm text-aqua hover:underline">All postings →</a>
        </div>
        {latest.length === 0 ? (
          <div className="glass p-6 text-mute text-sm">
            {posts === null && !error ? 'Loading latest postings…' : error ? 'Postings are unavailable right now.' : 'Nothing posted yet.'}
          </div>
        ) : (
          <ul className="glass divide-y divide-line overflow-hidden">
            {latest.map((p) => (
              <li key={p.id}>
                <a href="#/postings" className="flex items-center gap-4 px-5 py-4 hover:bg-white/[.03] transition-colors">
                  <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-wider text-aqua">{KIND_LABEL[p.kind] ?? p.kind}</span>
                  <span className="flex-1 min-w-0 truncate">{p.title}</span>
                  <span className="font-mono text-xs text-mute shrink-0">{timeAgo(p.created_at)}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
