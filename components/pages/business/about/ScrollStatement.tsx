"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/components/marketing/motion";

type Word = { w: string; accent: boolean };

/**
 * One large statement whose words fill in as it scrolls through the viewport.
 * `accent` words land in the brand blue. Under reduced motion the whole
 * sentence is simply shown.
 */
export function ScrollStatement({ phrases }: { phrases: { text: string; accent?: boolean }[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words: Word[] = phrases.flatMap((p) => p.text.split(" ").map((w) => ({ w, accent: !!p.accent })));

  return (
    <p ref={ref} className="text-balance font-display text-[clamp(26px,3.9vw,50px)] font-medium leading-[1.14] tracking-[-0.03em]">
      {words.map((x, i) => (
        <WordSpan key={i} word={x} index={i} total={words.length} progress={scrollYProgress} still={reduced} />
      ))}
    </p>
  );
}

function WordSpan({ word, index, total, progress, still }: { word: Word; index: number; total: number; progress: MotionValue<number>; still: boolean }) {
  const start = index / total;
  const opacity = useTransform(progress, [start * 0.92, Math.min(1, start * 0.92 + 0.08)], [0.16, 1]);
  return (
    <>
      <motion.span style={still ? undefined : { opacity }} className={word.accent ? "text-primary" : undefined}>
        {word.w}
      </motion.span>{" "}
    </>
  );
}
