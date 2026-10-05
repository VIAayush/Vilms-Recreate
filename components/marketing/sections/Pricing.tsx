"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { Check, Mail } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { TrackView } from "@/components/site/TrackView";
import { brand, pricing, type Plan } from "@/lib/content";
import { TONE, type Tone } from "../tone";

// A colour per plan, so the four read as four different sizes at a glance.
const PLAN_TONE: Record<Plan["id"], Tone> = { base: "blue", growth: "steel", scale: "gold", institute: "navy" };

// Slider stops (students). The last stop means "more than the largest plan".
const STOPS = [50, 100, 200, 300, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 7500, 10000, 15000, 15001];
const LARGEST = pricing.plans[pricing.plans.length - 1].limit;

/** The smallest plan whose published student limit covers `students`. */
function planFor(students: number): Plan | null {
  return pricing.plans.find((p) => students <= p.limit) ?? null;
}

const fmt = (n: number) => n.toLocaleString("en-IN");

export function Pricing() {
  const uid = useId();
  const [stop, setStop] = useState(3);
  const students = STOPS[stop];
  const over = students > LARGEST;
  const fit = planFor(students);
  const fill = (stop / (STOPS.length - 1)) * 100;

  return (
    <section id="pricing" aria-labelledby="pricing-title" data-glow className="glow-section border-y border-edge bg-wash-blue py-24 sm:py-32">
      <TrackView name="pricing_view" />
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <p className="kicker">{pricing.kicker}</p>
            <h2 id="pricing-title" className="h2 mt-4 max-w-[15ch]">
              {pricing.title}
            </h2>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-fg-muted lg:justify-end lg:pb-3">
            {pricing.trialNote.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check aria-hidden className="h-4 w-4 text-green" strokeWidth={3} /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* The slider */}
        <div className="mt-12 rounded-2xl border border-edge bg-panel p-5 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <label htmlFor={`${uid}-students`} className="text-[15px] font-medium text-fg-muted">
              How many students do you teach?
            </label>
            <p className="font-display text-[clamp(30px,4vw,44px)] font-semibold leading-none tabular-nums tracking-tight" aria-hidden>
              {over ? `${fmt(LARGEST)}+` : fmt(students)}
              <span className="ml-2 text-[16px] font-medium tracking-normal text-fg-muted">students</span>
            </p>
          </div>
          <input
            id={`${uid}-students`}
            type="range"
            min={0}
            max={STOPS.length - 1}
            step={1}
            value={stop}
            onChange={(e) => setStop(Number(e.target.value))}
            aria-valuetext={over ? `More than ${fmt(LARGEST)} students` : `${fmt(students)} students`}
            className="price-range mt-6 w-full"
            style={{ "--fill": `${fill}%` } as React.CSSProperties}
          />
          <div aria-hidden className="mt-2 flex justify-between font-mono text-[11px] text-fg-faint">
            <span>50</span>
            <span>500</span>
            <span>2,000</span>
            <span>5,000</span>
            <span>15,000+</span>
          </div>
          <p className="mt-5 text-[15px]" aria-live="polite">
            {over ? (
              <>
                <b className="font-semibold">{pricing.custom.title}</b> <span className="text-fg-muted">{pricing.custom.text}</span>
              </>
            ) : fit ? (
              <>
                <span className="text-fg-muted">Recommended:</span> <b className="font-semibold">{fit.name}</b>{" "}
                <span className="text-fg-muted">
                  · {fit.price}/month · {fit.students}
                </span>
              </>
            ) : null}
          </p>
        </div>

        {/* The plans: one row of columns, the recommended one lifted. */}
        <ol className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {pricing.plans.map((p) => {
            const on = !over && fit?.id === p.id;
            return (
              <li
                key={p.id}
                data-glow
                style={{ "--glow": TONE[PLAN_TONE[p.id]].rgb } as React.CSSProperties}
                className={clsx(
                  "glow-card group relative flex flex-col overflow-hidden rounded-2xl border bg-panel p-6 transition-[transform,box-shadow,border-color] duration-300",
                  on
                    ? "z-10 border-primary shadow-window ring-1 ring-primary"
                    : "border-edge hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft",
                )}
              >
                <span aria-hidden className={clsx("absolute inset-x-0 top-0 h-1 transition-[height] duration-300 group-hover:h-1.5", TONE[PLAN_TONE[p.id]].fill)} />
                <div className="flex items-center justify-between gap-2">
                  <p className={clsx("text-[13px] font-medium", TONE[PLAN_TONE[p.id]].text)}>{p.stage}</p>
                  {on ? <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-ink">Fits your size</span> : null}
                </div>
                <h3 className="mt-3 font-display text-[26px] font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-[40px] font-semibold leading-none tracking-[-0.04em]">{p.price}</span>
                  <span className="text-[14px] text-fg-muted">/month</span>
                </p>
                <p className="mt-2 text-[14px] font-medium">{p.students}</p>
                <p className="text-[12.5px] text-fg-muted">{p.perStudent} per student / month at the limit</p>
                <p className="mt-4 text-[14px] leading-relaxed text-fg-muted">{p.blurb}</p>
                <ul className="mt-4 space-y-2 text-[13.5px]">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <Check aria-hidden className={clsx("mt-0.5 h-4 w-4 shrink-0", TONE[PLAN_TONE[p.id]].text)} /> {pt}
                    </li>
                  ))}
                  <li className="flex gap-2 text-fg-muted">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-fg-faint" /> {p.onboarding}
                  </li>
                </ul>
                <div className="mt-auto pt-6">
                  <Cta intent="trial" location={`pricing_${p.id}`} className={clsx("cta w-full", on ? "cta-primary" : "cta-outline")}>
                    Start 14-day trial
                  </Cta>
                </div>
              </li>
            );
          })}
        </ol>

        {over ? (
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-primary/40 bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px]">
              <b className="font-semibold">{pricing.custom.title}</b> <span className="text-fg-muted">{pricing.custom.text}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${brand.emails.general}?subject=${encodeURIComponent("Custom quote for VILMS")}`} className="cta cta-ghost">
                <Mail aria-hidden className="h-4 w-4" /> {brand.emails.general}
              </a>
              <Cta intent="demo" location="pricing_custom" className="cta cta-outline" arrow>
                Book a Demo
              </Cta>
            </div>
          </div>
        ) : null}

        <div className="mt-14 grid gap-8 border-t border-edge pt-10 lg:grid-cols-[220px_1fr]">
          <p className="font-display text-[20px] font-semibold tracking-tight">Every plan includes</p>
          <ul className="grid gap-x-8 gap-y-3 text-[14.5px] sm:grid-cols-2 xl:grid-cols-4">
            {pricing.everyPlan.map((t) => (
              <li key={t} className="flex gap-2">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-green" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 max-w-[760px] text-[13px] leading-relaxed text-fg-muted">{pricing.footnote}</p>
      </div>
    </section>
  );
}
