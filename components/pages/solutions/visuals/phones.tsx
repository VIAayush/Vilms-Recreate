import { ClipboardCheck, Download, Layers, Play, Radio, Share2 } from "lucide-react";
import { Avatar, InstituteMark, LiveDot, Meter, Pill } from "@/components/marketing/screens/primitives";
import { CertScene } from "@/components/marketing/screens/scenes";
import { Bar } from "../kit";

// The learner's side: five phone screens at 280 x 560, one per page.

function Head({ org, sub, title }: { org: string; sub: string; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <InstituteMark name={org} className="h-8 w-8 text-[11px]" />
      <div>
        <p className="text-[11px] text-fg-muted">{sub}</p>
        <p className="text-[15px] font-semibold leading-tight">{title}</p>
      </div>
    </div>
  );
}

export function BatchPhone() {
  return (
    <div className="flex h-full w-full flex-col bg-canvas p-4 pt-6 text-[13px]">
      <Head org="Your Institute" sub="Your Institute" title="Hi Rahul" />
      <div className="mt-4 rounded-2xl border border-edge bg-panel p-3.5">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-red">
          <LiveDot /> Class today · 7:00 PM
        </p>
        <p className="mt-1.5 text-[16px] font-semibold leading-snug tracking-tight">Physics doubts</p>
        <p className="text-[11.5px] text-fg-muted">JEE Crash Course · Batch A</p>
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-3 rounded-2xl border border-edge bg-panel p-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-tint text-primary">
            <ClipboardCheck aria-hidden className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold">Mock test 4</p>
            <p className="text-[11px] text-fg-muted">Saturday</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-edge bg-panel p-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-tint text-primary">
            <Play aria-hidden className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-semibold">Continue · Lesson 3</p>
            <Bar value={0.41} className="mt-1.5" />
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-edge bg-panel p-3">
        <p className="text-[11px] font-semibold text-fg-muted">This week</p>
        {[
          ["Tue", "Organic basics", "Class"],
          ["Thu", "Physics doubts", "Class"],
          ["Fri", "Chapter quiz", "Test"],
        ].map(([d, t, k]) => (
          <p key={t} className="mt-1.5 flex items-center gap-2 text-[12px]">
            <span className="w-7 font-mono text-[10.5px] text-fg-muted">{d}</span>
            <span className="flex-1 truncate">{t}</span>
            <span className={k === "Class" ? "text-[10.5px] font-medium text-primary" : "text-[10.5px] font-medium text-yellow-text"}>{k}</span>
          </p>
        ))}
      </div>
      <div className="mt-auto rounded-2xl bg-primary-tint px-3.5 py-3 text-[12px] font-semibold text-primary">Course progress · 62%</div>
    </div>
  );
}

