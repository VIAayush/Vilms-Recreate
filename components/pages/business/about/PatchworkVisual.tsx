"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { BrandMark } from "@/components/marketing/BrandMark";
import { useInView, useReducedMotion } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";

type Mode = "patch" | "one";

// Five tools a coaching institute ends up stitching together, and the one
// platform they become. Each chip is the same element in both states: it moves
// from a tilted, scattered spot to a row inside the VILMS panel and changes
// from "a separate tool" to "a part of one database". Words are the brochure's.
const CHIPS = [
  {
    id: "leads",
    before: ["WhatsApp chats", "Leads get lost in threads"],
    after: ["Lead CRM", "One pipeline, every enquiry"],
    from: { x: 1, y: 7, r: -3.5 },
  },
  {
    id: "classes",
    before: ["Zoom links", "Not tied to enrolment"],
    after: ["Live classes", "Inside the course"],
    from: { x: 53, y: 2, r: 3 },
  },
  {
    id: "tests",
    before: ["Google Forms", "Can't grade essays"],
    after: ["Rubric evaluation", "AI drafts, a mentor approves"],
    from: { x: 3, y: 41, r: 2.5 },
  },
  {
    id: "money",
    before: ["Spreadsheets", "Manual fee reconciliation"],
    after: ["Payments", "Your Razorpay, GST invoices"],
    from: { x: 54, y: 37, r: -2.5 },
  },
  {
    id: "cut",
    before: ["Platform fee", "A % of every enrolment"],
    after: ["0% revenue share", "Flat monthly plan"],
    from: { x: 27, y: 73, r: 2 },
  },
] as const;

// Where the chips sit once they are one platform (percent of the stage).
const ROW_TOP = 21;
const ROW_STEP = 14.2;

// The dashed "these don't talk to each other" links between scattered chips.
const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [2, 3],
];
const centre = (i: number) => ({ x: CHIPS[i].from.x + 22, y: CHIPS[i].from.y + 5.5 });

export function PatchworkVisual({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("patch");
  const [picked, setPicked] = useState(false);

  // Loops while on screen until the visitor picks a state themselves.
  useEffect(() => {
    if (reduced || picked || !inView) return;
    const t = window.setTimeout(() => setMode((m) => (m === "patch" ? "one" : "patch")), mode === "patch" ? 2400 : 5600);
    return () => window.clearTimeout(t);
  }, [mode, reduced, picked, inView]);

  const shown: Mode = reduced && !picked ? "one" : mode;
  const one = shown === "one";
  const dur = reduced ? 0 : 0.85;

  const choose = (m: Mode) => {
    setPicked(true);
    setMode(m);
  };

  return (
    <figure ref={ref} className={clsx("min-w-0", className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div role="group" aria-label="Show" className="inline-flex rounded-full border border-edge bg-panel p-1 text-[13px] font-medium">
          {(
            [
              ["patch", "Patchwork"],
              ["one", "One platform"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              aria-pressed={shown === m}
              onClick={() => choose(m)}
              className={clsx(
                "rounded-full px-3.5 py-1.5 transition-colors duration-300",
                shown === m ? "bg-navy text-white" : "text-fg-muted hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="hidden font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint sm:block">Illustrative</p>
      </div>

      <div className="relative aspect-[10/11] w-full overflow-hidden rounded-[28px] border border-edge bg-canvas-alt sm:aspect-[6/5]">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-70" />

        {/* the VILMS panel the chips settle into */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: one ? 1 : 0, scale: one ? 1 : 0.96 }}
          transition={{ duration: dur * 0.9, ease: EASE }}
          className="absolute inset-[4.5%] rounded-[22px] border border-edge-strong bg-panel shadow-window"
        >
          <div className="flex items-center gap-2.5 px-[5%] pt-[3.2%]">
            <BrandMark className="h-6 w-8" />
            <span className="font-logo text-[13px] font-semibold tracking-[0.08em] text-navy">VILMS</span>
            <span className="ml-auto rounded-full bg-primary-tint px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">One database</span>
          </div>
        </motion.div>

        {/* dashed links between scattered tools / the single spine when joined */}
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
          {LINKS.map(([a, b]) => {
            const p = centre(a);
            const q = centre(b);
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={p.x}
                y1={p.y}
                x2={q.x}
                y2={q.y}
                stroke="rgb(var(--border-strong))"
                strokeWidth={1.2}
                strokeDasharray="1.5 3"
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{ opacity: one ? 0 : 0.9 }}
                transition={{ duration: dur * 0.5 }}
              />
            );
          })}
        </svg>

        {/* the single spine: one database underneath every part */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleY: one ? 1 : 0, opacity: one ? 1 : 0 }}
          transition={{ duration: dur * 0.9, delay: one ? dur * 0.6 : 0, ease: EASE }}
          style={{ left: "7.4%", top: `${ROW_TOP + 5}%`, height: `${ROW_STEP * 4}%`, transformOrigin: "top" }}
          className="absolute w-[2px] rounded-full bg-primary"
        />

        {CHIPS.map((c, i) => {
          const top = ROW_TOP + ROW_STEP * i;
          return (
            <motion.div
              key={c.id}
              initial={false}
              animate={{
                left: one ? "12%" : `${c.from.x}%`,
                top: one ? `${top}%` : `${c.from.y}%`,
                width: one ? "80%" : "44%",
                height: one ? "11.6%" : "10.6%",
                rotate: one ? 0 : c.from.r,
              }}
              transition={{ duration: dur, ease: EASE, delay: reduced ? 0 : i * 0.07 }}
              className={clsx(
                "absolute overflow-hidden rounded-xl border bg-panel transition-[border-color,box-shadow] duration-500",
                one ? "border-edge shadow-none" : "border-dashed border-edge-strong shadow-soft",
              )}
            >
              {/* before */}
              <motion.span
                initial={false}
                animate={{ opacity: one ? 0 : 1 }}
                transition={{ duration: dur * 0.35 }}
                aria-hidden={one}
                className="absolute inset-0 flex flex-col justify-center px-[7%]"
              >
                <span className="truncate text-[clamp(11.5px,1.35vw,14.5px)] font-semibold leading-tight">{c.before[0]}</span>
                <span className="truncate text-[clamp(10px,1.1vw,12px)] leading-tight text-fg-muted">{c.before[1]}</span>
              </motion.span>
              {/* after */}
              <motion.span
                initial={false}
                animate={{ opacity: one ? 1 : 0 }}
                transition={{ duration: dur * 0.35, delay: one ? dur * 0.45 : 0 }}
                aria-hidden={!one}
                className="absolute inset-0 flex items-center gap-[3.5%] px-[3.5%]"
              >
                <span className="grid h-[58%] aspect-square shrink-0 place-items-center rounded-lg bg-green-tint text-green">
                  <Check aria-hidden className="h-[55%] w-[55%]" strokeWidth={3} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[clamp(11.5px,1.35vw,14.5px)] font-semibold leading-tight">{c.after[0]}</span>
                  <span className="block truncate text-[clamp(10px,1.1vw,12px)] leading-tight text-fg-muted">{c.after[1]}</span>
                </span>
              </motion.span>
            </motion.div>
          );
        })}
      </div>
      <figcaption className="mt-3 text-[12.5px] text-fg-faint">Not a screenshot: five separate tools becoming one platform.</figcaption>
    </figure>
  );
}
