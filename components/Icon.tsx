// Small inline line icons (no icon font, no external requests).
const P: Record<string, string> = {
  engine: 'M8 5h6 M11 5v3 M6 8h9l2 2h2V8h3v9h-3v-2h-2l-2 3H8l-2-2v-2H4v-3h2V8Z M9 12h4',
  shock: 'M12 2v3 M12 19v3 M8 5h8 M8 19h8 M8 7.5l8 1.6 M8 10.5l8 1.6 M8 13.5l8 1.6 M8 16.5l8 1.4',
  belt: 'M7 4a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z M17 12a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z M7 7a1 1 0 1 0 0 2a1 1 0 1 0 0-2Z M17 15a1 1 0 1 0 0 2a1 1 0 1 0 0-2Z M4.5 11.1l10 8 M9.5 4.9l10 8',
  wheel: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z M12 3v5 M12 16v5 M3 12h5 M16 12h5',
  oil: 'M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11Z',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  scan: 'M3 7V4h3 M18 4h3v3 M21 17v3h-3 M6 20H3v-3 M7 12h2l2-4 2 8 2-4h2',
  viber: 'M7 3h7a6 6 0 0 1 6 6v3a6 6 0 0 1-6 6h-2l-4 3v-3.4A6 6 0 0 1 4 12V6a3 3 0 0 1 3-3Z M10 7.5c.8 1.9 2 3.2 4 4 M12.5 6.5a3 3 0 0 1 2.5 2.5',
  telegram: 'M21 4 3 11l6 2 2 6 3-4 5 4 2-15Z M9 13l9-6-6 8',
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