export function TestsPhone() {
  const past = [
    ["Mock 6", 121],
    ["Mock 7", 130],
    ["Mock 8", 138],
  ] as const;
  return (
    <div className="flex h-full w-full flex-col bg-canvas p-4 pt-6 text-[13px]">
      <Head org="Your Institute" sub="Prelims Test Series" title="My tests" />
      <div className="mt-4 rounded-2xl border border-edge bg-panel p-4 text-center">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-muted">Latest · Mock 8</p>
        <p className="mt-1 font-display text-[44px] font-semibold leading-none tabular-nums tracking-tight">
          138<span className="text-[16px] font-normal text-fg-muted">/200</span>
        </p>
        <div className="mt-2.5 flex justify-center">
          <Pill tone="green">Result ready</Pill>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-edge bg-panel p-3">
        <p className="text-[11px] font-semibold text-fg-muted">Score history</p>
        <div className="mt-2 space-y-1.5">
          {past.map(([t, v]) => (
            <div key={t} className="flex items-center gap-2 text-[11.5px]">
              <span className="w-12 text-fg-muted">{t}</span>
              <Bar value={(v - 60) / 100} className="flex-1" />
              <span className="w-8 text-right font-mono tabular-nums">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          ["Mock test 9", "Practice exam", "Open"],
          ["Weekly quiz 7", "Quiz", "Open"],
        ].map(([t, k, s]) => (
          <div key={t} className="flex items-center gap-2.5 rounded-2xl border border-edge bg-panel px-3 py-2.5">
            <ClipboardCheck aria-hidden className="h-4 w-4 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-semibold">{t}</span>
              <span className="block text-[10.5px] text-fg-muted">{k}</span>
            </span>
            <Pill tone="primary">{s}</Pill>
          </div>
        ))}
      </div>
      <span className="mt-auto rounded-full bg-primary py-2.5 text-center text-[12.5px] font-semibold text-primary-ink">Start mock test</span>
    </div>
  );
}

export function CoursePhone() {
  return (
    <div className="flex h-full w-full flex-col bg-canvas text-[13px]">
      <div className="relative grid aspect-[16/10] place-items-center bg-[rgb(27_32_38)]">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[rgb(27_32_38)]">
          <Play aria-hidden className="ml-0.5 h-5 w-5" fill="currentColor" />
        </span>
        <span className="absolute left-3 top-8 text-[11px] font-semibold text-white/90">Lesson 3 · Fundamentals</span>
        <span className="absolute inset-x-3 bottom-2.5 h-1 rounded-full bg-white/25">
          <span className="block h-full w-[41%] rounded-full bg-[rgb(106_170_222)]" />
        </span>
      </div>
      <div className="flex-1 p-4">
        <p className="text-[15px] font-semibold leading-snug tracking-tight">Foundation Course</p>
        <p className="text-[11.5px] text-fg-muted">Your Academy</p>
        <ul className="mt-3 space-y-1.5">
          {[
            ["01", "Introduction", "Done", "green"],
            ["02", "Core concepts", "Done", "green"],
            ["03", "Fundamentals", "In progress", "primary"],
            ["04", "Module quiz", "To do", "muted"],
          ].map(([n, t, s, tone]) => (
            <li key={n} className="flex items-center gap-2.5 rounded-xl border border-edge bg-panel px-2.5 py-2.5">
              <span className="font-mono text-[10.5px] text-fg-faint">{n}</span>
              <span className="min-w-0 flex-1 truncate text-[12px] font-semibold">{t}</span>
              <Pill tone={tone as "green" | "primary" | "muted"}>{s}</Pill>
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-xl bg-canvas-alt px-3 py-2.5">
          <Meter label="Progress" value={2} max={4} />
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-edge py-2.5 text-center text-[10px] text-fg-muted">
        {["Lessons", "Tests", "Progress"].map((t, i) => (
          <span key={t} className={i === 0 ? "font-semibold text-primary" : ""}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CertificatePhone() {
  return (
    <div className="flex h-full w-full flex-col bg-canvas p-4 pt-6 text-[13px]">
      <Head org="Your Training Institute" sub="Your Training Institute" title="My learning" />
      <div className="mt-4">
        <CertScene name="Your Training Institute" />
      </div>
      <div className="mt-3 flex gap-2">
        <span className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-[12.5px] font-semibold text-primary-ink">
          <Download aria-hidden className="h-3.5 w-3.5" /> Download
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-edge">
          <Share2 aria-hidden className="h-4 w-4 text-fg-muted" />
        </span>
      </div>
      <div className="mt-4 rounded-2xl border border-edge bg-panel p-3">
        <p className="text-[11px] font-semibold text-fg-muted">Sales Fundamentals</p>
        <div className="mt-2 space-y-1.5">
          <Meter label="Lessons" value={24} max={24} tone="green" />
          <Meter label="Quizzes" value={4} max={4} tone="green" />
          <Meter label="Assignment" value={1} max={1} tone="green" />
        </div>
      </div>
      <p className="mt-auto flex items-center gap-1.5 pt-3 text-[11px] text-fg-muted">
        <Layers aria-hidden className="h-3.5 w-3.5" /> Next programme · Advanced Excel
      </p>
    </div>
  );
}

export function SubjectsPhone() {
  const subjects = [
    ["Science", 64, "Chapter 5 · Force"],
    ["Mathematics", 48, "Algebra · Quiz 2"],
    ["English", 81, "Reading notes"],
  ] as const;
  return (
    <div className="flex h-full w-full flex-col bg-canvas p-4 pt-6 text-[13px]">
      <Head org="Your School" sub="Class 9" title="My subjects" />
      <ul className="mt-4 space-y-2">
        {subjects.map(([s, p, n]) => (
          <li key={s} className="rounded-2xl border border-edge bg-panel p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13px] font-semibold">{s}</p>
              <span className="font-mono text-[11px] tabular-nums text-fg-muted">{p}%</span>
            </div>
            <Bar value={p / 100} className="mt-2" />
            <p className="mt-1.5 text-[11px] text-fg-muted">Next: {n}</p>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-2xl border border-edge bg-panel p-3">
        <p className="text-[11px] font-semibold text-fg-muted">Learning materials</p>
        {["Force and motion · video", "Chapter notes · PDF", "Revision slides"].map((t) => (
          <p key={t} className="mt-1.5 flex items-center gap-2 text-[12px]">
            <Radio aria-hidden className="h-3 w-3 text-primary" />
            <span className="truncate">{t}</span>
          </p>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2.5 rounded-2xl bg-primary-tint px-3.5 py-3 text-[12px]">
        <Avatar name="Rahul Kumar" size="sm" tone={0} />
        <span className="font-semibold text-primary">Assessment due Friday</span>
      </div>
    </div>
  );
}
