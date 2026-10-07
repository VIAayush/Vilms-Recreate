"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { Award, BookOpen, Check, FileText, GripVertical, Video } from "lucide-react";
import { useCountUp } from "@/components/marketing/motion";
import { Avatar, InstituteMark, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import type { ModuleId } from "./lms-data";
import { box } from "./shared";

// Compact, animated product fragments for each of the six key features. They
// appear in the platform panel; every name and number is sample data.

const rise = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: 0.06 + i * 0.07, ease: EASE },
});

function Bar({ value, max, tone = "bg-primary", delay = 0 }: { value: number; max: number; tone?: string; delay?: number }) {
  return (
    <span className="relative block h-1.5 overflow-hidden rounded-full bg-sunken">
      <motion.span
        className={clsx("absolute inset-y-0 left-0 rounded-full", tone)}
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      />
    </span>
  );
}

function CoursesMini() {
  const rows = [
    { Icon: Video, t: "Orientation & study plan", m: "Videos · 4 lessons" },
    { Icon: BookOpen, t: "Polity essentials", m: "Videos and documents · 9 lessons" },
    { Icon: FileText, t: "Presentations", m: "Slides · 3 files" },
    { Icon: FileText, t: "Worksheet 1", m: "Document" },
  ];
  return (
    <div>
      <p className="text-[10.5px] text-fg-muted">Course</p>
      <p className="truncate text-[15px] font-semibold">Prelims Foundation Batch</p>
      <ul className="mt-3 space-y-1.5">
        {rows.map(({ Icon, t, m }, i) => (
          <motion.li key={t} {...rise(i)} className="flex items-center gap-2 rounded-lg bg-canvas-alt px-2.5 py-2.5 text-[12.5px]">
            <GripVertical aria-hidden className="h-3.5 w-3.5 shrink-0 text-fg-faint" />
            <Icon aria-hidden className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{t}</span>
              <span className="block truncate text-[10.5px] text-fg-muted">{m}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function LearnersMini() {
  const batches = [
    ["Batch A", 42],
    ["Batch B", 36],
    ["Batch C", 28],
  ] as const;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] text-fg-muted">Learners · batches and groups</p>
        <span className="rounded-md bg-primary px-2 py-1 text-[10.5px] font-semibold text-primary-ink">Add learner</span>
      </div>
      <ul className="space-y-1.5">
        {batches.map(([b, n], i) => (
          <motion.li key={b} {...rise(i)} className="flex items-center gap-2.5 rounded-lg bg-canvas-alt px-2.5 py-2 text-[12.5px]">
            <span className="flex -space-x-1.5">
              {["Rahul Kumar", "Sneha P", "Aman V"].map((x, k) => (
                <span key={x} className="rounded-full ring-2 ring-[rgb(var(--background-alt))]">
                  <Avatar name={x} size="sm" tone={(k + i) % 5} />
                </span>
              ))}
            </span>
            <span className="font-medium">{b}</span>
            <span className="ml-auto text-[11.5px] text-fg-muted">{n} learners</span>
          </motion.li>
        ))}
      </ul>
      <motion.p {...rise(3)} className="flex items-center gap-1.5 rounded-lg border border-edge px-2.5 py-2 text-[11.5px] text-fg-muted">
        <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Rahul Kumar has access to Prelims Foundation
      </motion.p>
    </div>
  );
}

function AssessmentsMini() {
  const opts = ["Article 12", "Article 14", "Article 19", "Article 21"];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10.5px] text-fg-muted">Mock test 4 · Polity</p>
          <p className="text-[12px] font-semibold">Question 2 of 5</p>
        </div>
        <Pill tone="primary">Quiz</Pill>
      </div>
      <p className="text-[14px] font-medium leading-snug">Which Article guarantees equality before the law?</p>
      <ul className="space-y-1.5">
        {opts.map((o, i) => (
          <motion.li
            key={o}
            {...rise(i)}
            className={clsx("flex items-center gap-2.5 rounded-lg border px-2.5 py-2 text-[12.5px]", i === 1 ? "border-primary bg-primary-tint font-medium text-primary" : "border-edge")}
          >
            <span className={clsx("grid h-5 w-5 place-items-center rounded-full border text-[10px] font-semibold", i === 1 ? "border-primary bg-primary text-primary-ink" : "border-edge-strong text-fg-muted")}>
              {"ABCD"[i]}
            </span>
            {o}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function ProgressMini() {
  const rows = [
    ["Rahul Kumar", 82],
    ["Sneha P.", 64],
    ["Aman V.", 47],
    ["Isha M.", 91],
  ] as const;
  return (
    <div className="space-y-3">
      <p className="text-[10.5px] text-fg-muted">Prelims Foundation · course completion</p>
      <ul className="space-y-3">
        {rows.map(([n, v], i) => (
          <li key={n} className="text-[12px]">
            <div className="mb-1 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Avatar name={n} size="sm" tone={i} />
                {n}
              </span>
              <span className="font-mono tabular-nums">{v}%</span>
            </div>
            <Bar value={v} max={100} tone={v >= 80 ? "bg-green" : "bg-primary"} delay={0.1 + i * 0.1} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReportsMini() {
  const avg = useCountUp(72, true, 900);
  const bars = [58, 66, 61, 74, 70, 82];
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10.5px] text-fg-muted">Average score · last 6 tests</p>
          <p className="font-display text-[34px] font-semibold tabular-nums leading-none tracking-tight">{avg}%</p>
        </div>
        <Pill tone="green">Up on last month</Pill>
      </div>
      <div className="flex h-[96px] items-end gap-2">
        {bars.map((b, i) => (
          <div key={i} className="flex-1">
            <motion.div className={clsx("rounded-t-md", i === bars.length - 1 ? "bg-primary" : "bg-primary/35")} initial={{ height: 0 }} animate={{ height: `${b}%` }} transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: EASE }} style={{ maxHeight: 96 }} />
          </div>
        ))}
      </div>
      <p className="text-[11px] text-fg-muted">Completion, scores and activity for every batch.</p>
    </div>
  );
}

function CertificatesMini() {
  const n = useCountUp(38, true, 900);
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <InstituteMark className="h-10 w-10 text-[13px]" />
          <div>
            <p className="text-[13px] font-semibold">Your Institute</p>
            <p className="text-[11px] text-fg-muted">Issued on completion</p>
          </div>
        </div>
        <p className="text-[12px] text-fg-muted">
          <b className="font-semibold tabular-nums text-fg">{n}</b> certificates issued
        </p>
        <p className="text-[11px] text-fg-muted">Course completed → certificate</p>
      </div>
      <motion.div {...rise(2)} className={clsx(box, "p-3 text-center")}>
        <Award aria-hidden className="mx-auto h-5 w-5 text-gold" />
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-fg-muted">Certificate of completion</p>
        <p className="mt-1 font-serif text-[22px] italic leading-none">Rahul Kumar</p>
        <p className="mt-1 text-[10.5px] text-fg-muted">Prelims Foundation Batch</p>
      </motion.div>
    </div>
  );
}

export const MODULE_MINIS: Record<ModuleId, () => React.ReactNode> = {
  courses: CoursesMini,
  learners: LearnersMini,
  assessments: AssessmentsMini,
  progress: ProgressMini,
  reports: ReportsMini,
  certificates: CertificatesMini,
};

