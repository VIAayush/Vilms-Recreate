"use client";

import { Check } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { finalCta, hero } from "@/lib/content";
import { Magnetic } from "../Magnetic";
import { LiveDashboard } from "../screens/LiveDashboard";

// The closing moment: one question, two buttons, and the product still
// quietly running behind them.
export function FinalCta() {
  return (
    <section id="final-cta" aria-labelledby="final-title" className="band-dark relative isolate overflow-hidden py-28 sm:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[52%] w-[1100px] max-w-none -translate-x-1/2 opacity-30 blur-[1.5px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] sm:top-[48%]" style={{ transform: "translateX(-50%) perspective(1600px) rotateX(24deg) scale(1.05)" }}>
          <LiveDashboard />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(23_23_23/0.7),rgb(23_23_23)_70%)]" />
      </div>
      <div className="wrap relative text-center">
        <h2 id="final-title" className="display mx-auto max-w-[16ch] text-balance text-[clamp(38px,6vw,84px)] text-white">
          {finalCta.title}
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 min-[460px]:flex-row">
          <Magnetic>
            <Cta intent="trial" location="final_cta" className="cta cta-primary cta-lg w-full min-[460px]:w-auto" arrow>
              Start 14-Day Free Trial
            </Cta>
          </Magnetic>
          <Cta intent="demo" location="final_cta" className="cta cta-outline cta-lg w-full min-[460px]:w-auto">
            Book a Demo
          </Cta>
        </div>
        <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[13.5px] text-white/70">
          {hero.proof.map((p) => (
            <li key={p} className="flex items-center gap-1.5">
              <Check aria-hidden className="h-3.5 w-3.5 text-green" strokeWidth={3} /> {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
