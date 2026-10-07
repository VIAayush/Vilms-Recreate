"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Minus } from "lucide-react";
import Link from "next/link";
import { Cta } from "@/components/site/Cta";
import { PAGES } from "@/lib/site/pages";
import { brand, pricing } from "@/lib/content";
import { useReducedMotion } from "../motion";

// Four plans, priced by students. Slide to your size and the right plan
// lights up; open the comparison for the detail.
const STOPS = [10, 25, 50, 100, 150, 200, 300, 400, 500, 750, 1000, 1500, 2000];

export function Pricing() {
  const id = useId();
  const reduced = useReducedMotion();
  const [stop, setStop] = useState(4);
  const [compare, setCompare] = useState(false);
  const students = STOPS[stop];
  const custom = students > 1500;
  const pick = custom ? null : pricing.plans.find((p) => students <= p.limit)!.id;
  const spring = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 300, damping: 30 };

  return (
    <section id="pricing" className="scroll-mt-20 py-20 sm:py-28">
      <div className="wrap">
        <div className="text-center">
          <h2 className="text-balance text-[clamp(36px,5.4vw,68px)] font-normal leading-[1.04] tracking-[-0.035em]">{pricing.title}</h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {pricing.notes.map((n) => (
              <li key={n} className="rounded-full bg-canvas-alt px-3.5 py-1.5 text-[13px] font-medium text-fg-muted">
                {n}
              </li>
            ))}
          </ul>
        </div>

        {/* size picker */}
        <div className="mx-auto mt-12 max-w-[560px] rounded-[24px] bg-canvas-alt p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={id} className="text-[14.5px] font-medium">
              How many students do you teach?
            </label>
            <p className="font-mono text-[22px] font-medium tabular-nums" aria-live="polite">
              {custom ? "1,500+" : students.toLocaleString("en-IN")}
            </p>
          </div>
          <input
            id={id}
            type="range"
            min={0}
            max={STOPS.length - 1}
            step={1}
            value={stop}
            onChange={(e) => setStop(Number(e.target.value))}
            aria-valuetext={custom ? "More than 1,500 students" : `${students} students`}
            className="price-range mt-3 w-full"
            style={{ ["--fill" as string]: `${(stop / (STOPS.length - 1)) * 100}%` }}
          />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricing.plans.map((p) => {
            const on = pick === p.id;
            return (
              <div key={p.id} className="relative">
                {on ? <motion.div layoutId="plan-ring" transition={spring} className="absolute -inset-[3px] rounded-[31px] bg-navy" /> : null}
                <article className={clsx("relative flex h-full flex-col rounded-[28px] p-6 transition-colors duration-300", on ? "bg-panel" : "bg-canvas-alt")}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-[22px] font-normal tracking-[-0.02em]">{p.name}</h3>
                    {on ? <span className="rounded-full bg-navy px-2.5 py-1 text-[11.5px] font-semibold text-white ">Your fit</span> : null}
                  </div>
                  <p className="mt-1 text-[13.5px] text-fg-muted">{p.bestFor}</p>
                  <p className="mt-6 flex items-baseline gap-1">
                    <span className="text-[44px] font-normal leading-none tracking-[-0.04em]">{p.price}</span>
                    <span className="text-[14px] text-fg-muted">/month</span>
                  </p>
                  <p className="mt-3 text-[14.5px] font-medium">{p.students}</p>
                  <div className="mt-auto pt-7">
                    <Cta intent="trial" location={`pricing_${p.id}`} className={clsx("cta w-full", on ? "cta-primary" : "cta-ghost")}>
                      Start Free Trial
                    </Cta>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <div className={clsx("mt-4 flex flex-col items-center justify-between gap-3 rounded-[24px] px-6 py-5 transition-colors sm:flex-row", custom ? "bg-navy text-white " : "bg-canvas-alt")}>
          <p className="text-[15px]">
            <span className="font-semibold">{pricing.custom.title}</span> {pricing.custom.text}
          </p>
          <a href={`mailto:${brand.emails.general}`} className={clsx("text-[14.5px] font-semibold underline-offset-4 hover:underline", custom ? "" : "text-primary")}>
            {brand.emails.general}
          </a>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            aria-expanded={compare}
            aria-controls={`${id}-table`}
            onClick={() => setCompare((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-edge-strong px-5 py-2.5 text-[14.5px] font-medium transition hover:border-navy"
          >
            {compare ? "Hide" : "Compare"} all features
            <ChevronDown aria-hidden className={clsx("h-4 w-4 transition-transform duration-300", compare && "rotate-180")} />
          </button>
          <Link href={PAGES.pricing.path} className="link ml-5 hidden text-[14.5px] sm:inline-block">
            Full pricing details →
          </Link>
        </div>

        <AnimatePresence initial={false}>
          {compare ? (
            <motion.div
              id={`${id}-table`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="no-scrollbar mt-8 overflow-x-auto rounded-[24px] border border-edge">
                <table className="w-full min-w-[720px] text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-edge bg-canvas-alt">
                      <th scope="col" className="px-5 py-4 font-medium text-fg-muted">
                        Feature
                      </th>
                      {pricing.plans.map((p) => (
                        <th key={p.id} scope="col" className={clsx("px-4 py-4 text-center font-semibold", pick === p.id && "text-primary")}>
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-edge">
                    {pricing.compare.map((row) => (
                      <tr key={row.label}>
                        <th scope="row" className="px-5 py-3.5 font-normal">
                          {row.label}
                        </th>
                        {row.values.map((v, i) => (
                          <td key={i} className={clsx("px-4 py-3.5 text-center", pick === pricing.plans[i].id && "bg-primary-tint/50")}>
                            {v === true ? (
                              <Check aria-label="Included" className="mx-auto h-4 w-4 text-green" />
                            ) : v === false ? (
                              <Minus aria-label="Not included" className="mx-auto h-4 w-4 text-fg-faint" />
                            ) : (
                              <span className="text-[13px] text-fg-muted">{v}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
