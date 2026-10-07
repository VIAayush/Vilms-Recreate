"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAutoplay, useInView, useMediaQuery, useReducedMotion } from "@/components/marketing/motion";

export type StoryStep = { title: string; text?: string };

/**
 * Scroll storytelling. On desktop the stage pins to the viewport while the
 * page scrolls through the steps; the active step follows scroll position.
 * On phones and under prefers-reduced-motion nothing is pinned: the stage
 * sits above a row of step buttons (and, when motion is allowed, steps
 * through itself while visible).
 *
 *   <ScrollStory
 *     steps={[{ title: "Lead enters", text: "…" }, …]}
 *     stage={(i, progress) => <MyStage step={i} />}
 *   />
 *
 * `stage` is called with the active step index and overall progress (0–1).
 * Keep it a pure function of those two numbers — it re-renders often.
 */
export function ScrollStory({
  steps,
  stage,
  perStep = 0.8,
  stageHeight = "min(620px, calc(100svh - 140px))",
  className,
}: {
  steps: StoryStep[];
  stage: (index: number, progress: number) => React.ReactNode;
  /** viewport heights of scrolling per step on desktop */
  perStep?: number;
  stageHeight?: string;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduced = useReducedMotion();
  const pinned = desktop && !reduced;
  const inView = useInView(track, { margin: "-10% 0px" });
  const [scrollIndex, setScrollIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [auto, select] = useAutoplay(steps.length, { interval: 3200, running: !pinned && !reduced && inView });

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!pinned) return;
    setProgress(v);
    setScrollIndex(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  // Pinned: a click scrolls the page to that step. Otherwise it picks the step directly.
  const choose = (i: number) => {
    const el = track.current;
    if (!pinned || !el) return select(i);
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / steps.length) * range, behavior: "smooth" });
  };

  const index = pinned ? scrollIndex : auto;
  const p = pinned ? progress : (index + 1) / steps.length;

  return (
    <div
      ref={track}
      className={clsx(className)}
      style={pinned ? { height: `calc(${steps.length * perStep * 100}svh)` } : undefined}
    >
      <div className={clsx(pinned && "sticky top-20")} style={pinned ? { height: stageHeight } : undefined}>
        <div className="grid h-full items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          {/* step list */}
          <ol className="order-2 hidden lg:order-1 lg:block" aria-label="Steps">
            {steps.map((s, i) => {
              const on = i === index;
              return (
                <li key={s.title} aria-current={on ? "step" : undefined}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    className={clsx(
                      "relative flex w-full gap-4 border-l-2 py-3.5 pl-5 text-left transition-colors duration-300",
                      on ? "border-navy" : "border-edge hover:border-edge-strong",
                    )}
                  >
                    <span className={clsx("font-mono text-[12px] tabular-nums transition-colors", on ? "text-primary" : "text-fg-faint")}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className={clsx("block text-[19px] font-medium tracking-[-0.01em] transition-colors duration-300", on ? "text-fg" : "text-fg-muted")}>{s.title}</span>
                      {s.text ? (
                        <motion.span
                          initial={false}
                          animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="block overflow-hidden text-[14.5px] leading-relaxed text-fg-muted"
                        >
                          <span className="block pt-1.5">{s.text}</span>
                        </motion.span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* stage */}
          <div className="order-1 min-w-0 lg:order-2">
            {stage(index, p)}

            {/* phone / reduced-motion controls */}
            <div className="mt-5 lg:hidden">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous step"
                  onClick={() => select((index - 1 + steps.length) % steps.length)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-edge-strong"
                >
                  <ChevronLeft aria-hidden className="h-4 w-4" />
                </button>
                <div className="min-w-0 flex-1 text-center">
                  <p className="font-mono text-[11px] text-fg-faint">
                    {index + 1} / {steps.length}
                  </p>
                  <p className="truncate text-[16px] font-medium">{steps[index].title}</p>
                </div>
                <button
                  type="button"
                  aria-label="Next step"
                  onClick={() => select((index + 1) % steps.length)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-edge-strong"
                >
                  <ChevronRight aria-hidden className="h-4 w-4" />
                </button>
              </div>
              {steps[index].text ? <p className="mt-2 text-center text-[14px] leading-relaxed text-fg-muted">{steps[index].text}</p> : null}
              <div className="mt-3 flex justify-center gap-1.5">
                {steps.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    aria-label={`Go to step ${i + 1}: ${s.title}`}
                    onClick={() => select(i)}
                    className={clsx("h-1.5 rounded-full transition-all duration-300", i === index ? "w-6 bg-navy" : "w-1.5 bg-edge-strong")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
