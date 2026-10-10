"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import skyDay from "@/public/sky-day.jpg";
import skyNight from "@/public/sky-night.jpg";
import { NotifyForm } from "../notify-form";
import { CONTACT_EMAIL } from "../actions";
import { useT } from "../i18n";
import { Brand, Wordmark } from "../wordmark";
import { ease, fadeUp, group } from "./reveal";
import { ArrowUp } from "./icons";

/** Small airliner that climbs across the sky and out of the window frame as you scroll. */
function Plane({ progress }: { progress: MotionValue<number> }) {
  const left = useTransform(progress, [0, 1], ["-45%", "115%"]);
  const top = useTransform(progress, [0, 1], ["68%", "14%"]);
  const scale = useTransform(progress, [0, 1], [1.15, 0.45]);
  const rotate = useTransform(progress, [0, 0.5, 1], [-4, -13, -18]);
  const trail = useTransform(progress, [0, 0.35], [0, 1]);

  return (
    <motion.div aria-hidden style={{ left, top, scale, rotate }} className="absolute w-[38%] origin-center">
      {/* Contrail */}
      <motion.span
        style={{ scaleX: trail }}
        className="absolute right-[86%] top-[50%] h-[3px] w-[260%] origin-right rounded-full bg-gradient-to-r from-transparent via-white/40 to-white/85 blur-[1px] dark:via-white/15 dark:to-white/45"
      />
      <svg viewBox="0 0 120 40" className="relative block h-auto w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]">
        <defs>
          <linearGradient id="np-plane-body" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" className="[stop-color:#ffffff] dark:[stop-color:#3a4766]" />
            <stop offset="100%" className="[stop-color:#c4c8d4] dark:[stop-color:#1c2539]" />
          </linearGradient>
        </defs>
        {/* Far wing */}
        <path d="M58 20 L 48 9 L 55 9 L 72 19 Z" className="fill-[#b9bdc9] dark:fill-[#18203a]" />
        {/* Tail fin + stabiliser in brand gold */}
        <path d="M12 17 L 5 2 L 14 2 L 28 16 Z" fill="#c9a35c" />
        <path d="M10 21 L 1 25 L 16 24 Z" fill="#9c7535" />
        {/* Fuselage */}
        <path
          d="M8 21.5 C 8 18, 14 16, 22 16 L 98 16 C 108 16, 116 19, 118.5 21.5 C 116 24.5, 108 27, 98 27 L 22 27 C 14 27, 8 25, 8 21.5 Z"
          fill="url(#np-plane-body)"
        />
        {/* Gold cheatline */}
        <path d="M20 23.3 L 112 23.3" stroke="#c9a35c" strokeWidth="1" />
        {/* Windows (lit at night) */}
        {Array.from({ length: 16 }, (_, i) => (
          <rect
            key={i}
            x={30 + i * 4.2}
            y={19}
            width={1.8}
            height={2.2}
            rx={0.8}
            className="fill-[#4a5a7a] dark:fill-[#ffd98a]"
          />
        ))}
        <path d="M108 19 L 113.5 19.6 L 115 21 L 108 21 Z" className="fill-[#2b3a58] dark:fill-[#ffe6a8]" />
        {/* Near wing + engine */}
        <path d="M54 24 L 40 37 L 49 37 L 72 24 Z" className="fill-[#d9dce4] dark:fill-[#2a3550]" />
        <rect x="50" y="26.5" width="15" height="5.5" rx="2.7" className="fill-[#aeb3c0] dark:fill-[#222c44]" />
        {/* Navigation lights */}
        <motion.circle
          cx="41"
          cy="37"
          r="1.3"
          fill="#4ade80"
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <motion.circle
          cx="6"
          cy="3"
          r="1.3"
          fill="#ffffff"
          animate={{ opacity: [0, 1, 0, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, times: [0, 0.08, 0.16, 1] }}
        />
      </svg>
    </motion.div>
  );
}

/**
 * Aircraft window onto a sky that stays fixed to the viewport.
 *
 * The sky is `position: fixed` and the glass clips it with `clip-path`, so as the
 * window scrolls past you see a different part of the same still sky — like
 * looking out while the cabin moves. Nothing above the glass may use transform,
 * filter or will-change, or the fixed layer would stop being fixed.
 */
function SkyWindow({ alt }: { alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 0.55"] });
  // The window shade slides up as the window reaches the middle of the screen
  const shadeY = useTransform(scrollYProgress, [0.25, 1], ["0%", "-104%"]);
  // Once the shade is mostly up, the plane crosses the sky as you keep scrolling
  const { scrollYProgress: flight } = useScroll({ target: ref, offset: ["center 0.75", "center 0.1"] });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease }}
      className="relative mx-auto w-[min(78vw,380px)]"
    >
      {/* Bezel */}
      <div className="relative aspect-[3/4] rounded-[46%/36%] bg-[linear-gradient(150deg,#f5e6c6_0%,#c9a35c_40%,#6b4c22_100%)] p-[7%] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6),0_0_80px_-20px_rgba(201,163,92,0.6)]">
        <div className="relative h-full w-full rounded-[44%/34%] bg-[#7a5a2a] p-[3px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]">
          {/* Glass: clip-path (not overflow) is what clips the fixed sky */}
          <div className="relative h-full w-full overflow-hidden rounded-[44%/34%] bg-[#0b1830] [clip-path:inset(0_round_44%_/_34%)]">
            <div className="pointer-events-none fixed inset-0">
              <Image src={skyDay} alt={alt} fill sizes="100vw" placeholder="blur" className="object-cover dark:hidden" />
              <Image
                src={skyNight}
                alt=""
                fill
                sizes="100vw"
                placeholder="blur"
                className="hidden object-cover dark:block"
              />
            </div>

            <Plane progress={flight} />

            {/* Window shade */}
            <motion.div
              style={{ y: shadeY }}
              className="absolute inset-0 rounded-b-[30%] bg-[repeating-linear-gradient(180deg,#efe6d6_0px,#efe6d6_10px,#e2d6c1_11px,#efe6d6_12px)] shadow-[0_8px_20px_rgba(0,0,0,0.35)] dark:bg-[repeating-linear-gradient(180deg,#1b2740_0px,#1b2740_10px,#141e33_11px,#1b2740_12px)]"
            >
              <span className="absolute inset-x-[30%] bottom-[6%] h-2 rounded-full bg-[#b8945a] shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
            </motion.div>

            {/* Depth and glare */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_45px_12px_rgba(0,0,0,0.55)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.22)_0%,transparent_32%)]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Contact() {
  const t = useT().contact;
  return (
    <section id="contact" className="relative scroll-mt-24 py-28 lg:py-40">
      <div className="relative mx-auto grid w-full max-w-[1100px] items-center gap-14 px-6 sm:px-10 lg:grid-cols-[0.9fr_1fr]">
        <SkyWindow alt={t.windowAlt} />

        <motion.div variants={group(0.13)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <motion.h2 variants={fadeUp} className="font-serif text-5xl italic text-ink sm:text-6xl">
            {t.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-display mt-4 text-2xl font-medium leading-snug text-accent sm:text-3xl"
          >
            <Brand text={t.lead} />
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">
            <Brand text={t.body} />
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <NotifyForm id="contact-email" align="start" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const platformHref = "#modules";
const companyHrefs = ["#why", "#vision", "#roles"];

export function Footer() {
  const t = useT().footer;
  const columns = [
    { title: t.platform, links: t.platformLinks.map((label) => ({ label, href: platformHref })) },
    { title: t.company, links: t.companyLinks.map((label, i) => ({ label, href: companyHrefs[i] })) },
    {
      title: t.contact,
      links: [
        { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, email: true },
        ...t.contactLinks.map((label) => ({ label, href: "#contact" })),
      ],
    },
  ];

  return (
    <footer className="relative border-t border-ink/10 pt-16 pb-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <motion.div
        className="mx-auto grid w-full max-w-[1200px] gap-12 px-6 sm:px-10 lg:grid-cols-[1.4fr_2fr]"
        variants={group(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp}>
          <a href="#top" className="font-display inline-block text-3xl font-bold tracking-tight text-ink">
            <Wordmark />
          </a>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/55">{t.blurb}</p>
          <p className="font-display mt-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-accent">
            {t.motto}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-ink">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"email" in l ? (
                      <a
                        href={l.href}
                        className="inline-flex items-start gap-2 text-[13px] font-medium text-accent transition-colors duration-300 hover:text-ink"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="mt-0.5 size-4 shrink-0" aria-hidden>
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="M3.5 6.5l8.5 6 8.5-6" />
                        </svg>
                        {/* Wrap only after the @, never mid-word */}
                        <span>
                          {l.label.split("@")[0]}@<wbr />
                          <span className="whitespace-nowrap">{l.label.split("@")[1]}</span>
                        </span>
                      </a>
                    ) : (
                      <a href={l.href} className="text-[13px] text-ink/55 transition-colors duration-300 hover:text-accent">
                        <Brand text={l.label} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mx-auto mt-14 flex w-full max-w-[1200px] items-center justify-between gap-4 border-t border-ink/10 px-6 pt-8 sm:px-10">
        <p className="text-xs text-ink/45">
          © 2026 <Wordmark /> {t.rights}
        </p>
        <motion.a
          href="#top"
          aria-label={t.top}
          whileHover={{ y: -4 }}
          className="flex size-10 items-center justify-center rounded-full border border-gold/40 text-accent transition-colors hover:bg-gold hover:text-navy"
        >
          <ArrowUp className="size-4" />
        </motion.a>
      </div>
    </footer>
  );
}
