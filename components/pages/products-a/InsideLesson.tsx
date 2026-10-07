"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowRight, ClipboardCheck, FileText, Lock, Play } from "lucide-react";
import { BrowserFrame } from "@/components/marketing/screens/primitives";
import { MockCaption } from "./shared";

// One lesson page, with its four moving parts named. Hover, focus or tap a
// feature on the right and that part of the lesson lights up (styles for
// [data-spot] / [data-focus] live in components/marketing/site.css).

const FEATURES = [
  { id: "recording", label: "Upload videos", line: "Videos play inside the course, next to the lesson." },
  { id: "attachments", label: "Documents and presentations", line: "Add documents, slides and other learning resources to any lesson." },
  { id: "drip", label: "Quizzes, tests, and assignments", line: "Add assessments to the course and keep them in the same place." },
  { id: "link", label: "Track learner progress", line: "See activity and completion for every learner." },
];

const spot = (id: string, active: string | null) => ({ "data-spot": id, "data-on": active === id ? "true" : "false" });

export function InsideLesson() {
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hover ?? pinned;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-14">
      <div className="min-w-0">
        <div aria-hidden data-focus={active ? "true" : undefined}>
          <BrowserFrame url="learn.yourinstitute.in/prelims-foundation/lesson-3" className="shadow-window">
            <div className="grid gap-3 p-3 sm:grid-cols-[1.45fr_1fr] sm:p-4">
              <div className="min-w-0 space-y-3">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-[rgb(23_28_36)]" {...spot("recording", active)}>
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[rgb(23_28_36)]">
                      <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                    </span>
                  </div>
                  <p className="absolute left-3 top-2.5 text-[11px] font-semibold text-white/90">Lesson 3 · Fundamental Rights</p>
                  <span className="absolute left-3 top-8 flex items-center gap-1 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/90">
                    <Lock className="h-2.5 w-2.5" /> Course video
                  </span>
                  <span className="absolute bottom-6 right-3 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80">Rahul K. · 98xxx</span>
                  <div className="absolute inset-x-3 bottom-2.5 flex items-center gap-2 text-[10px] text-white/85">
                    <span className="font-mono">12:40</span>
                    <span className="relative h-1 flex-1 rounded-full bg-white/25">
                      <span className="absolute inset-y-0 left-0 w-[41%] rounded-full bg-[rgb(106_170_222)]" />
                    </span>
                    <span className="font-mono">31:05</span>
                  </div>
                </div>

                <div className="rounded-xl border border-edge bg-panel px-3 py-2.5" {...spot("link", active)}>
                  <div className="flex items-center justify-between text-[12px]">
                    <b className="font-semibold">Rahul Kumar · course progress</b>
                    <span className="font-mono tabular-nums text-fg-muted">62%</span>
                  </div>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-sunken">
                    <span className="block h-full w-[62%] rounded-full bg-primary" />
                  </span>
                </div>
              </div>

              <div className="min-w-0 space-y-3">
                <div className="rounded-xl border border-edge bg-panel p-3" {...spot("attachments", active)}>
                  <p className="text-[10.5px] text-fg-muted">Documents and presentations</p>
                  <ul className="mt-2 space-y-1.5 text-[12px]">
                    {["Notes.pdf", "Slides · Polity.pptx", "Worksheet 1.pdf"].map((f) => (
                      <li key={f} className="flex items-center gap-2 rounded-lg bg-canvas-alt px-2 py-2">
                        <FileText className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-edge bg-panel p-3" {...spot("drip", active)}>
                  <p className="text-[10.5px] text-fg-muted">Assessments</p>
                  <ul className="mt-2 space-y-1.5 text-[12px]">
                    {["Quiz 1 · Polity", "Mock test 1", "Assignment 1"].map((t) => (
                      <li key={t} className="flex items-center gap-2 rounded-lg bg-canvas-alt px-2 py-2">
                        <ClipboardCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="min-w-0 flex-1 truncate">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </BrowserFrame>
        </div>
        <MockCaption className="mt-3" />
      </div>

      <ul className="divide-y divide-edge border-y border-edge">
        {FEATURES.map((f) => {
          const on = active === f.id;
          return (
            <li key={f.id}>
              <button
                type="button"
                aria-pressed={pinned === f.id}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover(f.id)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(f.id)}
                onBlur={() => setHover(null)}
                onClick={() => setPinned((p) => (p === f.id ? null : f.id))}
                className="group flex w-full items-start gap-3 py-4 text-left"
              >
                <span className={clsx("mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300", on ? "scale-150 bg-primary" : "bg-edge-strong")} />
                <span className="min-w-0 flex-1">
                  <span className={clsx("block font-display text-[21px] font-medium tracking-[-0.02em] transition-colors", on ? "text-primary" : "text-fg")}>{f.label}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-fg-muted">{f.line}</span>
                </span>
                <ArrowRight aria-hidden className={clsx("mt-2 h-4 w-4 shrink-0 transition duration-300", on ? "translate-x-0 text-primary opacity-100" : "-translate-x-2 text-fg-faint opacity-0")} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
