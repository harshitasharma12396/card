"use client";

import { useId } from "react";

/**
 * Hand-built placeholder SVG ornaments. All artwork on the site is authored here
 * so it can later be swapped for real illustrations without touching layout code.
 */

const useUid = () => useId().replace(/:/g, "");

type CommonProps = { className?: string; style?: React.CSSProperties };

/* ---------- Gold wax seal ---------- */
export function Seal({ className, style }: CommonProps) {
  const id = useUid();
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-g`} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#fbe6a6" />
          <stop offset="0.45" stopColor="#e0b457" />
          <stop offset="1" stopColor="#9a6d24" />
        </radialGradient>
      </defs>
      <path
        d="M50 4c5 0 7 5 12 6s10-2 13 3 0 9 3 14 9 5 9 11-6 8-7 13 3 10-2 14-9 1-14 3-8 8-14 8-9-5-14-8-10 0-14-4 0-9-2-14-8-8-7-13 6-9 8-13-2-10 3-14 9 0 13-3S45 4 50 4Z"
        fill={`url(#${id}-g)`}
      />
      <circle cx="50" cy="50" r="31" fill="none" stroke="#fff3c9" strokeOpacity="0.55" strokeWidth="1.6" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="#7d561b" strokeOpacity="0.35" strokeWidth="1" />
      {/* lotus */}
      <g transform="translate(50 52)" fill="#fff0bd" fillOpacity="0.9" stroke="#7d561b" strokeOpacity="0.35" strokeWidth="0.8">
        <path d="M0 -17C-6 -9 -6 -2 0 4 6 -2 6 -9 0 -17Z" />
        <path d="M-4 3C-13 -2 -17 -8 -18 -13 -9 -12 -3 -7 -1 2Z" />
        <path d="M4 3C13 -2 17 -8 18 -13 9 -12 3 -7 1 2Z" />
        <path d="M-6 5C-16 4 -22 0 -25 -4 -15 -6 -8 -3 -3 4Z" />
        <path d="M6 5C16 4 22 0 25 -4 15 -6 8 -3 3 4Z" />
        <path d="M-14 12H14" fill="none" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

/* ---------- Divider with centre jewel ---------- */
export function Divider({ className, style }: CommonProps) {
  return (
    <svg viewBox="0 0 160 20" className={className} style={style} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M6 10h52c8 0 10-6 16-6M154 10h-52c-8 0-10-6-16-6" />
        <path d="M30 10c6 5 12 5 18 0M130 10c-6 5-12 5-18 0" opacity="0.7" />
      </g>
      <path d="M80 3l5 7-5 7-5-7z" fill="currentColor" />
      <circle cx="68" cy="10" r="1.6" fill="currentColor" />
      <circle cx="92" cy="10" r="1.6" fill="currentColor" />
    </svg>
  );
}

/* ---------- Small lotus mark ---------- */
export function Lotus({ className, style }: CommonProps) {
  return (
    <svg viewBox="0 0 64 40" className={className} style={style} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.14">
        <path d="M32 3C24 12 24 22 32 31c8-9 8-19 0-28Z" />
        <path d="M27 29C17 25 11 17 10 10c10 1 17 7 19 18Z" />
        <path d="M37 29C47 25 53 17 54 10 44 11 37 17 35 28Z" />
        <path d="M24 33C14 34 6 30 2 24c10-2 18 1 24 8Z" />
        <path d="M40 33c10 1 18-3 22-9-10-2-18 1-24 8Z" />
      </g>
      <path d="M12 37h40" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Sky lantern ---------- */
export function Lantern({ className, style }: CommonProps) {
  const id = useUid();
  return (
    <svg viewBox="0 0 40 56" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd98a" />
          <stop offset="0.55" stopColor="#ff9a4a" />
          <stop offset="1" stopColor="#e2582f" />
        </linearGradient>
        <radialGradient id={`${id}-f`} cx="50%" cy="80%" r="50%">
          <stop offset="0" stopColor="#fff6c8" />
          <stop offset="1" stopColor="#fff6c8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="22" rx="19" ry="21" fill={`url(#${id}-f)`} opacity="0.55" />
      <path d="M8 6h24l4 34H4Z" fill={`url(#${id}-b)`} />
      <path d="M8 6h24" stroke="#c9602e" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 6l-2 34M20 6v34M26 6l2 34" stroke="#c9602e" strokeOpacity="0.35" strokeWidth="0.8" />
      <path d="M4 40h32l-3 5H7Z" fill="#b8481f" />
      <ellipse cx="20" cy="49" rx="3" ry="4.5" fill="#fff0a8" />
    </svg>
  );
}

/* ---------- Rose cluster used in frame corners ---------- */
function Flower({ cx, cy, r, color, centre = "#fff0cf" }: { cx: number; cy: number; r: number; color: string; centre?: string }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy={-r * 0.62} rx={r * 0.46} ry={r * 0.62} fill={color} transform={`rotate(${a})`} fillOpacity="0.92" stroke="#fff" strokeOpacity="0.5" strokeWidth="0.6" />
      ))}
      <circle r={r * 0.28} fill={centre} />
      <circle r={r * 0.12} fill="#d6a23f" />
    </g>
  );
}

