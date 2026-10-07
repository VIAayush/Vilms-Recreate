"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check, Minus } from "lucide-react";
import { pricing } from "@/lib/content";
import { PLANS } from "../plans";
import { usePlanSelection } from "./PlanSelection";

// The full feature comparison. From md up it is a table with a header that
// sticks under the site bar; the column of the plan that fits the slider is
// tinted, and hovering a column lights it. On phones the same rows show one
// plan at a time, chosen with the tabs.
const cols = "md:grid-cols-[minmax(200px,1.5fr)_repeat(4,minmax(0,1fr))]";

export function CompareTable() {
  const { planIndex, choose, students } = usePlanSelection();
  const [hover, setHover] = useState<number | null>(null);
  const lit = hover ?? planIndex;
  const mobileCol = planIndex ?? PLANS.length - 1;

  return (
    <div>
      {/* phone: choose the plan to read */}
      <div role="tablist" aria-label="Plan" className="sticky top-14 z-10 -mx-4 mb-2 flex gap-2 overflow-x-auto border-b border-edge bg-canvas px-4 py-3 md:hidden">
        {PLANS.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            type="button"
            aria-selected={mobileCol === i}
            onClick={() => choose(p)}
            className={clsx("shrink-0 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors", mobileCol === i ? "border-navy bg-navy text-white" : "border-edge text-fg-muted")}
          >
            {p.name} <span className="font-normal opacity-75">{p.price}</span>
          </button>
        ))}
      </div>

      <div role="table" aria-label="Plan features compared" className="text-[14.5px]" onMouseLeave={() => setHover(null)}>
        {/* desktop header, sticky */}
        <div role="rowgroup" className="hidden md:block">
          <div role="row" className={clsx("sticky top-14 z-10 grid border-b border-edge-strong bg-canvas", cols)}>
            <span role="columnheader" className="flex items-end px-3 pb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
              Feature
            </span>
            {PLANS.map((p, i) => (
              <span key={p.id} role="columnheader" onMouseEnter={() => setHover(i)} className={clsx("relative px-3 py-4 text-center transition-colors duration-300", lit === i && "bg-primary-tint/60")}>
                {planIndex === i ? <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-navy" /> : null}
                <button type="button" onClick={() => choose(p)} className="mx-auto block rounded-md px-2 text-center transition-colors hover:text-primary" aria-label={`Select the ${p.name} plan`}>
                  <span className="block font-display text-[18px] font-medium tracking-[-0.02em]">{p.name}</span>
                  <span className="mt-0.5 block text-[13px] font-medium tabular-nums">{p.price}<span className="font-normal text-fg-muted"> /mo</span></span>
                  <span className="mt-0.5 block text-[12px] font-normal text-fg-muted">{p.students.replace("Up to ", "≤ ")}</span>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div role="rowgroup">
          {pricing.compare.map((row) => (
            <div key={row.label} role="row" className={clsx("grid grid-cols-[minmax(0,1fr)_auto] items-center border-b border-edge transition-colors hover:bg-sunken/40 md:items-stretch", cols)}>
              <span role="rowheader" className="py-3.5 pr-3 text-[15px] md:px-3 md:py-4">
                {row.label}
              </span>
              {row.values.map((v, i) => (
                <span
                  key={i}
                  role="cell"
                  onMouseEnter={() => setHover(i)}
                  className={clsx(
                    "items-center justify-center py-3.5 text-center transition-colors duration-300 md:flex md:px-3 md:py-4",
                    mobileCol === i ? "flex" : "hidden",
                    lit === i && "md:bg-primary-tint/60",
                  )}
                >
                  {v === true ? (
                    <>
                      <Check aria-hidden className="h-[18px] w-[18px] text-green" strokeWidth={3} />
                      <span className="sr-only">Included</span>
                    </>
                  ) : v === false ? (
                    <>
                      <Minus aria-hidden className="h-4 w-4 text-fg-faint" />
                      <span className="sr-only">Not included</span>
                    </>
                  ) : (
                    <span className="max-w-[170px] text-[13px] leading-snug text-fg-muted md:text-[13.5px]">{v}</span>
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-[12.5px] text-fg-faint">
        {planIndex === null ? `At ${students.toLocaleString("en-IN")} students you would need a custom quote.` : `Highlighted: the ${PLANS[planIndex].name} plan, the smallest that fits ${students.toLocaleString("en-IN")} students.`} Prices exclude 18% GST.
      </p>
    </div>
  );
}
