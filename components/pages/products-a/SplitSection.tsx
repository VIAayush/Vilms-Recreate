import clsx from "clsx";
import { Reveal } from "@/components/site-ui/Reveal";

/**
 * A section whose heading sits in a sticky left column while the content
 * scrolls beside it. A change of rhythm from the stacked `Section`.
 */
export function SplitSection({
  id,
  kicker,
  title,
  lead,
  tone = "plain",
  aside,
  children,
}: {
  id?: string;
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "plain" | "alt" | "navy";
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={clsx("scroll-mt-20 py-16 sm:py-24", tone === "alt" && "bg-canvas-alt", tone === "navy" && "band-navy")}>
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker">{kicker}</p>
          <h2 className="mt-4 text-balance font-display text-[clamp(30px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.035em]">{title}</h2>
          {lead ? <p className="sub mt-5 max-w-[440px]">{lead}</p> : null}
          {aside ? <div className="mt-8">{aside}</div> : null}
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
