"use client";

import { motion } from "motion/react";
import { invite } from "@/content/invite";
import { Divider, Lotus } from "@/components/art/Ornaments";
import { Reveal, staggerChild, staggerParent } from "@/components/Reveal";

export function Families() {
  const f = invite.families;
  return (
    <section className="relative px-8 pb-24 pt-4">
      <div className="column text-center">
        <Reveal>
          <Lotus className="mx-auto h-9 w-14 text-terracotta-ink" />
          <h2 className="font-display mt-3 text-[32px] leading-tight text-plum">{f.heading}</h2>
          <p className="font-accent mt-2 text-[19px] italic text-plum-soft">{f.sub}</p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-10">
          {f.groups.map((g) => (
            <motion.div
              key={g.title}
              variants={staggerParent(0.09, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            >
              <motion.h3 variants={staggerChild(14)} className="caps text-[11px] text-rose-ink">
                {g.title}
              </motion.h3>
              <motion.div variants={staggerChild(8)} className="mx-auto my-3 w-24 text-gold">
                <Divider className="w-full" />
              </motion.div>
              <ul className="flex flex-col gap-1.5">
                {g.lines.map((line) => (
                  <motion.li key={line} variants={staggerChild(12)} className="font-display balance text-[17px] leading-snug text-plum">
                    {line}
                  </motion.li>
                ))}
              </ul>
              {"footnote" in g && g.footnote && (
                <motion.p variants={staggerChild(8)} className="font-accent mt-3 text-[16px] italic text-plum-soft">
                  {g.footnote}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
