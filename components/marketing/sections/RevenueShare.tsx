"use client";

import { useRef } from "react";
import clsx from "clsx";
import { Building2, GraduationCap, Landmark } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { revenue } from "@/lib/content";
import { inr, useCountUp, useInView } from "../motion";
import { BrandMark } from "../BrandMark";

// The one number that matters: a ₹15,000 fee leaves the student and arrives,
// whole, in the institute's own Razorpay account. VILMS's share stays at ₹0.
export function RevenueShare() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30% 0px" });
  const paid = useCountUp(revenue.fee, inView, 1100);
  const received = useCountUp(revenue.fee, inView, 2200);

  return (
    <section id="why" aria-labelledby="why-title" className="relative isolate overflow-hidden py-24 sm:py-36">
      {/* oversized numeral, cropped by the section */}
      <p
        aria-hidden
        className="pointer-events-none absolute -right-[4vw] top-6 -z-10 select-none font-display text-[clamp(180px,34vw,520px)] font-semibold leading-[0.8] tracking-[-0.07em] text-fg/[0.04]"
      >
        0%
      </p>

      <div className="wrap">
        <p className="kicker">{revenue.kicker}</p>
        <h2 id="why-title" className="display mt-5 text-[clamp(40px,6.4vw,92px)]">
          Keep <span className="grad-text">100%</span>
          <span className="serif-accent block text-fg-muted">of your students&apos; fees.</span>
        </h2>
        <p className="sub mt-8 max-w-[520px]">{revenue.sub}</p>

        <div ref={ref} className="relative mt-16 grid gap-4 lg:mt-24 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-center lg:gap-0">
          {/* 1 · student */}
          <Node icon={GraduationCap} label={revenue.steps[0]} className="lg:mr-10">
            <p className="font-display text-[clamp(34px,3.6vw,48px)] font-semibold tabular-nums tracking-tight">{inr(paid)}</p>
            <p className="mt-1 text-[13px] text-fg-muted">Course fee · checkout on your site</p>
          </Node>

          {/* 2 · your account (the hero of the diagram) */}
          <div className="relative">
            <Connector active={inView} className="hidden lg:block" side="left" />
            <Connector active={inView} className="hidden lg:block" side="right" dashed />
            <VConnector active={inView} className="lg:hidden" />
            <div className="relative rounded-[28px] bg-panel p-6 shadow-window ring-2 ring-mint/50 sm:p-8">
              <div className="flex items-center gap-2.5 text-[13px] font-semibold text-mint">
                <Landmark aria-hidden className="h-4 w-4" /> {revenue.steps[1]}
              </div>
              <p className="mt-3 font-display text-[clamp(44px,5vw,72px)] font-semibold leading-none tabular-nums tracking-[-0.04em]">{inr(received)}</p>
              <p className="mt-2 text-[14px] text-fg-muted">Settles with you — the whole fee.</p>
              <div className={clsx("mt-5 inline-flex items-center gap-2 rounded-full bg-mint/15 px-3 py-1.5 text-[12.5px] font-semibold text-mint transition-opacity duration-700", received === revenue.fee ? "opacity-100" : "opacity-0")}>
                <Building2 aria-hidden className="h-3.5 w-3.5" /> 100% of the fee received
              </div>
            </div>
            <VConnector active={inView} className="lg:hidden" dashed />
          </div>

          {/* 3 · VILMS */}
          <Node icon={null} label={revenue.steps[2]} className="lg:ml-10" muted>
            <div className="flex items-center gap-3">
              <BrandMark className="h-9 w-9 opacity-80" />
              <p className="font-display text-[clamp(34px,3.6vw,48px)] font-semibold tabular-nums tracking-tight">₹0</p>
            </div>
            <p className="mt-1 text-[13px] text-fg-muted">On every plan, at any size.</p>
          </Node>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-edge/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[560px] text-[14px] text-fg-muted">
            One flat monthly price per plan, from ₹499/month. Prices exclude 18% GST. The ₹15,000 fee is an example.
          </p>
          <Cta intent="demo" location="revenue" className="cta cta-accent" arrow>
            Talk to a VILMS expert
          </Cta>
        </div>
      </div>
    </section>
  );
}

function Node({
  icon: Icon,
  label,
  children,
  className,
  muted,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }> | null;
  label: string;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <div className={clsx("rounded-[24px] border p-5 sm:p-6", muted ? "border-dashed border-edge/20" : "border-edge/10 bg-panel/60", className)}>
      <p className="flex items-center gap-2 text-[13px] font-semibold text-fg-muted">
        {Icon ? <Icon aria-hidden className="h-4 w-4" /> : null}
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/** Horizontal link between nodes (desktop). A dot travels along the solid one. */
function Connector({ active, side, dashed, className }: { active: boolean; side: "left" | "right"; dashed?: boolean; className?: string }) {
  return (
    <span aria-hidden className={clsx("absolute top-1/2 h-px w-10", side === "left" ? "right-full" : "left-full", className)}>
      <span
        className={clsx(
          "absolute inset-0 origin-left transition-transform duration-700 ease-out",
          dashed ? "bg-[repeating-linear-gradient(90deg,rgb(var(--foreground)/0.25)_0_4px,transparent_4px_8px)]" : "bg-mint",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
      {!dashed && active ? <span className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-mint shadow-[0_0_12px_rgb(var(--mint))] [animation:travel_1.8s_ease-in-out_infinite]" /> : null}
    </span>
  );
}

/** Vertical link between nodes (phones). */
function VConnector({ active, dashed, className }: { active: boolean; dashed?: boolean; className?: string }) {
  return (
    <span aria-hidden className={clsx("relative mx-auto block h-8 w-px", className)}>
      <span
        className={clsx(
          "absolute inset-0 origin-top transition-transform duration-700",
          dashed ? "bg-[repeating-linear-gradient(180deg,rgb(var(--foreground)/0.25)_0_4px,transparent_4px_8px)]" : "bg-mint",
          active ? "scale-y-100" : "scale-y-0",
        )}
      />
    </span>
  );
}
