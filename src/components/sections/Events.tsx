"use client";

import { motion, useReducedMotion } from "motion/react";
import { type EventDay } from "@/content/invite";
import { useInvite } from "@/components/Language";
import { EventIcon, FloralCorner, PinIcon, Tassel } from "@/components/art/Ornaments";
import { Reveal } from "@/components/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function DayCard({ day, index }: { day: EventDay; index: number }) {
  const invite = useInvite();
  const reduce = useReducedMotion();
  const left = index % 2 === 0;
  const tilt = left ? -1.2 : 1.2;

  return (
    <motion.article
      className="relative mx-auto w-[min(86vw,330px)]"
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: left ? -46 : 46, y: 40, rotate: tilt * 3 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -14% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {/* scroll rod */}
      <span
        aria-hidden="true"
        className={`absolute bottom-7 top-7 z-10 w-3 rounded-full shadow-[0_2px_6px_rgba(120,70,20,0.3)] ${left ? "-left-3.5" : "-right-3.5"}`}
        style={{ background: "linear-gradient(90deg, #9a6d24, #f1d79a 45%, #b98a3a)" }}
      />

      <div className="relative rounded-[30px] border-2 border-terracotta/70 bg-gradient-to-b from-ivory to-blush px-7 pb-12 pt-9 text-center shadow-[0_22px_34px_-14px_rgba(120,50,70,0.35)]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[23px] border border-gold/60" />
        <FloralCorner className="absolute -bottom-3 -left-3 w-[82px]" />
        <FloralCorner className="absolute -bottom-3 -right-3 w-[82px] -scale-x-100" />
        <FloralCorner className="absolute -left-3 -top-3 w-[58px] -scale-y-100 opacity-90" />
        <FloralCorner className="absolute -right-3 -top-3 w-[58px] -scale-100 opacity-90" />

        <motion.div
          className="relative mx-auto h-[74px] w-[74px]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, rotate: -14 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        >
          <EventIcon kind={day.icon} className="anim-float h-full w-full" />
        </motion.div>

        <h3 className="font-accent mt-3 text-[36px] italic leading-none text-plum">{day.title}</h3>
        <p className="caps mt-3 text-[11px] text-rose-ink num">
          {day.title !== day.weekday ? `${day.weekday}, ` : ""}
          {day.dateLabel}
        </p>
        <span className="mx-auto mt-4 block h-px w-14 bg-gold/70" aria-hidden="true" />

        <ul className="mt-5 flex flex-col gap-3 text-left">
          {day.ceremonies.map((c, i) => {
            const long = c.name.length > 26;
            return (
              <motion.li
                key={c.name}
                className={`grid gap-x-4 gap-y-1 border-b border-gold/25 pb-2.5 last:border-b-0 last:pb-0 ${long ? "grid-cols-1" : "grid-cols-[1fr_auto] items-baseline"}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.45 + i * 0.1 }}
              >
                <span className="font-display text-[16px] leading-snug text-plum">{c.name}</span>
                <span className="caps num text-[11px] text-plum-soft">{c.time}</span>
              </motion.li>
            );
          })}
        </ul>

        {(day.venue || day.note) && (
          <div className="mt-5 text-[13px] leading-snug text-plum-soft">
            {day.venue && <p className="balance font-medium">{day.venue}</p>}
            {day.note && <p className="balance mt-1">{day.note}</p>}
          </div>
        )}

        {day.mapUrl && (
          <a
            href={day.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="caps relative mt-5 inline-flex items-center gap-2 rounded-full border border-terracotta/50 px-4 py-2.5 text-[11px] text-terracotta-ink transition-colors hover:bg-terracotta/10"
          >
            <PinIcon className="h-3.5 w-3.5" />
            {invite.card.viewOnMap}
          </a>
        )}
      </div>

      {/* hanging tassels */}
      <div className="pointer-events-none absolute -bottom-[62px] left-0 right-0 flex justify-between px-9" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Tassel key={i} className="tassel w-[18px]" style={{ animationDelay: `${-i * 0.7}s`, marginTop: i % 2 ? 8 : 0 }} />
        ))}
      </div>
    </motion.article>
  );
}

export function Events() {
  const invite = useInvite();
  return (
    <section className="relative px-6 pb-28 pt-8">
      <div className="column text-center">
        <Reveal>
          <h2 className="font-display text-[34px] leading-tight text-plum">{invite.eventsHeading}</h2>
          <p className="font-accent balance mx-auto mt-3 max-w-[30ch] text-[18px] italic leading-snug text-plum-soft">{invite.eventsSub}</p>
        </Reveal>
      </div>

      <div className="column mt-14 flex flex-col gap-24">
        {invite.events.map((d, i) => (
          <DayCard key={d.id} day={d} index={i} />
        ))}
      </div>
    </section>
  );
}
