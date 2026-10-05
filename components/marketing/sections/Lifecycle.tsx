"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { lifecycle } from "@/lib/content";
import { useMediaQuery, useReducedMotion } from "../motion";
import { SCENES } from "../screens/scenes";
import { TONE, type Tone } from "../tone";

// Each stage keeps one colour from the rail to its card.
const STAGE_TONE: Record<string, Tone> = { lead: "blue", enrol: "green", course: "navy", eval: "steel", cert: "gold", renew: "blue" };

// Pinned only where the whole section fits on screen; phones and short
// windows keep a native swipeable strip.
const PIN_QUERY = "(min-width: 1024px) and (min-height: 700px)";

// A horizontal film strip: one frame per stage of a student's life at the
// institute. On desktop the section pins in place and scrolling down moves
// the strip sideways; elsewhere it's a native horizontal scroller with snap
// points. Either way the rail lights up as frames come into view.
export function Lifecycle() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const pinnable = useMediaQuery(PIN_QUERY);
  const reduced = useReducedMotion();
  const pinned = pinnable && !reduced;
  // how far the strip travels sideways while pinned (px)
  const [distance, setDistance] = useState(0);

  // Pinned: measure the strip's overflow.
  useEffect(() => {
    const el = track.current;
    if (!pinned || !el) return;
    const measure = () => {
      const last = el.lastElementChild as HTMLElement | null;
      const end = last ? last.offsetLeft + last.offsetWidth + parseFloat(getComputedStyle(el).paddingRight) : el.scrollWidth;
      setDistance(Math.max(0, Math.round(end - el.clientWidth)));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pinned]);

  // Pinned: vertical scroll position -> sideways position of the strip.
  useEffect(() => {
    const sec = section.current;
    const el = track.current;
    if (!pinned || !sec || !el) return;
    let raf = 0;
    let lastIdx = -1;
    let lastEdge = "";
    const update = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
      const x = p * distance;
      el.style.transform = `translate3d(${(-x).toFixed(1)}px, 0, 0)`;
      // the frame nearest the left edge is the active stage
      const frames = Array.from(el.children).slice(0, lifecycle.stages.length) as HTMLElement[];
      const origin = frames[0]?.offsetLeft ?? 0;
      let idx = 0;
      let best = Infinity;
      frames.forEach((f, i) => {
        const d = Math.abs(f.offsetLeft - origin - x);
        if (d < best) {
          best = d;
          idx = i;
        }
      });
      if (p > 0.995) idx = frames.length - 1;
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActive(idx);
      }
      const edge = `${p < 0.005}|${p > 0.995}`;
      if (edge !== lastEdge) {
        lastEdge = edge;
        setEdges({ start: p < 0.005, end: p > 0.995 });
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [pinned, distance]);

  // Not pinned: follow the strip's own horizontal scrolling.
  useEffect(() => {
    const el = track.current;
    if (pinned || !el) return;
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
  }, [pinned]);

  const goTo = (i: number) => {
    const el = track.current;
    const sec = section.current;
    const frame = el?.children[i] as HTMLElement | undefined;
    if (!el || !frame || !sec) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pinned) {
      // scroll the page to the point where this frame reaches the left edge
      const first = el.children[0] as HTMLElement;
      const x = Math.min(distance, frame.offsetLeft - first.offsetLeft);
      const range = sec.offsetHeight - window.innerHeight;
      const top = sec.getBoundingClientRect().top + window.scrollY + (distance ? (x / distance) * range : 0);
      window.scrollTo({ top: Math.ceil(top), behavior: smooth ? "smooth" : "auto" });
      return;
    }
    el.scrollTo({ left: frame.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: smooth ? "smooth" : "auto" });
  };

  // While pinned, the section is one screen tall plus the strip's sideways
  // travel, so each pixel scrolled down moves the strip one pixel left.
  return (
    <section
      ref={section}
      id="lifecycle"
      aria-labelledby="lifecycle-title"
      className={pinned ? "relative" : "overflow-hidden py-24 sm:py-32"}
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-4 pt-16" : undefined}>
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="kicker">{lifecycle.kicker}</p>
            <h2 id="lifecycle-title" className="h2 mt-4 max-w-[16ch]">
              {lifecycle.title}
            </h2>
            <p className={clsx("sub mt-5 max-w-[540px]", pinned && "[@media(max-height:760px)]:hidden")}>{lifecycle.sub}</p>
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
        <ol className={clsx("grid grid-cols-6 gap-2", pinned ? "mt-8 [@media(max-height:880px)]:mt-5" : "mt-12")} aria-label="Lifecycle stages">
          {lifecycle.stages.map((s, i) => (
            <li key={s.id}>
              <button type="button" onClick={() => goTo(i)} aria-current={i === active ? "step" : undefined} className="group block w-full text-left">
                <span className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[10.5px] transition-colors duration-300",
                      i <= active ? clsx(TONE[STAGE_TONE[s.id]].fill, "text-primary-ink") : "bg-sunken text-fg-muted group-hover:bg-edge-strong",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className={clsx("h-[2px] flex-1 rounded transition-colors duration-500", i < active ? TONE[STAGE_TONE[s.id]].fill : "bg-edge")} />
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
        className={clsx(
          "flex gap-4 pb-4 pr-4 [--gutter:16px] sm:gap-6 sm:[--gutter:24px] lg:[--gutter:40px]",
          pinned ? "mt-6 will-change-transform [@media(max-height:880px)]:mt-4" : "no-scrollbar mt-8 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth",
        )}
        style={{ paddingLeft: "var(--inset)", scrollPaddingLeft: "var(--inset)", ["--inset" as string]: "max(var(--gutter), calc((100% - 1240px) / 2 + var(--gutter)))" }}
        aria-label="Student lifecycle"
      >
        {lifecycle.stages.map((s, i) => {
          const Scene = SCENES[s.id];
          const tone = TONE[STAGE_TONE[s.id]];
          return (
            <li
              key={s.id}
              className={clsx(
                "w-[min(84vw,440px)] shrink-0 snap-start transition-opacity duration-500 sm:w-[440px]",
                i === active ? "opacity-100" : "opacity-60 hover:opacity-90",
              )}
            >
              <div
                data-glow
                style={{ "--glow": tone.rgb } as React.CSSProperties}
                className={clsx("glow-card flex h-full flex-col overflow-hidden rounded-2xl border border-edge p-4 transition-transform duration-500 ease-out hover:-translate-y-1 sm:p-5", tone.surface)}
              >
                <span aria-hidden className={clsx("absolute inset-x-0 top-0 h-1", tone.fill)} />
                <div className="flex items-baseline gap-3 px-1">
                  <span className={clsx("font-mono text-[12px] font-semibold", tone.text)}>0{i + 1}</span>
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
      <p className={clsx("wrap mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint", pinned && "[@media(max-height:880px)]:hidden")}>
        <span className="lg:hidden">Swipe · </span>Illustrative interface · sample data
      </p>
      </div>
    </section>
  );
}
