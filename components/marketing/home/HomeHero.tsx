import { Cta } from "@/components/site/Cta";
import { LiveDot } from "../screens/primitives";
import { HeroEcosystem } from "./HeroEcosystem";

// The home page's one <h1>. Positioning on the left, the living product on
// the right — and the visual is the bigger half.
export function HomeHero() {
  return (
    <header className="relative isolate overflow-x-clip pb-24 pt-28 sm:pb-28 sm:pt-32 lg:pb-32 lg:pt-36">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel py-1.5 pl-3 pr-3.5 text-[13px] font-medium text-fg-muted shadow-sm">
            <LiveDot /> LMS for Coaching Institutes &amp; Businesses
          </p>
          <h1 className="mt-6 text-balance font-display text-[clamp(38px,4.3vw,62px)] font-medium leading-[0.98] tracking-[-0.045em]">
            Your students pay you.
            <span className="block text-fg-muted">Not your software.</span>
          </h1>
          <p className="sub mt-6 max-w-[500px]">
            A smart LMS for coaching institutes, educational organizations, training institutes and businesses. Manage courses, learners, assessments and performance from one centralized platform — under your own brand.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Cta intent="trial" location="hero" className="cta cta-primary cta-lg" arrow>
              Start 14-Day Free Trial
            </Cta>
            <Cta intent="demo" location="hero" className="cta cta-ghost cta-lg">
              Book a Demo
            </Cta>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-fg-muted">
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" /> No credit card required
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" /> 0% revenue share
            </li>
          </ul>
        </div>
        <HeroEcosystem />
      </div>
    </header>
  );
}
