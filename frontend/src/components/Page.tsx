import type { ReactNode } from 'react';
import BackButton from './BackButton';

export default function Page({
  eyebrow, title, intro, children,
}: { eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <div className="page mx-auto max-w-6xl px-5 pt-36 md:pt-24 pb-24">
      <div className="mb-7"><BackButton /></div>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="h-display text-4xl sm:text-5xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-mute leading-relaxed">{intro}</p>}
      <div className="mt-10">{children}</div>
    </div>
  );
}
