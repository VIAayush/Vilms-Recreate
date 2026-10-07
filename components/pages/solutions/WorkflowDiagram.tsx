"use client";

import { useRef } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { SOLUTION_ICONS } from "./icons";
import type { WorkflowStep } from "./types";

/**
 * The workflow as a diagram that draws itself. A highlight walks the steps
 * while the diagram is on screen (and rests on the last step under reduced
 * motion); any step can be clicked. Three desktop shapes — a rail, a stair
 * and a loop — and one shared vertical timeline for phones.
 */
export function WorkflowDiagram({ steps, variant }: { steps: WorkflowStep[]; variant: "rail" | "loop" | "stairs" | "zigzag" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [auto, select] = useAutoplay(steps.length, { interval: 2700, running: inView && !reduced });
  const active = reduced ? steps.length - 1 : auto;
  const shared = { steps, active, select };

  return (
    <div ref={ref}>
      <div className="lg:hidden">
        <VerticalFlow {...shared} />
      </div>
      <div className="hidden lg:block">
        {variant === "rail" ? (
          <RailFlow {...shared} />
        ) : variant === "stairs" ? (
          <StairsFlow {...shared} />
        ) : variant === "zigzag" ? (
          <ZigzagFlow {...shared} />
        ) : (
          <LoopFlow {...shared} />
        )}
      </div>
    </div>
  );
}

type FlowProps = { steps: WorkflowStep[]; active: number; select: (i: number) => void };

/* ---------- pieces ---------- */

function NodeButton({ step, i, active, select, size = "lg" }: { step: WorkflowStep; i: number; active: number; select: (i: number) => void; size?: "md" | "lg" }) {
  const Icon = SOLUTION_ICONS[step.icon];
  const done = i < active;
  const on = i === active;
  return (
    <button
      type="button"
      onClick={() => select(i)}
      aria-label={`Step ${i + 1}: ${step.title}`}
      aria-current={on ? "step" : undefined}
      className={clsx(
        "group relative grid shrink-0 place-items-center rounded-full border-2 transition duration-500 hover:scale-105",
        size === "lg" ? "h-14 w-14" : "h-11 w-11",
        on && "scale-110 border-primary bg-primary text-primary-ink shadow-[0_0_0_8px_rgb(var(--primary)/0.18)]",
        done && "border-primary bg-primary-tint text-primary",
        !on && !done && "border-edge-strong bg-panel text-fg-faint hover:border-primary hover:text-primary",
      )}
    >
      <Icon aria-hidden className={size === "lg" ? "h-5 w-5" : "h-[18px] w-[18px]"} />
      {done ? (
        <span aria-hidden className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-green text-[rgb(3_24_46)]">
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      ) : null}
    </button>
  );
}

function Chip({ children, state }: { children: React.ReactNode; state: "done" | "on" | "todo" }) {
  return (
    <span
      className={clsx(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] transition duration-500",
        state === "on" && "border-primary bg-primary-tint text-primary",
        state === "done" && "border-edge-strong text-fg-muted",
        state === "todo" && "border-edge text-fg-faint opacity-60",
      )}
    >
      {children}
    </span>
  );
}

