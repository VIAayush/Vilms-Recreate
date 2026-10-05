"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { ecosystem } from "@/lib/content";
import { useReducedMotion } from "../motion";
import { CertScene, CourseScene, EnrolScene, EvalScene, LeadScene, PayScene, RenewScene } from "../screens/scenes";
import { ArrowButton } from "./ArrowButtons";
import { ScaledVisual } from "./ScaledVisual";
import { Shape } from "./Shapes";

// One student's path, as a row of tall dark cards — each one a step in VILMS.
const SCENE: Record<string, () => React.ReactNode> = {
  lead: () => <LeadScene />,
  student: () => <EnrolScene />,
  learn: () => <CourseScene />,
  eval: () => <EvalScene />,
  pay: () => <PayScene />,
  cert: () => <CertScene />,
  renew: () => <RenewScene />,
};
const GLOW = ["rgb(29 99 180 / 0.55)", "rgb(160 199 238 / 0.35)", "rgb(29 99 180 / 0.45)", "rgb(188 189 194 / 0.35)", "rgb(201 162 75 / 0.45)", "rgb(29 99 180 / 0.5)", "rgb(160 199 238 / 0.4)"];

export function Ecosystem() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [edges, setEdges] = useState({ start: true, end: false });
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const blob = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const spin = useTransform(scrollYProgress, [0, 1], [10, -20]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const page = (d: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: d * (card.offsetWidth + 20), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="solutions" ref={section} className="relative isolate scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <motion.div aria-hidden style={{ y: blob, rotate: spin }} className="absolute -right-[16%] top-0 -z-10 w-[min(58vw,620px)] text-sky/70 dark:text-sky/60">
        <Shape kind="hexagon" className="w-full" />
      </motion.div>

      <div className="wrap text-center">
        <h2 className="text-balance text-[clamp(36px,5.4vw,68px)] font-normal leading-[1.04] tracking-[-0.035em]">{ecosystem.title}</h2>
        <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-relaxed text-fg-muted">{ecosystem.line}</p>
      </div>

      <div ref={track} className="no-scrollbar mt-14 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 sm:scroll-px-8 sm:px-8 xl:px-[max(32px,calc(50vw-620px))]">
        {ecosystem.cards.map((c, i) => (
          <article
            key={c.id}
            className="band-navy group relative flex h-[500px] w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] sm:h-[540px] sm:w-[380px]"
            style={{ background: `radial-gradient(120% 70% at 50% 0%, ${GLOW[i]}, transparent 65%), rgb(8 20 36)` }}
          >
            <div className="relative z-10 flex flex-wrap gap-2 p-5">
              <span className="rounded-full border border-white/25 px-3 py-1 text-[12px] font-medium text-white/85">{c.tag}</span>
              <span className="rounded-full border border-white/25 px-3 py-1 font-mono text-[11.5px] text-white/60">
                Step {i + 1} / {ecosystem.cards.length}
              </span>
            </div>

            <div className="relative mx-6 mt-2 flex-1">
              <div className="band-light absolute inset-x-0 top-0 h-[230px] overflow-hidden rounded-[16px] bg-canvas-alt shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] transition duration-500 ease-out group-hover:-translate-y-2 group-hover:-rotate-1 sm:h-[260px]">
                <ScaledVisual width={400} height={300}>
                  <div className="h-full p-4">{SCENE[c.id]()}</div>
                </ScaledVisual>
              </div>
            </div>

            {/* fade the visual into the card, then the title */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[rgb(8_20_36)] from-55% to-transparent" />
            <div className="relative z-10 p-6 pt-0">
              <h3 className="text-[30px] font-normal leading-tight tracking-[-0.02em] text-white">{c.title}</h3>
              <Cta
                intent="demo"
                location={`ecosystem_${c.id}`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/40 px-4 py-2 text-[13px] font-medium text-white transition hover:border-white hover:bg-white hover:text-[rgb(0_48_86)]"
              >
                See it <ArrowRight aria-hidden className="h-3.5 w-3.5" />
              </Cta>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <ArrowButton dir="prev" onClick={() => page(-1)} label="Previous step" disabled={edges.start} />
        <ArrowButton dir="next" onClick={() => page(1)} label="Next step" disabled={edges.end} />
      </div>
    </section>
  );
}
