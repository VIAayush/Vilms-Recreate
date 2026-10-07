"use client";

import { useId, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { EASE } from "@/components/site-ui/motion-tokens";
import { PAGES } from "@/lib/site/pages";
import { MODES, type ModeId } from "./day-data";

/** "Where does your institute sit?" Three modes, and what an LMS does in each. */
export function ModePicker() {
  const uid = useId();
  const [mode, setMode] = useState<ModeId>("hybrid");
  const m = MODES.find((x) => x.id === mode)!;
  const idx = MODES.indexOf(m);

  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = MODES[(idx + d + MODES.length) % MODES.length].id;
    setMode(next);
    document.getElementById(`${uid}-${next}`)?.focus();
  };

  return (
    <div>
      <div role="radiogroup" aria-label="Where your institute sits" onKeyDown={onKey} className="grid gap-2 sm:grid-cols-3">
        {MODES.map((x, i) => {
          const on = x.id === mode;
          return (
            <button
              key={x.id}
              id={`${uid}-${x.id}`}
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setMode(x.id)}
              className={clsx("group relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition-colors", on ? "border-transparent text-canvas" : "border-edge bg-panel hover:border-edge-strong")}
            >
              {on ? <motion.span layoutId={`${uid}-bg`} transition={{ duration: 0.4, ease: EASE }} className="absolute inset-0 bg-navy" /> : null}
              <span className={clsx("relative block font-mono text-[11px] tabular-nums", on ? "opacity-70" : "text-fg-faint")}>{String(i + 1).padStart(2, "0")}</span>
              <span className="relative mt-1 block font-display text-[22px] font-medium tracking-[-0.03em]">{x.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 min-h-[360px] lg:min-h-[300px]" role="region" aria-live="polite" aria-label={`What an LMS does when your institute is ${m.label.toLowerCase()}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
            <div>
              <p className="text-balance font-display text-[clamp(22px,2.6vw,32px)] font-medium leading-[1.15] tracking-[-0.03em]">{m.line}</p>
              <p className="mt-5 border-l-2 border-gold pl-4 text-[15px] leading-snug text-fg-muted">
                <span className="font-medium text-fg">Stays as it is: </span>
                {m.stays}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {m.links.map((k) => (
                  <li key={k}>
                    <Link href={PAGES[k].path} className="group inline-flex items-center gap-1 text-[14.5px] font-medium text-primary">
                      {PAGES[k].name}
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">What the LMS does</p>
              <ul className="mt-3 divide-y divide-edge border-y border-edge">
                {m.does.map((d, i) => (
                  <motion.li key={d} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.05 + i * 0.06, ease: EASE }} className="flex items-start gap-3 py-3.5 text-[15.5px] leading-snug">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={3} />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
