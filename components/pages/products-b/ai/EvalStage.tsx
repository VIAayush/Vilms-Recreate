"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, FileImage, Loader2, ScanText, Upload } from "lucide-react";
import { Avatar, InstituteMark } from "@/components/marketing/screens/primitives";
import { settle, useStepClock } from "../shared/clock";
import { EVAL_STEPS, FINAL_TOTAL, MAX_TOTAL, RUBRIC, STATUS_BY_STEP } from "./data";
import { AnswerSheet, type MarkKey } from "./paper";
import { CriterionBar, Mentor, ReviewButtons, ScoreRing, StatusBadge } from "./ui";

const N = EVAL_STEPS.length;
const AI_COMMENT = "Clear on both causes. Add a recent example to support the second point.";
const TRANSCRIPT =
  "Directive Principles guide the state in making laws for social welfare. Art. 38: a just social order. Art. 39: equal pay. Not enforceable by courts, yet fundamental to governance.";
const CRITERION_FOR: Record<MarkKey, string> = { content: "content", structure: "structure", examples: "examples", gap: "examples", mentor: "examples" };

/**
 * The stage of the evaluation story: a pure function of (step, scroll
 * position inside the step). Everything on it (scan line, rubric rows,
 * score, mentor edit, approval, stamp) is derived from those two numbers.
 */
