"use client";

import { useRef } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Award, Check, ClipboardCheck, Play, TrendingUp, UserPlus } from "lucide-react";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { Avatar, Illustrative, InstituteMark, Meter, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { Bar } from "../kit";

// Online-coaching hero: one learner's path, as a connected line. A token
// (Rahul) rides the line from enrolling to lessons, an online test, progress
// and completion; each station opens the screen he sees there. Sample data.

const STATIONS = [
  { id: "enrol", label: "Enrol", icon: UserPlus },
  { id: "learn", label: "Lessons", icon: Play },
  { id: "test", label: "Online test", icon: ClipboardCheck },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "done", label: "Completion", icon: Award },
];

const card = "min-h-[212px] rounded-2xl border border-edge bg-panel p-4 shadow-soft";

function EnrolCard() {
  return (
    <div className={card}>
      <div className="flex items-center gap-2 border-b border-edge pb-2.5">
        <InstituteMark name="Your Academy" className="h-6 w-6 text-[9px]" />
        <span className="text-[12px] font-semibold">Your Academy</span>
        <span className="ml-auto hidden gap-3 text-[11px] text-fg-muted sm:flex">
          <span>Courses</span>
          <span>My learning</span>
        </span>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Online course</p>
      <p className="mt-1 text-[19px] font-semibold leading-tight tracking-tight">Foundation Course</p>
      <p className="mt-1 text-[12px] text-fg-muted">Lessons, study materials and tests, organised by module.</p>
      <div className="mt-3.5 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-navy px-4 py-2 text-[12.5px] font-semibold text-white">Enrol in course</span>
        <span className="text-[11.5px] text-fg-muted">24 lessons · 4 quizzes</span>
      </div>
    </div>
  );
}

