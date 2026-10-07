"use client";

import { useEffect, useState } from "react";
import { animate } from "motion/react";
import { useMediaQuery, useReducedMotion } from "@/components/marketing/motion";

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * A local clock for one step of a <ScrollStory>. Returns `u` (0 → 1) for the
 * active step:
 *  - pinned on desktop: u follows scroll position inside the step, so the
 *    stage scrubs with the page;
 *  - on phones (not pinned): u runs by itself each time the step changes;
 *  - under prefers-reduced-motion: u is always 1 (the settled state).
 * A stage that is a pure function of (step, u) works in all three.
 */
export function useStepClock(step: number, progress: number, count: number, duration = 2.4) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduced = useReducedMotion();
  const pinned = desktop && !reduced;
  const [timed, setTimed] = useState({ step: -1, u: 0 });

  useEffect(() => {
    if (pinned || reduced) return;
    const controls = animate(0, 1, { duration, ease: "linear", onUpdate: (u) => setTimed({ step, u }) });
    return () => controls.stop();
  }, [step, pinned, reduced, duration]);

  if (reduced) return { u: 1, pinned };
  if (pinned) return { u: clamp01(progress * count - step), pinned };
  return { u: timed.step === step ? timed.u : 0, pinned };
}

/** Maps u so a value reaches 1 at `end` (the step then rests in its final state). */
export const settle = (u: number, end = 0.75) => clamp01(u / end);

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Smooth ease for travelling things. */
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
