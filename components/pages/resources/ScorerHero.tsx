"use client";

import { useRef } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { CRITERIA, PRESETS } from "./criteria-data";
import { ScoreRing, scoreTone } from "./ScoreRing";

// Hero visual for /best-lms-software-india: the weighted scorer in miniature,
// cycling through the four starting profiles while on screen.
const COVER = { full: 1, partial: 0.5 } as const;

export function ScorerHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [p] = useAutoplay(PRESETS.length, { interval: 2800, running: inView && !reduced });
  const preset = PRESETS[reduced ? 1 : p];
  const total = CRITERIA.reduce((t, c) => t + preset.weights[c.id], 0);
  const got = CRITERIA.reduce((t, c) => t + preset.weights[c.id] * COVER[c.coverage], 0);
  const score = total ? got / total : 0;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[560px]">
      <div className="window rounded-[28px] p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4 border-b border-edge pb-5">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Profile</p>
            <motion.p key={preset.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE }} className="mt-1 truncate font-display text-[22px] font-medium tracking-[-0.03em]">
              {preset.label}
            </motion.p>
          </div>
          <ScoreRing value={score} size={84} stroke={8} tone={scoreTone(score)}>
            <span className="font-display text-[22px] font-medium leading-none tabular-nums">
              {Math.round(score * 100)}
              <span className="text-[12px] text-fg-muted">%</span>
            </span>
          </ScoreRing>
        </div>
        <ul className="mt-3">
          {CRITERIA.map((c) => {
            const w = preset.weights[c.id];
            return (
              <li key={c.id} className="grid grid-cols-[104px_minmax(0,1fr)_14px] items-center gap-3 py-2.5 sm:grid-cols-[120px_minmax(0,1fr)_14px]">
                <span className="truncate text-[14px] text-fg-muted">{c.short}</span>
                <span className="grid grid-cols-3 gap-1" aria-hidden>
                  {[1, 2, 3].map((k) => (
                    <span key={k} className="h-2 overflow-hidden rounded-full bg-edge">
                      <motion.span className="block h-full rounded-full bg-primary" initial={false} animate={{ scaleX: w >= k ? 1 : 0 }} style={{ originX: 0 }} transition={{ duration: 0.4, ease: EASE, delay: k * 0.05 }} />
                    </span>
                  ))}
                </span>
                <span aria-hidden className={clsx("h-2 w-2 rounded-full", c.coverage === "full" ? "bg-green" : "bg-gold")} />
              </li>
            );
          })}
        </ul>
        <p className="mt-3 flex items-center justify-between text-[12px] text-fg-faint">
          <span>Illustrative · scorer below</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="h-2 w-2 rounded-full bg-green" />
              covered
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />
              in part
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}
