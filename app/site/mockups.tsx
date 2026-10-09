"use client";

/**
 * Illustrative product UI used as visuals across the page.
 * All figures here are sample data for the mockups, not live metrics.
 */

import Image from "next/image";
import { motion } from "motion/react";
import loaderBg from "@/public/loaderbg.jpeg";
import logo from "@/public/logo.png";
import { Counter, ease } from "./reveal";
import { useT } from "../i18n";
import { Chart, Globe, Plane, Shield, Sparkle, Users, Wrench } from "./icons";

const view = { once: true, amount: 0.35 } as const;

const kpis = [
  { label: "Flights today", value: 128, suffix: "" },
  { label: "On-time performance", value: 96, suffix: "%" },
  { label: "Crew on duty", value: 342, suffix: "" },
  { label: "Aircraft serviceable", value: 41, suffix: "/43" },
];

const flights = [
  { tail: "NP-101", route: "TUN → CDG", start: 3, len: 27, warn: false },
  { tail: "NP-214", route: "TUN → FCO", start: 17, len: 22, warn: true },
  { tail: "NP-305", route: "DJE → LYS", start: 33, len: 29, warn: false },
  { tail: "NP-122", route: "TUN → IST", start: 8, len: 36, warn: false },
  { tail: "NP-410", route: "MIR → BRU", start: 47, len: 30, warn: false },
  { tail: "NP-233", route: "TUN → GVA", start: 60, len: 25, warn: false },
];

const hours = ["06", "08", "10", "12", "14", "16", "18", "20"];

export function DashboardMockup() {
  const t = useT().dashboard;
  return (
    <div aria-hidden className="grid text-ink sm:grid-cols-[64px_1fr]">
      {/* Sidebar */}
      <div className="hidden flex-col items-center gap-5 border-r border-ink/10 bg-page-2 py-5 sm:flex">
        <Image src={logo} alt="" className="h-7 w-auto" sizes="48px" />
        {[Plane, Users, Wrench, Shield, Chart, Globe].map((Icon, i) => (
          <span
            key={i}
            className={`flex size-9 items-center justify-center rounded-xl ${
              i === 0 ? "bg-gold/15 text-accent" : "text-ink/40"
            }`}
          >
            <Icon className="size-[18px]" />
          </span>
        ))}
      </div>

      <div className="p-4 sm:p-6">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              {t.eyebrow}
            </p>
            <p className="font-display mt-1 text-lg font-semibold sm:text-xl">{t.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              <motion.span
                className="size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-300"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              {t.live}
            </span>
            <span className="hidden rounded-full border border-ink/10 px-3 py-1 text-[10px] font-medium text-ink/60 sm:block">
              {t.sample}
            </span>
          </div>
        </div>

        {/* KPIs */}
        <motion.div
          className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={view}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
              }}
              className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-4"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/50">{t.kpis[i]}</p>
              <Counter
                to={k.value}
                suffix={k.suffix}
                className="font-display mt-2 block text-2xl font-semibold text-accent sm:text-3xl"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.75fr_1fr]">
          {/* Timeline */}
          <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-xs font-semibold">{t.timeline}</p>
              <p className="text-[10px] text-ink/45">{t.today}</p>
            </div>
            <div className="mt-3 grid grid-cols-[72px_1fr] gap-x-3 text-[10px] text-ink/40 sm:grid-cols-[110px_1fr]">
              <span />
              <div className="flex justify-between">
                {hours.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </div>
            </div>
            <div className="relative mt-2 space-y-2.5 [--lab:72px] sm:[--lab:110px]">
              {flights.map((f, i) => (
                <div key={f.tail} className="grid grid-cols-[72px_1fr] items-center gap-x-3 sm:grid-cols-[110px_1fr]">
                  <div className="leading-tight">
                    <p className="font-display text-[11px] font-semibold">{f.tail}</p>
                    <p className="hidden text-[10px] text-ink/45 sm:block">{f.route}</p>
                  </div>
                  <div className="relative h-6 rounded-md bg-ink/[0.04]">
                    <motion.div
                      className={`absolute inset-y-0 origin-left rounded-md ${
                        f.warn
                          ? "bg-[linear-gradient(90deg,#b4552f,#e08a4f)]"
                          : "bg-[linear-gradient(90deg,#9c7535,#e6c98d)]"
                      }`}
                      style={{ left: `${f.start}%`, width: `${f.len}%` }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={view}
                      transition={{ duration: 1, ease, delay: 0.3 + i * 0.12 }}
                    />
                  </div>
                </div>
              ))}
              {/* "Now" marker */}
              <motion.div
                className="pointer-events-none absolute -inset-y-1 w-px bg-gold-light shadow-[0_0_12px_2px_rgba(230,201,141,0.7)]"
                style={{ left: "calc(var(--lab) + 0.75rem + (100% - var(--lab) - 0.75rem) * 0.52)" }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={view}
                transition={{ duration: 0.8, ease, delay: 1.2 }}
              />
            </div>
          </div>

          {/* Map + insight */}
          <div className="hidden flex-col gap-4 lg:flex">
            <div className="relative min-h-[150px] flex-1 overflow-hidden rounded-2xl border border-ink/10">
              <Image src={loaderBg} alt="" fill sizes="400px" className="object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              {[
                [28, 40],
                [55, 30],
                [68, 58],
                [40, 66],
              ].map(([x, y], i) => (
                <span key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                  <motion.span
                    className="absolute -left-2 -top-2 size-4 rounded-full border border-gold-light"
                    animate={{ scale: [0.6, 2], opacity: [0.9, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                  <span className="absolute -left-1 -top-1 size-2 rounded-full bg-gold-light shadow-[0_0_10px_rgba(230,201,141,0.9)]" />
                </span>
              ))}
              <p className="font-display absolute bottom-3 left-3 text-xs font-semibold">{t.network}</p>
            </div>
            <motion.div
              className="rounded-2xl border border-gold/30 bg-gold/[0.07] p-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={view}
              transition={{ duration: 0.8, ease, delay: 1 }}
            >
              <p className="font-display flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                <Sparkle className="size-4" /> {t.insightTitle}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink/75">
                {t.insight}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlightMapMockup() {
  const t = useT().dashboard;
  return (
    <div aria-hidden className="relative h-full w-full">
      <Image
        src={loaderBg}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07101f] via-[#07101f]/20 to-transparent" />
      <svg viewBox="0 0 300 220" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
        {["M40 160 Q 150 30 260 110", "M60 60 Q 170 120 250 40", "M30 110 Q 120 190 230 170"].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="#e6c98d"
            strokeWidth={1.4}
            strokeDasharray="1 0"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.9 }}
            viewport={view}
            transition={{ duration: 1.8, ease, delay: 0.3 + i * 0.3 }}
          />
        ))}
      </svg>
      <span className="font-display absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-[#07101f]/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
        <motion.span
          className="size-1.5 rounded-full bg-gold-light"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        {t.airborne}
      </span>
    </div>
  );
}

