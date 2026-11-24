"use client";

import { Lantern } from "@/components/art/Ornaments";

/**
 * Deterministic pseudo-random so server and client markup match.
 * Every value is rounded to 2 decimals so both sides serialise identical CSS strings.
 */
function rand(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
const r2 = (n: number) => Math.round(n * 100) / 100;

export function Petals({ count = 14, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${r2(rand(i, 1) * 100)}%`,
              "--size": `${r2(9 + rand(i, 2) * 10)}px`,
              "--dur": `${r2(12 + rand(i, 3) * 10)}s`,
              "--delay": `${r2(-rand(i, 4) * 20)}s`,
              "--sway": `${r2((rand(i, 5) - 0.5) * 90)}px`,
              "--petal-op": `${r2(0.55 + rand(i, 6) * 0.35)}`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Lanterns({ count = 7, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.round(22 + rand(i, 7) * 22);
        return (
          <Lantern
            key={i}
            className="lantern absolute"
            style={
              {
                left: `${r2(6 + rand(i, 8) * 84)}%`,
                bottom: `${r2(-10 - rand(i, 9) * 20)}%`,
                width: `${size}px`,
                height: `${Math.round(size * 1.4)}px`,
                "--drift": `${r2((rand(i, 10) - 0.5) * 50)}px`,
                "--lantern-op": `${r2(0.7 + rand(i, 11) * 0.3)}`,
                animation: `rise-drift ${r2(22 + rand(i, 12) * 18)}s linear ${r2(-rand(i, 13) * 30)}s infinite`,
                filter: "drop-shadow(0 0 10px rgba(255, 170, 80, 0.55))",
                willChange: "transform",
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
