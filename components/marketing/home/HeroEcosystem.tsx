"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { AnimatePresence, animate, motion } from "motion/react";
import { Award, CalendarCheck, Check, IndianRupee, Loader2, ScanText } from "lucide-react";
import { useAutoplay, useInView, useReducedMotion } from "../motion";
import { Avatar, LiveDot } from "../screens/primitives";
import { LiveDashboard } from "../screens/LiveDashboard";

// The home page's living product: the VILMS dashboard in the middle, and
// around it the things an institute owner actually watches happen — students
// learning right now, an AI draft waiting for a mentor, a fee landing in
// their own account, a demo booked, a course completed. Every card runs its
// own small loop, only while the hero is on screen and only if the visitor
// hasn't asked for reduced motion. All names and amounts are sample data.

const card = "rounded-2xl border border-edge bg-panel p-3.5 shadow-[0_18px_44px_-20px_rgb(14_27_44/0.35)]";

function useLoop(count: number, interval: number, active: boolean) {
  const [i] = useAutoplay(count, { interval, running: active });
  return active ? i : count - 1;
}

/** A number that eases to each new value. */
function Ticker({ value, format = (n: number) => String(Math.round(n)) }: { value: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const c = animate(from.current, value, { duration: 0.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => (el.textContent = format(v)) });
    from.current = value;
    return () => c.stop();
  }, [value, format]);
  return <span ref={ref}>{format(value)}</span>;
}

const STUDENTS = [128, 131, 127, 134, 138, 133, 141, 136];

function StudentsLive({ on }: { on: boolean }) {
  const i = useLoop(STUDENTS.length, 1900, on);
  return (
    <div className={clsx(card, "w-full md:w-[212px]")}>
      <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-fg-muted">
        <LiveDot /> Students learning now
      </p>
      <p className="mt-1.5 font-display text-[34px] font-medium leading-none tracking-[-0.03em] tabular-nums">
        <Ticker value={STUDENTS[i]} />
      </p>
      <div className="mt-3 flex h-7 items-end gap-[3px]" aria-hidden>
        {STUDENTS.map((v, k) => (
          <motion.span key={k} className={clsx("flex-1 rounded-t-[2px]", k === i ? "bg-primary" : "bg-primary/25")} animate={{ height: `${((v - 120) / 24) * 100}%` }} transition={{ duration: 0.5 }} />
        ))}
      </div>
    </div>
  );
}

const EVAL_STEPS = [
  { label: "AI is reading the answer", sub: "Q3 · handwritten · Rahul K.", tone: "text-primary", icon: Loader2 },
  { label: "Draft ready · 16 / 20", sub: "Waiting for Meera to review", tone: "text-fg", icon: ScanText },
  { label: "Mentor approved", sub: "Evaluated copy sent to Rahul", tone: "text-green", icon: Check },
];

function EvalStatus({ on }: { on: boolean }) {
  const i = useLoop(EVAL_STEPS.length, 2000, on);
  const s = EVAL_STEPS[i];
  return (
    <div className={clsx(card, "w-full md:w-[240px]")}>
      <p className="text-[11.5px] font-medium text-fg-muted">Answer evaluation</p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="mt-2 flex items-center gap-2.5">
          <span className={clsx("grid h-8 w-8 shrink-0 place-items-center rounded-lg", i === 2 ? "bg-green-tint" : "bg-primary-tint", s.tone)}>
            <s.icon aria-hidden className={clsx("h-4 w-4", i === 0 && "animate-spin")} />
          </span>
          <span className="min-w-0">
            <span className={clsx("block truncate text-[13.5px] font-semibold", s.tone)}>{s.label}</span>
            <span className="block truncate text-[11.5px] text-fg-muted">{s.sub}</span>
          </span>
        </motion.div>
      </AnimatePresence>
      <div className="mt-3 flex gap-1" aria-hidden>
        {EVAL_STEPS.map((_, k) => (
          <span key={k} className={clsx("h-1 flex-1 rounded-full transition-colors duration-500", k <= i ? (i === 2 ? "bg-green" : "bg-primary") : "bg-sunken")} />
        ))}
      </div>
    </div>
  );
}

const PAYMENTS = [
  { who: "Sneha P.", amt: 15000 },
  { who: "Karan S.", amt: 12000 },
  { who: "Divya R.", amt: 18000 },
];
const rupees = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function PaymentCard({ on }: { on: boolean }) {
  const i = useLoop(PAYMENTS.length, 2300, on);
  return (
    <div className={clsx(card, "w-full md:w-[228px]")}>
      <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-fg-muted">
        <IndianRupee aria-hidden className="h-3.5 w-3.5 text-green" /> Payment received
      </p>
      <p className="mt-1.5 font-display text-[28px] font-medium leading-none tracking-[-0.03em] tabular-nums">
        <Ticker value={PAYMENTS[i].amt} format={rupees} />
      </p>
      <p className="mt-1 text-[11.5px] text-fg-muted">{PAYMENTS[i].who} · Razorpay → your account</p>
      <p className="mt-2.5 flex items-center justify-between rounded-lg bg-canvas-alt px-2.5 py-1.5 text-[11.5px]">
        <span className="text-fg-muted">VILMS commission</span>
        <span className="font-mono font-medium text-green">₹0</span>
      </p>
    </div>
  );
}

