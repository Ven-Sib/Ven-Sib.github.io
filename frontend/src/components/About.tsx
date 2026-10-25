import { about, education, lifecycle, otherSkills, priorities, skills } from '../data/portfolio';
import Page from './Page';

export default function About() {
  return (
    <Page eyebrow="About" title="An engineer who owns the whole lifecycle">
      <div className="grid gap-4 lg:grid-cols-5">
        <article className="glass p-7 lg:col-span-3 space-y-4 leading-relaxed">
          <p className="text-lg text-ink">{about.intro}</p>
          {about.paragraphs.map((p) => <p key={p} className="text-ink/80">{p}</p>)}
        </article>
        <article className="glass p-7 lg:col-span-2">
          <p className="font-mono text-xs text-mute">{education.expected}</p>
          <h2 className="h-display text-2xl mt-1">{education.school}</h2>
          <p className="mt-1">{education.degree}</p>
          <p className="text-sm text-mute mt-1">{education.detail}</p>
        </article>
      </div>

      <h2 className="h-display text-3xl mt-16 mb-6">How I work</h2>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {lifecycle.map((l, i) => (
          <li key={l.step} className="glass p-5">
            <span className="font-mono text-xs text-aqua">0{i + 1}</span>
            <h3 className="h-display text-xl mt-1">{l.step}</h3>
            <p className="text-sm text-mute mt-2 leading-relaxed">{l.text}</p>
          </li>
        ))}
      </ol>

      <h2 className="h-display text-3xl mt-16 mb-6">What I optimize for</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {priorities.map((p) => (
          <article key={p.name} className="glass p-5">
            <h3 className="h-display text-xl text-aqua">{p.name}</h3>
            <p className="text-sm text-mute mt-2 leading-relaxed">{p.text}</p>
          </article>
        ))}
      </div>

      <h2 className="h-display text-3xl mt-16 mb-6">Skills by domain</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <article key={s.group} className="glass p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="h-display text-xl">{s.group}</h3>
              <span className="font-mono text-xs text-mute">0{i + 1}</span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-1.5">{s.items.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
          </article>
        ))}
        <article className="glass p-6">
          <h3 className="h-display text-xl">Also</h3>
          <ul className="mt-4 flex flex-wrap gap-1.5">{otherSkills.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
        </article>
      </div>

      <h2 className="h-display text-3xl mt-16 mb-6">Coursework</h2>
      <ul className="flex flex-wrap gap-2">
        {education.coursework.map((c) => <li key={c} className="chip">{c}</li>)}
      </ul>
    </Page>
  );
}
