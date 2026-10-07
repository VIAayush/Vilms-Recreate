"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { EASE } from "@/components/site-ui/motion-tokens";

/** A progress ring that animates to `value` (0–1). Children sit in the middle. */
export function ScoreRing({
  value,
  size = 160,
  stroke = 12,
  tone = "stroke-primary",
  className,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  tone?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = size / 2;
  const v = Math.min(1, Math.max(0, value));
  return (
    <div className={clsx("relative shrink-0", className)} style={{ width: size, height: size }}>
      <svg aria-hidden viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={c} cy={c} r={r} fill="none" className="stroke-edge" strokeWidth={stroke} />
        <motion.circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          className={clsx("transition-[stroke] duration-500", tone)}
          strokeWidth={stroke}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          initial={false}
          animate={{ strokeDashoffset: 1 - v, opacity: v > 0 ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

/** Colour of the ring for a 0–1 score. */
export const scoreTone = (v: number) => (v >= 0.85 ? "stroke-green" : v >= 0.6 ? "stroke-primary" : "stroke-red");
