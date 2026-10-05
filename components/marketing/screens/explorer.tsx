import clsx from "clsx";
import {
  BarChart3,
  Check,
  ChevronRight,
  Download,
  FileText,
  GripVertical,
  Globe,
  ImageIcon,
  Lock,
  Mail,
  MessageCircle,
  Play,
  Radio,
  RotateCcw,
  Smartphone,
  Sparkles,
  Upload,
  Video,
} from "lucide-react";
import type { ExplorerTabId } from "@/lib/content";
import { Avatar, InstituteMark, Meter, Pill } from "./primitives";

// The product explorer's screens. Each region a feature refers to carries
// data-spot="<feature id>"; the explorer marks the hovered one with
// data-on="true" and dims the rest (styles in site.css).

type ScreenProps = { active: string | null };
const spot = (id: string, active: string | null) => ({ "data-spot": id, "data-on": active === id ? "true" : "false" });
const box = "rounded-xl border border-edge/10 bg-panel";

function TeachScreen({ active }: ScreenProps) {
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-[1.35fr_1fr] sm:p-4">
      <div className={clsx(box, "p-3")} {...spot("courses", active)}>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10.5px] text-fg-muted">Course builder</p>
            <p className="truncate text-[14px] font-semibold">Prelims Foundation Batch</p>
          </div>
          <div className="flex shrink-0 rounded-lg bg-canvas p-0.5 text-[10.5px] font-medium">
            {["Recorded", "Live", "Hybrid"].map((f, i) => (
              <span key={f} className={clsx("rounded-md px-2 py-1", i === 2 ? "bg-panel text-fg shadow-sm" : "text-fg-muted")}>
                {f}
              </span>
            ))}
          </div>
        </div>
        <ul className="mt-3 space-y-1.5 text-[12px]">
          <li className="flex items-center gap-2 rounded-lg bg-canvas/70 px-2 py-2">
            <GripVertical aria-hidden className="h-3.5 w-3.5 text-fg-faint" />
            Orientation &amp; study plan
            <Pill className="ml-auto">Preview</Pill>
          </li>
          <li className="flex items-center gap-2 rounded-lg bg-canvas/70 px-2 py-2" {...spot("video", active)}>
            <GripVertical aria-hidden className="h-3.5 w-3.5 text-fg-faint" />
            <Video aria-hidden className="h-3.5 w-3.5 text-primary" />
            Polity essentials
            <span className="ml-auto text-[10.5px] text-fg-muted">Recorded · 12 lessons</span>
          </li>
          <li className="flex items-center gap-2 rounded-lg bg-canvas/70 px-2 py-2" {...spot("live", active)}>
            <GripVertical aria-hidden className="h-3.5 w-3.5 text-fg-faint" />
            <Radio aria-hidden className="h-3.5 w-3.5 text-rose" />
            Weekly doubt-clearing
            <span className="ml-auto text-[10.5px] text-fg-muted">Live · Thu 7 PM</span>
          </li>
          <li className="flex items-center gap-2 rounded-lg bg-canvas/70 px-2 py-2">
            <GripVertical aria-hidden className="h-3.5 w-3.5 text-fg-faint" />
            Mock test 1 — answer writing
            <Pill tone="accent" className="ml-auto">
              Coming soon
            </Pill>
          </li>
        </ul>
        <p className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-dashed border-edge/15 px-2 py-1.5 text-[11px] text-fg-muted" {...spot("materials", active)}>
          <FileText aria-hidden className="h-3.5 w-3.5" /> Notes.pdf · Worksheet 1.pdf attached to lesson 2
        </p>
      </div>

      <div className="grid gap-3">
        <div className={clsx(box, "overflow-hidden")} {...spot("video", active)}>
          <div className="relative grid aspect-[16/9] place-items-center bg-[linear-gradient(135deg,rgb(var(--primary)/0.9),rgb(var(--cyan)/0.8))]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[rgb(22_20_31)]">
              <Play aria-hidden className="ml-0.5 h-4 w-4" fill="currentColor" />
            </span>
            <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/40 px-1.5 py-0.5 text-[9.5px] text-white">
              <Lock aria-hidden className="h-2.5 w-2.5" /> Rahul K. · 98xxx
            </span>
          </div>
          <p className="px-3 py-2 text-[11px] text-fg-muted">Plays inside the course · watermarked</p>
        </div>
        <div className={clsx(box, "p-3")} {...spot("webinars", active)}>
          <p className="text-[10.5px] text-fg-muted">Free masterclass · Sun 6 PM</p>
          <p className="mt-0.5 text-[12.5px] font-semibold leading-snug">How to plan your first 90 days of prep</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex-1 rounded-md border border-edge/10 px-2 py-1 text-[10.5px] text-fg-faint">Name, phone, email</span>
            <span className="rounded-md bg-primary px-2 py-1 text-[10.5px] font-semibold text-primary-ink">Register</span>
          </div>
          <p className="mt-2 text-[10.5px] text-fg-muted">No login · one-click upsell to the paid batch</p>
        </div>
      </div>
    </div>
  );
}

