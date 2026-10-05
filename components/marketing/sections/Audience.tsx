"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { audience, type AudienceId } from "@/lib/content";
import { BrowserFrame, Illustrative, LiveDot, Pill } from "../screens/primitives";

type Row = { title: string; meta: string; pill: string; tone: "primary" | "green" | "yellow" | "red" | "purple" | "muted"; live?: boolean };
type Dash = { url: string; title: string; kpis: [string, string][]; rows: Row[]; side: { title: string; lines: string[] } };

// Sample dashboards — one per kind of institute, all illustrative.
const DASH: Record<AudienceId, Dash> = {
  coaching: {
    url: "yourinstitute.vilms.in/admin/batches",
    title: "JEE & NEET batches",
    kpis: [["Batches", "12"], ["Live today", "5"], ["Tests this week", "8"]],
    rows: [
      { title: "JEE Main 2027 · Batch A", meta: "Physics · live at 7 PM", pill: "Live", tone: "red", live: true },
      { title: "NEET Repeaters", meta: "Biology · mock test 6 on Sun", pill: "Mock test", tone: "purple" },
      { title: "Foundation Class 10", meta: "Maths · 3 answers to evaluate", pill: "To evaluate", tone: "yellow" },
    ],
    side: { title: "Admissions", lines: ["Webinar: “How to crack JEE” · 86 RSVPs", "Fee plan sent to 14 leads"] },
  },
  testprep: {
    url: "yourinstitute.vilms.in/admin/tests",
    title: "Mock tests & answer writing",
    kpis: [["Mock tests", "24"], ["Answers this week", "312"], ["AI drafts ready", "41"]],
    rows: [
      { title: "UPSC Prelims Mock 12", meta: "Auto-graded · results out", pill: "Results out", tone: "green" },
      { title: "Mains Answer Writing · GS2", meta: "Long-form · AI draft · mentor review", pill: "AI draft", tone: "purple" },
      { title: "CSAT Practice 5", meta: "Opens Thursday", pill: "Scheduled", tone: "muted" },
    ],
    side: { title: "Exam cycle", lines: ["Prelims in 64 days", "Drip lessons unlock daily"] },
  },
  skills: {
    url: "yourinstitute.vilms.in/admin/programmes",
    title: "Hybrid programmes",
    kpis: [["Programmes", "9"], ["Learners", "640"], ["Certificates", "212"]],
    rows: [
      { title: "Digital Marketing · Cohort 4", meta: "Recorded + weekly live", pill: "Hybrid", tone: "primary" },
      { title: "Python for Beginners", meta: "Self-paced · 24 lessons", pill: "Recorded", tone: "muted" },
      { title: "Data Analytics · Cohort 2", meta: "18 completed this week", pill: "Certificates", tone: "green" },
    ],
    side: { title: "Webinars", lines: ["Free masterclass · Sat 6 PM", "One-click upsell to Cohort 5"] },
  },
  training: {
    url: "yourinstitute.vilms.in/admin/branches",
    title: "Branches & teams",
    kpis: [["Branches", "4"], ["Batches", "22"], ["Staff", "31"]],
    rows: [
      { title: "Pune · 7 batches", meta: "Branch admin: Rohit", pill: "Branch", tone: "primary" },
      { title: "Nagpur · 5 batches", meta: "2 teachers, 1 counsellor", pill: "Branch", tone: "primary" },
      { title: "Online · 10 batches", meta: "Recorded programmes", pill: "Online", tone: "green" },
    ],
    side: { title: "Roles", lines: ["Teachers: courses & grading", "Counsellors: leads & payments"] },
  },
  schools: {
    url: "yourinstitute.vilms.in/admin/programmes",
    title: "Paid add-on programmes",
    kpis: [["Programmes", "5"], ["Enrolled", "380"], ["Invoices", "380"]],
    rows: [
      { title: "Olympiad Prep · Class 8–10", meta: "Fees to the school's Razorpay", pill: "Paid", tone: "green" },
      { title: "Entrance Prep · Class 12", meta: "Tests + live doubt classes", pill: "Live", tone: "red", live: true },
      { title: "Coding Certificate Course", meta: "Certificate on completion", pill: "Certificate", tone: "yellow" },
    ],
    side: { title: "Payments", lines: ["GST invoices sent automatically", "UPI & bank fallback on"] },
  },
  online: {
    url: "yourinstitute.vilms.in/admin",
    title: "Your online academy",
    kpis: [["Courses", "6"], ["Students", "48"], ["Free PDF downloads", "1,120"]],
    rows: [
      { title: "Spoken English · Live", meta: "Mon–Fri · 8 PM", pill: "Live", tone: "red", live: true },
      { title: "Grammar Masterclass", meta: "Recorded · 30 lessons", pill: "Recorded", tone: "muted" },
      { title: "Free: 100 phrases PDF", meta: "Lead magnet · builds your list", pill: "Lead magnet", tone: "primary" },
    ],
    side: { title: "Plan", lines: ["Base · ₹499/month", "Upgrade any time — data stays"] },
  },
};

