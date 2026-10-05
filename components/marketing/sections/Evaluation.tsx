"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { Check, PenLine, ShieldCheck, Sparkles, Upload } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { evaluation } from "@/lib/content";
import { useAutoplay, useInView, useReducedMotion } from "../motion";
import { Avatar, Illustrative } from "../screens/primitives";

const STEP_MS = 3200;
const FACTS = [
  { Icon: Sparkles, tone: "text-indigo" },
  { Icon: ShieldCheck, tone: "text-primary" },
  { Icon: Check, tone: "text-green" },
];

// Handwritten answer → AI draft → mentor review → approve → evaluated copy.
// The visual is one answer sheet whose annotations change with each step.
export function Evaluation() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const reduced = useReducedMotion();
  const [hold, setHold] = useState(false);
  const [step, select] = useAutoplay(evaluation.steps.length, { interval: STEP_MS, running: inView && !reduced && !hold });

  return (
    <section
      ref={ref}
      id="ai"
      aria-labelledby="ai-title"
      data-glow
      style={{ "--glow": "var(--indigo)" } as React.CSSProperties}
      className="band-dark glow-section"
    >
      <div className="py-24 sm:py-32">

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
                      className={clsx("group grid w-full grid-cols-[28px_1fr] gap-x-3 rounded-2xl px-3 py-3 text-left transition-colors", on ? "bg-primary-tint" : "hover:bg-sunken")}
                    >
                      <span
                        className={clsx(
                          "mt-0.5 grid h-7 w-7 place-items-center rounded-full font-mono text-[11px] transition-colors",
                          i < step ? "bg-green-tint text-green" : on ? "bg-primary text-primary-ink" : "bg-sunken text-fg-muted",
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

        <div className="wrap mt-16 grid gap-6 border-t border-edge pt-10 sm:grid-cols-3 lg:mt-20">
          {evaluation.facts.map((f, i) => {
            const { Icon, tone } = FACTS[i];
            return (
              <div key={f.title} className="flex gap-3">
                <Icon aria-hidden className={clsx("mt-0.5 h-5 w-5 shrink-0", tone)} />
                <p className="text-[15px] leading-snug">
                  <b className="font-semibold">{f.title}.</b> <span className="text-fg-muted">{f.text}</span>
                </p>
              </div>
            );
          })}
        </div>
        <div className="wrap mt-10">
          <Cta intent="demo" location="ai_evaluation" className="cta cta-outline" arrow>
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
    <div className="relative" data-tilt="2.5">
      {/* The answer sheet */}
      <figure className="answer-sheet with-margin relative overflow-hidden rounded-xl border border-edge p-5 pb-10 pl-12 shadow-window [--rule:28px] sm:-rotate-[1deg] sm:p-7 sm:pb-24 sm:pl-14 sm:pr-[178px]">
        <figcaption className="paper-muted mb-3 flex items-center justify-between font-sans text-[11px]">
          <span>Q3 · Answer sheet · page 1 of 2</span>
          <span>Rahul K.</span>
        </figcaption>
        <div className="font-hand text-[18px] leading-[28px] sm:text-[20px]">
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
        {step === 0 ? <span aria-hidden className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-primary/15 to-transparent [animation:scan_2.4s_ease-in-out_infinite]" /> : null}

        {/* final stamp */}
        <div
          className={clsx(
            "paper-stamp absolute bottom-4 right-4 rotate-[-8deg] rounded-xl border-[3px] px-3 py-1.5 text-center font-sans transition-all duration-500",
            final ? "scale-100 opacity-100" : "scale-125 opacity-0",
          )}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.18em]">Evaluated</p>
          <p className="font-display text-[22px] font-bold leading-none">{total}/20</p>
        </div>
      </figure>

      {/* The rubric / review panel */}
      <div className="relative z-10 -mt-6 ml-auto w-[calc(100%-16px)] rounded-xl border border-edge bg-panel p-4 shadow-window sm:-mt-20 sm:mr-[-8px] sm:w-[340px]">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[13px] font-semibold">Rubric · 20 marks</p>
          <span
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors",
              approved ? "bg-green-tint text-green" : reviewing ? "bg-yellow-tint text-yellow-ink" : drafted ? "bg-primary-tint text-primary" : "bg-sunken text-fg-muted",
            )}
          >
            {approved ? <Check aria-hidden className="h-3 w-3" /> : reviewing ? <PenLine aria-hidden className="h-3 w-3" /> : drafted ? <Sparkles aria-hidden className="h-3 w-3" /> : <Upload aria-hidden className="h-3 w-3" />}
            {approved ? "Approved" : reviewing ? "In review" : drafted ? "AI draft" : "Uploaded"}
          </span>
        </div>

        <ul className="mt-4 space-y-3 text-[12.5px]">
          <Criterion label="Content" max={8} value={drafted ? content : null} was={reviewing ? 6 : null} draft={drafted && !approved} />
          <Criterion label="Structure" max={4} value={drafted ? 3 : null} draft={drafted && !approved} />
          <Criterion label="Examples" max={4} value={drafted ? 3 : null} draft={drafted && !approved} />
          <Criterion label="Language" max={4} value={drafted ? 3 : null} draft={drafted && !approved} />
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-edge pt-3">
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
          <span className={clsx("flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-[12px] font-semibold transition-colors", reviewing && !approved ? "border-yellow bg-yellow-tint text-yellow-ink" : "border-edge text-fg-muted")}>
            <PenLine aria-hidden className="h-3.5 w-3.5" /> Edit
          </span>
          <span
            className={clsx(
              "flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-semibold transition-all duration-300",
              approved ? "bg-green text-primary-ink" : "bg-sunken text-fg-muted",
              step === 3 && "scale-[1.03]",
            )}
          >
            <Check aria-hidden className="h-3.5 w-3.5" /> Approve
          </span>
        </div>
        <p className={clsx("mt-3 text-[11.5px] transition-opacity duration-500", final ? "text-green opacity-100" : "opacity-0")}>
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
        tone === "info" ? "paper-mark-ai" : "paper-mark-warn",
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
        edited ? "paper-note-mentor" : "paper-note-ai",
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
      <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-sunken">
        <span
          className={clsx("block h-full rounded-full transition-[width] duration-700 ease-out", draft ? "bg-primary [background-image:repeating-linear-gradient(90deg,transparent_0_6px,rgb(255_255_255/0.45)_6px_8px)]" : "bg-green")}
          style={{ width: value == null ? "0%" : `${(value / max) * 100}%` }}
        />
      </span>
    </li>
  );
}
