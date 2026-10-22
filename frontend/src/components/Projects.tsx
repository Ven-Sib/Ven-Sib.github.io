import { useState } from 'react';
import { categories, projects } from '../data/portfolio';
import Page from './Page';

export default function Projects() {
  const [filter, setFilter] = useState<string>('All');
  const shown = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter as never));

  return (
    <Page eyebrow="Projects" title="Selected work" intro="Filter by domain to see how each project maps to cloud, backend, system design, AI agents or ML.">
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', ...categories].map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`chip chip-btn ${filter === c ? 'active' : ''}`}>{c}</button>
        ))}
      </div>
      {shown.length === 0 && <div className="glass p-6 text-mute text-sm">No projects in this domain yet.</div>}
      <div className="grid gap-4 md:grid-cols-2">
        {shown.map((p) => (
          <article key={p.title} className="glass glass-hover p-6 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-3">
              {p.categories.map((c) => <span key={c} className="font-mono text-[11px] uppercase tracking-wider text-aqua">{c}</span>)}
            </div>
            <h2 className="h-display text-2xl">{p.title}</h2>
            <p className="font-mono text-xs text-mute mt-1">{p.org} · {p.period}</p>
            <p className="mt-4 text-ink/90 leading-relaxed">{p.summary}</p>
            <ul className="mt-3 space-y-2 text-sm text-mute leading-relaxed list-disc pl-5 marker:text-aqua/60">
              {p.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <ul className="mt-auto pt-5 flex flex-wrap gap-1.5">
              {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
            {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="mt-4 text-sm text-aqua hover:underline">View project →</a>}
          </article>
        ))}
      </div>
    </Page>
  );
}
