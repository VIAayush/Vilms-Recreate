import { Check } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { finalCta, hero, tools } from "@/lib/content";
import { BrandMark } from "../BrandMark";
import { moduleDot } from "../tone";
import { Magnetic } from "../Magnetic";

type Vars = React.CSSProperties & Record<`--${string}`, string>;

export function FinalCta() {
  return (
    <section id="final-cta" aria-labelledby="final-title" data-glow className="band-dark glow-section relative overflow-hidden py-24 sm:py-32">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div>
          <h2 id="final-title" className="display text-[clamp(38px,5.6vw,80px)]">
            {finalCta.title}
          </h2>
          <p className="sub mt-6 max-w-[520px]">{finalCta.sub}</p>
          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <Magnetic>
              <Cta intent="trial" location="final_cta" className="cta cta-gold cta-lg w-full min-[420px]:w-auto" arrow>
                Start 14-Day Free Trial
              </Cta>
            </Magnetic>
            <Cta intent="demo" location="final_cta" className="cta cta-outline cta-lg">
              Book a Demo
            </Cta>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-fg-muted">
            {hero.proof.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Check aria-hidden className="h-3.5 w-3.5 text-green" strokeWidth={3} /> {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Everything, one platform: the modules held in orbit around the mark. */}
        <div aria-hidden data-parallax className="relative mx-auto aspect-square w-full max-w-[420px] [container-type:size]">
          <div className="absolute inset-[14%] rounded-full border border-edge" />
          <div className="absolute inset-[30%] rounded-full border border-dashed border-edge" />
          <div className="parallax absolute inset-0 [--depth:10]">
          <div className="absolute inset-0 animate-[spin_60s_linear_infinite] motion-reduce:animate-none">
            {tools.modules.map((m, i) => (
              <span
                key={m}
                className="absolute left-1/2 top-1/2 whitespace-nowrap"
                style={{ "--a": `${(360 / tools.modules.length) * i}deg`, transform: "translate(-50%,-50%) rotate(var(--a)) translateY(-36cqw) rotate(calc(-1 * var(--a)))" } as Vars}
              >
                <span className="flex animate-[spin_60s_linear_infinite_reverse] items-center gap-1.5 rounded-full border border-edge bg-panel px-3 py-1.5 text-[12px] font-medium text-fg motion-reduce:animate-none sm:text-[13px]">
                  <span className={`h-1.5 w-1.5 rounded-full ${moduleDot(m)}`} />
                  {m}
                </span>
              </span>
            ))}
          </div>
          </div>
          <div className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2">
            <div className="parallax grid h-full w-full place-items-center rounded-[28%] border border-edge bg-panel [--depth:-6]">
              <BrandMark className="h-[58%] w-[72%]" variant="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