function AssessScreen({ active }: ScreenProps) {
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-[0.9fr_1.2fr] sm:p-4">
      <div className={clsx(box, "p-3")} {...spot("tests", active)}>
        <p className="text-[10.5px] text-fg-muted">Tests</p>
        <ul className="mt-2 space-y-1.5 text-[12px]">
          {[
            ["Mock test 4", "MCQ · auto-graded", "mint", "Results out"],
            ["Mains Q3", "Long-form · 20 marks", "primary", "To evaluate"],
            ["Weekly quiz 6", "MCQ · auto-graded", "muted", "Thu"],
          ].map(([t, m, tone, s]) => (
            <li key={t} className="rounded-lg bg-canvas/70 px-2.5 py-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{t}</span>
                <Pill tone={tone as "mint" | "primary" | "muted"}>{s}</Pill>
              </div>
              <p className="text-[10.5px] text-fg-muted">{m}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-3">
        <div className={clsx(box, "relative overflow-hidden p-2.5")} {...spot("handwritten", active)}>
          <div className="flex items-center justify-between px-0.5 pb-2">
            <p className="text-[10.5px] text-fg-muted">Rahul K. · Q3 · page 1 of 2</p>
            <Upload aria-hidden className="h-3.5 w-3.5 text-fg-muted" />
          </div>
          <div className="rounded-lg bg-[#fbf8ef] px-3 py-2 font-hand text-[14px] leading-[19px] text-[#2b2a6b] [background-image:repeating-linear-gradient(transparent,transparent_18px,rgb(43_42_107/0.12)_18px,rgb(43_42_107/0.12)_19px)]">
            <p>The Directive Principles guide the state</p>
            <p>
              in making <span className="rounded bg-[#ffd76a]/60">laws</span> for social welfare — Art. 38
            </p>
            <p>directs it to secure a social order…</p>
          </div>
        </div>
        <div className={clsx(box, "space-y-1.5 p-3")} {...spot("rubrics", active)}>
          <div className="flex items-center justify-between">
            <p className="text-[11.5px] font-semibold">Rubric</p>
            <span {...spot("ai", active)} className="rounded-full">
              <Pill tone="primary">
                <Sparkles aria-hidden className="h-3 w-3" /> AI draft · mentor approves
              </Pill>
            </span>
          </div>
          <Meter label="Content" value={6} max={8} />
          <Meter label="Structure" value={3} max={4} />
          <Meter label="Examples" value={3} max={4} />
          <Meter label="Language" value={3} max={4} />
        </div>
      </div>
    </div>
  );
}

function GrowScreen({ active }: ScreenProps) {
  const cols = [
    { t: "New", n: ["Rahul K.", "Sneha P."] },
    { t: "RSVP", n: ["Aman V."] },
    { t: "Checkout", n: ["Isha M."] },
    { t: "Enrolled", n: ["Karan S.", "Divya R."] },
  ];
  return (
    <div className="grid gap-3 p-3 sm:p-4">
      <div className={clsx(box, "p-3")} {...spot("leads", active)}>
        <p className="text-[10.5px] text-fg-muted">Lead pipeline · ads, webinars, free PDFs</p>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {cols.map((c) => (
            <div key={c.t} className="min-w-0 rounded-lg bg-canvas/70 p-1.5">
              <p className="mb-1.5 truncate px-0.5 text-[10px] font-semibold text-fg-muted">{c.t}</p>
              <div className="space-y-1">
                {c.n.map((n) => (
                  <div key={n} className="flex items-center gap-1.5 rounded-md bg-panel px-1.5 py-1 text-[10.5px] shadow-sm">
                    <Avatar name={n} size="sm" />
                    <span className="truncate">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className={clsx(box, "p-3")} {...spot("crm", active)}>
          <div className="flex items-center gap-2.5">
            <Avatar name="Rahul Kumar" tone={0} />
            <div className="min-w-0">
              <p className="text-[12.5px] font-semibold">Rahul Kumar</p>
              <p className="truncate text-[10.5px] text-fg-muted">Prelims Foundation · Batch A · Jaipur</p>
            </div>
          </div>
          <dl className="mt-2.5 grid grid-cols-3 gap-1 text-center text-[10px]">
            {[
              ["Grades", "4 tests"],
              ["Orders", "2"],
              ["Lifetime", "₹15,000"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md bg-canvas/70 py-1.5">
                <dt className="text-fg-muted">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-3">
          <div className={clsx(box, "flex items-start gap-2 p-2.5")} {...spot("whatsapp", active)}>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint/15 text-mint">
              <MessageCircle aria-hidden className="h-3.5 w-3.5" />
            </span>
            <p className="text-[11px] leading-snug">
              <b>Follow-up sent to Aman V.</b>
              <span className="block text-fg-muted">via your Wati account</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className={clsx(box, "p-2.5")} {...spot("landing", active)}>
              <Globe aria-hidden className="h-3.5 w-3.5 text-primary" />
              <p className="mt-1 text-[10.5px] font-semibold leading-tight">JEE crash course page</p>
            </div>
            <div className={clsx(box, "p-2.5")} {...spot("analytics", active)}>
              <BarChart3 aria-hidden className="h-3.5 w-3.5 text-cyan" />
              <p className="mt-1 text-[10.5px] font-semibold leading-tight">Your pixel · CSV export</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentsScreen({ active }: ScreenProps) {
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-[1fr_1.1fr] sm:p-4">
      <div className={clsx(box, "p-3")} {...spot("razorpay", active)}>
        <p className="text-[10.5px] text-fg-muted">Checkout · your site</p>
        <p className="mt-1 text-[13px] font-semibold">Prelims Foundation Batch</p>
        <p className="font-display text-[26px] font-semibold tracking-tight">₹15,000</p>
        <div className="mt-2 space-y-1.5 text-[11.5px]">
          <div className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-2 font-semibold text-primary">
            <span className="h-3 w-3 rounded-full border-[3px] border-primary" /> Razorpay · cards, netbanking
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-edge/10 px-2.5 py-2" {...spot("upi", active)}>
            <span className="h-3 w-3 rounded-full border border-edge/30" /> UPI / bank transfer
          </div>
        </div>
        <p className="mt-2.5 text-center text-[10px] text-fg-muted">Settles in your Razorpay account</p>
      </div>
      <div className="grid gap-3">
        <div className={clsx(box, "p-3")} {...spot("orders", active)}>
          <p className="mb-1.5 text-[10.5px] text-fg-muted">Orders</p>
          <ul className="divide-y divide-edge/10 text-[11.5px]">
            {[
              ["#2041", "Rahul K.", "₹15,000", "Paid"],
              ["#2040", "Sneha P.", "₹9,000", "Paid"],
            ].map(([id, n, amt, s]) => (
              <li key={id} className="flex items-center gap-2 py-1.5">
                <span className="font-mono text-[10.5px] text-fg-muted">{id}</span>
                <span className="truncate">{n}</span>
                <span className="ml-auto font-semibold tabular-nums">{amt}</span>
                <Pill tone="mint">{s}</Pill>
              </li>
            ))}
            <li className="flex items-center gap-2 py-1.5" {...spot("refunds", active)}>
              <span className="font-mono text-[10.5px] text-fg-muted">#2033</span>
              <span className="truncate">Arjun T.</span>
              <span className="ml-auto font-semibold tabular-nums">₹4,500</span>
              <Pill tone="accent">
                <RotateCcw aria-hidden className="h-2.5 w-2.5" /> Refunded
              </Pill>
            </li>
          </ul>
        </div>
        <div className={clsx(box, "flex items-center gap-2.5 p-3")} {...spot("gst", active)}>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-canvas text-fg-muted">
            <FileText aria-hidden className="h-4 w-4" />
          </span>
          <div className="min-w-0 text-[11px]">
            <p className="font-semibold">GST invoice INV-2041</p>
            <p className="truncate text-fg-muted">Issued by Your Institute · emailed</p>
          </div>
          <Download aria-hidden className="ml-auto h-3.5 w-3.5 text-fg-muted" />
        </div>
      </div>
    </div>
  );
}

function BrandScreen({ active }: ScreenProps) {
  const swatches = ["#5B3DF5", "#0EA5E9", "#0F9F6E", "#E11D48", "#F08A00"];
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-[1fr_1fr] sm:p-4">
      <div className={clsx(box, "space-y-3 p-3")}>
        <p className="text-[10.5px] text-fg-muted">Settings · Branding</p>
        <div className="flex items-center gap-2.5" {...spot("logo", active)}>
          <InstituteMark className="h-9 w-9 text-[12px]" />
          <div className="text-[11px]">
            <p className="font-semibold">logo.png</p>
            <p className="flex items-center gap-1 text-fg-muted">
              <ImageIcon aria-hidden className="h-3 w-3" /> Replace
            </p>
          </div>
        </div>
        <div {...spot("colours", active)} className="rounded-lg">
          <p className="text-[10.5px] text-fg-muted">Brand colour</p>
          <div className="mt-1.5 flex gap-1.5">
            {swatches.map((c, i) => (
              <span key={c} className={clsx("h-5 w-5 rounded-full", i === 0 && "ring-2 ring-offset-2 ring-offset-[rgb(var(--surface))]")} style={{ background: c, ["--tw-ring-color" as string]: c }} />
            ))}
          </div>
        </div>
        <div {...spot("domain", active)} className="rounded-lg">
          <p className="text-[10.5px] text-fg-muted">Domain</p>
          <p className="mt-1 flex items-center gap-1.5 rounded-md border border-edge/10 px-2 py-1.5 font-mono text-[10.5px]">
            <span className="text-fg-faint line-through">yourinstitute.vilms.in</span>
            <ChevronRight aria-hidden className="h-3 w-3 text-fg-faint" />
            learn.yourinstitute.in
          </p>
        </div>
      </div>
      <div className="grid gap-3">
        <div className={clsx(box, "p-3 text-center")} {...spot("certificates", active)}>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-fg-muted">Certificate of completion</p>
          <p className="mt-1 font-serif text-[20px] italic leading-none">Rahul Kumar</p>
          <p className="mt-1 text-[10px] text-fg-muted">Issued by Your Institute</p>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div className={clsx(box, "p-2.5")} {...spot("emails", active)}>
            <p className="flex items-center gap-1 text-[10px] text-fg-muted">
              <Mail aria-hidden className="h-3 w-3" /> From: Your Institute
            </p>
            <p className="mt-1 text-[11px] font-semibold leading-tight">Your class starts in 10 minutes</p>
          </div>
          <div className={clsx(box, "grid w-[64px] place-items-center p-2")} {...spot("apps", active)}>
            <Smartphone aria-hidden className="h-4 w-4 text-fg-muted" />
            <InstituteMark className="mt-1 h-6 w-6 text-[9px]" />
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-[10.5px] text-fg-muted">
          <Check aria-hidden className="h-3 w-3 text-mint" /> No “VILMS” anywhere students look
        </p>
      </div>
    </div>
  );
}

export const EXPLORER_SCREENS: Record<ExplorerTabId, { url: string; Screen: (p: ScreenProps) => React.ReactNode }> = {
  teach: { url: "yourinstitute.vilms.in/admin/courses", Screen: TeachScreen },
  assess: { url: "yourinstitute.vilms.in/admin/evaluations", Screen: AssessScreen },
  grow: { url: "yourinstitute.vilms.in/admin/leads", Screen: GrowScreen },
  payments: { url: "yourinstitute.vilms.in/admin/payments", Screen: PaymentsScreen },
  brand: { url: "yourinstitute.vilms.in/admin/settings/branding", Screen: BrandScreen },
};

