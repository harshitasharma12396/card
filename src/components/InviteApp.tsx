"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { MusicProvider, MusicToggle } from "@/components/Music";
import { Lanterns } from "@/components/Ambient";
import { HangingUmbrella } from "@/components/art/Ornaments";
import { Envelope } from "@/components/sections/Envelope";
import { Hero } from "@/components/sections/Hero";
import { InvitationCard } from "@/components/sections/InvitationCard";
import { Families } from "@/components/sections/Families";
import { Events } from "@/components/sections/Events";
import { Gallery } from "@/components/sections/Gallery";
import { Rsvp } from "@/components/sections/Rsvp";
import { Countdown } from "@/components/sections/Countdown";

/** One fixed backdrop whose colour glides from dusk pink, to soft blush paper, to lilac. */
function Backdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const background = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.7, 0.88, 1],
    reduce
      ? ["#f4c0c8", "#f4c0c8", "#f4c0c8", "#f4c0c8", "#f4c0c8", "#f4c0c8"]
      : ["#f2b6c9", "#f6c9c4", "#f9e6ea", "#f6dde8", "#e8c5dc", "#c9a3d6"],
  );
  return <motion.div className="fixed inset-0 -z-20" style={{ background }} aria-hidden="true" />;
}

/** On wide screens the 440px column would float on a flat field, so the margins carry the world too. */
function SideArt() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden lg:block" aria-hidden="true">
      {/* lanterns stay in the margins outside the widest content (the 980px gallery) so they never cross photos or text */}
      <div className="absolute inset-y-0 left-0 w-[max(0px,calc((100vw-1000px)/2))]">
        <Lanterns count={4} className="opacity-70" />
      </div>
      <div className="absolute inset-y-0 right-0 w-[max(0px,calc((100vw-1000px)/2))]">
        <Lanterns count={4} className="opacity-70" />
      </div>
      <HangingUmbrella className="anim-sway absolute left-[7%] top-0 w-[76px]" />
      <HangingUmbrella tone="gold" className="anim-sway absolute left-[15%] top-0 w-[56px]" style={{ animationDelay: "-2s" }} />
      <HangingUmbrella tone="gold" className="anim-sway absolute right-[15%] top-0 w-[56px]" style={{ animationDelay: "-3.4s" }} />
      <HangingUmbrella className="anim-sway absolute right-[7%] top-0 w-[76px]" style={{ animationDelay: "-1s" }} />
    </div>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left bg-gradient-to-r from-gold-bright via-rose to-gold-bright"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}

export function InviteApp() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("is-locked", !opened);
    return () => document.body.classList.remove("is-locked");
  }, [opened]);

  return (
    <MusicProvider>
      <Backdrop />
      <SideArt />
      <ProgressBar />
      <main className="overflow-x-clip">
        <Hero active={opened} />
        <InvitationCard />
        <Families />
        <Events />
        <Gallery />
        <Rsvp />
        <Countdown />
      </main>
      <MusicToggle visible={opened} />
      <AnimatePresence>{!opened && <Envelope key="envelope" onOpen={() => setOpened(true)} />}</AnimatePresence>
    </MusicProvider>
  );
}
