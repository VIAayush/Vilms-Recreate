import clsx from "clsx";
import { CalendarClock, Check, FileText } from "lucide-react";
import type { AreaId, ProductId } from "@/lib/content";
import { AssessScreen, BrandScreen, GrowScreen, PaymentsScreen, TeachScreen, TeamScreen } from "../screens/explorer";
import { LiveClassScreen } from "../screens/LiveClass";
import { Avatar, Pill } from "../screens/primitives";
import { CertScene, CourseScene, EvalScene, LeadScene, PayScene } from "../screens/scenes";

// Product mock-ups for cards, by id. Everything is sample data.

const card = "rounded-xl border border-edge bg-panel";

function WebinarVisual() {
  return (
    <div className="space-y-2.5">
      <div className={clsx(card, "p-3.5")}>
        <div className="flex items-center justify-between gap-2">
          <Pill tone="red">Free webinar</Pill>
          <span className="flex items-center gap-1 text-[11px] text-fg-muted">
            <CalendarClock aria-hidden className="h-3.5 w-3.5" /> Sat, 6 PM
          </span>
        </div>
        <p className="mt-2.5 text-[16px] font-semibold leading-snug">How to crack Prelims in 120 days</p>
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <span className="rounded-lg border border-edge bg-canvas-alt px-3 py-2 text-[12px] text-fg-faint">WhatsApp number</span>
          <span className="rounded-lg bg-navy px-3 py-2 text-[12px] font-semibold text-white dark:text-[rgb(12_18_26)]">Reserve seat</span>
        </div>
      </div>
      <div className={clsx(card, "flex items-center gap-3 p-3")}>
        <span className="flex -space-x-2">
          {["Asha R", "Vikram S", "Meera J", "Nikhil P"].map((n, i) => (
            <Avatar key={n} name={n} size="sm" tone={i} />
          ))}
        </span>
        <p className="text-[12px] text-fg-muted">
          <span className="font-semibold text-fg">214</span> registered
        </p>
        <Pill tone="green" className="ml-auto">
          Upsell on
        </Pill>
      </div>
    </div>
  );
}

function InvoiceVisual() {
  return (
    <div className={clsx(card, "p-4")}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-fg-muted">Tax invoice</p>
          <p className="font-mono text-[13px] font-medium">INV-2026-0418</p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-tint text-primary">
          <FileText aria-hidden className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 space-y-1.5 border-y border-edge py-3 text-[12px]">
        {[
          ["Prelims Foundation", "₹12,712"],
          ["CGST 9%", "₹1,144"],
          ["SGST 9%", "₹1,144"],
        ].map(([k, v]) => (
          <p key={k} className="flex justify-between">
            <span className="text-fg-muted">{k}</span>
            <span className="font-mono tabular-nums">{v}</span>
          </p>
        ))}
      </div>
      <p className="mt-2.5 flex items-center justify-between text-[14px] font-semibold">
        Total <span className="font-mono tabular-nums">₹15,000</span>
      </p>
      <Pill tone="green" className="mt-3">
        <Check aria-hidden className="h-3 w-3" /> Paid · emailed to student
      </Pill>
    </div>
  );
}

function MaterialsVisual() {
  const rows = [
    ["Polity notes — Part 1", "Public", "muted"],
    ["100 PYQs with solutions", "Lead magnet", "primary"],
    ["Mock test 4 — answer key", "Enrolled only", "green"],
    ["Current affairs · March", "Enrolled only", "green"],
  ] as const;
  return (
    <div className={clsx(card, "divide-y divide-edge")}>
      {rows.map(([t, a, tone]) => (
        <div key={t} className="flex items-center gap-3 px-3.5 py-3">
          <FileText aria-hidden className="h-4 w-4 shrink-0 text-fg-faint" />
          <p className="min-w-0 flex-1 truncate text-[12.5px] font-medium">{t}</p>
          <Pill tone={tone}>{a}</Pill>
        </div>
      ))}
    </div>
  );
}

function TeamVisual() {
  return <TeamScreen active={null} />;
}

export const PRODUCT_VISUALS: Record<ProductId, { w: number; h: number; node: () => React.ReactNode; pad?: boolean }> = {
  courses: { w: 400, h: 300, node: () => <CourseScene />, pad: true },
  live: { w: 640, h: 420, node: () => <LiveClassScreen /> },
  evaluation: { w: 400, h: 300, node: () => <EvalScene />, pad: true },
  crm: { w: 400, h: 300, node: () => <LeadScene />, pad: true },
  payments: { w: 400, h: 300, node: () => <PayScene />, pad: true },
  whitelabel: { w: 640, h: 440, node: () => <BrandScreen active={null} /> },
  tests: { w: 640, h: 440, node: () => <AssessScreen active={null} /> },
  webinars: { w: 400, h: 300, node: () => <WebinarVisual />, pad: true },
  landing: { w: 640, h: 440, node: () => <GrowScreen active={null} /> },
  invoices: { w: 400, h: 330, node: () => <InvoiceVisual />, pad: true },
  certificates: { w: 400, h: 300, node: () => <CertScene />, pad: true },
  materials: { w: 400, h: 280, node: () => <MaterialsVisual />, pad: true },
  team: { w: 640, h: 440, node: () => <TeamVisual /> },
};

export const AREA_VISUALS: Record<AreaId, () => React.ReactNode> = {
  teach: () => <TeachScreen active={null} />,
  assess: () => <AssessScreen active={null} />,
  grow: () => <GrowScreen active={null} />,
  payments: () => <PaymentsScreen active={null} />,
  brand: () => <BrandScreen active={null} />,
  manage: () => <TeamScreen active={null} />,
};

// The soft backdrop behind each area's visuals, from the logo palette.
export const AREA_BACKDROP: Record<AreaId, string> = {
  teach: "bg-[rgb(214_231_250)] dark:bg-[rgb(30_52_80)]",
  assess: "bg-[rgb(226_232_240)] dark:bg-[rgb(44_52_64)]",
  grow: "bg-[rgb(200_222_246)] dark:bg-[rgb(24_58_96)]",
  payments: "bg-[rgb(220_227_236)] dark:bg-[rgb(40_48_60)]",
  brand: "bg-[rgb(0_48_86)]",
  manage: "bg-[rgb(232_236_242)] dark:bg-[rgb(48_54_64)]",
};
