"use client";

import { Fragment, useState } from "react";
import clsx from "clsx";
import { why } from "@/lib/content";

type Term = { id: string; term: string; proof: string };
const TERMS = why.statement.filter((p): p is Term => typeof p !== "string");

// The case for VILMS as one sentence. Each underlined term is a claim the
// visitor can open; the proof appears beside it instead of in nine cards.
export function WhyVilms() {
  const [activeId, setActiveId] = useState(TERMS[TERMS.length - 1].id);
  const index = TERMS.findIndex((t) => t.id === activeId);
  const active = TERMS[index];

  return (
    <section id="why-vilms" aria-labelledby="why-vilms-title" className="py-24 sm:py-36">
      <div className="wrap">
        <h2 className="kicker" id="why-vilms-title">
          {why.kicker}
        </h2>
        <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-end xl:gap-16">
          <p className="font-display text-[clamp(26px,3.5vw,48px)] font-medium leading-[1.25] tracking-[-0.03em] text-fg-muted">
            {why.statement.map((part, i) =>
              typeof part === "string" ? (
                <Fragment key={i}>{/^[,.]/.test(part) ? (i === why.statement.length - 1 ? part : `${part} `) : ` ${part} `}</Fragment>
              ) : (
                <button
                  key={part.id}
                  type="button"
                  aria-pressed={part.id === activeId}
                  aria-describedby="why-proof"
                  onClick={() => setActiveId(part.id)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActiveId(part.id)}
                  onFocus={() => setActiveId(part.id)}
                  className={clsx(
                    "relative inline rounded-md text-left font-semibold text-fg transition-colors",
                    "bg-no-repeat [background-image:linear-gradient(rgb(var(--primary)),rgb(var(--primary)))] [background-position:0_95%]",
                    "transition-[background-size,color] duration-300",
                    part.id === activeId ? "[background-size:100%_0.1em] text-primary" : "[background-size:100%_0.04em] hover:[background-size:100%_0.1em]",
                  )}
                >
                  {part.term}
                </button>
              ),
            )}
          </p>

          <aside className="border-t border-edge/10 pt-5 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
            <p className="font-mono text-[11px] tabular-nums text-fg-faint">
              {String(index + 1).padStart(2, "0")} / {String(TERMS.length).padStart(2, "0")}
            </p>
            <div id="why-proof" aria-live="polite" className="min-h-[132px]">
              <p key={active.id} className="mt-3 animate-rise-in">
                <span className="block text-[17px] font-semibold">{active.term[0].toUpperCase() + active.term.slice(1)}</span>
                <span className="mt-2 block text-[15px] leading-relaxed text-fg-muted">{active.proof}</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
