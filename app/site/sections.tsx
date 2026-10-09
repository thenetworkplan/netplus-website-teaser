"use client";

import Image from "next/image";
import { useRef, type ComponentType, type SVGProps } from "react";
import { motion, MotionConfig, useScroll, useTransform } from "motion/react";
import logo from "@/public/logo.png";
import { useT } from "../i18n";
import { Brand } from "../wordmark";
import {
  Counter,
  ease,
  fadeUp,
  Glow,
  GhostButton,
  GoldButton,
  group,
  LearnMore,
  Reveal,
  scaleIn,
  ScrollWords,
} from "./reveal";
import { AnalyticsMockup, DashboardMockup, FlightMapMockup, RosterMockup } from "./mockups";
import {
  Chart,
  Gauge,
  Globe,
  Headset,
  Medal,
  Plane,
  Shield,
  ShieldCheck,
  Sliders,
  Users,
  Wrench,
} from "./icons";
import { Contact, Footer } from "./contact";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const container = "relative mx-auto w-full max-w-[1200px] px-6 sm:px-10";

export function Sections() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative overflow-x-clip bg-page text-ink">
        <Intro />
        <Expertise />
        <Vision />
        <Showcase />
        <Roles />
        <Contact />
        <Footer />
      </div>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ */
/* Intro: trusted partner + cinematic product panel                    */
/* ------------------------------------------------------------------ */

