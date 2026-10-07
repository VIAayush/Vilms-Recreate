import { Cta } from "@/components/site/Cta";
import { BrandMark } from "@/components/marketing/BrandMark";
import { Reveal } from "./Reveal";

/**
 * The closing call to action on every page. A deep-navy panel with the VILMS
 * mark cropped large behind a fine grid; two actions and the standing proof
 * points (all true to the product: trial, no card, 0% share).
 */
export function CtaBand({
  title = "Bring your institute onto one platform",
  lead = "Courses, live classes, answer evaluation, payments and leads — under your own brand, with 0% of your fees going to us.",
  location = "cta_band",
}: {
  title?: React.ReactNode;
  lead?: React.ReactNode;
  location?: string;
}) {
  return (
    <section id="final-cta" className="scroll-mt-20 pb-16 pt-6 sm:pb-24">
      <div className="wrap">
        <Reveal className="band-navy relative isolate overflow-hidden rounded-[32px] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="grid-bg-dark pointer-events-none absolute inset-0 -z-10" />
          <BrandMark variant="dark" className="pointer-events-none absolute -right-10 -top-14 -z-10 h-[360px] w-[480px] opacity-[0.1] sm:-right-4" />
          <h2 className="mx-auto max-w-[780px] text-balance font-display text-[clamp(32px,4.8vw,60px)] font-medium leading-[1.05] tracking-[-0.035em] text-white">{title}</h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed text-white/75">{lead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Cta intent="trial" location={location} className="cta cta-lg w-full bg-white text-[rgb(0_48_86)] hover:bg-[rgb(220_234_250)] sm:w-auto" arrow>
              Start 14-Day Free Trial
            </Cta>
            <Cta intent="demo" location={location} className="cta cta-lg w-full border border-white/35 text-white hover:border-white hover:bg-white/10 sm:w-auto">
              Book a Demo
            </Cta>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-[13.5px] text-white/65">
            <li>No credit card required</li>
            <li>0% revenue share</li>
            <li>14-day free trial</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
