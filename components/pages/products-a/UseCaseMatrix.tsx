import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { PAGES } from "@/lib/site/pages";
import { AUDIENCES, MODULES, MODULE_BY_ID } from "./lms-data";

// Which features each kind of organisation uses, as a matrix. Rows with a
// solution page link to it. Pure CSS hover; no client JS.

export function UseCaseMatrix() {
  return (
    <div>
      {/* column heads (wide screens) */}
      <div aria-hidden className="hidden grid-cols-[minmax(0,1fr)_repeat(6,88px)] items-end border-b border-edge-strong pb-3 lg:grid">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Who</span>
        {MODULES.map((m) => (
          <span key={m.id} className="flex flex-col items-center gap-1.5 text-center text-[11.5px] leading-tight text-fg-muted">
            <m.Icon className="h-4 w-4" />
            {m.label}
          </span>
        ))}
      </div>

      <ul className="divide-y divide-edge border-b border-edge max-lg:border-t">
        {AUDIENCES.map(({ name, blurb, modules, href }) => {
          const used = new Set(modules);
          const Row = href ? Link : "div";
          const rowProps = href ? { href: PAGES[href].path } : {};
          return (
            <li key={name}>
              <Row
                {...(rowProps as { href: string })}
                className="group relative grid gap-3 py-5 transition-colors duration-300 hover:bg-primary-tint/50 lg:grid-cols-[minmax(0,1fr)_repeat(6,88px)] lg:items-center lg:gap-0 lg:px-0 lg:py-6"
              >
                <span className="min-w-0 lg:pr-8">
                  <span className="flex items-center gap-2 font-display text-[22px] font-medium tracking-[-0.025em] sm:text-[26px]">
                    {name}
                    {href ? <ArrowUpRight aria-hidden className="h-5 w-5 text-fg-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" /> : null}
                  </span>
                  <span className="mt-1 block text-[14.5px] leading-snug text-fg-muted">{blurb}</span>
                  <span className="sr-only">Features used: {modules.map((m) => MODULE_BY_ID[m].label).join(", ")}.</span>
                </span>

                {/* phones: the modules it leans on */}
                <span aria-hidden className="flex flex-wrap gap-1.5 lg:hidden">
                  {modules.map((id) => {
                    const mod = MODULE_BY_ID[id];
                    return (
                      <span key={id} className="inline-flex items-center gap-1.5 rounded-full bg-primary-tint px-2.5 py-1 text-[12px] font-medium text-primary">
                        <mod.Icon className="h-3 w-3" />
                        {mod.label}
                      </span>
                    );
                  })}
                </span>

                {/* wide screens: the matrix */}
                {MODULES.map((m) => (
                  <span key={m.id} aria-hidden className="hidden place-items-center lg:grid">
                    <span
                      className={clsx(
                        "grid place-items-center rounded-full transition duration-300",
                        used.has(m.id)
                          ? "h-9 w-9 bg-primary-tint text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-ink"
                          : "h-1.5 w-3 rounded-full bg-edge",
                      )}
                    >
                      {used.has(m.id) ? <m.Icon className="h-4 w-4" /> : null}
                    </span>
                  </span>
                ))}
              </Row>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
