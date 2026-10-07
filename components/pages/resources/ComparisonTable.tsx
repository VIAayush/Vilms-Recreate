"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, CircleDot, PenLine } from "lucide-react";
import { EASE } from "@/components/site-ui/motion-tokens";
import { APPROACHES, GROUPS, ROWS, type Approach, type Cell, type Signal } from "./comparison-data";

const SIGNAL: Record<Signal, { icon: typeof Check; label: string; tone: string }> = {
  yes: { icon: Check, label: "Typically built in", tone: "bg-green-tint text-green" },
  varies: { icon: CircleDot, label: "Varies, so check", tone: "bg-sunken text-gold-text" },
  manual: { icon: PenLine, label: "Usually extra or by hand", tone: "bg-sunken text-fg-faint" },
};

function Mark({ signal }: { signal: Signal }) {
  const s = SIGNAL[signal];
  const Icon = s.icon;
  return (
    <span className={clsx("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", s.tone)}>
      <Icon aria-hidden className="h-3 w-3" strokeWidth={signal === "yes" ? 3.5 : 2.5} />
      <span className="sr-only">{s.label}: </span>
    </span>
  );
}

function CellView({ cell, id }: { cell: Cell; id: Approach }) {
  const a = APPROACHES.find((x) => x.id === id)!;
  return (
    <div role="cell" className={clsx("flex gap-3 px-4 py-3 md:py-5", id === "flat" && "md:bg-primary-tint/40")}>
      <Mark signal={cell.signal} />
      <div className="min-w-0">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-faint md:hidden">
          {a.letter} · {a.name.replace("A ", "").replace("An ", "")}
        </p>
        <p className="text-[14.5px] leading-snug text-fg-muted transition-colors group-hover/row:text-fg group-focus-visible/row:text-fg">{cell.text}</p>
      </div>
    </div>
  );
}

/**
 * Three approaches, side by side. Rows highlight on hover and keyboard focus;
 * chips filter by theme. At desktop widths it is a table; on phones each row
 * becomes a small card with the three approaches stacked. Every cell carries
 * an icon and a text label, so nothing relies on colour alone.
 */
export function ComparisonTable() {
  const uid = useId();
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("All");
  const rows = ROWS.filter((r) => group === "All" || r.group === group);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter the comparison" className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {GROUPS.map((g) => {
            const on = g === group;
            return (
              <button
                key={g}
                type="button"
                aria-pressed={on}
                onClick={() => setGroup(g)}
                className={clsx("relative shrink-0 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors", on ? "border-transparent text-canvas" : "border-edge bg-panel text-fg-muted hover:border-edge-strong hover:text-fg")}
              >
                {on ? <motion.span layoutId={`${uid}-g`} transition={{ duration: 0.35, ease: EASE }} className="absolute inset-0 rounded-full bg-navy" /> : null}
                <span className="relative">{g}</span>
              </button>
            );
          })}
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-fg-muted" aria-label="Legend">
          {(Object.keys(SIGNAL) as Signal[]).map((k) => {
            const Icon = SIGNAL[k].icon;
            return (
              <li key={k} className="flex items-center gap-2">
                <span className={clsx("grid h-4 w-4 place-items-center rounded-full", SIGNAL[k].tone)}>
                  <Icon aria-hidden className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {SIGNAL[k].label}
              </li>
            );
          })}
        </ul>
      </div>

      <div role="table" aria-label="Three approaches compared" className="mt-6 overflow-hidden rounded-[24px] border border-edge-strong bg-panel">
        {/* header */}
        <div role="row" className="hidden grid-cols-[170px_repeat(3,minmax(0,1fr))] border-b border-edge-strong bg-canvas-alt md:grid">
          <div role="columnheader" className="px-4 py-5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
            Criterion
          </div>
          {APPROACHES.map((a) => (
            <div key={a.id} role="columnheader" className={clsx("relative px-4 py-5", a.id === "flat" && "bg-primary-tint/60")}>
              {a.id === "flat" ? <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-navy" /> : null}
              <p className="font-mono text-[11px] text-primary">{a.letter}</p>
              <p className="mt-1 font-display text-[17px] font-medium leading-snug tracking-[-0.02em]">{a.name}</p>
            </div>
          ))}
        </div>

        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              role="row"
              tabIndex={0}
              className="group/row grid grid-cols-1 border-b border-edge outline-none transition-colors last:border-b-0 hover:bg-sunken/70 focus-visible:bg-sunken/70 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:grid-cols-[170px_repeat(3,minmax(0,1fr))]"
            >
              <div role="rowheader" className="px-4 pb-1 pt-4 md:py-5">
                <p className="font-display text-[16.5px] font-medium leading-snug tracking-[-0.02em]">{r.label}</p>
                <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-faint">{r.group}</p>
              </div>
              <CellView cell={r.share} id="share" />
              <CellView cell={r.stack} id="stack" />
              <CellView cell={r.flat} id="flat" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed text-fg-faint">Statements about approaches A and B are general. Terms differ between products and change over time, so check any platform’s current price page and terms.</p>
    </div>
  );
}
