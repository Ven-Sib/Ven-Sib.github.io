import { leadership } from '../data/portfolio';
import Page from './Page';

export default function Leadership() {
  return (
    <Page eyebrow="Leadership" title="Leadership & professional development" intro="Programs and fellowships beyond the classroom.">
      <div className="grid gap-4 md:grid-cols-2">
        {leadership.map((l) => (
          <article key={l.name} className="glass glass-hover p-6">
            <p className="font-mono text-xs text-mute">{l.when}{l.place ? ` · ${l.place}` : ''}</p>
            <h2 className="h-display text-xl mt-2 leading-snug">{l.name}</h2>
            <p className="mt-3 text-sm text-mute leading-relaxed">{l.detail}</p>
          </article>
        ))}
      </div>
    </Page>
  );
}
