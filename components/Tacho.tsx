'use client';
// BMW-style tachometer: black face, 0–8 ×1000 rpm, red zone, orange needle.
// On load: instrument check sweep (0 → 8 → 0), then the engine starts and the needle settles at idle.

const C = 110;               // centre
const START = 135, SWEEP = 270, MAX = 8; // 0 rpm at bottom-left, 8 at bottom-right
const ang = (v: number) => START + (v / MAX) * SWEEP;
const pt = (v: number, r: number) => { const a = (ang(v) * Math.PI) / 180; return [C + Math.cos(a) * r, C + Math.sin(a) * r]; };
const arc = (v0: number, v1: number, r: number) => {
  const [x0, y0] = pt(v0, r), [x1, y1] = pt(v1, r);
  const large = ang(v1) - ang(v0) > 180 ? 1 : 0;
  return `M${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
};

export default function Tacho() {
  const ticks = [];
  for (let i = 0; i <= MAX * 4; i++) {
    const v = i / 4, major = i % 4 === 0, half = i % 2 === 0;
    const [x0, y0] = pt(v, 92), [x1, y1] = pt(v, major ? 78 : half ? 84 : 87);
    ticks.push(<line key={i} x1={x0} y1={y0} x2={x1} y2={y1} className={`tk${major ? ' mj' : ''}${v >= 6.5 ? ' red' : ''}`} />);
  }
  return (
    <svg className="tacho" viewBox="0 0 220 220" role="img" aria-label="Tachometer">
      <defs>
        <radialGradient id="face" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#1c2026" />
          <stop offset="70%" stopColor="#0c0e11" />
          <stop offset="100%" stopColor="#060708" />
        </radialGradient>
        <linearGradient id="bezel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9aa3ad" />
          <stop offset="35%" stopColor="#2a2f36" />
          <stop offset="65%" stopColor="#5d6670" />
          <stop offset="100%" stopColor="#14171b" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.1" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={C} cy={C} r="106" fill="url(#bezel)" />
      <circle cx={C} cy={C} r="101" fill="url(#face)" />
      {/* red zone band */}
      <path d={arc(6.5, MAX, 95)} className="redzone" />
      {ticks}
      {Array.from({ length: MAX + 1 }, (_, n) => {
        const [x, y] = pt(n, 66);
        return <text key={n} x={x} y={y + 5} textAnchor="middle" className={`num${n >= 7 ? ' red' : ''}`}>{n}</text>;
      })}
      <text x={C} y={C - 30} textAnchor="middle" className="unit">1/min ×1000</text>
      {/* centre readout */}
      <text x={C} y={C + 40} textAnchor="middle" className="t-on" filter="url(#glow)">ON</text>
      <text x={C} y={C + 53} textAnchor="middle" className="place">BRIUKHOVYCHI</text>
      {/* needle (drawn pointing right, rotated by CSS) */}
      <g className="needle">
        <path d={`M${C - 16} ${C - 2.2} L${C + 90} ${C - 0.6} L${C + 90} ${C + 0.6} L${C - 16} ${C + 2.2} Z`} className="nd" filter="url(#glow)" />
      </g>
      <circle cx={C} cy={C} r="11" className="hub" />
      <circle cx={C} cy={C} r="4" className="hub-dot" />
    </svg>
  );
}
