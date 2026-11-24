"use client";

import { useId } from "react";

const useUid = () => useId().replace(/:/g, "");

type CommonProps = { className?: string; style?: React.CSSProperties };

/* ---------- Palace silhouette (placeholder skyline) ---------- */
export function Palace({ className, style, tone = "warm" }: CommonProps & { tone?: "warm" | "lilac" }) {
  const id = useUid();
  const top = tone === "warm" ? "#d7a77d" : "#b58bc0";
  const bot = tone === "warm" ? "#8d5a55" : "#8a64a0";
  return (
    <svg viewBox="0 0 400 170" className={className} style={style} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={`${id}-p`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bot} />
        </linearGradient>
      </defs>
      <g fill={`url(#${id}-p)`}>
        {/* main block */}
        <rect x="104" y="76" width="192" height="94" />
        <rect x="14" y="112" width="372" height="58" />
        {/* centre dome */}
        <path d="M146 76C150 40 176 22 200 22s50 18 54 54Z" />
        <rect x="198" y="6" width="4" height="18" />
        <circle cx="200" cy="6" r="3.2" />
        {/* towers */}
        {[80, 320].map((x) => (
          <g key={x}>
            <rect x={x - 17} y="62" width="34" height="108" />
            <path d={`M${x - 21} 62C${x - 19} 40 ${x - 8} 30 ${x} 30s${x - 0 > 0 ? 19 : 19} 10 21 32Z`} />
            <rect x={x - 1.5} y="14" width="3" height="18" />
            <circle cx={x} cy="14" r="2.6" />
          </g>
        ))}
        {/* chhatris */}
        {[38, 362].map((x) => (
          <g key={x}>
            <path d={`M${x - 17} 96C${x - 15} 80 ${x - 7} 74 ${x} 74s15 6 17 22Z`} />
            <rect x={x - 1.2} y="64" width="2.4" height="11" />
          </g>
        ))}
        {[150, 250].map((x) => (
          <g key={x}>
            <path d={`M${x - 14} 90C${x - 12} 76 ${x - 6} 70 ${x} 70s12 6 14 20Z`} />
          </g>
        ))}
      </g>
      {/* arched windows */}
      <g fill="#6d3c4c" fillOpacity="0.55">
        {[120, 144, 168, 232, 256, 280].map((x) => (
          <path key={x} d={`M${x - 6} 112v-14a6 6 0 0 1 12 0v14Z`} transform={`translate(0 ${x > 168 && x < 232 ? 0 : 0})`} />
        ))}
        <path d="M188 170v-34a12 12 0 0 1 24 0v34Z" />
        {[30, 56, 344, 370].map((x) => (
          <path key={x} d={`M${x - 5} 150v-12a5 5 0 0 1 10 0v12Z`} />
        ))}
        {[80, 320].map((x) => (
          <path key={x} d={`M${x - 5} 100v-16a5 5 0 0 1 10 0v16Z`} />
        ))}
      </g>
    </svg>
  );
}

/* ---------- Pedestal for the envelope ---------- */
export function Pedestal({ className, style }: CommonProps) {
  const id = useUid();
  return (
    <svg viewBox="0 0 360 150" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e7c1b7" />
          <stop offset="0.5" stopColor="#f8e2d6" />
          <stop offset="1" stopColor="#dcb0a8" />
        </linearGradient>
        <linearGradient id={`${id}-t`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1e6" />
          <stop offset="1" stopColor="#efc9bd" />
        </linearGradient>
      </defs>
      <ellipse cx="180" cy="42" rx="170" ry="30" fill={`url(#${id}-t)`} />
      <ellipse cx="180" cy="42" rx="150" ry="24" fill="none" stroke="#c9856f" strokeOpacity="0.45" strokeWidth="1.2" />
      <path d="M10 42v44c0 17 76 30 170 30s170-13 170-30V42c0 17-76 30-170 30S10 59 10 42Z" fill={`url(#${id}-s)`} />
      <g stroke="#b9715f" strokeOpacity="0.35" strokeWidth="1" fill="none">
        <path d="M18 66c30 16 90 24 162 24s132-8 162-24" />
        {[40, 80, 120, 160, 200, 240, 280, 320].map((x, i) => (
          <path key={x} d={`M${x} ${70 + Math.abs(i - 3.5) * 1.8}v${24 - Math.abs(i - 3.5) * 1.4}`} />
        ))}
      </g>
      <g fill="#9a5b50" fillOpacity="0.7">
        {[162, 180, 198].map((x) => (
          <path key={x} d={`M${x} 102l4 6-4 6-4-6z`} />
        ))}
      </g>
    </svg>
  );
}

/* ---------- Couple placeholder scenes (gallery) ---------- */
type Pose = { x: number; y: number; s: number };

function Bride({ x, y, s }: Pose) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 100 -16 36q16-10 32 0l10 64Z" fill="#d9566f" />
      <path d="M-26 100h52" stroke="#f2c14e" strokeWidth="3" />
      <path d="M-18 46q18 10 36 0" stroke="#f2c14e" strokeWidth="2" fill="none" />
      <path d="M-14 32q-16 22-12 68" stroke="#f4a9b8" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="-9" y="18" width="18" height="20" rx="9" fill="#e6b69a" />
      <path d="M-11 20q11-14 22 0v-6q-11-12-22 0Z" fill="#3a1f2c" />
      <circle cx="0" cy="12" r="2" fill="#f2c14e" />
    </g>
  );
}

