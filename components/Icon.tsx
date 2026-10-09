// Small inline line icons (no icon font, no external requests).
const P: Record<string, string> = {
  engine: 'M8 5h6 M11 5v3 M6 8h9l2 2h2V8h3v9h-3v-2h-2l-2 3H8l-2-2v-2H4v-3h2V8Z M9 12h4',
  shock: 'M12 2v3 M12 19v3 M8 5h8 M8 19h8 M8 7.5l8 1.6 M8 10.5l8 1.6 M8 13.5l8 1.6 M8 16.5l8 1.4',
  belt: 'M7 4a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z M17 12a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z M7 7a1 1 0 1 0 0 2a1 1 0 1 0 0-2Z M17 15a1 1 0 1 0 0 2a1 1 0 1 0 0-2Z M4.5 11.1l10 8 M9.5 4.9l10 8',
  wheel: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z M12 3v5 M12 16v5 M3 12h5 M16 12h5',
  oil: 'M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11Z',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  scan: 'M3 7V4h3 M18 4h3v3 M21 17v3h-3 M6 20H3v-3 M7 12h2l2-4 2 8 2-4h2',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  pin: 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z M12 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5Z',
  clock: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z M12 7v5l3 2',
  insta: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z M17.5 6.5h.01',
  sun: 'M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z',
  check: 'M5 12l5 5L20 7',
  star: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  close: 'M6 6l12 12 M18 6L6 18',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
};

export default function Icon({ name, size = 22, fill = false }: { name: string; size?: number; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name]} />
    </svg>
  );
}

/** Messenger glyphs drawn in white for the coloured Viber / Telegram tiles. */
export function BrandIcon({ name, size = 20 }: { name: 'viber' | 'telegram'; size?: number }) {
  if (name === 'telegram') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#fff" d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.6c5.3 0 8.4 2.5 8.4 8.2 0 5.6-3 8-8.4 8-.75 0-1.45-.04-2.1-.13L6.6 21.3v-3.2C4.5 16.8 3.6 14.4 3.6 10.8 3.6 5.1 6.7 2.6 12 2.6Z" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
      <path fill="#fff" d="M9.05 6.9c.35-.27.85-.22 1.1.13l.92 1.3c.24.33.2.78-.08 1.06l-.45.45c.43.95 1.17 1.72 2.1 2.18l.47-.45c.29-.28.74-.31 1.06-.07l1.28.95c.34.25.4.74.13 1.07l-.45.55c-.42.5-1.1.72-1.73.52-2.27-.73-4.04-2.5-4.77-4.77-.2-.63.02-1.31.52-1.73Z" />
      <path d="M12.9 5.9a3.9 3.9 0 0 1 3.5 3.6 M12.8 7.9a1.9 1.9 0 0 1 1.6 1.7" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** MotorON wordmark: "MOTOR" + power icon in place of the O + "N", "AUTO SERVICE" underneath (from the shop's signage). */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`logo${compact ? ' compact' : ''}`} aria-label="MotorON Auto Service">
      <span className="wm">
        MOTOR
        <svg className="pwr" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.2 6.6a8 8 0 1 0 9.6 0" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M12 2.5v8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
        N
      </span>
      {!compact && <small>AUTO SERVICE</small>}
    </span>
  );
}
