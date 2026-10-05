"use client";

import { useRef } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { hero, revenue } from "@/lib/content";
import { inr, useCountUp, useInView } from "../motion";
import { BrandMark } from "../BrandMark";

// The one comparison that matters, as two money flows side by side.
export function Revenue() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const cut = Math.round(revenue.collected * revenue.exampleRate);
  return (
    <section id="revenue" aria-labelledby="revenue-title" className="py-24 sm:py-32">
      <div className="wrap">
        <p className="kicker">{revenue.kicker}</p>
        <h2 id="revenue-title" className="display mt-5 text-[clamp(40px,6.6vw,96px)]">
          {hero.titleTop}
          <span className="serif-accent block text-fg-muted">{hero.titleBottom}</span>
        </h2>

        <div ref={ref} className="mt-14 grid gap-5 lg:grid-cols-2">
          <Flow
            title="A commission-based platform"
            note={`Example: ${Math.round(revenue.exampleRate * 100)}% commission`}
            collected={revenue.collected}
            cut={cut}
            active={inView}
          />
          <Flow title="VILMS" brand collected={revenue.collected} cut={0} active={inView} />
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[560px] text-[13px] text-fg-muted">
            Illustrative: ₹1,00,000 in fees. VILMS charges one flat monthly price per plan and takes 0% of your fees — on every plan, at any size.
          </p>
          <Cta intent="trial" location="revenue" className="cta cta-primary" arrow>
            Keep 100% — start free
          </Cta>
        </div>
      </div>
    </section>
  );
}

function Flow({ title, note, brand, collected, cut, active }: { title: string; note?: string; brand?: boolean; collected: number; cut: number; active: boolean }) {
  const kept = collected - cut;
  const shown = useCountUp(kept, active, 1600);
  const cutShown = useCountUp(cut, active, 1200);
  return (
    <div className={clsx("relative overflow-hidden rounded-[28px] border p-6 sm:p-8", brand ? "border-primary/40 bg-panel shadow-window" : "border-edge bg-canvas-alt")}>
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2.5 text-[16px] font-semibold">
          {brand ? <BrandMark className="h-6 w-8" /> : null}
          {title}
        </p>
        {note ? <span className="rounded-full bg-sunken px-2.5 py-1 text-[11.5px] text-fg-muted">{note}</span> : <span className="rounded-full bg-green-tint px-2.5 py-1 text-[11.5px] font-semibold text-green">0% revenue share</span>}
      </div>

      <div className="mt-8 space-y-3">
        <Row label="Students pay" value={inr(collected)} pct={1} tone="bg-edge-strong" active={active} />
        <div className="flex items-center gap-3 pl-1 text-[13px]">
          <ArrowDown aria-hidden className="h-4 w-4 text-fg-faint" />
          <span className={clsx("rounded-full px-2.5 py-1 font-semibold tabular-nums", cut ? "bg-red-tint text-red" : "bg-green-tint text-green")}>
            {cut ? `− ${inr(cutShown)} commission` : "₹0 commission"}
          </span>
        </div>
        <Row label="Reaches your account" value={inr(shown)} pct={kept / collected} tone={brand ? "bg-green" : "bg-fg-faint"} active={active} big />
      </div>
    </div>
  );
}

function Row({ label, value, pct, tone, active, big }: { label: string; value: string; pct: number; tone: string; active: boolean; big?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] text-fg-muted">{label}</span>
        <span className={clsx("font-display font-semibold tabular-nums tracking-tight", big ? "text-[clamp(30px,3.6vw,44px)]" : "text-[20px]")}>{value}</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-sunken">
        <motion.div
          className={clsx("h-full rounded-full", tone)}
          initial={{ width: 0 }}
          animate={{ width: active ? `${pct * 100}%` : 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
