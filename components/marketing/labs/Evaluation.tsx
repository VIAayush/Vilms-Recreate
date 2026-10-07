import { Cta } from "@/components/site/Cta";
import { EvalFlow } from "../screens/EvalFlow";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PAGES } from "@/lib/site/pages";

// AI-assisted evaluation: a dark stage with the flow playing on a sheet of
// paper — handwritten answer, AI analysis, draft, mentor review, approved.
export function Evaluation() {
  return (
    <section id="evaluation" className="scroll-mt-20 py-10 sm:py-16">
      <div className="wrap">
        <div className="band-navy relative isolate overflow-hidden rounded-[32px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16">
          <div aria-hidden className="grid-bg-dark pointer-events-none absolute inset-0 -z-10" />

          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[rgb(160_199_238)]">AI-Assisted Evaluation</p>
              <h2 className="mt-4 max-w-[720px] text-[clamp(34px,4.8vw,60px)] font-normal leading-[1.05] tracking-[-0.035em] text-white">
                AI drafts. Your mentor decides.
              </h2>
              <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/75">Handwritten answers, checked against your rubric. Nothing reaches a student until a mentor approves it.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={PAGES.aiEvaluation.path} className="cta cta-lg rounded-full bg-white text-[rgb(0_48_86)] hover:bg-[rgb(220_234_250)]">
                How it works <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Cta intent="demo" location="evaluation" className="cta cta-lg rounded-full border border-white/35 text-white hover:border-white hover:bg-white/10">
                Book a Demo
              </Cta>
            </div>
          </div>

          <div className="band-light mt-12 rounded-[24px] bg-canvas p-4 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)] sm:p-6">
            <EvalFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
