"use client";

import { useRef } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";

export type DemoStep = { title: string; text: string };

/**
 * The 30 minutes as a bar of four segments that fill one after another while
 * the timeline is on screen. The current step is highlighted and the loop
 * pauses once a visitor picks a step. Reduced motion shows every step at once.
 */
export function DemoTimeline({ steps }: { steps: DemoStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-12% 0px" });
  const reduced = useReducedMotion();
  const [auto, select] = useAutoplay(steps.length, { interval: 3000, running: inView && !reduced });
  const active = reduced ? steps.length - 1 : auto;

  return (
    <div ref={ref}>
      <div aria-hidden className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <span key={s.title} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-sunken">
            <motion.span
              initial={false}
              animate={{ scaleX: i <= active ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 rounded-full bg-primary"
            />
          </span>
        ))}
      </div>
      <div aria-hidden className="mt-2 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">
        <span>Start</span>
        <span>30 minutes</span>
      </div>

      <ol className="mt-6">
        {steps.map((s, i) => {
          const on = i === active;
          const done = i < active || reduced;
          return (
            <li key={s.title} aria-current={on && !reduced ? "step" : undefined} className="relative">
              {i < steps.length - 1 ? <span aria-hidden className={clsx("absolute left-[15px] top-9 h-[calc(100%-20px)] w-px transition-colors duration-500", done ? "bg-primary" : "bg-edge")} /> : null}
              <button type="button" onClick={() => select(i)} className="group relative flex w-full gap-4 rounded-xl pb-6 text-left">
                <span
                  aria-hidden
                  className={clsx(
                    "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-[11.5px] tabular-nums transition-colors duration-500",
                    done ? "border-primary bg-primary text-primary-ink" : on ? "border-primary bg-primary-tint text-primary" : "border-edge-strong bg-panel text-fg-faint group-hover:border-primary",
                  )}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className={clsx("block text-[17px] font-medium tracking-[-0.01em] transition-colors duration-300", on || done ? "text-fg" : "text-fg-muted group-hover:text-fg")}>{s.title}</span>
                  <span className={clsx("mt-1 block max-w-[440px] text-[14.5px] leading-relaxed transition-colors duration-300", on || reduced ? "text-fg-muted" : "text-fg-faint")}>{s.text}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
