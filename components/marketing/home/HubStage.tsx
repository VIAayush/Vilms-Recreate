"use client";

import { useRef } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { BarChart3, BookOpen, ClipboardCheck, Funnel, IndianRupee, Palette, Radio, ScanText } from "lucide-react";
import { BrandMark } from "../BrandMark";
import { useAutoplay, useInView, useReducedMotion } from "../motion";

// "One database": eight modules around the VILMS mark. Each lights up in turn
// and a packet of data travels along its line into the centre. Fixed 720×450
// design size — scale it with <ScaledVisual>.

const W = 720;
const H = 450;
const CX = W / 2;
const CY = H / 2;

const NODES = [
  { label: "Courses", Icon: BookOpen, x: 120, y: 90 },
  { label: "Live classes", Icon: Radio, x: 360, y: 44 },
  { label: "Tests", Icon: ClipboardCheck, x: 600, y: 90 },
  { label: "AI evaluation", Icon: ScanText, x: 644, y: 250 },
  { label: "Payments", Icon: IndianRupee, x: 560, y: 394 },
  { label: "Leads", Icon: Funnel, x: 160, y: 394 },
  { label: "Branding", Icon: Palette, x: 76, y: 250 },
  { label: "Analytics", Icon: BarChart3, x: 360, y: 406 },
];

export function HubStage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [active] = useAutoplay(NODES.length, { interval: 1100, running: inView && !reduced });

  return (
    <div ref={ref} className="relative bg-canvas" style={{ width: W, height: H }}>
      <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" aria-hidden>
        {NODES.map((n, i) => (
          <g key={n.label}>
            <line x1={CX} y1={CY} x2={n.x} y2={n.y} className={clsx("transition-colors duration-500", i === active ? "stroke-primary" : "stroke-edge-strong")} strokeWidth={i === active ? 2 : 1.25} strokeDasharray={i === active ? undefined : "4 5"} />
            {i === active && !reduced ? (
              <motion.circle r="5" className="fill-primary" initial={{ cx: n.x, cy: n.y }} animate={{ cx: CX, cy: CY }} transition={{ duration: 0.9, ease: "easeIn" }} />
            ) : null}
          </g>
        ))}
      </svg>

      {/* the centre */}
      <div className="absolute grid h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-edge bg-panel shadow-[0_20px_50px_-20px_rgb(14_27_44/0.4)]" style={{ left: CX, top: CY }}>
        <span className="flex flex-col items-center">
          <BrandMark className="h-9 w-12" />
          <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-muted">One database</span>
        </span>
      </div>

      {NODES.map((n, i) => {
        const on = i === active;
        return (
          <div key={n.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: n.x, top: n.y }}>
            <motion.div
              animate={{ scale: on ? 1.08 : 1, y: on ? -3 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={clsx("flex items-center gap-2.5 rounded-2xl border bg-panel px-3.5 py-2.5 shadow-sm transition-colors duration-300", on ? "border-primary shadow-[0_12px_30px_-12px_rgb(29_99_180/0.45)]" : "border-edge")}
            >
              <span className={clsx("grid h-8 w-8 place-items-center rounded-lg transition-colors duration-300", on ? "bg-navy text-white " : "bg-primary-tint text-primary")}>
                <n.Icon aria-hidden className="h-4 w-4" />
              </span>
              <span className="whitespace-nowrap text-[14px] font-semibold">{n.label}</span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/** The same idea for narrow screens: the mark on top, the modules as readable chips. */
export function HubCompact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [active] = useAutoplay(NODES.length, { interval: 1100, running: inView && !reduced });
  return (
    <div ref={ref} className="bg-canvas p-4">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-edge bg-panel shadow-sm">
        <span className="flex flex-col items-center">
          <BrandMark className="h-8 w-11" />
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-fg-muted">One database</span>
        </span>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2">
        {NODES.map((n, i) => (
          <li key={n.label} className={clsx("flex items-center gap-2 rounded-xl border px-2.5 py-2 transition-colors duration-300", i === active ? "border-primary bg-primary-tint" : "border-edge bg-panel")}>
            <span className={clsx("grid h-7 w-7 shrink-0 place-items-center rounded-lg", i === active ? "bg-navy text-white" : "bg-primary-tint text-primary")}>
              <n.Icon aria-hidden className="h-3.5 w-3.5" />
            </span>
            <span className="truncate text-[13px] font-semibold">{n.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
