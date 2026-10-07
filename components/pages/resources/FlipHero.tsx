"use client";

import { useId, useRef } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { STAGES } from "./day-data";

// Hero visual for /lms-vs-traditional-teaching: the day at the institute
// flipping between the two ways of running it. Plays while on screen; under
// reduced motion it shows both versions of each row at once.
export function FlipHero() {
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [i, select] = useAutoplay(2, { interval: 3400, running: inView && !reduced });
  const lms = i === 1;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[560px]">
      <div className={clsx("rounded-[28px] border p-4 transition-colors duration-500 sm:p-6", lms && !reduced ? "window border-primary/40 bg-panel" : "border-dashed border-edge-strong bg-canvas-alt")}>
        {reduced ? (
          <p className="px-1 pb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Traditional → with an LMS</p>
        ) : (
          <div role="group" aria-label="Preview" className="relative grid grid-cols-2 rounded-full border border-edge-strong bg-panel p-1">
            {["Traditional", "With an LMS"].map((label, k) => (
              <button key={label} type="button" aria-pressed={i === k} onClick={() => select(k)} className={clsx("relative rounded-full px-3 py-2.5 text-[13.5px] font-semibold transition-colors", i === k ? "text-canvas" : "text-fg-muted")}>
                {i === k ? <motion.span layoutId={`${uid}-fh`} transition={{ duration: 0.4, ease: EASE }} className="absolute inset-0 rounded-full bg-navy" /> : null}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        )}

        <ul className="mt-3">
          {STAGES.map((s, k) => (
            <li key={s.id} className="grid grid-cols-[46px_minmax(0,1fr)] items-baseline gap-3 border-b border-edge py-3.5 last:border-b-0">
              <span className="font-mono text-[11.5px] tabular-nums text-fg-faint">{s.time}</span>
              <div className="min-w-0">
                <p className="text-[12.5px] font-medium text-fg-muted">{s.label}</p>
                {reduced ? (
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[15px] font-medium">
                    <span className="text-fg-faint line-through decoration-edge-strong">{s.hero[0]}</span>
                    <ArrowRight aria-hidden className="h-3.5 w-3.5 text-primary" />
                    {s.hero[1]}
                  </p>
                ) : (
                  <div className="relative mt-0.5 h-[22px] overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.p
                        key={lms ? "lms" : "trad"}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35, delay: k * 0.05, ease: EASE }}
                        className={clsx("truncate text-[15px] font-medium", lms ? "text-fg" : "text-fg-muted")}
                      >
                        {s.hero[lms ? 1 : 0]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-[12px] text-fg-faint">Illustrative · the full comparison is below</p>
      </div>
    </div>
  );
}
