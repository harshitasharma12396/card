"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type GalleryItem } from "@/content/invite";
import { useInvite } from "@/components/Language";
import { ChevronIcon, FloralCorner } from "@/components/art/Ornaments";
import { CoupleScene } from "@/components/art/Scenes";
import { Reveal } from "@/components/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function Picture({ item, small = false }: { item: GalleryItem; small?: boolean }) {
  const src = small ? (item.thumb ?? item.src) : item.src;
  // eslint-disable-next-line @next/next/no-img-element
  if (src) return <img src={src} alt={small ? "" : item.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" draggable={false} />;
  return <CoupleScene variant={item.art} className="h-full w-full" />;
}

function Frame({ item, className = "" }: { item: GalleryItem; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-[26px] border-2 border-terracotta/70 bg-ivory shadow-[0_18px_26px_-18px_rgba(120,50,70,0.45)]" />
      <div className="absolute inset-[7px] overflow-hidden rounded-[20px] border border-gold/70">
        <Picture item={item} />
      </div>
      <FloralCorner className="absolute -left-3 -top-3 w-[58px] -scale-y-100" />
      <FloralCorner className="absolute -right-3 -top-3 w-[58px] -scale-100" />
      <FloralCorner className="absolute -bottom-3 -left-3 w-[58px]" />
      <FloralCorner className="absolute -bottom-3 -right-3 w-[58px] -scale-x-100" />
    </div>
  );
}

export function Gallery() {
  const reduce = useReducedMotion();
  const invite = useInvite();
  const items = invite.gallery.items;
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });
  const [index, setIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  // keep the active thumbnail centred inside its own strip (never scrolls the page)
  useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !el) return;
    strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [index, reduce]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setIndex(embla.selectedScrollSnap());
    const onPointer = () => setTouched(true);
    embla.on("select", onSelect);
    embla.on("pointerDown", onPointer);
    return () => {
      embla.off("select", onSelect);
      embla.off("pointerDown", onPointer);
    };
  }, [embla]);

  // Gentle auto-advance until the guest takes over
  useEffect(() => {
    if (!embla || touched || reduce) return;
    const id = window.setInterval(() => embla.scrollNext(), 4800);
    return () => window.clearInterval(id);
  }, [embla, touched, reduce]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setTouched(true);
      if (dir === 1) embla?.scrollNext();
      else embla?.scrollPrev();
    },
    [embla],
  );

  const goTo = useCallback(
    (i: number) => {
      setTouched(true);
      embla?.scrollTo(i);
    },
    [embla],
  );

  return (
    <section className="relative pb-28 pt-6" aria-roledescription="carousel" aria-label={invite.gallery.heading}>
      <div className="column px-6 text-center">
        <Reveal>
          <h2 className="font-display text-[34px] leading-tight text-plum">{invite.gallery.heading}</h2>
          <p className="font-accent mt-2 text-[19px] italic text-plum-soft">{invite.gallery.sub}</p>
        </Reveal>
      </div>

      <Reveal className="relative mx-auto mt-12 w-full max-w-[440px] md:max-w-[980px]" y={40}>
        <div className="overflow-hidden px-0 py-6" ref={viewportRef}>
          <div className="flex touch-pan-y">
            {items.map((item, i) => (
              <div key={item.id} className="min-w-0 flex-[0_0_74%] px-3 md:flex-[0_0_340px]" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>
                <motion.div animate={{ scale: i === index ? 1 : 0.9, opacity: i === index ? 1 : 0.55 }} transition={{ duration: 0.7, ease: EASE }}>
                  <Frame item={item} className="aspect-[2/3] w-full" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={invite.a11y.prevPhoto}
          className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/70 text-plum shadow-[0_8px_18px_-6px_rgba(74,29,59,0.4)]"
        >
          <ChevronIcon dir="left" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={invite.a11y.nextPhoto}
          className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/70 text-plum shadow-[0_8px_18px_-6px_rgba(74,29,59,0.4)]"
        >
          <ChevronIcon dir="right" className="h-5 w-5" />
        </button>
      </Reveal>

      <div className="column mt-3 px-6 text-center" aria-live="polite">
        <div className="relative h-9">
          <AnimatePresence mode="wait">
            <motion.p
              key={items[index].id}
              className="font-accent absolute inset-x-0 text-[24px] italic text-plum"
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {items[index].caption}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-2 flex w-40 flex-col items-center gap-2">
          <p className="caps num text-[11px] text-plum-soft">
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-plum/15" aria-hidden="true">
            <motion.div
              className="h-full origin-left rounded-full bg-gold"
              animate={{ scaleX: (index + 1) / items.length }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
        </div>

        <div
          ref={stripRef}
          className="-mx-6 mt-5 flex items-center gap-2.5 overflow-x-auto px-[calc(50%-23px)] py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={invite.a11y.choosePhoto}
        >
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => goTo(i)}
              aria-label={item.caption}
              className={`relative h-[69px] w-[46px] shrink-0 overflow-hidden rounded-[10px] border-2 transition-all duration-500 ${i === index ? "scale-110 border-gold" : "border-white/70 opacity-65"}`}
            >
              <Picture item={item} small />
            </button>
          ))}
        </div>
        <p className="caps mt-5 text-[11px] text-mauve">{invite.gallery.swipeHint}</p>
      </div>
    </section>
  );
}
