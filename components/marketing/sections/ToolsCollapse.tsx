"use client";

import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { tools } from "@/lib/content";
import { BrandMark } from "../BrandMark";
import { moduleDot, TONE, type Tone } from "../tone";
import { useReducedMotion, useScrollVar } from "../motion";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

// Seven tools, seven colours — the mess is meant to look like a mess
// before it resolves into one platform.
const CHIP_TONES: Tone[] = ["green", "blue", "teal", "yellow", "red", "blue", "yellow"];


// The problem, told in one move: seven scattered tools are pulled together
// as you scroll, and VILMS resolves in their place.
export function ToolsCollapse() {
  const reduced = useReducedMotion();
  return reduced ? <StaticTools /> : <ScrollTools />;
}

function ScrollTools() {
  const ref = useRef<HTMLElement>(null);
  useScrollVar(ref);

  return (
    <section ref={ref} id="problem" aria-labelledby="tools-title" className="tools-scene glow-section relative h-[280vh] border-y border-edge bg-wash-blue" data-glow>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-8 pt-24 sm:pt-28">
        <div className="wrap grid">
          <div className="tools-before [grid-area:1/1]">
            <p className="kicker">{tools.kicker}</p>
            <h2 id="tools-title" className="h2 mt-4 max-w-[17ch]">
              {tools.title}
            </h2>
          </div>
          <div className="tools-after [grid-area:1/1]" aria-hidden>
            <p className="kicker">{tools.afterKicker}</p>
            <p className="h2 mt-4">
              {tools.afterTitle.replace(".", "")}
              <span className="text-yellow">.</span>
            </p>
            <p className="sub mt-4 max-w-[440px]">{tools.afterSub}</p>
          </div>
        </div>

        <div className="tools-arena relative mx-auto mt-4 w-full max-w-[1160px] flex-1 px-4">
          {/* VILMS, resolving in the middle */}
          <div className="tools-core absolute left-1/2 top-1/2 flex flex-col items-center">
            <div className="grid h-[clamp(84px,22cqmin,140px)] w-[clamp(84px,22cqmin,140px)] place-items-center rounded-[28%] bg-panel shadow-window">
              <BrandMark className="h-[62%] w-[62%]" />
            </div>
          </div>
          {tools.modules.map((m, i) => (
            <span
              key={m}
              aria-hidden
              className="tools-module absolute left-1/2 top-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-edge bg-panel px-3 py-1.5 text-[12px] font-semibold shadow-soft sm:text-[13px]"
              style={{ "--a": `${(360 / tools.modules.length) * i - 90}deg`, "--ring": "clamp(92px, 31cqmin, 210px)" } as Vars}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${moduleDot(m)}`} />
              {m}
            </span>
          ))}

          {/* The seven tools */}
          <ul aria-label="Tools most institutes juggle today">
            {tools.items.map((t, i) => (
              <li
                key={t.label}
                data-glow
                className="tools-chip glow-card absolute left-1/2 top-1/2 w-max max-w-[160px] rounded-2xl border border-edge bg-panel py-2.5 pl-3 pr-3.5 shadow-soft sm:max-w-none sm:py-3 sm:pl-3.5 sm:pr-4"
                style={{ "--x": t.x, "--y": t.y, "--rot": `${t.rot}deg`, "--glow": TONE[CHIP_TONES[i]].rgb } as Vars}
              >
                <span aria-hidden className={`absolute bottom-3 left-0 top-3 w-[3px] rounded-r ${TONE[CHIP_TONES[i]].fill}`} />
                <span className="relative block text-[14px] font-semibold sm:text-[16px]">
                  {t.label}
                  <span aria-hidden className="tools-strike absolute inset-x-0 top-1/2 h-[2px] origin-left rounded bg-red" />
                </span>
                <span className="mt-0.5 block text-[11.5px] text-fg-muted sm:text-[12.5px]">{t.pain}</span>
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden className="wrap mt-4 flex items-center gap-3 text-[11.5px] text-fg-faint">
          <ArrowDown className="h-3.5 w-3.5" />
          <span className="font-mono uppercase tracking-[0.14em]">Keep scrolling</span>
          <span className="relative h-px flex-1 bg-sunken">
            <span className="tools-meter absolute inset-0 origin-left bg-primary" />
          </span>
          <span className="font-mono">7 → 1</span>
        </div>
      </div>
    </section>
  );
}

/** Reduced motion: the same story as a still composition. */
function StaticTools() {
  return (
    <section id="problem" aria-labelledby="tools-title" className="border-y border-edge bg-wash-blue py-24 sm:py-32">
      <div className="wrap">
        <p className="kicker">{tools.kicker}</p>
        <h2 id="tools-title" className="h2 mt-4 max-w-[17ch]">
          {tools.title}
        </h2>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto_0.8fr]">
          <ul className="flex flex-wrap gap-2.5">
            {tools.items.map((t) => (
              <li key={t.label} className="rounded-2xl border border-edge bg-panel px-4 py-3">
                <span className="block text-[15px] font-semibold text-fg-muted line-through decoration-red decoration-2">{t.label}</span>
                <span className="block text-[12.5px] text-fg-muted">{t.pain}</span>
              </li>
            ))}
          </ul>
          <ArrowRight aria-hidden className="hidden h-8 w-8 text-fg-faint lg:block" />
          <div className="flex items-center gap-5">
            <BrandMark className="h-20 w-20" />
            <div>
              <p className="font-display text-[28px] font-semibold tracking-tight">{tools.afterTitle}</p>
              <p className="mt-1 text-[15px] text-fg-muted">{tools.afterSub}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
