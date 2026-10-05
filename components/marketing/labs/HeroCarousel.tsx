"use client";

import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Cta } from "@/components/site/Cta";
import { featured, type FeatureId } from "@/lib/content";
import { useInView, useReducedMotion } from "../motion";
import { CrmBoard } from "../screens/CrmBoard";
import { AssessScreen, GrowScreen, TeachScreen } from "../screens/explorer";
import { LiveClassScreen } from "../screens/LiveClass";
import { LiveDashboard } from "../screens/LiveDashboard";
import { CertScene, CourseScene, EnrolScene, EvalScene, LeadScene, LiveScene, PayScene } from "../screens/scenes";
import { ArrowButton } from "./ArrowButtons";
import { ScaledVisual } from "./ScaledVisual";

// Featured products, one full-bleed slide at a time: a big light title in the
// middle and the product itself scattered around it as tilted screens.

const SLIDE_MS = 7000;

type Tile = { w: number; h: number; pad?: boolean; node: () => React.ReactNode };

const TILES: Record<FeatureId, Tile[]> = {
  dashboard: [
    { w: 760, h: 500, node: () => <LiveDashboard compact /> },
    { w: 400, h: 290, pad: true, node: () => <PayScene /> },
    { w: 400, h: 250, pad: true, node: () => <LeadScene /> },
    { w: 400, h: 290, pad: true, node: () => <CourseScene /> },
  ],
  evaluation: [
    { w: 640, h: 440, node: () => <AssessScreen active={null} /> },
    { w: 400, h: 300, pad: true, node: () => <EvalScene approved={false} /> },
    { w: 400, h: 290, pad: true, node: () => <CertScene /> },
    { w: 400, h: 300, pad: true, node: () => <EvalScene /> },
  ],
  crm: [
    { w: 1060, h: 520, pad: true, node: () => <CrmBoard /> },
    { w: 400, h: 250, pad: true, node: () => <LeadScene /> },
    { w: 400, h: 250, pad: true, node: () => <EnrolScene /> },
    { w: 640, h: 440, node: () => <GrowScreen active={null} /> },
  ],
  classes: [
    { w: 640, h: 420, node: () => <LiveClassScreen /> },
    { w: 400, h: 290, pad: true, node: () => <CourseScene /> },
    { w: 400, h: 260, pad: true, node: () => <LiveScene /> },
    { w: 640, h: 440, node: () => <TeachScreen active={null} /> },
  ],
};

// Where the four tiles sit, and how far each leans.
const SLOTS = [
  { cls: "left-[-14%] top-[11%] w-[52vw] sm:left-[-3%] sm:top-[12%] sm:w-[30vw] lg:left-[1.5%] lg:w-[22vw]", rot: -6 },
  { cls: "right-[-16%] top-[9%] w-[46vw] sm:right-[-3%] sm:top-[10%] sm:w-[27vw] lg:right-[2%] lg:w-[20vw]", rot: 5 },
  { cls: "left-[-12%] bottom-[15%] w-[44vw] sm:left-[-2%] sm:bottom-[11%] sm:w-[25vw] lg:left-[4%] lg:w-[19vw]", rot: 4 },
  { cls: "right-[-14%] bottom-[16%] w-[50vw] sm:right-[-3%] sm:bottom-[10%] sm:w-[29vw] lg:right-[3%] lg:w-[21vw]", rot: -4 },
];

