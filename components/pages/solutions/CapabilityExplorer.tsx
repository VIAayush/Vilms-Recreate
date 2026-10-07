"use client";

import { useId, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Illustrative } from "@/components/marketing/screens/primitives";
import { swap } from "@/components/site-ui/motion-tokens";
import { SOLUTION_ICONS } from "./icons";
import type { Capability } from "./types";

/**
 * The capability explorer: a list of what the institute needs, and a stage
 * that swaps to the matching interface. Hover (mouse), click, tap or the
 * arrow keys change the selection; the stage cross-fades with AnimatePresence.
 *
 *   variant="side" — vertical list beside the stage (pills on phones)
 *   variant="top"  — pill tabs above a text + stage split
 */
export function CapabilityExplorer({ items, variant, flip = false }: { items: Capability[]; variant: "side" | "top"; flip?: boolean }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = items[active];

  const go = (i: number, focus = false) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const prev = ["ArrowUp", "ArrowLeft"];
    const nextKeys = ["ArrowDown", "ArrowRight"];
    if (prev.includes(e.key)) {
      e.preventDefault();
      go(i - 1, true);
    } else if (nextKeys.includes(e.key)) {
      e.preventDefault();
      go(i + 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      go(items.length - 1, true);
    }
  };

  const tabProps = (i: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      tabs.current[i] = el;
    },
    role: "tab" as const,
    id: `${uid}-t${i}`,
    "aria-selected": i === active,
    "aria-controls": `${uid}-p`,
    tabIndex: i === active ? 0 : -1,
    onClick: () => go(i),
    onKeyDown: (e: React.KeyboardEvent) => onKey(e, i),
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(i);
    },
  });

  const stage = (
    <div className="min-w-0">
      <div className="relative overflow-hidden rounded-[28px] border border-edge bg-wash-blue p-3 sm:p-6 lg:p-7">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div
          id={`${uid}-p`}
          role="tabpanel"
          aria-labelledby={`${uid}-t${active}`}
          className="relative flex min-h-[360px] items-center sm:min-h-[430px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={item.id} {...swap} className="w-full min-w-0">
              {item.url ? (
                <p className="mb-3 flex items-center justify-center gap-1.5 truncate font-mono text-[10.5px] text-fg-muted">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" />
                  {item.url}
                </p>
              ) : null}
              {item.visual}
            </motion.div>
          </AnimatePresence>
        </div>
        <Illustrative className="relative mt-4 text-center" />
      </div>
    </div>
  );

  /* ---------- top tabs ---------- */
  if (variant === "top") {
    return (
      <div>
        <div role="tablist" aria-label="Capabilities" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {items.map((it, i) => {
            const Icon = SOLUTION_ICONS[it.icon];
            const on = i === active;
            return (
              <button
                key={it.id}
                type="button"
                {...tabProps(i)}
                className={clsx(
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[14.5px] font-medium transition duration-300",
                  on ? "border-navy bg-navy text-white" : "border-edge bg-panel text-fg-muted hover:-translate-y-0.5 hover:border-primary/50 hover:text-fg",
                )}
              >
                <Icon aria-hidden className="h-4 w-4" />
                {it.title}
              </button>
            );
          })}
        </div>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-12">
          <div className={clsx("min-w-0 lg:sticky lg:top-28", flip && "lg:order-2")}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={item.id} {...swap}>
                <h3 className="text-balance font-display text-[clamp(26px,3vw,38px)] font-medium leading-[1.08] tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3.5 text-[16.5px] leading-relaxed text-fg-muted">{item.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={clsx("min-w-0", flip && "lg:order-1")}>{stage}</div>
        </div>
      </div>
    );
  }

  /* ---------- side list ---------- */
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
      <div className={clsx("min-w-0", flip && "lg:order-2")}>
        <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:block lg:overflow-visible lg:px-0 lg:pb-0">
          {items.map((it, i) => {
            const Icon = SOLUTION_ICONS[it.icon];
            const on = i === active;
            return (
              <button
                key={it.id}
                type="button"
                {...tabProps(i)}
                className={clsx(
                  "group relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-left text-[14.5px] font-medium transition duration-300",
                  "lg:block lg:w-full lg:rounded-none lg:border-0 lg:border-l-2 lg:bg-transparent lg:px-0 lg:py-0 lg:pl-6",
                  on
                    ? "border-navy bg-navy text-white lg:border-navy lg:bg-transparent lg:text-fg"
                    : "border-edge bg-panel text-fg-muted lg:border-edge lg:text-fg-muted lg:hover:border-primary/60 lg:hover:text-fg",
                )}
              >
                <span className="flex items-center gap-2 lg:items-baseline lg:gap-3 lg:py-3.5">
                  <Icon aria-hidden className={clsx("h-4 w-4 lg:hidden")} />
                  <span className="hidden font-mono text-[12px] tabular-nums text-fg-faint lg:inline">{String(i + 1).padStart(2, "0")}</span>
                  <span className="lg:text-[clamp(21px,2vw,27px)] lg:font-medium lg:leading-tight lg:tracking-[-0.02em]">{it.title}</span>
                </span>
                <span className="hidden lg:block">
                  <AnimatePresence initial={false}>
                    {on ? (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="block overflow-hidden"
                      >
                        <span className="block pb-6 pr-4 text-[15.5px] font-normal leading-relaxed text-fg-muted">{it.text}</span>
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              </button>
            );
          })}
        </div>
        {/* phones and tablets: the description sits under the pills */}
        <div className="mt-5 lg:hidden">
          <p className="text-[16px] leading-relaxed text-fg-muted">{item.text}</p>
        </div>
      </div>
      <div className={clsx("min-w-0", flip && "lg:order-1")}>{stage}</div>
    </div>
  );
}
