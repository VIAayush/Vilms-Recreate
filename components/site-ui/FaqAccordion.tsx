"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { EASE } from "./motion-tokens";

export type FaqItem = { q: string; a: string };

/**
 * An accessible accordion. One item open at a time by default; the answer
 * height animates. Answers are plain strings so the same data can feed the
 * FAQPage JSON-LD (see faqLd in lib/site/seo.tsx).
 */
export function FaqAccordion({
  items,
  multiple = false,
  defaultOpen = 0,
  className,
}: {
  items: FaqItem[];
  multiple?: boolean;
  defaultOpen?: number | null;
  className?: string;
}) {
  const uid = useId();
  const [open, setOpen] = useState<Set<number>>(new Set(defaultOpen === null ? [] : [defaultOpen]));

  const toggle = (i: number) =>
    setOpen((cur) => {
      const next = new Set(multiple ? cur : []);
      if (cur.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={clsx("divide-y divide-edge border-y border-edge", className)}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={it.q}>
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a${i}`}
                onClick={() => toggle(i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left text-[17px] font-medium leading-snug transition-colors hover:text-primary sm:text-[18px]"
              >
                <span>{it.q}</span>
                <span
                  aria-hidden
                  className={clsx(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-edge-strong transition duration-300 group-hover:border-primary",
                    isOpen && "rotate-45 border-navy bg-navy text-white ",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`${uid}-a${i}`}
                  role="region"
                  aria-labelledby={`${uid}-q${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[760px] pb-6 pr-10 text-[15.5px] leading-relaxed text-fg-muted">{it.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
