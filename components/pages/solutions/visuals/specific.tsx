"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ClipboardCheck, Users, Video } from "lucide-react";
import { Avatar, LiveDot, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { Bar, Panel } from "../kit";

const swapIn = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } }, exit: { opacity: 0, transition: { duration: 0.1 } } };

/* =========================================================================
   Coaching — Batch Management: a batch's week
   ========================================================================= */

type Slot = { id: string; day: string; time: string; title: string; kind: "class" | "recorded" | "test"; detail: string };
const WEEK: Slot[] = [
  { id: "mon", day: "Mon", time: "7:00 AM", title: "Mechanics", kind: "recorded", detail: "Recorded lesson in the batch's course, with notes attached." },
  { id: "tue", day: "Tue", time: "7:00 PM", title: "Organic basics", kind: "class", detail: "Scheduled class for everyone in the batch." },
  { id: "wed", day: "Wed", time: "7:00 AM", title: "Calculus drill", kind: "recorded", detail: "Recorded lesson, available to the batch's students." },
  { id: "thu", day: "Thu", time: "7:00 PM", title: "Physics doubts", kind: "class", detail: "Scheduled class for everyone in the batch." },
  { id: "fri", day: "Fri", time: "6:00 PM", title: "Chapter quiz", kind: "test", detail: "Online quiz. Results appear in student progress." },
  { id: "sat", day: "Sat", time: "10:00 AM", title: "Mock test 4", kind: "test", detail: "Online mock test. Scores appear in reports." },
];

