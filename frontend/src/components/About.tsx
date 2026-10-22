import { about, education, otherSkills, skills } from '../data/portfolio';
import Page from './Page';

export default function About() {
  return (
    <Page eyebrow="About" title="Backend, cloud and AI — built to run for real">
      <div className="grid gap-4 lg:grid-cols-5">
        <article className="glass p-7 lg:col-span-3 space-y-4 text-ink/90 leading-relaxed">
          {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </article>
        <article className="glass p-7 lg:col-span-2">
          <p className="font-mono text-xs text-mute">{education.expected}</p>
          <h2 className="h-display text-2xl mt-1">{education.school}</h2>
          <p className="mt-1">{education.degree}</p>
          <p className="text-sm text-mute mt-1">{education.detail}</p>
        </article>
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
