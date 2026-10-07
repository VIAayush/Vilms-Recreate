"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Award, Bell, Check, ChevronRight, FileText, GripVertical, Link2, Lock, Play, Radio, Repeat2, Video } from "lucide-react";
import { useReducedMotion } from "@/components/marketing/motion";
import { Avatar, InstituteMark, LiveDot, Pill } from "@/components/marketing/screens/primitives";
import { ScrollStory } from "@/components/site-ui/ScrollStory";
import { EASE, swap } from "@/components/site-ui/motion-tokens";
import { JOURNEY } from "./courses-data";
import { MockCaption, useTween } from "./shared";

// Create → add lessons → schedule → join → learn → complete, as one story.
// Each panel is a small interface that plays itself when its step is active.

/** Steps a panel through timed stages (jumps to the end under reduced motion). */
function useStaged(times: number[]) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const key = times.join(",");
  useEffect(() => {
    if (reduced) {
      const id = requestAnimationFrame(() => setStage(key.split(",").length));
      return () => cancelAnimationFrame(id);
    }
    const ids = key.split(",").map((t, i) => window.setTimeout(() => setStage(i + 1), Number(t)));
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [key, reduced]);
  return stage;
}

const field = "flex min-h-[40px] items-center rounded-lg border border-edge bg-panel px-3 text-[13.5px]";
const label = "mb-1.5 block text-[11px] font-medium text-fg-muted";