export function HeroCarousel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const count = featured.length;

  const go = useCallback(
    (to: number, d: number) => {
      setDir(d);
      setIndex((to + count) % count);
    },
    [count],
  );
  const next = () => go(index + 1, 1);
  const prev = () => go(index - 1, -1);

  const playing = !reduced && inView && !hover && !focus;
  const slide = featured[index];

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="band-navy relative isolate flex h-[100svh] max-h-[1240px] min-h-[620px] items-center justify-center overflow-hidden"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setFocus(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setFocus(false)}
    >
      <h1 className="sr-only">VILMS — the all-in-one learning platform for coaching institutes</h1>

      {/* light from below, in the logo blue */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_100%,rgb(29_99_180/0.35),transparent_70%),radial-gradient(40%_40%_at_15%_10%,rgb(29_99_180/0.18),transparent_70%)]" />

      <motion.div
        className="absolute inset-0"
        style={{ touchAction: "pan-y" }}
        onPanEnd={(_, info) => {
          if (Math.abs(info.offset.x) < 60 || Math.abs(info.offset.x) < Math.abs(info.offset.y)) return;
          if (info.offset.x < 0) next();
          else prev();
        }}
      >
        <AnimatePresence initial={false} mode="sync">
          <div key={slide.id} className="absolute inset-0">
            {TILES[slide.id].map((t, i) => (
              <div key={i} className={clsx("parallax absolute max-w-[460px]", SLOTS[i].cls)} data-depth={i % 2 ? 14 : -10}>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 70 * dir, rotate: SLOTS[i].rot + 8 * dir, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, rotate: SLOTS[i].rot, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -50 * dir, scale: 0.94, transition: { duration: 0.35 } }}
                  transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.08 + i * 0.07 }}
                  className="band-light overflow-hidden rounded-[18px] bg-canvas-alt shadow-[0_30px_70px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/10"
                  style={{ aspectRatio: `${t.w} / ${t.h}` }}
                >
                  <ScaledVisual width={t.w} height={t.h}>
                    <div className={clsx("h-full bg-canvas-alt", t.pad && "p-4")}>{t.node()}</div>
                  </ScaledVisual>
                </motion.div>
              </div>
            ))}
          </div>
        </AnimatePresence>
      </motion.div>

      {/* the title, with a soft pool of navy behind it for legibility */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[920px] px-5 text-center">
        <div aria-hidden className="absolute inset-x-[-10%] inset-y-[-40%] -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgb(3_24_46/0.92),rgb(3_24_46/0.6)_55%,transparent_80%)]" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
          >
            <h2 className="text-balance text-[clamp(44px,8vw,104px)] font-normal leading-[0.98] tracking-[-0.035em] text-white">{slide.title}</h2>
            <p className="mx-auto mt-5 max-w-[520px] text-[clamp(16px,1.6vw,19px)] leading-relaxed text-white/80">{slide.line}</p>
            <div className="pointer-events-auto mt-8 flex justify-center">
              <Cta
                intent={slide.cta}
                location={`hero_${slide.id}`}
                className="cta cta-lg rounded-full bg-white px-7 text-[rgb(0_48_86)] shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)] hover:bg-[rgb(220_234_250)]"
              >
                {slide.cta === "trial" ? "Start Free Trial" : "Book a Demo"}
              </Cta>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* prev · progress · next */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-4 sm:bottom-9">
        <ArrowButton dir="prev" tone="dark" onClick={prev} label="Previous product" />
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose a product">
          {featured.map((f, i) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={f.title}
              onClick={() => go(i, i > index ? 1 : -1)}
              className={clsx(
                "relative h-2 overflow-hidden rounded-full transition-[width,background-color] duration-500",
                i === index ? "w-20 bg-white/25" : "w-2 bg-white/45 hover:bg-white/80",
              )}
            >
              {i === index ? (
                <span
                  key={`${index}-${reduced}`}
                  className="absolute inset-0 origin-left rounded-full bg-white"
                  style={
                    reduced
                      ? undefined
                      : { animation: `hero-progress ${SLIDE_MS}ms linear forwards`, animationPlayState: playing ? "running" : "paused" }
                  }
                  onAnimationEnd={next}
                />
              ) : null}
            </button>
          ))}
        </div>
        <ArrowButton dir="next" tone="dark" onClick={next} label="Next product" />
      </div>
    </section>
  );
}