function Groom({ x, y, s }: Pose) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 36h28l6 64h-40Z" fill="#f4e3c8" />
      <path d="M0 36v64" stroke="#c99a3e" strokeWidth="2" />
      {[48, 60, 72].map((k) => (
        <circle key={k} cx="0" cy={k} r="1.6" fill="#c99a3e" />
      ))}
      <path d="M-14 38h28" stroke="#c99a3e" strokeWidth="3" />
      <rect x="-8" y="18" width="16" height="20" rx="8" fill="#d9a888" />
      <path d="M-11 20q11-20 22 0l-2-6q-9-10-18 0Z" fill="#e0a13a" />
      <path d="M-11 20h22" stroke="#b9772a" strokeWidth="1.5" />
    </g>
  );
}

export function CoupleScene({ variant, className, style }: CommonProps & { variant: 1 | 2 | 3 | 4 }) {
  const id = useUid();
  const skies: Record<number, [string, string, string]> = {
    1: ["#d9e6dc", "#f6e6d6", "#cfe0cc"],
    2: ["#f6d9c8", "#f9e7d3", "#d7c7a0"],
    3: ["#5d4d8f", "#a57fb0", "#e9b3b0"],
    4: ["#f3a98c", "#f8cf9c", "#e9a18f"],
  };
  const [a, b, c] = skies[variant];
  return (
    <svg viewBox="0 0 300 380" className={className} style={style} role="img" aria-label="Placeholder couple illustration" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="0.7" stopColor={b} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff6cc" />
          <stop offset="1" stopColor="#fff6cc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="380" fill={`url(#${id}-sky)`} />

      {variant === 1 && (
        <g>
          <g fill="#7b9a7e" fillOpacity="0.85">
            <path d="M40 300c-14-50-8-110 0-160 8 50 14 110 0 160Z" />
            <path d="M262 300c-14-50-8-110 0-160 8 50 14 110 0 160Z" />
          </g>
          <path d="M70 300V190q0-60 80-60t80 60v110Z" fill="#f1e1d1" opacity="0.85" />
          <path d="M92 300V200q0-40 58-40t58 40v100Z" fill="#d8c0a8" opacity="0.7" />
          <path d="M0 300h300v80H0Z" fill="#9db78a" />
          <Bride x={112} y={150} s={1.5} />
          <Groom x={186} y={152} s={1.5} />
        </g>
      )}

      {variant === 2 && (
        <g>
          <path d="M0 250c60-30 120-30 160-10s100 20 140-10v150H0Z" fill="#b8c99a" />
          <path d="M120 380c20-60 40-100 70-130 8 40-10 90-30 130Z" fill="#e9d6b4" opacity="0.9" />
          <g fill="#6f9174" fillOpacity="0.8">
            <path d="M20 270c-10-40-6-90 0-130 8 40 12 90 0 130Z" />
            <path d="M282 270c-10-40-6-90 0-130 8 40 12 90 0 130Z" />
          </g>
          <Bride x={116} y={148} s={1.5} />
          <Groom x={184} y={150} s={1.5} />
        </g>
      )}

      {variant === 3 && (
        <g>
          <circle cx="220" cy="80" r="26" fill="#fff6cc" />
          <circle cx="226" cy="76" r="26" fill="#a57fb0" />
          <g fill="#fff6cc">
            {[[40, 60], [90, 40], [150, 90], [60, 130], [250, 150], [20, 180], [180, 30]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={1.6} className="anim-twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
          </g>
          <path d="M0 290h300v90H0Z" fill="#6a4f80" />
          <path d="M0 290V250c20-20 30-20 50 0v40M60 290v-50c18-24 28-24 46 0v50M230 290v-44c14-20 24-20 40 0v44" fill="#4d3868" />
          <Bride x={116} y={193} s={1.4} />
          <Groom x={180} y={195} s={1.4} />
        </g>
      )}

      {variant === 4 && (
        <g>
          <circle cx="150" cy="210" r="90" fill={`url(#${id}-sun)`} />
          <circle cx="150" cy="215" r="34" fill="#fde3a0" />
          <path d="M0 280c40-40 70-40 100-10 20-26 50-34 80-6 30-22 80-14 120 16v100H0Z" fill="#a96478" opacity="0.8" />
          <path d="M0 310h300v70H0Z" fill="#8a4a63" />
          <Bride x={116} y={193} s={1.35} />
          <Groom x={178} y={195} s={1.35} />
        </g>
      )}
    </svg>
  );
}

/* ---------- Skyline for the footer ---------- */
export function Skyline({ className, style }: CommonProps) {
  return (
    <svg viewBox="0 0 400 80" className={className} style={style} aria-hidden="true" preserveAspectRatio="xMidYMax slice">
      <g fill="#8a64a0" fillOpacity="0.55">
        <path d="M0 80V58h30V44c0-8 6-12 10-18 4 6 10 10 10 18v14h26V70h30V52c0-12 8-18 14-28 6 10 14 16 14 28v18h24V60h20V40c0-14 10-20 16-30 6 10 16 16 16 30v20h22V64h26V50c0-8 6-12 10-18 4 6 10 10 10 18v14h30V56h24V42c0-8 6-12 10-18 4 6 10 10 10 18v14h22V80Z" />
      </g>
    </svg>
  );
}
