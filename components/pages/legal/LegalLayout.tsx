import Link from "next/link";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/site-ui/Breadcrumbs";
import { Toc, type TocItem } from "@/components/pages/resources/Toc";
import { PAGES, type PageKey } from "@/lib/site/pages";

const LEGAL: PageKey[] = ["privacy", "cookies", "terms", "refund"];

/** The four legal pages as a tab-like row, with the current one marked. */
function LegalNav({ current }: { current: PageKey }) {
  return (
    <nav aria-label="Legal pages" className="mt-10 border-t border-edge pt-5">
      <ul className="flex flex-wrap gap-2">
        {LEGAL.map((k) => {
          const on = k === current;
          return (
            <li key={k}>
              <Link
                href={PAGES[k].path}
                aria-current={on ? "page" : undefined}
                className={clsx(
                  "inline-flex items-center rounded-full border px-4 py-2 text-[14px] font-medium transition-colors",
                  on ? "border-navy bg-navy text-canvas" : "border-edge bg-panel text-fg-muted hover:border-edge-strong hover:text-fg",
                )}
              >
                {PAGES[k].name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Shared layout for the legal pages: breadcrumb and a large title, a plain
 * summary with an optional "at a glance" panel, links between the four legal
 * pages, then numbered sections beside a sticky table of contents.
 */
export function LegalLayout({
  page,
  summary,
  meta,
  glance,
  toc,
  children,
}: {
  page: PageKey;
  summary: React.ReactNode;
  meta?: string;
  glance?: string[];
  toc: TocItem[];
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="relative isolate overflow-hidden pb-10 pt-28 sm:pb-14 sm:pt-36">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10" />
        <div className="wrap">
          <Breadcrumbs page={page} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:gap-16">
            <div>
              <p className="kicker">Legal</p>
              <h1 className="mt-5 text-balance font-display text-[clamp(40px,6.2vw,88px)] font-medium leading-[0.98] tracking-[-0.045em]">{PAGES[page].name}</h1>
              <p className="sub mt-6 max-w-[620px]">{summary}</p>
              {meta ? <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-faint">{meta}</p> : null}
            </div>
            {glance ? (
              <aside aria-label="At a glance" className="rounded-[24px] border border-edge-strong bg-panel p-6 shadow-soft">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">At a glance</p>
                <ul className="mt-4 space-y-3">
                  {glance.map((g) => (
                    <li key={g} className="flex items-start gap-3 text-[15px] leading-snug">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={3} />
                      {g}
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
          <LegalNav current={page} />
        </div>
      </header>

      <div className="wrap pb-20 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-16 lg:pb-28">
        <Toc items={toc} title="On this page" />
        <div className="min-w-0 pt-10 lg:pt-4">{children}</div>
      </div>
    </>
  );
}

/** A numbered legal section: hairline rule, mono number, comfortable measure. */
export function LegalSection({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-edge py-10 first:border-t-0 first:pt-0 sm:py-12">
      <h2 className="flex items-baseline gap-4 font-display text-[clamp(24px,2.8vw,34px)] font-medium leading-[1.1] tracking-[-0.035em]">
        <span className="font-mono text-[12px] font-medium tracking-[0.1em] text-primary">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-5 max-w-[720px] space-y-4 text-[16.5px] leading-[1.75] text-fg-muted [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-primary [&_strong]:font-semibold [&_strong]:text-fg">{children}</div>
    </section>
  );
}
