import { leadership } from '../data/leadership';
import Gallery from './Gallery';
import Page from './Page';

export default function Leadership() {
  return (
    <Page eyebrow="Leadership" title="Leadership & professional development" intro="Programs and fellowships beyond the classroom.">
      <div className="space-y-5">
        {leadership.map((l) => {
          const srcs = l.photos.map((f) => `${import.meta.env.BASE_URL}leadership/${l.slug}/${f}`);
          const hasPhotos = srcs.length > 0;
          return (
            <article key={l.slug} className={`glass p-6 md:p-7 ${hasPhotos ? 'grid gap-6 lg:grid-cols-5 items-start' : ''}`}>
              <div className={hasPhotos ? 'lg:col-span-2' : ''}>
                <p className="font-mono text-xs text-mute">{l.when}{l.place ? ` · ${l.place}` : ''}</p>
                <h2 className="h-display text-2xl mt-2 leading-snug">{l.name}</h2>
                <p className="mt-3 text-mute leading-relaxed">{l.detail}</p>
              </div>
              {hasPhotos && (
                <div className="lg:col-span-3">
                  <Gallery srcs={srcs} label={l.name} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </Page>
  );
}
