"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Minus } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { TrackView } from "@/components/site/TrackView";
import { brand, pricing } from "@/lib/content";

// Students, price, who it's for. Everything else lives behind "Compare plans".
export function Pricing() {
  const uid = useId();
  const [open, setOpen] = useState(false);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-canvas-alt py-24 sm:py-32">
      <TrackView name="pricing_view" />
      <div className="wrap">
        <div className="text-center">
          <p className="kicker justify-center">{pricing.kicker}</p>
          <h2 id="pricing-title" className="h2 mx-auto mt-4 max-w-[16ch]">
            {pricing.title}
          </h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[14px] text-fg-muted">
            {pricing.trialNote.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check aria-hidden className="h-4 w-4 text-green" strokeWidth={3} /> {t}
              </li>
            ))}
          </ul>
        </div>

        <ol className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4 lg:gap-3">
          {pricing.plans.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={clsx(
                "group relative flex w-[78vw] max-w-[300px] shrink-0 snap-start flex-col rounded-[24px] border bg-panel p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-window md:w-auto md:max-w-none",
                i === 1 ? "border-primary" : "border-edge hover:border-primary/40",
              )}
            >
              {i === 1 ? <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-ink">Android app included</span> : null}
              <p className="text-[13px] text-fg-muted">{p.bestFor}</p>
              <h3 className="mt-1 font-display text-[24px] font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em]">{p.price}</span>
                <span className="text-[14px] text-fg-muted">/month</span>
              </p>
              <p className="mt-3 inline-flex w-fit rounded-full bg-primary-tint px-3 py-1 text-[13px] font-semibold text-primary">{p.students}</p>
              <div className="mt-auto pt-8">
                <Cta intent="trial" location={`pricing_${p.id}`} className={clsx("cta w-full", i === 1 ? "cta-primary" : "cta-outline")}>
                  Start 14-day trial
                </Cta>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-8 text-center">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={`${uid}-compare`}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-5 py-2.5 text-[14px] font-semibold transition hover:border-primary/40 hover:text-primary"
          >
            {open ? "Hide comparison" : "Compare plans"}
            <ChevronDown aria-hidden className={clsx("h-4 w-4 transition-transform duration-300", open && "rotate-180")} />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={`${uid}-compare`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="no-scrollbar mt-6 overflow-x-auto rounded-[20px] border border-edge bg-panel">
                <table className="w-full min-w-[720px] text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-edge">
                      <th scope="col" className="px-5 py-4 font-semibold text-fg-muted">
                        Plan
                      </th>
                      {pricing.plans.map((p) => (
                        <th key={p.id} scope="col" className="px-4 py-4">
                          <span className="block font-semibold">{p.name}</span>
                          <span className="text-[12px] font-normal text-fg-muted">{p.price}/month</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pricing.compare.map((row) => (
                      <tr key={row.label} className="border-b border-edge last:border-0">
                        <th scope="row" className="px-5 py-3 font-medium">
                          {row.label}
                        </th>
                        {row.values.map((v, k) => (
                          <td key={k} className="px-4 py-3">
                            {v === true ? (
                              <Check aria-label="Included" className="h-4 w-4 text-green" strokeWidth={3} />
                            ) : v === false ? (
                              <Minus aria-label="Not included" className="h-4 w-4 text-fg-faint" />
                            ) : (
                              <span className="text-fg-muted">{v}</span>
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

        <div className="mt-8 flex flex-col items-center gap-2 text-center text-[13px] text-fg-muted">
          <p>
            <b className="text-fg">{pricing.custom.title}</b> {pricing.custom.text}{" "}
            <a className="link" href={`mailto:${brand.emails.general}?subject=${encodeURIComponent("Custom quote for VILMS")}`}>
              {brand.emails.general}
            </a>
          </p>
          <p>{pricing.footnote}</p>
        </div>
      </div>
    </section>
  );
}
