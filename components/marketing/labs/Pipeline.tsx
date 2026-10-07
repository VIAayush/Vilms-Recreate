"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { FileDown, LayoutTemplate, Megaphone, Search, Video } from "lucide-react";
import Link from "next/link";
import { PAGES } from "@/lib/site/pages";
import { useInView, useReducedMotion } from "../motion";
import { CrmBoard } from "../screens/CrmBoard";

// Lead CRM: five sources pour into one pipeline that moves on its own.
const SOURCES = [
  { label: "Google Ads", Icon: Search },
  { label: "Meta Ads", Icon: Megaphone },
  { label: "Webinar", Icon: Video },
  { label: "Landing Page", Icon: LayoutTemplate },
  { label: "Free PDF", Icon: FileDown },
];

export function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduced = useReducedMotion();

  return (
    <section id="crm" className="scroll-mt-20 py-20 sm:py-28">
      <div className="wrap">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-primary">Lead CRM</p>
            <h2 className="mt-4 max-w-[760px] text-[clamp(36px,5vw,64px)] font-normal leading-[1.04] tracking-[-0.035em]">Turn ad clicks into paid enrolments</h2>
          </div>
          <Link href={PAGES.leadCrm.path} className="cta cta-outline rounded-full">
            See the CRM
          </Link>
        </div>

        <div ref={ref} className="mt-12 rounded-[32px] bg-canvas-alt p-4 sm:p-8">
          {/* sources */}
          <div className="relative">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
              {SOURCES.map(({ label, Icon }, i) => (
                <motion.li
                  key={label}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 22 }}
                  className="flex items-center gap-2.5 rounded-full border border-edge bg-panel px-4 py-2.5 last:col-span-2 sm:last:col-span-1"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-tint text-primary">
                    <Icon aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate text-[13.5px] font-medium">{label}</span>
                </motion.li>
              ))}
            </ul>

            {/* five streams merging into the board */}
            <svg aria-hidden viewBox="0 0 1000 80" preserveAspectRatio="none" className="hidden h-16 w-full sm:block">
              {[100, 300, 500, 700, 900].map((x, i) => (
                <g key={x}>
                  <path d={`M${x} 0 C ${x} 45, 500 35, 500 80`} fill="none" stroke="rgb(var(--border-strong))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  {!reduced && inView ? (
                    <circle r="4" fill="rgb(var(--primary))">
                      <animateMotion dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={`M${x} 0 C ${x} 45, 500 35, 500 80`} />
                    </circle>
                  ) : null}
                </g>
              ))}
            </svg>
            <div aria-hidden className="mx-auto h-6 w-px bg-edge-strong sm:hidden" />
          </div>

          <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[980px]">
              <CrmBoard />
            </div>
          </div>
          <p className="mt-4 text-[12.5px] text-fg-faint">Illustrative pipeline with sample leads. Swipe to see every stage.</p>
        </div>
      </div>
    </section>
  );
}
