"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { discover, type AreaId } from "@/lib/content";
import { useReducedMotion } from "../motion";
import { ArrowButton } from "./ArrowButtons";
import { ScaledVisual } from "./ScaledVisual";
import { Shape } from "./Shapes";
import { AREA_BACKDROP, AREA_VISUALS } from "./visuals";

export const FILTER_EVENT = "vilms:filter";

/** Jump to the product grid, filtered to one area. */
export function showArea(area: AreaId) {
  window.dispatchEvent(new CustomEvent<AreaId>(FILTER_EVENT, { detail: area }));
  document.getElementById("product")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// A big headline over brand shapes, then a fan of cards — one per product
// area — that curve like a hand of cards as they scroll past.
export function Discover() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [edges, setEdges] = useState({ start: true, end: false });

  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const blobA = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const blobB = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const spin = useTransform(scrollYProgress, [0, 1], [-12, 18]);

  // Lean each card by its distance from the centre of the track.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      for (const c of Array.from(el.children) as HTMLElement[]) {
        const d = (c.offsetLeft + c.offsetWidth / 2 - mid) / el.clientWidth; // ~ -1 … 1
        const k = reduced ? 0 : Math.max(-1.2, Math.min(1.2, d));
        c.style.setProperty("--rot", `${k * 9}deg`);
        c.style.setProperty("--lift", `${Math.abs(k) * Math.abs(k) * 70}px`);
      }
      setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const page = (d: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: d * (card.offsetWidth + 24), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section ref={section} className="relative isolate overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32">
      {/* brand shapes behind the headline */}
      <motion.div aria-hidden style={{ y: blobA, rotate: spin }} className="absolute -right-[18%] top-[2%] -z-10 w-[min(70vw,760px)] text-sky/70 dark:text-sky/60">
        <Shape kind="blob" className="w-full" />
      </motion.div>
      <motion.div aria-hidden style={{ y: blobB }} className="absolute -left-[22%] top-[42%] -z-10 w-[min(62vw,620px)] text-primary/85">
        <Shape kind="circle" className="w-full" />
      </motion.div>

      <div className="wrap">
        <h2 className="mx-auto max-w-[1000px] text-balance text-center text-[clamp(40px,7vw,92px)] font-normal leading-[1.02] tracking-[-0.04em]">
          {discover.title[0]}
          <span className="text-primary">{discover.title[1]}</span>
          {discover.title[2]}
        </h2>
      </div>

      <div
        ref={track}
        className="no-scrollbar relative mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(20px,calc(50vw-170px))] pb-24 pt-10 sm:mt-16"
        aria-label="Product areas"
      >
        {discover.cards.map((c) => (
          <article
            key={c.id}
            className="group w-[300px] shrink-0 snap-center sm:w-[340px]"
            style={{ transform: "translateY(var(--lift, 0px)) rotate(var(--rot, 0deg))", transition: "transform 0.25s ease-out" }}
          >
            <div className="rounded-[28px] border border-edge bg-panel p-3 shadow-[0_24px_60px_-28px_rgb(14_27_44/0.45)] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_34px_70px_-28px_rgb(14_27_44/0.55)]">
              <div className={clsx("relative aspect-[4/3.4] overflow-hidden rounded-[20px] p-4 pb-0", AREA_BACKDROP[c.id])}>
                <div className="h-full overflow-hidden rounded-t-[12px] bg-canvas shadow-[0_10px_30px_-12px_rgb(0_0_0/0.35)] transition duration-500 group-hover:scale-[1.03]">
                  <ScaledVisual width={640} height={480}>
                    {AREA_VISUALS[c.id]()}
                  </ScaledVisual>
                </div>
              </div>
              <div className="px-3 pb-3 pt-5">
                <h3 className="text-[26px] font-normal tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-2 min-h-[66px] text-[14.5px] leading-relaxed text-fg-muted">{c.line}</p>
                <button
                  type="button"
                  onClick={() => showArea(c.id)}
                  className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary transition-[gap] hover:gap-2.5"
                >
                  Explore {c.title} <ArrowRight aria-hidden className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="-mt-12 flex justify-center gap-3">
        <ArrowButton dir="prev" onClick={() => page(-1)} label="Previous area" disabled={edges.start} />
        <ArrowButton dir="next" onClick={() => page(1)} label="Next area" disabled={edges.end} />
      </div>
    </section>
  );
}
