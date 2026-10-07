"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ChevronDown, ClipboardCheck, FileText, FolderOpen, Presentation, Upload, Video } from "lucide-react";
import { Avatar, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { Bar, Panel } from "../kit";

// Feature visuals shared by the solution pages. Each takes the page's own
// vocabulary and sample data (students or learners, batches or groups), so a
// page reads in its own terms while the interface stays one product.

const swapIn = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } }, exit: { opacity: 0, transition: { duration: 0.1 } } };

/* =========================================================================
   Course management — an outline you can open
   ========================================================================= */

export type OutlineModule = { t: string; items: { t: string; kind: "video" | "doc" | "slides" | "quiz" }[] };
const KIND = {
  video: { icon: Video, label: "Video" },
  doc: { icon: FileText, label: "Document" },
  slides: { icon: Presentation, label: "Presentation" },
  quiz: { icon: ClipboardCheck, label: "Quiz" },
};

export function CourseOutline({ course, meta, modules }: { course: string; meta: string; modules: OutlineModule[] }) {
  const [open, setOpen] = useState(0);
  return (
    <Panel title={course} right={<span className="font-mono text-[10.5px] text-fg-muted">{meta}</span>} bodyClassName="p-2">
      <ul className="space-y-1">
        {modules.map((m, i) => {
          const on = open === i;
          return (
            <li key={m.t} className="rounded-xl border border-edge bg-canvas-alt">
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setOpen(on ? -1 : i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left"
              >
                <span className="font-mono text-[10.5px] text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">{m.t}</span>
                <span className="text-[11px] text-fg-muted">{m.items.length} items</span>
                <ChevronDown aria-hidden className={clsx("h-4 w-4 text-fg-muted transition-transform duration-300", on && "rotate-180")} />
              </button>
              <AnimatePresence initial={false}>
                {on ? (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    {m.items.map((it) => {
                      const K = KIND[it.kind];
                      return (
                        <li key={it.t} className="flex items-center gap-2.5 border-t border-edge bg-panel px-3 py-2 text-[12px]">
                          <K.icon aria-hidden className="h-3.5 w-3.5 text-primary" />
                          <span className="min-w-0 flex-1 truncate">{it.t}</span>
                          <span className="text-[10.5px] text-fg-muted">{K.label}</span>
                        </li>
                      );
                    })}
                  </motion.ul>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* =========================================================================
   Learning content — one library, filtered by type
   ========================================================================= */

export type ContentItem = { t: string; type: "Videos" | "Documents" | "Presentations" | "Notes"; meta: string };
const CONTENT_ICON = { Videos: Video, Documents: FileText, Presentations: Presentation, Notes: FolderOpen };

export function ContentLibrary({ title, items }: { title: string; items: ContentItem[] }) {
  const types = ["All", "Videos", "Documents", "Presentations", "Notes"] as const;
  const [f, setF] = useState<(typeof types)[number]>("All");
  const shown = items.filter((i) => f === "All" || i.type === f);
  return (
    <Panel title={title} right={<span className="font-mono text-[10.5px] text-fg-muted">{shown.length} resources</span>}>
      <div role="group" aria-label="Filter by type" className="mb-3 flex flex-wrap gap-1.5">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={f === t}
            onClick={() => setF(t)}
            className={clsx("rounded-full border px-3 py-1 text-[12px] font-medium transition-colors", f === t ? "border-navy bg-navy text-white" : "border-edge text-fg-muted hover:border-primary/50 hover:text-fg")}
          >
            {t}
          </button>
        ))}
      </div>
      <LayoutGroup>
        <ul className="min-h-[236px] space-y-1.5">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((it) => {
              const Icon = CONTENT_ICON[it.type];
              return (
                <motion.li
                  key={it.t}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="flex items-center gap-3 rounded-xl border border-edge bg-canvas-alt px-3 py-2.5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary">
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-semibold">{it.t}</span>
                    <span className="block truncate text-[10.5px] text-fg-muted">{it.meta}</span>
                  </span>
                  <Pill>{it.type.replace(/s$/, "")}</Pill>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </LayoutGroup>
    </Panel>
  );
}

/* =========================================================================
   Student / learner management — pick a person, see their record
   ========================================================================= */

export type Person = { n: string; group: string; courses: string[]; activity: string };

export function PeopleDirectory({ noun, groupLabel, people }: { noun: string; groupLabel: string; people: Person[] }) {
  const [sel, setSel] = useState(0);
  const p = people[sel];
  return (
    <div className="grid gap-3 sm:grid-cols-[1.1fr_1fr]">
      <Panel title={`${noun}s`} right={<span className="font-mono text-[10.5px] text-fg-muted">{people.length} shown</span>} bodyClassName="p-1.5">
        <ul role="tablist" aria-label={`${noun}s`} className="space-y-0.5">
          {people.map((x, i) => (
            <li key={x.n}>
              <button
                type="button"
                role="tab"
                aria-selected={i === sel}
                onClick={() => setSel(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)}
                className={clsx("flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition", i === sel ? "border-primary bg-primary-tint/60" : "border-transparent hover:bg-canvas-alt")}
              >
                <Avatar name={x.n} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-semibold">{x.n}</span>
                  <span className="block truncate text-[10.5px] text-fg-muted">{x.group}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title={`${noun} profile`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={p.n} {...swapIn}>
            <div className="flex items-center gap-2.5">
              <Avatar name={p.n} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold">{p.n}</p>
                <p className="truncate text-[11px] text-fg-muted">
                  {groupLabel}: {p.group}
                </p>
              </div>
            </div>
            <p className="mt-3.5 text-[10.5px] font-semibold uppercase tracking-wide text-fg-muted">Course access</p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {p.courses.map((c) => (
                <li key={c}>
                  <Pill tone="primary">{c}</Pill>
                </li>
              ))}
            </ul>
            <p className="mt-3.5 text-[10.5px] font-semibold uppercase tracking-wide text-fg-muted">Latest activity</p>
            <p className="mt-1 text-[12.5px] leading-snug">{p.activity}</p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-3 text-[11.5px] text-fg-muted">Profiles, enrolments and learning activity in one place.</p>
      </Panel>
    </div>
  );
}

/* =========================================================================
   Online assessments — quizzes, tests, assignments, exams
   ========================================================================= */

export type AssessKind = "Quiz" | "Mock test" | "Assignment" | "Online exam";

export function AssessmentKinds({ kinds, subject, question, options }: { kinds: AssessKind[]; subject: string; question: string; options: string[] }) {
  const [sel, setSel] = useState(0);
  const k = kinds[sel];
  return (
    <Panel title={`${subject} · assessments`}>
      <div role="tablist" aria-label="Assessment type" className="flex flex-wrap gap-1.5">
        {kinds.map((x, i) => (
          <button
            key={x}
            type="button"
            role="tab"
            aria-selected={i === sel}
            onClick={() => setSel(i)}
            onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)}
            className={clsx("rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition duration-300", i === sel ? "border-navy bg-navy text-white" : "border-edge text-fg-muted hover:border-primary/50 hover:text-fg")}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-[216px] rounded-xl border border-edge p-3.5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={k} {...swapIn}>
            {k === "Quiz" || k === "Online exam" ? (
              <>
                <p className="font-mono text-[10.5px] uppercase tracking-wide text-fg-muted">{k === "Quiz" ? "Quiz · question 3 of 10" : "Online exam · section A"}</p>
                <p className="mt-1.5 text-[13px] font-semibold leading-snug">{question}</p>
                <ul className="mt-2.5 space-y-1.5 text-[12.5px]">
                  {options.map((o, i) => (
                    <li key={o} className={clsx("flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5", i === 1 ? "border-primary/50 bg-primary-tint text-primary" : "border-edge")}>
                      <span className="grid h-4 w-4 place-items-center rounded-full border border-current font-mono text-[9px]">{"ABCD"[i]}</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </>
            ) : k === "Mock test" ? (
              <>
                <p className="font-mono text-[10.5px] uppercase tracking-wide text-fg-muted">Mock test 4</p>
                <ul className="mt-2.5 space-y-1.5">
                  {[
                    ["Section A", "Multiple choice", "Done"],
                    ["Section B", "Short answers", "In progress"],
                    ["Section C", "Long answers", "Not started"],
                  ].map(([a, b, c]) => (
                    <li key={a} className="flex items-center gap-3 rounded-lg bg-canvas-alt px-3 py-2.5 text-[12.5px]">
                      <span className="font-semibold">{a}</span>
                      <span className="flex-1 text-fg-muted">{b}</span>
                      <Pill tone={c === "Done" ? "green" : c === "In progress" ? "primary" : "muted"}>{c}</Pill>
                    </li>
                  ))}
                </ul>
                <p className="mt-2.5 text-[11.5px] text-fg-muted">Practice under test conditions, then review the performance.</p>
              </>
            ) : (
              <>
                <p className="font-mono text-[10.5px] uppercase tracking-wide text-fg-muted">Assignment</p>
                <p className="mt-1.5 text-[13px] font-semibold leading-snug">Write a one-page summary of this week&rsquo;s topic and upload it.</p>
                <div className="mt-3 grid place-items-center rounded-xl border-2 border-dashed border-edge-strong px-3 py-5 text-center">
                  <Upload aria-hidden className="h-5 w-5 text-fg-muted" />
                  <p className="mt-1.5 text-[12px] text-fg-muted">Learners submit their work here</p>
                </div>
                <p className="mt-2.5 flex items-center gap-1.5 text-[11.5px] text-fg-muted">
                  <FileText aria-hidden className="h-3.5 w-3.5 text-primary" /> summary-week-3.pdf · submitted
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Panel>
  );
}

/* =========================================================================
   Progress tracking — completion, activity and performance, filterable
   ========================================================================= */

export type Progress = { n: string; pct: number; score: string; last: string };

export function ProgressTracker({ noun, rows, course }: { noun: string; rows: Progress[]; course: string }) {
  const filters = ["All", "Completed", "In progress", "Needs support"] as const;
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const status = (r: Progress) => (r.pct >= 100 ? "Completed" : r.pct < 45 ? "Needs support" : "In progress");
  const shown = rows.filter((r) => f === "All" || status(r) === f);
  return (
    <Panel title={`${course} · ${noun.toLowerCase()} progress`} bodyClassName="p-3">
      <div role="group" aria-label="Filter" className="mb-2.5 flex flex-wrap gap-1.5">
        {filters.map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={f === x}
            onClick={() => setF(x)}
            className={clsx("rounded-full px-3 py-1 text-[12px] font-medium transition-colors", f === x ? "bg-primary-tint text-primary" : "text-fg-muted hover:bg-sunken")}
          >
            {x}
          </button>
        ))}
      </div>
      <ul className="min-h-[248px] divide-y divide-edge">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((r) => (
            <motion.li key={r.n} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="flex items-center gap-2.5 py-2.5">
              <Avatar name={r.n} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2 text-[12.5px]">
                  <span className="truncate font-semibold">{r.n}</span>
                  <span className="font-mono text-[11px] tabular-nums text-fg-muted">{r.pct}%</span>
                </span>
                <Bar value={r.pct / 100} tone={r.pct >= 100 ? "green" : r.pct < 45 ? "gold" : "primary"} className="mt-1.5" />
                <span className="mt-1 block truncate text-[10.5px] text-fg-muted">
                  Last assessment {r.score} · {r.last}
                </span>
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Panel>
  );
}

/* =========================================================================
   Reports & analytics — pick a measure, compare the groups
   ========================================================================= */

export type ReportSeries = { id: string; label: string; unit: string; values: { k: string; v: number }[] };

export function ReportsPanel({ title, series }: { title: string; series: ReportSeries[] }) {
  const [sel, setSel] = useState(0);
  const s = series[sel];
  const avg = Math.round(s.values.reduce((a, b) => a + b.v, 0) / s.values.length);
  return (
    <div className="space-y-3">
      <Panel title={title}>
        <div role="tablist" aria-label="Report" className="flex flex-wrap gap-1.5">
          {series.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={i === sel}
              onClick={() => setSel(i)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)}
              className={clsx("rounded-full border px-3 py-1.5 text-[12px] font-medium transition", i === sel ? "border-navy bg-navy text-white" : "border-edge text-fg-muted hover:border-primary/50 hover:text-fg")}
            >
              {x.label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex h-[140px] items-end gap-2 sm:gap-3">
          {s.values.map((b, i) => (
            <div key={b.k} className="flex h-full min-w-0 flex-1 flex-col justify-end">
              <span className="mb-1 text-center font-mono text-[11px] tabular-nums text-fg-muted">
                {b.v}
                {s.unit}
              </span>
              <motion.span
                key={`${s.id}-${b.k}`}
                initial={{ height: 0 }}
                animate={{ height: `${b.v}%` }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                className="block w-full rounded-t-lg bg-primary/70"
              />
              <span className="mt-1.5 truncate text-center text-[10.5px] text-fg-muted">{b.k}</span>
            </div>
          ))}
        </div>
      </Panel>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Average", `${avg}${s.unit}`],
          ["Highest", `${Math.max(...s.values.map((v) => v.v))}${s.unit}`],
          ["Groups", String(s.values.length)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-edge bg-panel px-3 py-2.5">
            <p className="text-[10.5px] text-fg-muted">{k}</p>
            <p className="font-display text-[20px] font-semibold tabular-nums tracking-tight">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
