"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { Award, BookOpen, CreditCard, LayoutGrid, PenLine, Radio, UserRound, Users } from "lucide-react";
import { heroStory } from "@/lib/content";
import { useAutoplay, useInView, usePointerVars, useReducedMotion } from "../motion";
import { BrowserFrame, Illustrative, InstituteMark } from "../screens/primitives";
import { SCENES } from "../screens/scenes";

const NAV_ICONS = [Users, UserRound, BookOpen, Radio, PenLine, CreditCard, Award];
const INTERVAL = 2900;

// One student's journey, playing on a loop inside an illustrated VILMS admin:
// lead → enrolled → course → live class → evaluation → payment → certificate.
// Pauses on hover/focus and off screen; never autoplays under reduced motion.
export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const running = inView && !paused && !reduced;
  const [step, select] = useAutoplay(heroStory.length, { interval: INTERVAL, running });
  usePointerVars(ref);

  const current = heroStory[step];
  const recent = [0, 1, 2].map((k) => heroStory[(step - k + heroStory.length) % heroStory.length]);

  return (
    <div
      ref={ref}
      className="group/stage relative animate-rise-in [animation-delay:300ms]"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <BrowserFrame url="yourinstitute.vilms.in/admin" className="lg:mr-[-4vw] xl:mr-[-7vw]">
        {/* cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover/stage:opacity-100"
          style={{ background: "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--primary) / 0.07), transparent 65%)" }}
        />
        <div className="grid sm:grid-cols-[168px_minmax(0,1fr)]">
          <aside className="hidden border-r border-edge/10 p-3 sm:block" aria-label="Illustrated admin menu">
            <div className="mb-4 flex items-center gap-2 px-1.5">
              <InstituteMark className="h-7 w-7 text-[10px]" />
              <span className="text-[12.5px] font-semibold">Your Institute</span>
            </div>
            <ul className="space-y-0.5 text-[12.5px]">
              <li className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-fg-muted">
                <LayoutGrid aria-hidden className="h-3.5 w-3.5" /> Dashboard
              </li>
              {heroStory.map((s, i) => {
                const Icon = NAV_ICONS[i];
                return (
                  <li
                    key={s.id}
                    className={clsx(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-300",
                      i === step ? "bg-primary/10 font-semibold text-primary" : "text-fg-muted",
                    )}
                  >
                    <Icon aria-hidden className="h-3.5 w-3.5" /> {s.nav}
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="min-w-0 p-3.5 sm:p-5">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] text-fg-muted">Today at your institute</p>
                <p key={current.id} className="animate-rise-in truncate text-[17px] font-semibold tracking-tight sm:text-[19px]">
                  {current.event}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[11px] tabular-nums text-fg-faint">
                {String(step + 1).padStart(2, "0")} / {String(heroStory.length).padStart(2, "0")}
              </span>
            </div>

            {/* Every scene is mounted in one grid cell, so the frame keeps the
                height of the tallest and nothing jumps as they change. */}
            <div className="grid">
              {heroStory.map((s, i) => {
                const Scene = SCENES[s.id];
                const on = i === step;
                return (
                  <div
                    key={s.id}
                    aria-hidden={!on}
                    className={clsx(
                      "[grid-area:1/1] transition-[opacity,transform] duration-500 ease-out",
                      on ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                    )}
                  >
                    <Scene />
                  </div>
                );
              })}
            </div>

            <dl className="mt-4 hidden grid-cols-4 gap-px overflow-hidden rounded-xl border border-edge/10 bg-edge/10 sm:grid">
              {[
                ["New leads", "38", "this week"],
                ["Enrolments", "21", "this week"],
                ["Fees collected", "₹3.1L", "to your account"],
                ["To evaluate", "14", "AI drafts ready"],
              ].map(([k, v, m]) => (
                <div key={k} className="bg-panel px-3 py-2.5">
                  <dt className="truncate text-[10.5px] text-fg-muted">{k}</dt>
                  <dd className="font-display text-[18px] font-semibold tabular-nums tracking-tight">{v}</dd>
                  <dd className="truncate text-[10px] text-fg-faint">{m}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </BrowserFrame>

      {/* Live activity feed, floating off the frame on large screens. */}
      <div aria-hidden className="pointer-events-none absolute bottom-[84px] right-[calc(100%-28px)] z-20 hidden w-[270px] space-y-2 xl:block">
        {recent.map((e, k) => (
          <div
            key={`${e.id}-${k === 0 ? step : "old"}`}
            className={clsx(
              "flex items-center gap-2.5 rounded-xl border border-edge/10 bg-panel/95 px-3 py-2.5 shadow-soft backdrop-blur transition-opacity duration-500",
              k === 0 ? "animate-rise-in" : k === 1 ? "opacity-70" : "opacity-35",
            )}
          >
            <span className={clsx("h-2 w-2 shrink-0 rounded-full", k === 0 ? "bg-mint" : "bg-edge/20")} />
            <span className="min-w-0">
              <span className="block truncate text-[12.5px] font-semibold">{e.event}</span>
              <span className="block truncate text-[11px] text-fg-muted">{e.meta}</span>
            </span>
            <span className="ml-auto shrink-0 text-[10.5px] text-fg-faint">{k === 0 ? "now" : `${k * 3}m`}</span>
          </div>
        ))}
      </div>

      {/* The journey rail: also the manual control. */}
      <div className="mt-5 lg:mr-[-4vw] xl:mr-[-7vw]">
        <ol className="grid grid-cols-7 gap-1.5" aria-label="Student journey">
          {heroStory.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={i === step ? "step" : undefined}
                aria-label={`${i + 1}. ${s.event}`}
                className="group/seg block w-full py-2 text-left"
              >
                <span className="relative block h-[3px] overflow-hidden rounded-full bg-edge/10">
                  <span
                    key={i === step ? `on-${step}-${running}` : "off"}
                    className={clsx("absolute inset-y-0 left-0 rounded-full bg-primary", i < step && "w-full opacity-40", i > step && "w-0")}
                    style={
                      i === step
                        ? running
                          ? { width: "100%", animation: `hero-fill ${INTERVAL}ms linear both` }
                          : { width: "100%" }
                        : undefined
                    }
                  />
                </span>
                <span
                  className={clsx(
                    "mt-2 hidden truncate text-[11.5px] transition-colors md:block",
                    i === step ? "font-semibold text-fg" : "text-fg-faint group-hover/seg:text-fg-muted",
                  )}
                >
                  {s.nav}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-2 flex items-center justify-between gap-3 md:mt-3">
          <p className="truncate text-[12.5px] text-fg-muted md:hidden">
            <b className="text-fg">{current.event}</b> · {current.meta}
          </p>
          <Illustrative className="ml-auto hidden md:block" />
        </div>
      </div>
    </div>
  );
}
