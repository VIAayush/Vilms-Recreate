"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Database, Link2Off } from "lucide-react";
import { useInView, useReducedMotion } from "@/components/marketing/motion";
import { CRITERIA, MODULES, TOOLS } from "./lms-data";
import { MockCaption, Segmented, panelDomId } from "./shared";

// The problem, shown: seven tools scattered across the page, each holding a
// slice of the institute. Switch to "One database" (or wait — it plays when
// scrolled into view) and they collapse into a single record.

type Mode = "patchwork" | "one";
const ID = "tools";
const r1 = (n: number) => Math.round(n * 10) / 10;

// Where the eight modules settle once the tools have merged: a ring on wide
// screens, two columns either side of the hub on phones.
const SETTLE = MODULES.map((m, i) => {
  const a = ((-90 + i * (360 / MODULES.length)) * Math.PI) / 180;
  return {
    id: m.id,
    x: r1(50 + 38 * Math.cos(a)),
    y: r1(50 + 36 * Math.sin(a)),
    xm: i < 3 ? 19 : 81,
    ym: [16, 50, 84][i % 3],
  };
});

export function ToolsToOne() {
  const arena = useRef<HTMLDivElement>(null);
  const inView = useInView(arena, { margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("patchwork");
  const touched = useRef(false);

  // First time it scrolls into view: pause on the mess, then resolve it.
  useEffect(() => {
    if (!inView || touched.current) return;
    const id = window.setTimeout(() => !touched.current && setMode("one"), 1400);
    return () => window.clearTimeout(id);
  }, [inView]);

  const merged = mode === "one";

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Look for</p>
        <ol className="divide-y divide-edge border-y border-edge">
          {CRITERIA.map((g) => (
            <li key={g.n} className="flex gap-4 py-3.5">
              <span className="pt-0.5 font-mono text-[12px] tabular-nums text-fg-faint">{g.n}</span>
              <p className="text-[17px] leading-snug text-fg sm:text-[19px]">{g.t}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="min-w-0">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Segmented
            label="Before and after"
            idPrefix={ID}
            value={mode}
            onChange={(m) => {
              touched.current = true;
              setMode(m);
            }}
            options={[
              { id: "patchwork", label: "Patchwork" },
              { id: "one", label: "One platform" },
            ]}
          />
        </div>

        <div
          ref={arena}
          id={panelDomId(ID)}
          role="tabpanel"
          aria-label={merged ? "The same tools merged into one platform" : "Seven separate tools"}
          className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-edge bg-canvas-alt sm:aspect-[16/10] lg:aspect-[16/11]"
        >
          <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-70" />

          {/* the centre: nothing shared, then everything shared */}
          <div className="absolute left-1/2 top-1/2 z-10 grid h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 place-items-center sm:h-[160px] sm:w-[160px]">
            <span
              className={clsx(
                "absolute inset-0 rounded-full border-2 border-dashed border-edge-strong transition duration-700",
                merged ? "scale-75 opacity-0" : "scale-100 opacity-100",
              )}
            />
            <span
              className={clsx(
                "absolute inset-0 rounded-full border border-primary/50 bg-panel shadow-window transition duration-700",
                merged ? "scale-100 opacity-100" : "scale-50 opacity-0",
              )}
            />
            <span className={clsx("relative flex flex-col items-center text-center transition-opacity duration-500", merged ? "opacity-0" : "opacity-100")}>
              <Link2Off aria-hidden className="h-5 w-5 text-red" />
              <span className="mt-1.5 max-w-[90px] text-[11.5px] leading-tight text-fg-muted sm:max-w-[100px] sm:text-[13px]">No shared record</span>
            </span>
            <span className={clsx("absolute flex flex-col items-center text-center transition-opacity delay-300 duration-500", merged ? "opacity-100" : "opacity-0")}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-primary-ink sm:h-12 sm:w-12">
                <Database aria-hidden className="h-5 w-5" />
              </span>
              <span className="mt-1.5 text-[14px] font-semibold leading-tight sm:text-[15px]">VILMS</span>
              <span className="text-[11px] text-fg-muted sm:text-[12px]">one platform</span>
            </span>
          </div>

          {/* the settled state: modules reading and writing one record */}
          {[true, false].map((phone) => (
            <svg
              key={phone ? "m" : "d"}
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className={clsx("pointer-events-none absolute inset-0 h-full w-full", phone ? "sm:hidden" : "hidden sm:block")}
            >
              {SETTLE.map((m, i) => (
                <line
                  key={m.id}
                  x1="50"
                  y1="50"
                  x2={phone ? m.xm : m.x}
                  y2={phone ? m.ym : m.y}
                  vectorEffect="non-scaling-stroke"
                  strokeWidth="1.5"
                  style={{
                    stroke: "rgb(var(--primary) / 0.45)",
                    opacity: merged ? 1 : 0,
                    transition: `opacity 700ms ease ${merged ? 650 + i * 60 : 0}ms`,
                  }}
                />
              ))}
            </svg>
          ))}
          {MODULES.map((m, i) => (
            <div
              key={m.id}
              style={
                {
                  "--x": `${SETTLE[i].x}%`,
                  "--y": `${SETTLE[i].y}%`,
                  "--xm": `${SETTLE[i].xm}%`,
                  "--ym": `${SETTLE[i].ym}%`,
                  transitionDelay: merged ? `${600 + i * 60}ms` : "0ms",
                } as React.CSSProperties
              }
              className={clsx(
                "absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-[left,top,opacity,transform] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                merged ? "left-[var(--xm)] top-[var(--ym)] opacity-100 sm:left-[var(--x)] sm:top-[var(--y)]" : "left-1/2 top-1/2 scale-50 opacity-0",
              )}
            >
              <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-primary/30 bg-panel px-2.5 py-1.5 text-[11px] font-medium shadow-soft sm:gap-2 sm:px-3 sm:py-2 sm:text-[13px]">
                <m.Icon aria-hidden className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                {m.label}
              </span>
            </div>
          ))}

          {TOOLS.map((t, i) => (
            <div
              key={t.id}
              style={
                {
                  "--x": `${t.x}%`,
                  "--y": `${t.y}%`,
                  "--xm": `${t.xm}%`,
                  "--ym": `${t.ym}%`,
                  transitionDelay: `${merged ? i * 70 : (TOOLS.length - i) * 40}ms`,
                } as React.CSSProperties
              }
              className={clsx(
                "absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-[left,top,opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                merged ? "left-1/2 top-1/2 scale-[0.35] opacity-0" : "left-[var(--xm)] top-[var(--ym)] opacity-100 sm:left-[var(--x)] sm:top-[var(--y)]",
              )}
            >
              <motion.div
                animate={!merged && inView && !reduced ? { y: [0, -5, 0], rotate: [t.rot, t.rot + 1.2, t.rot] } : { y: 0, rotate: merged ? 0 : t.rot }}
                transition={{ duration: 4 + (i % 3), repeat: !merged && inView && !reduced ? Infinity : 0, ease: "easeInOut", delay: i * 0.3 }}
                className="rounded-xl border border-edge bg-panel px-3 py-2 shadow-soft"
              >
                <p className="whitespace-nowrap text-[12.5px] font-semibold leading-tight sm:text-[13.5px]">{t.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10.5px] text-fg-muted">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red" />
                  {t.holds}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p aria-live="polite" className="text-[14.5px] text-fg-muted">
            {merged ? "Courses, learners, assessments, progress, reports and certificates in one place." : "Seven places to look, and none of them share a record."}
          </p>
          <MockCaption>Illustrative</MockCaption>
        </div>
      </div>
    </div>
  );
}
