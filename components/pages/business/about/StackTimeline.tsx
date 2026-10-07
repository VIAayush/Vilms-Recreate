"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Check } from "lucide-react";
import { useReducedMotion } from "@/components/marketing/motion";

export type StackStep = { title: string; text: string };

/**
 * How an institute ends up with a patchwork, one tool at a time. A line draws
 * down the page as you scroll and each step lights up as it reaches it; the
 * last step is the resolution. Under reduced motion every step is lit.
 */
export function StackTimeline({ steps, resolution }: { steps: StackStep[]; resolution: StackStep }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const all = [...steps, resolution];
  const [lit, setLit] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.65", "end 0.6"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setLit(Math.min(all.length, Math.floor(v * (all.length + 0.4)) + 1)));
  const shown = reduced ? all.length : lit;

  return (
    <ol ref={ref} className="relative">
      {/* the rail, and the part of it already travelled */}
      <span aria-hidden className="absolute bottom-3 left-[17px] top-3 w-px bg-edge" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduced ? 1 : scrollYProgress, transformOrigin: "top" }}
        className="absolute bottom-3 left-[17px] top-3 w-px bg-primary"
      />
      {all.map((s, i) => {
        const on = i < shown;
        const last = i === all.length - 1;
        return (
          <li key={s.title} className={clsx("relative flex gap-5 pb-9 last:pb-0 sm:gap-7", !on && "opacity-45")} style={{ transition: "opacity 0.5s ease" }}>
            <span
              aria-hidden
              className={clsx(
                "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border font-mono text-[12px] tabular-nums transition-colors duration-500",
                last && on ? "border-navy bg-navy text-white" : on ? "border-primary bg-primary-tint text-primary" : "border-edge-strong bg-canvas-alt text-fg-faint",
              )}
            >
              {last ? <Check className="h-4 w-4" strokeWidth={3} /> : String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 pt-1">
              <h3 className={clsx("font-display font-medium tracking-[-0.025em]", last ? "text-[clamp(24px,2.8vw,32px)]" : "text-[clamp(20px,2.2vw,26px)]")}>{s.title}</h3>
              <p className="mt-1.5 max-w-[520px] text-[15.5px] leading-relaxed text-fg-muted">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
