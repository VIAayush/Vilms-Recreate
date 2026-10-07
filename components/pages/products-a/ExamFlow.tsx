"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Award, Check, CircleHelp, Pause, PenLine, Play, ScanText, Send } from "lucide-react";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { MockCaption } from "./shared";

// Question → Answer → Submission → Evaluation → Result, for two kinds of
// question side by side. It plays by itself while visible; pause it, or tap
// any step to hold on it.

const STEPS = [
  { id: "question", label: "Question", Icon: CircleHelp },
  { id: "answer", label: "Answer", Icon: PenLine },
  { id: "submission", label: "Submission", Icon: Send },
  { id: "evaluation", label: "Evaluation", Icon: ScanText },
  { id: "result", label: "Result", Icon: Award },
];

const cell = "h-full rounded-xl border p-3.5 transition-all duration-500";

function McqCell({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">Q2 · MCQ · 2 marks</p>
          <p className="mt-2 text-[13.5px] font-medium leading-snug">The Directive Principles are in which Part?</p>
          <div className="mt-3 space-y-1.5">
            {[70, 54, 62].map((w, i) => (
              <span key={i} className="block h-5 rounded-md bg-sunken" style={{ width: `${w}%` }} />
            ))}
          </div>
        </>
      );
    case 1:
      return (
        <ul className="space-y-1.5 text-[12.5px]">
          {["Part II", "Part III", "Part IV", "Part V"].map((o, i) => (
            <li key={o} className={clsx("flex items-center gap-2 rounded-lg border px-2.5 py-1.5", i === 2 ? "border-primary bg-primary-tint font-medium text-primary" : "border-edge text-fg-muted")}>
              <span className={clsx("grid h-4 w-4 place-items-center rounded-full border text-[9px] font-semibold", i === 2 ? "border-primary bg-primary text-primary-ink" : "border-edge-strong")}>{"ABCD"[i]}</span>
              {o}
            </li>
          ))}
        </ul>
      );
    case 2:
      return (
        <div className="flex h-full flex-col justify-center gap-1.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-tint text-primary">
            <Send aria-hidden className="h-4 w-4" />
          </span>
          <p className="text-[13.5px] font-semibold">Submitted · 10:42</p>
          <p className="text-[12px] text-fg-muted">Answer locked and saved.</p>
        </div>
      );
    case 3:
      return (
        <div className="flex h-full flex-col justify-center gap-1.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-green-tint text-green">
            <Check aria-hidden className="h-5 w-5" />
          </span>
          <p className="text-[13.5px] font-semibold">Auto-graded</p>
          <p className="text-[12px] text-fg-muted">Correct, marked the moment it was submitted.</p>
        </div>
      );
    default:
      return (
        <div className="flex h-full flex-col justify-center">
          <p className="font-display text-[40px] font-semibold leading-none tabular-nums tracking-tight">
            2<span className="text-[18px] font-normal text-fg-muted">/2</span>
          </p>
          <p className="mt-2 text-[12px] text-fg-muted">Saved to Rahul’s profile.</p>
        </div>
      );
  }
}

