"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { invite } from "@/content/invite";
import { NoteIcon } from "@/components/art/Ornaments";

type MusicState = {
  available: boolean;
  playing: boolean;
  start: () => void;
  toggle: () => void;
};

const MusicContext = createContext<MusicState>({
  available: false,
  playing: false,
  start: () => {},
  toggle: () => {},
});

export const useMusic = () => useContext(MusicContext);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  // The toggle only appears when an audio file has actually been added to /public/audio.
  useEffect(() => {
    let cancelled = false;
    fetch(invite.music.src, { method: "HEAD" })
      .then((r) => {
        if (!cancelled && r.ok && (r.headers.get("content-type") ?? "").includes("audio")) setAvailable(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio(invite.music.src);
      a.loop = true;
      a.volume = 0.55;
      a.addEventListener("play", () => setPlaying(true));
      a.addEventListener("pause", () => setPlaying(false));
      audioRef.current = a;
    }
    return audioRef.current;
  }, []);

  const start = useCallback(() => {
    if (!available) return;
    ensureAudio().play().catch(() => {});
  }, [available, ensureAudio]);

  const toggle = useCallback(() => {
    const a = ensureAudio();
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  }, [ensureAudio]);

  useEffect(() => {
    const onHide = () => {
      if (document.hidden) audioRef.current?.pause();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  const value = useMemo(() => ({ available, playing, start, toggle }), [available, playing, start, toggle]);
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function MusicToggle({ visible }: { visible: boolean }) {
  const { available, playing, toggle } = useMusic();
  return (
    <AnimatePresence>
      {available && visible && (
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={playing ? invite.music.on : invite.music.off}
          aria-pressed={playing}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-white/70 text-plum shadow-[0_8px_24px_-6px_rgba(74,29,59,0.35)]"
        >
          {playing ? (
            <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
              {[0, 0.25, 0.5, 0.15].map((d, i) => (
                <span key={i} className="block h-full w-[3px] origin-bottom rounded-full bg-plum" style={{ animation: `eq 0.9s ease-in-out ${d}s infinite` }} />
              ))}
            </span>
          ) : (
            <NoteIcon className="h-5 w-5" />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
