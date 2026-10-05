"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { lifecycle } from "@/lib/content";
import { SCENES } from "../screens/scenes";

// A horizontal film strip: one frame per stage of a student's life at the
// institute. Native horizontal scrolling (swipe, trackpad, shift+wheel),
// snap points, and a rail that lights up as frames come into view.
export function Lifecycle() {
  const track = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const frames = Array.from(el.children) as HTMLElement[];
        const left = el.getBoundingClientRect().left;
        let best = 0;
        let bestDist = Infinity;
        frames.forEach((f, i) => {
          const d = Math.abs(f.getBoundingClientRect().left - left);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
        setActive(atEnd ? frames.length - 1 : best);
        setEdges({ start: el.scrollLeft <= 4, end: atEnd });
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    const frame = el?.children[i] as HTMLElement | undefined;
    if (!el || !frame) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: frame.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <section id="lifecycle" aria-labelledby="lifecycle-title" className="overflow-hidden py-24 sm:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="kicker">{lifecycle.kicker}</p>
            <h2 id="lifecycle-title" className="h2 mt-4 max-w-[16ch]">
              {lifecycle.title}
            </h2>
            <p className="sub mt-5 max-w-[540px]">{lifecycle.sub}</p>
          </div>
          <div className="hidden gap-2 lg:flex">
            <button type="button" aria-label="Previous stage" disabled={edges.start} onClick={() => goTo(Math.max(0, active - 1))} className="cta cta-ghost h-12 w-12 px-0">
              <ArrowLeft aria-hidden className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next stage" disabled={edges.end} onClick={() => goTo(Math.min(lifecycle.stages.length - 1, active + 1))} className="cta cta-ghost h-12 w-12 px-0">
              <ArrowRight aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* The rail */}
        <ol className="mt-12 grid grid-cols-6 gap-2" aria-label="Lifecycle stages">
          {lifecycle.stages.map((s, i) => (
            <li key={s.id}>
              <button type="button" onClick={() => goTo(i)} aria-current={i === active ? "step" : undefined} className="group block w-full text-left">
                <span className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[10.5px] transition-colors duration-300",
                      i <= active ? "bg-primary text-primary-ink" : "bg-edge/10 text-fg-muted group-hover:bg-edge/20",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className={clsx("h-px flex-1 transition-colors duration-500", i < active ? "bg-primary" : "bg-edge/15")} />
                </span>
                <span className={clsx("mt-2.5 hidden text-[13px] transition-colors md:block", i === active ? "font-semibold text-fg" : "text-fg-muted")}>{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* The strip. It starts aligned to the page grid and bleeds off the right edge. */}
      <ol
        ref={track}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 pr-4 [--gutter:16px] sm:gap-6 sm:[--gutter:24px] lg:[--gutter:40px]"
        style={{ paddingLeft: "var(--inset)", scrollPaddingLeft: "var(--inset)", ["--inset" as string]: "max(var(--gutter), calc((100% - 1240px) / 2 + var(--gutter)))" }}
        aria-label="Student lifecycle"
      >
        {lifecycle.stages.map((s, i) => {
          const Scene = SCENES[s.id];
          return (
            <li
              key={s.id}
              className={clsx(
                "w-[min(84vw,440px)] shrink-0 snap-start transition-opacity duration-500 sm:w-[440px]",
                i === active ? "opacity-100" : "opacity-60 hover:opacity-90",
              )}
            >
              <div className="flex h-full flex-col rounded-[24px] border border-edge/10 bg-panel-tint/60 p-4 sm:p-5">
                <div className="flex items-baseline gap-3 px-1">
                  <span className="font-mono text-[12px] text-fg-faint">0{i + 1}</span>
                  <h3 className="text-[20px] font-semibold tracking-tight">{s.title}</h3>
                </div>
                <p className="mt-1.5 min-h-[44px] px-1 pl-[34px] text-[14px] leading-snug text-fg-muted">{s.text}</p>
                <div className="mt-4 flex-1 [&>*]:shadow-soft">
                  <Scene />
                </div>
              </div>
            </li>
          );
        })}
        <li aria-hidden className="w-px shrink-0" />
      </ol>
      <p className="wrap mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">
        <span className="lg:hidden">Swipe · </span>Illustrative interface · sample data
      </p>
    </section>
  );
}
