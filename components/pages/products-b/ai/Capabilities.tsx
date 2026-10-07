"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, ListChecks, Minus, Plus, ScanText, UserRound, X } from "lucide-react";
import { Avatar, Illustrative, Pill } from "@/components/marketing/screens/primitives";
import { swap } from "@/components/site-ui/motion-tokens";
import { FINAL_TOTAL, MAX_TOTAL, RUBRIC } from "./data";
import { AnswerSheet } from "./paper";
import { CriterionBar } from "./ui";

const ITEMS = [
  { id: "rubric", title: "Your rubric, your marks", text: "Set the criteria and the marks for each. Mentors score against them, and the AI draft is written against the same rubric." },
  { id: "mcq", title: "MCQs mark themselves", text: "Objective questions are graded the moment the test ends, in the same test as long-form and handwritten answers." },
  { id: "copy", title: "One evaluated copy", text: "Marks, comments and rubric together, on the student's own page." },
  { id: "profile", title: "Grades on the profile", text: "Every result is saved to the student's record, next to their orders and certificates." },
] as const;
type Id = (typeof ITEMS)[number]["id"];

export function Capabilities() {
  const uid = useId();
  const [active, setActive] = useState<Id>("rubric");
  const idx = ITEMS.findIndex((i) => i.id === active);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (idx + (e.key === "ArrowDown" ? 1 : ITEMS.length - 1)) % ITEMS.length;
      setActive(ITEMS[next].id);
      document.getElementById(`${uid}-tab-${ITEMS[next].id}`)?.focus();
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
      <div role="tablist" aria-orientation="vertical" aria-label="Evaluation features" onKeyDown={onKey} className="divide-y divide-edge border-y border-edge self-start">
        {ITEMS.map((it, i) => {
          const on = it.id === active;
          return (
            <button
              key={it.id}
              id={`${uid}-tab-${it.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(it.id)}
              onMouseEnter={(e) => {
                if (window.matchMedia("(hover: hover)").matches && e.currentTarget.getAttribute("aria-selected") !== "true") setActive(it.id);
              }}
              className="group relative flex w-full gap-4 py-5 pr-2 text-left"
            >
              <span aria-hidden className={clsx("absolute inset-y-0 left-0 w-[2px] origin-top transition-transform duration-300", on ? "scale-y-100 bg-navy" : "scale-y-0 bg-edge-strong group-hover:scale-y-100")} />
              <span className={clsx("pl-5 font-mono text-[12px] tabular-nums transition-colors", on ? "text-primary" : "text-fg-faint")}>{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className={clsx("block text-[20px] font-medium tracking-[-0.015em] transition-colors", on ? "text-fg" : "text-fg-muted group-hover:text-fg")}>{it.title}</span>
                <span className={clsx("grid overflow-hidden text-[14.5px] leading-relaxed text-fg-muted transition-all duration-300", on ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <span className="min-h-0">{it.text}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="min-w-0">
        <div className="relative min-h-[420px] rounded-[24px] border border-edge bg-canvas-alt p-4 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} {...swap}>
              {active === "rubric" ? <RubricBuilder /> : active === "mcq" ? <McqResults /> : active === "copy" ? <EvaluatedCopy /> : <ProfileGrades />}
            </motion.div>
          </AnimatePresence>
        </div>
        <Illustrative className="mt-3" />
      </div>
    </div>
  );
}

/* ---------- 1 · rubric builder (interactive) ---------- */
type Crit = { id: number; name: string; max: number };
const EXTRA = ["Presentation", "Relevance", "Conclusion"];

function RubricBuilder() {
  const [crits, setCrits] = useState<Crit[]>(RUBRIC.map((r, i) => ({ id: i, name: r.label, max: r.max })));
  const [nextId, setNextId] = useState(RUBRIC.length);
  const total = crits.reduce((t, c) => t + c.max, 0);
  const canAdd = crits.length < 6;

  const bump = (id: number, d: number) => setCrits((cs) => cs.map((c) => (c.id === id ? { ...c, max: Math.min(10, Math.max(1, c.max + d)) } : c)));
  const add = () => {
    const name = EXTRA.find((n) => !crits.some((c) => c.name === n)) ?? `Criterion ${nextId + 1}`;
    setCrits((cs) => [...cs, { id: nextId, name, max: 2 }]);
    setNextId((n) => n + 1);
  };

  return (
    <div className="rounded-2xl border border-edge bg-panel p-4 shadow-window sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-faint">Rubric · Q3 long answer</p>
          <p className="mt-0.5 text-[15px] font-semibold">Directive Principles</p>
        </div>
        <div className="text-right">
          <p className="font-display text-[34px] font-semibold leading-none tabular-nums tracking-tight">
            <motion.span key={total} initial={{ opacity: 0.4, y: -6 }} animate={{ opacity: 1, y: 0 }} className="inline-block">
              {total}
            </motion.span>
          </p>
          <p className="text-[11px] text-fg-muted">marks in total</p>
        </div>
      </div>

      {/* how the marks are split */}
      <div aria-hidden className="mt-4 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
        {crits.map((c, i) => (
          <motion.span key={c.id} layout transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ flexGrow: c.max }} className={clsx("min-w-[6px] flex-1", ["bg-navy", "bg-primary", "bg-sky", "bg-silver", "bg-gold", "bg-green"][i % 6])} />
        ))}
      </div>

      <ul className="mt-4 space-y-1.5">
        <AnimatePresence initial={false}>
          {crits.map((c, i) => (
            <motion.li key={c.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <div className="flex items-center gap-3 rounded-xl border border-edge bg-canvas px-3 py-2">
                <span aria-hidden className={clsx("h-2.5 w-2.5 shrink-0 rounded-full", ["bg-navy", "bg-primary", "bg-sky", "bg-silver", "bg-gold", "bg-green"][i % 6])} />
                <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{c.name}</span>
                <button type="button" aria-label={`Fewer marks for ${c.name}`} onClick={() => bump(c.id, -1)} disabled={c.max <= 1} className="grid h-7 w-7 place-items-center rounded-md border border-edge-strong text-fg-muted transition hover:-translate-y-px hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-35">
                  <Minus aria-hidden className="h-3.5 w-3.5" />
                </button>
                <span className="w-9 text-center font-mono text-[13px] tabular-nums">{c.max}</span>
                <button type="button" aria-label={`More marks for ${c.name}`} onClick={() => bump(c.id, 1)} disabled={c.max >= 10} className="grid h-7 w-7 place-items-center rounded-md border border-edge-strong text-fg-muted transition hover:-translate-y-px hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-35">
                  <Plus aria-hidden className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label={`Remove ${c.name}`}
                  onClick={() => setCrits((cs) => cs.filter((x) => x.id !== c.id))}
                  disabled={crits.length <= 1}
                  className="grid h-7 w-7 place-items-center rounded-md text-fg-faint transition hover:bg-red-tint hover:text-red disabled:pointer-events-none disabled:opacity-30"
                >
                  <X aria-hidden className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={add} disabled={!canAdd} className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-dashed border-edge-strong px-4 text-[13px] font-semibold text-primary transition hover:-translate-y-px hover:border-primary hover:bg-primary-tint disabled:pointer-events-none disabled:opacity-40">
          <Plus aria-hidden className="h-4 w-4" /> Add a criterion
        </button>
        <p className="flex items-center gap-1.5 text-[12px] text-fg-muted">
          <ScanText aria-hidden className="h-3.5 w-3.5 text-primary" /> The AI draft uses this rubric too
        </p>
      </div>
    </div>
  );
}

/* ---------- 2 · MCQs + long answers in one test ---------- */
const MCQ = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1];
function McqResults() {
  const right = MCQ.filter(Boolean).length;
  return (
    <div className="rounded-2xl border border-edge bg-panel p-4 shadow-window sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-semibold">Mock Test 1 · Rahul Kumar</p>
        <Pill tone="primary">2 sections</Pill>
      </div>

      <div className="mt-4 rounded-xl border border-edge p-3.5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-[13px] font-semibold">
            <ListChecks aria-hidden className="h-4 w-4 text-primary" /> A · Multiple choice
          </p>
          <Pill tone="green">
            <Check aria-hidden className="h-3 w-3" /> Marked instantly
          </Pill>
        </div>
        <ul className="mt-3 grid grid-cols-5 gap-1.5 sm:grid-cols-10">
          {MCQ.map((ok, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 * i, type: "spring", stiffness: 380, damping: 22 }}
              className={clsx("grid aspect-square place-items-center rounded-lg text-[11px] font-semibold", ok ? "bg-green-tint text-green" : "bg-red-tint text-red")}
            >
              {ok ? <Check aria-hidden className="h-3.5 w-3.5" /> : <X aria-hidden className="h-3.5 w-3.5" />}
              <span className="sr-only">
                Question {i + 1} {ok ? "correct" : "wrong"}
              </span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-[12px] text-fg-muted">
          {right}/{MCQ.length} · no mentor needed
        </p>
      </div>

      <div className="mt-3 rounded-xl border border-edge p-3.5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-[13px] font-semibold">
            <ScanText aria-hidden className="h-4 w-4 text-primary" /> B · Handwritten long answers
          </p>
          <Pill tone="yellow">Mentor review</Pill>
        </div>
        <ul className="mt-3 space-y-1.5 text-[12.5px]">
          {[
            ["Q3 · Directive Principles", "AI draft ready"],
            ["Q4 · Federalism", "AI is reading"],
          ].map(([q, s]) => (
            <li key={q} className="flex items-center justify-between rounded-lg bg-canvas-alt px-3 py-2">
              <span>{q}</span>
              <span className="text-fg-muted">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- 3 · the evaluated copy ---------- */
function EvaluatedCopy() {
  return (
    <div className="grid gap-4 rounded-2xl border border-edge bg-panel p-4 shadow-window sm:grid-cols-[1.1fr_0.9fr] sm:p-5">
      <AnswerSheet compact lit={{ content: true, structure: true, examples: true, gap: true, mentor: true }} notes={{ content: true, examples: true, gap: true, mentor: true }} stamp={FINAL_TOTAL} />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-faint">Rubric</p>
        <div className="mt-2 space-y-0.5">
          {RUBRIC.map((r) => (
            <CriterionBar key={r.key} label={r.label} value={r.final} max={r.max} tone="green" />
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-canvas-alt p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-faint">Mentor comment</p>
          <p className="mt-1 text-[12.5px] leading-snug text-fg-muted">Clear on both causes. Art. 39 also counts as an example. Add a recent case next time.</p>
        </div>
        <p className="mt-3 font-display text-[28px] font-semibold tabular-nums leading-none">
          {FINAL_TOTAL}
          <span className="text-[14px] text-fg-muted">/{MAX_TOTAL}</span>
        </p>
      </div>
    </div>
  );
}

/* ---------- 4 · the student's profile ---------- */
const GRADES = [
  { t: "Weekly test 1", s: 11 },
  { t: "Weekly test 2", s: 12 },
  { t: "Weekly test 3", s: 14 },
  { t: "Weekly test 4", s: 13 },
  { t: "Mock Test 1 · Q3", s: FINAL_TOTAL, fresh: true },
];
function ProfileGrades() {
  const X = (i: number) => (i / (GRADES.length - 1)) * 200;
  const Y = (s: number) => 100 - ((s - 8) / (MAX_TOTAL - 8)) * 100;
  const pts = GRADES.map((g, i) => `${X(i)},${Y(g.s)}`).join(" ");
  return (
    <div className="rounded-2xl border border-edge bg-panel p-4 shadow-window sm:p-5">
      <div className="flex items-center gap-3">
        <Avatar name="Rahul Kumar" size="lg" tone={0} />
        <div className="min-w-0">
          <p className="truncate text-[16px] font-semibold">Rahul Kumar</p>
          <p className="truncate text-[12.5px] text-fg-muted">Prelims Foundation · Batch A</p>
        </div>
        <UserRound aria-hidden className="ml-auto h-5 w-5 text-fg-faint" />
      </div>
      <div className="mt-4 flex gap-1 border-b border-edge text-[13px]">
        {["Grades", "Orders", "Certificates"].map((t, i) => (
          <span key={t} className={clsx("-mb-px border-b-2 px-3 pb-2 font-medium", i === 0 ? "border-navy text-fg" : "border-transparent text-fg-muted")}>
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_0.8fr]">
        <ul className="space-y-1.5">
          {GRADES.map((g, i) => (
            <motion.li
              key={g.t}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className={clsx("flex items-center justify-between rounded-lg px-3 py-2 text-[13px]", g.fresh ? "bg-green-tint font-semibold" : "bg-canvas-alt")}
            >
              <span className="truncate">{g.t}</span>
              <span className="flex items-center gap-2 font-mono tabular-nums">
                {g.fresh ? <Pill tone="green">just saved</Pill> : null}
                {g.s}/{MAX_TOTAL}
              </span>
            </motion.li>
          ))}
        </ul>
        <div className="rounded-xl border border-edge p-3">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-fg-faint">Trend</p>
          <svg viewBox="-8 -8 216 116" className="mt-2 h-24 w-full" role="img" aria-label="Scores rising across five tests">
            <polyline points={pts} fill="none" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {GRADES.map((g, i) => (
              <circle key={g.t} cx={X(i)} cy={Y(g.s)} r="4.5" className={g.fresh ? "fill-green" : "fill-primary"} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
