"use client";

import { useRef } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, PenLine, ScanText, Upload } from "lucide-react";
import { useAutoplay, useInView, useReducedMotion } from "../motion";
import { Avatar } from "./primitives";

// AI-assisted evaluation as a playing visual: handwritten answer -> AI
// analysis -> draft evaluation -> mentor review -> approved, evaluated copy.
const STEP_MS = 2600;
const STEPS = ["Handwritten answer", "AI analysis", "Draft", "Mentor review", "Approved", "Evaluated copy"];
const RUBRIC = [
  { label: "Content", max: 8, draft: 6, final: 7 },
  { label: "Structure", max: 4, draft: 3, final: 3 },
  { label: "Examples", max: 4, draft: 3, final: 3 },
  { label: "Language", max: 4, draft: 3, final: 3 },
];

export function EvalFlow({ showSteps = true }: { showSteps?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [step, select] = useAutoplay(STEPS.length, { interval: STEP_MS, running: inView && !reduced });
  const s = reduced ? STEPS.length - 1 : step;
  return (
    <div ref={ref}>
      {showSteps ? (
        <ol className="mb-4 flex flex-wrap gap-1.5">
          {STEPS.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => select(i)}
                className={clsx(
                  "rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
                  i === s ? "bg-navy text-white" : i < s ? "bg-primary-tint text-primary" : "bg-sunken text-fg-muted",
                )}
              >
                {i + 1}. {label}
              </button>
            </li>
          ))}
        </ol>
      ) : null}
      <EvalStage step={s} />
    </div>
  );
}

