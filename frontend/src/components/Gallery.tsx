import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/** One big photo + thumbnails. Click the big photo for a full-screen view. */
export default function Gallery({ srcs, label }: { srcs: string[]; label: string }) {
  const [ok, setOk] = useState<string[]>(srcs);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const drop = (src: string) => setOk((p) => p.filter((x) => x !== src)); // hides photos that fail to load
  const n = ok.length;
  const i = Math.min(idx, Math.max(n - 1, 0));
  const next = () => setIdx((i + 1) % n);
  const prev = () => setIdx((i - 1 + n) % n);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') setIdx((v) => (v + 1) % n);
      if (e.key === 'ArrowLeft') setIdx((v) => (v - 1 + n) % n);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, n]);

  if (n === 0) return null;

  return (
    <div>
      <div className="relative group">
        <button
          onClick={() => setOpen(true)}
          className="block w-full overflow-hidden rounded-xl bg-black/30 aspect-[4/3] cursor-zoom-in"
          aria-label={`Open photo ${i + 1} of ${n} — ${label}`}
        >
          <img src={ok[i]} alt={`${label} — photo ${i + 1}`} onError={() => drop(ok[i])}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </button>
        {n > 1 && (
          <>
            <button onClick={prev} aria-label="Previous photo" className="gal-arrow left-2">‹</button>
            <button onClick={next} aria-label="Next photo" className="gal-arrow right-2">›</button>
            <span className="absolute bottom-2 right-3 font-mono text-[11px] text-ink/80 bg-deep/60 rounded-full px-2 py-0.5">{i + 1} / {n}</span>
          </>
        )}
      </div>

      {n > 1 && (
        <div className="mt-2 grid grid-cols-4 gap-2">
          {ok.map((s, k) => (
            <button key={s} onClick={() => setIdx(k)} aria-label={`Show photo ${k + 1}`}
              className={`overflow-hidden rounded-lg aspect-[4/3] border transition ${k === i ? 'border-aqua' : 'border-transparent opacity-60 hover:opacity-100'}`}>
              <img src={s} alt="" onError={() => drop(s)} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {open && createPortal(
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 backdrop-blur-sm p-4" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <img src={ok[i]} alt={`${label} — photo ${i + 1}`} onClick={(e) => e.stopPropagation()} className="max-h-[88vh] max-w-[94vw] rounded-lg object-contain" />
          <button onClick={() => setOpen(false)} aria-label="Close" className="absolute top-4 right-5 text-3xl text-ink/80 hover:text-ink">×</button>
          {n > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous photo" className="gal-arrow left-4 !w-11 !h-11 !text-2xl">‹</button>
              <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next photo" className="gal-arrow right-4 !w-11 !h-11 !text-2xl">›</button>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
