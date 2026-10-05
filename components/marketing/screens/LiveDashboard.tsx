"use client";

import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, LayoutGroup, animate, motion } from "motion/react";
import { Award, BookOpen, CreditCard, LayoutGrid, PenLine, Radio, Sparkles, UserPlus, Users } from "lucide-react";
import { useInView, useReducedMotion } from "../motion";
import { Avatar, BrowserFrame, InstituteMark, LiveDot } from "./primitives";

/*
  The hero's living product. One timeline, ~1.1s per beat:
    0 dashboard at rest
    1 new lead → toast, card lands in "New"
    2 the lead moves into the CRM ("Contacted")
    3 enrolled → card moves to "Enrolled", students +1
    4 payment → toast
    5 revenue → this month's bar grows, fees counter updates
    6 live class → toast, "Live now" lights up
    7 AI evaluation drafted → toast
    8 certificate issued → toast
  …then it resets and plays again. All sample data.
*/

const BEAT = 1150;
const BEATS = 9;
const HOLD = 1800; // linger on the last beat before looping

const BARS = [42, 55, 48, 61, 58, 66, 72, 69, 77, 81, 86, 88]; // last bar = this month

type Toast = { id: number; icon: typeof Sparkles; title: string; meta: string; tone: string };
const TOASTS: Record<number, Toast> = {
  1: { id: 1, icon: UserPlus, title: "New lead", meta: "Rahul K. · Google Ads", tone: "bg-primary" },
  4: { id: 4, icon: CreditCard, title: "₹15,000 received", meta: "Razorpay → your account", tone: "bg-green" },
  6: { id: 6, icon: Radio, title: "Live class started", meta: "Polity · Batch A · 42 joined", tone: "bg-red" },
  7: { id: 7, icon: Sparkles, title: "AI draft ready", meta: "Q3 answer · mentor to approve", tone: "bg-purple" },
  8: { id: 8, icon: Award, title: "Certificate issued", meta: "Rahul Kumar · Prelims Foundation", tone: "bg-yellow" },
};

const NAV = [
  { icon: LayoutGrid, label: "Dashboard" },
  { icon: Users, label: "Leads" },
  { icon: BookOpen, label: "Courses" },
  { icon: Radio, label: "Live classes" },
  { icon: PenLine, label: "Evaluations" },
  { icon: CreditCard, label: "Payments" },
  { icon: Award, label: "Certificates" },
];
// which nav item the moment belongs to
const NAV_FOR_BEAT = [0, 1, 1, 1, 5, 5, 3, 4, 6];

const COLUMNS = ["New", "Contacted", "Enrolled"] as const;
const STATIC_CARDS: Record<(typeof COLUMNS)[number], { name: string; src: string }[]> = {
  New: [{ name: "Sneha P.", src: "Free PDF" }],
  Contacted: [{ name: "Aman V.", src: "Webinar" }],
  Enrolled: [{ name: "Karan S.", src: "Landing page" }],
};

function Counter({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controls = animate(from.current, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    });
    from.current = value;
    return () => controls.stop();
  }, [value, format]);
  return <span ref={ref}>{format(value)}</span>;
}

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-IN");
const fmtLakh = (n: number) => `₹${(n / 100000).toFixed(2)}L`;

