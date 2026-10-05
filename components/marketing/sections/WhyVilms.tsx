"use client";

import { Fragment, useState } from "react";
import clsx from "clsx";
import { why } from "@/lib/content";

type Term = { id: string; term: string; proof: string };
const TERMS = why.statement.filter((p): p is Term => typeof p !== "string");

// Every claim gets its own colour; hover one and it lights up.
const TERM_TONE: Record<string, { rgb: string; text: string }> = {
  one: { rgb: "var(--primary)", text: "text-primary" },
  brand: { rgb: "var(--teal)", text: "text-teal" },
  payments: { rgb: "var(--yellow)", text: "text-yellow-ink" },
  crm: { rgb: "var(--green)", text: "text-green" },
  ai: { rgb: "var(--indigo)", text: "text-indigo" },
  flat: { rgb: "var(--red)", text: "text-red" },
  zero: { rgb: "var(--primary)", text: "text-primary" },
};

// The case for VILMS as one sentence. Each underlined term is a claim the
// visitor can open; the proof appears beside it instead of in nine cards.
export function WhyVilms() {
  const [activeId, setActiveId] = useState(TERMS[TERMS.length - 1].id);
  const index = TERMS.findIndex((t) => t.id === activeId);
  const active = TERMS[index];

  return (
    <section id="why-vilms" aria-labelledby="why-vilms-title" data-glow style={{ "--glow": TERM_TONE[activeId].rgb } as React.CSSProperties} className="glow-section py-24 sm:py-36">
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
                  style={{ "--glow": TERM_TONE[part.id].rgb } as React.CSSProperties}
                  className={clsx(
                    "relative inline rounded-md text-left font-semibold text-fg transition-colors",
                    "bg-no-repeat [background-image:linear-gradient(rgb(var(--glow)),rgb(var(--glow)))] [background-position:0_95%]",
                    "transition-[background-size,color] duration-300",
                    part.id === activeId ? clsx("[background-size:100%_0.12em]", TERM_TONE[part.id].text) : "[background-size:100%_0.05em] hover:[background-size:100%_0.12em]",
                  )}
                >
                  {part.term}
                </button>
              ),
            )}
          </p>

          <aside className="border-t border-edge pt-5 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
            <p className="font-mono text-[11px] tabular-nums text-fg-faint">
              {String(index + 1).padStart(2, "0")} / {String(TERMS.length).padStart(2, "0")}
            </p>
            <div id="why-proof" aria-live="polite" className="min-h-[132px]">
              <p key={active.id} className="mt-3 animate-rise-in">
                <span className={clsx("flex items-center gap-2 text-[17px] font-semibold", TERM_TONE[active.id].text)}>
                  <span aria-hidden className="h-2 w-2 rounded-full bg-[rgb(var(--glow))]" />
                  {active.term[0].toUpperCase() + active.term.slice(1)}
                </span>
                <span className="mt-2 block text-[15px] leading-relaxed text-fg-muted">{active.proof}</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
