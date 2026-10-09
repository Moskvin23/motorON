'use client';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { usePrefs } from './Prefs';

/** Gallery items. When real media arrive, put optimised files into /public/gallery
 *  and set `src` (image: .webp/.avif, video: .mp4 + `poster`). Until then a styled placeholder is shown. */
type Item = { id: string; kind: 'photo' | 'video' | 'beforeAfter'; size?: 'wide' | 'tall'; tone: string; icon: string; src?: string; poster?: string };

const ITEMS: Item[] = [
  { id: 'shop', kind: 'photo', size: 'wide', tone: 'a', icon: 'engine' },
  { id: 'video', kind: 'video', size: 'tall', tone: 'b', icon: 'scan' },
  { id: 'ba1', kind: 'beforeAfter', tone: 'c', icon: 'shock' },
  { id: 'lift', kind: 'photo', tone: 'd', icon: 'wheel' },
  { id: 'diag', kind: 'photo', tone: 'e', icon: 'bolt' },
  { id: 'ba2', kind: 'beforeAfter', tone: 'f', icon: 'belt' },
];

function Media({ it, label, big = false, ba = ['До', 'Після'] }: { it: Item; label: string; big?: boolean; ba?: string[] }) {
  if (it.src && it.kind === 'video') return <video src={it.src} poster={it.poster} controls={big} muted playsInline preload="none" />;
  if (it.src) return <img src={it.src} alt={label} loading="lazy" decoding="async" />;
  return (
    <span className={`ph tone-${it.tone}`} aria-hidden="true">
      <Icon name={it.icon} size={big ? 64 : 40} />
      {it.kind === 'beforeAfter' && <span className="ba"><i>{ba[0]}</i><i>{ba[1]}</i></span>}
    </span>
  );
}

export default function Gallery() {
  const { t } = usePrefs();
  const g = t.gallery;
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i! + 1) % ITEMS.length);
      if (e.key === 'ArrowLeft') setOpen((i) => (i! - 1 + ITEMS.length) % ITEMS.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const cap = (it: Item) => g.items[it.id as keyof typeof g.items];
  const cur = open !== null ? ITEMS[open] : null;

  return (
    <section className="sec" id="gallery">
      <div className="wrap">
        <div className="sec-head"><h2>{g.title}</h2><p>{g.lead}</p></div>
        <div className="gallery">
          {ITEMS.map((it, i) => (
            <button key={it.id} className={`g-item${it.size ? ' ' + it.size : ''}`} onClick={() => setOpen(i)} aria-label={cap(it).t}>
              <Media it={it} label={cap(it).t} ba={g.tags.beforeAfter.split(' / ')} />
              {it.kind === 'video' && <span className="play" aria-hidden="true">▶</span>}
              <span className="g-cap"><em>{g.tags[it.kind]}</em>{cap(it).t}</span>
            </button>
          ))}
        </div>
        <p className="note">{g.note}</p>
      </div>

      {cur && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={cap(cur).t} onClick={() => setOpen(null)}>
          <button className="lb-x" aria-label="Close" onClick={() => setOpen(null)}><Icon name="close" size={22} /></button>
          <button className="lb-nav prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setOpen((open! - 1 + ITEMS.length) % ITEMS.length); }}>‹</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <div className="lb-media"><Media it={cur} label={cap(cur).t} big ba={g.tags.beforeAfter.split(' / ')} />{cur.kind === 'video' && !cur.src && <span className="play big">▶</span>}</div>
            <figcaption><em>{g.tags[cur.kind]}</em>{cap(cur).t}<span>{cap(cur).d}</span><small>{open! + 1} / {ITEMS.length}</small></figcaption>
          </figure>
          <button className="lb-nav next" aria-label="Next" onClick={(e) => { e.stopPropagation(); setOpen((open! + 1) % ITEMS.length); }}>›</button>
        </div>
      )}
    </section>
  );
}
