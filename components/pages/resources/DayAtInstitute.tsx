"use client";

import { useId, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BookOpenCheck, Check, ClipboardCheck, HandCoins, MessagesSquare, ScanText, UserPlus, Users, type LucideIcon } from "lucide-react";
import { useMediaQuery } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { STAGES, type Stage, type StageId } from "./day-data";

type Mode = "traditional" | "lms";

const ICON: Record<StageId, LucideIcon> = {
  admissions: UserPlus,
  classes: BookOpenCheck,
  tests: ClipboardCheck,
  evaluation: ScanText,
  fees: HandCoins,
  followup: MessagesSquare,
};

const MODE_LABEL: Record<Mode, string> = { traditional: "Traditional", lms: "With an LMS" };

function PanelBody({ mode, stage }: { mode: Mode; stage: Stage }) {
  const d = mode === "traditional" ? stage.traditional : stage.lms;
  const trad = mode === "traditional";
  return (
    <div>
      <p className={clsx("inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]", trad ? "text-fg-faint" : "text-primary")}>
        <span aria-hidden className={clsx("h-1.5 w-1.5 rounded-full", trad ? "bg-fg-faint" : "bg-primary")} />
        {MODE_LABEL[mode]}
      </p>
      <h4 className="mt-3 font-display text-[clamp(22px,2.4vw,30px)] font-medium leading-[1.1] tracking-[-0.03em]">{d.title}</h4>
      <ul className="mt-5 space-y-3">
        {d.points.map((p, i) => (
          <motion.li
            key={p}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 + i * 0.07, ease: EASE }}
            className="relative pl-5 text-[15.5px] leading-snug text-fg-muted before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-edge-strong"
          >
            {p}
          </motion.li>
        ))}
      </ul>
      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tools involved">
        {d.tools.map((t) => (
          <li key={t} className={clsx("rounded-full px-3 py-1 text-[12.5px] font-medium", trad ? "border border-dashed border-edge-strong text-fg-muted" : "bg-primary-tint text-primary")}>
            {t}
          </li>
        ))}
      </ul>
      {trad ? (
        <p className="mt-6 flex gap-2.5 border-t border-edge pt-4 text-[14px] leading-snug text-fg-muted">
          <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={3} />
          <span>
            <span className="font-medium text-fg">What it does well. </span>
            {stage.traditional.strength}
          </span>
        </p>
      ) : null}
    </div>
  );
}

/**
 * "A day at the institute": six stages from admissions to follow-up, each
 * shown the traditional way and with an LMS. On desktop both panels are on
 * screen and the toggle shifts the weight between them; on phones one panel
 * swaps for the other. Always fair to the classroom: every stage says what
 * the traditional way does well and what stays in the room.
 */
