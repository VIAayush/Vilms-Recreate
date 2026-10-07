"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Clock, Flag, ImageUp, RotateCcw, X } from "lucide-react";
import { useInView } from "@/components/marketing/motion";
import { BrowserFrame, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { EXAM_SECONDS, LONG_Q, MCQS } from "./exams-data";
import { MockCaption, useTween } from "./shared";

// A student-facing exam screen you can really use: pick options, move between
// questions, flag one, attach a handwritten answer, watch the clock, submit.
// MCQs are marked on the spot; the long answer goes off for evaluation.

const TOTAL = MCQS.length + 1;
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export function ExamDemo() {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "0px" });
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<(number | null)[]>(() => MCQS.map(() => null));
  const [flags, setFlags] = useState<boolean[]>(() => Array.from({ length: TOTAL }, () => false));
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [left, setLeft] = useState(EXAM_SECONDS);

  const finished = submitted || left <= 0;

  useEffect(() => {
    if (!inView || finished) return;
    const id = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [inView, finished]);

  const go = (to: number) => {
    setDir(to > cur ? 1 : -1);
    setCur(to);
  };

  const pick = (i: number) => setAnswers((a) => a.map((v, k) => (k === cur ? i : v)));
  const answered = (k: number) => (k < MCQS.length ? answers[k] !== null : uploaded);
  const answeredCount = Array.from({ length: TOTAL }, (_, k) => answered(k)).filter(Boolean).length;

  const correct = answers.filter((a, i) => a === MCQS[i].correct).length;
  const marks = useTween(finished ? correct * 2 : 0, 900);

  const reset = () => {
    setCur(0);
    setAnswers(MCQS.map(() => null));
    setFlags(Array.from({ length: TOTAL }, () => false));
    setUploaded(false);
    setSubmitted(false);
    setLeft(EXAM_SECONDS);
  };

  const isLong = cur === MCQS.length;
  const q = MCQS[cur];

  return (
    <div ref={root} className="relative">
      <BrowserFrame url="learn.yourinstitute.in/tests/mock-test-1" className="shadow-window">
        {/* header */}
        <div className="flex items-center justify-between gap-3 border-b border-edge px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold tracking-tight">Mock Test 1 · Polity</p>
            <p className="text-[11px] text-fg-muted">Sample paper · {TOTAL} questions · 25 marks</p>
          </div>
          <span
            role="timer"
            aria-label={finished ? "Test finished" : `Time left ${fmt(left)}`}
            className={clsx(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[14px] font-medium tabular-nums transition-colors",
              finished ? "bg-sunken text-fg-muted" : "bg-primary-tint text-primary",
            )}
          >
            <Clock aria-hidden className="h-3.5 w-3.5" />
            {finished ? "Done" : fmt(left)}
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {!finished ? (
            <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="p-4 sm:p-5">
              {/* palette */}
              <nav aria-label="Question palette" className="flex flex-wrap items-center gap-1.5">
                {Array.from({ length: TOTAL }, (_, k) => {
                  const on = k === cur;
                  const a = answered(k);
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => go(k)}
                      aria-current={on ? "step" : undefined}
                      aria-label={`Question ${k + 1}${a ? ", answered" : ", not answered"}${flags[k] ? ", marked for review" : ""}`}
                      className={clsx(
                        "relative grid h-9 w-9 place-items-center rounded-lg border text-[13px] font-semibold tabular-nums transition-all duration-200",
                        on
                          ? "border-navy bg-navy text-primary-ink"
                          : a
                            ? "border-primary/40 bg-primary-tint text-primary hover:border-primary"
                            : "border-edge bg-panel text-fg-muted hover:border-edge-strong hover:text-fg",
                      )}
                    >
                      {k + 1}
                      {flags[k] ? <span aria-hidden className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[rgb(var(--surface))] bg-gold" /> : null}
                    </button>
                  );
                })}
                <span className="ml-auto text-[12px] text-fg-muted">
                  Answered <b className="font-semibold tabular-nums text-fg">{answeredCount}</b>/{TOTAL}
                </span>
              </nav>

              {/* question */}
              <div className="relative mt-5 min-h-[272px] overflow-hidden">
                <AnimatePresence mode="wait" initial={false} custom={dir}>
                  <motion.div
                    key={cur}
                    custom={dir}
                    initial={{ opacity: 0, x: 24 * dir }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 * dir }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    {!isLong ? (
                      <fieldset>
                        <legend className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">
                          Question {cur + 1} of {TOTAL} · MCQ · 2 marks
                        </legend>
                        <p className="mt-2 text-[17px] font-medium leading-snug tracking-[-0.01em] sm:text-[19px]">{q.q}</p>
                        <div className="mt-4 grid gap-2">
                          {q.options.map((o, i) => {
                            const sel = answers[cur] === i;
                            return (
                              <label
                                key={o}
                                className={clsx(
                                  "group relative flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[14.5px] transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-[rgb(var(--surface))]",
                                  sel ? "border-primary bg-primary-tint font-medium text-primary" : "border-edge bg-panel hover:-translate-y-px hover:border-primary/50 hover:bg-primary-tint/40",
                                )}
                              >
                                <input type="radio" name={q.id} checked={sel} onChange={() => pick(i)} className="sr-only" />
                                <span
                                  aria-hidden
                                  className={clsx(
                                    "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11.5px] font-semibold transition-colors",
                                    sel ? "border-primary bg-primary text-primary-ink" : "border-edge-strong text-fg-muted group-hover:border-primary",
                                  )}
                                >
                                  {"ABCD"[i]}
                                </span>
                                {o}
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    ) : (
                      <div>
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">
                          Question {TOTAL} of {TOTAL} · Long answer · {LONG_Q.marks} marks
                        </p>
                        <p className="mt-2 text-[17px] font-medium leading-snug tracking-[-0.01em] sm:text-[19px]">{LONG_Q.q}</p>
                        <p className="mt-2 text-[13px] text-fg-muted">Write it on paper, then photograph and upload the pages.</p>
                        {!uploaded ? (
                          <button
                            type="button"
                            onClick={() => setUploaded(true)}
                            className="mt-4 flex min-h-[120px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-edge-strong bg-canvas-alt text-[14px] font-medium text-fg-muted transition hover:border-primary hover:bg-primary-tint/40 hover:text-primary"
                          >
                            <ImageUp aria-hidden className="h-6 w-6" />
                            Upload photos of your handwritten answer
                          </button>
                        ) : (
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-3 rounded-xl border border-green/40 bg-green-tint/50 p-3">
                            <span aria-hidden className="answer-sheet relative grid h-[68px] w-[52px] shrink-0 rotate-[-3deg] place-items-center overflow-hidden rounded border border-edge font-hand text-[9px] leading-[11px] [--rule:11px]">
                              <span className="px-1">The Directive Principles…</span>
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-green">
                                <Check aria-hidden className="h-4 w-4" /> answer-q6.jpg · 2 pages
                              </p>
                              <p className="text-[12px] text-fg-muted">Ready to submit. Evaluated against the rubric.</p>
                            </div>
                            <button type="button" onClick={() => setUploaded(false)} className="shrink-0 text-[12.5px] font-medium text-fg-muted underline-offset-4 hover:text-primary hover:underline">
                              Replace
                            </button>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* controls */}
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-edge pt-4">
                <button type="button" onClick={() => go(cur - 1)} disabled={cur === 0} className="cta cta-ghost cta-sm" aria-label="Previous question">
                  <ArrowLeft aria-hidden className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button type="button" onClick={() => go(cur + 1)} disabled={cur === TOTAL - 1} className="cta cta-ghost cta-sm" aria-label="Next question">
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-pressed={flags[cur]}
                  onClick={() => setFlags((f) => f.map((v, k) => (k === cur ? !v : v)))}
                  className={clsx(
                    "inline-flex min-h-[38px] items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                    flags[cur] ? "border-gold bg-panel text-yellow-text" : "border-edge text-fg-muted hover:border-edge-strong hover:text-fg",
                  )}
                >
                  <Flag aria-hidden className="h-3.5 w-3.5" fill={flags[cur] ? "currentColor" : "none"} />
                  <span className="hidden sm:inline">Mark for review</span>
                  <span className="sm:hidden">Flag</span>
                </button>
                <button type="button" onClick={() => setSubmitted(true)} className="cta cta-sm ml-auto bg-navy text-primary-ink hover:bg-primary">
                  Submit test
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="p-4 sm:p-5" aria-live="polite">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-green-tint text-green">
                  <Check aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[17px] font-semibold tracking-tight">{submitted ? "Test submitted" : "Time is up. Test submitted"}</p>
                  <p className="text-[12.5px] text-fg-muted">Saved to Rahul Kumar’s profile.</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)]">
                <div className="rounded-xl border border-edge bg-canvas-alt px-5 py-4 text-center">
                  <p className="font-display text-[44px] font-semibold leading-none tabular-nums tracking-tight">
                    {marks}
                    <span className="text-[20px] font-normal text-fg-muted">/10</span>
                  </p>
                  <p className="mt-1.5 text-[11.5px] text-fg-muted">MCQs · auto-graded</p>
                </div>
                <ul className="divide-y divide-edge rounded-xl border border-edge text-[13px]">
                  {MCQS.map((m, i) => {
                    const a = answers[i];
                    const ok = a === m.correct;
                    return (
                      <li key={m.id} className="flex items-start gap-2.5 px-3 py-2">
                        <span className={clsx("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", a === null ? "bg-sunken text-fg-faint" : ok ? "bg-green-tint text-green" : "bg-red-tint text-red")}>
                          {ok ? <Check aria-hidden className="h-3 w-3" /> : <X aria-hidden className="h-3 w-3" />}
                        </span>
                        <p className="min-w-0 leading-snug">
                          <span className="block truncate text-fg-muted">
                            Q{i + 1} · {m.q}
                          </span>
                          <span className={clsx("block text-[12px]", ok ? "text-green" : "text-fg")}>
                            {a === null ? "Not answered. " : ok ? "Correct. " : "Not quite. "}
                            {!ok ? `Answer: ${m.options[m.correct]}` : ""}
                          </span>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-primary/30 bg-primary-tint/50 px-3.5 py-3">
                <span className="text-[13px]">
                  <b className="font-semibold">Q6 · Long answer · 15 marks</b>
                  <span className="block text-[12px] text-fg-muted">{uploaded ? "Handwritten pages received. Waiting for a trainer." : "No answer was uploaded."}</span>
                </span>
                {uploaded ? <Pill tone="primary" className="ml-auto">Awaiting evaluation</Pill> : <Pill className="ml-auto">Skipped</Pill>}
              </div>

              <button type="button" onClick={reset} className="cta cta-ghost cta-sm mt-4">
                <RotateCcw aria-hidden className="h-4 w-4" /> Try the sample again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </BrowserFrame>
      <MockCaption className="mt-4">Illustrative interface · sample paper · try it</MockCaption>
    </div>
  );
}
