"use client";

import { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { PLANS, annual, monthly, planById, rupees, rupeesShort, type PlanId } from "../plans";

// What a percentage cut costs, next to the flat annual cost of a VILMS plan.
// It is arithmetic on the visitor's own numbers: income × cut, against
// twelve months of the plan's price from `pricing.plans`.

const INCOME_STOPS = [1_00_000, 2_00_000, 3_00_000, 5_00_000, 7_50_000, 10_00_000, 15_00_000, 20_00_000, 30_00_000, 50_00_000, 75_00_000, 1_00_00_000, 1_50_00_000, 2_00_00_000, 3_00_00_000, 5_00_00_000];
const DEFAULT_STOP = 8; // ₹30 L — the sample institute: 200 students paying ₹15,000
const DEFAULT_CUT = 5;

function Money({ value, className }: { value: number; className?: string }) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 150, damping: 24, mass: 0.6 });
  const text = useTransform(spring, (v) => rupees(v));
  useEffect(() => {
    mv.set(value);
    if (reduced) spring.jump(value);
  }, [value, reduced, mv, spring]);
  return <motion.span className={className}>{text}</motion.span>;
}

export function CutCalculator({ className }: { className?: string }) {
  const uid = useId();
  const [stop, setStop] = useState(DEFAULT_STOP);
  const [cut, setCut] = useState(DEFAULT_CUT);
  const [planId, setPlanId] = useState<PlanId>("growth");

  const income = INCOME_STOPS[stop];
  const plan = planById(planId);
  const cutCost = (income * cut) / 100;
  const flat = annual(plan);
  const max = Math.max(cutCost, flat);
  const cheaper = flat <= cutCost;
  const breakEven = cut > 0 ? flat / (cut / 100) : Infinity;

  const bar = (v: number) => `${Math.max(1.5, (v / max) * 100)}%`;

  return (
    <div className={clsx("rounded-[28px] border border-edge bg-panel p-5 shadow-window sm:p-7", className)}>
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg-muted">What a % cut costs you</p>

      {/* inputs */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={`${uid}-income`} className="text-[13.5px] font-semibold">
              Fee income a year
            </label>
            <output htmlFor={`${uid}-income`} className="font-mono text-[15px] font-medium tabular-nums">
              {rupeesShort(income)}
            </output>
          </div>
          <input
            id={`${uid}-income`}
            type="range"
            min={0}
            max={INCOME_STOPS.length - 1}
            step={1}
            value={stop}
            onChange={(e) => setStop(Number(e.target.value))}
            aria-valuetext={`${rupees(income)} a year`}
            className="price-range mt-1 w-full"
            style={{ ["--fill" as string]: `${(stop / (INCOME_STOPS.length - 1)) * 100}%` }}
          />
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={`${uid}-cut`} className="text-[13.5px] font-semibold">
              Platform&apos;s cut of each sale
            </label>
            <output htmlFor={`${uid}-cut`} className="font-mono text-[15px] font-medium tabular-nums">
              {cut}%
            </output>
          </div>
          <input
            id={`${uid}-cut`}
            type="range"
            min={1}
            max={30}
            step={1}
            value={cut}
            onChange={(e) => setCut(Number(e.target.value))}
            aria-valuetext={`${cut} percent`}
            className="price-range mt-1 w-full"
            style={{ ["--fill" as string]: `${((cut - 1) / 29) * 100}%` }}
          />
        </div>
      </div>

      {/* plan to compare against */}
      <fieldset className="mt-5">
        <legend className="text-[13.5px] font-semibold">Compare with a VILMS plan</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PLANS.map((p) => {
            const on = p.id === planId;
            return (
              <label
                key={p.id}
                className={clsx(
                  "relative cursor-pointer rounded-full border px-3.5 py-1.5 text-[13.5px] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary",
                  on ? "border-navy bg-navy text-white" : "border-edge text-fg-muted hover:border-edge-strong hover:text-fg",
                )}
              >
                <input type="radio" name={`${uid}-plan`} value={p.id} checked={on} onChange={() => setPlanId(p.id)} className="sr-only" />
                {p.name}
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-[12.5px] text-fg-muted">
          {plan.students} · {plan.price}/month
        </p>
      </fieldset>

      {/* the comparison */}
      <div className="mt-6 space-y-4 border-t border-edge pt-6" aria-live="polite">
        <div>
          <div className="flex items-baseline justify-between gap-3 text-[13.5px]">
            <span className="font-medium">{cut}% platform cut</span>
            <Money value={cutCost} className="font-mono text-[17px] font-medium tabular-nums sm:text-[19px]" />
          </div>
          <div className="mt-2 h-3.5 overflow-hidden rounded-full bg-sunken">
            <motion.div initial={false} animate={{ width: bar(cutCost) }} transition={{ duration: 0.6, ease: EASE }} className="h-full rounded-full bg-red" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-3 text-[13.5px]">
            <span className="font-medium">
              VILMS {plan.name} <span className="font-normal text-fg-muted">· 12 × {plan.price}</span>
            </span>
            <Money value={flat} className="font-mono text-[17px] font-medium tabular-nums sm:text-[19px]" />
          </div>
          <div className="mt-2 h-3.5 overflow-hidden rounded-full bg-sunken">
            <motion.div initial={false} animate={{ width: bar(flat) }} transition={{ duration: 0.6, ease: EASE }} className="h-full rounded-full bg-primary" />
          </div>
        </div>
      </div>

      <div className={clsx("mt-6 rounded-2xl px-4 py-4 sm:px-5", cheaper ? "bg-green-tint" : "bg-canvas-alt")}>
        {cheaper ? (
          <>
            <p className="text-[13px] text-fg-muted">At these numbers you would keep</p>
            <p className="mt-0.5 font-display text-[clamp(26px,3.2vw,36px)] font-medium leading-none tracking-[-0.03em] text-green">
              <Money value={cutCost - flat} /> <span className="text-[15px] font-normal text-fg-muted">more a year</span>
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-[19px] font-medium leading-snug tracking-[-0.02em]">At this income a {cut}% cut costs less than the {plan.name} plan.</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">
              The flat plan is cheaper once fee income passes <b className="font-semibold text-fg">{rupeesShort(breakEven)}</b> a year, or pick a smaller plan.
            </p>
          </>
        )}
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-fg-faint">
        Plain arithmetic on your inputs, not a quote. VILMS prices exclude 18% GST ({rupees(monthly(plan))} a month before GST). Any monthly fee a platform also charges is not counted. Starting values are a sample institute: 200 students paying ₹15,000 each.
      </p>
    </div>
  );
}