function LongCell({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">Q6 · Long answer · 15 marks</p>
          <p className="mt-2 text-[13.5px] font-medium leading-snug">Discuss how Fundamental Rights and Directive Principles relate.</p>
          <p className="mt-3 text-[12px] text-fg-muted">Answer on paper, then upload.</p>
        </>
      );
    case 1:
      return (
        <div className="answer-sheet relative h-full overflow-hidden rounded-lg border border-edge p-2.5 font-hand text-[15px] leading-[19px] [--rule:19px]">
          <p>Fundamental Rights are</p>
          <p>
            enforceable; <span className="answer-highlight">Directive Principles</span>
          </p>
          <p>guide the state, yet …</p>
          <span className="absolute bottom-1.5 right-2 rounded bg-black/55 px-1.5 py-0.5 font-sans text-[9.5px] text-white">Uploaded from phone</span>
        </div>
      );
    case 2:
      return (
        <div className="flex h-full flex-col justify-center gap-1.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-tint text-primary">
            <Send aria-hidden className="h-4 w-4" />
          </span>
          <p className="text-[13.5px] font-semibold">2 pages received</p>
          <p className="text-[12px] text-fg-muted">Waiting for a trainer.</p>
        </div>
      );
    case 3:
      return (
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-tint px-2 py-0.5 text-[10.5px] font-semibold text-primary">
              <ScanText aria-hidden className="h-3 w-3" /> Draft score
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-tint px-2 py-0.5 text-[10.5px] font-semibold text-green">
              <Check aria-hidden className="h-3 w-3" /> Trainer approves
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {[
              ["Content", 6, 7],
              ["Structure", 3, 4],
              ["Examples", 2, 4],
            ].map(([l, v, m], i) => (
              <div key={String(l)} className="text-[11px]">
                <div className="mb-1 flex justify-between text-fg-muted">
                  <span>{l}</span>
                  <span className="font-mono tabular-nums text-fg">
                    {v}/{m}
                  </span>
                </div>
                <span className="block h-1.5 overflow-hidden rounded-full bg-sunken">
                  <motion.span
                    className="block h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(Number(v) / Number(m)) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASE }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="flex h-full flex-col justify-center">
          <p className="font-display text-[40px] font-semibold leading-none tabular-nums tracking-tight">
            11<span className="text-[18px] font-normal text-fg-muted">/15</span>
          </p>
          <p className="mt-2 text-[12px] text-fg-muted">Evaluated copy sent. Saved to Rahul’s profile.</p>
        </div>
      );
  }
}

const LANES = [
  { id: "mcq", title: "MCQ", sub: "Marks itself", Cell: McqCell },
  { id: "long", title: "Long answer", sub: "Rubric and a trainer", Cell: LongCell },
];

export function ExamFlow() {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [step, select] = useAutoplay(STEPS.length, { interval: 2900, running: inView && playing && !reduced });

  const grid = "lg:grid lg:grid-cols-[130px_repeat(5,minmax(0,1fr))] lg:gap-3";

  return (
    <div ref={root}>
      {/* steps */}
      <ol className={clsx("grid grid-cols-5 gap-1.5", grid)} aria-label="Steps">
        <li aria-hidden className="hidden lg:block" />
        {STEPS.map((s, i) => {
          const on = i === step;
          const past = i < step;
          return (
            <li key={s.id} aria-current={on ? "step" : undefined}>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  select(i);
                }}
                className="group flex w-full flex-col items-start gap-2 text-left"
              >
                <span className="relative block h-1 w-full overflow-hidden rounded-full bg-edge">
                  <motion.span className="absolute inset-y-0 left-0 rounded-full bg-primary" initial={false} animate={{ width: past || on ? "100%" : "0%" }} transition={{ duration: past ? 0.3 : 0.6, ease: EASE }} />
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className={clsx(
                      "grid h-7 w-7 place-items-center rounded-full border transition-colors duration-300",
                      on ? "border-navy bg-navy text-primary-ink" : past ? "border-primary/40 bg-primary-tint text-primary" : "border-edge-strong text-fg-faint group-hover:border-primary group-hover:text-primary",
                    )}
                  >
                    <s.Icon aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  <span className={clsx("hidden text-[13px] font-medium transition-colors sm:inline", on ? "text-fg" : "text-fg-muted")}>
                    <span className="mr-1 font-mono text-[10.5px] text-fg-faint">{i + 1}</span>
                    {s.label}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-[14px] font-medium sm:hidden">
        {step + 1}. {STEPS[step].label}
      </p>

      {/* lanes */}
      <div className="mt-5 space-y-3">
        {LANES.map((lane) => (
          <div key={lane.id} className={clsx("grid gap-3", grid)}>
            <div className="lg:self-center">
              <p className="text-[14px] font-semibold">{lane.title}</p>
              <p className="text-[12px] text-fg-muted">{lane.sub}</p>
            </div>
            {STEPS.map((s, i) => {
              const on = i === step;
              const past = i < step;
              return (
                <div key={s.id} className={clsx("min-h-[168px]", !on && "max-lg:hidden")}>
                  <div
                    className={clsx(
                      cell,
                      on ? "border-primary bg-panel shadow-window" : past ? "border-edge bg-panel" : "border-dashed border-edge bg-transparent",
                    )}
                  >
                    <div className={clsx("h-full transition-opacity duration-500", !on && !past && "opacity-0", past && "opacity-70")}>
                      <lane.Cell step={i} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        {!reduced ? (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!playing}
            className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-edge-strong px-4 text-[13px] font-medium transition-colors hover:border-primary hover:text-primary"
          >
            {playing ? <Pause aria-hidden className="h-3.5 w-3.5" /> : <Play aria-hidden className="h-3.5 w-3.5" />}
            {playing ? "Pause" : "Play"}
          </button>
        ) : (
          <span />
        )}
        <MockCaption>Illustrative · sample data</MockCaption>
      </div>
    </div>
  );
}
