import { useState } from 'react';
import { categories, focus, profile } from '../data/portfolio';
import { usePosts } from '../lib/usePosts';
import { timeAgo } from '../lib/api';
import Spotlight from './Spotlight';

const KIND_LABEL: Record<string, string> = { video: 'Video', leetcode: 'LeetCode', text: 'Note', link: 'Article' };

function Photo() {
  const [missing, setMissing] = useState(false);
  return (
    <div className="glass shrink-0 w-28 sm:w-36 lg:w-40 aspect-[4/5] !rounded-2xl overflow-hidden">
      {missing ? (
        <div className="w-full h-full grid place-items-center h-display text-5xl text-aqua/70">VS</div>
      ) : (
        <img src={`${import.meta.env.BASE_URL}me.jpeg`} alt={profile.name} onError={() => setMissing(true)} className="w-full h-full object-cover" />
      )}
    </div>
  );
}

export default function Home() {
  const { posts, error } = usePosts(6);
  const latest = (posts ?? []).slice(0, 4);

  return (
    <div className="page mx-auto max-w-6xl px-5 pt-36 lg:pt-32 pb-16 grid gap-x-10 gap-y-16 lg:grid-cols-[minmax(0,1fr)_20.5rem]">
      {/* Hero */}
      <section className="lg:col-start-1">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
          <Photo />
          <div>
            <p className="eyebrow mb-4">{profile.role}</p>
            <h1 className="h-display text-3xl sm:text-4xl xl:text-[2.6rem] leading-[1.12]">{profile.headline}</h1>
            <p className="mt-5 max-w-xl text-mute leading-relaxed">{profile.intro}</p>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap gap-2">
          {categories.map((c) => <span key={c} className="chip">{c}</span>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#/projects" className="btn btn-primary">View projects</a>
          <a href="#/about" className="btn btn-ghost">How I work</a>
          <a href="#/postings" className="btn btn-ghost">What I'm learning</a>
        </div>
      </section>

      {/* Floating spotlight (sticky on desktop, in-flow on phones) */}
      <div className="lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:self-start lg:sticky lg:top-24">
        <Spotlight />
      </div>

      {/* Focus areas */}
      <section className="lg:col-start-1">
        <p className="eyebrow mb-3">What I work on</p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {focus.map((f, i) => (
            <a key={f.title} href="#/about" className="glass glass-hover p-5 block">
              <span className="font-mono text-xs text-mute">0{i + 1}</span>
              <h3 className="h-display text-xl mt-1">{f.title}</h3>
              <p className="text-sm text-mute mt-2 leading-relaxed">{f.blurb}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Latest postings */}
      <section className="lg:col-start-1">
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
