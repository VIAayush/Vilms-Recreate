"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "@/components/marketing/motion";

/**
 * Wraps the readable part of a guide or article: a thin reading-progress bar
 * fixed to the top of the screen that fills as the reader moves through the
 * wrapped content, and a tall container for the sticky table of contents.
 */
export function GuideFrame({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.4"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 34, restDelta: 0.001 });

  return (
    <div ref={ref} id={id} className={className}>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
        <motion.div className="h-full origin-left bg-primary" style={{ scaleX: reduced ? scrollYProgress : smooth }} />
      </div>
      {children}
    </div>
  );
}
