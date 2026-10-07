"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Check, X } from "lucide-react";
import { useInView, useReducedMotion } from "@/components/marketing/motion";
import type { BeforeAfter } from "./types";

/**
 * "Managing it manually" against "one platform", as a card. Separate tools
 * tilt about in a dashed box; scroll it into view, hover it or press
 * "With VILMS" and they settle into one solid frame.
 */
export function BeforeAfterCard({ tools, before, after }: BeforeAfter) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const reduced = useReducedMotion();
  const [resolved, setResolved] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    if (!inView || reduced || touched.current) return;
    const id = window.setTimeout(() => {
      if (!touched.current) setResolved(true);
    }, 1300);
    return () => window.clearTimeout(id);
  }, [inView, reduced]);

  const set = (v: boolean) => {
    touched.current = true;
    setResolved(v);
  };

  return (
    <div ref={ref} onMouseEnter={() => !resolved && set(true)} className="rounded-[26px] border border-edge bg-canvas-alt p-3 sm:p-4">
      <div className="flex items-center justify-between gap-3 pb-3">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">{resolved ? "With VILMS" : "Managed manually"}</p>
        <div role="group" aria-label="Show before or with VILMS" className="flex rounded-full border border-edge bg-panel p-0.5 text-[12px] font-medium">
          {(
            [
              ["Before", false],
              ["With VILMS", true],
            ] as const
          ).map(([label, v]) => (
            <button
              key={label}
              type="button"
              aria-pressed={resolved === v}
              onClick={() => set(v)}
              className={clsx("rounded-full px-3 py-1 transition-colors", resolved === v ? "bg-navy text-white" : "text-fg-muted hover:text-fg")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-edge bg-panel p-3.5 sm:p-4">
        <div className={clsx("rounded-2xl border-2 p-3.5 transition-colors duration-500", resolved ? "border-solid border-primary/60 bg-primary-tint" : "border-dashed border-edge-strong")}>
          <p className={clsx("mb-3 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors duration-500", resolved ? "text-primary" : "text-fg-faint")}>
            {resolved ? "VILMS · one platform" : "Separate tools"}
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {tools.map((t, i) => (
              <li
                key={t}
                className={clsx(
                  "flex items-center gap-1.5 rounded-lg border bg-panel px-2.5 py-1.5 text-[12.5px] font-medium transition-transform duration-500 ease-out",
                  resolved ? "border-primary/40" : "border-edge",
                  !resolved && ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"][i % 4],
                )}
              >
                {t}
                <span aria-hidden className={clsx("grid h-3.5 w-3.5 place-items-center rounded-full", resolved ? "bg-green text-white" : "bg-red-tint text-red")}>
                  {resolved ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p key={resolved ? "a" : "b"} className="mt-3 min-h-[40px] animate-pop-in text-[13.5px] leading-snug text-fg-muted">
          {resolved ? after : before}
        </p>
      </div>
    </div>
  );
}
