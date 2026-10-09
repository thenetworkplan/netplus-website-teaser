"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  animate,
  motion,
  stagger,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Parent variant that staggers its children when it scrolls into view. */
export function group(gap = 0.12, startDelay = 0): Variants {
  return {
    hidden: {},
    show: { transition: { delayChildren: stagger(gap, { startDelay }) } },
  };
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -20 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 16 },
  },
};

/** Fades and lifts its content in the first time it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  x = 0,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up from zero once visible. */
export function Counter({
  to,
  suffix = "",
  duration = 2.2,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    const format = (v: number) => `${Math.round(v).toLocaleString("en-US")}${suffix}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = format(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease,
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

function Word({
  children,
  progress,
  range,
  gold,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  gold: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block ${gold ? "text-gold-gradient" : "text-ink"}`}
    >
      {children}
    </motion.span>
  );
}

/**
 * Text whose words light up one by one as it scrolls through the viewport.
 * Prefix a word with * to paint it gold.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.4"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((raw, i) => {
        const gold = raw.startsWith("*");
        const word = gold ? raw.slice(1) : raw;
        const start = i / words.length;
        return (
          <span key={i}>
            <Word progress={scrollYProgress} range={[start, start + 1 / words.length]} gold={gold}>
              {word}
            </Word>{" "}
          </span>
        );
      })}
    </p>
  );
}

/** Soft gold light used to warm up dark sections. */
export function Glow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute size-[520px] rounded-full bg-[radial-gradient(circle,rgba(201,163,92,0.16),transparent_65%)] ${className}`}
    />
  );
}

export function GoldButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-gold-gradient font-display relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy shadow-[0_10px_30px_-10px_rgba(201,163,92,0.8)]"
    >
      {children}
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}

export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="font-display inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent transition-colors hover:bg-gold/10"
    >
      {children}
    </motion.a>
  );
}

export function LearnMore({ href = "#contact", children }: { href?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="font-display group/link mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent"
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
