import clsx from "clsx";
import { Award, BookOpen, CalendarClock, Check, FileText, IndianRupee, MessageCircle, Play, Repeat2, Sparkles, Users, Video } from "lucide-react";
import type { StoryId } from "@/lib/content";
import { Avatar, InstituteMark, LiveDot, Meter, Pill } from "./primitives";

// One student's journey through VILMS, as interface fragments. Every scene is
// sample data in an illustrated UI. The same student (Rahul) appears in all of
// them, because it's the same record — that's the point.

const card = "rounded-xl border border-edge bg-panel";

export function LeadScene() {
  return (
    <div className="space-y-2.5">
      <div className={clsx(card, "p-3.5")}>
        <div className="flex items-start gap-3">
          <Avatar name="Rahul Kumar" tone={0} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[13.5px] font-semibold">Rahul Kumar</p>
              <Pill tone="primary">New</Pill>
            </div>
            <p className="mt-0.5 text-[12px] text-fg-muted">Asked about the JEE crash course</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Pill>Google Ads</Pill>
          <Pill>Course landing page</Pill>
          <Pill tone="green">
            <MessageCircle aria-hidden className="h-3 w-3" /> WhatsApp sent
          </Pill>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[
          ["New", 12],
          ["RSVP", 9],
          ["Checkout", 5],
          ["Enrolled", 21],
        ].map(([label, n], i) => (
          <div key={label} className={clsx(card, "px-2 py-2", i === 0 && "border-primary/40 bg-primary-tint")}>
            <p className="truncate text-[10px] text-fg-muted">{label}</p>
            <p className="font-mono text-[15px] font-medium tabular-nums">{n}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EnrolScene() {
  return (
    <div className={clsx(card, "p-3.5")}>
      <div className="flex items-center gap-3">
        <Avatar name="Rahul Kumar" size="lg" tone={0} />
        <div className="min-w-0">
          <p className="text-[14px] font-semibold">Rahul Kumar</p>
          <p className="truncate text-[12px] text-fg-muted">Prelims Foundation · Batch A</p>
        </div>
        <Pill tone="green" className="ml-auto">
          <Check aria-hidden className="h-3 w-3" /> Enrolled
        </Pill>
      </div>
      <dl className="mt-3.5 grid grid-cols-3 gap-1.5 text-center">
        {[
          ["Branch", "Jaipur"],
          ["Batch", "A"],
          ["Paid", "₹15,000"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-canvas-alt px-2 py-2">
            <dt className="text-[10px] text-fg-muted">{k}</dt>
            <dd className="text-[12.5px] font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <ol className="mt-3.5 space-y-2 border-l border-edge pl-3 text-[11.5px] text-fg-muted">
        <li className="relative before:absolute before:-left-[15.5px] before:top-1 before:h-2 before:w-2 before:rounded-full before:bg-primary">Lead from Google Ads</li>
        <li className="relative before:absolute before:-left-[15.5px] before:top-1 before:h-2 before:w-2 before:rounded-full before:bg-gold">Joined the free webinar</li>
        <li className="relative font-medium text-fg before:absolute before:-left-[15.5px] before:top-1 before:h-2 before:w-2 before:rounded-full before:bg-green">Paid via your Razorpay · enrolled</li>
      </ol>
    </div>
  );
}

export function CourseScene() {
  return (
    <div className={clsx(card, "overflow-hidden")}>
      <div className="relative aspect-[16/6] bg-[rgb(27_32_38)]">
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[rgb(27_32_38)]">
            <Play aria-hidden className="ml-0.5 h-4 w-4" fill="currentColor" />
          </span>
        </div>
        <p className="absolute left-3 top-2.5 text-[11px] font-semibold text-white/90">Lesson 3 · Fundamental Rights</p>
        <div className="absolute inset-x-3 bottom-2.5 flex items-center gap-2 text-[10px] text-white/85">
          <span className="font-mono">12:40</span>
          <span className="relative h-1 flex-1 rounded-full bg-white/25">
            <span className="absolute inset-y-0 left-0 w-[41%] rounded-full bg-[rgb(106_170_222)]" />
          </span>
          <span className="font-mono">31:05</span>
        </div>
      </div>
      <ul className="divide-y divide-edge text-[12px]">
        {[
          { icon: BookOpen, t: "Polity essentials", m: "Recorded · 12 lessons", on: true },
          { icon: FileText, t: "Notes.pdf · Worksheet 1.pdf", m: "Attached" },
          { icon: Video, t: "Weekly doubt-clearing", m: "Live · Thu 7 PM" },
        ].map(({ icon: Icon, t, m, on }) => (
          <li key={t} className="flex items-center gap-2.5 px-3 py-2">
            <Icon aria-hidden className={clsx("h-3.5 w-3.5", on ? "text-primary" : "text-fg-muted")} />
            <span className={clsx("truncate", on && "font-semibold")}>{t}</span>
            <span className="ml-auto shrink-0 text-[10.5px] text-fg-muted">{m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LiveScene() {
  return (
    <div className={clsx(card, "p-3.5")}>
      <div className="flex items-center gap-2 text-[11px] font-semibold text-red">
        <LiveDot /> Live now
      </div>
      <p className="mt-2 text-[15px] font-semibold tracking-tight">Polity · Batch A · Live class</p>
      <p className="mt-0.5 text-[12px] text-fg-muted">Part of Prelims Foundation Batch · Zoom link attached</p>
      <div className="mt-3.5 flex items-center gap-3">
        <div className="flex -space-x-2">
          {["Rahul Kumar", "Sneha P", "Aman V", "Isha M"].map((n, i) => (
            <span key={n} className="rounded-full ring-2 ring-[rgb(var(--surface))]">
              <Avatar name={n} size="sm" tone={i} />
            </span>
          ))}
        </div>
        <span className="text-[12px] text-fg-muted">42 RSVPs</span>
        <span className="cta cta-sm ml-auto min-h-[30px] bg-primary px-3 text-[12px] text-primary-ink">Join class</span>
      </div>
      <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-canvas-alt px-2.5 py-2 text-[11px] text-fg-muted">
        <CalendarClock aria-hidden className="h-3.5 w-3.5" /> Reminder sent to 42 students before class
      </p>
    </div>
  );
}

export function EvalScene({ approved = true }: { approved?: boolean }) {
  return (
    <div className={clsx(card, "grid grid-cols-[0.8fr_1fr] gap-3 p-3")}>
      <div className="answer-sheet relative overflow-hidden rounded-lg border border-edge p-2.5 font-hand text-[13px] leading-[18px]">
        <p>Q3. The Directive</p>
        <p>Principles guide the</p>
        <p>
          state in making <span className="answer-highlight">laws</span>
        </p>
        <p>for social welfare…</p>
        <p className="opacity-60">Art. 38, 39, 41…</p>
      </div>
      <div className="min-w-0 space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[11.5px] font-semibold">Rubric</p>
          <Pill tone="primary">
            <Sparkles aria-hidden className="h-3 w-3" /> AI draft
          </Pill>
        </div>
        <Meter label="Content" value={7} max={8} />
        <Meter label="Structure" value={3} max={4} />
        <Meter label="Examples" value={3} max={4} />
        <Meter label="Language" value={3} max={4} />
        <p className={clsx("flex items-center gap-1 pt-1 text-[11px] font-semibold", approved ? "text-green" : "text-fg-muted")}>
          <Check aria-hidden className="h-3.5 w-3.5" /> {approved ? "Mentor approved · 16/20" : "Awaiting mentor"}
        </p>
      </div>
    </div>
  );
}

export function PayScene() {
  return (
    <div className={clsx(card, "p-3.5")}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] text-fg-muted">Order #2041</p>
        <Pill tone="green">
          <Check aria-hidden className="h-3 w-3" /> Paid
        </Pill>
      </div>
      <p className="mt-1.5 font-display text-[32px] font-semibold tabular-nums tracking-tight">₹15,000</p>
      <p className="text-[12px] text-fg-muted">Prelims Foundation Batch · via your Razorpay</p>
      <div className="mt-3 flex gap-1.5">
        {["Razorpay", "UPI", "Bank transfer"].map((m, i) => (
          <span key={m} className={clsx("rounded-md border px-2 py-1 text-[10.5px] font-medium", i === 0 ? "border-primary/40 bg-primary-tint text-primary" : "border-edge text-fg-muted")}>
            {m}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-canvas-alt px-2.5 py-2 text-[11px]">
        <span className="flex items-center gap-1.5 text-fg-muted">
          <FileText aria-hidden className="h-3.5 w-3.5" /> GST invoice INV-2041 sent
        </span>
        <span className="font-semibold text-green">VILMS commission ₹0</span>
      </div>
    </div>
  );
}

export function CertScene({ name = "Your Institute", color }: { name?: string; color?: string }) {
  return (
    <div className={clsx(card, "relative overflow-hidden p-1.5")}>
      <div className="relative rounded-lg border border-dashed border-edge px-4 py-4 text-center">
        <InstituteMark name={name} color={color} className="mx-auto h-8 w-8 text-[11px]" />
        <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-fg-muted">Certificate of completion</p>
        <p className="mt-1.5 font-serif text-[24px] italic leading-none">Rahul Kumar</p>
        <p className="mt-1.5 text-[11.5px] text-fg-muted">Prelims Foundation Batch</p>
        <div className="mx-auto mt-3 flex max-w-[240px] items-end justify-between text-left text-[9.5px] text-fg-muted">
          <span>
            Issued by
            <br />
            <b className="text-[11px] text-fg">{name}</b>
          </span>
          <Award aria-hidden className="h-6 w-6" style={{ color: color ?? "rgb(var(--gold))" }} />
        </div>
      </div>
    </div>
  );
}

export function RenewScene() {
  return (
    <div className={clsx(card, "p-3.5")}>
      <p className="text-[11px] font-semibold text-fg-muted">Next batch</p>
      <p className="mt-1 text-[15px] font-semibold tracking-tight">Mains Answer-Writing Batch</p>
      <p className="mt-0.5 text-[12px] text-fg-muted">Offered to students who completed Prelims Foundation</p>
      <div className="mt-3.5 flex items-center gap-2 rounded-lg bg-primary-tint px-3 py-2.5 text-[12px]">
        <Repeat2 aria-hidden className="h-4 w-4 text-primary" />
        <span className="font-semibold text-primary">Upsell to cohort</span>
        <span className="ml-auto flex items-center gap-1 text-fg-muted">
          <Users aria-hidden className="h-3.5 w-3.5" /> 36 eligible
        </span>
      </div>
      <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-fg-muted">
        <IndianRupee aria-hidden className="h-3 w-3" /> Same profile, same database — nothing re-typed
      </p>
    </div>
  );
}

export const SCENES: Record<StoryId, () => React.ReactNode> = {
  lead: LeadScene,
  enrol: EnrolScene,
  course: CourseScene,
  live: LiveScene,
  eval: () => <EvalScene />,
  pay: PayScene,
  cert: () => <CertScene />,
  renew: RenewScene,
};
