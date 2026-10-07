"use client";

import { useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { CalendarClock, CheckCircle2, FileInput, Flag, IndianRupee, MessageCircle, Phone, StickyNote, UserRound, type LucideIcon } from "lucide-react";
import { Avatar, Pill } from "@/components/marketing/screens/primitives";
import { ScrollStory } from "@/components/site-ui/ScrollStory";
import { easeInOut, lerp, settle, useStepClock } from "../shared/clock";
import { CONVERSION, END_COL, EVENTS, LEAD, LEAD_STEPS, NEXT_FOLLOW_UP, STAGES, type Evt } from "./data";

const N = LEAD_STEPS.length;
const COLS = STAGES.length;
const BASE_COUNTS = [7, 5, 3, 2, 3, 2, 2, 4];
const DOT = ["bg-primary", "bg-primary", "bg-navy", "bg-navy", "bg-gold", "bg-sky", "bg-green", "bg-green"];
const PILL_TONE = ["primary", "primary", "yellow", "primary", "yellow", "primary", "primary", "green"] as const;
const ICON: Record<Evt["icon"], LucideIcon> = { form: FileInput, phone: Phone, chat: MessageCircle, cal: CalendarClock, check: CheckCircle2, note: StickyNote, flag: Flag, rupee: IndianRupee };
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Seven steps; the lead card crosses the pipeline as you scroll. */
export function LeadStory() {
  return <ScrollStory steps={LEAD_STEPS} perStep={0.7} stageHeight="min(760px, calc(100svh - 120px))" stage={(i, p) => <LeadStage step={i} progress={p} />} />;
}

function LeadStage({ step, progress }: { step: number; progress: number }) {
  const { u } = useStepClock(step, progress, N);
  const v = settle(u);
  const start = step === 0 ? 0 : END_COL[step - 1];
  const pos = lerp(start, END_COL[step], easeInOut(v));
  const col = Math.round(pos);
  const reach = step + v; // how far through the whole story we are

  const counts = BASE_COUNTS.map((c, i) => c + (i === col ? 1 : 0));
  const convertedAfter = col === COLS - 1;
  const revenue = (BASE_COUNTS[COLS - 1] + (convertedAfter ? 1 : 0)) * LEAD.fee;
  const events = EVENTS.filter((e) => reach >= e.at).slice(-4).reverse();
  const entered = step === 0 ? v : 1;

  // on phones the rail scrolls; keep the travelling card in view
  const rail = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = rail.current;
    if (!el || el.scrollWidth <= el.clientWidth + 2) return;
    const center = ((pos + 0.5) / COLS) * el.scrollWidth;
    el.scrollLeft = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, center - el.clientWidth / 2));
  }, [pos]);

  return (
    <div role="img" aria-label={`Illustrative interface, sample data. Step ${step + 1} of ${N}: ${LEAD_STEPS[step].title}. The lead is in ${STAGES[col]}.`} className="window rounded-[24px]">
      {/* header with live numbers */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-edge px-4 py-3">
        <div>
          <p className="text-[13px] font-semibold">Admissions pipeline</p>
          <p className="text-[11px] text-fg-muted">Leads · all sources · this month</p>
        </div>
        <div className="flex items-center gap-4 text-right">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">Converted</p>
            <p className="font-display text-[18px] font-semibold tabular-nums leading-tight">{counts[COLS - 1]}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">Revenue</p>
            <motion.p key={revenue} initial={{ color: "rgb(var(--green))", y: -4 }} animate={{ color: "rgb(var(--foreground))", y: 0 }} transition={{ duration: 0.9 }} className="font-display text-[18px] font-semibold tabular-nums leading-tight">
              {inr(revenue)}
            </motion.p>
          </div>
        </div>
      </div>

      {/* the pipeline rail with the travelling card */}
      <div ref={rail} className="no-scrollbar overflow-x-auto px-3 pb-3 pt-3">
        <div className="relative min-w-[640px]">
          <div className="grid grid-cols-8 gap-1.5">
            {STAGES.map((name, i) => {
              const here = i === col;
              return (
                <div key={name} className={clsx("min-h-[168px] rounded-xl p-1.5 transition-colors duration-300", here ? "bg-primary-tint ring-1 ring-primary/40" : "bg-canvas-alt")}>
                  <div className="mb-1.5 flex items-start gap-1 px-0.5">
                    <span className={clsx("mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full", DOT[i])} />
                    <p className="min-h-[24px] flex-1 text-[9.5px] font-semibold leading-[12px]">{name}</p>
                    <span className="font-mono text-[9.5px] tabular-nums text-fg-faint">{counts[i]}</span>
                  </div>
                  <div className="space-y-1">
                    {Array.from({ length: Math.min(2, BASE_COUNTS[i]) }).map((_, k) => (
                      <div key={k} className="rounded-md border border-edge bg-panel px-1.5 py-1.5">
                        <span className="block h-1.5 w-3/4 rounded bg-sunken" />
                        <span className="mt-1 block h-1 w-1/2 rounded bg-sunken" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* the lead */}
          <div
            className="pointer-events-none absolute top-[44px] z-10 w-[118px] -translate-x-1/2"
            style={{ left: `${((pos + 0.5) / COLS) * 100}%`, opacity: entered, transform: `translateX(-50%) translateY(${(1 - entered) * -14}px)` }}
          >
            <div className={clsx("rounded-lg border bg-panel p-2 shadow-lift transition-colors duration-300", convertedAfter ? "border-green ring-2 ring-green/30" : "border-primary ring-2 ring-primary/25")}>
              <div className="flex items-center gap-1.5">
                <Avatar name={LEAD.name} size="sm" tone={0} />
                <span className="truncate text-[10.5px] font-semibold">{LEAD.name}</span>
              </div>
              <p className="mt-1 truncate text-[9.5px] text-fg-muted">Prelims Foundation</p>
              <div className="mt-1.5 flex items-center justify-between gap-1">
                <span className="truncate rounded bg-sunken px-1 py-0.5 text-[9px] text-fg-muted">{LEAD.source}</span>
                {convertedAfter ? <span className="font-mono text-[9.5px] font-semibold text-green">{inr(LEAD.fee)}</span> : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* the lead's detail card */}
      <div className="grid gap-4 border-t border-edge p-4 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <Avatar name={LEAD.name} size="lg" tone={0} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold leading-tight">{LEAD.name}</p>
              <p className="truncate text-[12px] text-fg-muted">{LEAD.course}</p>
            </div>
            <Pill tone={PILL_TONE[col]} className="transition-colors duration-300">
              {STAGES[col]}
            </Pill>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[12px]">
            <Field label="Lead source">
              {LEAD.source}
              <span className="mt-1 flex flex-wrap gap-1">
                {[LEAD.utm.medium, LEAD.utm.campaign].map((t) => (
                  <span key={t} className="rounded bg-sunken px-1.5 py-0.5 font-mono text-[9.5px] text-fg-muted">
                    {t}
                  </span>
                ))}
              </span>
            </Field>
            <Field label="Assigned to">
              <span className="flex items-center gap-1.5">
                <UserRound aria-hidden className="h-3.5 w-3.5 text-fg-muted" /> {LEAD.owner}
              </span>
              <span className="text-[10.5px] text-fg-muted">{LEAD.ownerRole}</span>
            </Field>
            <Field label="Next follow-up">
              <motion.span key={step} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="block">
                {NEXT_FOLLOW_UP[step]}
              </motion.span>
            </Field>
            <Field label="Conversion">
              <span className={clsx("font-semibold", CONVERSION[step] === "Converted" ? "text-green" : CONVERSION[step] === "In trial" ? "text-primary" : "text-fg-muted")}>
                {CONVERSION[step] === "Converted" ? `Converted · ${inr(LEAD.fee)}` : CONVERSION[step]}
              </span>
            </Field>
          </dl>

          <div className={clsx("mt-3 rounded-lg border border-dashed border-edge px-2.5 py-2 text-[11.5px] leading-snug transition-opacity duration-500", reach >= 2.5 ? "opacity-100" : "opacity-0")}>
            <span className="font-semibold">Notes · </span>
            <span className="text-fg-muted">Wants the evening batch. Her father will pay the fee.</span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">Activity</p>
          <ol className="relative mt-2 space-y-2.5 border-l border-edge pl-4">
            <AnimatePresence initial={false}>
              {events.map((e) => {
                const Icon = ICON[e.icon];
                return (
                  <motion.li key={e.text} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative text-[11.5px] leading-snug">
                    <span className="absolute -left-[25px] top-0 grid h-[18px] w-[18px] place-items-center rounded-full border border-edge bg-panel text-primary">
                      <Icon aria-hidden className="h-2.5 w-2.5" />
                    </span>
                    <span className="block font-medium">{e.text}</span>
                    <span className="block font-mono text-[9.5px] text-fg-faint">{e.time}</span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-fg-faint">{label}</dt>
      <dd className="mt-0.5 min-w-0 text-[12px] font-medium">{children}</dd>
    </div>
  );
}
