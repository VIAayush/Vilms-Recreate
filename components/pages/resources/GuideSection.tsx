import clsx from "clsx";
import { Reveal } from "@/components/site-ui/Reveal";

/**
 * A section for pages that sit in the narrower column beside a rail table of
 * contents (the shared <Section> brings its own full-width container).
 */
export function GuideSection({
  id,
  kicker,
  title,
  lead,
  children,
  className,
}: {
  id: string;
  kicker?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={clsx("scroll-mt-32 pt-16 first:pt-0 sm:pt-24 sm:first:pt-0", className)}>
      <Reveal>
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h2 className={clsx("max-w-[760px] text-balance font-display text-[clamp(30px,3.8vw,48px)] font-medium leading-[1.05] tracking-[-0.035em]", kicker && "mt-4")}>{title}</h2>
        {lead ? <p className="sub mt-5 max-w-[620px]">{lead}</p> : null}
      </Reveal>
      {children ? <div className="mt-9 sm:mt-11">{children}</div> : null}
    </section>
  );
}
