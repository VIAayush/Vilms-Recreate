"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import clsx from "clsx";
import { useReducedMotion } from "@/components/marketing/motion";

// Small pieces shared by the three product pages (platform, courses, exams).

/** The standard surface used inside product mock-ups. */
export const box = "rounded-xl border border-edge bg-panel";

export type SegmentedOption<T extends string> = { id: T; label: React.ReactNode; icon?: React.ReactNode };

/** DOM id helpers so a tab and its panel can reference each other. */
export const tabDomId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelDomId = (prefix: string) => `${prefix}-panel`;

/**
 * A tab strip (WAI-ARIA tabs pattern: roving tabindex, arrow keys, Home/End).
 * Pass the same `idPrefix` to the panel (`id={panelDomId(prefix)}`,
 * `aria-labelledby={tabDomId(prefix, value)}`).
 */
export function Segmented<T extends string>({
  label,
  idPrefix,
  value,
  onChange,
  options,
  className,
  tone = "pill",
}: {
  label: string;
  idPrefix: string;
  value: T;
  onChange: (id: T) => void;
  options: SegmentedOption<T>[];
  className?: string;
  tone?: "pill" | "underline";
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % options.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + options.length) % options.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = options.length - 1;
    else return;
    e.preventDefault();
    onChange(options[n].id);
    refs.current[n]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={clsx(tone === "pill" ? "inline-flex max-w-full rounded-full bg-sunken p-1" : "flex max-w-full gap-1 border-b border-edge", className)}
    >
      {options.map((o, i) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={tabDomId(idPrefix, o.id)}
            type="button"
            role="tab"
            aria-selected={on}
            aria-controls={panelDomId(idPrefix)}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(o.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={clsx(
              "inline-flex min-h-[36px] items-center justify-center gap-1.5 whitespace-nowrap text-[13.5px] font-medium transition-colors duration-200",
              tone === "pill"
                ? clsx("rounded-full px-3.5", on ? "bg-panel text-fg shadow-sm" : "text-fg-muted hover:text-fg")
                : clsx("-mb-px border-b-2 px-3", on ? "border-navy text-fg" : "border-transparent text-fg-muted hover:text-fg"),
            )}
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** A tiny kicker-like caption used under big mock-ups. */
export function MockCaption({ className, children = "Illustrative interface · sample data" }: { className?: string; children?: React.ReactNode }) {
  return <p className={clsx("font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint", className)}>{children}</p>;
}

/** Eases a displayed number toward `target` (instant under reduced motion). */
export function useTween(target: number, duration = 700) {
  const reduced = useReducedMotion();
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    let raf = 0;
    if (reduced) {
      raf = requestAnimationFrame(() => {
        from.current = target;
        setV(target);
      });
      return () => cancelAnimationFrame(raf);
    }
    const start = from.current;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      const val = Math.round(start + (target - start) * (1 - Math.pow(1 - k, 3)));
      from.current = val;
      setV(val);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);
  return v;
}
