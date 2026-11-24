"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { en, type Invite } from "@/content/invite";
import { hi } from "@/content/invite.hi";

export type Lang = "en" | "hi";

const STORAGE_KEY = "invite-lang";
const CONTENT: Record<Lang, Invite> = { en, hi };

/* A tiny external store: the choice lives in localStorage, a ?lang=hi link can pre-select Hindi,
   and the server always renders English so the first paint matches on every phone. */
let current: Lang | null = null;
const listeners = new Set<() => void>();

function readLang(): Lang {
  if (current) return current;
  let v: string | null = null;
  try {
    v = new URLSearchParams(window.location.search).get("lang") ?? window.localStorage.getItem(STORAGE_KEY);
  } catch {
    v = null;
  }
  current = v === "hi" || v === "en" ? v : "en";
  return current;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; invite: Invite };
const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, invite: en });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => "en" as Lang);

  const setLang = useCallback((l: Lang) => {
    current = l;
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* private mode: the choice just lasts for this visit */
    }
    listeners.forEach((fn) => fn());
  }, []);

  // keep the page's language and tab title in step (drives Devanagari typography in CSS too)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = CONTENT[lang].meta.title;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, invite: CONTENT[lang] }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useInvite = () => useContext(LanguageContext).invite;
export const useLang = () => useContext(LanguageContext);

/** Fixed top-right switch, visible on the envelope screen and all the way down the page. */
export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const options: { id: Lang; label: string; aria: string }[] = [
    { id: "hi", label: "हिन्दी", aria: "हिन्दी में देखें" },
    { id: "en", label: "English", aria: "View in English" },
  ];
  return (
    <div
      role="group"
      aria-label="Language / भाषा"
      className="fixed right-2.5 top-2.5 z-[70] flex rounded-full border border-white/80 bg-white/70 p-[3px] shadow-[0_8px_20px_-8px_rgba(74,29,59,0.4)]"
    >
      {options.map((o) => {
        const active = lang === o.id;
        return (
          <button
            key={o.id}
            type="button"
            lang={o.id}
            aria-pressed={active}
            aria-label={o.aria}
            onClick={() => setLang(o.id)}
            className={`relative min-h-9 rounded-full px-3 text-[13px] font-medium transition-colors duration-300 ${active ? "text-gold-soft" : "text-plum-soft"}`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-0 rounded-full bg-plum"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