const crew = ["AB", "SK", "MR", "LT", "YH"];
const pattern = [
  [1, 1, 0, 2, 2, 0, 1],
  [0, 2, 2, 1, 0, 1, 1],
  [2, 0, 1, 1, 2, 2, 0],
  [1, 1, 2, 0, 0, 1, 2],
  [0, 2, 1, 2, 1, 0, 1],
];

export function RosterMockup() {
  const t = useT().dashboard;
  return (
    <div
      aria-hidden
      className="relative flex h-full w-full flex-col justify-center bg-[radial-gradient(circle_at_30%_20%,#1d3157,#0a1428_70%)] p-5 transition-transform duration-700 group-hover:scale-105"
    >
      <div className="grid grid-cols-[28px_repeat(7,1fr)] gap-1.5 text-center text-[9px] font-semibold text-white/45">
        <span />
        {t.days.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <motion.div
        className="mt-2 space-y-1.5"
        initial="hidden"
        whileInView="show"
        viewport={view}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } } }}
      >
        {crew.map((c, r) => (
          <div key={c} className="grid grid-cols-[28px_repeat(7,1fr)] items-center gap-1.5">
            <span className="bg-gold-gradient font-display flex size-6 items-center justify-center rounded-full text-[8px] font-bold text-navy">
              {c}
            </span>
            {pattern[r].map((v, d) => (
              <motion.span
                key={d}
                variants={{
                  hidden: { opacity: 0, scale: 0.4 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
                }}
                className={`h-6 rounded-md ${
                  v === 2 ? "bg-gold/80" : v === 1 ? "bg-gold/30" : "border border-white/10 bg-white/[0.03]"
                }`}
              />
            ))}
          </div>
        ))}
      </motion.div>
      <span className="font-display absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-[#07101f]/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
        <svg viewBox="0 0 24 24" className="size-3.5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t.roster}
      </span>
    </div>
  );
}

export function AnalyticsMockup() {
  const t = useT().dashboard;
  const line = "M10 150 C 50 140, 70 100, 110 105 S 170 60, 200 70 S 260 30, 290 25";
  return (
    <div
      aria-hidden
      className="relative h-full w-full bg-[radial-gradient(circle_at_70%_10%,#2a2412,#0a1428_65%)] transition-transform duration-700 group-hover:scale-105"
    >
      <svg viewBox="0 0 300 220" className="absolute inset-0 size-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="np-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c9a35c" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c9a35c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="white" strokeOpacity="0.06" />
        ))}
        {[30, 70, 110, 150, 190, 230, 270].map((x, i) => (
          <motion.rect
            key={x}
            x={x - 7}
            width="14"
            rx="3"
            fill="#e6c98d"
            fillOpacity="0.16"
            initial={{ y: 200, height: 0 }}
            whileInView={{ y: 200 - (30 + ((i * 37) % 60)), height: 30 + ((i * 37) % 60) }}
            viewport={view}
            transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.07 }}
          />
        ))}
        <motion.path
          d={`${line} L 290 200 L 10 200 Z`}
          fill="url(#np-area)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={view}
          transition={{ duration: 1.2, delay: 1 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#e6c98d"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={view}
          transition={{ duration: 1.8, ease, delay: 0.3 }}
        />
      </svg>
      <motion.span
        className="font-display absolute right-4 top-4 flex items-center gap-2 rounded-full border border-gold/40 bg-[#07101f]/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light backdrop-blur"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={view}
        transition={{ duration: 0.7, ease, delay: 1.6 }}
      >
        <Sparkle className="size-3.5" /> {t.trend}
      </motion.span>
    </div>
  );
}
