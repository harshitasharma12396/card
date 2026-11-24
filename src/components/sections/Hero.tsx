"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { invite } from "@/content/invite";
import { Divider, ChevronIcon } from "@/components/art/Ornaments";
import { Palace } from "@/components/art/Scenes";
import { Lanterns, Petals } from "@/components/Ambient";
import { downloadCalendar } from "@/lib/ics";

const EASE = [0.16, 1, 0.3, 1] as const;

function Letters({ text, delay = 0, active }: { text: string; delay?: number; active: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span aria-label={text} className="inline-flex overflow-hidden pb-[0.12em]">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0, rotate: 6 }}
          animate={active ? { y: "0%", opacity: 1, rotate: 0 } : undefined}
          transition={{ duration: reduce ? 0.5 : 0.9, ease: EASE, delay: delay + i * 0.07 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero({ active }: { active: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const palaceY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 70]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -50]);
  const lanternY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const { couple, wedding } = invite;

  return (
    <section ref={ref} className="relative isolate flex min-h-svh flex-col items-center overflow-hidden px-6 pt-[10svh] text-center">
      {/* sky glow */}
      <div
        className="anim-glow absolute left-1/2 top-[55%] -z-10 h-[150vw] max-h-[720px] w-[150vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,236,190,0.75), rgba(255,236,190,0) 70%)" }}
        aria-hidden="true"
      />

      <motion.div className="absolute inset-0 -z-10" style={{ y: lanternY }}>
        <Lanterns count={9} />
        <Petals count={12} />
      </motion.div>

      <motion.div className="column relative z-10 flex flex-col items-center" style={{ y: textY }}>
        <motion.p
          className="font-deva text-[22px] leading-none text-plum"
          initial={{ opacity: 0, y: -12 }}
          animate={active ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        >
          {couple.blessing}
        </motion.p>

        <h1 className="balance mt-8 flex flex-col items-center font-display text-[clamp(3.1rem,17vw,4.6rem)] leading-[1.02] text-plum">
          <Letters text={couple.first} delay={0.7} active={active} />
          <motion.span
            className="font-accent my-0.5 text-[clamp(2.6rem,12vw,3.4rem)] italic leading-none text-gold [text-shadow:0_2px_14px_rgba(255,236,190,0.9)]"
            initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
            animate={active ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 1.15 }}
            aria-hidden="true"
          >
            &amp;
          </motion.span>
          <Letters text={couple.second} delay={1.3} active={active} />
        </h1>

        <motion.div
          className="mt-8 w-40 text-gold"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={active ? { opacity: 1, scaleX: 1 } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: 2 }}
        >
          <Divider className="w-full" />
        </motion.div>

        <motion.p
          className="caps mt-6 text-[12px] text-plum"
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 2.2 }}
        >
          {wedding.dateLong}
        </motion.p>

        <motion.button
          type="button"
          onClick={downloadCalendar}
          className="btn-shimmer caps mt-8 rounded-full border border-plum/40 bg-white/40 px-7 py-3.5 text-[11px] text-plum transition-colors hover:bg-white/70"
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 2.45 }}
          whileTap={{ scale: 0.96 }}
        >
          {wedding.saveTheDate}
        </motion.button>
      </motion.div>

      {/* palace */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[62%]"
        style={{ background: "linear-gradient(180deg, rgba(250,205,170,0) 0%, rgba(251,206,160,0.7) 70%, rgba(253,226,180,0.85) 100%)", maskImage: "linear-gradient(to bottom, transparent, black 30%, black 82%, transparent)" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-0 h-[28svh] w-[140%] max-w-[760px] -translate-x-1/2"
        style={{ y: palaceY, maskImage: "linear-gradient(to bottom, black 62%, transparent 100%)" }}
        aria-hidden="true"
      >
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={active ? { opacity: 0.85, y: 0 } : undefined}
          transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
        >
          <Palace className="h-full w-full" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-plum-soft"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : undefined}
        transition={{ delay: 3, duration: 1 }}
        aria-hidden="true"
      >
        <ChevronIcon className="anim-nudge-down h-7 w-7" />
      </motion.div>
    </section>
  );
}
