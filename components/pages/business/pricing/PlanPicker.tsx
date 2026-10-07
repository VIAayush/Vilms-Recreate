"use client";

import { useId } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { TrackView } from "@/components/site/TrackView";
import { useReducedMotion } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { brand, pricing } from "@/lib/content";
import { MAX_LIMIT, PLANS, perStudent } from "../plans";
import { STOPS, usePlanSelection } from "./PlanSelection";

const perStudentLabel = (n: number) => `₹${(Math.round(n * 10) / 10).toString()}`;

/** What a plan adds over the one below it, read from `pricing.compare`. */
function addedFeatures(i: number) {
  const added: string[] = [];
  let onboarding = "";
  for (const row of pricing.compare) {
    const v = row.values[i];
    if (typeof v === "string") onboarding = v;
    else if (i > 0 && v === true && row.values[i - 1] === false) added.push(row.label);
  }
  return { added, onboarding };
}

export function PlanPicker() {
  const id = useId();
  const reduced = useReducedMotion();
  const { stop, setStop, students, plan, planIndex, choose } = usePlanSelection();
  const custom = plan === null;
  const spring = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 320, damping: 32 };

  return (
    <div className="text-left">
      <TrackView name="pricing_view" />

      {/* size picker */}
      <div className="grid gap-6 rounded-[28px] border border-edge bg-panel p-5 shadow-window sm:p-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={id} className="text-[15px] font-semibold">
              How many students do you teach?
            </label>
          </div>
          <p className="mt-3 font-display text-[clamp(44px,6vw,68px)] font-medium leading-none tracking-[-0.04em] tabular-nums" aria-live="polite">
            {custom ? `${MAX_LIMIT.toLocaleString("en-IN")}+` : students.toLocaleString("en-IN")}
          </p>
          <input
            id={id}
            type="range"
            min={0}
            max={STOPS.length - 1}
            step={1}
            value={stop}
            onChange={(e) => setStop(Number(e.target.value))}
            aria-valuetext={custom ? `More than ${MAX_LIMIT} students` : `${students} students`}
            className="price-range mt-5 w-full"
            style={{ ["--fill" as string]: `${(stop / (STOPS.length - 1)) * 100}%` }}
          />
          <div aria-hidden className="relative mt-1 h-4 font-mono text-[10.5px] text-fg-faint">
            {PLANS.map((p) => (
              <span key={p.id} className="absolute -translate-x-1/2" style={{ left: `${(STOPS.indexOf(p.limit) / (STOPS.length - 1)) * 100}%` }}>
                {p.limit.toLocaleString("en-IN")}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-canvas-alt p-5" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {plan ? (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: EASE }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">Your fit</p>
                <p className="mt-1.5 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-[34px] font-medium leading-none tracking-[-0.03em]">{plan.name}</span>
                  <span className="text-[17px] font-medium tabular-nums">
                    {plan.price}
                    <span className="text-[14px] font-normal text-fg-muted"> /month</span>
                  </span>
                </p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-sunken" aria-hidden>
                  <motion.div initial={false} animate={{ width: `${(students / plan.limit) * 100}%` }} transition={{ duration: 0.4, ease: EASE }} className="h-full rounded-full bg-primary" />
                </div>
                <p className="mt-2 text-[13px] text-fg-muted">
                  {students.toLocaleString("en-IN")} of {plan.limit.toLocaleString("en-IN")} students
                </p>
                <p className="mt-3 text-[14px] leading-relaxed">
                  <span className="font-semibold">≈ {perStudentLabel(perStudent(plan))}</span> per student per month at full capacity. <span className="text-fg-muted">Excludes 18% GST.</span>
                </p>
                <Cta intent="trial" location={`pricing_fit_${plan.id}`} className="cta cta-primary mt-5 w-full sm:w-auto" arrow>
                  Start 14-day free trial
                </Cta>
              </motion.div>
            ) : (
              <motion.div key="custom" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: EASE }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">Your fit</p>
                <p className="mt-1.5 font-display text-[30px] font-medium leading-tight tracking-[-0.03em]">A custom quote</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted">Above {MAX_LIMIT.toLocaleString("en-IN")} students we price your institute individually.</p>
                <a href={`mailto:${brand.emails.general}?subject=Custom%20quote`} className="cta cta-primary mt-5 w-full sm:w-auto">
                  <Mail aria-hidden className="h-4 w-4" /> {brand.emails.general}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* the four plans */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((p, i) => {
          const on = planIndex === i;
          const { added, onboarding } = addedFeatures(i);
          return (
            <div key={p.id} className="relative">
              {on ? <motion.div layoutId={`${id}-ring`} transition={spring} className="absolute -inset-[3px] rounded-[27px] bg-navy" /> : null}
              <article
                className={clsx(
                  "relative flex h-full flex-col rounded-3xl border p-6 transition-[background-color,border-color,transform] duration-300",
                  on ? "border-transparent bg-panel" : "border-edge bg-canvas-alt hover:-translate-y-0.5 hover:border-edge-strong",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-[22px] font-medium tracking-[-0.02em]">{p.name}</h3>
                  {on ? <span className="rounded-full bg-navy px-2.5 py-1 text-[11.5px] font-semibold text-white">Your fit</span> : null}
                </div>
                <p className="mt-1 text-[13.5px] text-fg-muted">{p.bestFor}</p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-[44px] font-medium leading-none tracking-[-0.04em]">{p.price}</span>
                  <span className="text-[13.5px] text-fg-muted">/month</span>
                </p>
                <p className="mt-1 text-[12px] text-fg-faint">excl. 18% GST</p>
                <p className="mt-4 text-[15px] font-semibold">{p.students}</p>
                <p className="mt-0.5 text-[12.5px] text-fg-muted">≈ {perStudentLabel(perStudent(p))} per student per month at full capacity</p>

                <ul className="mt-5 space-y-2 border-t border-edge pt-5 text-[13.5px]">
                  <li className="flex items-start gap-2 font-medium">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={3} />
                    {i === 0 ? "The full platform + your own website" : `Everything in ${PLANS[i - 1].name}`}
                  </li>
                  {added.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-fg-muted">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={3} />
                      {a}
                    </li>
                  ))}
                  {onboarding ? (
                    <li className="flex items-start gap-2 text-fg-muted">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={3} />
                      {onboarding}
                    </li>
                  ) : null}
                </ul>

                <div className="mt-auto flex flex-col gap-2 pt-7">
                  <Cta intent="trial" location={`pricing_${p.id}`} className={clsx("cta w-full", on ? "cta-primary" : "cta-ghost")}>
                    Start free trial
                  </Cta>
                  {!on ? (
                    <button type="button" onClick={() => choose(p)} className="inline-flex items-center justify-center gap-1.5 py-1 text-[13px] font-medium text-fg-muted transition-colors hover:text-primary">
                      See it on the slider <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <span className="py-1 text-center text-[13px] font-medium text-primary">Fits your {students.toLocaleString("en-IN")} students</span>
                  )}
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* custom quote */}
      <div className={clsx("mt-4 flex flex-col items-start justify-between gap-4 rounded-3xl px-6 py-6 transition-colors duration-300 sm:flex-row sm:items-center", custom ? "bg-navy text-white" : "border border-edge bg-canvas-alt")}>
        <div>
          <p className="font-display text-[22px] font-medium tracking-[-0.02em]">{pricing.custom.title}</p>
          <p className={clsx("mt-0.5 text-[14.5px]", custom ? "opacity-80" : "text-fg-muted")}>{pricing.custom.text}</p>
        </div>
        <a
          href={`mailto:${brand.emails.general}?subject=Custom%20quote`}
          className={clsx("inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14.5px] font-semibold transition-colors", custom ? "border-white/40 hover:bg-white/10" : "border-edge-strong hover:border-navy")}
        >
          <Mail aria-hidden className="h-4 w-4" /> {brand.emails.general}
        </a>
      </div>
      <p className="mt-4 text-center text-[12.5px] text-fg-faint">All prices are per month and exclude 18% GST. 0% revenue share on every plan.</p>
    </div>
  );
}
