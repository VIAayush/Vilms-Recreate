import clsx from "clsx";
import { Cta } from "@/components/site/Cta";
import { Breadcrumbs } from "./Breadcrumbs";
import type { PageKey } from "@/lib/site/pages";

/**
 * The top of every inner page: breadcrumb, kicker, big editorial H1, one-line
 * lead, the two conversion actions, and a visual slot. The visual is the
 * point of the page, so on desktop it gets the larger half.
 *
 *   <PageHero page="leadCrm" kicker="Lead CRM" title={<>Turn ad clicks into <em>paid enrolments</em></>}
 *             lead="…" visual={<CrmHeroVisual />} />
 */
export function PageHero({
  page,
  kicker,
  title,
  lead,
  visual,
  ctas = "both",
  micro = ["No credit card required", "0% revenue share"],
  layout = "split",
  location,
}: {
  page: PageKey;
  kicker: string;
  /** The page's single H1. */
  title: React.ReactNode;
  lead: React.ReactNode;
  visual?: React.ReactNode;
  ctas?: "both" | "none";
  micro?: string[];
  /** "split": text left, visual right · "stack": text centred, visual below */
  layout?: "split" | "stack";
  location?: string;
}) {
  const where = location ?? `hero_${page}`;
  const text = (
    <div className={clsx(layout === "stack" && "mx-auto max-w-[860px] text-center")}>
      <Breadcrumbs page={page} className={clsx(layout === "stack" && "flex justify-center")} />
      <p className={clsx("kicker mt-7", layout === "stack" && "justify-center")}>{kicker}</p>
      <h1
        className={clsx(
          "mt-5 text-balance font-display font-medium leading-[1.02] tracking-[-0.04em]",
          layout === "split" ? "text-[clamp(38px,5.4vw,72px)]" : "text-[clamp(40px,6.2vw,84px)]",
        )}
      >
        {title}
      </h1>
      <p className={clsx("sub mt-6", layout === "stack" ? "mx-auto max-w-[640px]" : "max-w-[520px]")}>{lead}</p>
      {ctas === "both" ? (
        <div className={clsx("mt-8 flex flex-col gap-3 sm:flex-row", layout === "stack" && "justify-center")}>
          <Cta intent="trial" location={where} className="cta cta-primary cta-lg" arrow>
            Start 14-Day Free Trial
          </Cta>
          <Cta intent="demo" location={where} className="cta cta-ghost cta-lg">
            Book a Demo
          </Cta>
        </div>
      ) : null}
      {micro.length ? (
        <ul className={clsx("mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-fg-muted", layout === "stack" && "justify-center")}>
          {micro.map((m) => (
            <li key={m} className="flex items-center gap-1.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" />
              {m}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  return (
    <header className="relative isolate overflow-hidden pb-14 pt-24 sm:pb-20 sm:pt-32">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div className="wrap">
        {layout === "split" ? (
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            {text}
            {visual ? <div className="relative min-w-0">{visual}</div> : null}
          </div>
        ) : (
          <>
            {text}
            {visual ? <div className="relative mx-auto mt-14 min-w-0 max-w-[1100px]">{visual}</div> : null}
          </>
        )}
      </div>
    </header>
  );
}
