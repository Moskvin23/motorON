'use client';
import { useEffect, useState } from 'react';
import { usePrefs } from './Prefs';

/** Booking day + part-of-day chooser that replaces the native date input. */
const pad = (n: number) => String(n).padStart(2, '0');
const key = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (k: string) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const MONTHS_AHEAD = 3;

export default function DayPicker({ day, part, onDay, onPart }: { day: string; part: string; onDay: (d: string) => void; onPart: (p: string) => void }) {
  const { t, lang } = usePrefs();
  const b = t.book;
  const loc = lang === 'uk' ? 'uk-UA' : 'en-US';
  // Dates depend on the visitor's clock, so build them only in the browser (static HTML has none).
  const [today, setToday] = useState<Date | null>(null);
  const [cal, setCal] = useState(false);
  const [view, setView] = useState({ y: 0, m: 0 });
  useEffect(() => { const n = new Date(); setToday(new Date(n.getFullYear(), n.getMonth(), n.getDate())); setView({ y: n.getFullYear(), m: n.getMonth() }); }, []);
  if (!today) return <div className="daypick" />;

  const short = (d: Date, o: Intl.DateTimeFormatOptions) => d.toLocaleDateString(loc, o).replace('.', '');
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    return { k: key(d), top: i === 0 ? b.today : i === 1 ? b.tomorrow : short(d, { weekday: 'short' }), num: d.getDate(), mon: short(d, { month: 'short' }) };
  });
  const custom = day && !days.some((d) => d.k === day) ? parse(day) : null;
  const max = new Date(today.getFullYear(), today.getMonth() + MONTHS_AHEAD, today.getDate());

  // Month grid, weeks start on Monday; past days and days beyond the booking window are disabled.
  const first = new Date(view.y, view.m, 1);
  const lead = (first.getDay() + 6) % 7;
  const count = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => new Date(view.y, view.m, i + 1))];
  const wk = Array.from({ length: 7 }, (_, i) => short(new Date(2024, 0, 1 + i), { weekday: 'short' }));
  const canPrev = view.y > today.getFullYear() || view.m > today.getMonth();
  const canNext = new Date(view.y, view.m + 1, 1) <= max;
  const move = (d: number) => setView(({ y, m }) => { const n = new Date(y, m + d, 1); return { y: n.getFullYear(), m: n.getMonth() }; });

  return (
    <div className="daypick">
      <div className="dp-days" role="radiogroup" aria-label={b.date}>
        {days.map((d) => (
          <button type="button" key={d.k} role="radio" aria-checked={day === d.k} className={day === d.k ? 'on' : ''} onClick={() => { onDay(day === d.k ? '' : d.k); setCal(false); }}>
            <span>{d.top}</span><b>{d.num}</b><small>{d.mon}</small>
          </button>
        ))}
        <button type="button" className={`dp-other${custom ? ' on' : ''}${cal ? ' open' : ''}`} aria-expanded={cal} onClick={() => setCal(!cal)}>
          {custom
            ? <><span>{short(custom, { weekday: 'short' })}</span><b>{custom.getDate()}</b><small>{short(custom, { month: 'short' })}</small></>
            : <><span>{b.otherDate}</span><b className="ico">▦</b><small>{b.pick}</small></>}
        </button>
      </div>
      {cal && (
        <div className="dp-cal">
          <div className="dp-cal-head">
            <button type="button" disabled={!canPrev} onClick={() => move(-1)} aria-label="Previous month">‹</button>
            <b>{(() => { const m = first.toLocaleDateString(loc, { month: 'long' }); return m[0].toUpperCase() + m.slice(1) + ' ' + view.y; })()}</b>
            <button type="button" disabled={!canNext} onClick={() => move(1)} aria-label="Next month">›</button>
          </div>
          <div className="dp-grid">
            {wk.map((w) => <i key={w}>{w}</i>)}
            {cells.map((d, i) => d ? (
              <button type="button" key={i} disabled={d < today || d > max}
                className={key(d) === day ? 'on' : key(d) === key(today) ? 'today' : ''}
                onClick={() => { onDay(key(d)); setCal(false); }}>{d.getDate()}</button>
            ) : <span key={i} />)}
          </div>
        </div>
      )}
      <div className="dp-parts" role="radiogroup" aria-label={b.partLabel}>
        {b.parts.map((p, i) => (
          <button type="button" key={i} role="radio" aria-checked={part === String(i)} className={part === String(i) ? 'on' : ''} onClick={() => onPart(part === String(i) ? '' : String(i))}>{p}</button>
        ))}
      </div>
    </div>
  );
}
