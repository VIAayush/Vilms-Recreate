"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useInView, useReducedMotion } from "@/components/marketing/motion";
import { BrowserFrame, InstituteMark, LiveDot } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { BarChart3, Check } from "lucide-react";
import { MODULES, MODULE_BY_ID, type ModuleId } from "./lms-data";
import { MockCaption, useTween } from "./shared";

// The hero: an institute dashboard where events from every module arrive in
// one feed and move the numbers. All sample data, labelled as such.

type Ev = { m: ModuleId; text: string; sub: string; learner?: boolean; cert?: boolean };

const EVENTS: Ev[] = [
  { m: "learners", text: "New learner added · Priya S.", sub: "Batch A · access to Prelims Foundation", learner: true },
  { m: "assessments", text: "Mock test 4 submitted", sub: "Rahul K. · result ready" },
  { m: "progress", text: "Course 62% complete", sub: "Sana P. · Prelims Foundation" },
  { m: "courses", text: "New lesson published", sub: "Polity essentials · video and notes" },
  { m: "reports", text: "Report ready", sub: "Batch A · test results" },
  { m: "learners", text: "New learner added · Neha K.", sub: "Batch B · access to Prelims Foundation", learner: true },
  { m: "certificates", text: "Certificate issued", sub: "Rahul K. · course completed", cert: true },
  { m: "assessments", text: "Weekly quiz marked", sub: "Batch B · 36 submissions" },
  { m: "progress", text: "Batch A completion updated", sub: "Learner activity and performance" },
  { m: "certificates", text: "Certificate issued", sub: "Isha M. · course completed", cert: true },
];

const START = 3; // events shown before the ticker starts
const BASE = { learners: 164, courses: 12, certs: 38 };

function Kpi({ label, value, text }: { label: string; value: number; text: (n: number) => string }) {
  const v = useTween(value, 800);
  return (
    <div className="min-w-0 rounded-xl border border-edge bg-panel px-2.5 py-2.5 sm:px-3">
      <p className="truncate text-[10.5px] text-fg-muted">{label}</p>
      <p className="mt-0.5 truncate font-display text-[16px] font-semibold tabular-nums leading-tight tracking-tight sm:text-[19px]">{text(v)}</p>
    </div>
  );
}