export function LiveDashboard({ compact = false }: { compact?: boolean }) {
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-5% 0px" });
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState(0);
  const [run, setRun] = useState(0); // bumps each loop so the lead card re-enters

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setTimeout(
      () => {
        if (beat >= BEATS - 1) {
          setBeat(0);
          setRun((r) => r + 1);
        } else setBeat((b) => b + 1);
      },
      beat >= BEATS - 1 ? HOLD : BEAT,
    );
    return () => window.clearTimeout(id);
  }, [beat, inView, reduced]);

  // Reduced motion: the finished state, still.
  const b = reduced ? BEATS - 1 : beat;
  const students = 1248 + (b >= 3 ? 1 : 0);
  const fees = 412000 + (b >= 5 ? 15000 : 0);
  const leads = 36 + (b >= 1 ? 1 : 0);
  const live = b >= 6;
  const leadCol: (typeof COLUMNS)[number] | null = b >= 3 ? "Enrolled" : b >= 2 ? "Contacted" : b >= 1 ? "New" : null;
  const toast = !reduced ? TOASTS[b] : undefined;
  const activeNav = NAV_FOR_BEAT[b];

  return (
    <LayoutGroup id={uid}>
    <div ref={ref} className="relative">
      <BrowserFrame url="yourinstitute.vilms.in/admin">
        <div className="grid md:grid-cols-[176px_minmax(0,1fr)]">
          {/* sidebar */}
          <aside className="hidden border-r border-edge p-3 md:block" aria-hidden>
            <div className="mb-4 flex items-center gap-2 px-1.5">
              <InstituteMark className="h-7 w-7 text-[10px]" />
              <span className="text-[12.5px] font-semibold">Your Institute</span>
            </div>
            <ul className="space-y-0.5 text-[12.5px]">
              {NAV.map((n, i) => (
                <li
                  key={n.label}
                  className={clsx(
                    "relative flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-500",
                    i === activeNav ? "font-semibold text-primary" : "text-fg-muted",
                  )}
                >
                  {i === activeNav ? <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-primary-tint" transition={{ type: "spring", stiffness: 380, damping: 34 }} /> : null}
                  <n.icon aria-hidden className="h-3.5 w-3.5" />
                  {n.label}
                  {n.label === "Live classes" && live ? <LiveDot className="ml-auto" /> : null}
                </li>
              ))}
            </ul>
          </aside>

          {/* main */}
          <div className="min-w-0 p-3.5 sm:p-5">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <p className="text-[11px] text-fg-muted">Good evening, Priya</p>
                <p className="text-[17px] font-semibold tracking-tight sm:text-[19px]">Today at your institute</p>
              </div>
              <span className="hidden items-center gap-1.5 rounded-full border border-edge px-2.5 py-1 text-[11px] text-fg-muted sm:flex">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-green" /> Live
              </span>
            </div>

            {/* KPIs */}
            <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Kpi label="Students" accent="bg-primary" pulse={b === 3}>
                <Counter value={students} format={fmtInt} />
              </Kpi>
              <Kpi label="Fees this month" accent="bg-green" pulse={b === 5}>
                <Counter value={fees} format={fmtLakh} />
              </Kpi>
              <Kpi label="New leads" accent="bg-yellow" pulse={b === 1}>
                <Counter value={leads} format={fmtInt} />
              </Kpi>
              <Kpi label="Live now" accent="bg-red" pulse={b === 6}>
                <span className="flex items-center gap-1.5">
                  {live ? "1 class" : "—"}
                  {live ? <LiveDot /> : null}
                </span>
              </Kpi>
            </dl>

            <div className={clsx("mt-3 grid gap-3", !compact && "lg:grid-cols-[1.15fr_1fr]")}>
              {/* revenue chart */}
              <div className="rounded-xl border border-edge bg-panel p-3">
                <div className="flex items-baseline justify-between">
                  <p className="text-[11.5px] font-semibold">Fee collection</p>
                  <p className="text-[10.5px] text-fg-muted">last 12 months · to your Razorpay</p>
                </div>
                <div className="mt-3 flex h-[96px] items-end gap-1.5 sm:h-[120px]" aria-hidden>
                  {BARS.map((h, i) => {
                    const last = i === BARS.length - 1;
                    const height = last ? (b >= 5 ? 100 : h) : h;
                    return (
                      <motion.span
                        key={i}
                        className={clsx("flex-1 origin-bottom rounded-t-[4px]", last ? "bg-primary" : "bg-primary/25")}
                        initial={false}
                        animate={{ height: `${height}%` }}
                        transition={{ type: "spring", stiffness: 140, damping: 18 }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* mini pipeline */}
              <div className={clsx("rounded-xl border border-edge bg-panel p-3", compact ? "hidden" : "hidden sm:block")}>
                <p className="text-[11.5px] font-semibold">Lead pipeline</p>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {COLUMNS.map((c) => (
                    <div key={c} className="min-w-0 rounded-lg bg-canvas-alt p-1.5">
                      <p className="mb-1.5 truncate px-0.5 text-[10px] font-semibold text-fg-muted">{c}</p>
                      <div className="space-y-1">
                        {leadCol === c ? (
                          <motion.div
                            key={`rahul-${run}`}
                            layoutId={`rahul-${run}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                            className="flex items-center gap-1.5 rounded-md bg-panel px-1.5 py-1 text-[10.5px] shadow-sm ring-2 ring-primary/60"
                          >
                            <Avatar name="Rahul K" size="sm" tone={0} />
                            <span className="truncate font-semibold">Rahul K.</span>
                          </motion.div>
                        ) : null}
                        {STATIC_CARDS[c].map((l) => (
                          <div key={l.name} className="flex items-center gap-1.5 rounded-md bg-panel px-1.5 py-1 text-[10.5px] shadow-sm">
                            <Avatar name={l.name} size="sm" />
                            <span className="truncate">{l.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>

      {/* notifications sliding in over the product */}
      <div aria-hidden className="pointer-events-none absolute right-3 top-14 z-20 w-[min(280px,calc(100%-24px))] sm:-right-6 sm:top-20 lg:-right-10">
        <AnimatePresence mode="popLayout">
          {toast ? (
            <motion.div
              key={`${toast.id}-${run}`}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="flex items-center gap-3 rounded-2xl border border-edge bg-panel/95 p-3 shadow-window backdrop-blur"
            >
              <span className={clsx("grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white", toast.tone)}>
                <toast.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold">{toast.title}</span>
                <span className="block truncate text-[11.5px] text-fg-muted">{toast.meta}</span>
              </span>
              <span className="ml-auto self-start text-[10.5px] text-fg-faint">now</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
    </LayoutGroup>
  );
}

function Kpi({ label, accent, pulse, children }: { label: string; accent: string; pulse?: boolean; children: React.ReactNode }) {
  return (
    <div className={clsx("relative overflow-hidden rounded-xl border bg-panel px-3 py-2.5 transition-[border-color,box-shadow] duration-500", pulse ? "border-primary/50 shadow-[0_0_0_3px_rgb(var(--primary)/0.12)]" : "border-edge")}>
      <dt className="flex items-center gap-1.5 truncate text-[10.5px] text-fg-muted">
        <span className={clsx("h-1.5 w-1.5 shrink-0 rounded-full", accent)} />
        {label}
      </dt>
      <dd className="mt-0.5 font-display text-[18px] font-semibold tabular-nums tracking-tight sm:text-[20px]">{children}</dd>
    </div>
  );
}
