"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { Check, PenLine, ShieldCheck, Sparkles, Upload } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { evaluation } from "@/lib/content";
import { useAutoplay, useInView, useReducedMotion } from "../motion";
import { Avatar, Illustrative } from "../screens/primitives";

const STEP_MS = 3200;
const FACT_ICONS = [Sparkles, ShieldCheck, Check];

// Handwritten answer → AI draft → mentor review → approve → evaluated copy.
// The visual is one answer sheet whose annotations change with each step.
export function Evaluation() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const reduced = useReducedMotion();
  const [hold, setHold] = useState(false);
  const [step, select] = useAutoplay(evaluation.steps.length, { interval: STEP_MS, running: inView && !reduced && !hold });

  return (
    <section ref={ref} id="ai" aria-labelledby="ai-title" className="px-2 sm:px-4">
      <div className="stage-dark grain relative isolate overflow-hidden rounded-[32px] py-20 sm:rounded-[44px] sm:py-28">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[120px]" />

        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p className="kicker">{evaluation.kicker}</p>
            <h2 id="ai-title" className="h2 mt-4">
              {evaluation.titleTop}
              <span className="serif-accent block text-fg-muted">{evaluation.titleBottom}</span>
            </h2>
            <p className="sub mt-6 max-w-[460px]">{evaluation.sub}</p>

            <ol className="mt-10 space-y-1" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
              {evaluation.steps.map((s, i) => {
                const on = i === step;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={on ? "step" : undefined}
                      className={clsx("group grid w-full grid-cols-[28px_1fr] gap-x-3 rounded-2xl px-3 py-3 text-left transition-colors", on ? "bg-white/[0.06]" : "hover:bg-white/[0.03]")}
                    >
                      <span
                        className={clsx(
                          "mt-0.5 grid h-7 w-7 place-items-center rounded-full font-mono text-[11px] transition-colors",
                          i < step ? "bg-primary/25 text-primary" : on ? "bg-primary text-primary-ink" : "bg-white/10 text-fg-muted",
                        )}
                      >
                        {i < step ? <Check aria-hidden className="h-3.5 w-3.5" /> : i + 1}
                      </span>
                      <span className={clsx("text-[16px] font-semibold transition-colors", on ? "text-fg" : "text-fg-muted group-hover:text-fg")}>{s.label}</span>
                      <span
                        className={clsx(
                          "col-start-2 grid text-[14px] text-fg-muted transition-[grid-template-rows,opacity] duration-500",
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-1">{s.text}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="lg:pt-6">
            <AnswerVisual step={step} />
            <Illustrative className="mt-4" />
          </div>
        </div>

        <div className="wrap mt-16 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3 lg:mt-20">
          {evaluation.facts.map((f, i) => {
            const Icon = FACT_ICONS[i];
            return (
              <div key={f.title} className="flex gap-3">
                <Icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-[15px] leading-snug">
                  <b className="font-semibold">{f.title}.</b> <span className="text-fg-muted">{f.text}</span>
                </p>
              </div>
            );
          })}
        </div>
        <div className="wrap mt-10">
          <Cta intent="demo" location="ai_evaluation" className="cta cta-accent" arrow>
            See evaluation in a demo
          </Cta>
        </div>
      </div>
    </section>
  );
}

function AnswerVisual({ step }: { step: number }) {
  const drafted = step >= 1;
  const reviewing = step >= 2;
  const approved = step >= 3;
  const final = step >= 4;
  const content = reviewing ? 7 : 6;
  const total = content + 3 + 3 + 3;

  return (
    <div className="relative">
      {/* The answer sheet */}
      <figure className="relative overflow-hidden rounded-2xl bg-[#fbf8ef] p-5 pb-10 text-[#2b2a6b] shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)] sm:-rotate-[1.2deg] sm:p-7 sm:pb-24 sm:pr-[178px]">
        <figcaption className="mb-3 flex items-center justify-between font-sans text-[11px] text-[#2b2a6b]/60">
          <span>Q3 · Answer sheet · page 1 of 2</span>
          <span>Rahul K.</span>
        </figcaption>
        <div className="font-hand text-[18px] leading-[28px] sm:text-[20px] [background-image:repeating-linear-gradient(transparent,transparent_27px,rgb(43_42_107/0.14)_27px,rgb(43_42_107/0.14)_28px)]">
          <p>
            The Directive Principles of State Policy guide the state in making{" "}
            <Mark on={drafted}>laws for social and economic welfare</Mark>.
          </p>
          <p>
            Art. 38 directs the state to secure a social order with justice — social, economic and political.
          </p>
          <p>
            <Mark on={drafted} tone="warn">They are not enforceable by courts</Mark>, yet they are fundamental in governance…
          </p>
        </div>

        {/* margin notes */}
        <div className="pointer-events-none absolute right-5 top-16 hidden w-[146px] space-y-14 sm:block">
          <MarginNote on={drafted} edited={reviewing}>
            {reviewing ? "Good — cite Art. 39(b)" : "Relevant, add an article"}
          </MarginNote>
          <MarginNote on={drafted}>Add a case example</MarginNote>
        </div>

        {/* scan line while uploading */}
        {step === 0 ? <span aria-hidden className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-[rgb(91_61_245/0.18)] to-transparent [animation:scan_2.4s_ease-in-out_infinite]" /> : null}

        {/* final stamp */}
        <div
          className={clsx(
            "absolute bottom-4 right-4 rotate-[-8deg] rounded-xl border-[3px] border-[#16a36a] px-3 py-1.5 text-center font-sans text-[#16a36a] transition-all duration-500",
            final ? "scale-100 opacity-100" : "scale-125 opacity-0",
          )}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.18em]">Evaluated</p>
          <p className="font-display text-[22px] font-bold leading-none">{total}/20</p>
        </div>
      </figure>

      {/* The rubric / review panel */}
      <div className="relative z-10 -mt-6 ml-auto w-[calc(100%-16px)] rounded-2xl border border-white/10 bg-panel p-4 shadow-window sm:-mt-20 sm:mr-[-8px] sm:w-[340px]">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[13px] font-semibold">Rubric · 20 marks</p>
          <span
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors",
              approved ? "bg-mint/15 text-mint" : drafted ? "bg-primary/15 text-primary" : "bg-white/10 text-fg-muted",
            )}
          >
            {approved ? <Check aria-hidden className="h-3 w-3" /> : drafted ? <Sparkles aria-hidden className="h-3 w-3" /> : <Upload aria-hidden className="h-3 w-3" />}
            {approved ? "Approved" : drafted ? "AI draft" : "Uploaded"}
          </span>
        </div>

        <ul className="mt-4 space-y-3 text-[12.5px]">
          <Criterion label="Content" max={8} value={drafted ? content : null} was={reviewing ? 6 : null} draft={drafted && !approved} />
          <Criterion label="Structure" max={4} value={drafted ? 3 : null} draft={drafted && !approved} />
          <Criterion label="Examples" max={4} value={drafted ? 3 : null} draft={drafted && !approved} />
          <Criterion label="Language" max={4} value={drafted ? 3 : null} draft={drafted && !approved} />
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-[12px] text-fg-muted">Total</span>
          <span className="font-display text-[22px] font-semibold tabular-nums">{drafted ? `${total}/20` : "—"}</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="flex items-center gap-2 text-[11.5px] text-fg-muted">
            <Avatar name="Meera Iyer" size="sm" tone={1} />
            {reviewing ? (approved ? "Approved by Meera (mentor)" : "Meera is reviewing…") : "Mentor: Meera"}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className={clsx("flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-[12px] font-semibold transition-colors", reviewing && !approved ? "border-primary/50 text-primary" : "border-white/10 text-fg-muted")}>
            <PenLine aria-hidden className="h-3.5 w-3.5" /> Edit
          </span>
          <span
            className={clsx(
              "flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-semibold transition-all duration-300",
              approved ? "bg-mint text-[rgb(11_10_16)]" : "bg-white/10 text-fg-muted",
              step === 3 && "scale-[1.03]",
            )}
          >
            <Check aria-hidden className="h-3.5 w-3.5" /> Approve
          </span>
        </div>
        <p className={clsx("mt-3 text-[11.5px] transition-opacity duration-500", final ? "text-mint opacity-100" : "opacity-0")}>
          Sent to Rahul · saved to his profile
        </p>
      </div>
    </div>
  );
}

function Mark({ on, tone = "info", children }: { on: boolean; tone?: "info" | "warn"; children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "bg-no-repeat transition-[background-size] duration-700 ease-out [background-position:0_88%]",
        tone === "info" ? "bg-[linear-gradient(rgb(91_61_245/0.22),rgb(91_61_245/0.22))]" : "bg-[linear-gradient(rgb(255_155_47/0.35),rgb(255_155_47/0.35))]",
        on ? "[background-size:100%_40%]" : "[background-size:0%_40%]",
      )}
    >
      {children}
    </span>
  );
}