export function LmsHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px" });
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(START);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1900);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  let learners = BASE.learners;
  let certs = BASE.certs;
  for (let t = 0; t <= tick; t++) {
    const e = EVENTS[t % EVENTS.length];
    if (e.learner) learners += 1;
    if (e.cert) certs += 1;
  }

  const current = EVENTS[tick % EVENTS.length];
  const feed = [0, 1, 2, 3].map((k) => ({ t: tick - k, e: EVENTS[(tick - k) % EVENTS.length] })).filter((r) => r.t >= 0);
  const toast = current.cert ? "cert" : current.m === "reports" ? "report" : null;

  return (
    <div ref={ref} className="relative">
      <div role="img" aria-label="Illustrative VILMS dashboard: new learners, test submissions, course progress, reports and certificates in one live feed.">
        <BrowserFrame url="yourinstitute.vilms.in/admin" className="shadow-window">
          <div className="flex">
            {/* module rail */}
            <nav aria-hidden className="flex w-[50px] shrink-0 flex-col items-center gap-1 border-r border-edge bg-canvas-alt py-3 sm:w-[56px]">
              <InstituteMark className="mb-2 h-7 w-7 text-[10px]" />
              {MODULES.map((m) => {
                const on = m.id === current.m;
                return (
                  <span
                    key={m.id}
                    className={clsx(
                      "relative grid h-8 w-8 place-items-center rounded-lg transition-colors duration-300 sm:h-9 sm:w-9",
                      on ? "bg-primary text-primary-ink" : "text-fg-faint",
                    )}
                  >
                    <m.Icon className="h-4 w-4" />
                  </span>
                );
              })}
            </nav>

            <div className="min-w-0 flex-1 p-3.5 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10.5px] text-fg-muted">Dashboard</p>
                  <p className="truncate text-[15px] font-semibold tracking-tight">Today at Your Institute</p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-red">
                  <LiveDot /> Live
                </span>
              </div>

              <div className="mt-3.5 grid grid-cols-3 gap-2">
                <Kpi label="Learners" value={learners} text={(n) => n.toLocaleString("en-IN")} />
                <Kpi label="Courses" value={BASE.courses} text={(n) => String(n)} />
                <Kpi label="Certificates" value={certs} text={(n) => String(n)} />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
                <div className="min-w-0">
                  <p className="mb-2 text-[10.5px] uppercase tracking-[0.12em] text-fg-faint">Live activity</p>
                  <ul className="relative h-[232px] overflow-hidden">
                    <AnimatePresence initial={false} mode="popLayout">
                      {feed.map(({ t, e }, idx) => {
                        const M = MODULE_BY_ID[e.m];
                        return (
                          <motion.li
                            key={t}
                            layout
                            initial={{ opacity: 0, y: -18, scale: 0.97 }}
                            animate={{ opacity: 1 - idx * 0.16, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="mb-1.5 flex items-center gap-2.5 rounded-lg border border-edge bg-panel px-2.5 py-2"
                          >
                            <span className={clsx("grid h-7 w-7 shrink-0 place-items-center rounded-md", idx === 0 ? "bg-primary text-primary-ink" : "bg-primary-tint text-primary")}>
                              <M.Icon className="h-3.5 w-3.5" />
                            </span>
                            <p className="min-w-0 text-[12px] leading-tight">
                              <span className="block truncate font-medium">{e.text}</span>
                              <span className="block truncate text-[10.5px] text-fg-muted">{e.sub}</span>
                            </p>
                            <span className="ml-auto shrink-0 font-mono text-[9.5px] text-fg-faint">{idx === 0 ? "now" : `${idx * 2}s`}</span>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                </div>

                <div className="hidden min-w-0 sm:block">
                  <p className="mb-2 text-[10.5px] uppercase tracking-[0.12em] text-fg-faint">Batch progress</p>
                  <ul className="space-y-2.5">
                    {[
                      ["Batch A", 78],
                      ["Batch B", 54],
                      ["Batch C", 31],
                    ].map(([l, n], i) => (
                      <li key={l} className="text-[11px]">
                        <div className="mb-1 flex justify-between">
                          <span className="text-fg-muted">{l}</span>
                          <span className="font-mono tabular-nums">{n}%</span>
                        </div>
                        <span className="relative block h-1.5 overflow-hidden rounded-full bg-sunken">
                          <motion.span
                            className={clsx("absolute inset-y-0 left-0 rounded-full", Number(n) >= 75 ? "bg-green" : "bg-primary")}
                            initial={{ width: 0 }}
                            animate={{ width: `${n}%` }}
                            transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: EASE }}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>

      {/* brochure moments, floating off the window */}
      <AnimatePresence>
        {toast === "cert" ? (
          <motion.div
            key="cert"
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            aria-hidden
            className="absolute -top-5 right-3 z-10 flex items-center gap-2.5 rounded-xl border border-edge bg-panel px-3 py-2.5 shadow-window sm:-right-4"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-green-tint text-green">
              <Check className="h-4 w-4" />
            </span>
            <p className="text-[12px] leading-tight">
              <b className="block font-semibold">{current.text}</b>
              <span className="text-fg-muted">{current.sub}</span>
            </p>
          </motion.div>
        ) : null}
        {toast === "report" ? (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: EASE }}
            aria-hidden
            className="absolute -bottom-5 left-3 z-10 flex items-center gap-2.5 rounded-xl border border-edge bg-panel px-3 py-2.5 shadow-window sm:-left-4"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-tint text-primary">
              <BarChart3 className="h-4 w-4" />
            </span>
            <p className="text-[12px] leading-tight">
              <b className="block font-semibold">Report ready</b>
              <span className="text-fg-muted">Batch A · test results</span>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <MockCaption className="mt-4">Illustrative interface · sample data</MockCaption>
    </div>
  );
}