export function BatchWeek() {
  const [sel, setSel] = useState(3);
  const s = WEEK[sel];
  return (
    <Panel title="JEE Crash Course · Batch A" right={<Pill tone="primary">Online + classroom</Pill>}>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {WEEK.map((w, i) => {
          const on = i === sel;
          return (
            <li key={w.id}>
              <button
                type="button"
                onClick={() => setSel(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)}
                aria-pressed={on}
                className={clsx("w-full rounded-xl border p-2.5 text-left transition duration-300", on ? "-translate-y-0.5 border-primary bg-primary-tint/60 shadow-soft" : "border-edge bg-canvas-alt hover:border-primary/40")}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] text-fg-muted">
                    {w.day} · {w.time}
                  </span>
                  {w.kind === "class" ? <LiveDot /> : w.kind === "test" ? <ClipboardCheck aria-hidden className="h-3.5 w-3.5 text-gold" /> : <Video aria-hidden className="h-3.5 w-3.5 text-primary" />}
                </div>
                <p className="mt-1.5 truncate text-[13px] font-semibold">{w.title}</p>
                <p className={clsx("text-[10.5px] font-medium", w.kind === "class" ? "text-red" : w.kind === "test" ? "text-yellow-text" : "text-primary")}>
                  {w.kind === "class" ? "Class" : w.kind === "test" ? "Test" : "Recorded"}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 min-h-[44px] rounded-xl bg-canvas-alt px-3 py-2.5 text-[12.5px] leading-snug">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={s.id} {...swapIn}>
            <span className="font-semibold">{s.title}.</span> <span className="text-fg-muted">{s.detail}</span>
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="mt-3 space-y-2 text-[11.5px]">
        <div className="flex items-center gap-3">
          <span className="w-[112px] text-fg-muted">Students in batch</span>
          <Bar value={38 / 50} className="flex-1" />
          <span className="font-mono tabular-nums">38</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-[112px] text-fg-muted">Course completion</span>
          <Bar value={0.62} tone="green" className="flex-1" />
          <span className="font-mono tabular-nums">62%</span>
        </div>
      </div>
    </Panel>
  );
}

/* =========================================================================
   Test prep — Test Series Management
   ========================================================================= */

const SERIES = [
  { id: "prelims", name: "Prelims Test Series", tests: [["Mock test 1", "Mock test", "Done"], ["Mock test 2", "Mock test", "Done"], ["Weekly quiz 6", "Quiz", "Done"], ["Mock test 3", "Mock test", "Scheduled"]] },
  { id: "gs", name: "General Studies Practice", tests: [["Polity practice set", "Practice exam", "Done"], ["Economy practice set", "Practice exam", "Done"], ["Geography quiz", "Quiz", "Scheduled"]] },
  { id: "aptitude", name: "Aptitude Quizzes", tests: [["Quant quiz 1", "Quiz", "Done"], ["Logic quiz 1", "Quiz", "Done"], ["Verbal quiz 1", "Quiz", "Scheduled"]] },
];

export function TestSeriesList() {
  const [sel, setSel] = useState(0);
  const s = SERIES[sel];
  return (
    <div className="grid gap-3 sm:grid-cols-[0.85fr_1.15fr]">
      <Panel title="Test series" bodyClassName="p-2">
        <ul role="tablist" aria-label="Test series" className="space-y-1">
          {SERIES.map((x, i) => (
            <li key={x.id}>
              <button
                type="button"
                role="tab"
                aria-selected={i === sel}
                onClick={() => setSel(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)}
                className={clsx("w-full rounded-xl border px-2.5 py-2.5 text-left transition", i === sel ? "border-primary bg-primary-tint/60" : "border-transparent hover:bg-canvas-alt")}
              >
                <span className="block truncate text-[12.5px] font-semibold">{x.name}</span>
                <span className="block text-[10.5px] text-fg-muted">{x.tests.length} tests</span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title={s.name}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul key={s.id} {...swapIn} className="divide-y divide-edge">
            {s.tests.map(([t, k, st]) => (
              <li key={t} className="flex items-center gap-3 py-2.5 text-[12.5px]">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary">
                  <ClipboardCheck aria-hidden className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{t}</span>
                  <span className="block text-[10.5px] text-fg-muted">{k}</span>
                </span>
                <Pill tone={st === "Done" ? "green" : "muted"}>{st}</Pill>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
        <p className="mt-2.5 text-[11.5px] text-fg-muted">Tests, practice exams and quizzes for each subject or course.</p>
      </Panel>
    </div>
  );
}

/* =========================================================================
   Test prep — Online Mock Tests: the question palette
   ========================================================================= */

const QS = [
  { q: "Which Article guarantees equality before the law?", o: ["Article 14", "Article 19", "Article 21", "Article 32"] },
  { q: "Which body prepares the Union Budget?", o: ["NITI Aayog", "Ministry of Finance", "Finance Commission", "RBI"] },
  { q: "Which river is the longest in peninsular India?", o: ["Krishna", "Godavari", "Kaveri", "Narmada"] },
  { q: "The Preamble begins with which words?", o: ["We, the People", "In the name of", "Whereas the people", "Jai Hind"] },
];

export function MockTestRoom() {
  const [cur, setCur] = useState(0);
  const [ans, setAns] = useState<Record<number, number>>({ 0: 0, 1: 1 });
  const q = QS[cur % QS.length];
  const total = 12;
  return (
    <Panel title="Mock test 8 · online" right={<span className="font-mono text-[10.5px] text-fg-muted">{Object.keys(ans).length} of {total} answered</span>}>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <p className="font-mono text-[10.5px] uppercase tracking-wide text-fg-muted">Question {cur + 1}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={cur} {...swapIn}>
              <p className="mt-1.5 min-h-[40px] text-[13px] font-semibold leading-snug">{q.q}</p>
              <ul className="mt-2.5 space-y-1.5 text-[12.5px]">
                {q.o.map((o, i) => (
                  <li key={o}>
                    <button
                      type="button"
                      onClick={() => setAns((a) => ({ ...a, [cur]: i }))}
                      aria-pressed={ans[cur] === i}
                      className={clsx("flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-left transition", ans[cur] === i ? "border-primary/60 bg-primary-tint text-primary" : "border-edge hover:border-primary/40")}
                    >
                      <span className="grid h-4 w-4 place-items-center rounded-full border border-current font-mono text-[9px]">{"ABCD"[i]}</span>
                      {o}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="sm:w-[132px]">
          <p className="text-[10.5px] font-semibold uppercase tracking-wide text-fg-muted">Questions</p>
          <div className="mt-1.5 grid grid-cols-6 gap-1 sm:grid-cols-4">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCur(i)}
                aria-label={`Question ${i + 1}${ans[i] !== undefined ? ", answered" : ""}`}
                aria-current={cur === i}
                className={clsx(
                  "grid aspect-square place-items-center rounded-md border font-mono text-[11px] transition",
                  cur === i ? "border-navy bg-navy text-white" : ans[i] !== undefined ? "border-primary/40 bg-primary-tint text-primary" : "border-edge text-fg-muted hover:border-primary/40",
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11.5px] text-fg-muted">Students practise online and see how they performed.</p>
    </Panel>
  );
}

/* =========================================================================
   Test prep — Performance Tracking: scores across the series
   ========================================================================= */

const SCORES = [96, 104, 99, 112, 118, 121, 130, 138];

export function ScoreHistory() {
  const [hover, setHover] = useState<number | null>(null);
  const on = hover ?? SCORES.length - 1;
  return (
    <div className="space-y-3">
      <Panel title="Student performance" right={<Pill tone="primary"><Users aria-hidden className="h-3 w-3" /> Prelims Test Series</Pill>}>
        <div className="flex items-center gap-3">
          <Avatar name="Rahul Kumar" size="lg" tone={0} />
          <div className="min-w-0">
            <p className="text-[14px] font-semibold">Rahul Kumar</p>
            <p className="truncate text-[12px] text-fg-muted">8 tests taken</p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-display text-[26px] font-semibold leading-none tabular-nums tracking-tight">
              {SCORES[on]}
              <span className="text-[13px] font-normal text-fg-muted">/200</span>
            </p>
            <p className="mt-1 font-mono text-[10.5px] text-fg-muted">Mock {on + 1}</p>
          </div>
        </div>
        <div className="mt-4 flex h-[110px] items-end gap-1.5 sm:gap-2" onMouseLeave={() => setHover(null)}>
          {SCORES.map((v, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Mock ${i + 1}: ${v} out of 200`}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="group flex h-full flex-1 flex-col justify-end outline-none"
            >
              <motion.span
                initial={{ height: 0 }}
                animate={{ height: `${((v - 60) / 100) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: EASE }}
                className={clsx("block w-full rounded-t-md transition-colors duration-200", i === on ? "bg-primary" : "bg-primary/30 group-hover:bg-primary/60 group-focus-visible:bg-primary/60")}
              />
              <span className={clsx("mt-1.5 text-center font-mono text-[10px]", i === on ? "text-fg" : "text-fg-faint")}>M{i + 1}</span>
            </button>
          ))}
        </div>
      </Panel>
      <Panel bodyClassName="p-2">
        <ul className="divide-y divide-edge">
          {[
            ["Test scores", "138/200"],
            ["Course completion", "74%"],
            ["Weekly quiz 6", "17/20"],
          ].map(([t, s]) => (
            <li key={t} className="flex items-center gap-3 px-2 py-2 text-[12.5px]">
              <span className="flex-1 font-semibold">{t}</span>
              <span className="font-mono tabular-nums">{s}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