/** A line that fills along its own axis when `on`. `reverse` fills from the far end (bottom / right). */
function Seg({
  on,
  axis = "x",
  delay = 0,
  reverse = false,
  className,
  style,
}: {
  on: boolean;
  axis?: "x" | "y";
  delay?: number;
  reverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const origin = axis === "x" ? (reverse ? "origin-right" : "origin-left") : reverse ? "origin-bottom" : "origin-top";
  return (
    <span aria-hidden className={clsx("absolute overflow-hidden rounded-full bg-edge-strong/70", axis === "x" ? "h-0.5" : "w-0.5", className)} style={style}>
      <span
        className={clsx("block h-full w-full bg-primary transition-transform ease-out", origin)}
        style={{
          transform: axis === "x" ? `scaleX(${on ? 1 : 0})` : `scaleY(${on ? 1 : 0})`,
          transitionDuration: on ? "600ms" : "250ms",
          transitionDelay: on ? `${delay}ms` : "0ms",
        }}
      />
    </span>
  );
}

const stateOf = (i: number, active: number) => (i < active ? "done" : i === active ? "on" : "todo");

/* ---------- vertical (phones, tablets) ---------- */

function VerticalFlow({ steps, active, select }: FlowProps) {
  return (
    <ol>
      {steps.map((s, i) => {
        const st = stateOf(i, active);
        return (
          <li key={s.title} className="relative flex gap-4 pb-8 last:pb-0">
            {i < steps.length - 1 ? <Seg on={i < active} axis="y" className="bottom-0 left-[21px] top-11" /> : null}
            <NodeButton step={s} i={i} active={active} select={select} size="md" />
            <div className="min-w-0 pt-1.5">
              <p className={clsx("text-[18px] font-medium tracking-[-0.01em] transition-colors duration-500", st === "todo" ? "text-fg-muted" : "text-fg")}>{s.title}</p>
              {s.text ? <p className={clsx("mt-1 text-[14.5px] leading-relaxed transition-colors duration-500", st === "todo" ? "text-fg-faint" : "text-fg-muted")}>{s.text}</p> : null}
              {s.chip ? (
                <div className="mt-2.5">
                  <Chip state={st}>{s.chip}</Chip>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- rail ---------- */

function RailFlow({ steps, active, select }: FlowProps) {
  return (
    <ol className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((s, i) => {
        const st = stateOf(i, active);
        return (
          <li key={s.title} className="relative px-2.5 xl:px-3">
            {i < steps.length - 1 ? <Seg on={i < active} className="left-1/2 top-[27px] w-full" /> : null}
            <div className="relative flex justify-center">
              <NodeButton step={s} i={i} active={active} select={select} />
            </div>
            <div className="mt-6">
              <p className="font-mono text-[11px] tabular-nums text-fg-faint">{String(i + 1).padStart(2, "0")}</p>
              <p className={clsx("mt-1 font-medium leading-snug tracking-[-0.01em] transition-colors duration-500", steps.length > 6 ? "text-[16px]" : "text-[18px]", st === "todo" ? "text-fg-muted" : "text-fg")}>{s.title}</p>
              {s.text ? <p className={clsx("mt-2 text-[14px] leading-relaxed transition-colors duration-500", st === "todo" ? "text-fg-faint" : "text-fg-muted")}>{s.text}</p> : null}
              {s.chip ? (
                <div className="mt-3">
                  <Chip state={st}>{s.chip}</Chip>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- stairs ---------- */

function StairsFlow({ steps, active, select }: FlowProps) {
  const rise = 52;
  const n = steps.length;
  return (
    <ol className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
      {steps.map((s, i) => {
        const st = stateOf(i, active);
        const cy = (n - 1 - i) * rise + 28; // this node's centre, from the top of the column
        const from = i - 1 < active; // the tread and riser arriving here are lit
        return (
          <li key={s.title} className="relative px-2.5 xl:px-3" style={{ paddingTop: (n - 1 - i) * rise }}>
            {/* tread running on to the next, higher step */}
            {i < n - 1 ? <Seg on={i < active} className="left-1/2 right-0" style={{ top: cy - 1 }} /> : null}
            {/* the step below's tread arrives, then the riser lifts to this node */}
            {i > 0 ? (
              <>
                <Seg on={from} className="left-0 w-1/2" delay={600} style={{ top: cy + rise - 1 }} />
                <Seg on={from} axis="y" reverse className="left-1/2 -translate-x-1/2" delay={1200} style={{ top: cy, height: rise }} />
              </>
            ) : null}
            <div className="relative flex justify-center">
              <NodeButton step={s} i={i} active={active} select={select} />
            </div>
            <div className="mt-6">
              <p className="font-mono text-[11px] tabular-nums text-fg-faint">{String(i + 1).padStart(2, "0")}</p>
              <p className={clsx("mt-1 font-medium leading-snug tracking-[-0.01em] transition-colors duration-500", steps.length > 6 ? "text-[16px]" : "text-[18px]", st === "todo" ? "text-fg-muted" : "text-fg")}>{s.title}</p>
              {s.text ? <p className={clsx("mt-2 text-[14px] leading-relaxed transition-colors duration-500", st === "todo" ? "text-fg-faint" : "text-fg-muted")}>{s.text}</p> : null}
              {s.chip ? (
                <div className="mt-3">
                  <Chip state={st}>{s.chip}</Chip>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- zigzag ---------- */

function ZigzagFlow({ steps, active, select }: FlowProps) {
  return (
    <ol className="mx-auto max-w-[920px]">
      {steps.map((s, i) => {
        const st = stateOf(i, active);
        const left = i % 2 === 0;
        return (
          <li key={s.title} className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-x-10 pb-12 last:pb-0">
            {i < steps.length - 1 ? <Seg on={i < active} axis="y" className="left-1/2 -bottom-7 top-7 -translate-x-1/2" /> : null}
            <div className={clsx("row-start-1 min-w-0 pt-1", left ? "col-start-1 text-right" : "col-start-3 text-left")}>
              <p className="font-mono text-[11px] tabular-nums text-fg-faint">{String(i + 1).padStart(2, "0")}</p>
              <p className={clsx("mt-1 text-[22px] font-medium leading-snug tracking-[-0.02em] transition-colors duration-500", st === "todo" ? "text-fg-muted" : "text-fg")}>{s.title}</p>
              {s.text ? <p className={clsx("mt-1.5 text-[15px] leading-relaxed transition-colors duration-500", st === "todo" ? "text-fg-faint" : "text-fg-muted")}>{s.text}</p> : null}
              {s.chip ? (
                <div className="mt-3">
                  <Chip state={st}>{s.chip}</Chip>
                </div>
              ) : null}
            </div>
            <div className="relative z-10 col-start-2 row-start-1">
              <NodeButton step={s} i={i} active={active} select={select} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- loop ---------- */

function LoopFlow({ steps, active, select }: FlowProps) {
  const n = steps.length;
  const R = 170;
  const C = 220;
  const pos = (i: number) => {
    const a = (-90 + (i * 360) / n) * (Math.PI / 180);
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  };
  const frac = active / n;
  const cur = steps[active];
  const CurIcon = SOLUTION_ICONS[cur.icon];

  return (
    <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
      <ol>
        {steps.map((s, i) => {
          const st = stateOf(i, active);
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={i === active ? "step" : undefined}
                className={clsx(
                  "flex w-full gap-5 border-l-2 py-3.5 pl-6 text-left transition-colors duration-500",
                  i === active ? "border-primary" : i < active ? "border-edge-strong" : "border-edge hover:border-edge-strong",
                )}
              >
                <span className={clsx("pt-1 font-mono text-[12px] tabular-nums transition-colors", i === active ? "text-primary" : "text-fg-faint")}>{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className={clsx("block text-[20px] font-medium tracking-[-0.01em] transition-colors duration-500", st === "todo" ? "text-fg-muted" : "text-fg")}>{s.title}</span>
                  {s.text ? <span className={clsx("mt-1 block text-[14.5px] leading-relaxed transition-colors duration-500", i === active ? "text-fg-muted" : "text-fg-faint")}>{s.text}</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        <svg viewBox="0 0 440 440" aria-hidden className="absolute inset-0 h-full w-full">
          <circle cx={C} cy={C} r={R} fill="none" className="stroke-edge-strong" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
          <motion.circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            className="stroke-primary"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{ rotate: -90, transformOrigin: "220px 220px" }}
            initial={false}
            animate={{ strokeDashoffset: 1 - Math.max(0.002, frac) }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        {steps.map((s, i) => {
          const p = pos(i);
          return (
            <div key={s.title} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(p.x / 440) * 100}%`, top: `${(p.y / 440) * 100}%` }}>
              <NodeButton step={s} i={i} active={active} select={select} />
            </div>
          );
        })}
        <div className="absolute inset-[22%] grid place-items-center text-center">
          <div key={active} className="animate-pop-in">
            <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-primary-tint text-primary">
              <CurIcon aria-hidden className="h-5 w-5" />
            </span>
            <p className="mt-3 text-[20px] font-medium leading-tight tracking-[-0.02em]">{cur.title}</p>
            {cur.text ? <p className="mt-2 text-[13px] leading-snug text-fg-muted">{cur.text}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
