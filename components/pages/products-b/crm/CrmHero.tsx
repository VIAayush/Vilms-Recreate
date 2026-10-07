"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, FileDown, LayoutTemplate, Megaphone, Search, UserRound, Video, type LucideIcon } from "lucide-react";
import { Avatar, Pill } from "@/components/marketing/screens/primitives";
import { swap } from "@/components/site-ui/motion-tokens";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { SOURCES, STAGES, type SourceId } from "./data";

export const SOURCE_ICON: Record<SourceId, LucideIcon> = { meta: Megaphone, google: Search, landing: LayoutTemplate, pdf: FileDown, webinar: Video };

/**
 * Hero: leads arrive from five places, each with its campaign attached. It
 * cycles by itself; click a source to send a lead from it.
 */
export function CrmHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-5% 0px" });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [active, select] = useAutoplay(SOURCES.length, { interval: 3200, running: inView && !reduced && !paused });
  const src = SOURCES[active];
  const Icon = SOURCE_ICON[src.id];
  const recent = [1, 2, 3].map((k) => SOURCES[(active - k + SOURCES.length * 2) % SOURCES.length]);

  return (
    <div ref={ref} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} className="mx-auto w-full max-w-[680px]">
      <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-0">
        {/* sources */}
        <ul aria-label="Lead sources" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-col sm:justify-center sm:overflow-visible sm:px-0 sm:pr-7">
          {SOURCES.map((s, i) => {
            const I = SOURCE_ICON[s.id];
            const on = i === active;
            return (
              <li key={s.id} className="relative shrink-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => select(i)}
                  className={clsx(
                    "group flex w-full items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 text-left text-[13.5px] font-medium transition duration-200 hover:-translate-y-px sm:min-w-[164px]",
                    on ? "border-navy bg-navy text-white shadow-soft" : "border-edge bg-panel hover:border-primary/50",
                  )}
                >
                  <span className={clsx("grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors", on ? "bg-white/15" : "bg-primary-tint text-primary group-hover:bg-primary group-hover:text-primary-ink")}>
                    <I aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  <span className="whitespace-nowrap">{s.label}</span>
                </button>
                {/* connector into the card */}
                <span aria-hidden className={clsx("absolute left-full top-1/2 hidden h-px w-7 origin-left transition-colors duration-300 sm:block", on ? "bg-navy" : "bg-edge-strong")} />
              </li>
            );
          })}
        </ul>

        {/* the lead card */}
        <div className="relative min-w-0">
          <div className="rounded-[22px] border border-edge bg-panel shadow-window">
            <div className="flex items-center justify-between border-b border-edge px-4 py-2.5">
              <p className="flex items-center gap-1.5 text-[12.5px] font-semibold">
                <ArrowRight aria-hidden className="h-3.5 w-3.5 text-primary" /> New lead
              </p>
              <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-fg-muted">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-green/60" />
                  <span className="relative h-2 w-2 rounded-full bg-green" />
                </span>
                just now
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={src.id} {...swap} className="p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <Avatar name={src.lead.name} size="lg" tone={active} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[17px] font-semibold leading-tight tracking-tight">{src.lead.name}</p>
                    <p className="truncate text-[12.5px] text-fg-muted">{src.lead.course}</p>
                  </div>
                  <Pill tone="primary">New</Pill>
                </div>

                <div className="mt-4 rounded-xl bg-canvas-alt p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">Lead source</p>
                  <p className="mt-1 flex items-center gap-2 text-[15px] font-semibold">
                    <Icon aria-hidden className="h-4 w-4 text-primary" /> {src.label}
                    <span className="text-[12.5px] font-normal text-fg-muted">· {src.how}</span>
                  </p>
                  <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[11px]">
                    {(["source", "medium", "campaign"] as const).map((k) => (
                      <div key={k} className="contents">
                        <dt className="text-fg-faint">utm_{k}</dt>
                        <dd className="truncate text-fg">{src.lead.utm[k]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <dl className="mt-3.5 grid grid-cols-2 gap-3 text-[12.5px]">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">Next follow-up</dt>
                    <dd className="mt-0.5 font-medium">Call within 15 minutes</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">Assigned to</dt>
                    <dd className="mt-0.5 flex items-center gap-1.5 font-medium">
                      <UserRound aria-hidden className="h-3.5 w-3.5 text-fg-muted" /> Karan Mehta · Sales
                    </dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>

            {/* where it goes next */}
            <div className="border-t border-edge px-4 py-3">
              <ol className="flex items-center gap-1" aria-label="Pipeline stages">
                {STAGES.map((s, i) => (
                  <li key={s} className="flex flex-1 flex-col gap-1.5">
                    <span className={clsx("h-1 rounded-full", i === 0 ? "bg-primary" : "bg-edge")} />
                    <span className={clsx("hidden truncate text-[9px] sm:block", i === 0 ? "font-semibold text-primary" : "text-fg-faint")}>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* earlier arrivals stack behind the card */}
          <ul aria-label="Earlier leads" className="mt-3 space-y-1.5">
            {recent.map((s, k) => (
              <li key={`${s.id}-${k}`} className="flex items-center gap-2.5 rounded-xl border border-edge bg-panel/80 px-3 py-2 text-[12px]" style={{ opacity: 1 - k * 0.28 }}>
                <Avatar name={s.lead.name} size="sm" />
                <span className="min-w-0 flex-1 truncate font-medium">{s.lead.name}</span>
                <span className="shrink-0 text-fg-muted">{s.label}</span>
                <span className="shrink-0 font-mono text-[10px] text-fg-faint">{(k + 1) * 3} min ago</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Illustrative interface · sample data</p>
    </div>
  );
}
