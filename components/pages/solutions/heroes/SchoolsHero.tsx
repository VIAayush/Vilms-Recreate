"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Avatar, Illustrative, InstituteMark, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { Bar } from "../kit";

// Schools & colleges hero: course and subject management. Learning content is
// structured by class, department or learner group; switch the grouping, pick
// a group and filter its students by progress. Sample data throughout.

const GROUPINGS = ["Classes", "Departments", "Learner groups"] as const;
type Grouping = (typeof GROUPINGS)[number];

const GROUPS: Record<Grouping, { n: string; subjects: string; educator: string }[]> = {
  Classes: [
    { n: "Class 9", subjects: "Science · Maths · English", educator: "Dr. Meera Iyer" },
    { n: "Class 10", subjects: "Science · Maths · Social studies", educator: "Arun Khanna" },
    { n: "Class 11", subjects: "Physics · Chemistry · Maths", educator: "Sana Pathan" },
  ],
  Departments: [
    { n: "Science", subjects: "Physics · Chemistry · Biology", educator: "Dr. Meera Iyer" },
    { n: "Commerce", subjects: "Accounts · Economics", educator: "Vikram Rao" },
    { n: "Humanities", subjects: "History · Civics · English", educator: "Neha Gupta" },
  ],
  "Learner groups": [
    { n: "Foundation group", subjects: "Core concepts · practice sets", educator: "Arun Khanna" },
    { n: "Revision group", subjects: "Recap lessons · quizzes", educator: "Dr. Meera Iyer" },
    { n: "Advanced group", subjects: "Extension lessons · assessments", educator: "Sana Pathan" },
  ],
};

const LEARNERS = [
  { n: "Rahul Kumar", pct: 78, score: "78%" },
  { n: "Sneha Patel", pct: 100, score: "84%" },
  { n: "Aman Verma", pct: 41, score: "58%" },
  { n: "Isha Mehta", pct: 66, score: "66%" },
  { n: "Karan Shah", pct: 100, score: "90%" },
  { n: "Divya Rao", pct: 33, score: "—" },
];

const FILTERS = ["All", "Completed", "In progress"] as const;

export function SchoolsHero() {
  const [grouping, setGrouping] = useState<Grouping>("Classes");
  const [sel, setSel] = useState(0);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const groups = GROUPS[grouping];
  const g = groups[sel];
  // each group gets its own spread of progress, from the same sample students
  const rows = LEARNERS.map((l, i) => ({ ...l, pct: l.pct === 100 && sel > 0 && i % 2 ? 90 - sel * 7 : Math.max(12, l.pct - sel * 8) })).filter(
    (l) => filter === "All" || (filter === "Completed" ? l.pct >= 100 : l.pct < 100),
  );
  const avg = (i: number) => Math.round(LEARNERS.reduce((a, l) => a + Math.max(12, l.pct - i * 8), 0) / LEARNERS.length);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[28px] border border-edge bg-panel shadow-window">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-edge px-4 py-3">
          <InstituteMark name="Your School" className="h-9 w-9 text-[12px]" />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold leading-tight">Your School</p>
            <p className="text-[11px] text-fg-muted">Courses, subjects and students</p>
          </div>
          <span className="ml-auto">
            <Pill tone="primary">Online + blended learning</Pill>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-edge bg-canvas-alt px-4 py-2.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Organise by</span>
          <div role="radiogroup" aria-label="Organise by" className="flex rounded-full border border-edge bg-panel p-0.5 text-[12px] font-medium">
            {GROUPINGS.map((x) => (
              <button
                key={x}
                type="button"
                role="radio"
                aria-checked={grouping === x}
                onClick={() => {
                  setGrouping(x);
                  setSel(0);
                }}
                className={clsx("rounded-full px-3 py-1 transition-colors", grouping === x ? "bg-navy text-white" : "text-fg-muted hover:text-fg")}
              >
                {x}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 p-3 sm:grid-cols-[0.9fr_1.1fr] sm:p-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={grouping}
              role="tablist"
              aria-label={grouping}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="min-w-0 space-y-2"
            >
              {groups.map((x, i) => (
                <li key={x.n}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i === sel}
                    onClick={() => setSel(i)}
                    className={clsx("w-full rounded-2xl border p-3 text-left transition duration-300", i === sel ? "border-primary bg-primary-tint/50 shadow-soft" : "border-edge hover:-translate-y-0.5 hover:border-primary/50")}
                  >
                    <p className="text-[13.5px] font-semibold">{x.n}</p>
                    <p className="mt-0.5 truncate text-[11px] text-fg-muted">{x.subjects}</p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <Avatar name={x.educator} size="sm" tone={i + 1} />
                      <span className="min-w-0 flex-1 truncate text-[11px] text-fg-muted">{x.educator}</span>
                      <span className="font-mono text-[11px] tabular-nums">{avg(i)}%</span>
                    </div>
                    <Bar value={avg(i) / 100} className="mt-1.5" />
                  </button>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          <div className="min-w-0 rounded-2xl border border-edge">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-edge px-3 py-2.5">
              <p className="truncate text-[12px] font-semibold">{g.n} · students</p>
              <div role="group" aria-label="Filter by progress" className="flex gap-1">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                    className={clsx("rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors", filter === f ? "bg-primary-tint text-primary" : "text-fg-muted hover:bg-sunken")}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <ul className="min-h-[268px] divide-y divide-edge px-1.5">
              <AnimatePresence initial={false} mode="popLayout">
                {rows.map((s) => (
                  <motion.li
                    key={`${g.n}-${s.n}`}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex items-center gap-2.5 px-1.5 py-2.5 text-[12px]"
                  >
                    <Avatar name={s.n} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate font-semibold">{s.n}</span>
                        <span className="font-mono text-[11px] tabular-nums text-fg-muted">{s.pct}%</span>
                      </span>
                      <Bar value={s.pct / 100} tone={s.pct >= 100 ? "green" : "primary"} className="mt-1.5" />
                      <span className="mt-1 block text-[10.5px] text-fg-muted">Last assessment {s.score}</span>
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
      <Illustrative className="mt-3 text-center lg:text-left" />
    </div>
  );
}
