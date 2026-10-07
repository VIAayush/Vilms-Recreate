"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Check, ClipboardCheck, RotateCcw } from "lucide-react";
import { Avatar, Illustrative, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { useInView } from "@/components/marketing/motion";
import { useLoopGate, useTicker } from "../kit";

// Test-prep hero: a test-series dashboard. The score trend draws itself, the
// student scores update when a mock's results are published, and the review
// queue is live: mark the submissions reviewed and Mock 8 moves from
// "pending" to a result. Sample data throughout.

const YOU = [96, 104, 99, 112, 118, 121, 130];
const AVG = [88, 90, 93, 95, 97, 100, 103];
const YOU8 = 138;
const AVG8 = 106;
const MAX = 200;

// chart geometry
const W = 440;
const H = 214;
const PAD = { l: 34, r: 16, t: 16, b: 28 };
const X = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / 7;
const Y = (v: number) => PAD.t + (1 - (v - 60) / 100) * (H - PAD.t - PAD.b);
const line = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");

const QUEUE = [
  { who: "Sneha P.", q: "Section B · Short answers" },
  { who: "Rahul K.", q: "Section C · Long answer" },
  { who: "Aman V.", q: "Section C · Long answer" },
];

const SCORES_7: Record<string, number> = { "Aman V.": 127, "Divya R.": 134, "Karan S.": 138, "Rahul K.": 130, "Sneha P.": 142 };
const SCORES_8: Record<string, number> = { "Aman V.": 129, "Divya R.": 133, "Karan S.": 137, "Rahul K.": 138, "Sneha P.": 146 };
const STUDENTS = Object.keys(SCORES_7);

export function TestPrepHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { running } = useLoopGate(ref);
  const seen = useInView(ref, { once: true, margin: "-10% 0px" });
  const [approved, setApproved] = useState(0);
  const [hold, setHold] = useState(0);
  const [touched, setTouched] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  const published = approved >= QUEUE.length;
  const pts = published ? YOU.length + 1 : YOU.length;
  const shown = hover ?? pts - 1;
  const youAt = (i: number) => (i < YOU.length ? YOU[i] : YOU8);
  const avgAt = (i: number) => (i < AVG.length ? AVG[i] : AVG8);
  const scores = published ? SCORES_8 : SCORES_7;

  useTicker(
    () => {
      if (approved < QUEUE.length) setApproved((a) => a + 1);
      else if (hold < 2) setHold((h) => h + 1);
      else {
        setHold(0);
        setApproved(0);
      }
    },
    1900,
    running && !touched,
  );

  const approve = (i: number) => {
    setTouched(true);
    setApproved((a) => Math.max(a, i + 1));
  };
  const replay = () => {
    setTouched(false);
    setHold(0);
    setApproved(0);
  };

  const tipX = Math.min(Math.max(X(shown), 70), W - 70);

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-[28px] border border-edge bg-panel shadow-window">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-edge px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold leading-tight">Prelims Test Series</p>
            <p className="text-[11px] text-fg-muted">Mock test 8 · online</p>
          </div>
          <span className="ml-auto">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={String(published)} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                {published ? <Pill tone="green">Results ready</Pill> : <Pill tone="yellow">{QUEUE.length - approved} to review</Pill>}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <div className="grid gap-3 p-3 sm:grid-cols-[1.28fr_0.72fr] sm:p-4">
          {/* ---------- score trend ---------- */}
          <div className="min-w-0 rounded-2xl border border-edge p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[12px] font-semibold">Score trend</p>
              <p className="flex items-center gap-3 text-[10.5px] text-fg-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 rounded-full bg-primary" /> Rahul K.
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 rounded-full border-t border-dashed border-fg-faint" /> Batch average
                </span>
              </p>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-auto w-full" role="img" aria-label="Rahul K.'s score for each mock test, out of 200, against the batch average">
              <defs>
                <linearGradient id="tp-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" style={{ stopColor: "rgb(var(--primary))", stopOpacity: 0.22 }} />
                  <stop offset="100%" style={{ stopColor: "rgb(var(--primary))", stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              {[80, 100, 120, 140, 160].map((g) => (
                <g key={g}>
                  <line x1={PAD.l} x2={W - PAD.r} y1={Y(g)} y2={Y(g)} className="stroke-edge" strokeWidth="1" />
                  <text x={PAD.l - 8} y={Y(g) + 3.5} textAnchor="end" className="fill-fg-faint font-mono" fontSize="10">
                    {g}
                  </text>
                </g>
              ))}
              {Array.from({ length: 8 }, (_, i) => (
                <text key={i} x={X(i)} y={H - 8} textAnchor="middle" className={clsx("font-mono", i === shown ? "fill-fg" : "fill-fg-faint")} fontSize="10">
                  M{i + 1}
                </text>
              ))}

              {/* batch average */}
              <path d={line(published ? [...AVG, AVG8] : AVG)} fill="none" className="stroke-fg-faint" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />

              {/* area + line for the published mocks */}
              <motion.path
                d={`${line(YOU)} L${X(6)} ${H - PAD.b} L${X(0)} ${H - PAD.b} Z`}
                fill="url(#tp-fill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: seen ? 1 : 0 }}
                transition={{ duration: 0.9, delay: 0.9 }}
              />
              <motion.path
                d={line(YOU)}
                fill="none"
                className="stroke-primary"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: seen ? 1 : 0 }}
                transition={{ duration: 1.4, ease: EASE }}
              />
              {/* Mock 8: dashed while pending, drawn once published */}
              <path d={`M${X(6)} ${Y(YOU[6])} L${X(7)} ${Y(YOU8)}`} fill="none" className="stroke-primary" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" opacity={published ? 0 : 0.5} />
              <motion.path
                d={`M${X(6)} ${Y(YOU[6])} L${X(7)} ${Y(YOU8)}`}
                fill="none"
                className="stroke-primary"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: published ? 1 : 0, opacity: published ? 1 : 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              />

              {/* points */}
              {Array.from({ length: 8 }, (_, i) => {
                const isPending = i === 7 && !published;
                const on = i === shown;
                return (
                  <g
                    key={i}
                    tabIndex={isPending ? -1 : 0}
                    role="img"
                    aria-label={isPending ? "Mock 8, pending evaluation" : `Mock ${i + 1}: ${youAt(i)} out of 200`}
                    onMouseEnter={() => !isPending && setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => !isPending && setHover(i)}
                    onBlur={() => setHover(null)}
                    className="cursor-pointer outline-none [&:focus-visible>circle:last-child]:stroke-[3px]"
                  >
                    <circle cx={X(i)} cy={Y(youAt(i))} r="16" fill="transparent" />
                    <circle
                      cx={X(i)}
                      cy={Y(youAt(i))}
                      r={on ? 5.5 : 4}
                      className={clsx("transition-all duration-300", isPending ? "fill-panel stroke-primary" : "fill-primary stroke-panel")}
                      strokeWidth={isPending ? 2 : 2}
                      strokeDasharray={isPending ? "2 2" : undefined}
                      opacity={i === 7 && !published ? 1 : 1}
                    />
                  </g>
                );
              })}

              {/* tooltip */}
              <g style={{ transform: `translate(${tipX}px, ${Math.max(Y(youAt(shown)) - 40, 2)}px)`, transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)" }} pointerEvents="none">
                <rect x="-62" y="0" width="124" height="30" rx="8" className="fill-navy" />
                <text x="0" y="13" textAnchor="middle" className="fill-panel font-mono" fontSize="9.5" opacity="0.8">
                  Mock {shown + 1}
                </text>
                <text x="0" y="25" textAnchor="middle" className="fill-panel" fontSize="12" fontWeight="600">
                  {youAt(shown)}/{MAX} · avg {avgAt(shown)}
                </text>
              </g>
              {!published ? (
                <text x={X(7) - 6} y={Y(YOU8) + 26} textAnchor="end" className="fill-fg-muted" fontSize="10">
                  Mock 8 pending
                </text>
              ) : null}
            </svg>
          </div>

          {/* ---------- student scores ---------- */}
          <div className="min-w-0 rounded-2xl border border-edge p-3">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold">Student scores</p>
              <span key={String(published)} className="animate-pop-in font-mono text-[10.5px] text-fg-muted">
                Mock {published ? 8 : 7}
              </span>
            </div>
            <ul className="mt-2.5 space-y-1">
              {STUDENTS.map((n) => {
                const diff = scores[n] - SCORES_7[n];
                const you = n === "Rahul K.";
                return (
                  <li key={n} className={clsx("flex items-center gap-2 rounded-xl px-2 py-1.5 text-[12px]", you ? "bg-primary-tint ring-1 ring-primary/40" : "bg-canvas-alt")}>
                    <Avatar name={n} size="sm" />
                    <span className={clsx("min-w-0 flex-1 truncate", you && "font-semibold")}>{n}</span>
                    <span className="font-mono tabular-nums">{scores[n]}</span>
                    <span className="grid w-4 place-items-center">
                      {published && diff > 0 ? <ArrowUp aria-label="up" className="h-3 w-3 text-green" /> : published && diff < 0 ? <ArrowDown aria-label="down" className="h-3 w-3 text-red" /> : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---------- approval queue ---------- */}
          <div className="min-w-0 rounded-2xl border border-edge p-3 sm:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold">
                <ClipboardCheck aria-hidden className="h-3.5 w-3.5 text-primary" /> Assessments to review
              </p>
              {touched && published ? (
                <button type="button" onClick={replay} className="flex items-center gap-1 text-[11px] font-medium text-primary hover:underline">
                  <RotateCcw aria-hidden className="h-3 w-3" /> Replay
                </button>
              ) : (
                <span className="font-mono text-[10.5px] text-fg-faint">Mock test 8 submissions</span>
              )}
            </div>
            <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-3">
              {QUEUE.map((c, i) => {
                const done = i < approved;
                return (
                  <li key={c.who} className={clsx("flex items-center gap-2.5 rounded-xl border px-2.5 py-2 transition-colors duration-500", done ? "border-green/40 bg-green-tint" : "border-edge")}>
                    <Avatar name={c.who} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-semibold leading-tight">{c.who}</p>
                      <p className="truncate text-[10.5px] text-fg-muted">{c.q}</p>
                    </div>
                    {done ? (
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green text-white" aria-label="Reviewed">
                        <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => approve(i)}
                        className="shrink-0 rounded-full bg-navy px-3 py-1.5 text-[11.5px] font-semibold text-white transition hover:bg-primary active:translate-y-px"
                      >
                        Review
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Illustrative className="mt-3 text-center lg:text-left" />
    </div>
  );
}
