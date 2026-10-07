"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Building2, GraduationCap } from "lucide-react";
import { brand } from "@/lib/content";
import { inr, useCountUp, useInView, useReducedMotion } from "../motion";
import { BrandMark } from "../BrandMark";
import Link from "next/link";
import { PAGES } from "@/lib/site/pages";

// 0% revenue share, shown as money moving: the student pays ₹15,000, the
// institute receives ₹15,000, and VILMS takes ₹0.
const FEE = 15000;

export function Revenue() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const paid = useCountUp(FEE, inView, 1600);
  const [top, bottom] = brand.tagline.split(". ");

  return (
    <section id="revenue" className="scroll-mt-20 py-10 sm:py-16">
      <div className="wrap">
        <div ref={ref} className="relative isolate overflow-hidden rounded-[32px] bg-canvas-alt px-5 py-14 sm:px-10 sm:py-20 lg:px-16">

          <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-primary">0% revenue share</p>
          <h2 className="mt-4 max-w-[860px] text-[clamp(36px,5.6vw,72px)] font-normal leading-[1.02] tracking-[-0.04em]">
            {top}.<br />
            <span className="text-fg-muted">{bottom}</span>
          </h2>

          <div className="mt-12 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1.15fr] lg:gap-0">
            <Node icon={<GraduationCap aria-hidden className="h-5 w-5" />} label="Student pays" value={inr(reduced ? FEE : paid)} />
            <Flow on={inView && !reduced} delay={0} />
            <Node icon={<Building2 aria-hidden className="h-5 w-5" />} label="Your Razorpay account" value={inr(reduced ? FEE : paid)} note="Settled to you directly" />
            <Flow on={inView && !reduced} delay={0.9} muted />
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: 1.4, type: "spring", stiffness: 180, damping: 16 }}
              className="band-navy relative overflow-hidden rounded-[24px] p-6 sm:p-7"
            >
              <div className="flex items-center gap-2.5">
                <BrandMark variant="dark" className="h-6 w-8" />
                <p className="text-[14px] font-medium text-white/75">VILMS commission</p>
              </div>
              <p className="mt-3 font-mono text-[clamp(64px,9vw,112px)] font-medium leading-none tracking-[-0.05em] text-[rgb(222_192_118)]">₹0</p>
              <p className="mt-3 text-[14px] text-white/70">On every fee, on every plan.</p>
            </motion.div>
          </div>
          <p className="mt-6 text-[12.5px] text-fg-faint">Example fee. Payment gateway charges are set by your Razorpay account.</p>
          <Link href={PAGES.why.path} className="link mt-4 inline-block text-[14.5px]">
            Why institutes choose a flat plan →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Node({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note?: string }) {
  return (
    <div className="rounded-[24px] border border-edge bg-panel p-6 sm:p-7">
      <div className="flex items-center gap-2.5 text-fg-muted">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-tint text-primary">{icon}</span>
        <p className="text-[14px] font-medium">{label}</p>
      </div>
      <p className="mt-4 font-mono text-[clamp(36px,4.2vw,52px)] font-medium tabular-nums leading-none tracking-[-0.04em]">{value}</p>
      {note ? <p className="mt-3 text-[13.5px] text-green">{note}</p> : <p className="mt-3 text-[13.5px] text-fg-muted">Course fee</p>}
    </div>
  );
}

// The connector: a dashed line with a coin travelling along it.
function Flow({ on, delay, muted }: { on: boolean; delay: number; muted?: boolean }) {
  return (
    <div aria-hidden className="relative mx-auto h-10 w-px lg:mx-0 lg:h-auto lg:w-16">
      <span className="absolute inset-0 m-auto h-full w-px border-l-2 border-dashed border-edge-strong lg:h-px lg:w-full lg:border-l-0 lg:border-t-2" />
      {on && !muted ? <span className="coin" style={{ animationDelay: `${delay}s` }} /> : null}
    </div>
  );
}
