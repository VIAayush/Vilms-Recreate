"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Award, Check } from "lucide-react";
import { Illustrative, InstituteMark, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { Bar, useLoopGate, useTicker, useTween } from "../kit";

// Training hero: a programme catalogue. Pick a programme to see its batches on
// a week grid — one finished, one running, one enrolling — and the completions
// counter beside it. While it plays, learners in the running batch finish one
// by one and a certificate is provided for each. Sample data throughout.

type Cohort = { n: string; state: "done" | "running" | "enrolling"; start: number; len: number; learners: number };
type Programme = { id: string; name: string; fmt: "Online" | "Blended" | "Classroom"; weeks: number; trainer: string; cohorts: Cohort[]; issued: number; seats: number; filled: number };

const PROGRAMMES: Programme[] = [
  {
    id: "sales",
    name: "Sales Fundamentals",
    fmt: "Online",
    weeks: 6,
    trainer: "Meera Iyer",
    cohorts: [
      { n: "Batch 1", state: "done", start: 0, len: 6, learners: 24 },
      { n: "Batch 2", state: "running", start: 4, len: 6, learners: 18 },
      { n: "Batch 3", state: "enrolling", start: 9, len: 6, learners: 0 },
    ],
    issued: 24,
    seats: 30,
    filled: 17,
  },
  {
    id: "excel",
    name: "Advanced Excel",
    fmt: "Blended",
    weeks: 4,
    trainer: "Arun Khanna",
    cohorts: [
      { n: "Batch 1", state: "done", start: 0, len: 4, learners: 30 },
      { n: "Batch 2", state: "running", start: 3, len: 4, learners: 20 },
      { n: "Batch 3", state: "enrolling", start: 8, len: 4, learners: 0 },
    ],
    issued: 30,
    seats: 30,
    filled: 22,
  },
  {
    id: "english",
    name: "Spoken English Pro",
    fmt: "Classroom",
    weeks: 8,
    trainer: "Sana Pathan",
    cohorts: [
      { n: "Batch 1", state: "done", start: 0, len: 8, learners: 28 },
      { n: "Batch 2", state: "running", start: 5, len: 8, learners: 16 },
      { n: "Batch 3", state: "enrolling", start: 10, len: 6, learners: 0 },
    ],
    issued: 28,
    seats: 25,
    filled: 9,
  },
  {
    id: "safety",
    name: "Workplace Safety",
    fmt: "Online",
    weeks: 3,
    trainer: "Vikram Rao",
    cohorts: [
      { n: "Batch 1", state: "done", start: 0, len: 3, learners: 40 },
      { n: "Batch 2", state: "running", start: 2, len: 3, learners: 25 },
      { n: "Batch 3", state: "enrolling", start: 6, len: 3, learners: 0 },
    ],
    issued: 40,
    seats: 40,
    filled: 31,
  },
];

const NAMES = ["Rahul Kumar", "Sneha Patel", "Aman Verma", "Isha Mehta", "Karan Shah", "Divya Rao", "Arjun Thapar", "Neha Gupta"];
const WEEKS = 15;

export function TrainingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { running } = useLoopGate(ref);
  const [sel, setSel] = useState(0);
  const picked = useRef(false);
  const [done, setDone] = useState<number[]>(PROGRAMMES.map(() => 0)); // learners finished in the running cohort
  const [stamp, setStamp] = useState(0);

  const p = PROGRAMMES[sel];
  const run = p.cohorts[1];
  const finished = done[sel];
  const issued = p.issued + finished;
  const shownIssued = useTween(issued, 500);

  useTicker(
    () => {
      setDone((d) => d.map((v, i) => (i === sel ? (v >= PROGRAMMES[i].cohorts[1].learners ? 0 : v + 1) : v)));
      setStamp((s) => s + 1);
    },
    1700,
    running,
  );
  useTicker(() => !picked.current && setSel((s) => (s + 1) % PROGRAMMES.length), 7200, running);

  const pick = (i: number) => {
    picked.current = true;
    setSel(i);
  };
  const progress = finished / run.learners;
  const learner = NAMES[(finished + sel) % NAMES.length];

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-[28px] border border-edge bg-panel shadow-window">
        <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
          <InstituteMark name="Your Training Institute" className="h-8 w-8 text-[11px]" />
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold leading-tight">Your Training Institute</p>
            <p className="text-[11px] text-fg-muted">Programme catalogue</p>
          </div>
          <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-faint">{PROGRAMMES.length} programmes</span>
        </div>

        <div className="grid sm:grid-cols-[0.86fr_1.14fr]">
          {/* ---------- catalogue ---------- */}
          <ul role="tablist" aria-label="Programmes" className="min-w-0 space-y-1.5 p-3 sm:p-4">
            {PROGRAMMES.map((x, i) => {
              const on = i === sel;
              return (
                <li key={x.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => pick(i)}
                    className={clsx(
                      "w-full rounded-2xl border p-3 text-left transition duration-300",
                      on ? "border-primary bg-primary-tint/50 shadow-soft" : "border-edge hover:-translate-y-0.5 hover:border-primary/50",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 text-[13.5px] font-semibold leading-snug">{x.name}</p>
                      <Pill tone={on ? "primary" : "muted"}>{x.fmt}</Pill>
                    </div>
                    <p className="mt-1.5 flex items-center gap-2 text-[11.5px] text-fg-muted">
                      <span>{x.weeks} weeks</span>
                      <span aria-hidden className="h-1 w-1 rounded-full bg-edge-strong" />
                      <span>{x.trainer}</span>
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ---------- cohorts + certificates ---------- */}
          <div className="min-w-0 border-t border-edge bg-canvas-alt p-3 sm:border-l sm:border-t-0 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="min-w-0 truncate text-[12.5px] font-semibold">{p.name} · batches</p>
              <span className="shrink-0 font-mono text-[10.5px] text-fg-faint">weeks</span>
            </div>

            <div className="mt-2.5 rounded-xl border border-edge bg-panel p-2.5">
              <div aria-hidden className="grid text-[9px] text-fg-faint" style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}>
                {Array.from({ length: WEEKS }, (_, w) => (
                  <span key={w} className="font-mono">
                    {w % 4 === 0 ? w + 1 : ""}
                  </span>
                ))}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="mt-1.5 space-y-2">
                  {p.cohorts.map((c) => (
                    <li key={c.n}>
                      <div className="grid items-center" style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}>
                        <div
                          className={clsx(
                            "relative flex h-7 items-center overflow-hidden rounded-lg px-2 text-[10.5px] font-semibold",
                            c.state === "done" && "bg-green-tint text-green",
                            c.state === "running" && "bg-primary-tint text-primary",
                            c.state === "enrolling" && "border border-dashed border-primary/60 text-primary",
                          )}
                          style={{ gridColumn: `${c.start + 1} / span ${Math.min(c.len, WEEKS - c.start)}` }}
                        >
                          {c.state === "running" ? <span aria-hidden className="absolute inset-y-0 left-0 bg-primary/25 transition-[width] duration-700 ease-out" style={{ width: `${progress * 100}%` }} /> : null}
                          <span className="relative flex items-center gap-1 truncate">
                            {c.state === "done" ? <Check aria-hidden className="h-3 w-3 shrink-0" strokeWidth={3} /> : null}
                            {c.n}
                          </span>
                        </div>
                      </div>
                      <p className="mt-0.5 text-[10.5px] text-fg-muted">
                        {c.state === "done" ? `${c.learners} completed` : c.state === "running" ? `${finished} of ${c.learners} finished` : `${p.filled} learners enrolled`}
                      </p>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            <div className="mt-3 grid grid-cols-[1fr_1.15fr] items-stretch gap-3">
              <div className="rounded-xl border border-edge bg-panel p-3">
                <p className="text-[10.5px] text-fg-muted">Completions tracked</p>
                <p className="mt-1 font-display text-[34px] font-semibold leading-none tabular-nums tracking-tight">{shownIssued}</p>
                <Bar value={p.filled / p.seats} tone="primary" className="mt-3" />
                <p className="mt-1.5 text-[10.5px] text-fg-muted">
                  Next batch · {p.filled} learners enrolled
                </p>
              </div>
              <div className="relative min-h-[112px] overflow-hidden rounded-xl border border-dashed border-edge-strong bg-panel p-2.5 text-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={`${stamp}-${learner}`}
                    initial={{ opacity: 0, y: 18, rotate: -3, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <Award aria-hidden className="mx-auto h-4 w-4 text-gold" />
                    <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-fg-muted">Certificate of completion</p>
                    <p className="mt-1 truncate font-serif text-[19px] italic leading-tight">{learner}</p>
                    <p className="truncate text-[10.5px] text-fg-muted">{p.name}</p>
                    <p className="mt-1 text-[9.5px] text-fg-faint">Provided by Your Training Institute</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Illustrative className="mt-3 text-center lg:text-left" />
    </div>
  );
}
