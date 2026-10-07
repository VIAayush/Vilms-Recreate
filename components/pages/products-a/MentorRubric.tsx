"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus, RotateCcw, ScanText } from "lucide-react";
import { Avatar, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { RUBRIC } from "./exams-data";
import { MockCaption } from "./shared";

// The handwritten path, with the human in it. The AI has drafted a score for
// each rubric criterion; the mentor can change any of them, then approves.
// Nothing reaches the student until that button is pressed.

const stepBtn =
  "grid h-8 w-8 place-items-center rounded-lg border border-edge-strong transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-edge-strong disabled:hover:text-fg";

export function MentorRubric() {
  const [scores, setScores] = useState<Record<string, number>>(() => Object.fromEntries(RUBRIC.map((r) => [r.id, r.ai])));
  const [approved, setApproved] = useState(false);

  const total = RUBRIC.reduce((t, r) => t + scores[r.id], 0);
  const max = RUBRIC.reduce((t, r) => t + r.max, 0);
  const edited = RUBRIC.some((r) => scores[r.id] !== r.ai);

  const bump = (id: string, by: number, cap: number) => setScores((s) => ({ ...s, [id]: Math.min(cap, Math.max(0, s[id] + by)) }));
  const reset = () => {
    setScores(Object.fromEntries(RUBRIC.map((r) => [r.id, r.ai])));
    setApproved(false);
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        {/* the handwritten page */}
        <figure className="answer-sheet with-margin relative overflow-hidden rounded-2xl border border-edge p-5 pl-12 shadow-window [--rule:28px] sm:p-6 sm:pl-14">
          <figcaption className="paper-muted mb-2 flex items-center justify-between font-sans text-[11px]">
            <span>Q6 · page 1 of 2</span>
            <span>Rahul K.</span>
          </figcaption>
          <div className="font-hand text-[19px] leading-[28px] sm:text-[21px]">
            <p>Fundamental Rights are enforceable in court; the Directive Principles only guide the state.</p>
            <p>
              <span className="paper-mark-ai">Yet the two work together</span>, as the courts have held.
            </p>
            <p>
              Rights protect the individual, <span className="paper-mark-ai">Directive Principles</span> set the goals of a welfare state…
            </p>
          </div>
          <AnimatePresence>
            {approved ? (
              <motion.div
                initial={{ opacity: 0, scale: 1.5, rotate: -16 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="paper-stamp absolute bottom-4 right-4 rounded-xl border-[3px] px-3 py-1.5 text-center font-sans"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em]">Evaluated</p>
                <p className="font-display text-[22px] font-bold leading-none">
                  {total}/{max}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </figure>

        {/* the rubric */}
        <div className="rounded-2xl border border-edge bg-panel p-4 shadow-window sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[14px] font-semibold">Rubric · {max} marks</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={approved ? "a" : edited ? "e" : "d"} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                {approved ? (
                  <Pill tone="green" className="px-2.5 py-1 text-[11.5px]">
                    <Check aria-hidden className="h-3 w-3" /> Approved
                  </Pill>
                ) : (
                  <Pill tone="primary" className="px-2.5 py-1 text-[11.5px]">
                    <ScanText aria-hidden className="h-3 w-3" /> {edited ? "Trainer edited" : "Draft score"}
                  </Pill>
                )}
              </motion.span>
            </AnimatePresence>
          </div>

          <ul className="mt-4 divide-y divide-edge">
            {RUBRIC.map((r) => {
              const v = scores[r.id];
              return (
                <li key={r.id} className="py-3.5" role="group" aria-label={`${r.label} score`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[14px] font-medium">{r.label}</span>
                    <span className="flex items-center gap-1.5">
                      <button type="button" aria-label={`Decrease ${r.label} score`} disabled={approved || v <= 0} onClick={() => bump(r.id, -1, r.max)} className={stepBtn}>
                        <Minus aria-hidden className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-[58px] text-center font-mono text-[14px] tabular-nums" aria-live="polite">
                        {v !== r.ai ? <s className="mr-1 text-[11px] text-fg-faint">{r.ai}</s> : null}
                        {v}/{r.max}
                      </span>
                      <button type="button" aria-label={`Increase ${r.label} score`} disabled={approved || v >= r.max} onClick={() => bump(r.id, 1, r.max)} className={stepBtn}>
                        <Plus aria-hidden className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  </div>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-sunken">
                    <motion.span className={clsx("block h-full rounded-full", approved ? "bg-green" : "bg-primary")} initial={false} animate={{ width: `${(v / r.max) * 100}%` }} transition={{ duration: 0.4, ease: EASE }} />
                  </span>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-fg-muted">{r.note}</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-edge pt-4">
            <span className="flex items-center gap-2 text-[12.5px] text-fg-muted">
              <Avatar name="Meera Iyer" size="sm" tone={1} /> Trainer review
            </span>
            <span className="ml-auto font-display text-[24px] font-semibold tabular-nums tracking-tight">
              {total}
              <span className="text-[14px] font-normal text-fg-muted">/{max}</span>
            </span>
          </div>

          <div className="mt-3">
            {approved ? (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-green-tint px-3.5 py-3 text-[13px]">
                <span className="flex items-center gap-2 font-medium text-green">
                  <Check aria-hidden className="h-4 w-4" /> Sent to Rahul and saved to his profile.
                </span>
                <button type="button" onClick={reset} className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-medium text-fg-muted hover:text-primary">
                  <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setApproved(true)} className="cta w-full bg-navy text-primary-ink hover:bg-primary">
                Approve and send to student
              </button>
            )}
          </div>
        </div>
      </div>
      <MockCaption className="mt-4">Illustrative interface · sample data · edit a score</MockCaption>
    </div>
  );
}
