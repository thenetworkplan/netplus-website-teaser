"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  MotionConfig,
  stagger,
  type Variants,
} from "motion/react";
import hero from "@/public/hero.jpeg";
import heroConnect from "@/public/Gemini_Generated_Image_8g0yhi8g0yhi8g0y.jpeg";
import heroAi from "@/public/Gemini_Generated_Image_xkrc9bxkrc9bxkrc.jpeg";
import logo from "@/public/logo.png";
import { LoaderBackdrop, LoaderProgress, LOGO_LAYOUT_ID } from "./loader";
import { NotifyForm } from "./notify-form";
import { useT } from "./i18n";
import { Controls } from "./site/controls";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "size-6 sm:size-7",
};

const modules: { icon: ReactNode }[] = [
  {
    icon: (
      <svg {...iconProps}>
        <path d="M21 15.5v-1.8l-7.5-4.6V4.2a1.5 1.5 0 00-3 0v4.9L3 13.7v1.8l7.5-2.3v4.4l-2 1.5v1.4l3.5-1 3.5 1v-1.4l-2-1.5v-4.4z" />
      </svg>
    ),
  },
  {
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3" />
        <circle cx="5.5" cy="9.5" r="2.2" />
        <circle cx="18.5" cy="9.5" r="2.2" />
        <path d="M6.5 19a5.5 5.5 0 0111 0M1.8 18a3.8 3.8 0 015.2-3.5M22.2 18a3.8 3.8 0 00-5.2-3.5" />
      </svg>
    ),
  },
  {
    icon: (
      <svg {...iconProps}>
        <path d="M14.5 6.5a4 4 0 005 5l-8 8a2.1 2.1 0 01-3-3z" />
        <path d="M4 4l5 5M3.5 6.5l3-3M15 15l5 5" />
      </svg>
    ),
  },
  {
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
      </svg>
    ),
  },
  {
    icon: (
      <svg {...iconProps}>
        <path d="M5 20V13M10 20V9M15 20v-5M20 20V5" />
      </svg>
    ),
  },
  {
    icon: (
      <svg {...iconProps}>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
        <path d="M12 9l.9 2.1L15 12l-2.1.9L12 15l-.9-2.1L9 12l2.1-.9z" />
      </svg>
    ),
  },
  {
    icon: (
      <svg {...iconProps}>
        <path d="M12 2.8l7.5 2.8v5.6c0 4.6-3.1 8.6-7.5 10-4.4-1.4-7.5-5.4-7.5-10V5.6z" />
        <path d="M8.8 12l2.2 2.2 4.3-4.4" />
      </svg>
    ),
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Hero slideshow: each background image is paired with one of the `hero.slogans` (i18n). */
const slides = [
  { image: hero, slogan: 0, position: "object-[70%_center]" },
  { image: heroConnect, slogan: 1, position: "object-[65%_center]" },
  { image: heroAi, slogan: 1, position: "object-[62%_center]" },
];
const SLIDE_INTERVAL = 7000;
/** Gentle in-and-out curve for the logo's flight from the loader into the wordmark. */
const flightEase = [0.65, 0, 0.35, 1] as const;
const FLIGHT_DURATION = 1.9;

/** Splash screen / loader is switched off for now; flip to true to bring it back. */
const SHOW_LOADER = false;

const column: Variants = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.14, { startDelay: 0.25 }) } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

const headline: Variants = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.08) } },
  exit: { transition: { delayChildren: stagger(0.04) } },
};

const headlineLine: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.7, ease } },
  exit: { y: "-110%", transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] } },
};

const moduleList: Variants = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.09, { startDelay: 1.1 }) } },
};

const moduleItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const moduleIcon: Variants = {
  hidden: { scale: 0.3, rotate: -45 },
  show: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 16 },
  },
};

const capabilityList: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease,
      delay: 0.9,
      delayChildren: stagger(0.1, { startDelay: 1.1 }),
    },
  },
};

