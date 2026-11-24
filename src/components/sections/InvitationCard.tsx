"use client";

import { motion, useReducedMotion } from "motion/react";
import { invite } from "@/content/invite";
import { Divider, FloralCorner, HangingUmbrella, Lotus, PinIcon } from "@/components/art/Ornaments";
import { staggerChild, staggerParent } from "@/components/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

// Cusped, shouldered arch (mughal-style): small bumps on each shoulder, a point at the crown.
const OUTER =
  "M12 548V210C12 190 22 178 40 168C58 158 66 146 74 130C84 108 98 98 112 84C128 68 142 56 150 36C158 56 172 68 188 84C202 98 216 108 226 130C234 146 242 158 260 168C278 178 288 190 288 210V548Z";
const INNER =
  "M24 536V214C24 198 32 188 48 180C68 170 78 158 86 142C96 122 108 112 122 98C136 84 146 72 150 54C154 72 164 84 178 98C192 112 204 122 214 142C222 158 232 170 252 180C268 188 276 198 276 214V536Z";

export function InvitationCard() {
  const reduce = useReducedMotion();
  const { couple, wedding, card } = invite;

  return (
    <section className="relative px-6 pb-24 pt-20">
      <div className="column relative mx-auto max-w-[312px]">
        {/* hanging chhatris */}
        <HangingUmbrella className="anim-sway absolute -left-6 -top-16 z-10 w-[64px]" />
        <HangingUmbrella tone="gold" className="anim-sway absolute -right-6 -top-12 z-10 w-[58px]" style={{ animationDelay: "-2.4s" }} />

        <motion.div
          className="relative"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <motion.svg
            viewBox="0 0 300 560"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full drop-shadow-[0_22px_30px_rgba(120,50,70,0.2)]"
            aria-hidden="true"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(-80px -80px 100% -80px)" }}
            whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(-80px -80px -80px -80px)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <defs>
              <linearGradient id="arch-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff9f4" />
                <stop offset="1" stopColor="#fbe8ec" />
              </linearGradient>
            </defs>
            <path d={OUTER} fill="url(#arch-fill)" />
            <path d={OUTER} fill="none" stroke="#c96d6a" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
            <path d={INNER} fill="none" stroke="#b98a3a" strokeWidth="1" strokeOpacity="0.85" vectorEffect="non-scaling-stroke" />
          </motion.svg>

          <FloralCorner className="absolute -bottom-3 -left-4 w-[92px]" />
          <FloralCorner className="absolute -bottom-3 -right-4 w-[92px] -scale-x-100" />

          <motion.div
            className="relative flex flex-col items-center px-9 pb-20 pt-[178px] text-center"
            variants={staggerParent(0.14, 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          >
            <motion.div variants={staggerChild(12)} className="text-terracotta-ink">
              <Lotus className="h-9 w-14" />
            </motion.div>

            <motion.p variants={staggerChild()} className="font-accent balance mt-4 max-w-[19ch] text-[16px] italic leading-snug text-rose-ink">
              {card.blessing}
            </motion.p>
            <motion.p variants={staggerChild()} className="balance mt-2 max-w-[24ch] text-[14px] leading-relaxed text-plum-soft">
              {card.request}
            </motion.p>

            <motion.h2 variants={staggerChild()} className="mt-7 font-display text-[40px] leading-none text-plum">
              {couple.first}
            </motion.h2>
            <motion.p variants={staggerChild()} className="mt-2 text-[12px] text-mauve">
              {couple.firstParents}
            </motion.p>

            <motion.div variants={staggerChild(8)} className="my-3 w-24 text-gold">
              <Divider className="w-full" />
            </motion.div>

            <motion.h2 variants={staggerChild()} className="font-display text-[40px] leading-none text-plum">
              {couple.second}
            </motion.h2>
            <motion.p variants={staggerChild()} className="mt-2 text-[12px] text-mauve">
              {couple.secondParents}
            </motion.p>

            <motion.div variants={staggerChild(8)} className="mt-7 text-terracotta-ink">
              <Lotus className="h-7 w-11" />
            </motion.div>

            <motion.p variants={staggerChild()} className="font-display mt-3 text-[19px] text-plum">
              {wedding.dateShort}
            </motion.p>
            <motion.p variants={staggerChild()} className="caps mt-1 text-[12px] text-plum-soft num">
              {wedding.time}
            </motion.p>
            <motion.p variants={staggerChild()} className="mt-3 text-[13px] leading-snug text-plum-soft">
              {wedding.venue}, {wedding.venueAddress}
            </motion.p>

            <motion.a
              variants={staggerChild()}
              href={wedding.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="caps mt-5 inline-flex items-center gap-2 rounded-full border border-terracotta/50 px-5 py-2.5 text-[11px] text-terracotta-ink transition-colors hover:bg-terracotta/10"
            >
              <PinIcon className="h-3.5 w-3.5" />
              {card.viewOnMap}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
