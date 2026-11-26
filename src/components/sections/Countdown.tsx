"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { en } from "@/content/invite";
import { useInvite } from "@/components/Language";
import { Divider, HeartIcon, Lantern, Torana } from "@/components/art/Ornaments";
import { Palace, Skyline } from "@/components/art/Scenes";
import { Lanterns } from "@/components/Ambient";
import { Reveal } from "@/components/Reveal";
import { splitDuration, useNowSeconds } from "@/lib/use-now";

const EASE = [0.16, 1, 0.3, 1] as const;
const TARGET = new Date(en.wedding.startsAt).getTime() / 1000;

function Tile({ value, label, index }: { value: number | null; label: string; index: number }) {
  const text = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <span className="h-3 w-px bg-gold" aria-hidden="true" />
      <div className="anim-sway-soft relative w-full max-w-[72px]" style={{ animationDelay: `${-index * 1.1}s` }}>
        <svg viewBox="0 0 72 96" className="w-full drop-shadow-[0_10px_14px_rgba(74,29,59,0.28)]" aria-hidden="true">
          <defs>
            <linearGradient id="tile-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fffaf5" />
              <stop offset="1" stopColor="#f9e4e8" />
            </linearGradient>
          </defs>
          <path d="M36 2c7 0 9 7 15 10 8 4 13 8 13 18v54H8V30c0-10 5-14 13-18 6-3 8-10 15-10Z" fill="url(#tile-fill)" stroke="#4a1d3b" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M36 8c5 0 7 6 12 9 7 3 11 6 11 14v50H13V31c0-8 4-11 11-14 5-3 7-9 12-9Z" fill="none" stroke="#b98a3a" strokeWidth="1" strokeOpacity="0.8" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
          <div className="relative h-8 w-full overflow-hidden text-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={text}
                className="font-display num absolute inset-0 text-[28px] leading-8 text-rose-ink"
                initial={{ y: "70%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-70%", opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {text}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="caps mt-0.5 text-[10px] tracking-[0.06em] text-plum-soft">{label}</span>
        </div>
      </div>
    </div>
  );
}

type Wish = { id: number; text: string; left: number; rise: number };

export function Countdown() {
  const reduce = useReducedMotion();
  const invite = useInvite();
  const t = invite.countdown;
  const now = useNowSeconds();
  const left = now === null ? null : splitDuration(TARGET - now);
  const [panel, setPanel] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [text, setText] = useState("");
  const counter = useRef(0);

  function release() {
    const fallback = t.wishFallbacks[counter.current % t.wishFallbacks.length];
    const wish = text.trim() || fallback;
    counter.current += 1;
    const id = counter.current;
    setWishes((w) => [...w, { id, text: wish, left: 14 + ((id * 37) % 60), rise: Math.round(window.innerHeight * 1.1) }]);
    setText("");
    setPanel(false);
    // remove the lantern once it has floated away
    window.setTimeout(() => setWishes((all) => all.filter((x) => x.id !== id)), (reduce ? 4 : 11) * 1000 + 300);
  }

  const units: [keyof typeof t.units, number | null][] = [
    ["days", left?.days ?? null],
    ["hours", left?.hours ?? null],
    ["minutes", left?.minutes ?? null],
    ["seconds", left?.seconds ?? null],
  ];

  return (
    <section className="relative isolate overflow-hidden px-6 pb-0 pt-10 text-center">
      <Lanterns count={5} className="-z-10 opacity-55" />

      <div className="column">
        <Reveal>
          <h2 lang="en" className="font-display text-[26px] leading-tight text-plum">
            {t.heading}
            <span className="font-accent mt-0.5 block text-[56px] italic leading-tight text-gold-deep">{t.headingAccent}</span>
          </h2>
          <Divider className="mx-auto mt-2 w-24 text-plum/60" />
        </Reveal>

        <Reveal className="mt-10" y={40}>
          <div role="timer" aria-label={invite.a11y.timer(left?.days ?? null)}>
            <Torana className="w-full" count={4} />
            <div className="-mt-[6px] grid grid-cols-4 gap-1.5">
              {units.map(([k, v], i) => (
                <Tile key={k} value={v} label={t.units[k]} index={i} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-14" delay={0.1}>
          <Divider className="mx-auto w-28 text-gold" />
          <p className="font-accent mt-5 text-[27px] italic leading-snug text-plum balance">
            {t.tagline[0]}
            <br />
            {t.tagline[1]}
          </p>

          <motion.button
            type="button"
            onClick={() => setPanel((p) => !p)}
            aria-expanded={panel}
            className="btn-shimmer caps mt-8 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/55 px-6 py-3.5 text-[11px] text-plum shadow-[0_10px_22px_-10px_rgba(74,29,59,0.4)]"
            whileTap={{ scale: 0.96 }}
          >
            <Lantern className="h-5 w-4" />
            {t.wishButton}
          </motion.button>

          <AnimatePresence initial={false}>
            {panel && (
              <motion.div
                key="panel"
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <div className="mx-auto mt-5 flex max-w-[330px] flex-col gap-3 rounded-[22px] border border-white/80 bg-white/75 p-4 text-left">
                  <label htmlFor="wish" className="caps text-[11px] text-mauve">{t.wishPrompt}</label>
                  <input
                    id="wish"
                    className="field"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t.wishPlaceholder}
                    maxLength={90}
                    onKeyDown={(e) => e.key === "Enter" && release()}
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={release} className="caps flex-1 rounded-full bg-plum px-4 py-3.5 text-[11px] text-gold-soft">
                      {t.wishSend}
                    </button>
                    <button type="button" onClick={() => setPanel(false)} className="caps rounded-full border border-plum/25 px-4 py-3.5 text-[11px] text-plum-soft">
                      {t.wishClose}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>

        {/* footer */}
        <Reveal className="relative z-10 mt-24 pb-44" delay={0.1}>
          <p className="font-accent text-[22px] italic text-plum-soft">{invite.footer.withLove}</p>
          <p className="font-display mt-2 text-[30px] leading-tight text-plum">
            {invite.couple.first} {invite.couple.and} {invite.couple.second}
          </p>
          <p className="mt-1 text-[14px] text-plum-soft">{invite.footer.families}</p>
          <p className="caps mt-6 text-[11px] text-plum-soft">{invite.wedding.dateLong}</p>
          <p className="caps mt-1.5 text-[11px] text-plum-soft">
            {invite.wedding.venue}, {invite.wedding.city}
          </p>
          <p className="caps mt-12 flex items-center justify-center gap-2 text-[11px] text-plum">
            <HeartIcon className="h-3.5 w-3.5 text-rose-ink" />
            {invite.footer.madeWith}
          </p>
          <p className="font-accent mt-1 text-[16px] italic text-plum">{invite.footer.tagline}</p>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[190px] max-w-[620px]" aria-hidden="true">
        <Palace tone="lilac" className="h-full w-full opacity-70" />
        <Skyline className="absolute inset-x-0 bottom-0 h-16 w-full opacity-60" />
      </div>

      {/* released wish lanterns */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-live="polite">
        {wishes.map((w) => (
          <motion.div
            key={w.id}
            className="absolute flex w-[150px] -translate-x-1/2 flex-col items-center"
            style={{ left: `${w.left}%`, bottom: 0 }}
            initial={{ y: 40, opacity: 0, scale: 0.7 }}
            animate={reduce ? { y: -260, opacity: [0, 1, 1, 0], scale: 1 } : { y: -w.rise, opacity: [0, 1, 1, 1, 0], scale: 1, x: [0, 14, -10, 8, 0] }}
            transition={{ duration: reduce ? 4 : 11, ease: "easeOut" }}
          >
            <Lantern className="h-16 w-12 drop-shadow-[0_0_16px_rgba(255,170,80,0.8)]" />
            <p className="font-accent mt-2 rounded-xl bg-white/80 px-3 py-1.5 text-[14px] italic leading-snug text-plum balance">{w.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