export function FloralCorner({ className, style }: CommonProps) {
  return (
    <svg viewBox="0 0 110 110" className={className} style={style} aria-hidden="true">
      <g fill="#7ea184" fillOpacity="0.85">
        <path d="M4 100C20 88 34 80 50 60 40 58 30 62 20 70 12 77 6 86 4 100Z" />
        <path d="M40 104C48 88 64 76 82 70 78 82 70 94 56 100 50 103 45 104 40 104Z" />
        <path d="M10 60C14 46 24 36 38 30 38 42 32 52 22 58 17 61 13 61 10 60Z" />
      </g>
      <Flower cx={32} cy={72} r={17} color="#f4b4c4" />
      <Flower cx={66} cy={86} r={12} color="#f9d1b8" />
      <Flower cx={22} cy={40} r={11} color="#f2a1b6" />
      <Flower cx={56} cy={56} r={9} color="#fbe0e6" />
      <circle cx="80" cy="64" r="3" fill="#e0b457" />
      <circle cx="44" cy="96" r="2.4" fill="#e0b457" />
    </svg>
  );
}

/* ---------- Hanging chhatri (umbrella) with beads ---------- */
export function HangingUmbrella({ className, style, tone = "rose" }: CommonProps & { tone?: "rose" | "gold" }) {
  const id = useUid();
  const c1 = tone === "rose" ? "#f4b8c4" : "#f3d9a0";
  const c2 = tone === "rose" ? "#d9667f" : "#c99a3e";
  return (
    <svg viewBox="0 0 90 190" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-d`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
      </defs>
      <path d="M45 0v34" stroke="#b98a3a" strokeWidth="1.4" />
      <path d="M45 30c-6-14-6-18 0-22 6 4 6 8 0 22Z" fill="#e0b457" />
      <path d="M8 62C10 40 28 34 45 34s35 6 37 28Z" fill={`url(#${id}-d)`} stroke="#b98a3a" strokeWidth="1.2" />
      <path d="M45 34C34 40 28 50 26 62M45 34C56 40 62 50 64 62M45 34v28" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.9" fill="none" />
      <path d="M8 62q4 7 8.5 0t8.5 0 8.5 0 8.5 0 8.5 0 8.5 0 8.5 0 8.5 0 8.5 0" stroke="#b98a3a" strokeWidth="1.2" fill="#fff4e6" />
      {[14, 28, 45, 62, 76].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 68v${46 + (i % 2) * 18}`} stroke="#b98a3a" strokeWidth="0.9" />
          {[0, 1, 2, 3].map((k) => (
            <circle key={k} cx={x} cy={80 + k * 12 + (i % 2) * 4} r="2.1" fill={k === 3 ? "#e0b457" : "#fff4e6"} stroke="#b98a3a" strokeWidth="0.6" />
          ))}
          <path d={`M${x} ${118 + (i % 2) * 18}l-3 8h6z`} fill="#e0b457" />
        </g>
      ))}
    </svg>
  );
}

/* ---------- Bead tassel hanging below a frame ---------- */
export function Tassel({ className, style }: CommonProps) {
  return (
    <svg viewBox="0 0 24 78" className={className} style={style} aria-hidden="true">
      <path d="M12 0v10" stroke="#b98a3a" strokeWidth="1.2" />
      <circle cx="12" cy="14" r="4" fill="#e0b457" stroke="#9a6d24" strokeWidth="0.7" />
      <circle cx="12" cy="26" r="3.2" fill="#fff4e6" stroke="#b98a3a" strokeWidth="0.7" />
      <circle cx="12" cy="36" r="3.2" fill="#fff4e6" stroke="#b98a3a" strokeWidth="0.7" />
      <path d="M12 42c-6 2-8 8-8 14 0 7 4 14 8 20 4-6 8-13 8-20 0-6-2-12-8-14Z" fill="#e0b457" stroke="#9a6d24" strokeWidth="0.8" />
      <path d="M12 46v28M8 50c-1 8 0 16 4 24M16 50c1 8 0 16-4 24" stroke="#fff3c9" strokeOpacity="0.7" strokeWidth="0.7" fill="none" />
    </svg>
  );
}

/* ---------- Beaded torana strand ---------- */
export function Torana({ className, style, count = 4 }: CommonProps & { count?: number }) {
  const w = 320;
  const step = w / count;
  return (
    <svg viewBox={`0 0 ${w} 40`} className={className} style={style} aria-hidden="true" fill="none">
      <path d={`M2 6 Q${w / 2} 30 ${w - 2} 6`} stroke="#b98a3a" strokeWidth="1.3" />
      {Array.from({ length: 28 }).map((_, i) => {
        const t = i / 27;
        const x = 2 + t * (w - 4);
        const y = 6 + 4 * 6 * t * (1 - t) * 1.0 * 2 * 0.5 * 2;
        return <circle key={i} cx={x} cy={y} r={i % 3 === 1 ? 2.4 : 1.6} fill={i % 3 === 1 ? "#e0b457" : "#fff4e6"} stroke="#b98a3a" strokeWidth="0.6" />;
      })}
      {Array.from({ length: count }).map((_, i) => {
        const x = step * (i + 0.5);
        const t = x / w;
        const y = 6 + 24 * 0.5 * 4 * t * (1 - t) * 0.5 * 2;
        return <circle key={`p${i}`} cx={x} cy={y + 1} r="3.2" fill="#e0b457" stroke="#9a6d24" strokeWidth="0.7" />;
      })}
    </svg>
  );
}

/* ---------- Event icons ---------- */
export function EventIcon({ kind, className, style }: CommonProps & { kind: "kalash" | "mehendi" | "haldi" | "shaadi" | "reception" }) {
  if (kind === "kalash") {
    return (
      <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true">
        {/* mango leaves */}
        <g fill="#6f9a74" stroke="#4f7a57" strokeWidth="0.8">
          <path d="M40 24C30 20 22 22 17 28c8 3 16 2 23-4Z" />
          <path d="M40 24C50 20 58 22 63 28c-8 3-16 2-23-4Z" />
          <path d="M40 22C37 14 38 8 40 5c2 3 3 9 0 17Z" />
        </g>
        {/* coconut */}
        <ellipse cx="40" cy="25" rx="9" ry="8" fill="#a8703a" stroke="#6f4520" strokeWidth="1" />
        <circle cx="37" cy="24" r="1.2" fill="#6f4520" />
        <circle cx="43" cy="24" r="1.2" fill="#6f4520" />
        {/* pot */}
        <path d="M30 32h20l-2 5c8 4 12 11 12 18 0 9-8 16-20 16s-20-7-20-16c0-7 4-14 12-18Z" fill="#e0b457" stroke="#9a6d24" strokeWidth="1.4" />
        <path d="M28 37h24" stroke="#9a6d24" strokeWidth="1.6" />
        <path d="M24 55c4 2 8 3 16 3s12-1 16-3" stroke="#fff3c9" strokeOpacity="0.7" strokeWidth="1.2" fill="none" />
        <path d="M40 44l3 5-3 5-3-5Z" fill="#d9566f" />
      </svg>
    );
  }
  if (kind === "mehendi") {
    return (
      <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true">
        <g transform="rotate(32 40 40)">
          <path d="M34 12c0-4 12-4 12 0l-4 44c-1 5-3 9-2 12-1-3-3-7-2-12Z" fill="#2c2a55" />
          <path d="M36 22q4 3 8 0M36 30q4 3 8 0M37 38q3 3 6 0" stroke="#e0b457" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </g>
        <Flower cx={22} cy={58} r={10} color="#f4b4c4" />
        <Flower cx={56} cy={62} r={8} color="#f9d1b8" />
        <path d="M10 66c8-6 14-6 20-4M48 70c6-4 12-4 20-2" stroke="#7ea184" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (kind === "haldi") {
    return (
      <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true">
        <path d="M14 38h52c0 18-10 30-26 30S14 56 14 38Z" fill="#dba832" stroke="#9a6d24" strokeWidth="1.4" />
        <path d="M14 38h52" stroke="#9a6d24" strokeWidth="2" />
        <path d="M22 44c6 8 10 12 18 14M58 44c-6 8-10 12-18 14" stroke="#fff3c9" strokeOpacity="0.7" strokeWidth="1.2" fill="none" />
        <ellipse cx="40" cy="36" rx="22" ry="7" fill="#f3b72d" />
        <circle cx="30" cy="28" r="8" fill="#f59a23" />
        <circle cx="44" cy="25" r="9" fill="#f7b02b" />
        <circle cx="54" cy="31" r="7" fill="#f59a23" />
        <circle cx="30" cy="28" r="3" fill="#c96d1c" />
        <circle cx="44" cy="25" r="3.4" fill="#c96d1c" />
        <circle cx="54" cy="31" r="2.6" fill="#c96d1c" />
        <path d="M26 66h28v4H26z" fill="#9a6d24" />
      </svg>
    );
  }
  if (kind === "shaadi") {
    return (
      <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true">
        <path d="M10 28C14 14 28 8 40 8s26 6 30 20Z" fill="#4a5aa8" stroke="#2f3a7a" strokeWidth="1.2" />
        <path d="M10 28q5 6 10 0t10 0 10 0 10 0 10 0 10 0" fill="#f3d9a0" stroke="#b98a3a" strokeWidth="1" />
        {[16, 64].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="30" width="6" height="40" fill="#fff4e6" stroke="#b98a3a" strokeWidth="1" />
            <path d={`M${x - 5} 70h10v4H${x - 5}z`} fill="#b98a3a" />
          </g>
        ))}
        <path d="M22 34q18 14 36 0" stroke="#e0556f" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M24 40q16 12 32 0" stroke="#f5a3b6" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M28 70h24l-3-14H31z" fill="#f4b8c4" stroke="#b98a3a" strokeWidth="1" />
        <circle cx="40" cy="22" r="3" fill="#e0b457" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true">
      <path d="M12 74V34C12 18 24 8 40 8s28 10 28 26v40" fill="none" stroke="#b98a3a" strokeWidth="1.8" />
      <path d="M20 74V36C20 24 28 16 40 16s20 8 20 20v38" fill="#f6e3ec" stroke="#c96d6a" strokeWidth="1.2" />
      <path d="M40 16v8M40 24c-8 0-12 6-12 12h24c0-6-4-12-12-12Z" fill="#e0b457" />
      <g fill="#fff0a8">
        <circle cx="30" cy="48" r="2.4" className="anim-twinkle" />
        <circle cx="50" cy="44" r="2.4" className="anim-twinkle" style={{ animationDelay: "0.8s" }} />
        <circle cx="40" cy="56" r="2.4" className="anim-twinkle" style={{ animationDelay: "1.6s" }} />
      </g>
      <path d="M30 74h20M34 62h12M40 62v12" stroke="#b98a3a" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Music / map glyphs ---------- */
export function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.800 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

export function NoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </svg>
  );
}

export function ChevronIcon({ className, dir = "down" }: { className?: string; dir?: "down" | "left" | "right" }) {
  const rot = dir === "down" ? 0 : dir === "left" ? 90 : -90;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3.1A4.6 4.6 0 0 1 20 10c0 5.8-8 11-8 11Z" />
    </svg>
  );
}

export function MinusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 12h12" />
    </svg>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 12h12M12 6v12" />
    </svg>
  );
}
