"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useT } from "../i18n";
import { Brand, Wordmark } from "../wordmark";
import { ease } from "./reveal";
import { Controls } from "./controls";
import { Close, Menu } from "./icons";

const hrefs = ["#platform", "#why", "#vision", "#modules", "#roles"];

/** Scroll progress line plus a floating nav that appears once the hero is behind you. */
export function SiteNav() {
  const t = useT();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const links = t.nav.links.map((label, i) => ({ label, href: hrefs[i] }));

  useMotionValueEvent(scrollY, "change", (v) => {
    const show = v > window.innerHeight * 0.7;
    if (show !== visible) setVisible(show);
    if (!show && open) setOpen(false);
  });

  return (
    <>
      <motion.div
        aria-hidden
        className="bg-gold-gradient fixed inset-x-0 top-0 z-[90] h-[2px] origin-left"
        style={{ scaleX: progress }}
      />
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-x-0 top-0 z-[80] px-4 pt-3"
          >
            <nav className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 rounded-full border border-ink/10 bg-page/80 py-2 pl-5 pr-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <a href="#top" className="font-display text-lg font-bold tracking-tight text-ink">
                <Wordmark />
              </a>
              <ul className="hidden items-center lg:flex">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="font-display rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-accent"
                    >
                      <Brand text={l.label} />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  <Controls variant="nav" />
                </div>
                <a
                  href="#contact"
                  className="bg-gold-gradient font-display hidden rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy transition hover:brightness-110 md:block"
                >
                  {t.nav.cta}
                </a>
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  aria-expanded={open}
                  aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                  className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
                >
                  {open ? <Close className="size-5" /> : <Menu className="size-5" />}
                </button>
              </div>
            </nav>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease }}
                  className="mx-auto mt-2 max-w-[1240px] rounded-3xl border border-ink/10 bg-page/95 p-3 backdrop-blur-xl lg:hidden"
                >
                  <ul className="space-y-1">
                    {[...links, { label: t.nav.cta, href: "#contact" }].map((l) => (
                      <li key={l.href + l.label}>
                        <a
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="font-display block rounded-2xl px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/80 hover:bg-ink/5 hover:text-accent"
                        >
                          <Brand text={l.label} />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 border-t border-ink/10 px-4 pt-3 sm:hidden">
                    <Controls variant="nav" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
