"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useInvite } from "@/components/Language";
import { MinusIcon, PlusIcon } from "@/components/art/Ornaments";
import { Reveal } from "@/components/Reveal";
import { rsvpSchema } from "@/lib/rsvp-schema";

const EASE = [0.16, 1, 0.3, 1] as const;
type Status = "idle" | "sending" | "success" | "error";

function Burst() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-24 h-0 w-0" aria-hidden="true">
      {Array.from({ length: 26 }).map((_, i) => {
        const a = (i / 26) * Math.PI * 2 + (i % 2) * 0.2;
        const d = 90 + ((i * 37) % 80);
        return (
          <motion.span
            key={i}
            className="petal !static !animate-none"
            style={{ position: "absolute", ["--size" as string]: `${9 + (i % 4) * 3}px`, opacity: 1 }}
            initial={{ x: 0, y: 0, scale: 0.2, rotate: 0, opacity: 1 }}
            animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d + 70, scale: 1, rotate: 260 + i * 12, opacity: 0 }}
            transition={{ duration: 1.9 + (i % 5) * 0.12, ease: EASE }}
          />
        );
      })}
    </div>
  );
}

export function Rsvp() {
  const reduce = useReducedMotion();
  const uid = useId();
  const invite = useInvite();
  const t = invite.rsvp;
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<{ name?: string }>({});

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const parsed = rsvpSchema.safeParse({ name, attending, guests: attending === "yes" ? guests : 1, message, company });
    if (!parsed.success) {
      const next: typeof errors = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0];
        if (key === "name") next.name = t.errorName;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const yes = attending === "yes";

  return (
    <section className="relative px-6 pb-24 pt-8" id="rsvp">
      <div className="column text-center">
        <Reveal>
          <h2 className="font-display text-[36px] leading-tight text-plum">{t.heading}</h2>
          <p className="font-accent mt-2 text-[19px] italic text-plum-soft">{t.sub}</p>
        </Reveal>

        <Reveal className="relative mt-9" y={50}>
          <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/70 p-6 text-left shadow-[0_28px_44px_-20px_rgba(74,29,59,0.4)]">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="done"
                  className="relative px-2 py-10 text-center"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  role="status"
                >
                  {yes && <Burst />}
                  <motion.div
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-plum text-gold-soft"
                    initial={reduce ? false : { scale: 0, rotate: -40 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.15 }}
                  >
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <motion.path d="m5 12.5 4.5 4.5L19 7.5" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }} />
                    </svg>
                  </motion.div>
                  <h3 className="font-display mt-6 text-[26px] leading-tight text-plum balance">{yes ? t.successYesTitle : t.successNoTitle}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-plum-soft balance">{yes ? t.successYesBody : t.successNoBody}</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="caps mt-7 rounded-full border border-plum/30 px-5 py-2.5 text-[11px] text-plum-soft transition-colors hover:bg-white"
                  >
                    {t.editAgain}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  className="flex flex-col gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <div>
                    <label htmlFor={`${uid}-name`} className="caps text-[11px] text-mauve">{t.nameLabel}</label>
                    <input
                      id={`${uid}-name`}
                      className="field mt-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p id={`${uid}-name-err`} role="alert" className="mt-1.5 text-[13px] text-rose-ink" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <fieldset>
                    <legend className="caps text-[11px] text-mauve">{t.attendLabel}</legend>
                    <div className="relative mt-2 grid grid-cols-2 rounded-full bg-white/70 p-1 ring-1 ring-paper-edge" role="radiogroup" aria-label={t.attendLabel}>
                      {(["yes", "no"] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          role="radio"
                          aria-checked={attending === v}
                          onClick={() => setAttending(v)}
                          className={`caps caps-tight relative z-10 whitespace-nowrap rounded-full px-1.5 py-3.5 text-[11px] transition-colors duration-300 ${attending === v ? "text-gold-soft" : "text-plum-soft"}`}
                        >
                          {attending === v && (
                            <motion.span layoutId={`${uid}-pill`} className="absolute inset-0 -z-10 rounded-full bg-plum" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                          )}
                          {v === "yes" ? t.yes : t.no}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <AnimatePresence initial={false}>
                    {yes && (
                      <motion.div key="guests" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden">
                        <p className="caps text-[11px] text-mauve" id={`${uid}-g`}>{t.guestsLabel}</p>
                        <div className="mt-2 flex items-center justify-between rounded-[14px] border border-paper-edge bg-white/70 px-2 py-1.5" role="group" aria-labelledby={`${uid}-g`}>
                          <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label={invite.a11y.fewerGuests} className="grid h-11 w-11 place-items-center rounded-full text-[22px] text-plum transition-colors hover:bg-white disabled:opacity-40" disabled={guests <= 1}>
                            <MinusIcon className="h-5 w-5" />
                          </button>
                          <div className="relative h-8 w-12 overflow-hidden text-center" aria-live="polite">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span key={guests} className="font-display num absolute inset-0 text-[24px] leading-8 text-plum" initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -22, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
                                {guests}
                              </motion.span>
                            </AnimatePresence>
                          </div>
                          <button type="button" onClick={() => setGuests((g) => Math.min(10, g + 1))} aria-label={invite.a11y.moreGuests} className="grid h-11 w-11 place-items-center rounded-full text-[22px] text-plum transition-colors hover:bg-white disabled:opacity-40" disabled={guests >= 10}>
                            <PlusIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label htmlFor={`${uid}-msg`} className="caps text-[11px] text-mauve">{t.messageLabel}</label>
                    <textarea id={`${uid}-msg`} className="field mt-2 min-h-[96px] resize-none" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.messagePlaceholder} maxLength={500} rows={3} />
                  </div>

                  {/* honeypot: hidden from people, tempting to bots */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label>
                      Company
                      <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </label>
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p role="alert" className="rounded-xl bg-rose/10 px-4 py-3 text-[14px] text-plum" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        {t.errorGeneric}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileTap={{ scale: 0.97 }}
                    className="btn-shimmer caps relative flex items-center justify-center gap-3 rounded-full bg-plum px-6 py-4 text-[11px] text-gold-soft shadow-[0_14px_24px_-10px_rgba(74,29,59,0.6)] transition-opacity disabled:opacity-80"
                  >
                    {status === "sending" && (
                      <motion.span className="block h-4 w-4 rounded-full border-2 border-gold-soft/40 border-t-gold-soft" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} aria-hidden="true" />
                    )}
                    {status === "sending" ? t.sending : t.submit}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
