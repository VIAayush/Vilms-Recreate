"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { ScrollStory, type StoryStep } from "@/components/site-ui/ScrollStory";
import { Reveal } from "@/components/site-ui/Reveal";
import { Avatar } from "../screens/primitives";
import { CertScene, CourseScene, EnrolScene, EvalScene, LeadScene, LiveScene, PayScene, RenewScene } from "../screens/scenes";

// "From enquiry to graduation" — one student record travelling through the
// whole institute. As the visitor scrolls (or taps through on a phone) the
// profile on top updates and the screen beneath it changes to the one an
// institute owner would be looking at at that moment. Sample data.

const STEPS: (StoryStep & { rail: string; status: string })[] = [
  { title: "Lead", rail: "Lead", status: "New lead", text: "An enquiry arrives from an ad, a webinar or a free PDF." },
  { title: "Student", rail: "Student", status: "Enrolled", text: "They enrol and get access to their course." },
  { title: "Course", rail: "Course", status: "Learning", text: "Lessons, videos and materials — progress updates as they go." },
  { title: "Live class", rail: "Live class", status: "In class", text: "They join the live session from the same course." },
  { title: "Assessment", rail: "Assessment", status: "Evaluating", text: "They submit an answer. AI drafts, a mentor approves." },
  { title: "Payment", rail: "Payment", status: "Paid", text: "The fee goes to your account. VILMS takes ₹0." },
  { title: "Certificate", rail: "Certificate", status: "Certified", text: "Issued under your institute's name." },
  { title: "Renewal", rail: "Renewal", status: "Renewal due", text: "The next batch is one tap away." },
];

const PROGRESS = [0, 0, 38, 62, 74, 74, 100, 100];
const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function Stage({ i, within }: { i: number; within: number }) {
  const approved = i === 4 && within > 0.5;
  const graded = i > 4 || approved;
  const paid = i >= 5;
  const certified = i >= 6;

  const scene = [
    <LeadScene key="lead" />,
    <EnrolScene key="student" />,
    <CourseScene key="course" />,
    <LiveScene key="live" />,
    <EvalScene key="eval" approved={approved} />,
    <PayScene key="pay" />,
    <CertScene key="cert" />,
    <RenewScene key="renew" />,
  ][i];

  return (
    <div className="rounded-[24px] border border-edge bg-canvas-alt p-3 sm:p-5">
      {/* the rail */}
      <ol className="relative flex items-start justify-between" aria-label="Student lifecycle">
        <span aria-hidden className="absolute left-3 right-3 top-[11px] h-[2px] rounded-full bg-edge" />
        <motion.span aria-hidden className="absolute left-3 top-[11px] h-[2px] origin-left rounded-full bg-primary" style={{ right: 12 }} animate={{ scaleX: i / (STEPS.length - 1) }} transition={{ type: "spring", stiffness: 120, damping: 24 }} />
        {STEPS.map((s, k) => (
          <li key={s.title} className="relative z-10 flex w-6 flex-col items-center sm:w-14" aria-current={k === i ? "step" : undefined}>
            <span
              className={clsx(
                "grid h-[22px] w-[22px] place-items-center rounded-full border-2 text-[10px] font-semibold transition-colors duration-300",
                k < i ? "border-primary bg-primary text-white" : k === i ? "border-navy bg-navy text-white" : "border-edge-strong bg-canvas-alt text-fg-faint",
              )}
            >
              {k < i ? <Check aria-hidden className="h-3 w-3" strokeWidth={3} /> : k + 1}
            </span>
            <span className={clsx("mt-1.5 hidden text-center text-[10.5px] font-medium leading-tight transition-colors sm:block", k === i ? "text-fg" : "text-fg-faint")}>{s.rail}</span>
          </li>
        ))}
      </ol>

      {/* the student, who is the same person all the way through */}
      <div className="mt-4 rounded-2xl border border-edge bg-panel p-3.5 shadow-sm">
        <div className="flex items-center gap-3">
          <Avatar name="Rahul Kumar" size="lg" tone={0} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold">Rahul Kumar</p>
            <p className="truncate text-[12px] text-fg-muted">Prelims Foundation · Batch A</p>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={STEPS[i].status} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="shrink-0 rounded-full bg-primary-tint px-2.5 py-1 text-[11.5px] font-semibold text-primary">
              {STEPS[i].status}
            </motion.span>
          </AnimatePresence>
        </div>
        <dl className="mt-3.5 grid grid-cols-3 gap-2.5 text-[11.5px]">
          <div className="min-w-0">
            <dt className="text-fg-muted">Course progress</dt>
            <dd className="mt-1.5">
              <span className="block h-1.5 overflow-hidden rounded-full bg-sunken">
                <motion.span className="block h-full rounded-full bg-primary" animate={{ width: `${PROGRESS[i]}%` }} transition={{ duration: 0.6 }} />
              </span>
              <span className="mt-1 block font-mono tabular-nums text-fg">{PROGRESS[i]}%</span>
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-fg-muted">Fees paid</dt>
            <dd className={clsx("mt-1.5 font-mono text-[13px] tabular-nums transition-colors", paid ? "text-green" : "text-fg-faint")}>{paid ? rupees(15000) : "—"}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-fg-muted">Result · certificate</dt>
            <dd className="mt-1.5 flex items-center gap-1.5 font-mono text-[13px] tabular-nums">
              <span className={graded ? "text-fg" : "text-fg-faint"}>{graded ? "16/20" : "—"}</span>
              <span className="text-fg-faint">·</span>
              <span className={certified ? "text-green" : "text-fg-faint"}>{certified ? "Issued" : "—"}</span>
            </dd>
          </div>
        </dl>
      </div>

      {/* what's on screen right now */}
      <div className="mt-3 min-h-[250px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            {scene}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Lifecycle() {
  return (
    <section id="lifecycle" className="scroll-mt-20 pt-16 sm:pt-24">
      <div className="wrap">
        <Reveal className="max-w-[760px]">
          <p className="kicker">One student, one record</p>
          <h2 className="mt-4 text-balance font-display text-[clamp(32px,4.8vw,64px)] font-medium leading-[1.03] tracking-[-0.04em]">From enquiry to graduation.</h2>
          <p className="sub mt-4 max-w-[480px]">Nothing re-typed between steps. Scroll to follow Rahul through VILMS.</p>
        </Reveal>

        <ScrollStory className="mt-10 sm:mt-14" steps={STEPS} perStep={0.7} stageHeight="min(700px, calc(100svh - 120px))" stage={(i, p) => <Stage i={i} within={p * STEPS.length - i} />} />
        <p className="mt-6 text-[12px] text-fg-faint">Illustrative interface · sample data</p>
      </div>
    </section>
  );
}
