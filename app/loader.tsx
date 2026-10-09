"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import loaderBg from "@/public/loaderbg.jpeg";
import logo from "@/public/logo.png";

export const LOGO_LAYOUT_ID = "netplus-logo";

const ease = [0.22, 1, 0.36, 1] as const;

const statusMessages: [number, string][] = [
  [0.35, "Initializing core services…"],
  [0.7, "Connecting global network…"],
  [1.01, "Preparing your experience…"],
];

/** Full-screen backdrop: the globe artwork under a 50% navy layer. */
export function LoaderBackdrop() {
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-50 bg-[#0b1830]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.4, ease: "easeInOut" } }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease }}
      >
        <Image
          src={loaderBg}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover blur-[2px]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-navy/50" />
      {/* Fade layer: dims the artwork and darkens the edges so the logo leads */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,24,48,0.35)_0%,rgba(11,24,48,0.7)_55%,rgba(7,16,31,0.95)_100%)]" />
    </motion.div>
  );
}

/** Centred logo plus progress bar. The logo carries a layoutId so it can fly into the wordmark. */
export function LoaderProgress({
  loading,
  onComplete,
}: {
  loading: boolean;
  onComplete: () => void;
}) {
  const progress = useMotionValue(0);
  const width = useTransform(progress, (v) => `${v * 100}%`);
  const [status, setStatus] = useState(statusMessages[0][1]);
  const complete = useEffectEvent(onComplete);

  useMotionValueEvent(progress, "change", (v) => {
    const next = statusMessages.find(([limit]) => v < limit)?.[1];
    if (next && next !== status) setStatus(next);
  });

  useEffect(() => {
    const controls = animate(progress, [0, 0.38, 0.52, 0.86, 1], {
      duration: 3.2,
      times: [0, 0.3, 0.45, 0.8, 1],
      ease: "easeInOut",
    });
    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener("load", () => resolve(), { once: true }),
          );

    let cancelled = false;
    Promise.all([controls.finished, pageLoaded]).then(() => {
      if (!cancelled) complete();
    });
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [progress]);

  return (
    <div
      role="status"
      aria-label="Loading NetPlus"
      className="pointer-events-none fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 px-4 sm:gap-8"
    >
      {/* Warm glow behind the mark */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[min(90vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,163,92,0.22),transparent_62%)]"
        initial={{ opacity: 0 }}
        animate={loading ? { opacity: [0.6, 1, 0.6] } : { opacity: 0 }}
        transition={loading ? { duration: 3, repeat: Infinity } : { duration: 0.5 }}
      />

      <motion.div
        layoutId={LOGO_LAYOUT_ID}
        className="relative w-[min(94vw,980px,calc((100svh-170px)*1.616))]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease }}
      >
        <Image
          src={logo}
          alt=""
          priority
          sizes="(max-width: 1040px) 94vw, 980px"
          className="block h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
        />
      </motion.div>

      {/* Progress keeps its space while fading so the logo doesn't jump before take-off */}
      <motion.div
        className="relative flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: loading ? 0.8 : 0.4, ease, delay: loading ? 0.4 : 0 }}
      >
        <div className="w-[min(72vw,380px)] rounded-full border border-gold/60 bg-[#07101f]/70 p-[2px] shadow-[0_0_20px_-6px_rgba(201,163,92,0.6)]">
          <div className="relative h-1.5">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#7d5b26_0%,#c9a35c_55%,#f3dda8_100%)]"
              style={{ width }}
            >
              {/* Sheen sweeping along the filled part */}
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <motion.span
                  className="absolute inset-y-0 w-1/2 bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.65),transparent)]"
                  animate={{ left: ["-50%", "100%"] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                />
              </span>

              {/* Shiny golden tip */}
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                <span className="absolute right-1/2 top-1/2 h-[3px] w-14 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,240,200,0.9))] blur-[1px]" />
                <motion.span
                  className="relative block size-3 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fffdf5,#f6e2ac_45%,#c9a35c)] shadow-[0_0_6px_2px_rgba(255,243,207,0.95),0_0_18px_6px_rgba(230,201,141,0.8),0_0_36px_12px_rgba(201,163,92,0.45)]"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.svg
                  viewBox="0 0 24 24"
                  className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-[#fff6dc]"
                  animate={{ rotate: [0, 90], opacity: [0.95, 0.5, 0.95] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                >
                  <path
                    d="M12 0c.5 6 1.5 7.5 3.2 8.8C16.5 10 18 11.5 24 12c-6 .5-7.5 1.5-8.8 3.2C14 16.5 12.5 18 12 24c-.5-6-1.5-7.5-3.2-8.8C7.5 14 6 12.5 0 12c6-.5 7.5-1.5 8.8-3.2C10 7.5 11.5 6 12 0z"
                    fill="currentColor"
                  />
                </motion.svg>
              </span>
            </motion.div>
          </div>
        </div>

        <p className="text-xs font-medium tracking-[0.15em] text-white/80">{status}</p>
      </motion.div>
    </div>
  );
}