export function EvalStage({ step }: { step: number }) {
  const analysing = step === 1;
  const drafted = step >= 2;
  const reviewing = step >= 3;
  const final = step >= 4;
  const total = RUBRIC.reduce((t, r) => t + (reviewing ? r.final : r.draft), 0);

  return (
    <div className="relative grid gap-4 sm:grid-cols-[1.05fr_0.95fr] sm:gap-5" data-tilt="2">
      {/* the handwritten answer */}
      <motion.figure
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1.2 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="answer-sheet with-margin relative overflow-hidden rounded-2xl border border-edge p-5 pl-12 shadow-window [--rule:28px] sm:p-6 sm:pl-14"
      >
        <figcaption className="paper-muted mb-2 flex items-center justify-between font-sans text-[11px]">
          <span>Q3 · page 1 of 2</span>
          <span className="flex items-center gap-1">
            <Upload aria-hidden className="h-3 w-3" /> Rahul K.
          </span>
        </figcaption>
        <div className="font-hand text-[19px] leading-[28px] sm:text-[21px]">
          <p>
            The Directive Principles guide the state in making <Hi on={drafted || analysing}>laws for social welfare</Hi>.
          </p>
          <p>Art. 38 directs the state to secure a social order with justice.</p>
          <p>
            <Hi on={drafted || analysing} warn>
              They are not enforceable by courts
            </Hi>
            , yet fundamental in governance…
          </p>
        </div>
        {analysing ? (
          <motion.span
            aria-hidden
            className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-purple/25 to-transparent"
            initial={{ top: "-25%" }}
            animate={{ top: "105%" }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
        <AnimatePresence>
          {final ? (
            <motion.div
              initial={{ opacity: 0, scale: 1.4, rotate: -14 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="paper-stamp absolute bottom-4 right-4 rounded-xl border-[3px] px-3 py-1.5 text-center font-sans"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]">Evaluated</p>
              <p className="font-display text-[22px] font-bold leading-none">{total}/20</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.figure>

      {/* the panel that changes with each step */}
      <div className="relative min-h-[300px] rounded-2xl border border-edge bg-panel p-4 shadow-window sm:p-5">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <Panel key="upload">
              <Badge tone="muted" icon={Upload}>
                Uploaded from phone
              </Badge>
              <p className="mt-4 font-display text-[20px] font-semibold tracking-tight">Answer received</p>
              <p className="mt-1 text-[13px] text-fg-muted">Long-form · 20 marks · 2 pages</p>
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-canvas-alt p-3 text-[12.5px]">
                <Avatar name="Rahul Kumar" tone={0} />
                Rahul Kumar · Prelims Foundation
              </div>
            </Panel>
          ) : step === 1 ? (
            <Panel key="analyse">
              <Badge tone="purple" icon={Loader2} spin>
                AI is reading the answer
              </Badge>
              <ul className="mt-5 space-y-3 text-[13px]">
                {["Checking content against the rubric", "Looking for structure and examples", "Drafting comments"].map((t, i) => (
                  <motion.li key={t} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.35 }} className="flex items-center gap-2">
                    <ScanText aria-hidden className="h-4 w-4 text-purple" /> {t}
                  </motion.li>
                ))}
              </ul>
            </Panel>
          ) : (
            <Panel key="rubric">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">Rubric · 20 marks</p>
                {final ? (
                  <Badge tone="green" icon={Check}>
                    Approved
                  </Badge>
                ) : reviewing ? (
                  <Badge tone="blue" icon={PenLine}>
                    Mentor reviewing
                  </Badge>
                ) : (
                  <Badge tone="purple" icon={ScanText}>
                    AI draft
                  </Badge>
                )}
              </div>
              <ul className="mt-4 space-y-3 text-[12.5px]">
                {RUBRIC.map((r, k) => {
                  const v = reviewing ? r.final : r.draft;
                  return (
                    <li key={r.label}>
                      <div className="flex justify-between">
                        <span className="text-fg-muted">{r.label}</span>
                        <span className="font-mono tabular-nums">
                          {reviewing && r.final !== r.draft ? <s className="mr-1.5 text-fg-faint">{r.draft}</s> : null}
                          {v}/{r.max}
                        </span>
                      </div>
                      <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-sunken">
                        <motion.span
                          className={clsx("block h-full rounded-full", final ? "bg-green" : reviewing ? "bg-primary" : "bg-purple")}
                          initial={{ width: 0 }}
                          animate={{ width: `${(v / r.max) * 100}%` }}
                          transition={{ duration: 0.7, delay: k * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </span>
                    </li>
                  );
                })}
              </ul>
              {final ? (
                <div className="mt-5 flex items-center gap-4">
                  <ScoreRing value={total} max={20} />
                  <p className="text-[13px] text-fg-muted">
                    Sent to Rahul.
                    <br />
                    Saved to his profile.
                  </p>
                </div>
              ) : (
                <div className="mt-5 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-[12px] text-fg-muted">
                    <Avatar name="Meera Iyer" size="sm" tone={1} /> {reviewing ? "Meera edited Content: 6 → 7" : "Waiting for Meera (mentor)"}
                  </span>
                  <motion.span
                    animate={reviewing ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    className={clsx("rounded-lg px-3 py-1.5 text-[12px] font-semibold", reviewing ? "bg-primary text-primary-ink" : "bg-sunken text-fg-muted")}
                  >
                    Approve
                  </motion.span>
                </div>
              )}
            </Panel>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
      {children}
    </motion.div>
  );
}

const BADGE_TONE = {
  muted: "bg-sunken text-fg-muted",
  purple: "bg-purple-tint text-purple",
  blue: "bg-primary-tint text-primary",
  green: "bg-green-tint text-green",
};
function Badge({ tone, icon: Icon, spin, children }: { tone: keyof typeof BADGE_TONE; icon: typeof Check; spin?: boolean; children: React.ReactNode }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold", BADGE_TONE[tone])}>
      <Icon aria-hidden className={clsx("h-3.5 w-3.5", spin && "animate-spin")} />
      {children}
    </span>
  );
}

function Hi({ on, warn, children }: { on: boolean; warn?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "bg-no-repeat transition-[background-size] duration-700 ease-out [background-position:0_88%]",
        warn ? "paper-mark-warn" : "paper-mark-ai",
        on ? "[background-size:100%_42%]" : "[background-size:0%_42%]",
      )}
    >
      {children}
    </span>
  );
}

function ScoreRing({ value, max }: { value: number; max: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid h-[76px] w-[76px] place-items-center">
      <svg viewBox="0 0 76 76" className="absolute inset-0 -rotate-90">
        <circle cx="38" cy="38" r={r} fill="none" strokeWidth="6" className="stroke-sunken" />
        <motion.circle
          cx="38"
          cy="38"
          r={r}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className="stroke-green"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - value / max) }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="font-display text-[18px] font-semibold tabular-nums">
        {value}
        <span className="text-[11px] text-fg-muted">/{max}</span>
      </span>
    </span>
  );
}
