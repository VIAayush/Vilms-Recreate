"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { categories, products, type AreaId } from "@/lib/content";
import { useReducedMotion } from "../motion";
import { FILTER_EVENT } from "./Discover";
import { ScaledVisual } from "./ScaledVisual";
import { AREA_BACKDROP, PRODUCT_VISUALS } from "./visuals";

type Filter = "all" | AreaId;

// Every product as a big visual card, filterable by area. Cards re-flow with
// a layout animation when the filter changes.
export function ProductGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();

  useEffect(() => {
    const on = (e: Event) => setFilter((e as CustomEvent<AreaId>).detail);
    window.addEventListener(FILTER_EVENT, on);
    return () => window.removeEventListener(FILTER_EVENT, on);
  }, []);

  const shown = products.filter((p) => filter === "all" || p.area === filter);
  const spring = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 30 };

  return (
    <section id="product" className="scroll-mt-20 py-20 sm:py-28">
      <div className="wrap">
        <div>
          <h2 className="max-w-[640px] text-[clamp(36px,5vw,64px)] font-normal leading-[1.04] tracking-[-0.035em]">Everything your institute runs on</h2>

          <LayoutGroup id="filters">
            <div role="toolbar" aria-label="Filter products" className="no-scrollbar mt-8 flex gap-1.5 overflow-x-auto sm:flex-wrap">
              {categories.map((c) => {
                const on = filter === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(c.id)}
                    className={clsx(
                      "relative shrink-0 rounded-full border px-5 py-2.5 text-[14.5px] font-medium transition-colors duration-200",
                      on ? "border-transparent text-white dark:text-[rgb(12_18_26)]" : "border-edge text-fg-muted hover:border-edge-strong hover:text-fg",
                    )}
                  >
                    {on ? <motion.span layoutId="filter-pill" transition={spring} className="absolute inset-0 -z-0 rounded-full bg-navy" /> : null}
                    <span className="relative">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <motion.ul layout={!reduced} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p) => {
              const v = PRODUCT_VISUALS[p.id];
              return (
                <motion.li
                  key={p.id}
                  layout={!reduced}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={spring}
                  className="group rounded-[28px] bg-canvas-alt p-3 transition-colors duration-300 hover:bg-sunken"
                >
                  <div className={clsx("relative aspect-[4/3] overflow-hidden rounded-[20px]", AREA_BACKDROP[p.area])}>
                    <div className="absolute inset-x-5 bottom-0 top-5 overflow-hidden rounded-t-[14px] bg-canvas-alt shadow-[0_12px_32px_-14px_rgb(0_0_0/0.4)] transition duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.025]">
                      <ScaledVisual width={v.w} height={v.h}>
                        <div className={clsx("h-full", v.pad && "p-4")}>{v.node()}</div>
                      </ScaledVisual>
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">{categories.find((c) => c.id === p.area)?.label}</p>
                    <h3 className="mt-1.5 text-[24px] font-normal tracking-[-0.02em]">{p.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-fg-muted">{p.line}</p>
                    <Cta
                      intent="demo"
                      location={`grid_${p.id}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary transition-[gap] hover:gap-2.5"
                    >
                      See it in a demo <ArrowRight aria-hidden className="h-4 w-4" />
                    </Cta>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
        <p className="mt-6 text-[12.5px] text-fg-faint">Interface visuals are illustrative, with sample data.</p>
      </div>
    </section>
  );
}
