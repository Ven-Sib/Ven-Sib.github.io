import { profile } from '../data/portfolio';

const tabs = [
  ['home', 'Home'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['leadership', 'Leadership'],
  ['postings', 'Postings'],
];

export default function Nav({ page }: { page: string }) {
  return (
    <header className="site-nav">
      <div className="site-nav-bar">
        <a href="#/" className="site-nav-logo font-mono text-sm tracking-wider text-ink">
          vensen<span className="text-aqua">.</span>sibanda
        </a>

        <nav className="site-nav-tabs tabs-scroll glass" aria-label="Main">
          {tabs.map(([key, label]) => (
            <a
              key={key}
              href={key === 'home' ? '#/' : `#/${key}`}
              className={`site-tab ${page === key ? 'active' : ''}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost site-nav-resume">
          Resume
        </a>
      </div>
    </header>
  );
}