function LessonsCard() {
  return (
    <div className={card}>
      <div className="relative grid aspect-[16/6] place-items-center overflow-hidden rounded-xl bg-[rgb(27_32_38)]">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[rgb(27_32_38)]">
          <Play aria-hidden className="ml-0.5 h-4 w-4" fill="currentColor" />
        </span>
        <span className="absolute left-3 top-2.5 text-[11px] font-semibold text-white/90">Lesson 3 · Fundamentals</span>
        <span className="absolute inset-x-3 bottom-2.5 h-1 rounded-full bg-white/25">
          <span className="block h-full w-[41%] rounded-full bg-[rgb(106_170_222)]" />
        </span>
      </div>
      <ul className="mt-3 divide-y divide-edge text-[12px]">
        {[
          ["Introduction", "Video · done"],
          ["Core concepts", "Document · done"],
          ["Fundamentals", "Video · in progress"],
        ].map(([t, m]) => (
          <li key={t} className="flex items-center justify-between py-1.5">
            <span className="font-semibold">{t}</span>
            <span className="text-[11px] text-fg-muted">{m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TestCard() {
  return (
    <div className={card}>
      <p className="font-mono text-[10.5px] uppercase tracking-wide text-fg-muted">Module quiz · question 3 of 10</p>
      <p className="mt-1.5 text-[14px] font-semibold leading-snug">Which of these best describes a learning objective?</p>
      <ul className="mt-3 space-y-1.5 text-[12.5px]">
        {["A list of topics covered", "What a learner can do afterwards", "The length of a lesson"].map((o, i) => (
          <li key={o} className={clsx("flex items-center gap-2.5 rounded-lg border px-2.5 py-2", i === 1 ? "border-primary/50 bg-primary-tint text-primary" : "border-edge")}>
            <span className="grid h-4 w-4 place-items-center rounded-full border border-current font-mono text-[9px]">{"ABC"[i]}</span>
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProgressCard() {
  return (
    <div className={card}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">Foundation Course</p>
        <Pill tone="primary">In progress</Pill>
      </div>
      <p className="mt-3 font-display text-[34px] font-semibold leading-none tabular-nums tracking-tight">
        74<span className="text-[16px] font-normal text-fg-muted">% complete</span>
      </p>
      <Bar value={0.74} className="mt-3" />
      <div className="mt-4 space-y-1.5">
        <Meter label="Lessons" value={18} max={24} />
        <Meter label="Quizzes" value={3} max={4} />
        <Meter label="Assessment" value={0} max={1} tone="yellow" />
      </div>
    </div>
  );
}

function DoneCard() {
  return (
    <div className={card}>
      <div className="rounded-xl border border-dashed border-edge-strong px-4 py-4 text-center">
        <Award aria-hidden className="mx-auto h-7 w-7 text-gold" />
        <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-fg-muted">Certificate of completion</p>
        <p className="mt-1.5 font-serif text-[28px] italic leading-none">Rahul Kumar</p>
        <p className="mt-1.5 text-[12px] text-fg-muted">Foundation Course</p>
        <p className="mt-2 text-[10.5px] text-fg-faint">Issued by Your Academy</p>
      </div>
    </div>
  );
}

const CARDS = [EnrolCard, LessonsCard, TestCard, ProgressCard, DoneCard];

export function OnlineCoachingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-5% 0px" });
  const reduced = useReducedMotion();
  const [active, select] = useAutoplay(STATIONS.length, { interval: 3200, running: inView && !reduced });
  const Card = CARDS[active];
  const pct = (i: number) => `${(i + 0.5) * 20}%`;

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-[28px] border border-edge bg-panel shadow-window">
        <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
          <InstituteMark name="Your Academy" className="h-8 w-8 text-[11px]" />
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold leading-tight">Your Academy</p>
            <p className="truncate text-[11px] text-fg-muted">Online coaching</p>
          </div>
          <span className="ml-auto flex items-center gap-2 text-[11px] text-fg-muted">
            <Avatar name="Rahul Kumar" size="sm" tone={0} />
            <span className="hidden sm:block">
              Rahul Kumar
              <br />
              <span className="text-fg-faint">learner</span>
            </span>
          </span>
        </div>

        <div className="px-3 pt-9 sm:px-5">
          <ol className="relative grid grid-cols-5">
            <span aria-hidden className="absolute left-[10%] right-[10%] top-[22px] h-0.5 rounded-full bg-edge-strong/70" />
            <motion.span
              aria-hidden
              className="absolute left-[10%] top-[22px] h-0.5 rounded-full bg-primary"
              initial={false}
              animate={{ width: `${(active / (STATIONS.length - 1)) * 80}%` }}
              transition={{ duration: 0.9, ease: EASE }}
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -top-8 z-10 -translate-x-1/2"
              initial={false}
              animate={{ left: pct(active) }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
            >
              <span className="relative block rounded-full ring-[3px] ring-[rgb(var(--surface))]">
                <Avatar name="Rahul Kumar" size="sm" tone={0} />
              </span>
              <span className="absolute left-1/2 top-full -mt-0.5 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-primary" />
            </motion.span>
            {STATIONS.map((s, i) => {
              const Icon = s.icon;
              const done = i < active;
              const on = i === active;
              return (
                <li key={s.id} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-label={`${s.label}${on ? " (current step)" : ""}`}
                    aria-current={on ? "step" : undefined}
                    className={clsx(
                      "relative grid h-11 w-11 place-items-center rounded-full border-2 transition duration-500 hover:scale-105",
                      on && "scale-110 border-navy bg-navy text-white shadow-[0_0_0_6px_rgb(var(--primary)/0.16)]",
                      done && "border-primary bg-primary-tint text-primary",
                      !on && !done && "border-edge-strong bg-panel text-fg-faint hover:border-primary hover:text-primary",
                    )}
                  >
                    <Icon aria-hidden className="h-[18px] w-[18px]" />
                    {done ? (
                      <span aria-hidden className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-green text-white">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                    ) : null}
                  </button>
                  <span className={clsx("mt-2 text-center text-[10.5px] font-medium leading-tight transition-colors duration-300 sm:text-[12px]", on ? "text-fg" : "text-fg-muted")}>{s.label}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative px-4 pb-5 pt-5 sm:px-6">
          <span aria-hidden className="absolute inset-x-9 bottom-0 top-[34px] rounded-2xl border border-edge bg-canvas-alt sm:inset-x-12" />
          <span aria-hidden className="absolute inset-x-6 bottom-2.5 top-[26px] rounded-2xl border border-edge bg-sunken/60 sm:inset-x-9" />
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 24, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: EASE } }}
                exit={{ opacity: 0, x: -24, transition: { duration: 0.18 } }}
              >
                <Card />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="border-t border-edge bg-canvas-alt px-4 py-3 text-[12px] text-fg-muted">Administrators see the same record: enrolment, activity, assessments and completion.</div>
      </div>
      <Illustrative className="mt-3 text-center lg:text-left" />
    </div>
  );
}