function MarginNote({ on, edited, children }: { on: boolean; edited?: boolean; children: React.ReactNode }) {
  return (
    <p
      className={clsx(
        "rounded-lg border border-dashed px-2 py-1.5 font-sans text-[10.5px] leading-snug transition-all duration-500",
        edited ? "border-[#16a36a]/60 bg-[#16a36a]/10 text-[#0f6b47]" : "border-[#5b3df5]/50 bg-[#5b3df5]/[0.08] text-[#4026c9]",
        on ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0",
      )}
    >
      <b className="mr-1">{edited ? "Mentor" : "AI"}</b>
      {children}
    </p>
  );
}

function Criterion({ label, value, max, was, draft }: { label: string; value: number | null; max: number; was?: number | null; draft: boolean }) {
  return (
    <li>
      <div className="flex items-center justify-between">
        <span className="text-fg-muted">{label}</span>
        <span className="font-mono tabular-nums">
          {was != null && was !== value ? <s className="mr-1.5 text-fg-faint">{was}</s> : null}
          {value ?? "–"}/{max}
        </span>
      </div>
      <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/10">
        <span
          className={clsx("block h-full rounded-full transition-[width] duration-700 ease-out", draft ? "bg-primary/70 [background-image:repeating-linear-gradient(90deg,transparent_0_6px,rgb(0_0_0/0.25)_6px_8px)]" : "bg-mint")}
          style={{ width: value == null ? "0%" : `${(value / max) * 100}%` }}
        />
      </span>
    </li>
  );
}