export function DayAtInstitute() {
  const uid = useId();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [mode, setMode] = useState<Mode>("traditional");
  const [stageId, setStageId] = useState<StageId>("admissions");
  const railRef = useRef<HTMLDivElement>(null);
  const stage = STAGES.find((s) => s.id === stageId)!;
  const index = STAGES.indexOf(stage);

  const move = (to: number) => {
    const next = (to + STAGES.length) % STAGES.length;
    setStageId(STAGES[next].id);
    railRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  };

  const onRailKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      move(index + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      move(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(0);
    } else if (e.key === "End") {
      e.preventDefault();
      move(STAGES.length - 1);
    }
  };

  const onModeKey = (e: React.KeyboardEvent) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      setMode((m) => (m === "traditional" ? "lms" : "traditional"));
    }
  };

  const trad = mode === "traditional";

  return (
    <div>
      {/* the switch */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="radiogroup" aria-label="How the day runs" onKeyDown={onModeKey} className="relative grid w-full grid-cols-2 rounded-full border border-edge-strong bg-panel p-1 sm:w-[380px]">
          {(Object.keys(MODE_LABEL) as Mode[]).map((m) => {
            const on = mode === m;
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setMode(m)}
                className={clsx("relative rounded-full px-4 py-3 text-[15px] font-semibold transition-colors", on ? "text-canvas" : "text-fg-muted hover:text-fg")}
              >
                {on ? <motion.span layoutId={`${uid}-thumb`} transition={{ duration: 0.4, ease: EASE }} className="absolute inset-0 rounded-full bg-navy" /> : null}
                <span className="relative">{MODE_LABEL[m]}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[14px] text-fg-muted">Same institute. Same faculty. Same students.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
        {/* the day, as a rail */}
        <div
          ref={railRef}
          role="tablist"
          aria-label="Stages of the day"
          aria-orientation={desktop ? "vertical" : "horizontal"}
          onKeyDown={onRailKey}
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-edge lg:px-0 lg:pb-0"
        >
          {STAGES.map((s, i) => {
            const on = s.id === stageId;
            const Icon = ICON[s.id];
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                id={`${uid}-tab-${s.id}`}
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setStageId(s.id)}
                className={clsx(
                  "group relative flex shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 text-left transition-colors lg:rounded-none lg:border-0 lg:py-4 lg:pl-6 lg:pr-3",
                  on ? "border-navy bg-navy/5 text-fg lg:bg-transparent" : "border-edge text-fg-muted hover:text-fg",
                )}
              >
                {on ? <motion.span layoutId={`${uid}-stage`} transition={{ duration: 0.35, ease: EASE }} className="absolute -left-px top-0 hidden h-full w-[2px] bg-navy lg:block" /> : null}
                <span className={clsx("grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors lg:h-9 lg:w-9", on ? "bg-navy text-canvas" : "bg-sunken text-fg-muted group-hover:bg-primary-tint group-hover:text-primary")}>
                  <Icon aria-hidden className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10.5px] tabular-nums text-fg-faint">{s.time}</span>
                  <span className="block whitespace-nowrap text-[15px] font-medium lg:whitespace-normal lg:text-[16px]">{s.label}</span>
                </span>
                <span className="sr-only">{`Stage ${i + 1} of ${STAGES.length}`}</span>
              </button>
            );
          })}
        </div>

        {/* the panels */}
        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${stageId}`} tabIndex={0} className="min-w-0 outline-offset-4">
          {desktop ? (
            <div
              className="grid gap-5 transition-[grid-template-columns] duration-500 ease-out"
              style={{ gridTemplateColumns: trad ? "minmax(0,1.5fr) minmax(0,1fr)" : "minmax(0,1fr) minmax(0,1.5fr)" }}
            >
              {(["traditional", "lms"] as Mode[]).map((m) => {
                const on = mode === m;
                return (
                  <div
                    key={m}
                    className={clsx(
                      "relative rounded-[28px] border p-7 transition-[opacity,background-color,border-color,box-shadow] duration-500",
                      m === "traditional" ? "border-dashed bg-canvas-alt" : "bg-panel",
                      on ? (m === "lms" ? "border-primary/50 shadow-window" : "border-edge-strong shadow-soft") : "border-edge opacity-60",
                    )}
                  >
                    <motion.div key={stage.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
                      <PanelBody mode={m} stage={stage} />
                    </motion.div>
                    {!on ? (
                      <button type="button" onClick={() => setMode(m)} className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary">
                        Switch to {MODE_LABEL[m].toLowerCase()}
                        <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${mode}-${stage.id}`}
                initial={{ opacity: 0, x: trad ? -18 : 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: trad ? 18 : -18 }}
                transition={{ duration: 0.28, ease: EASE }}
                className={clsx("rounded-[24px] border p-5 sm:p-7", trad ? "border-dashed border-edge-strong bg-canvas-alt" : "border-primary/50 bg-panel shadow-window")}
              >
                <PanelBody mode={mode} stage={stage} />
              </motion.div>
            </AnimatePresence>
          )}

          {/* what stays, whichever side you are looking at */}
          <div className="mt-5 flex flex-col gap-4 rounded-[20px] border border-edge bg-sunken px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-3 text-[15px] leading-snug">
              <Users aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
              <span>
                <span className="font-medium">Still in the room. </span>
                <span className="text-fg-muted">{stage.stays}</span>
              </span>
            </p>
            <button type="button" onClick={() => move(index + 1)} className="inline-flex shrink-0 items-center gap-1.5 self-start text-[14px] font-medium text-primary sm:self-auto">
              Next: {STAGES[(index + 1) % STAGES.length].label}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