export function Audience() {
  const [id, setId] = useState<AudienceId>("coaching");
  const d = DASH[id];
  const item = audience.items.find((i) => i.id === id)!;

  return (
    <section id="solutions" aria-labelledby="audience-title" className="py-24 sm:py-32">
      <div className="wrap">
        <p className="kicker">{audience.kicker}</p>
        <h2 id="audience-title" className="h2 mt-4 max-w-[17ch]">
          {audience.title}
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          {/* the selector */}
          <div role="tablist" aria-label="Institute types" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:block lg:overflow-visible lg:px-0">
            {audience.items.map((a) => {
              const on = a.id === id;
              return (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setId(a.id)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setId(a.id)}
                  className={clsx(
                    "relative shrink-0 rounded-full border px-4 py-2 text-left text-[14.5px] font-semibold transition-colors lg:block lg:w-full lg:rounded-none lg:border-0 lg:border-b lg:border-edge lg:px-0 lg:py-4",
                    on ? "border-fg bg-fg text-canvas lg:bg-transparent lg:text-fg" : "border-edge bg-panel text-fg-muted hover:text-fg lg:bg-transparent",
                  )}
                >
                  <span className="lg:font-display lg:text-[clamp(22px,2.2vw,30px)] lg:tracking-[-0.03em]">{a.label}</span>
                  {on ? <motion.span layoutId="aud-line" className="absolute bottom-[-1px] left-0 hidden h-[2px] w-full bg-primary lg:block" /> : null}
                  <span className={clsx("hidden text-[13.5px] font-normal text-fg-muted transition-[max-height,opacity] duration-500 lg:block lg:overflow-hidden", on ? "mt-1 max-h-12 opacity-100" : "max-h-0 opacity-0")}>{a.line}</span>
                </button>
              );
            })}
          </div>

          {/* the visual */}
          <div>
            <p className="mb-4 text-[15px] text-fg-muted lg:hidden">{item.line}</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <BrowserFrame url={d.url} tilt={2}>
                  <div className="grid gap-3 p-4 sm:grid-cols-[1.5fr_1fr] sm:p-5">
                    <div>
                      <p className="text-[11px] text-fg-muted">Dashboard</p>
                      <p className="text-[18px] font-semibold tracking-tight">{d.title}</p>
                      <dl className="mt-3 grid grid-cols-3 gap-2">
                        {d.kpis.map(([k, v]) => (
                          <div key={k} className="rounded-xl border border-edge px-3 py-2">
                            <dt className="truncate text-[10.5px] text-fg-muted">{k}</dt>
                            <dd className="font-display text-[20px] font-semibold tabular-nums">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <ul className="mt-3 space-y-2">
                        {d.rows.map((r, i) => (
                          <motion.li
                            key={r.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            className="flex items-center gap-3 rounded-xl bg-canvas-alt px-3 py-2.5"
                          >
                            <span className="min-w-0">
                              <span className="block truncate text-[13px] font-semibold">{r.title}</span>
                              <span className="block truncate text-[11.5px] text-fg-muted">{r.meta}</span>
                            </span>
                            <Pill tone={r.tone} className="ml-auto">
                              {r.live ? <LiveDot className="mr-0.5" /> : null}
                              {r.pill}
                            </Pill>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-edge p-3">
                      <p className="text-[11.5px] font-semibold">{d.side.title}</p>
                      <ul className="mt-2 space-y-2 text-[12px] text-fg-muted">
                        {d.side.lines.map((l) => (
                          <li key={l} className="rounded-lg bg-canvas-alt px-2.5 py-2">
                            {l}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </BrowserFrame>
              </motion.div>
            </AnimatePresence>
            <Illustrative className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
