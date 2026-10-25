import { useEffect, useState } from 'react';
import { spotlight } from '../data/spotlight';
import { AuthVisual, BrokerVisual, PipelineVisual } from './spotlight/Visuals';

const VISUALS = { auth: AuthVisual, pipeline: PipelineVisual, broker: BrokerVisual };
const STATUS_TONE = { Shipped: 'text-aqua border-aqua/40', Ongoing: 'text-steel border-steel/40', Starting: 'text-sand border-sand/40' };

export default function Spotlight() {
  const [i, setI] = useState(0);
  const [min, setMin] = useState(false);
  const n = spotlight.length;
  const s = spotlight[i];
  const Visual = VISUALS[s.visual];

  // remember minimized state (never required for the page to work)
  useEffect(() => { try { setMin(localStorage.getItem('spotlight_min') === '1'); } catch { /* ignore */ } }, []);
  const toggle = (v: boolean) => { setMin(v); try { localStorage.setItem('spotlight_min', v ? '1' : '0'); } catch { /* ignore */ } };
  const go = (k: number) => setI((k + n) % n);

  if (min) {
    return (
      <button onClick={() => toggle(false)} className="spot-pill glass" aria-label="Open spotlight">
        <span className="spot-dot" /> Spotlight · {n} projects <span className="text-mute">▸</span>
      </button>
    );
  }

  return (
    <aside className="spot glass" aria-label="Spotlight: latest projects">
      <div className="flex items-center justify-between px-5 pt-4">
        <p className="eyebrow flex items-center gap-2"><span className="spot-dot" /> Spotlight</p>
        <button onClick={() => toggle(true)} className="text-xs text-mute hover:text-ink" aria-label="Minimize spotlight">Minimize –</button>
      </div>

      <div key={s.id} className="spot-slide px-5 pb-5 pt-3">
        <Visual />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={`font-mono text-[10px] uppercase tracking-wider border rounded-full px-2 py-0.5 ${STATUS_TONE[s.status]}`}>{s.status}</span>
          {s.domains.map((d) => <span key={d} className="font-mono text-[10px] uppercase tracking-wider text-mute">{d}</span>)}
        </div>
        <h2 className="h-display text-xl leading-snug mt-2">{s.title}</h2>
        <p className="text-sm text-mute leading-relaxed mt-2">{s.blurb}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">{s.stack.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {s.links.map((l) =>
            l.url.startsWith('#') ? (
              <a key={l.label} href={l.url} className={`btn !py-1.5 text-sm ${l.primary ? 'btn-primary' : 'btn-ghost'}`}>{l.label}</a>
            ) : (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className={`btn !py-1.5 text-sm ${l.primary ? 'btn-primary' : 'btn-ghost'}`}>{l.label} ↗</a>
            )
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-5 pb-4">
        <div className="flex gap-1.5">
          {spotlight.map((x, k) => (
            <button key={x.id} onClick={() => go(k)} aria-label={`Show ${x.title}`} className={`spot-tick ${k === i ? 'on' : ''}`} />
          ))}
        </div>
        <div className="flex gap-1">
          <button onClick={() => go(i - 1)} aria-label="Previous project" className="spot-nav">‹</button>
          <button onClick={() => go(i + 1)} aria-label="Next project" className="spot-nav">›</button>
        </div>
      </div>
      <div className="spot-progress"><div key={`${s.id}-${i}`} className="spot-bar" onAnimationEnd={() => go(i + 1)} /></div>
    </aside>
  );
}
