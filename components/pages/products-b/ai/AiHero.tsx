"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { animate } from "motion/react";
import { Check, Loader2, RotateCcw } from "lucide-react";
import { Avatar } from "@/components/marketing/screens/primitives";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { FINAL_TOTAL, MAX_TOTAL, RUBRIC } from "./data";
import { AnswerSheet } from "./paper";
import { Mentor, ReviewButtons, ScoreRing, StatusBadge } from "./ui";

// The hero: a handwritten answer being read, marked against the rubric, then a
// mentor editing one mark and approving. It loops on its own while visible,
// pauses under the pointer, and every control on it works.
const LOG = ["Handwriting read", "Rubric matched", "Draft ready", "Mentor edited a mark", "Approved and sent"];
const PHASES = 6; // 0 read, 1 rubric, 2 draft, 3 mentor edit, 4 approved, 5 hold

export function AiHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-5% 0px" });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [auto, select] = useAutoplay(PHASES, { interval: 2100, running: inView && !reduced && !paused });
  const phase = reduced ? 4 : auto;

  // the scan line sweeps once at the start of every loop
  const [scan, setScan] = useState<number | null>(null);
  useEffect(() => {
    if (phase !== 0 || reduced) return;
    const c = animate(0, 1, { duration: 1.8, ease: "easeInOut", onUpdate: setScan, onComplete: () => setScan(null) });
    return () => {
      c.stop();
      setScan(null);
    };
  }, [phase, reduced]);

  const approved = phase >= 4;
  const edited = phase >= 3;
  const drafted = phase >= 2;
  const rows = RUBRIC.map((r) => ({ ...r, value: drafted ? (edited && r.key === "examples" ? r.final : r.ai) : 0, isEdit: edited && r.key === "examples" }));
  const total = rows.reduce((t, r) => t + r.value, 0);
  const queue = approved ? 13 : 14;
  const phaseForLog = Math.min(phase, 4);

  return (
    <div
      ref={ref}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="relative mx-auto grid w-full max-w-[660px] gap-4 sm:grid-cols-[1.1fr_1fr] sm:gap-5"
    >
      <div className="relative min-w-0">
        <div className="-rotate-[1.2deg] transition-transform duration-500 hover:rotate-0">
          <AnswerSheet
            compact
            lit={{ content: phase >= 1, structure: phase >= 1, examples: phase >= 1, gap: phase >= 1, mentor: phase >= 3 }}
            notes={{ content: phase >= 1, examples: phase >= 1, gap: phase >= 1, mentor: phase >= 3 }}
            scan={phase === 0 ? scan : null}
            stamp={phase >= 4 ? FINAL_TOTAL : null}
          />
        </div>

        {/* what the loop is doing, as a log you can scrub */}
        <ol aria-label="Evaluation progress" className="mt-4 grid gap-0.5">
          {LOG.map((label, i) => {
            const done = i < phaseForLog || (i === 4 && approved);
            const current = i === phaseForLog && !approved;
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => select(i === 4 ? 4 : i)}
                  aria-current={current ? "step" : undefined}
                  className={clsx(
                    "group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-canvas-alt",
                    done ? "text-fg" : current ? "font-medium text-fg" : "text-fg-faint",
                  )}
                >
                  <span
                    className={clsx(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] transition-colors duration-300",
                      done ? "border-green bg-green text-white" : current ? "border-primary text-primary" : "border-edge-strong",
                    )}
                  >
                    {done ? <Check aria-hidden className="h-3 w-3" /> : current ? <Loader2 aria-hidden className="h-3 w-3 animate-spin" /> : i + 1}
                  </span>
                  {label}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* the mentor's queue */}
      <div className="min-w-0 sm:mt-6">
        <div className="rounded-[20px] border border-edge bg-panel shadow-window">
          <div className="flex items-center justify-between gap-2 border-b border-edge px-4 py-3">
            <p className="text-[13px] font-semibold">Review queue</p>
            <StatusBadge tone="primary">{queue} AI drafts ready</StatusBadge>
          </div>
          <ul className="divide-y divide-edge text-[12px]">
            {[
              { n: "Rahul K.", t: "Mock Test 1 · Q3", open: true },
              { n: "Sneha P.", t: "Mock Test 1 · Q3" },
              { n: "Aman V.", t: "Mock Test 1 · Q3" },
            ].map((r, i) => (
              <li key={r.n} className={clsx("flex items-center gap-2.5 px-4 py-2", r.open && "bg-primary-tint/60")}>
                <Avatar name={r.n} size="sm" tone={i} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{r.n}</span>
                  <span className="block truncate text-[10.5px] text-fg-muted">{r.t}</span>
                </span>
                <span className="shrink-0 text-[10.5px] font-medium text-fg-muted">
                  {r.open ? (approved ? <span className="text-green">Approved</span> : drafted ? (edited ? "Edited" : "AI draft") : "Reading") : "AI draft"}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-edge p-4">
            <div className="flex items-center gap-3">
              <ScoreRing value={total} max={MAX_TOTAL} size={64} tone={approved ? "green" : "primary"} />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-faint">Rahul K. · Q3</p>
                <p className="mt-0.5 text-[12px] leading-snug text-fg-muted">
                  {!drafted ? "AI is reading the page" : approved ? "Approved. Sent to the student." : edited ? "Mentor changed Examples 2 to 4" : "AI draft, hidden from the student"}
                </p>
              </div>
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[11.5px]">
              {rows.map((r) => (
                <li key={r.key} className={clsx("flex items-center justify-between gap-1 rounded-md px-1.5 py-0.5 transition-colors duration-300", r.isEdit && !approved && "bg-primary-tint")}>
                  <span className="text-fg-muted">{r.label}</span>
                  <span className="font-mono tabular-nums">
                    {r.isEdit ? <s className="mr-1 text-fg-faint">{r.ai}</s> : null}
                    {drafted ? r.value : "-"}/{r.max}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-edge pt-3">
              <Mentor>Meera Iyer</Mentor>
              {approved ? (
                <button
                  type="button"
                  onClick={() => select(0)}
                  className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-edge-strong px-3 text-[12px] font-semibold transition hover:-translate-y-px hover:border-primary hover:text-primary"
                >
                  <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Replay
                </button>
              ) : (
                <ReviewButtons disabled={!drafted} onEdit={() => select(3)} onApprove={() => select(4)} />
              )}
            </div>
          </div>
        </div>
        <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Illustrative interface · sample data</p>
      </div>
    </div>
  );
}
