import { useState } from 'react';
import { categories, projects } from '../data/portfolio';
import Page from './Page';

const STATUS_TONE = { Shipped: 'text-aqua border-aqua/40', Ongoing: 'text-steel border-steel/40', Starting: 'text-sand border-sand/40' };

export default function Projects() {
  const [filter, setFilter] = useState<string>('All');
  const shown = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter as never));

  return (
    <Page eyebrow="Projects" title="Selected work" intro="Ordered by what matters most to me: cloud, backend and security first. Filter by domain, and open any project's live site or code.">
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', ...categories].map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`chip chip-btn ${filter === c ? 'active' : ''}`}>{c}</button>
        ))}
      </div>
      {shown.length === 0 && <div className="glass p-6 text-mute text-sm">No projects in this domain yet.</div>}
      <div className="grid gap-4 md:grid-cols-2">
        {shown.map((p) => (
          <article key={p.slug} id={p.slug} className="glass glass-hover p-6 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`font-mono text-[10px] uppercase tracking-wider border rounded-full px-2 py-0.5 ${STATUS_TONE[p.status]}`}>{p.status}</span>
              {p.categories.map((c) => <span key={c} className="font-mono text-[11px] uppercase tracking-wider text-mute">{c}</span>)}
            </div>
            <h2 className="h-display text-2xl leading-snug">{p.title}</h2>
            <p className="font-mono text-xs text-mute mt-1">{p.org} · {p.period}</p>
            <p className="mt-4 text-ink/90 leading-relaxed">{p.summary}</p>
            <ul className="mt-3 space-y-2 text-sm text-mute leading-relaxed list-disc pl-5 marker:text-aqua/60">
              {p.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <ul className="mt-auto pt-5 flex flex-wrap gap-1.5">
              {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
            {p.links.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.links.map((l) =>
                  l.url.startsWith('#') ? (
                    <a key={l.label} href={l.url} className={`btn !py-1.5 text-sm ${l.primary ? 'btn-primary' : 'btn-ghost'}`}>{l.label}</a>
                  ) : (
                    <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className={`btn !py-1.5 text-sm ${l.primary ? 'btn-primary' : 'btn-ghost'}`}>{l.label} ↗</a>
                  )
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </Page>
  );
}