/* ---- 1. create ---- */
function CreatePanel() {
  const s = useStaged([600, 1500, 2300]);
  const formats = ["Recorded", "Live", "Hybrid"];
  const picked = s >= 1 ? 2 : 0;
  return (
    <div className="mx-auto max-w-[440px]">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">New course</p>
      <div className="mt-3 space-y-3.5">
        <div>
          <span className={label}>Course title</span>
          <div className={field}>
            Prelims Foundation Batch
            <motion.span aria-hidden animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="ml-0.5 h-4 w-px bg-fg" />
          </div>
        </div>
        <div>
          <span className={label}>Format</span>
          <div className="grid grid-cols-3 gap-2">
            {formats.map((f, i) => (
              <span
                key={f}
                className={clsx(
                  "grid min-h-[44px] place-items-center rounded-lg border text-[13px] font-medium transition-all duration-300",
                  i === picked ? "border-primary bg-primary-tint text-primary shadow-[0_0_0_3px_rgb(var(--primary)/0.12)]" : "border-edge text-fg-muted",
                )}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className={label}>Price</span>
          <div className={field}>₹15,000</div>
        </div>
        <motion.div
          animate={s >= 3 ? { scale: [1, 0.97, 1] } : {}}
          className={clsx(
            "flex min-h-[46px] items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition-colors duration-300",
            s >= 3 ? "bg-green-tint text-green" : "bg-navy text-primary-ink",
          )}
        >
          {s >= 3 ? (
            <>
              <Check aria-hidden className="h-4 w-4" /> Course created
            </>
          ) : (
            "Create course"
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ---- 2. lessons ---- */
function LessonsPanel() {
  const s = useStaged([500, 1300, 2000]);
  const rows = [
    { id: "a", t: "Orientation & study plan", m: "Recorded · 4 lessons", Icon: Video },
    { id: "b", t: "Polity essentials", m: "Recorded · 9 lessons", Icon: Video },
    { id: "c", t: "Weekly doubt-clearing", m: "Live · Thu 7:00 PM", Icon: Radio },
  ];
  const order = s >= 2 ? [rows[0], rows[2], rows[1]] : rows;
  return (
    <div className="mx-auto max-w-[480px]">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Course builder · modules</p>
      <ul className="mt-3 space-y-2">
        {order.map((r, i) => (
          <motion.li
            key={r.id}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, scale: r.id === "c" && s === 2 ? 1.03 : 1 }}
            transition={{ duration: 0.45, delay: s === 0 ? i * 0.12 : 0, ease: EASE, layout: { duration: 0.5, ease: EASE } }}
            className={clsx("flex items-center gap-2.5 rounded-xl border bg-panel px-2.5 py-3", r.id === "c" && s === 2 ? "border-primary shadow-window" : "border-edge")}
          >
            <GripVertical aria-hidden className="h-4 w-4 text-fg-faint" />
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-canvas-alt text-primary">
              <r.Icon aria-hidden className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-medium">{r.t}</span>
              <span className="block text-[11px] text-fg-muted">{r.m}</span>
            </span>
            {r.id === "b" && s >= 3 ? (
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-1">
                {["Notes.pdf", "Worksheet 1.pdf"].map((f) => (
                  <span key={f} className="hidden items-center gap-1 rounded-md bg-sunken px-1.5 py-1 text-[10.5px] text-fg-muted sm:inline-flex">
                    <FileText aria-hidden className="h-3 w-3" />
                    {f}
                  </span>
                ))}
              </motion.span>
            ) : null}
          </motion.li>
        ))}
      </ul>
      <p className="mt-3 text-[12.5px] text-fg-muted">
        {s >= 3 ? "Notes and a worksheet attached to the lesson." : s >= 2 ? "Dragged into place." : "Modules, in the order you teach them."}
      </p>
    </div>
  );
}

/* ---- 3. schedule ---- */
function Toggle({ on }: { on: boolean }) {
  return (
    <span className={clsx("relative h-5 w-9 rounded-full transition-colors duration-300", on ? "bg-green" : "bg-edge-strong")}>
      <span className={clsx("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300", on ? "left-[18px]" : "left-0.5")} />
    </span>
  );
}

function SchedulePanel() {
  const s = useStaged([500, 1400, 2000]);
  return (
    <div className="mx-auto max-w-[460px]">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Schedule live class</p>
      <div className="mt-3 space-y-3.5">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div>
            <span className={label}>Class</span>
            <div className={field}>Weekly doubt-clearing</div>
          </div>
          <div>
            <span className={label}>When</span>
            <div className={clsx(field, "whitespace-nowrap font-medium")}>Thu · 7:00 PM</div>
          </div>
        </div>
        <div>
          <span className={label}>Class link</span>
          <div className="flex gap-2">
            <div className="flex rounded-lg bg-sunken p-0.5 text-[12.5px] font-medium">
              {["Zoom", "Meet"].map((p, i) => (
                <span key={p} className={clsx("grid min-w-[52px] place-items-center rounded-md px-2.5 transition-all duration-300", i === (s >= 1 ? 1 : 0) ? "bg-panel text-fg shadow-sm" : "text-fg-muted")}>
                  {p}
                </span>
              ))}
            </div>
            <div className={clsx(field, "min-w-0 flex-1 gap-2")}>
              <Link2 aria-hidden className="h-3.5 w-3.5 shrink-0 text-fg-faint" />
              <span className="truncate font-mono text-[12px] text-fg-muted">{s >= 1 ? "meet.google.com/abc-defg-hij" : "Paste your link"}</span>
            </div>
          </div>
        </div>
        <ul className="divide-y divide-edge rounded-xl border border-edge bg-panel text-[13px]">
          {[
            ["Part of Prelims Foundation Batch", true],
            ["RSVPs", s >= 2],
            ["Reminder before class", s >= 3],
          ].map(([t, on]) => (
            <li key={String(t)} className="flex items-center justify-between px-3 py-2.5">
              <span>{t}</span>
              <Toggle on={Boolean(on)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---- 4. join ---- */
function JoinPanel() {
  const s = useStaged([500, 1500]);
  const rsvps = useTween(s >= 1 ? 42 : 0, 900);
  return (
    <div className="relative mx-auto max-w-[440px]">
      <div className="rounded-2xl border border-edge bg-panel p-4 shadow-soft">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-red">
          <LiveDot /> Thursday · 7:00 PM
        </div>
        <p className="mt-2 text-[18px] font-semibold tracking-tight">Weekly doubt-clearing</p>
        <p className="text-[12.5px] text-fg-muted">Prelims Foundation Batch · Google Meet</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="flex -space-x-2">
            {["Rahul Kumar", "Sneha P", "Aman V", "Isha M", "Karan S"].map((n, i) => (
              <motion.span key={n} initial={{ scale: 0 }} animate={{ scale: s >= 1 ? 1 : 0 }} transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 20 }} className="rounded-full ring-2 ring-[rgb(var(--surface))]">
                <Avatar name={n} size="sm" tone={i} />
              </motion.span>
            ))}
          </span>
          <span className="text-[13px] text-fg-muted">
            <b className="font-semibold tabular-nums text-fg">{rsvps}</b> RSVPs
          </span>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="grid min-h-[44px] flex-1 place-items-center rounded-full bg-navy text-[14px] font-semibold text-primary-ink">Join class</span>
          <span className="grid min-h-[44px] place-items-center rounded-full border border-edge px-4 text-[13px] font-medium text-fg-muted">Add to calendar</span>
        </div>
      </div>
      <AnimatePresence>
        {s >= 2 ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="mt-3 flex items-center gap-3 rounded-xl border border-edge bg-panel px-3.5 py-3 shadow-window"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-tint text-primary">
              <Bell aria-hidden className="h-4 w-4" />
            </span>
            <p className="text-[12.5px] leading-snug">
              <b className="block font-semibold">Your class starts soon</b>
              <span className="text-fg-muted">Reminder from Your Institute · tap to join</span>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ---- 5. learn ---- */
function LearnPanel() {
  const s = useStaged([600, 1400]);
  return (
    <div className="mx-auto max-w-[480px] overflow-hidden rounded-2xl border border-edge bg-panel shadow-soft">
      <div className="relative aspect-[16/7] bg-[rgb(23_28_36)]">
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[rgb(23_28_36)]">
            <Play aria-hidden className="ml-0.5 h-5 w-5" fill="currentColor" />
          </span>
        </div>
        <p className="absolute left-3 top-2.5 text-[11.5px] font-semibold text-white/90">Lesson 3 · Fundamental Rights</p>
        <span className="absolute bottom-6 left-3 flex items-center gap-1 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/90">
          <Lock aria-hidden className="h-2.5 w-2.5" /> Private recording
        </span>
        <div className="absolute inset-x-3 bottom-2.5 flex items-center gap-2 text-[10px] text-white/85">
          <span className="font-mono">12:40</span>
          <span className="relative h-1 flex-1 rounded-full bg-white/25">
            <motion.span className="absolute inset-y-0 left-0 rounded-full bg-[rgb(106_170_222)]" initial={{ width: "10%" }} animate={{ width: "58%" }} transition={{ duration: 2.6, ease: "linear" }} />
          </span>
          <span className="font-mono">31:05</span>
        </div>
      </div>
      <ul className="divide-y divide-edge text-[13px]">
        <li className="flex items-center gap-2.5 px-3.5 py-2.5">
          <Check aria-hidden className="h-4 w-4 text-green" />
          <span className="flex-1 truncate">Lesson 2 · Preamble</span>
          <span className="text-[11px] text-fg-muted">Done</span>
        </li>
        <li className="flex items-center gap-2.5 bg-primary-tint/50 px-3.5 py-2.5">
          <Play aria-hidden className="h-4 w-4 text-primary" fill="currentColor" />
          <span className="flex-1 truncate font-medium">Lesson 3 · Fundamental Rights</span>
          <AnimatePresence>
            {s >= 1 ? (
              <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="hidden items-center gap-1 rounded-md bg-panel px-1.5 py-1 text-[10.5px] text-fg-muted ring-1 ring-edge sm:inline-flex">
                <FileText aria-hidden className="h-3 w-3" /> Notes.pdf
              </motion.span>
            ) : null}
          </AnimatePresence>
        </li>
        <li className="flex items-center gap-2.5 px-3.5 py-2.5 text-fg-muted">
          <Lock aria-hidden className="h-4 w-4" />
          <span className="flex-1 truncate">Lesson 4 · Directive Principles</span>
          <Pill tone="yellow">Unlocks in 3 days</Pill>
        </li>
      </ul>
    </div>
  );
}

/* ---- 6. complete ---- */
function CompletePanel() {
  const s = useStaged([500, 1400]);
  const pct = useTween(s >= 1 ? 100 : 80, 900);
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="mx-auto grid max-w-[520px] gap-3 sm:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl border border-edge bg-panel p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="relative grid h-[64px] w-[64px] place-items-center">
            <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
              <circle cx="32" cy="32" r={r} fill="none" strokeWidth="6" className="stroke-sunken" />
              <circle cx="32" cy="32" r={r} fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-green" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
            </svg>
            <span className="font-display text-[15px] font-semibold tabular-nums">{pct}%</span>
          </span>
          <div>
            <p className="text-[13.5px] font-semibold">Course complete</p>
            <p className="text-[11.5px] text-fg-muted">Prelims Foundation Batch</p>
          </div>
        </div>
        <AnimatePresence>
          {s >= 1 ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-lg border border-dashed border-edge px-3 py-3 text-center">
              <InstituteMark name="Your Institute" className="mx-auto h-7 w-7 text-[10px]" />
              <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-fg-muted">Certificate of completion</p>
              <p className="mt-1 font-serif text-[22px] italic leading-none">Rahul Kumar</p>
              <Award aria-hidden className="mx-auto mt-2 h-5 w-5 text-gold" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {s >= 2 ? (
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex flex-col rounded-2xl border border-primary/40 bg-primary-tint p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
              <Repeat2 aria-hidden className="h-3.5 w-3.5" /> One-click upsell
            </p>
            <p className="mt-2 text-[15px] font-semibold leading-snug tracking-tight">Mains Answer-Writing Batch</p>
            <p className="mt-1 text-[12px] text-fg-muted">Offered to students who completed Prelims Foundation.</p>
            <span className="mt-auto flex items-center justify-center gap-1 rounded-full bg-navy py-2.5 text-[13px] font-semibold text-primary-ink">
              Enrol · ₹9,000 <ChevronRight aria-hidden className="h-4 w-4" />
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const PANELS = [CreatePanel, LessonsPanel, SchedulePanel, JoinPanel, LearnPanel, CompletePanel];
const WHO = ["You · admin", "You · admin", "You · admin", "Rahul Kumar · student", "Rahul Kumar · student", "Rahul Kumar · student"];

function Stage({ i }: { i: number }) {
  const Panel = PANELS[i];
  const student = i >= 3;
  return (
    <div className="window flex flex-col">
      <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
        {student ? <Avatar name="Rahul Kumar" size="sm" tone={0} /> : <InstituteMark name="Your Institute" className="h-6 w-6 text-[9px]" />}
        <p className="text-[12.5px] font-medium">{WHO[i]}</p>
        <span aria-hidden className="ml-auto flex items-center gap-1">
          {JOURNEY.map((s, k) => (
            <span key={s.title} className={clsx("h-1 rounded-full transition-all duration-500", k === i ? "w-6 bg-navy" : k < i ? "w-3 bg-primary" : "w-3 bg-edge-strong")} />
          ))}
        </span>
      </div>
      <div className="relative min-h-[400px] p-4 sm:p-6 lg:min-h-[420px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={i} {...swap}>
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function CourseJourney() {
  return (
    <div>
      <ScrollStory steps={JOURNEY} stage={(i) => <Stage i={i} />} stageHeight="min(560px, calc(100svh - 140px))" />
      <MockCaption className="mt-5 lg:text-right" />
    </div>
  );
}
