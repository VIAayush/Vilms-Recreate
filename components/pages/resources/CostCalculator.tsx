"use client";

import { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Info } from "lucide-react";
import { inr, useReducedMotion } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { pricing } from "@/lib/content";

const PLANS = pricing.plans.map((p) => ({ ...p, monthly: Number(p.price.replace(/[^\d]/g, "")) }));
const GST = 1.18;

const digits = (s: string, max = 10) => s.replace(/\D/g, "").slice(0, max);

/** ₹12,34,567 → "₹12.3L" style short form for chart labels. */
function short(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(n >= 1e8 ? 0 : 1).replace(/\.0$/, "")}Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(n >= 1e6 ? 0 : 1).replace(/\.0$/, "")}L`;
  if (n >= 1e3) return `₹${Math.round(n / 1e3)}K`;
  return `₹${Math.round(n)}`;
}

function Money({ value, className }: { value: number; className?: string }) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 150, damping: 26 });
  const text = useTransform(spring, (v) => inr(Math.round(Math.max(0, v))));
  useEffect(() => {
    mv.set(value);
  }, [value, mv]);
  if (reduced) return <span className={className}>{inr(Math.round(value))}</span>;
  return <motion.span className={className}>{text}</motion.span>;
}

/**
 * Cost calculator: a revenue-share platform's annual cost (your fee income ×
 * their cut, plus any monthly fee) against a VILMS plan from pricing.plans
 * (monthly price × 12). Pure arithmetic in the browser: nothing is sent or
 * stored. It says so when the percentage is the cheaper option, and where the
 * two cross.
 */
export function CostCalculator() {
  const uid = useId();
  const [income, setIncome] = useState("2000000");
  const [cut, setCut] = useState(10);
  const [theirMonthly, setTheirMonthly] = useState("0");
  const [planId, setPlanId] = useState(PLANS[1].id);
  const [withGst, setWithGst] = useState(false);

  const fee = Number(income) || 0;
  const monthly = Number(theirMonthly) || 0;
  const plan = PLANS.find((p) => p.id === planId)!;
  const vilms = plan.monthly * 12 * (withGst ? GST : 1);
  const theirs = fee * (cut / 100) + monthly * 12;
  const diff = theirs - vilms;
  const fixed = monthly * 12;
  const breakEven = cut > 0 ? (vilms - fixed) / (cut / 100) : null;
  const max = Math.max(theirs, vilms, 1);

  // chart: income on x, annual cost on y
  const xMax = Math.max(fee * 1.6, breakEven && breakEven > 0 ? breakEven * 1.35 : 0, 200000);
  const yMax = Math.max(fixed + xMax * (cut / 100), vilms) * 1.12 || 1;
  const px = (x: number) => (x / xMax) * 100;
  const py = (y: number) => 100 - (y / yMax) * 100;
  const crossX = breakEven && breakEven > 0 && breakEven < xMax ? px(breakEven) : null;

  const headline =
    Math.abs(diff) < 1
      ? "The two cost the same at these numbers."
      : diff > 0
        ? `VILMS costs ${inr(Math.round(diff))} less a year at these numbers.`
        : `The percentage costs ${inr(Math.round(-diff))} less a year at these numbers.`;

  const breakText =
    cut === 0
      ? "With no percentage, only the fixed fees differ."
      : breakEven === null || breakEven <= 0
        ? "Their fixed fee alone is already above the VILMS plan, so the flat plan is cheaper at any income."
        : `Below about ${inr(Math.round(breakEven))} of annual fee income the percentage costs less. Above it, the flat plan does.`;

  const fill = (v: number, min: number, maxV: number) => `${((v - min) / (maxV - min)) * 100}%`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
      {/* inputs */}
      <div className="min-w-0 rounded-[28px] border border-edge-strong bg-panel p-5 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Your numbers</p>

        <div className="mt-6">
          <label htmlFor={`${uid}-income`} className="v-label">
            Annual fee income
          </label>
          <div className="relative">
            <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted">
              ₹
            </span>
            <input id={`${uid}-income`} inputMode="numeric" autoComplete="off" className="v-field pl-8 tabular-nums" value={fee ? fee.toLocaleString("en-IN") : ""} placeholder="0" onChange={(e) => setIncome(digits(e.target.value))} />
          </div>
          <input
            type="range"
            aria-label="Annual fee income"
            className="price-range mt-3 w-full"
            min={100000}
            max={20000000}
            step={100000}
            value={Math.min(Math.max(fee, 100000), 20000000)}
            style={{ "--fill": fill(Math.min(Math.max(fee, 100000), 20000000), 100000, 20000000) } as React.CSSProperties}
            onChange={(e) => setIncome(e.target.value)}
          />
          <div className="flex justify-between font-mono text-[11px] text-fg-faint">
            <span>₹1L</span>
            <span>₹2Cr</span>
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor={`${uid}-cut`} className="v-label flex items-baseline justify-between">
            <span>Their cut of every sale</span>
            <span className="font-display text-[18px] tabular-nums">{cut}%</span>
          </label>
          <input
            id={`${uid}-cut`}
            type="range"
            className="price-range w-full"
            min={0}
            max={30}
            step={0.5}
            value={cut}
            style={{ "--fill": fill(cut, 0, 30) } as React.CSSProperties}
            onChange={(e) => setCut(Number(e.target.value))}
          />
          <div className="flex justify-between font-mono text-[11px] text-fg-faint">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor={`${uid}-fee`} className="v-label">
            Their monthly fee <span className="font-normal text-fg-faint">(optional)</span>
          </label>
          <div className="relative">
            <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted">
              ₹
            </span>
            <input id={`${uid}-fee`} inputMode="numeric" autoComplete="off" className="v-field pl-8 tabular-nums" value={monthly ? monthly.toLocaleString("en-IN") : ""} placeholder="0" onChange={(e) => setTheirMonthly(digits(e.target.value, 7))} />
          </div>
        </div>

        <fieldset className="mt-7">
          <legend className="v-label">VILMS plan</legend>
          <div className="grid grid-cols-2 gap-2">
            {PLANS.map((p) => (
              <label
                key={p.id}
                className={clsx(
                  "relative cursor-pointer rounded-xl border px-4 py-3 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary",
                  planId === p.id ? "border-navy bg-primary-tint/50" : "border-edge hover:border-edge-strong",
                )}
              >
                <input type="radio" name={`${uid}-plan`} value={p.id} checked={planId === p.id} onChange={() => setPlanId(p.id)} className="sr-only" />
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-medium">{p.name}</span>
                  <span className="font-display text-[15px] tabular-nums">{p.price}<span className="text-[11px] text-fg-muted">/mo</span></span>
                </span>
                <span className="mt-0.5 block text-[12.5px] text-fg-muted">{p.students}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="mt-5 flex cursor-pointer items-start gap-3 text-[14px] text-fg-muted">
          <input type="checkbox" checked={withGst} onChange={(e) => setWithGst(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--primary))]" />
          <span>Add 18% GST to the VILMS price. Plan prices exclude GST. Enter the other platform’s figures the same way you were quoted them.</span>
        </label>
      </div>

      {/* results */}
      <div className="band-navy relative min-w-0 overflow-hidden rounded-[28px] p-5 sm:p-8">
        <div aria-hidden className="grid-bg-dark pointer-events-none absolute inset-0" />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">One year, side by side</p>

          <div className="mt-6 space-y-5">
            {[
              { label: "Revenue-share platform", sub: `${fee ? inr(fee) : "₹0"} × ${cut}%${monthly ? ` + ${inr(monthly)} × 12` : ""}`, value: theirs, bar: "bg-fg-faint" },
              { label: `VILMS ${plan.name}`, sub: `${plan.price} × 12${withGst ? " + 18% GST" : ", excl. GST"} · 0% revenue share`, value: vilms, bar: "bg-primary" },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[15px] font-medium">{b.label}</p>
                  <Money value={b.value} className="font-display text-[clamp(22px,2.6vw,30px)] font-medium tabular-nums tracking-[-0.03em]" />
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-sunken">
                  <motion.div className={clsx("h-full rounded-full", b.bar)} initial={false} animate={{ width: `${Math.max(2, (b.value / max) * 100)}%` }} transition={{ duration: 0.6, ease: EASE }} />
                </div>
                <p className="mt-1.5 text-[12.5px] text-fg-muted">{b.sub}</p>
              </div>
            ))}
          </div>

          <div role="status" aria-live="polite" className="mt-6 border-t border-edge pt-5">
            <p className="font-display text-[clamp(20px,2.2vw,26px)] font-medium leading-tight tracking-[-0.03em]">{headline}</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">{breakText}</p>
          </div>

          {/* cost against income */}
          <figure className="mt-7" aria-label="Annual cost against fee income">
            <div className="relative ml-9 h-[190px]">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                {[0, 25, 50, 75, 100].map((y) => (
                  <line key={y} x1={0} x2={100} y1={y} y2={y} className="stroke-edge" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                ))}
                <line x1={px(Math.min(fee, xMax))} x2={px(Math.min(fee, xMax))} y1={0} y2={100} className="stroke-edge-strong" strokeWidth={1} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
                <line x1={0} x2={100} y1={py(vilms)} y2={py(vilms)} className="stroke-primary" strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
                <line x1={0} y1={py(fixed)} x2={100} y2={py(fixed + xMax * (cut / 100))} className="stroke-fg-muted" strokeWidth={2.5} strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
              </svg>
              {crossX !== null ? (
                <span aria-hidden className="absolute grid h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-primary bg-canvas" style={{ left: `${crossX}%`, top: `${py(vilms)}%` }} />
              ) : null}
              <span className="absolute -top-0.5 left-0 -translate-x-full pr-2 font-mono text-[10.5px] text-fg-faint">{short(yMax)}</span>
              <span className="absolute left-0 top-full pt-1.5 font-mono text-[10.5px] text-fg-faint">₹0</span>
              <span className="absolute right-0 top-full pt-1.5 font-mono text-[10.5px] text-fg-faint">{short(xMax)} fee income</span>
              <span className="absolute top-full -translate-x-1/2 whitespace-nowrap pt-1.5 font-mono text-[10.5px] text-fg" style={{ left: `${Math.min(92, Math.max(8, px(Math.min(fee, xMax))))}%` }}>
                {fee ? "you" : ""}
              </span>
            </div>
            <figcaption className="mt-9 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px] text-fg-muted">
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-0 w-5 border-t-[3px] border-dashed border-fg-muted" /> Revenue share
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-0 w-5 border-t-[3px] border-primary" /> VILMS flat plan
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      <p className="flex gap-2.5 text-[13px] leading-relaxed text-fg-faint lg:col-span-2">
        <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Illustrative arithmetic, not a quote. Other platforms’ pricing and terms vary and change, so use the figures from their own current price page. VILMS figures are the published monthly plan prices (excluding 18% GST) multiplied by twelve, and each plan has a student limit. Nothing you enter here is stored or sent.
        </span>
      </p>
    </div>
  );
}
