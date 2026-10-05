import { Check } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { hero } from "@/lib/content";
import { Magnetic } from "../Magnetic";
import { HeroStage } from "./HeroStage";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      {/* The "stage floor": a tinted plane the product sits on. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 top-[46%] -z-10 hidden lg:block">
        <div className="grain absolute inset-y-0 left-[38%] right-0 rounded-tl-[48px] bg-panel-tint" />
        <div className="dot-field absolute inset-y-0 left-[38%] right-0 rounded-tl-[48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="wrap">
        <h1 id="hero-title" className="display max-w-[15ch] text-[clamp(42px,7vw,104px)] lg:max-w-none">
          <span className="block animate-rise-in text-balance">{hero.titleTop}</span>
          <span className="serif-accent block animate-rise-in pl-[0.04em] text-fg-muted [animation-delay:120ms]">{hero.titleBottom}</span>
        </h1>

        <div className="mt-10 grid items-start gap-12 lg:mt-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <div className="animate-rise-in [animation-delay:220ms] lg:pt-6">
            <p className="sub max-w-[420px]">{hero.sub}</p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <Magnetic>
                <Cta intent="demo" location="hero" className="cta cta-accent cta-lg w-full min-[420px]:w-auto" arrow>
                  Book a Demo
                </Cta>
              </Magnetic>
              <Cta intent="trial" location="hero" className="cta cta-ghost cta-lg">
                Start 14-Day Free Trial
              </Cta>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-fg-muted">
              {hero.proof.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check aria-hidden className="h-3.5 w-3.5 text-mint" strokeWidth={3} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <HeroStage />
        </div>
      </div>
    </section>
  );
}
