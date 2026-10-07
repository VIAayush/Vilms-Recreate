import clsx from "clsx";
import { Reveal } from "./Reveal";

/**
 * A page section with a consistent heading block. `tone` picks the band:
 *   plain — page background · alt — cool light wash · navy — the logo's deep navy
 * The heading is an <h2>; a page has exactly one <h1> (PageHero).
 */
export function Section({
  id,
  kicker,
  title,
  lead,
  align = "left",
  tone = "plain",
  className,
  children,
  headerSlot,
}: {
  id?: string;
  kicker?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "plain" | "alt" | "navy";
  className?: string;
  children?: React.ReactNode;
  /** content aligned to the right of the heading on desktop (e.g. a filter) */
  headerSlot?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "scroll-mt-20 py-16 sm:py-24",
        tone === "alt" && "bg-canvas-alt",
        tone === "navy" && "band-navy",
        className,
      )}
    >
      <div className="wrap">
        {title ? (
          <Reveal className={clsx("mb-10 sm:mb-14", align === "center" && "mx-auto text-center", headerSlot && "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between")}>
            <div className={clsx(align === "center" ? "mx-auto max-w-[760px]" : "max-w-[760px]")}>
              {kicker ? <p className={clsx("kicker", align === "center" && "justify-center")}>{kicker}</p> : null}
              <h2 className={clsx("text-balance font-display text-[clamp(30px,4.2vw,54px)] font-medium leading-[1.05] tracking-[-0.035em]", kicker && "mt-4")}>{title}</h2>
              {lead ? <p className={clsx("sub mt-5", align === "center" && "mx-auto")}>{lead}</p> : null}
            </div>
            {headerSlot}
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