const DEMOS = [
  { who: "Sneha P.", slot: "Thu · 5:00 PM" },
  { who: "Arjun T.", slot: "Fri · 11:30 AM" },
  { who: "Neha G.", slot: "Sat · 4:00 PM" },
];

function DemoBooked({ on }: { on: boolean }) {
  const i = useLoop(DEMOS.length, 2600, on);
  return (
    <div className={clsx(card, "w-full md:w-[218px]")}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }} className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-white ">
            <CalendarCheck aria-hidden className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11.5px] font-medium text-fg-muted">Demo booked</span>
            <span className="block truncate text-[14px] font-semibold">{DEMOS[i].who}</span>
            <span className="block text-[11.5px] text-fg-muted">{DEMOS[i].slot}</span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Completion({ on }: { on: boolean }) {
  const i = useLoop(4, 1100, on);
  const pct = [40, 70, 100, 100][i];
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <div className={clsx(card, "flex w-full items-center gap-3 md:w-[226px]")}>
      <span className="relative grid h-11 w-11 shrink-0 place-items-center">
        <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="20" cy="20" r={r} fill="none" strokeWidth="4" className="stroke-sunken" />
          <motion.circle cx="20" cy="20" r={r} fill="none" strokeWidth="4" strokeLinecap="round" className={pct === 100 ? "stroke-green" : "stroke-primary"} strokeDasharray={c} animate={{ strokeDashoffset: c * (1 - pct / 100) }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
        </svg>
        {pct === 100 ? <Award aria-hidden className="h-4 w-4 text-green" /> : <span className="text-[10px] font-semibold tabular-nums">{pct}%</span>}
      </span>
      <span className="min-w-0">
        <span className="block text-[11.5px] font-medium text-fg-muted">{pct === 100 ? "Course completed" : "Prelims Foundation"}</span>
        <span className="block truncate text-[13.5px] font-semibold">{pct === 100 ? "Certificate issued" : "Priya S. · in progress"}</span>
      </span>
      <Avatar name="Priya S" size="sm" tone={1} />
    </div>
  );
}

// The outer element drifts with the cursor (CursorFx owns its transform), the
// middle one holds the anchor shift, the inner one animates in.
function Float({ className, depth, shift, children }: { className: string; depth: number; shift?: "up" | "down"; children: React.ReactNode }) {
  return (
    <div className={clsx("parallax absolute z-10", className)} data-depth={depth}>
      <div className={clsx(shift === "up" && "-translate-y-1/2", shift === "down" && "translate-y-1/2")}>
        <motion.div initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.5 }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// Layout contract: the copy column is never entered by anything here. The
// visual owns its own box; the activity cards are anchored to that box (not to
// the hero) with offsets that stay inside it horizontally and only overhang
// above/below, where the hero reserves padding. Below `xl` there is no
// overhang at all — the cards simply sit in a row under the dashboard.
export function HeroEcosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px" });
  const reduced = useReducedMotion();
  const on = inView && !reduced;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[720px] lg:max-w-none xl:pb-14 xl:pt-9">
      <LiveDashboard />

      {/* overhanging cards: wide desktop only, anchored to this box */}
      <Float className="left-5 top-0 hidden xl:block" shift="up" depth={8}>
        <Completion on={on} />
      </Float>
      <Float className="left-5 top-[46%] hidden xl:block" depth={-6}>
        <StudentsLive on={on} />
      </Float>
      <Float className="bottom-0 left-10 hidden xl:block" shift="down" depth={10}>
        <DemoBooked on={on} />
      </Float>
      <Float className="bottom-0 right-6 hidden xl:block" shift="down" depth={-10}>
        <EvalStatus on={on} />
      </Float>
      <Float className="right-3 top-[40%] hidden 2xl:block" depth={6}>
        <PaymentCard on={on} />
      </Float>

      {/* everywhere else: a tidy row under the dashboard */}
      <div className="mt-4 grid gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:hidden [&>*:nth-child(3)]:max-lg:hidden">
        <EvalStatus on={on} />
        <PaymentCard on={on} />
        <DemoBooked on={on} />
      </div>
      <p className="mt-3 text-center text-[11.5px] text-fg-faint xl:mt-16 xl:text-left">Illustrative interface · sample data</p>
    </div>
  );
}
