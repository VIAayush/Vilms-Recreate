import { Check } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { finalCta, hero, tools } from "@/lib/content";
import { BrandMark } from "../BrandMark";
import { Magnetic } from "../Magnetic";

type Vars = React.CSSProperties & Record<`--${string}`, string>;

export function FinalCta() {
  return (
    <section id="final-cta" aria-labelledby="final-title" className="px-2 pb-2 sm:px-4 sm:pb-4">
      <div
        className="stage-dark grain relative isolate overflow-hidden rounded-[32px] py-20 sm:rounded-[44px] sm:py-28"
        style={{
          backgroundImage:
            "radial-gradient(60% 80% at 100% 0%, rgb(91 61 245 / 0.55), transparent 60%), radial-gradient(50% 70% at 85% 100%, rgb(37 99 235 / 0.35), transparent 60%), radial-gradient(30% 40% at 70% 60%, rgb(255 155 47 / 0.18), transparent 70%)",
        }}
      >
        <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <h2 id="final-title" className="display text-[clamp(38px,5.6vw,80px)]">
              {finalCta.title}
            </h2>
            <p className="sub mt-6 max-w-[520px] text-fg/75">{finalCta.sub}</p>
            <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <Magnetic>
                <Cta intent="demo" location="final_cta" className="cta cta-accent cta-lg w-full min-[420px]:w-auto" arrow>
                  Book a Demo
                </Cta>
              </Magnetic>
              <Cta intent="trial" location="final_cta" className="cta cta-lg border border-white/25 text-white hover:border-white/60 hover:bg-white/5">
                Start 14-Day Free Trial
              </Cta>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-fg/70">
              {hero.proof.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check aria-hidden className="h-3.5 w-3.5 text-mint" strokeWidth={3} /> {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Everything, one platform: the modules held in orbit around the mark. */}
          <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[420px] [container-type:size]">
            <div className="absolute inset-[14%] rounded-full border border-white/10" />
            <div className="absolute inset-[30%] rounded-full border border-white/10" />
            <div className="absolute inset-0 animate-[spin_60s_linear_infinite] motion-reduce:animate-none">
              {tools.modules.map((m, i) => (
                <span
                  key={m}
                  className="absolute left-1/2 top-1/2 whitespace-nowrap"
                  style={{ "--a": `${(360 / tools.modules.length) * i}deg`, transform: "translate(-50%,-50%) rotate(var(--a)) translateY(-36cqw) rotate(calc(-1 * var(--a)))" } as Vars}
                >
                  <span className="block animate-[spin_60s_linear_infinite_reverse] rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-white/85 backdrop-blur motion-reduce:animate-none sm:text-[13px]">
                    {m}
                  </span>
                </span>
              ))}
            </div>
            <div className="absolute left-1/2 top-1/2 grid h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28%] bg-white/[0.08] shadow-[0_0_80px_rgb(91_61_245/0.6)] ring-1 ring-white/15">
              <BrandMark className="h-[64%] w-[64%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
