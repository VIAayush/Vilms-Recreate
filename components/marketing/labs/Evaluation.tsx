import { Cta } from "@/components/site/Cta";
import { EvalFlow } from "../screens/EvalFlow";
import { Shape } from "./Shapes";

// AI-assisted evaluation: a dark stage with the flow playing on a sheet of
// paper — handwritten answer, AI analysis, draft, mentor review, approved.
export function Evaluation() {
  return (
    <section id="evaluation" className="scroll-mt-20 py-10 sm:py-16">
      <div className="wrap">
        <div className="band-navy relative isolate overflow-hidden rounded-[32px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16">
          <Shape kind="squircle" className="absolute -left-24 -top-24 -z-10 w-72 rotate-12 text-[rgb(29_99_180/0.35)]" />
          <Shape kind="circle" className="absolute -bottom-32 -right-24 -z-10 w-96 text-[rgb(201_162_75/0.22)]" />

          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[rgb(160_199_238)]">AI-Assisted Evaluation</p>
              <h2 className="mt-4 max-w-[720px] text-[clamp(34px,4.8vw,60px)] font-normal leading-[1.05] tracking-[-0.035em] text-white">
                AI drafts. Your mentor decides.
              </h2>
              <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/75">Handwritten answers, checked against your rubric. Nothing reaches a student until a mentor approves it.</p>
            </div>
            <Cta intent="demo" location="evaluation" className="cta cta-lg rounded-full bg-white text-[rgb(0_48_86)] hover:bg-[rgb(220_234_250)]">
              Book a Demo
            </Cta>
          </div>

          <div className="band-light mt-12 rounded-[24px] bg-canvas p-4 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)] sm:p-6">
            <EvalFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
