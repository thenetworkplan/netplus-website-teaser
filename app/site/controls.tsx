"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "motion/react";
import { setLang, setTheme, useLang, useTheme, type Lang } from "../prefs";
import { useT } from "../i18n";
import { Moon, Sun } from "./icons";

const langs: Lang[] = ["en", "fr"];

/**
 * Language (EN/FR) and theme switcher.
 * "glass" sits over the hero photo; "nav" blends into the floating nav bar.
 */
export function Controls({ variant = "glass" }: { variant?: "glass" | "nav" }) {
  const lang = useLang();
  const theme = useTheme();
  const t = useT();
  const pillId = useId();

  const shell =
    variant === "glass"
      ? "border-white/20 bg-[#07101f]/55 text-white backdrop-blur-md"
      : "border-ink/15 bg-ink/[0.04] text-ink";

  return (
    <div className="flex items-center gap-2">
      <div role="group" aria-label={t.controls.language} className={`flex rounded-full border p-0.5 ${shell}`}>
        {langs.map((l) => (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`font-display relative rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] transition-colors ${
              lang === l ? "text-navy" : "opacity-70 hover:opacity-100"
            }`}
          >
            {lang === l && (
              <motion.span
                layoutId={pillId}
                className="bg-gold-gradient absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{l.toUpperCase()}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={theme === "dark" ? t.controls.toLight : t.controls.toDark}
        title={theme === "dark" ? t.controls.toLight : t.controls.toDark}
        className={`flex size-8 items-center justify-center overflow-hidden rounded-full border ${shell}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ y: 14, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -14, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={variant === "glass" ? "text-gold-light" : "text-accent"}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