const capabilityItem: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

type Phase = "loading" | "revealing" | "done";

export function Teaser() {
  const [phase, setPhase] = useState<Phase>(SHOW_LOADER ? "loading" : "done");

  // Once the backdrop has faded, hand the logo over to its place in the wordmark.
  useEffect(() => {
    if (phase !== "revealing") return;
    const id = setTimeout(() => setPhase("done"), 250);
    return () => clearTimeout(id);
  }, [phase]);

  // Keep the page from scrolling underneath the loader.
  useEffect(() => {
    if (phase === "done") return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [phase]);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <AnimatePresence>
          {phase === "loading" && <LoaderBackdrop key="loader-backdrop" />}
        </AnimatePresence>

        {phase !== "done" && (
          <LoaderProgress
            loading={phase === "loading"}
            onComplete={() => setPhase("revealing")}
          />
        )}

        {/* Remounting when the loader lifts replays every entrance animation */}
        <TeaserContent
          key={phase === "loading" ? "behind-loader" : "revealed"}
          logoLanded={phase === "done"}
          fromLoader={SHOW_LOADER}
        />
      </LayoutGroup>
    </MotionConfig>
  );
}

function TeaserContent({
  logoLanded,
  fromLoader,
}: {
  logoLanded: boolean;
  fromLoader: boolean;
}) {
  const t = useT().hero;
  const [slide, setSlide] = useState(0);
  const slogan = slides[slide].slogan;

  useEffect(() => {
    const id = setInterval(() => setSlide((i) => (i + 1) % slides.length), SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // With the loader, the wordmark waits for the logo's flight; without it, for the logo's own reveal.
  const wordmarkDelay = fromLoader ? FLIGHT_DURATION : 0.9;

  return (
    <>
      <main className="relative flex min-h-svh flex-1 flex-col overflow-hidden text-ink">
        {/* Background: fixed to the viewport so the content scrolls over it; the solid sections below cover it */}
        <div className="fixed inset-0 -z-10 bg-[#0b1830]">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease } }}
          >
            {/* Cross-fading slideshow; the active image also drifts in slightly */}
            {slides.map(({ image, position }, i) => (
              <motion.div
                key={image.src}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === slide ? 1 : 0, scale: i === slide ? 1 : 1.06 }}
                transition={{
                  opacity: { duration: 1.2, ease: "easeInOut" },
                  scale: { duration: i === slide ? SLIDE_INTERVAL / 1000 + 1.2 : 1.2, ease: "easeOut" },
                }}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  priority={i === 0}
                  loading={i === 0 ? undefined : "eager"}
                  placeholder="blur"
                  sizes="100vw"
                  className={`object-cover ${position}`}
                />
              </motion.div>
            ))}
          </motion.div>
          {/* Soft wash on the left for headline legibility */}
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(100deg,rgb(var(--hero-wash)/0.92)_0%,rgb(var(--hero-wash)/0.78)_30%,rgb(var(--hero-wash)/0.25)_52%,transparent_68%)]"
            initial={{ opacity: 0, x: "-10%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease }}
          />
          {/* Darken the floor for the module bar */}
          <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-page/95 via-page/70 to-transparent lg:h-[45%] lg:from-page/90 lg:via-page/45" />
          {/* Mobile: stronger wash behind the text */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--hero-wash)/0.7)] via-[rgb(var(--hero-wash)/0.3)] via-40% to-transparent to-55% lg:hidden" />
        </div>

        {/* Top tagline */}
        <motion.div
          className="absolute right-4 top-5 z-10 flex flex-col items-end gap-3 sm:right-6 sm:top-6 lg:right-12 lg:top-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.6 }}
        >
          <Controls />
          <p className="font-display hidden text-[11px] font-semibold tracking-[0.35em] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] md:block">
            {t.tagline[0]} <span className="mx-3 text-white/50">|</span> {t.tagline[1]}{" "}
            <span className="mx-3 text-white/50">|</span> {t.tagline[2]}
          </p>
          <motion.span
            className="hidden h-px w-24 origin-right bg-gradient-to-r from-transparent to-gold md:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease, delay: 1 }}
          />
        </motion.div>

        {/* Main content */}
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pt-8 sm:px-10 lg:px-16 lg:pt-10">
          <div className="flex flex-1 items-start justify-between gap-10">
            {/* Left column */}
            <motion.section
              className="w-full max-w-xl"
              variants={column}
              initial="hidden"
              animate="show"
            >
              {/* Logo lockup */}
              <div className="inline-flex flex-col leading-none">
                <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  <span className="sr-only">NetPlus</span>
                  <span aria-hidden className="whitespace-nowrap">
                    {/* The logo mark stands in for the "N"; its arrow sweeps over the rest of the word */}
                    <span
                      // z-[70] keeps the logo above the fading loader backdrop (z-50) during its flight;
                      // this works because none of its ancestors create a stacking context
                      className="relative z-[70] inline-block align-baseline"
                      style={{ marginLeft: "-0.12em", marginRight: "-0.5em", top: "0.12em" }}
                    >
                      {logoLanded ? (
                        <motion.span
                          layoutId={LOGO_LAYOUT_ID}
                          className="block"
                          initial={fromLoader ? false : { clipPath: "inset(0 100% 0 0)", scale: 0.85 }}
                          animate={{ clipPath: "inset(0 0% 0 0)", scale: 1 }}
                          transition={{
                            layout: { duration: FLIGHT_DURATION, ease: flightEase },
                            duration: 1.4,
                            ease,
                            delay: 0.35,
                          }}
                        >
                          <Image
                            src={logo}
                            alt=""
                            priority
                            className="block w-auto drop-shadow-sm"
                            style={{ height: "1.5em" }}
                          />
                        </motion.span>
                      ) : (
                        // Holds the space while the logo is still centred in the loader
                        <span className="block" style={{ height: "1.5em", aspectRatio: `${logo.width} / ${logo.height}` }} />
                      )}
                    </span>
                    <motion.span
                      className="inline-block text-ink"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease, delay: wordmarkDelay }}
                    >
                      et
                    </motion.span>
                    <motion.span
                      className="text-gold-gradient inline-block"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease, delay: wordmarkDelay + 0.15 }}
                    >
                      Plus
                    </motion.span>
                  </span>
                </p>
                <motion.p
                  className="font-display mt-2 text-[9px] font-semibold tracking-[0.32em] text-hero-soft sm:text-[10px]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease, delay: wordmarkDelay + 0.3 }}
                >
                  {t.sub}
                </motion.p>
              </div>
              <h1 className="sr-only">{t.title}</h1>

              <motion.p
                variants={rise}
                className="font-display mt-10 text-[11px] font-semibold tracking-[0.4em] text-hero-accent sm:mt-10 sm:text-xs"
              >
                {t.eyebrow}
              </motion.p>

              <motion.div
                variants={rise}
                className="font-display mt-4 text-[2.3rem] font-bold uppercase leading-[1.05] tracking-[0.01em] sm:text-[3.4rem] lg:text-[3.9rem]"
                aria-hidden
              >
                {/* Each slogan rolls its lines up and out, then the next rolls in */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={slogan}
                    variants={headline}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    {t.slogans[slogan].headline.map((text, i) => (
                      <span key={i} className="block overflow-hidden pb-[0.06em]">
                        <motion.span
                          variants={headlineLine}
                          className={`block ${i === 1 ? "text-gold-gradient" : "text-ink"}`}
                        >
                          {text}
                        </motion.span>
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* All bodies share one grid cell so the layout below never jumps between slogans */}
              <motion.div variants={rise} className="mt-6 grid max-w-md">
                {t.slogans.map(({ body }, i) => (
                  <motion.p
                    key={i}
                    aria-hidden={i !== slogan}
                    className="col-start-1 row-start-1 text-[15px] font-medium leading-relaxed text-ink sm:text-base"
                    initial={false}
                    animate={
                      i === slogan
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 8, filter: "blur(4px)" }
                    }
                    transition={{ duration: 0.6, ease, delay: i === slogan ? 0.25 : 0 }}
                  >
                    {body}
                  </motion.p>
                ))}
              </motion.div>

              <motion.div variants={rise} className="mt-8 flex max-w-md items-center gap-4">
                <motion.span
                  className="h-px flex-1 origin-right bg-gradient-to-r from-transparent to-gold/70"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, ease, delay: 1.1 }}
                />
                <motion.span
                  className="font-display text-center text-xs font-bold text-ink"
                  initial={{ letterSpacing: "0.9em", opacity: 0 }}
                  animate={{ letterSpacing: "0.45em", opacity: 1 }}
                  transition={{ duration: 1.2, ease, delay: 1 }}
                >
                  {t.comingSoon}
                </motion.span>
                <motion.span
                  className="h-px flex-1 origin-left bg-gradient-to-l from-transparent to-gold/70"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, ease, delay: 1.1 }}
                />
              </motion.div>
            </motion.section>

            {/* Right column: capability list next to the globe */}
            <motion.ul
              className="mt-20 hidden shrink-0 flex-col gap-5 rounded-r-lg border-l border-gold/50 bg-[#0b1830]/35 py-5 pl-5 pr-6 backdrop-blur-md xl:flex"
              variants={capabilityList}
              initial="hidden"
              animate="show"
            >
              {t.capabilities.map((item, i) => (
                <motion.li
                  key={item}
                  variants={capabilityItem}
                  className="font-display flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white"
                >
                  <motion.span
                    className="size-1.5 rounded-full bg-gold-light shadow-[0_0_8px_2px_rgba(230,201,141,0.6)]"
                    animate={{ opacity: [1, 0.35, 1], scale: [1, 0.7, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Modules */}
          <section aria-label={t.modulesLabel} className="mt-12 lg:mt-8">
            <motion.ul
              className="grid grid-cols-2 gap-y-7 sm:grid-cols-4 lg:grid-cols-7"
              variants={moduleList}
              initial="hidden"
              animate="show"
            >
              {modules.map(({ icon }, i) => {
                const label = t.modules[i];
                return (
                <motion.li
                  key={i}
                  variants={moduleItem}
                  className={`group flex flex-col items-center gap-3 px-2 text-center ${
                    i > 0 ? "lg:border-l lg:border-ink/15" : ""
                  }`}
                >
                  <motion.span
                    variants={moduleIcon}
                    whileHover={{ y: -6, scale: 1.08 }}
                    className="relative flex"
                  >
                    {/* Soft pulsing halo */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-gold-light/70"
                      animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 2 + i * 0.25,
                      }}
                    />
                    <span className="bg-gold-gradient rounded-full p-[1.5px] shadow-[0_0_28px_-4px_rgba(230,201,141,0.65)] transition-shadow duration-300 group-hover:shadow-[0_0_36px_0px_rgba(230,201,141,0.85)]">
                      <span className="flex size-14 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#1d3157,#0b1830_70%)] text-gold-light sm:size-16">
                        {icon}
                      </span>
                    </span>
                  </motion.span>
                  <span className="font-display text-[10px] font-semibold uppercase leading-snug tracking-[0.2em] text-ink sm:text-[11px]">
                    {label[0]}
                    {label[1] && (
                      <>
                        <br />
                        {label[1]}
                      </>
                    )}
                  </span>
                </motion.li>
                );
              })}
            </motion.ul>
          </section>

          {/* Signup */}
          <motion.div
            className="mt-10 pb-6 lg:mt-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.9 }}
          >
            <NotifyForm />
          </motion.div>
        </div>
      </main>
    </>
  );
}
