import { profile } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 pb-12">
      <div className="border-t border-line pt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="h-display text-xl">Let’s talk — open to backend, cloud, security and AI roles.</p>
          <a href={`mailto:${profile.email}`} className="text-aqua text-sm hover:underline">{profile.email}</a>
        </div>
        <div className="flex items-center gap-5 text-sm text-mute">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a>
          {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">LinkedIn</a>}
        </div>
      </div>
      <p className="mt-6 font-mono text-xs text-mute">© {new Date().getFullYear()} {profile.fullName}</p>
    </footer>
  );
}