export function EvalStage({ step, progress }: { step: number; progress: number }) {
  const { u } = useStepClock(step, progress, N);
  const v = settle(u);
  const [hover, setHover] = useState<MarkKey | null>(null);

  // --- what is visible on the paper ---
  const at = (s: number, from: number) => step > s || (step === s && v > from);
  const lit = {
    content: at(2, 0.12),
    structure: at(2, 0.34),
    examples: at(2, 0.56),
    gap: at(2, 0.78),
    mentor: at(4, 0.42),
  };
  const notes = { content: at(2, 0.16), examples: at(2, 0.6), gap: at(2, 0.8), mentor: at(4, 0.5) };
  const scan = step === 1 ? v : null;
  const stamp = step === 6 && v > 0.3 ? FINAL_TOTAL : null;
  const paperIn = step === 0 ? v : 1;

  // --- rubric ---
  const approved = step > 5 || (step === 5 && v > 0.45);
  const edited = at(4, 0.5);
  const rows: Row[] = RUBRIC.map((r, k) => {
    const scored = step > 3 || (step === 3 && v > 0.08 + k * 0.18);
    const isEdit = r.key === "examples" && edited;
    return { ...r, lit: step > 2 || (step === 2 && v > 0.12 + k * 0.22), scored, value: scored ? (isEdit ? r.final : r.ai) : 0, isEdit };
  });
  const total = rows.reduce((t, r) => t + r.value, 0);
  const queue = step === 3 ? (v < 0.6 ? 13 : 14) : step === 4 ? 14 : step === 5 ? (v < 0.55 ? 14 : 13) : 14;

  const hotCriterion = hover ? CRITERION_FOR[hover] : null;
  const status = STATUS_BY_STEP[step];

  return (
    <div
      role="img"
      aria-label={`Illustrative interface, sample data. Step ${step + 1} of ${N}: ${EVAL_STEPS[step].title}.`}
      className="band-light overflow-hidden rounded-[24px] border border-edge bg-canvas text-fg shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)]"
    >
      {/* header */}
      <div className="flex items-center gap-3 border-b border-edge px-4 py-2.5">
        <InstituteMark name="ABC Academy" className="h-7 w-7 text-[10px]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-semibold leading-tight">Mock Test 1 · Answer writing</p>
          <p className="truncate text-[10.5px] leading-tight text-fg-muted">ABC Academy · Rahul Kumar · Q3 · 20 marks</p>
        </div>
        <StatusBadge
          tone={step === 6 || approved ? "green" : step === 0 ? "muted" : "primary"}
          icon={step === 1 || step === 2 ? <Loader2 aria-hidden className="h-3 w-3 animate-spin" /> : approved ? <Check aria-hidden className="h-3 w-3" /> : undefined}
        >
          {step === 5 && !approved ? "Mentor review" : status}
        </StatusBadge>
      </div>
      {/* progress track */}
      <div className="flex gap-1 px-4 pt-3">
        {EVAL_STEPS.map((s, i) => (
          <span key={s.title} className={clsx("h-1 flex-1 rounded-full transition-colors duration-500", i < step ? "bg-navy" : i === step ? "bg-primary" : "bg-edge")} />
        ))}
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[1.12fr_0.88fr] sm:p-5">
        {/* the paper */}
        <div className="relative min-w-0 self-start" style={{ opacity: paperIn, transform: step === 0 ? `translateY(${(1 - v) * 28}px) rotate(${(1 - v) * -3}deg)` : undefined }}>
          <AnswerSheet lit={lit} notes={notes} scan={scan} stamp={stamp} hot={hover} onHot={setHover} />
          {step === 0 ? (
            <span className="absolute -top-2 left-3 inline-flex items-center gap-1 rounded-full bg-navy px-2 py-0.5 font-sans text-[10px] font-semibold text-white shadow-sm">
              <Upload aria-hidden className="h-3 w-3" /> 2 pages received
            </span>
          ) : null}
        </div>

        {/* the panel that changes with the step */}
        <div className="relative h-[352px] min-w-0 overflow-hidden rounded-2xl border border-edge bg-panel shadow-window sm:h-[360px]">
          <AnimatePresence mode="wait" initial={false}>
            {step === 0 ? (
              <Slide key="phone-up">
                <PhoneUpload v={v} />
              </Slide>
            ) : step === 1 ? (
              <Slide key="read">
                <ReadPanel v={v} />
              </Slide>
            ) : step === 6 ? (
              <Slide key="phone-notify">
                <PhoneNotify v={v} />
              </Slide>
            ) : (
              <Slide key="rubric">
                <RubricPanel step={step} v={v} rows={rows} total={total} queue={queue} approved={approved} hotKey={hotCriterion} />
              </Slide>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="absolute inset-0 p-4">
      {children}
    </motion.div>
  );
}

/* ---------- step 0: the student's phone ---------- */
function PhoneFrame({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="mx-auto flex h-full max-h-[318px] w-[196px] flex-col overflow-hidden rounded-[28px] border-[6px] border-[rgb(27_32_38)] bg-[rgb(27_32_38)] shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)]">
      <div className={clsx("relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[20px]", dark ? "bg-[rgb(0_48_86)]" : "bg-white text-[rgb(14_27_44)]")}>
        <span aria-hidden className="absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-[rgb(27_32_38)]" />
        {children}
      </div>
    </div>
  );
}

function PhoneUpload({ v }: { v: number }) {
  const done = v > 0.9;
  return (
    <PhoneFrame>
      <div className="flex items-center gap-2 px-3 pt-5">
        <InstituteMark name="ABC Academy" className="h-5 w-5 text-[8px]" />
        <span className="text-[10.5px] font-semibold">ABC Academy</span>
      </div>
      <div className="px-3 pt-3">
        <p className="text-[9.5px] text-[rgb(88_100_117)]">Mock Test 1 · Q3</p>
        <p className="text-[13px] font-semibold leading-tight">Upload your answer</p>
      </div>
      <div className="mx-3 mt-3 rounded-xl border border-[rgb(222_228_236)] bg-[rgb(245_247_250)] p-2">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-7 shrink-0 content-start gap-[3px] rounded-[3px] border border-[rgb(222_228_236)] bg-white p-[3px]">
            {[90, 70, 85, 55].map((w, i) => (
              <i key={i} className="block h-[2px] rounded bg-[rgb(0_48_86/0.4)]" style={{ width: `${w}%` }} />
            ))}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1 truncate text-[10px] font-medium">
              <FileImage aria-hidden className="h-3 w-3 shrink-0 text-[rgb(29_99_180)]" /> answer-q3.jpg
            </span>
            <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-[rgb(222_228_236)]">
              <span className="block h-full rounded-full bg-[rgb(29_99_180)]" style={{ width: `${v * 100}%` }} />
            </span>
          </span>
        </div>
        <p className="mt-1.5 text-[9px] text-[rgb(88_100_117)]">{done ? "2 pages · uploaded" : `Uploading… ${Math.round(v * 100)}%`}</p>
      </div>
      <div className="mt-auto p-3">
        <span className={clsx("flex h-8 items-center justify-center gap-1.5 rounded-lg text-[11px] font-semibold text-white transition-colors", done ? "bg-[rgb(24_128_56)]" : "bg-[rgb(0_48_86)]")}>
          {done ? (
            <>
              <Check aria-hidden className="h-3.5 w-3.5" /> Submitted
            </>
          ) : (
            "Submit answer"
          )}
        </span>
      </div>
    </PhoneFrame>
  );
}

/* ---------- step 6: the student's phone, notified ---------- */
function PhoneNotify({ v }: { v: number }) {
  const show = v > 0.1;
  const saved = v > 0.55;
  return (
    <PhoneFrame dark>
      <p className="pt-6 text-center font-display text-[30px] font-medium leading-none tracking-tight text-white">10:42</p>
      <p className="mt-1 text-center text-[9px] text-white/60">Thursday</p>
      <div className="mx-2.5 mt-4 rounded-2xl bg-white/90 p-2.5 text-[rgb(14_27_44)] shadow-lg transition duration-500" style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(-16px)" }}>
        <div className="flex items-center gap-1.5 text-[8.5px] font-medium text-[rgb(88_100_117)]">
          <InstituteMark name="ABC Academy" className="h-4 w-4 text-[7px]" /> ABC ACADEMY <span className="ml-auto">now</span>
        </div>
        <p className="mt-1.5 text-[11px] font-semibold leading-tight">Your evaluated copy is ready</p>
        <p className="mt-0.5 text-[10px] text-[rgb(88_100_117)]">
          Mock Test 1 · Q3 · {FINAL_TOTAL}/{MAX_TOTAL}
        </p>
      </div>
      <div className="mx-2.5 mt-2 rounded-xl bg-white/90 p-2.5 text-[rgb(14_27_44)] transition duration-500" style={{ opacity: saved ? 1 : 0, transform: saved ? "none" : "translateY(10px)" }}>
        <p className="text-[8.5px] font-semibold uppercase tracking-wider text-[rgb(88_100_117)]">Saved to your profile</p>
        <div className="mt-1.5 flex items-center justify-between text-[10px]">
          <span>Mock Test 1 · Q3</span>
          <span className="font-mono font-semibold text-[rgb(24_128_56)]">
            {FINAL_TOTAL}/{MAX_TOTAL}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-[10px] text-[rgb(88_100_117)]">
          <span>Weekly test 4 · Q2</span>
          <span className="font-mono">13/20</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ---------- step 1: AI reads ---------- */
function ReadPanel({ v }: { v: number }) {
  const chars = Math.round(TRANSCRIPT.length * v);
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2">
        <StatusBadge tone="primary" icon={<ScanText aria-hidden className="h-3.5 w-3.5" />}>
          AI is reading
        </StatusBadge>
        <span className="font-mono text-[11px] tabular-nums text-fg-muted">{Math.round(v * 100)}%</span>
      </div>
      <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-sunken">
        <span className="block h-full rounded-full bg-primary" style={{ width: `${v * 100}%` }} />
      </span>
      <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-fg-faint">Transcript</p>
      <p className="mt-2 min-h-[132px] rounded-xl bg-canvas-alt p-3 font-mono text-[11.5px] leading-[1.7] text-fg">
        {TRANSCRIPT.slice(0, chars)}
        <span aria-hidden className={clsx("ml-px inline-block h-3 w-[2px] translate-y-0.5 bg-primary", v < 1 && "animate-pulse")} />
      </p>
      <ul className="mt-auto space-y-1.5 text-[11.5px] text-fg-muted">
        <li className="flex items-center gap-2">
          <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Page 1 read
        </li>
        <li className="flex items-center gap-2">
          {v > 0.7 ? <Check aria-hidden className="h-3.5 w-3.5 text-green" /> : <Loader2 aria-hidden className="h-3.5 w-3.5 animate-spin text-primary" />} Page 2 {v > 0.7 ? "read" : "reading"}
        </li>
        <li className="flex items-center gap-2">
          <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Original image kept for the mentor
        </li>
      </ul>
    </div>
  );
}

/* ---------- steps 2-5: rubric, draft, review, approval ---------- */
type Row = (typeof RUBRIC)[number] & { lit: boolean; scored: boolean; value: number; isEdit: boolean };

function RubricPanel({ step, v, rows, total, queue, approved, hotKey }: { step: number; v: number; rows: Row[]; total: number; queue: number; approved: boolean; hotKey: string | null }) {
  const evaluating = step === 2;
  const litCount = rows.filter((r) => r.lit).length;
  const newest = rows.filter((r) => r.lit).pop()?.key;
  const commentChars = Math.round(AI_COMMENT.length * (step === 3 ? Math.min(1, v * 1.4) : 1));
  const pressed = step === 5 && v > 0.35;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[12.5px] font-semibold">Rubric · {MAX_TOTAL} marks</p>
        {evaluating ? (
          <StatusBadge tone="primary" icon={<ScanText aria-hidden className="h-3 w-3" />}>
            AI evaluating
          </StatusBadge>
        ) : approved ? (
          <StatusBadge tone="green" icon={<Check aria-hidden className="h-3 w-3" />}>
            Approved
          </StatusBadge>
        ) : step >= 4 ? (
          <StatusBadge tone="gold">Mentor reviewing</StatusBadge>
        ) : (
          <StatusBadge tone="primary" icon={<ScanText aria-hidden className="h-3 w-3" />}>
            AI draft
          </StatusBadge>
        )}
      </div>

      {!evaluating ? (
        <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-canvas-alt px-2.5 py-1.5 text-[11px]">
          <span className="font-semibold text-primary">
            {queue} AI drafts {step === 5 && approved ? "left to review" : "ready"}
          </span>
          <span className="flex items-center gap-1.5 text-fg-muted">
            <Avatar name="Rahul Kumar" size="sm" tone={0} /> Rahul K. {step >= 4 ? "· open" : "· new"}
          </span>
        </div>
      ) : null}

      <div className={clsx("space-y-0.5", evaluating ? "mt-2" : "mt-1.5")}>
        {rows.map((r) => (
          <CriterionBar
            key={r.key}
            label={r.label}
            value={r.value}
            max={r.max}
            from={r.isEdit ? r.ai : undefined}
            hidden={!r.scored}
            tone={approved ? "green" : r.isEdit ? "gold" : "primary"}
            active={hotKey === r.key || (evaluating && newest === r.key)}
            sub={
              evaluating && r.lit ? (
                <span className="flex items-center gap-1">
                  <Check aria-hidden className="h-3 w-3 text-green" /> {r.evidence}
                </span>
              ) : undefined
            }
          />
        ))}
      </div>

      <div className="mt-auto">
        {evaluating ? (
          <p className="flex items-center gap-2 text-[11.5px] text-fg-muted">
            <Loader2 aria-hidden className="h-3.5 w-3.5 animate-spin text-primary" /> Matching evidence · {litCount} of {rows.length} criteria
          </p>
        ) : (
          <div className="flex items-center gap-3 border-t border-edge pt-3">
            <ScoreRing value={total} max={MAX_TOTAL} size={60} tone={approved ? "green" : "primary"} />
            <div className="min-w-0 flex-1">
              {step === 3 ? (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-faint">Draft comment</p>
                  <p className="mt-1 text-[11.5px] leading-snug text-fg-muted">{AI_COMMENT.slice(0, commentChars)}</p>
                </>
              ) : step === 4 ? (
                <>
                  <Mentor />
                  <p className="mt-1 text-[11.5px] leading-snug">
                    {v > 0.5 ? (
                      <>
                        Examples <s className="text-fg-faint">2</s> to <b>4</b>. &ldquo;Art. 39 counts too.&rdquo;
                      </>
                    ) : (
                      <span className="text-fg-muted">Reading the page next to the draft</span>
                    )}
                  </p>
                </>
              ) : (
                <>
                  <Mentor>{approved ? "Approved by Meera Iyer" : "Meera Iyer · mentor"}</Mentor>
                  <ReviewButtons decorative className="mt-1.5" approved={approved} pressed={pressed} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
