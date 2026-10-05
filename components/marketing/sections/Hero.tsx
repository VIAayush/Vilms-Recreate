import { Check } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { hero } from "@/lib/content";
import { HeroField } from "../HeroField";
import { Magnetic } from "../Magnetic";
import { HeroAreas } from "./HeroAreas";
import { HeroStage } from "./HeroStage";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-parallax
      className="relative isolate overflow-hidden bg-gradient-to-b from-canvas via-canvas to-wash-blue pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      {/* Move the cursor: the dots around it light up. */}
      <HeroField />

      <div className="wrap">
        <p className="mb-7 inline-flex animate-rise-in items-center gap-2 rounded-full bg-primary-tint px-3 py-1.5 text-[13px] font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          For coaching institutes · 0% revenue share
        </p>
        <h1 id="hero-title" className="display max-w-[15ch] text-[clamp(42px,7vw,104px)] lg:max-w-none">
          <span className="block animate-rise-in text-balance">
            {hero.titleTopLead}{" "}
            <span className="relative whitespace-nowrap text-primary">
              {hero.titleTopEmphasis}
              {/* a gold stroke, the colour of the logo's inner V */}
              <svg aria-hidden viewBox="0 0 300 16" preserveAspectRatio="none" className="absolute -bottom-[0.05em] left-[2%] h-[0.11em] w-[96%]">
                <path d="M4 11C70 4 190 2 296 7" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-gold animate-[draw_1.1s_0.5s_cubic-bezier(.16,1,.3,1)_both] [stroke-dasharray:320] [stroke-dashoffset:320]" />
              </svg>
            </span>
          </span>
          <span className="serif-accent block animate-rise-in pl-[0.04em] text-fg-muted [animation-delay:120ms]">{hero.titleBottom}</span>
        </h1>

        <div className="mt-10 grid items-start gap-12 lg:mt-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <div className="animate-rise-in [animation-delay:220ms] lg:pt-6">
            <p className="sub max-w-[420px]">{hero.sub}</p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <Magnetic>
                <Cta intent="trial" location="hero" className="cta cta-primary cta-lg w-full min-[420px]:w-auto" arrow>
                  Start 14-Day Free Trial
                </Cta>
              </Magnetic>
              <Cta intent="demo" location="hero" className="cta cta-outline cta-lg">
                Book a Demo
              </Cta>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-fg-muted">
              {hero.proof.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check aria-hidden className="h-3.5 w-3.5 text-green" strokeWidth={3} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <HeroAreas />
            <HeroStage />
          </div>
        </div>
      </div>
    </section>
  );
}
