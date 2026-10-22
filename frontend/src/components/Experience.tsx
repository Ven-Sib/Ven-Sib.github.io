import { experience } from '../data/portfolio';
import Page from './Page';

export default function Experience() {
  return (
    <Page eyebrow="Experience" title="Technical experience" intro="Where I've built and shipped real systems.">
      <ol className="relative space-y-5 border-l border-line pl-6 md:pl-8">
        {experience.map((e) => (
          <li key={e.role} className="relative">
            <span className="absolute -left-[31px] md:-left-[39px] top-7 w-3 h-3 rounded-full bg-aqua ring-4 ring-deep" aria-hidden />
            <article className="glass p-6 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="h-display text-2xl">{e.role}</h2>
                <span className="font-mono text-xs text-mute">{e.period}</span>
              </div>
              <p className="text-aqua text-sm mt-1">{e.org}</p>
              <ul className="mt-4 space-y-2 text-ink/90 text-[15px] leading-relaxed list-disc pl-5 marker:text-aqua/60">
                {e.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center gap-1.5">
                {e.categories.map((c) => <span key={c} className="font-mono text-[11px] uppercase tracking-wider text-aqua mr-2">{c}</span>)}
                {e.stack.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Page>
  );
}
