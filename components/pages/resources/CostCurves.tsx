"use client";

import { motion } from "motion/react";
import { EASE } from "@/components/site-ui/motion-tokens";

// Hero visual for /lms-software-comparison: the shape of each approach's cost
// as fee income grows. Conceptual only (no numbers, not to scale): a revenue
// share follows every sale, a tool stack climbs in bumps, a flat plan steps up
// by tier. Honest about the left edge too: at small incomes the percentage is
// the cheapest line.
const LINES = [
  { id: "share", label: "Revenue share", note: "follows every sale", d: "M90 270 L940 62", cls: "stroke-fg-muted", dash: "10 8", swatch: "border-dashed border-fg-muted" },
  { id: "stack", label: "Stack of tools", note: "climbs in bumps", d: "M90 236 h104 v-24 h104 v-20 h104 v-30 h104 v-14 h104 v-26 h104 v-18 h92", cls: "stroke-gold", dash: undefined, swatch: "border-solid border-gold" },
  { id: "flat", label: "Flat plan", note: "steps up by tier", d: "M90 216 H372 V190 H654 V160 H940", cls: "stroke-primary", dash: undefined, swatch: "border-solid border-primary" },
];

export function CostCurves() {
  return (
    <figure className="window rounded-[28px] p-5 sm:p-8">
      <div className="relative">
        <svg viewBox="0 0 1000 320" className="h-auto w-full" role="img" aria-label="Illustration: a revenue-share cost rises steadily with fee income; a stack of tools rises in bumps; a flat plan steps up by tier and starts higher but ends lower.">
          {[60, 120, 180, 240, 300].map((y) => (
            <line key={y} x1={90} x2={950} y1={y} y2={y} className="stroke-edge" strokeWidth={1} />
          ))}
          <line x1={90} x2={90} y1={40} y2={300} className="stroke-edge-strong" strokeWidth={1.5} />
          <line x1={90} x2={950} y1={300} y2={300} className="stroke-edge-strong" strokeWidth={1.5} />
          {LINES.map((l, i) => (
            <motion.path
              key={l.id}
              d={l.d}
              fill="none"
              className={l.cls}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={l.dash}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.3, delay: 0.15 + i * 0.2, ease: EASE }}
            />
          ))}
        </svg>
        <span className="pointer-events-none absolute left-0 top-0 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Cost</span>
        <span className="pointer-events-none absolute bottom-0 right-0 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Fee income →</span>
      </div>
      <figcaption className="mt-5 flex flex-col gap-4 border-t border-edge pt-5 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
          {LINES.map((l) => (
            <li key={l.id} className="flex items-center gap-2.5 text-[14px]">
              <span aria-hidden className={`h-0 w-6 border-t-[4px] ${l.swatch}`} />
              <span>
                <span className="font-medium">{l.label}</span> <span className="text-fg-muted">{l.note}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="text-[12px] text-fg-faint">Illustrative · not to scale</p>
      </figcaption>
    </figure>
  );
}
