"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowRight, Check, Lock, Minus, Plus, RotateCcw, ShieldCheck, TriangleAlert } from "lucide-react";
import { EASE } from "@/components/site-ui/motion-tokens";
import { Illustrative } from "@/components/marketing/screens/primitives";
import { MAX_TOTAL, RUBRIC } from "./data";
import { Mentor, ScoreRing, StatusBadge } from "./ui";

type Mode = "ai" | "mentor";
const sum = (a: number[]) => a.reduce((t, n) => t + n, 0);

/**
 * "You decide": the same AI draft released two ways. With no sign-off the
 * student gets the draft as it is. With a mentor, every mark can be changed
 * and nothing is released until Approve. All of it is clickable.
 */
export function SignOff() {
  const uid = useId();
  const [mode, setMode] = useState<Mode>("mentor");
  const [marks, setMarks] = useState<number[]>(() => RUBRIC.map((r) => r.ai));
  const [approved, setApproved] = useState(false);

  const aiMarks = RUBRIC.map((r) => r.ai);
  const aiTotal = sum(aiMarks);
  const mentorTotal = sum(marks);
  const edited = marks.some((m, i) => m !== aiMarks[i]);
  const studentMarks = mode === "ai" ? aiMarks : marks;
  const released = mode === "ai" || approved;

  const change = (i: number, d: number) => {
    setApproved(false);
    setMarks((cur) => cur.map((m, k) => (k === i ? Math.min(RUBRIC[i].max, Math.max(0, m + d)) : m)));
  };
  const reset = () => {
    setMarks(aiMarks);
    setApproved(false);
  };
  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setMode((m) => (m === "ai" ? "mentor" : "ai"));
    }
  };

  const who = mode === "ai" ? { text: "Nobody.", tone: "text-red" } : approved ? { text: "Meera Iyer, mentor.", tone: "text-green" } : { text: "A mentor, next.", tone: "text-primary" };

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <p className="font-display text-[clamp(30px,4.6vw,60px)] font-medium leading-[1.04] tracking-[-0.04em]" aria-live="polite">
          Signed off by{" "}
          <span className="relative inline-block min-w-[2ch] align-bottom">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={who.text}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25, ease: EASE }}
                className={clsx("inline-block whitespace-nowrap", who.tone)}
              >
                {who.text}
              </motion.span>
            </AnimatePresence>
          </span>
        </p>

        <div role="tablist" aria-label="Who signs off" onKeyDown={onTabKey} className="inline-flex shrink-0 self-start rounded-full border border-edge bg-panel p-1 lg:self-auto">
          {(
            [
              ["ai", "AI alone"],
              ["mentor", "AI + mentor"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              role="tab"
              id={`${uid}-tab-${m}`}
              aria-selected={mode === m}
              aria-controls={`${uid}-panel`}
              tabIndex={mode === m ? 0 : -1}
              onClick={() => setMode(m)}
              className={clsx(
                "relative min-h-[40px] rounded-full px-5 text-[14px] font-semibold transition-colors duration-200",
                mode === m ? "text-white" : "text-fg-muted hover:text-fg",
              )}
            >
              {mode === m ? <motion.span layoutId={`${uid}-pill`} transition={{ type: "spring", stiffness: 400, damping: 34 }} className={clsx("absolute inset-0 -z-0 rounded-full", m === "ai" ? "bg-red" : "bg-navy")} /> : null}
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${mode}`} className="mt-10 grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)_auto_minmax(0,1fr)] lg:gap-4">
        {/* 1 · the AI draft */}
        <Card step="1" title="AI draft" badge={<StatusBadge tone="primary">Written against your rubric</StatusBadge>}>
          <ul className="space-y-1.5">
            {RUBRIC.map((r) => (
              <li key={r.key} className="flex items-center justify-between text-[13px]">
                <span className="text-fg-muted">{r.label}</span>
                <span className="font-mono tabular-nums">
                  {r.ai}/{r.max}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 border-t border-edge pt-4">
            <ScoreRing value={aiTotal} max={MAX_TOTAL} size={58} />
            <p className="text-[12.5px] leading-snug text-fg-muted">&ldquo;Only one example found. Add a case or a recent example.&rdquo;</p>
          </div>
        </Card>

        <Connector skipped={mode === "ai"} />

        {/* 2 · the mentor */}
        {mode === "mentor" ? (
          <Card step="2" title="Mentor review" accent badge={<Mentor />}>
            <ul className="space-y-1">
              {RUBRIC.map((r, i) => {
                const changed = marks[i] !== r.ai;
                return (
                  <li key={r.key} className={clsx("flex items-center justify-between gap-2 rounded-lg px-2 py-1 transition-colors duration-300", changed && "bg-primary-tint")}>
                    <span className="text-[13px] font-medium">{r.label}</span>
                    <span className="flex items-center gap-1.5">
                      <Stepper label={`Decrease ${r.label}`} onClick={() => change(i, -1)} disabled={marks[i] <= 0}>
                        <Minus aria-hidden className="h-3.5 w-3.5" />
                      </Stepper>
                      <span className="w-[46px] text-center font-mono text-[13px] tabular-nums">
                        <motion.span key={marks[i]} initial={{ scale: 1.25, color: "rgb(var(--primary))" }} animate={{ scale: 1, color: "rgb(var(--foreground))" }} transition={{ duration: 0.35 }} className="inline-block">
                          {marks[i]}
                        </motion.span>
                        <span className="text-fg-muted">/{r.max}</span>
                      </span>
                      <Stepper label={`Increase ${r.label}`} onClick={() => change(i, 1)} disabled={marks[i] >= r.max}>
                        <Plus aria-hidden className="h-3.5 w-3.5" />
                      </Stepper>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-[12px] leading-snug text-fg-muted">
              {edited ? "Changed from the draft. The student will see these marks." : "Tip: the draft missed Art. 39 on the page. Raise Examples to 4."}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-edge pt-4">
              <span className="font-display text-[26px] font-semibold tabular-nums leading-none">
                {mentorTotal}
                <span className="text-[14px] text-fg-muted">/{MAX_TOTAL}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Reset the demo"
                  className="grid h-[38px] w-[38px] place-items-center rounded-lg border border-edge-strong text-fg-muted transition hover:-translate-y-px hover:border-primary hover:text-primary"
                >
                  <RotateCcw aria-hidden className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setApproved(true)}
                  disabled={approved}
                  className={clsx(
                    "inline-flex min-h-[38px] items-center gap-1.5 rounded-lg px-4 text-[13.5px] font-semibold transition duration-200 hover:-translate-y-px active:translate-y-px",
                    approved ? "bg-green text-white" : "bg-navy text-white hover:bg-primary",
                  )}
                >
                  {approved ? <Check aria-hidden className="h-4 w-4" /> : null}
                  {approved ? "Approved" : "Approve"}
                </button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="flex min-h-[200px] flex-col justify-center rounded-[20px] border border-dashed border-red/50 bg-red-tint/50 p-5 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-red">Step 2 · skipped</p>
            <p className="mt-2 font-display text-[22px] font-medium leading-tight tracking-tight">No one reads it first.</p>
            <p className="mx-auto mt-2 max-w-[260px] text-[13px] leading-relaxed text-fg-muted">The draft goes straight to the student, whatever it says. That is not how VILMS works.</p>
          </div>
        )}

        <Connector skipped={mode === "mentor" && !approved} locked={mode === "mentor" && !approved} />

        {/* 3 · the student */}
        <Card step="3" title="Student sees" badge={released ? <StatusBadge tone={mode === "ai" ? "gold" : "green"} icon={<Check aria-hidden className="h-3 w-3" />}>{mode === "ai" ? "Released at once" : "Approved"}</StatusBadge> : <StatusBadge tone="muted" icon={<Lock aria-hidden className="h-3 w-3" />}>Not released</StatusBadge>}>
          <AnimatePresence mode="wait" initial={false}>
            {released ? (
              <motion.div key="copy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-faint">Evaluated copy · Q3</p>
                <ul className="mt-2 space-y-1.5">
                  {RUBRIC.map((r, i) => (
                    <li key={r.key} className="flex items-center justify-between text-[13px]">
                      <span className="text-fg-muted">{r.label}</span>
                      <span className={clsx("font-mono tabular-nums", mode === "ai" && r.key === "examples" && "text-red")}>
                        {studentMarks[i]}/{r.max}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-3 border-t border-edge pt-4">
                  <ScoreRing value={sum(studentMarks)} max={MAX_TOTAL} size={58} tone={mode === "mentor" ? "green" : "primary"} />
                  {mode === "ai" ? (
                    <p className="flex items-start gap-1.5 text-[12.5px] leading-snug text-red">
                      <TriangleAlert aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Art. 39 was on the page. The student lost 2 marks and no one noticed.
                    </p>
                  ) : (
                    <p className="flex items-start gap-1.5 text-[12.5px] leading-snug text-green">
                      <ShieldCheck aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Checked and approved by a mentor. Saved to the student&apos;s profile.
                    </p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div key="lock" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="flex min-h-[200px] flex-col items-center justify-center text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-sunken text-fg-muted">
                  <Lock aria-hidden className="h-5 w-5" />
                </span>
                <p className="mt-3 font-display text-[19px] font-medium tracking-tight">Nothing yet.</p>
                <p className="mt-1 max-w-[220px] text-[12.5px] leading-relaxed text-fg-muted">The student sees the evaluated copy only after you press Approve.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      <Illustrative className="mt-6" />
    </div>
  );
}

function Card({ step, title, badge, accent, children }: { step: string; title: string; badge?: React.ReactNode; accent?: boolean; children: React.ReactNode }) {
  return (
    <section className={clsx("flex min-w-0 flex-col rounded-[20px] border bg-panel p-5 shadow-soft", accent ? "border-primary/40" : "border-edge")}>
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-[14px] font-semibold">
          <span className="font-mono text-[11px] text-fg-faint">{step}</span>
          {title}
        </h3>
        {badge}
      </header>
      {children}
    </section>
  );
}

function Connector({ skipped, locked }: { skipped?: boolean; locked?: boolean }) {
  const cls = clsx("mx-auto h-5 w-5 transition-colors duration-300", skipped ? "text-red" : "text-fg-faint");
  return (
    <span aria-hidden className="grid place-items-center">
      <ArrowDown className={clsx(cls, "lg:hidden")} />
      {locked ? <Lock className={clsx(cls, "hidden lg:block")} /> : <ArrowRight className={clsx(cls, "hidden lg:block")} />}
    </span>
  );
}

function Stepper({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-7 w-7 place-items-center rounded-md border border-edge-strong bg-panel text-fg-muted transition duration-150 hover:-translate-y-px hover:border-primary hover:text-primary active:translate-y-px disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
