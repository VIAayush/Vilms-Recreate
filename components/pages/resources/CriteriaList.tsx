import clsx from "clsx";
import { Check, CircleDashed } from "lucide-react";
import { Reveal } from "@/components/site-ui/Reveal";
import { CRITERIA } from "./criteria-data";

/**
 * The eight criteria as an editorial list: a large numeral and title on the
 * left; why it matters, what to ask and how VILMS handles it on the right.
 * Each row lifts a tint on hover. Server-rendered, no JavaScript.
 */
export function CriteriaList() {
  return (
    <ol className="divide-y divide-edge border-y border-edge">
      {CRITERIA.map((c, i) => (
        <li key={c.id}>
          <Reveal className="group grid gap-x-10 gap-y-5 px-0 py-9 transition-colors duration-300 hover:bg-sunken/60 sm:grid-cols-[210px_minmax(0,1fr)] sm:px-4 sm:py-11 lg:-mx-4">
            <div>
              <span className="font-display text-[clamp(40px,5vw,60px)] font-medium leading-none tracking-[-0.05em] text-edge-strong transition-colors duration-300 group-hover:text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-[clamp(21px,2.2vw,26px)] font-medium leading-[1.12] tracking-[-0.03em]">{c.title}</h3>
            </div>
            <div className="min-w-0 max-w-[640px]">
              <p className="text-[16.5px] leading-relaxed text-fg-muted">{c.why}</p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Ask the vendor</p>
              <ul className="mt-2 space-y-1.5">
                {c.ask.map((a) => (
                  <li key={a} className="relative pl-5 text-[15.5px] leading-snug before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
                    {a}
                  </li>
                ))}
              </ul>
              <div className={clsx("mt-6 rounded-2xl border p-4", c.coverage === "full" ? "border-green/40 bg-green-tint/50" : "border-gold/50 bg-sunken")}>
                <p className={clsx("flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em]", c.coverage === "full" ? "text-green" : "text-gold-text")}>
                  {c.coverage === "full" ? <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} /> : <CircleDashed aria-hidden className="h-3.5 w-3.5" />}
                  How VILMS handles it · {c.coverage === "full" ? "covered" : "covered in part"}
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-fg">{c.vilms}</p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
