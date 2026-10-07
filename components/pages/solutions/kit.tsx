"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { useInView, useReducedMotion } from "@/components/marketing/motion";

// Small shared pieces for the solution pages' interface mock-ups. Everything
// here is sample data in an illustrated UI.

/** A panel with a small label row, the building block of every mock-up. */
export function Panel({
  title,
  right,
  children,
  className,
  bodyClassName,
}: {
  title?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={clsx("min-w-0 rounded-2xl border border-edge bg-panel", className)}>
      {title || right ? (
        <div className="flex items-center justify-between gap-3 border-b border-edge px-3.5 py-2.5">
          <p className="min-w-0 truncate text-[11.5px] font-semibold text-fg-muted">{title}</p>
          {right ? <div className="shrink-0">{right}</div> : null}
        </div>
      ) : null}
      <div className={clsx("p-3.5", bodyClassName)}>{children}</div>
    </div>
  );
}

/** Runs `tick` every `ms` while `running` (visible, motion allowed). */
export function useTicker(tick: () => void, ms: number, running: boolean) {
  const ref = useRef(tick);
  useEffect(() => {
    ref.current = tick;
  });
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => ref.current(), ms);
    return () => window.clearInterval(id);
  }, [ms, running]);
}

/**
 * Standard "should this loop?" gate for a hero visual: true while the
 * element is on screen and the visitor hasn't asked for reduced motion.
 */
export function useLoopGate<T extends Element>(ref: React.RefObject<T | null>) {
  const inView = useInView(ref, { margin: "-5% 0px" });
  const reduced = useReducedMotion();
  return { inView, reduced, running: inView && !reduced };
}

/** Eases a displayed number toward `value`. Instant under reduced motion. */
export function useTween(value: number, ms = 700) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduced) {
      const id = requestAnimationFrame(() => setShown(value));
      return () => cancelAnimationFrame(id);
    }
    const start = from.current;
    if (start === value) return;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - k, 3);
      const v = Math.round(start + (value - start) * eased);
      from.current = v;
      setShown(v);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, ms, reduced]);
  return shown;
}

/** Lakh-style rupee shorthand: ₹5.7L. For headline numbers only. */
export function rupeeShort(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 2)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

/** A thin progress bar. `value` 0–1. */
export function Bar({ value, tone = "primary", className }: { value: number; tone?: "primary" | "green" | "gold" | "navy"; className?: string }) {
  return (
    <span className={clsx("relative block h-1.5 overflow-hidden rounded-full bg-sunken", className)}>
      <span
        className={clsx(
          "absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out",
          tone === "primary" && "bg-primary",
          tone === "green" && "bg-green",
          tone === "gold" && "bg-gold",
          tone === "navy" && "bg-navy",
        )}
        style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
      />
    </span>
  );
}
