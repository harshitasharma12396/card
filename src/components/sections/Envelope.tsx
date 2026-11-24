"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useInvite } from "@/components/Language";
import { Seal } from "@/components/art/Ornaments";
import { Palace, Pedestal } from "@/components/art/Scenes";
import { Lanterns, Petals } from "@/components/Ambient";
import { useMusic } from "@/components/Music";

const EASE = [0.16, 1, 0.3, 1] as const;

type Phase = "idle" | "opening";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const invite = useInvite();
  const reduce = useReducedMotion();
  const { start } = useMusic();
  const [phase, setPhase] = useState<Phase>("idle");
  const [flapBehind, setFlapBehind] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  const open = () => {
    if (phase !== "idle") return;
    start(); // the tap is the user gesture browsers need before audio can play
    setPhase("opening");
    if (reduce) {
      timers.current.push(window.setTimeout(onOpen, 450));
      return;
    }
    timers.current.push(window.setTimeout(() => setFlapBehind(true), 420));
    timers.current.push(window.setTimeout(onOpen, 2650));
  };

  const opening = phase === "opening";
  const initial = invite.couple.monogram;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #e9a9c5 0%, #f4b9b4 38%, #f9d3b4 70%, #fde4c4 100%)" }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.12, filter: "blur(14px)" }}
      transition={{ duration: 0.95, ease: EASE }}
      role="dialog"
      aria-label={invite.a11y.envelopeLabel}
    >
      {/* sun glow */}
      <div
        className="anim-glow absolute left-1/2 top-[34%] h-[120vw] max-h-[620px] w-[120vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,243,204,0.85), rgba(255,243,204,0) 70%)" }}
        aria-hidden="true"
      />
      <Petals count={16} />
      <Lanterns count={5} className="opacity-90" />

      {/* faint palace behind the pedestal */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-[26svh] w-[130%] max-w-[700px] -translate-x-1/2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        aria-hidden="true"
      >
        <Palace className="h-full w-full" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5">
        <div className="relative w-[var(--ew)] [--ew:min(80vw,340px,50svh)] mb-[calc(var(--ew)*0.42)]">
          {/* pedestal */}
          <motion.div
            className="absolute left-1/2 top-[80%] w-[116%] -translate-x-1/2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            aria-hidden="true"
          >
            <Pedestal className="w-full" />
          </motion.div>

          {/* envelope (floats while waiting) */}
          <motion.div
            className={opening ? "" : "anim-float"}
            initial={{ opacity: 0, y: 36, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: opening && !reduce ? 1.05 : 1 }}
            transition={{ duration: opening ? 0.6 : 1.1, ease: EASE, delay: opening ? 0 : 0.25 }}
          >
            <div className="relative aspect-[340/230] w-full [perspective:900px]" onClick={open}>
              {/* back panel */}
              <svg viewBox="0 0 340 230" className="absolute inset-0 h-full w-full drop-shadow-[0_18px_28px_rgba(120,50,70,0.28)]" aria-hidden="true">
                <defs>
                  <linearGradient id="env-back" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ecc8bd" />
                    <stop offset="1" stopColor="#f6dfd4" />
                  </linearGradient>
                </defs>
                <rect width="340" height="230" rx="8" fill="url(#env-back)" />
              </svg>

              {/* letter inside */}
              <motion.div
                className="absolute inset-x-[7%] top-[8%] z-[2] grid h-[86%] place-items-center overflow-hidden rounded-md border border-[#e9cdb6] bg-ivory text-center shadow-[0_6px_16px_-6px_rgba(120,50,70,0.35)]"
                animate={opening && !reduce ? { y: ["0%", "-62%", "-62%"], scale: [1, 1, 1.05] } : { y: "0%" }}
                transition={{ duration: 1.7, times: [0, 0.55, 1], ease: EASE, delay: 0.85 }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="caps text-[11px] text-mauve">{invite.envelope.youAreInvited}</span>
                  <span className="font-display text-[34px] leading-none text-gold">{initial}</span>
                  <span className="h-px w-16 bg-gold/50" />
                </div>
              </motion.div>

              {/* front pocket */}
              <svg viewBox="0 0 340 230" className="absolute inset-0 z-[3] h-full w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="env-side" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f8e6dc" />
                    <stop offset="1" stopColor="#efcdc1" />
                  </linearGradient>
                  <linearGradient id="env-bottom" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f6dccf" />
                    <stop offset="1" stopColor="#ebc2b4" />
                  </linearGradient>
                </defs>
                <path d="M0 8Q0 0 8 0L182 126 8 230Q0 230 0 222Z" fill="url(#env-side)" />
                <path d="M340 8Q340 0 332 0L158 126 332 230Q340 230 340 222Z" fill="url(#env-side)" />
                <path d="M4 230 170 100 336 230Z" fill="url(#env-bottom)" />
                <path d="M4 230 170 100 336 230M0 4 182 126M340 4 158 126" fill="none" stroke="#c9856f" strokeOpacity="0.28" strokeWidth="1" />
              </svg>

              {/* flap with seal */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[58.7%] origin-top"
                style={{ zIndex: flapBehind ? 1 : 4, transformStyle: "preserve-3d", backfaceVisibility: "visible" }}
                animate={opening ? (reduce ? { opacity: 0 } : { rotateX: -178 }) : { rotateX: 0 }}
                transition={{ duration: 0.95, ease: EASE, delay: opening ? 0.35 : 0 }}
              >
                <svg viewBox="0 0 340 135" className="h-full w-full drop-shadow-[0_6px_8px_rgba(120,50,70,0.18)]" aria-hidden="true">
                  <defs>
                    <linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#fbeee6" />
                      <stop offset="1" stopColor="#f2d4c8" />
                    </linearGradient>
                  </defs>
                  <path d="M0 6Q0 0 8 0H332Q340 0 340 6L178 132Q170 138 162 132Z" fill="url(#env-flap)" stroke="#d9a590" strokeOpacity="0.5" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* seal: separate from the flap so it can crack and glow without 3D flipping */}
              <div className="absolute left-1/2 top-[56%] z-[5] -translate-x-1/2 -translate-y-1/2">
                {!opening && (
                  <>
                    <span className="absolute inset-0 rounded-full border border-gold-bright" style={{ animation: "pulse-ring 2.6s ease-out infinite" }} aria-hidden="true" />
                    <span className="absolute inset-0 rounded-full border border-gold-bright" style={{ animation: "pulse-ring 2.6s ease-out 1.3s infinite" }} aria-hidden="true" />
                    <span
                      className="anim-spin-slow absolute -inset-4 rounded-full"
                      style={{ border: "1px dashed rgba(185,138,58,0.7)" }}
                      aria-hidden="true"
                    />
                  </>
                )}
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                  aria-label={invite.a11y.openInvitation}
                  className="relative block h-16 w-16 rounded-full"
                  whileHover={opening ? undefined : { scale: 1.08 }}
                  whileTap={opening ? undefined : { scale: 0.92 }}
                  animate={opening ? (reduce ? { opacity: 0 } : { scale: [1, 1.35, 0.2], opacity: [1, 1, 0], rotate: [0, 12, -20] }) : { scale: 1 }}
                  transition={{ duration: 0.7, ease: EASE, times: opening ? [0, 0.35, 1] : undefined }}
                  style={{ filter: "drop-shadow(0 4px 8px rgba(120,60,20,0.45))" }}
                >
                  <Seal className="h-full w-full" />
                </motion.button>
              </div>

              {/* light burst */}
              {opening && !reduce && (
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-[56%] z-[6] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: "radial-gradient(closest-side, #fffbe6 0%, #ffe9a8 35%, rgba(255,214,120,0) 72%)" }}
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: [0.2, 3.2, 7], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, times: [0, 0.35, 1], ease: EASE, delay: 0.15 }}
                  aria-hidden="true"
                />
              )}
            </div>
          </motion.div>
        </div>

        <motion.p
          className="caps w-full px-6 text-center text-[12px] text-plum"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: opening ? 0 : [0.55, 1, 0.55], y: 0 }}
          transition={opening ? { duration: 0.3 } : { opacity: { duration: 3.2, repeat: Infinity, ease: "easeInOut" }, y: { duration: 0.9, delay: 1.1, ease: EASE } }}
        >
          {invite.envelope.hint}
        </motion.p>
      </div>

    </motion.div>
  );
}
