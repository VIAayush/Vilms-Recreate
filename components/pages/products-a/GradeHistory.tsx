"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { FileText } from "lucide-react";
import { useInView } from "@/components/marketing/motion";
import { Avatar, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { GRADES, KIND_LABEL, type TestKind } from "./exams-data";
import { MockCaption, Segmented, panelDomId, tabDomId, useTween } from "./shared";

// A student profile with every result on it. Filter by kind, hover or tap a
// bar to pick a test; the numbers recompute from what is showing.

type Filter = "all" | TestKind;
const ID = "grades";
const pct = (s: number, m: number) => Math.round((s / m) * 100);

function Stat({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  const v = useTween(value, 700);
  return (
    <div className="min-w-0 text-center">
      <p className="font-display text-[26px] font-semibold tabular-nums leading-none tracking-tight sm:text-[30px]">
        {v}
        <span className="text-[15px] font-normal text-fg-muted">{suffix}</span>
      </p>
      <p className="mt-1 text-[11px] text-fg-muted">{label}</p>
    </div>
  );
}

export function GradeHistory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [filter, setFilter] = useState<Filter>("all");
  const [picked, setPicked] = useState<string | null>("g6");

  const rows = GRADES.filter((g) => filter === "all" || g.kind === filter);
  const pcts = rows.map((g) => pct(g.score, g.max));
  const avg = Math.round(pcts.reduce((a, b) => a + b, 0) / Math.max(1, pcts.length));
  const best = Math.max(0, ...pcts);
  const n = rows.length;
  const points = rows.map((g, i) => `${((i + 0.5) / n) * 100},${100 - pct(g.score, g.max)}`).join(" ");

  return (
    <div ref={ref}>
      <div className="window">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-edge px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar name="Rahul Kumar" size="lg" tone={0} />
            <div className="min-w-0">
              <p className="truncate text-[16px] font-semibold tracking-tight">Rahul Kumar</p>
              <p className="truncate text-[12.5px] text-fg-muted">Prelims Foundation · Batch A · Grade history</p>
            </div>
          </div>
          <div className="ml-auto grid grid-cols-3 gap-5 sm:gap-8">
            <Stat label="Tests" value={n} />
            <Stat label="Average" value={avg} suffix="%" />
            <Stat label="Best" value={best} suffix="%" />
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="min-w-0 p-4 sm:p-6">
            <Segmented
              label="Filter results"
              idPrefix={ID}
              value={filter}
              onChange={(f) => {
                setFilter(f);
                setPicked(null);
              }}
              options={[
                { id: "all", label: "All" },
                { id: "mcq", label: "MCQ" },
                { id: "long", label: "Long-form" },
                { id: "mock", label: "Mock" },
              ]}
            />
            <div id={panelDomId(ID)} role="tabpanel" aria-labelledby={tabDomId(ID, filter)} className="relative mt-6 h-[240px]">
              {/* plot area: 28px reserved at the bottom for labels, 36px gutter on the left for the axis */}
              {[100, 75, 50, 25].map((v) => (
                <div key={v} aria-hidden className="absolute inset-x-0 flex items-center gap-2" style={{ top: `calc((100% - 28px) * ${(100 - v) / 100})` }}>
                  <span className="w-7 shrink-0 -translate-y-1/2 text-right font-mono text-[10px] text-fg-faint">{v}</span>
                  <span className="h-px flex-1 bg-edge" />
                </div>
              ))}
              <div className="absolute inset-y-0 left-9 right-0">
                <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 z-10 w-full overflow-visible" style={{ height: "calc(100% - 28px)" }}>
                  <motion.polyline
                    key={`${filter}-${inView}`}
                    points={points}
                    fill="none"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ stroke: "rgb(var(--navy))" }}
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    animate={inView ? { pathLength: 1, opacity: 0.8 } : {}}
                    transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
                  />
                </svg>
                <div className="absolute inset-0 flex gap-1.5 sm:gap-2.5">
                  {rows.map((g, i) => {
                    const p = pct(g.score, g.max);
                    const on = picked === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setPicked(g.id)}
                        onPointerEnter={(e) => e.pointerType === "mouse" && setPicked(g.id)}
                        aria-pressed={on}
                        aria-label={`${g.name}, ${KIND_LABEL[g.kind]}, ${g.score} out of ${g.max}, ${p} percent`}
                        className="group relative flex-1"
                      >
                        <span className="absolute inset-x-0 bottom-7 top-0">
                          <motion.span
                            className={clsx("absolute inset-x-0 bottom-0 rounded-t-lg transition-colors duration-200", on ? "bg-primary" : "bg-primary/30 group-hover:bg-primary/55")}
                            initial={{ height: 0 }}
                            animate={inView ? { height: `${p}%` } : { height: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: EASE }}
                          />
                          <span className={clsx("absolute inset-x-0 text-center font-mono text-[11px] tabular-nums transition-colors", on ? "text-primary" : "text-fg-muted")} style={{ bottom: `calc(${p}% + 6px)` }}>
                            {p}%
                          </span>
                        </span>
                        <span className={clsx("absolute inset-x-0 bottom-0 text-center font-mono text-[10px] transition-colors", on ? "text-fg" : "text-fg-faint")}>{g.when}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0 border-t border-edge p-4 sm:p-6 lg:border-l lg:border-t-0">
            <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Results</p>
            <ul className="divide-y divide-edge">
              <AnimatePresence initial={false}>
                {rows.map((g) => {
                  const on = picked === g.id;
                  return (
                    <motion.li key={g.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      <button
                        type="button"
                        onClick={() => setPicked(g.id)}
                        aria-pressed={on}
                        className={clsx("flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors", on ? "bg-primary-tint" : "hover:bg-sunken")}
                      >
                        <span className="min-w-0 flex-1">
                          <span className={clsx("block truncate text-[13.5px] font-medium", on && "text-primary")}>{g.name}</span>
                          <span className="flex items-center gap-1.5 text-[11.5px] text-fg-muted">
                            {KIND_LABEL[g.kind]}
                            {g.kind === "long" ? (
                              <span className="inline-flex items-center gap-0.5 text-primary">
                                <FileText aria-hidden className="h-3 w-3" /> Evaluated copy
                              </span>
                            ) : null}
                          </span>
                        </span>
                        <span className="font-mono text-[13.5px] font-medium tabular-nums">
                          {g.score}/{g.max}
                        </span>
                        <Pill tone={pct(g.score, g.max) >= 75 ? "green" : "muted"} className="w-[44px] justify-center">
                          {pct(g.score, g.max)}%
                        </Pill>
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
      <MockCaption className="mt-4">Illustrative interface · sample data · filter and pick a test</MockCaption>
    </div>
  );
}
