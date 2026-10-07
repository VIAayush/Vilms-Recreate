"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Avatar } from "@/components/marketing/screens/primitives";

// Small pieces shared by the hero loop, the story stage and the sign-off demo.

export function ScoreRing({ value, max = 20, size = 76, tone = "primary" }: { value: number; max?: number; size?: number; tone?: "primary" | "green" }) {
  const r = size * 0.4;
  const c = 2 * Math.PI * r;
  const sw = size * 0.08;
  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={sw} className="stroke-sunken" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(1, value / max))}
          className={clsx("transition-[stroke-dashoffset,stroke] duration-500", tone === "green" ? "stroke-green" : "stroke-primary")}
        />
      </svg>
      <span className="font-display font-semibold tabular-nums leading-none" style={{ fontSize: size * 0.26 }}>
        {value}
        <span className="text-fg-muted" style={{ fontSize: size * 0.15 }}>
          /{max}
        </span>
      </span>
    </span>
  );
}

/** A criterion row: label, bar, value. `from` shows a struck-through old value after a mentor edit. */
export function CriterionBar({
  label,
  value,
  max,
  from,
  tone = "primary",
  hidden,
  active,
  sub,
}: {
  label: string;
  value: number;
  max: number;
  from?: number;
  tone?: "primary" | "green" | "gold";
  hidden?: boolean;
  active?: boolean;
  sub?: React.ReactNode;
}) {
  return (
    <div className={clsx("rounded-lg px-2 py-1.5 transition duration-300", active && "bg-primary-tint ring-1 ring-primary/40")}>
      <div className="flex items-baseline justify-between gap-2 text-[12.5px]">
        <span className="font-medium">{label}</span>
        <span className="font-mono tabular-nums text-fg-muted">
          {hidden ? (
            "—"
          ) : (
            <>
              {from != null && from !== value ? <s className="mr-1.5 text-fg-faint">{from}</s> : null}
              <span className="text-fg">{value}</span>/{max}
            </>
          )}
        </span>
      </div>
      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-sunken">
        <span
          className={clsx("block h-full rounded-full transition-[width,background-color] duration-700 ease-out", tone === "green" ? "bg-green" : tone === "gold" ? "bg-gold" : "bg-primary")}
          style={{ width: hidden ? "0%" : `${(value / max) * 100}%` }}
        />
      </span>
      {sub ? <p className="mt-1 text-[10.5px] leading-snug text-fg-muted">{sub}</p> : null}
    </div>
  );
}

export function StatusBadge({ tone, children, icon }: { tone: "muted" | "primary" | "green" | "gold"; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300",
        tone === "muted" && "bg-sunken text-fg-muted",
        tone === "primary" && "bg-primary-tint text-primary",
        tone === "green" && "bg-green-tint text-green",
        tone === "gold" && "bg-sunken text-yellow-text ring-1 ring-inset ring-yellow/60",
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/** Mentor avatar + name used in the review panels. */
export function Mentor({ children }: { children?: React.ReactNode }) {
  return (
    <span className="flex min-w-0 items-center gap-2 text-[11.5px] text-fg-muted">
      <Avatar name="Meera Iyer" size="sm" tone={1} />
      <span className="truncate">{children ?? "Meera Iyer · mentor"}</span>
    </span>
  );
}

/** Approve / Edit buttons. Real buttons: hover lifts, press sinks. */
export function ReviewButtons({
  onEdit,
  onApprove,
  approved,
  pressed,
  disabled,
  decorative,
  className,
}: {
  /** part of a scripted illustration: not focusable, not announced */
  decorative?: boolean;
  onEdit?: () => void;
  onApprove?: () => void;
  approved?: boolean;
  /** show the pressed look (used by scripted stages) */
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={onEdit}
        tabIndex={decorative ? -1 : undefined}
        aria-hidden={decorative || undefined}
        disabled={disabled || approved}
        className="min-h-[34px] rounded-lg border border-edge-strong bg-panel px-3 text-[12px] font-semibold transition duration-200 hover:-translate-y-px hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-50"
      >
        Edit
      </button>
      <motion.button
        type="button"
        onClick={onApprove}
        tabIndex={decorative ? -1 : undefined}
        aria-hidden={decorative || undefined}
        disabled={disabled || approved}
        animate={pressed ? { scale: [1, 0.94, 1] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
        className={clsx(
          "inline-flex min-h-[34px] items-center gap-1.5 rounded-lg px-3.5 text-[12px] font-semibold transition duration-200 hover:-translate-y-px active:translate-y-px",
          approved ? "bg-green text-white shadow-none" : "bg-navy text-white hover:bg-primary",
          "disabled:pointer-events-none",
          disabled && !approved && "opacity-50",
        )}
      >
        {approved ? <Check aria-hidden className="h-3.5 w-3.5" /> : null}
        {approved ? "Approved" : "Approve"}
      </motion.button>
    </div>
  );
}
