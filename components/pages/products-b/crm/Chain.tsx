"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Check, Funnel, IndianRupee, MessageCircle, Phone, Timer, UserPlus, type LucideIcon } from "lucide-react";
import { Avatar, Pill } from "@/components/marketing/screens/primitives";
import { swap } from "@/components/site-ui/motion-tokens";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { CHAIN, SOURCES, SOURCE_CAPTIONS } from "./data";
import { SOURCE_ICON } from "./CrmHero";

const NODE_ICON: Record<(typeof CHAIN)[number]["id"], LucideIcon> = {
  lead: UserPlus,
  crm: Funnel,
  calling: Phone,
  whatsapp: MessageCircle,
  demo: CalendarCheck,
  trial: Timer,
  conversion: IndianRupee,
};

/**
 * The whole chain, from ad click to paid enrolment. A lead walks along it by
 * itself; hover or click any node (sources too) to stop and read it.
 */
export function Chain() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [auto] = useAutoplay(CHAIN.length, { interval: 2300, running: inView && !reduced && !hover && !picked });

  const current = hover ?? picked;
  const trackIdx = current ? Math.max(0, CHAIN.findIndex((c) => c.id === current)) : auto;
  const activeId: string = current ?? CHAIN[auto].id;
  const isSource = SOURCES.some((s) => s.id === activeId);
  const node = CHAIN.find((c) => c.id === activeId);
  const source = SOURCES.find((s) => s.id === activeId);

  const bind = (id: string) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setHover(id);
    },
    onPointerLeave: () => setHover(null),
    onFocus: () => setHover(id),
    onBlur: () => setHover(null),
    onClick: () => setPicked((p) => (p === id ? null : id)),
  });

  return (
    <div ref={ref}>
      <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-0">
        {/* sources */}
        <div>
          <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint lg:hidden">Where leads come from</p>
          <ul className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-col lg:gap-2 lg:pr-10">
            {SOURCES.map((s) => {
              const I = SOURCE_ICON[s.id];
              const on = activeId === s.id;
              return (
                <li key={s.id} className="relative">
                  <button
                    type="button"
                    aria-pressed={picked === s.id}
                    {...bind(s.id)}
                    className={clsx(
                      "flex min-h-[40px] w-full items-center gap-2.5 whitespace-nowrap rounded-full border py-1 pl-1 pr-4 text-[13.5px] font-medium transition duration-200 hover:-translate-y-px lg:min-w-[172px]",
                      on ? "border-navy bg-navy text-white" : "border-edge bg-panel",
                    )}
                  >
                    <span className={clsx("grid h-8 w-8 shrink-0 place-items-center rounded-full", on ? "bg-white/15" : "bg-primary-tint text-primary")}>
                      <I aria-hidden className="h-4 w-4" />
                    </span>
                    {s.label}
                  </button>
                  <span aria-hidden className={clsx("absolute left-full top-1/2 hidden h-px w-[22px] transition-colors lg:block", on ? "bg-navy" : "bg-edge-strong")} />
                </li>
              );
            })}
            {/* the bus joining them */}
            <span aria-hidden className="absolute bottom-5 right-[18px] top-5 hidden w-px bg-edge-strong lg:block" />
            <span aria-hidden className={clsx("absolute right-0 top-1/2 hidden h-px w-[18px] transition-colors lg:block", isSource ? "bg-navy" : "bg-edge-strong")} />
          </ul>
        </div>

        {/* the track */}
        <div className="relative min-w-0 lg:mt-[84px]">
          <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint lg:hidden">What happens next</p>
          {/* rail + progress, desktop */}
          <span aria-hidden className="absolute left-[calc(100%/14)] right-[calc(100%/14)] top-6 hidden h-px bg-edge-strong lg:block" />
          <span
            aria-hidden
            className="absolute left-[calc(100%/14)] top-6 hidden h-[2px] -translate-y-px bg-navy transition-[width] duration-700 ease-out lg:block"
            style={{ width: `calc((100% - 100% / 7) * ${trackIdx / (CHAIN.length - 1)})` }}
          />
          {/* rail, mobile */}
          <span aria-hidden className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-edge-strong lg:hidden" />

          <ol className="relative grid gap-1 lg:grid-cols-7 lg:gap-0">
            {CHAIN.map((c, i) => {
              const I = NODE_ICON[c.id];
              const passed = i < trackIdx;
              const on = activeId === c.id;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-pressed={picked === c.id}
                    {...bind(c.id)}
                    className="group flex w-full items-center gap-4 rounded-xl py-1 text-left lg:flex-col lg:gap-2.5"
                  >
                    <span
                      className={clsx(
                        "relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 bg-canvas transition duration-300 group-hover:-translate-y-0.5",
                        on ? "border-navy bg-navy text-white shadow-lift" : passed ? "border-navy text-navy" : "border-edge-strong text-fg-muted group-hover:border-primary group-hover:text-primary",
                      )}
                    >
                      {on ? <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-navy/40" /> : null}
                      <I aria-hidden className="h-[18px] w-[18px]" />
                    </span>
                    <span className={clsx("text-[14.5px] font-medium transition-colors", on ? "text-fg" : "text-fg-muted group-hover:text-fg")}>{c.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* what the active node means */}
      <div className="mt-10 grid min-h-[168px] items-center gap-6 rounded-[24px] border border-edge bg-panel p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={activeId} {...swap}>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">{isSource ? "Source" : `Step ${trackIdx + 1} of ${CHAIN.length}`}</p>
            <h3 className="mt-2 font-display text-[clamp(28px,3.4vw,44px)] font-medium leading-none tracking-[-0.035em]">{source ? source.label : node?.label}</h3>
            <p className="mt-3 max-w-[460px] text-[16px] leading-relaxed text-fg-muted">{source ? SOURCE_CAPTIONS[source.id] : node?.text}</p>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${activeId}-v`} {...swap} className="min-w-0">
            <Peek id={activeId} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** A small slice of the real interface for the active node. */
function Peek({ id }: { id: string }) {
  const src = SOURCES.find((s) => s.id === id);
  const shell = "rounded-2xl border border-edge bg-canvas-alt p-3.5";
  if (src) {
    return (
      <div className={shell}>
        <div className="flex items-center gap-2.5">
          <Avatar name={src.lead.name} tone={0} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold">{src.lead.name}</p>
            <p className="truncate text-[11.5px] text-fg-muted">{src.lead.course}</p>
          </div>
          <Pill tone="primary">New</Pill>
        </div>
        <p className="mt-3 truncate font-mono text-[10.5px] text-fg-muted">
          utm_source={src.lead.utm.source} · utm_campaign={src.lead.utm.campaign}
        </p>
      </div>
    );
  }
  switch (id) {
    case "lead":
      return (
        <div className={shell}>
          <div className="flex items-center gap-2.5">
            <Avatar name="Neha Verma" tone={0} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold">Neha Verma</p>
              <p className="text-[11.5px] text-fg-muted">Prelims Foundation</p>
            </div>
            <Pill tone="primary">New</Pill>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Pill>Meta Ads</Pill>
            <Pill>prelims-june</Pill>
          </div>
        </div>
      );
    case "crm":
      return (
        <div className={shell}>
          <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-[12px]">
            {[
              ["Status", "Contacted"],
              ["Owner", "Karan Mehta"],
              ["Next follow-up", "Today, 6 PM"],
              ["Notes", "Evening batch"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-fg-faint">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "calling":
      return (
        <div className={shell}>
          <p className="flex items-center gap-2 text-[13px] font-semibold">
            <Phone aria-hidden className="h-4 w-4 text-primary" /> Called Neha · 4 min
          </p>
          <p className="mt-2 rounded-lg bg-panel px-3 py-2 text-[12px] text-fg-muted">Outcome: interested, wants a demo. Note saved to the lead.</p>
        </div>
      );
    case "whatsapp":
      return (
        <div className={shell}>
          <p className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-green-tint px-3 py-2 text-[12.5px] leading-snug">Hi Neha, here are the Prelims Foundation details. Want a demo class on Thursday?</p>
          <p className="mt-1.5 text-right font-mono text-[10px] text-fg-faint">Sent from your Wati account</p>
        </div>
      );
    case "demo":
      return (
        <div className={shell}>
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold">Demo class</p>
            <Pill tone="yellow">Demo Scheduled</Pill>
          </div>
          <p className="mt-2 text-[12px] text-fg-muted">Thu 5:00 PM · next follow-up set to the demo</p>
        </div>
      );
    case "trial":
      return (
        <div className={shell}>
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold">Trial running</p>
            <Pill tone="primary">Trial Started</Pill>
          </div>
          <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-sunken">
            <span className="block h-full w-[35%] rounded-full bg-primary" />
          </span>
          <p className="mt-2 text-[12px] text-fg-muted">Day 5 of 14 · check-in scheduled</p>
        </div>
      );
    default:
      return (
        <div className={shell}>
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold">Neha Verma</p>
            <Pill tone="green">
              <Check aria-hidden className="h-3 w-3" /> Converted
            </Pill>
          </div>
          <p className="mt-2 font-display text-[26px] font-semibold tabular-nums leading-none">₹15,000</p>
          <p className="mt-1 text-[12px] text-fg-muted">Prelims Foundation · from Meta Ads</p>
        </div>
      );
  }
}
