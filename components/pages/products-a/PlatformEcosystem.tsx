"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Database } from "lucide-react";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { swap } from "@/components/site-ui/motion-tokens";
import { MODULES, MODULE_BY_ID } from "./lms-data";
import { MODULE_MINIS } from "./minis";
import { MockCaption, box, panelDomId, tabDomId } from "./shared";

// The platform as a diagram you can poke: one database in the middle, eight
// modules around it. The active module's line animates into the database and
// a panel shows its interface. It steps through the modules on its own while
// visible, and stops the moment you interact.

const ID = "eco";
const R = 36; // ring radius, % of the square
const r2 = (n: number) => Math.round(n * 100) / 100;
const POS = MODULES.map((_, i) => {
  const a = ((-90 + i * (360 / MODULES.length)) * Math.PI) / 180;
  return { x: r2(50 + R * Math.cos(a)), y: r2(50 + R * Math.sin(a)) };
});

export function PlatformEcosystem() {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [active, select] = useAutoplay(MODULES.length, { interval: 3800, running: inView && !reduced && !paused && !interacted });
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const mod = MODULES[active];
  const Mini = MODULE_MINIS[mod.id];
  const linked = new Set(mod.shares);

  const pick = (i: number, focus = false) => {
    setInteracted(true);
    select(i);
    if (focus) refs.current[i]?.focus();
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = MODULES.length;
    let to = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") to = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") to = (i - 1 + n) % n;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = n - 1;
    else return;
    e.preventDefault();
    pick(to, true);
  };

  return (
    <div
      ref={root}
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* ---- the diagram ---- */}
      <div className="relative mx-auto aspect-square w-full max-w-[580px]">
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <circle cx="50" cy="50" r={R} fill="none" strokeWidth="0.25" strokeDasharray="0.8 1.6" style={{ stroke: "rgb(var(--border-strong))" }} />
          <circle cx="50" cy="50" r="22" fill="none" strokeWidth="0.25" style={{ stroke: "rgb(var(--border))" }} />
          {MODULES.map((m, i) => {
            const on = i === active;
            const sh = linked.has(m.id);
            return (
              <line
                key={m.id}
                x1={POS[i].x}
                y1={POS[i].y}
                x2="50"
                y2="50"
                strokeLinecap="round"
                className={clsx(on && !reduced && "animate-flow")}
                strokeDasharray={on ? "2 2" : undefined}
                strokeWidth={on ? 0.7 : 0.3}
                style={{
                  stroke: on ? "rgb(var(--primary))" : sh ? "rgb(var(--primary) / 0.45)" : "rgb(var(--border-strong))",
                  transition: "stroke 0.3s, stroke-width 0.3s",
                }}
              />
            );
          })}
          {!reduced && inView ? (
            <motion.circle
              key={active}
              r="1.3"
              fill="rgb(var(--primary))"
              initial={{ cx: POS[active].x, cy: POS[active].y, opacity: 0 }}
              animate={{ cx: [POS[active].x, 50], cy: [POS[active].y, 50], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", repeatDelay: 0.2 }}
            />
          ) : null}
        </svg>

        {/* hub */}
        <div className="absolute left-1/2 top-1/2 z-10 grid aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 place-items-center">
          {!reduced && inView ? <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-primary/40 [animation-duration:2.8s]" /> : null}
          <span className="absolute inset-0 rounded-full border border-edge-strong bg-panel shadow-soft" />
          <span className="relative flex flex-col items-center px-1 text-center">
            <span className="grid h-[34%] min-h-9 w-[34%] min-w-9 place-items-center rounded-full bg-navy text-primary-ink">
              <Database aria-hidden className="h-[55%] w-[55%]" />
            </span>
            <span className="mt-1.5 text-[11px] font-semibold leading-tight sm:text-[13.5px]">VILMS</span>
            <span className="text-[9.5px] leading-tight text-fg-muted sm:text-[11px]">one platform</span>
          </span>
        </div>

        {/* modules */}
        <div role="tablist" aria-label="Key features" aria-orientation="vertical" className="pointer-events-none absolute inset-0">
          {MODULES.map((m, i) => {
            const on = i === active;
            const sh = linked.has(m.id);
            return (
              <button
                key={m.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                id={tabDomId(ID, m.id)}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={panelDomId(ID)}
                tabIndex={on ? 0 : -1}
                onClick={() => pick(i)}
                onFocus={() => setInteracted(true)}
                onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}
                onKeyDown={(e) => onKey(e, i)}
                style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
                className={clsx(
                  "group pointer-events-auto absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-xl p-1 outline-offset-2",
                  POS[i].y < 40 ? "flex-col-reverse" : "flex-col",
                )}
              >
                <span
                  className={clsx(
                    "grid h-[50px] w-[50px] place-items-center rounded-full border transition duration-300 sm:h-[64px] sm:w-[64px]",
                    on
                      ? "scale-110 border-primary bg-primary text-primary-ink shadow-[0_10px_30px_-8px_rgb(var(--primary)/0.6)]"
                      : sh
                        ? "border-primary/50 bg-primary-tint text-primary"
                        : "border-edge-strong bg-panel text-fg-muted group-hover:border-primary group-hover:text-primary",
                  )}
                >
                  <m.Icon aria-hidden className="h-[22px] w-[22px] sm:h-6 sm:w-6" />
                </span>
                <span className={clsx("whitespace-nowrap text-[11px] font-medium transition-colors sm:text-[13px]", on ? "text-fg" : "text-fg-muted")}>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- the panel ---- */}
      <div id={panelDomId(ID)} role="tabpanel" aria-labelledby={tabDomId(ID, mod.id)} className="min-w-0 lg:min-h-[470px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={mod.id} {...swap}>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-tint text-primary">
                <mod.Icon aria-hidden className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[26px] font-medium leading-none tracking-[-0.03em] sm:text-[30px]">{mod.label}</h3>
              </div>
            </div>
            <p className="mt-4 max-w-[460px] text-[16.5px] leading-relaxed text-fg-muted">{mod.line}</p>

            <div className={clsx(box, "mt-5 p-4 shadow-window sm:p-5")}>
              <Mini />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[12.5px] text-fg-muted">Works together with</span>
              {mod.shares.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => pick(MODULES.findIndex((x) => x.id === id))}
                  className="group inline-flex items-center gap-1 rounded-full border border-edge bg-panel px-2.5 py-1 text-[12.5px] font-medium transition hover:border-primary hover:text-primary"
                >
                  {MODULE_BY_ID[id].label}
                  <ArrowUpRight aria-hidden className="h-3 w-3 text-fg-faint transition group-hover:text-primary" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <MockCaption className="mt-5" />
      </div>
    </div>
  );
}
