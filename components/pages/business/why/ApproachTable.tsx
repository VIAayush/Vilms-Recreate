import clsx from "clsx";
import { Check, Minus, X } from "lucide-react";
import { Reveal } from "@/components/site-ui/Reveal";
import { APPROACHES, APPROACH_ROWS, type Verdict } from "../data";

const MARK: Record<Verdict, { icon: typeof Check; cls: string; label: string }> = {
  yes: { icon: Check, cls: "bg-green-tint text-green", label: "Yes" },
  partial: { icon: Minus, cls: "bg-sunken text-fg-muted", label: "Partly" },
  no: { icon: X, cls: "bg-red-tint text-red", label: "No" },
};

// Three approaches to running an institute online, in general terms. Never a
// named product. It is a table made of grid rows so one DOM serves both
// layouts: columns with a sticky header from md up, stacked rows on phones.
const cols = "md:grid-cols-[minmax(150px,0.8fr)_repeat(3,minmax(0,1fr))]";

export function ApproachTable() {
  return (
    <div role="table" aria-label="Three ways to run an institute online, compared" className="text-[14.5px]">
      <div role="rowgroup" className="hidden md:block">
        <div role="row" className={clsx("sticky top-14 z-10 grid border-b border-edge-strong bg-canvas", cols)}>
          <span role="columnheader" className="px-3 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
            What you get
          </span>
          {APPROACHES.map((a) => (
            <span key={a.id} role="columnheader" className={clsx("px-4 py-4", a.id === "vilms" && "rounded-t-2xl bg-navy text-white")}>
              <span className="block text-[15px] font-semibold leading-snug">{a.name}</span>
              <span className={clsx("mt-0.5 block text-[12.5px] font-normal leading-snug", a.id === "vilms" ? "opacity-75" : "text-fg-muted")}>{a.sub}</span>
            </span>
          ))}
        </div>
      </div>
      <div role="rowgroup">
        {APPROACH_ROWS.map((row, r) => (
          <Reveal key={row.label} delay={Math.min(r, 3) * 40}>
            <div role="row" className={clsx("group grid border-b border-edge py-4 transition-colors hover:bg-sunken/50 md:py-0", cols)}>
              <span role="rowheader" className="px-1 pb-2 font-display text-[18px] font-medium tracking-[-0.02em] md:px-3 md:py-5 md:text-[16px]">
                {row.label}
              </span>
              {row.cells.map((c, i) => {
                const m = MARK[c.v];
                const Icon = m.icon;
                const vilms = i === 2;
                return (
                  <span
                    key={i}
                    role="cell"
                    className={clsx(
                      "flex items-start gap-3 px-1 py-1.5 md:px-4 md:py-5",
                      vilms && "rounded-xl bg-primary-tint/50 md:rounded-none md:bg-primary-tint/60",
                      vilms && r === APPROACH_ROWS.length - 1 && "md:rounded-b-2xl",
                    )}
                  >
                    <span aria-hidden className={clsx("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", m.cls)}>
                      <Icon className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="min-w-0 leading-snug">
                      <span className="mb-0.5 block text-[11px] font-medium uppercase tracking-[0.1em] text-fg-faint md:hidden">{APPROACHES[i].name}</span>
                      <span className="sr-only">{m.label}: </span>
                      <span className={clsx(vilms && "font-medium")}>{c.t}</span>
                    </span>
                  </span>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