function Intro() {
  const t = useT().intro;
  const panel = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: panel, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.84, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);

  return (
    <section id="platform" className="relative scroll-mt-24 pt-24 lg:pt-32">
      <Glow className="-left-60 top-0" />
      <div className={`${container} grid items-end gap-10 lg:grid-cols-2`}>
        <motion.div variants={group()} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <motion.p variants={fadeUp} className="font-display text-gold-gradient text-2xl font-medium sm:text-3xl">
            {t.eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-5xl italic leading-[1.05] text-ink sm:text-6xl">
            {t.title}
          </motion.h2>
        </motion.div>
        <Reveal delay={0.15}>
          <p className="max-w-lg text-[15px] leading-relaxed text-ink/65">
            <Brand text={t.body} />
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <GoldButton href="#modules">{t.explore}</GoldButton>
            <GhostButton href="#contact">{t.demo}</GhostButton>
          </div>
        </Reveal>
      </div>

      <div ref={panel} className={`${container} mt-14 [perspective:1600px] lg:mt-20`}>
        <motion.div
          style={{ scale, rotateX, opacity }}
          className="origin-bottom overflow-hidden rounded-[28px] border border-gold/25 bg-card shadow-[0_60px_140px_-40px_rgba(201,163,92,0.4)]"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Expertise: logo centrepiece, counter, feature grid                  */
/* ------------------------------------------------------------------ */

const featureIcons: IconType[] = [Wrench, Plane, Shield, Headset];

function Expertise() {
  const t = useT().expertise;
  const learnMore = useT().learnMore;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const innerRotate = useTransform(scrollYProgress, [0, 1], [0, -270]);

  return (
    <section id="why" className="relative scroll-mt-24 py-28 lg:py-36">
      <Glow className="-right-40 top-40" />
      <div ref={ref} className={`${container} grid items-center gap-12 lg:grid-cols-[1fr_1.3fr_1fr]`}>
        <Reveal x={-40} y={0}>
          <h2 className="font-display text-gold-gradient text-3xl font-medium leading-tight sm:text-4xl">
            {t.title[0]}
            <br />
            {t.title[1]}
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/60">{t.body}</p>
        </Reveal>

        {/* Centrepiece */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center">
          <motion.div
            style={{ rotate: ringRotate }}
            className="absolute inset-0 rounded-full border border-dashed border-gold/30"
          />
          <motion.div style={{ rotate: innerRotate }} className="absolute inset-[12%] rounded-full border border-gold/20">
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-gold-light shadow-[0_0_14px_4px_rgba(230,201,141,0.7)]" />
          </motion.div>
          <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(201,163,92,0.3),transparent_68%)] blur-xl" />
          <motion.div style={{ y: logoY, rotate: logoRotate }} className="relative w-[78%]">
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <Image
                src={logo}
                alt={t.emblem}
                sizes="(max-width: 1024px) 80vw, 360px"
                className="h-auto w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </motion.div>
        </div>

        <Reveal x={40} y={0} className="lg:text-right">
          <p className="font-display text-gold-gradient text-6xl font-semibold tracking-tight sm:text-7xl">
            <Counter to={360} suffix="°" />
          </p>
          <p className="font-display mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink">{t.statLabel}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 lg:ml-auto lg:max-w-xs">{t.statBody}</p>
        </Reveal>
      </div>

      <div className={`${container} mt-20 grid gap-14 lg:mt-28 lg:grid-cols-2 lg:gap-20`}>
        <motion.ul
          className="grid gap-x-8 gap-y-10 sm:grid-cols-2"
          variants={group(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {t.features.map(({ title, text }, i) => {
            const Icon = featureIcons[i];
            return (
              <motion.li key={i} variants={fadeUp} className="group">
                <motion.span
                  variants={scaleIn}
                  className="flex size-10 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-accent transition-colors duration-300 group-hover:bg-gold group-hover:text-navy"
                >
                  <Icon className="size-5" />
                </motion.span>
                <h3 className="font-display mt-4 text-sm font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/55">{text}</p>
                <LearnMore href="#modules">{learnMore}</LearnMore>
              </motion.li>
            );
          })}
        </motion.ul>

        <Reveal>
          <p className="font-display text-gold-gradient text-3xl font-medium sm:text-4xl">{t.worldA}</p>
          <p className="font-serif text-4xl italic text-ink sm:text-5xl">{t.worldB}</p>
          <p className="mt-8 text-sm leading-relaxed text-ink/60">
            <Brand text={t.p1} />
          </p>
          <p className="mt-5 text-sm leading-relaxed text-ink/60">{t.p2}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Vision: scroll-lit statement, rising horizon, four pillars          */
/* ------------------------------------------------------------------ */

const pillarIcons: IconType[] = [Medal, Sliders, ShieldCheck, Globe];

function Vision() {
  const t = useT().vision;
  const horizon = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: horizon, offset: ["start end", "end start"] });
  const planetY = useTransform(scrollYProgress, [0, 0.55], [220, 0]);
  const glow = useTransform(scrollYProgress, [0.1, 0.5], [0.2, 1]);
  const arc = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);

  return (
    <section id="vision" className="relative scroll-mt-24 pt-20 lg:pt-28">
      <div className={container}>
        {/* key: restart the word-by-word reveal cleanly when the language changes */}
        <ScrollWords
          key={t.statement}
          className="font-display mx-auto max-w-4xl text-center text-2xl font-medium leading-snug sm:text-4xl sm:leading-tight"
          text={t.statement}
        />
      </div>

      {/* Horizon */}
      <div ref={horizon} className="relative -mt-4 h-[56vw] max-h-[560px] min-h-[320px] overflow-hidden">
        <motion.div
          style={{ y: planetY }}
          className="absolute left-1/2 top-[34%] aspect-square w-[170vw] max-w-[2400px] -translate-x-1/2 rounded-full"
        >
          <motion.div
            style={{ opacity: glow }}
            className="absolute -inset-[2%] rounded-full bg-[radial-gradient(circle_closest-side,transparent_91%,rgba(240,217,166,0.75)_95.5%,rgba(201,163,92,0.25)_98%,transparent_100%)] blur-[6px]"
          />
          <div className="np-planet-surface absolute inset-0 rounded-full" />
          <div className="np-planet-dots absolute inset-0 rounded-full opacity-60 [mask-image:radial-gradient(ellipse_40%_22%_at_50%_0%,black_0%,transparent_100%)]" />
        </motion.div>

        <svg viewBox="0 0 1000 600" className="absolute inset-0 size-full" preserveAspectRatio="none" aria-hidden>
          <motion.path
            d="M110 380 Q 500 -60 890 380"
            fill="none"
            stroke="#c9a35c"
            strokeWidth="1.5"
            style={{ pathLength: arc, opacity: glow }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-page to-transparent" />
      </div>

      <motion.ul
        className={`${container} -mt-24 grid grid-cols-2 gap-x-6 gap-y-12 sm:-mt-32 lg:grid-cols-4`}
        variants={group(0.14)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {t.pillars.map(({ a, b, text }, i) => {
          const Icon = pillarIcons[i];
          return (
            <motion.li key={i} variants={fadeUp} className="group relative">
              <motion.span
                variants={scaleIn}
                whileHover={{ rotate: 8, scale: 1.08 }}
                className="flex size-12 items-center justify-center rounded-xl border border-gold/50 bg-page-2 text-accent shadow-[0_0_30px_-8px_rgba(201,163,92,0.7)]"
              >
                <Icon className="size-5" />
              </motion.span>
              <h3 className="mt-5 leading-tight">
                <span className="font-display text-gold-gradient block text-lg font-semibold">{a}</span>
                <span className="font-serif block text-2xl italic text-ink">{b}</span>
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/55">{text}</p>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Showcase: three module cards                                        */
/* ------------------------------------------------------------------ */

const visuals = [FlightMapMockup, RosterMockup, AnalyticsMockup];

function Showcase() {
  const t = useT().showcase;
  const learnMore = useT().learnMore;
  return (
    <section id="modules" className="relative scroll-mt-24 py-28 lg:py-36">
      <Glow className="left-1/2 top-20 -translate-x-1/2" />
      <div className={container}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium sm:text-4xl">
            <span className="text-gold-gradient">{t.a}</span>{" "}
            <span className="font-serif italic text-ink">{t.b}</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ink/60">{t.body}</p>
        </Reveal>

        <motion.ul
          className="mt-16 grid gap-10 md:grid-cols-3 md:gap-7"
          variants={group(0.18)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {t.cards.map(({ title, text }, i) => {
            const Visual = visuals[i];
            return (
              <motion.li key={i} variants={fadeUp} className="group">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative aspect-[4/3.3] overflow-hidden rounded-2xl border border-ink/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-colors duration-500 group-hover:border-gold/50"
                >
                  <Visual />
                </motion.div>
                <h3 className="font-display text-gold-gradient mt-6 text-base font-semibold leading-snug">
                  {title[0]}
                  <br />
                  {title[1]}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/55">{text}</p>
                <LearnMore>{learnMore}</LearnMore>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Roles: what changes for each team                                   */
/* ------------------------------------------------------------------ */

const roleIcons: IconType[] = [Gauge, Users, Wrench, Chart];

function Roles() {
  const t = useT().roles;
  return (
    <section id="roles" className="relative scroll-mt-24 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease }}
        className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] border border-gold/25 bg-[linear-gradient(180deg,var(--page-2),var(--page))] px-6 py-16 sm:px-10 lg:py-20"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />
        <h2 className="text-center text-4xl sm:text-5xl">
          <span className="font-display text-gold-gradient font-medium">{t.a}</span>{" "}
          <span className="font-serif italic text-ink">{t.b}</span>
        </h2>
        <motion.ul
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          variants={group(0.15, 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {t.items.map(({ role, team, text }, i) => {
            const Icon = roleIcons[i];
            return (
              <motion.li
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="flex flex-col items-center rounded-2xl px-4 py-6 text-center transition-colors duration-300 hover:bg-ink/[0.03]"
              >
                <motion.span
                  variants={scaleIn}
                  className="bg-gold-gradient flex size-14 items-center justify-center rounded-full p-[1.5px] shadow-[0_0_28px_-6px_rgba(230,201,141,0.7)]"
                >
                  <span className="flex size-full items-center justify-center rounded-full bg-page-2 text-accent">
                    <Icon className="size-6" />
                  </span>
                </motion.span>
                <span className="mt-4 flex gap-1" aria-hidden>
                  {[0, 1, 2, 3, 4].map((d) => (
                    <span key={d} className="size-1 rotate-45 bg-gold" />
                  ))}
                </span>
                <p className="mt-4 text-[13px] leading-relaxed text-ink/60">{text}</p>
                <p className="font-display mt-5 text-xs font-semibold text-ink">{role}</p>
                <p className="mt-1 text-[11px] text-accent">{team}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}
