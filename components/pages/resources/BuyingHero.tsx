"use client";

import { useRef } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { ScoreRing } from "./ScoreRing";

// Hero visual for /lms-buying-guide: a checklist that ticks itself while on
// screen, with its score ring filling in step. Stops off-screen and under
// reduced motion (where it rests on a half-ticked state).
const ROWS = [
  { label: "Fees go to my own account", must: true },
  { label: "GST invoices in my name", must: true },
  { label: "Handwritten answers, mentor approves", must: true },
  { label: "One pipeline for every lead" },
  { label: "Data in India, export any time", must: true },
  { label: "No cut of my fee income", must: true },
];

export function BuyingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [step] = useAutoplay(ROWS.length + 3, { interval: 900, running: inView && !reduced });
  const done = reduced ? 4 : Math.min(step, ROWS.length);
  const score = done / ROWS.length;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[560px]">
      <div className="window rounded-[28px] p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4 border-b border-edge pb-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Your shortlist</p>
            <p className="mt-1 font-display text-[22px] font-medium tracking-[-0.03em]">Vendor A</p>
          </div>
          <ScoreRing value={score} size={92} stroke={9} tone={score >= 0.85 ? "stroke-green" : "stroke-primary"}>
            <span className="font-display text-[24px] font-medium leading-none tabular-nums">
              {Math.round(score * 100)}
              <span className="text-[13px] text-fg-muted">%</span>
            </span>
          </ScoreRing>
        </div>
        <ul className="mt-3">
          {ROWS.map((r, i) => {
            const on = i < done;
            return (
              <li key={r.label} className={clsx("flex items-center gap-3.5 rounded-xl px-2.5 py-3 transition-colors duration-300", on && "bg-primary-tint/50")}>
                <span aria-hidden className={clsx("grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-colors duration-300", on ? "border-navy bg-navy" : "border-edge-strong")}>
                  <motion.span initial={false} animate={{ scale: on ? 1 : 0 }} transition={{ duration: 0.25, ease: EASE }} className="grid place-items-center">
                    <Check className="h-4 w-4 text-canvas" strokeWidth={3.5} />
                  </motion.span>
                </span>
                <span className="min-w-0 flex-1 text-[15px]">{r.label}</span>
                {r.must ? <span className="hidden rounded-full border border-gold/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-gold-text sm:inline">Must</span> : null}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-center text-[12px] text-fg-faint">Illustrative · the real checklist is below</p>
      </div>
    </div>
  );
}
