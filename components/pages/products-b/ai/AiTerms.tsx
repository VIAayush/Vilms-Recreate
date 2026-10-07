"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, KeyRound, Lock } from "lucide-react";
import { Illustrative } from "@/components/marketing/screens/primitives";

type Provider = "Anthropic" | "OpenAI";

/**
 * "AI on your terms": the three things an institute actually controls, as a
 * settings window you can use. Provider switch, an allowance meter you can
 * drag, and the one setting that is deliberately not a switch.
 */
export function AiTerms() {
  const uid = useId();
  const [provider, setProvider] = useState<Provider>("Anthropic");
  const [used, setUsed] = useState(62);
  const level = used >= 100 ? "full" : used >= 80 ? "warn" : "ok";

  return (
    <div className="window rounded-[24px]">
      <div className="flex items-center justify-between border-b border-edge px-5 py-3">
        <p className="text-[13px] font-semibold">Settings · AI</p>
        <span className="font-mono text-[11px] text-fg-faint">ABC Academy</span>
      </div>

      {/* 1 · provider */}
      <section className="px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-[14px] font-semibold">
            <KeyRound aria-hidden className="h-4 w-4 text-primary" /> Your AI account
          </h3>
          <div role="radiogroup" aria-label="AI provider" className="inline-flex rounded-full border border-edge bg-canvas-alt p-0.5">
            {(["Anthropic", "OpenAI"] as const).map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={provider === p}
                onClick={() => setProvider(p)}
                className={clsx("relative min-h-[34px] rounded-full px-4 text-[13px] font-semibold transition-colors", provider === p ? "text-white" : "text-fg-muted hover:text-fg")}
              >
                {provider === p ? <motion.span layoutId={`${uid}-prov`} transition={{ type: "spring", stiffness: 420, damping: 34 }} className="absolute inset-0 rounded-full bg-navy" /> : null}
                <span className="relative">{p}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-edge bg-canvas-alt px-3.5 py-2.5">
          <span className="font-mono text-[13px] tracking-[0.2em] text-fg-muted">••••••••••••••••</span>
          <span className="ml-auto flex items-center gap-1.5 text-[12px] font-medium text-green">
            <span className="h-1.5 w-1.5 rounded-full bg-green" /> Connected
          </span>
        </div>
        <div className="mt-2.5 min-h-[20px] text-[13px] text-fg-muted">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={provider} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
              Billed to you by {provider}, at cost. VILMS markup: <b className="text-fg">0%</b>.
            </motion.p>
          </AnimatePresence>
        </div>
      </section>

      {/* 2 · allowance */}
      <section className="border-t border-edge px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-[14px] font-semibold">AI evaluations used this year</h3>
          <span className="font-mono text-[12.5px] tabular-nums text-fg-muted">{used}% of your plan&apos;s allowance</span>
        </div>
        <div className="relative mt-4">
          <span className="block h-2.5 overflow-hidden rounded-full bg-sunken">
            <span className={clsx("block h-full rounded-full transition-[width,background-color] duration-200", level === "ok" ? "bg-primary" : level === "warn" ? "bg-gold" : "bg-red")} style={{ width: `${used}%` }} />
          </span>
          <span aria-hidden className="absolute -top-1 bottom-[-4px] left-[80%] w-px bg-edge-strong" />
          <span aria-hidden className="absolute -bottom-6 left-[80%] -translate-x-1/2 font-mono text-[10px] text-fg-faint">
            80%
          </span>
        </div>
        <label className="sr-only" htmlFor={`${uid}-range`}>
          Simulate how much of the yearly allowance is used
        </label>
        <input
          id={`${uid}-range`}
          type="range"
          min={0}
          max={100}
          value={used}
          onChange={(e) => setUsed(Number(e.target.value))}
          className="price-range mt-6 w-full"
          style={{ ["--fill" as string]: `${used}%` }}
        />
        <p className={clsx("mt-1 min-h-[40px] rounded-lg px-3 py-2 text-[13px] transition-colors", level === "ok" ? "bg-canvas-alt text-fg-muted" : level === "warn" ? "bg-sunken text-yellow-text" : "bg-red-tint text-red")}>
          {level === "ok" ? "Drag to see what happens near the limit." : level === "warn" ? "80% reached: you get a heads-up. Everything keeps running." : "Allowance used: you are warned, and your site and classes keep running."}
        </p>
      </section>

      {/* 3 · training */}
      <section className="flex items-center gap-4 border-t border-edge px-5 py-5 sm:px-6">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-tint text-green">
          <Lock aria-hidden className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-semibold">Use student answers to train AI models</h3>
          <p className="text-[12.5px] text-fg-muted">Not a setting. It does not happen.</p>
        </div>
        <span role="img" aria-label="Off, locked" className="relative h-6 w-11 shrink-0 rounded-full bg-sunken ring-1 ring-inset ring-edge-strong">
          <span className="absolute left-0.5 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-panel shadow">
            <Check aria-hidden className="h-3 w-3 text-fg-faint" />
          </span>
        </span>
      </section>
      <div className="border-t border-edge px-5 py-3 sm:px-6">
        <Illustrative />
      </div>
    </div>
  );
}
