'use client';
import { useEffect, useState } from 'react';
import { usePrefs } from './Prefs';

/** Booking day + part-of-day chooser that replaces the native date input. */
const pad = (n: number) => String(n).padStart(2, '0');
const key = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export default function DayPicker({ day, part, onDay, onPart }: { day: string; part: string; onDay: (d: string) => void; onPart: (p: string) => void }) {
  const { t, lang } = usePrefs();
  const b = t.book;
  // Dates depend on the visitor's clock, so build them only in the browser (static HTML has none).
  const [days, setDays] = useState<{ k: string; top: string; num: number; mon: string }[]>([]);
  useEffect(() => {
    const now = new Date();
    const loc = lang === 'uk' ? 'uk-UA' : 'en-US';
    setDays(Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      const wd = d.toLocaleDateString(loc, { weekday: 'short' }).replace('.', '');
      return { k: key(d), top: i === 0 ? b.today : i === 1 ? b.tomorrow : wd, num: d.getDate(), mon: d.toLocaleDateString(loc, { month: 'short' }).replace('.', '') };
    }));
  }, [lang, b.today, b.tomorrow]);

  return (
    <div className="daypick">
      <div className="dp-days" role="radiogroup" aria-label={b.date}>
        {days.map((d) => (
          <button type="button" key={d.k} role="radio" aria-checked={day === d.k} className={day === d.k ? 'on' : ''} onClick={() => onDay(day === d.k ? '' : d.k)}>
            <span>{d.top}</span><b>{d.num}</b><small>{d.mon}</small>
          </button>
        ))}
      </div>
      <div className="dp-parts" role="radiogroup" aria-label={b.partLabel}>
        {b.parts.map((p) => (
          <button type="button" key={p} role="radio" aria-checked={part === p} className={part === p ? 'on' : ''} onClick={() => onPart(part === p ? '' : p)}>{p}</button>
        ))}
      </div>
    </div>
  );
}
