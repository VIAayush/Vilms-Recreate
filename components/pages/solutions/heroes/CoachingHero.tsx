"use client";

import { useReducer, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, ClipboardCheck } from "lucide-react";
import { Avatar, Illustrative, InstituteMark, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { Bar, useLoopGate, useTicker } from "../kit";

// Coaching hero: a batch board. Three batches with their students, trainers,
// next test and course completion, beside a live feed of student activity.
// Every event in the feed updates its batch: a student joining adds to the
// count, a finished lesson moves completion. Sample data throughout.

type Batch = { name: string; batch: string; mode: string; students: number; completion: number; trainers: string[]; next: string; test: string };

const BATCHES: Batch[] = [
  { name: "JEE Crash Course", batch: "Batch A", mode: "Online + classroom", students: 38, completion: 62, trainers: ["Meera Iyer", "Arun K."], next: "Physics · Thu 7:00 PM", test: "Mock test 4 · Sat" },
  { name: "NEET Foundation", batch: "Batch B", mode: "Online", students: 44, completion: 48, trainers: ["Sana P.", "Vikram R."], next: "Biology · Wed 6:30 PM", test: "Weekly quiz 6 · Fri" },
  { name: "Prelims Foundation", batch: "Batch C", mode: "Online + classroom", students: 27, completion: 71, trainers: ["Meera Iyer", "Neha G."], next: "Polity · Tue 7:00 PM", test: "Mock test 2 · Sun" },
];

const KINDS = [
  { id: "join", label: "Enrolment", verb: "joined the batch", tone: "primary" as const },
  { id: "lesson", label: "Progress", verb: "completed Lesson 3", tone: "green" as const },
  { id: "test", label: "Assessment", verb: "submitted Mock test 4", tone: "yellow" as const },
];
const POOL = [
  { name: "Priya S.", k: 0, b: 0 },
  { name: "Aman V.", k: 1, b: 2 },
  { name: "Isha M.", k: 2, b: 1 },
  { name: "Karan S.", k: 1, b: 0 },
  { name: "Divya R.", k: 0, b: 1 },
  { name: "Arjun T.", k: 2, b: 2 },
];

type Item = { id: number; name: string; k: number; b: number };
type State = { students: number[]; completion: number[]; feed: Item[]; next: number; pulse: { b: number; t: number } | null; t: number };

const initial: State = {
  students: BATCHES.map((b) => b.students),
  completion: BATCHES.map((b) => b.completion),
  feed: [
    { id: 102, name: "Neha K.", k: 1, b: 2 },
    { id: 101, name: "Rahul K.", k: 2, b: 0 },
    { id: 100, name: "Sneha P.", k: 0, b: 1 },
  ],
  next: 0,
  pulse: null,
  t: 0,
};

function advance(s: State): State {
  const p = POOL[s.next % POOL.length];
  const students = [...s.students];
  const completion = [...s.completion];
  if (p.k === 0) students[p.b] += 1;
  if (p.k === 1) completion[p.b] = Math.min(99, completion[p.b] + 1);
  const t = s.t + 1;
  return { students, completion, feed: [{ id: s.next, name: p.name, k: p.k, b: p.b }, ...s.feed].slice(0, 4), next: s.next + 1, pulse: { b: p.b, t }, t };
}

export function CoachingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { running } = useLoopGate(ref);
  const [state, tick] = useReducer(advance, initial);
  const [sel, setSel] = useState(0);
  const picked = useRef(false);

  useTicker(() => tick(), 2000, running);
  useTicker(() => !picked.current && setSel((s) => (s + 1) % BATCHES.length), 5600, running);

  const pick = (i: number) => {
    picked.current = true;
    setSel(i);
  };
  const b = BATCHES[sel];

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-[28px] border border-edge bg-panel shadow-window">
        <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
          <InstituteMark className="h-8 w-8 text-[11px]" />
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold leading-tight">Your Institute</p>
            <p className="text-[11px] text-fg-muted">Batches · students · trainers</p>
          </div>
          <span className="ml-auto whitespace-nowrap rounded-full bg-primary-tint px-2.5 py-1 text-[11px] font-semibold text-primary">{BATCHES.length} batches running</span>
        </div>

        <div className="grid sm:grid-cols-[1.18fr_0.82fr]">
          <div className="min-w-0 p-3 sm:p-4">
            <ul role="tablist" aria-label="Batches" className="space-y-2">
              {BATCHES.map((x, i) => {
                const n = state.students[i];
                const on = i === sel;
                const pulsing = state.pulse?.b === i;
                return (
                  <li key={x.name}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => pick(i)}
                      className={clsx("group w-full rounded-2xl border p-3 text-left transition duration-300", on ? "border-primary bg-primary-tint/50 shadow-soft" : "border-edge hover:-translate-y-0.5 hover:border-primary/50")}
                    >
                      <div className="flex items-center gap-2">
                        <p className="min-w-0 flex-1 truncate text-[13.5px] font-semibold">
                          {x.name} <span className="font-normal text-fg-muted">· {x.batch}</span>
                        </p>
                        <Pill tone={on ? "primary" : "muted"}>{x.mode}</Pill>
                      </div>
                      <div className="mt-2.5 flex items-center gap-3">
                        <Bar value={state.completion[i] / 100} className="flex-1" />
                        <span key={pulsing ? state.pulse?.t : "idle"} className={clsx("whitespace-nowrap font-mono text-[11.5px] tabular-nums", pulsing && "animate-pop-in font-semibold text-primary")}>
                          {n} students
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="relative mt-3 min-h-[148px] rounded-2xl bg-canvas-alt p-3.5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={sel}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  className="grid grid-cols-2 gap-x-3 gap-y-3.5 text-[12px]"
                >
                  <div>
                    <p className="flex items-center gap-1.5 text-[10.5px] text-fg-muted">
                      <BookOpen aria-hidden className="h-3 w-3 text-primary" /> Next class
                    </p>
                    <p className="mt-0.5 font-semibold">{b.next}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[10.5px] text-fg-muted">
                      <ClipboardCheck aria-hidden className="h-3 w-3 text-primary" /> Next test
                    </p>
                    <p className="mt-0.5 font-semibold">{b.test}</p>
                  </div>
                  <div>
                    <p className="text-[10.5px] text-fg-muted">Course completion</p>
                    <p className="mt-0.5 font-display text-[24px] font-semibold leading-none tabular-nums tracking-tight">{state.completion[sel]}%</p>
                    <p className="mt-1 text-[10.5px] text-fg-muted">across {state.students[sel]} students</p>
                  </div>
                  <div>
                    <p className="text-[10.5px] text-fg-muted">Trainers</p>
                    <ul className="mt-1 space-y-1">
                      {b.trainers.map((t, i) => (
                        <li key={t} className="flex items-center gap-1.5 font-medium">
                          <Avatar name={t} size="sm" tone={i + 2} /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="min-w-0 border-t border-edge bg-canvas-alt p-3 sm:border-l sm:border-t-0 sm:p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold">Student activity</p>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-faint">live</span>
            </div>
            <ul className="mt-3 space-y-2">
              <AnimatePresence initial={false} mode="popLayout">
                {state.feed.map((it) => {
                  const kind = KINDS[it.k];
                  return (
                    <motion.li
                      key={it.id}
                      layout
                      initial={{ opacity: 0, y: -14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="rounded-xl border border-edge bg-panel p-2.5"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar name={it.name} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12.5px] font-semibold leading-tight">{it.name}</p>
                          <p className="truncate text-[10.5px] text-fg-muted">
                            {kind.verb} · {BATCHES[it.b].batch}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Pill tone={kind.tone}>{kind.label}</Pill>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
            <p className="mt-3 text-[11px] leading-snug text-fg-muted">Every event updates the batch&rsquo;s students and progress.</p>
          </div>
        </div>
      </div>
      <Illustrative className="mt-3 text-center lg:text-left" />
    </div>
  );
}
