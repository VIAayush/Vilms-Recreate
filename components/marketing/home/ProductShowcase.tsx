"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Check, Radio, ScanText, Play } from "lucide-react";
import { ICONS } from "@/components/site-ui/icons";
import { Cta } from "@/components/site/Cta";
import { track } from "@/lib/client/tracking";
import { PAGES, type PageKey } from "@/lib/site/pages";
import { useMediaQuery, useReducedMotion } from "../motion";
import { ScaledVisual } from "../labs/ScaledVisual";
import { EvalFlow } from "../screens/EvalFlow";
import { EXPLORER_SCREENS } from "../screens/explorer";
import { BrowserFrame } from "../screens/primitives";
import { HubCompact, HubStage } from "./HubStage";

/*
  Product showcase — a scroll-driven horizontal story.

  Desktop: the section is as tall as the horizontal distance plus one screen.
  Its content is `position: sticky`, so as the page scrolls vertically the
  track slides sideways 1:1 — wheel, trackpad, keyboard and scrollbar all work
  because it is ordinary page scrolling, not an intercepted wheel event. When
  the last card is fully in view the section ends and the page carries on;
  scrolling back up reverses it. Progress is smoothed with a spring.

  Phones, tablets and reduced motion: nothing is pinned. The cards become a
  native swipe carousel (scroll-snap, one card at a time) with a counter, and
  vertical page scrolling is untouched.
*/

type Slide = {
  key: PageKey;
  line: string;
  points: string[];
  cta: string;
  stage: "teach" | "assess" | "grow" | "brand" | "hub" | "eval";
};

const SLIDES: Slide[] = [
  {
    key: "lmsPlatform",
    line: "Courses, learners, trainers, assessments and reports in one centralized platform.",
    points: ["Manage learning from one simple dashboard", "Built to scale with your learners and programs"],
    cta: "See the platform",
    stage: "hub",
  },
  {
    key: "onlineCourses",
    line: "Create, organize and deliver online courses — videos, documents and presentations.",
    points: ["Lessons, learning resources and quizzes", "Student access, progress and certificates"],
    cta: "Explore courses & classes",
    stage: "teach",
  },
  {
    key: "onlineExams",
    line: "Quizzes, practice tests and mock exams with organized question sets.",
    points: ["Schedule exams and manage candidates", "Results, scores and performance tracking"],
    cta: "Explore online exams",
    stage: "assess",
  },
  {
    key: "aiEvaluation",
    line: "AI drafts an evaluation against your rubric. A mentor reviews and approves it.",
    points: ["Handwritten answers, read and drafted", "Nothing reaches a student until it's approved"],
    cta: "See AI evaluation",
    stage: "eval",
  },
  {
    key: "leadCrm",
    line: "Capture, track and follow up student enquiries through to admission.",
    points: ["Lead stages from new enquiry to admission", "Assign counsellors and manage follow-ups"],
    cta: "Explore the Lead CRM",
    stage: "grow",
  },
  {
    key: "whiteLabel",
    line: "Launch your own branded learning platform — your name, your identity.",
    points: ["Courses, learners and assessments under your brand", "A learning environment that reflects your organization"],
    cta: "See white-label",
    stage: "brand",
  },
];

const STAGE_SIZE: Record<Slide["stage"], { w: number; h: number }> = {
  hub: { w: 720, h: 450 },
  teach: { w: 700, h: 450 },
  assess: { w: 700, h: 450 },
  eval: { w: 760, h: 470 },
  grow: { w: 700, h: 450 },
  brand: { w: 700, h: 450 },
};

function ScreenStage({ id }: { id: keyof typeof EXPLORER_SCREENS }) {
  const { url, Screen } = EXPLORER_SCREENS[id];
  return (
    <BrowserFrame url={url} className="h-full">
      <Screen active={null} />
    </BrowserFrame>
  );
}

function StageBody({ stage, compact }: { stage: Slide["stage"]; compact?: boolean }) {
  switch (stage) {
    case "hub":
      return compact ? <HubCompact /> : <HubStage />;
    case "eval":
      return (
        <div className="bg-canvas p-3 sm:p-4">
          <EvalFlow showSteps={false} />
        </div>
      );
    default:
      return <ScreenStage id={stage} />;
  }
}


/* ---------------- hover: small, honest reactions on top of each product ---------------- */

const chip = "pointer-events-none absolute z-20 flex items-center gap-2 rounded-xl border border-edge bg-panel px-3 py-2 text-[12.5px] font-medium shadow-[0_14px_30px_-14px_rgb(14_27_44/0.45)]";
const pop = { initial: { opacity: 0, y: 10, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 6 } };

function HoverLayer({ stage }: { stage: Slide["stage"] }) {
  switch (stage) {
    case "hub":
      return (
        <>
          <motion.div {...pop} className={`${chip} left-4 top-4`}>
            <span className="h-2 w-2 rounded-full bg-primary" /> Courses ↔ Tests ↔ Payments linked
          </motion.div>
          <motion.div {...pop} transition={{ delay: 0.12 }} className={`${chip} bottom-4 right-4`}>
            <Check aria-hidden className="h-3.5 w-3.5 text-green" /> One record per learner
          </motion.div>
        </>
      );
    case "teach":
      return (
        <>
          <motion.div {...pop} className={`${chip} bottom-4 left-4`}>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-white">
              <Play aria-hidden className="h-3 w-3 fill-current" />
            </span>
            Playing · Lesson 3
          </motion.div>
          <motion.div {...pop} transition={{ delay: 0.12 }} className={`${chip} right-4 top-4`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-60 [animation-iteration-count:2]" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red" />
            </span>
            <Radio aria-hidden className="h-3.5 w-3.5" /> Live now
          </motion.div>
        </>
      );
    case "assess":
      return (
        <>
          <motion.div {...pop} className={`${chip} left-4 top-4`}>
            <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Answer saved
          </motion.div>
          <motion.div {...pop} transition={{ delay: 0.15 }} className={`${chip} bottom-4 right-4`}>
            Score <span className="font-mono tabular-nums">8 / 10</span>
          </motion.div>
        </>
      );
    case "eval":
      return (
        <>
          <motion.div {...pop} className={`${chip} left-4 top-4`}>
            <ScanText aria-hidden className="h-3.5 w-3.5 text-primary" /> AI reading the answer…
          </motion.div>
          <motion.div {...pop} transition={{ delay: 0.5 }} className={`${chip} bottom-4 right-4`}>
            <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Mentor approved
          </motion.div>
        </>
      );
    case "grow":
      return (
        <>
          <motion.div {...pop} className={`${chip} left-4 top-4`}>
            Rahul K. <span className="text-fg-faint">→</span> <span className="text-primary">Demo Scheduled</span>
          </motion.div>
          <motion.div {...pop} transition={{ delay: 0.5 }} className={`${chip} bottom-4 right-4`}>
            <span className="h-2 w-2 rounded-full bg-green" /> Status: Interested
          </motion.div>
        </>
      );
    case "brand":
      return (
        <>
          <motion.div {...pop} className={`${chip} left-4 top-4`}>
            VILMS <span className="text-fg-faint">→</span> <span className="text-primary">ABC Academy</span>
          </motion.div>
          <motion.div {...pop} transition={{ delay: 0.15 }} className={`${chip} bottom-4 right-4 font-mono`}>
            abcacademy.in
          </motion.div>
        </>
      );
  }
}

/** The product drifts 2–5px toward the cursor, springily. Fine pointers only. */
function useFollow() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const enabled = fine && !reduced;
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 7);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };
  return { x, y, onMove, onLeave, enabled };
}

/** One product: its interface on one side, what it does on the other. */
function SlideCard({ slide, index, wide, active }: { slide: Slide; index: number; wide: boolean; active?: boolean }) {
  const [hover, setHover] = useState(false);
  const follow = useFollow();
  const page = PAGES[slide.key];
  const Icon = ICONS[page.icon];
  const size = STAGE_SIZE[slide.stage];
  return (
    <article
      aria-label={page.name}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={clsx(
        "group relative flex shrink-0 overflow-hidden rounded-[28px] border bg-canvas-alt transition-[transform,border-color,box-shadow] duration-300 ease-out",
        hover ? "-translate-y-1.5 border-primary/70 shadow-[0_28px_60px_-28px_rgb(14_27_44/0.45)]" : active ? "border-primary/35 shadow-[0_18px_44px_-30px_rgb(14_27_44/0.35)]" : "border-edge",
        wide ? "h-full w-[min(1080px,calc(100vw-96px))] flex-row" : "w-[86vw] max-w-[440px] snap-center flex-col sm:w-[70vw]",
      )}
    >
      <div className={clsx("relative z-10 flex flex-col justify-between", wide ? "w-[330px] shrink-0 p-8 xl:w-[360px] xl:p-10" : "p-5 pb-6 sm:p-6")}>
        <div>
          <p className="flex items-center gap-2.5 font-mono text-[12px] tabular-nums text-fg-faint">
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-navy text-white">
              <Icon aria-hidden className="h-4 w-4" />
            </span>
            {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </p>
          <h3 className={clsx("mt-5 font-medium leading-[1.05] tracking-[-0.03em]", wide ? "text-[clamp(28px,2.6vw,38px)]" : "text-[26px]")}>{page.name}</h3>
          <p className="mt-3 text-[15.5px] leading-relaxed text-fg-muted">{slide.line}</p>
          <ul className="mt-5 space-y-2">
            {slide.points.map((t) => (
              <li key={t} className="flex gap-2.5 text-[14.5px] leading-snug text-fg-muted">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link href={page.path} className="cta cta-primary cta-sm">
            {slide.cta} <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <Cta intent="demo" location={`showcase_${slide.key}`} className="cta cta-ghost cta-sm">
            Book a Demo
          </Cta>
        </div>
      </div>

      {/* the product — it gets the larger share */}
      <div className={clsx("relative min-w-0 flex-1", wide ? "p-5 pl-0 xl:p-6 xl:pl-0" : "px-3 pb-4 sm:px-4")}>
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div
          onPointerMove={wide ? follow.onMove : undefined}
          onPointerLeave={wide ? follow.onLeave : undefined}
          className={clsx("relative overflow-hidden rounded-[16px] border bg-panel shadow-window transition-[border-color] duration-300", hover ? "border-primary/40" : "border-edge", wide ? "h-full" : "max-h-[380px]")}
        >
          {wide ? (
            <motion.div style={follow.enabled ? { x: follow.x, y: follow.y } : undefined} animate={{ scale: hover ? 1.02 : 1 }} transition={{ duration: 0.35 }} className="h-full w-full">
              <ScaledVisual width={size.w} height={size.h} fit="contain">
                <div style={{ width: size.w, height: size.h }} className="bg-canvas">
                  <StageBody stage={slide.stage} />
                </div>
              </ScaledVisual>
            </motion.div>
          ) : (
            <div className="pointer-events-none select-none" aria-hidden>
              <StageBody stage={slide.stage} compact />
            </div>
          )}
          <AnimatePresence>{wide && hover ? <HoverLayer key="hover" stage={slide.stage} /> : null}</AnimatePresence>
        </div>
      </div>
    </article>
  );
}

export function ProductShowcase() {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduced = useReducedMotion();
  const pinned = desktop && !reduced;

  return (
    <section id="product" aria-labelledby="showcase-title" className="scroll-mt-20">
      {pinned ? <Pinned /> : <Swipe />}
      <span id="showcase-title" className="sr-only">
        VILMS products
      </span>
    </section>
  );
}

/* ---------------- desktop: pinned, scroll-driven ---------------- */

/** The card in focus is full strength; the others recede a little (never vanish). */
function Focus({ progress, index, children, onFocusCapture }: { progress: MotionValue<number>; index: number; children: React.ReactNode; onFocusCapture: () => void }) {
  const f = useTransform(progress, (v) => 1 - Math.min(1, Math.abs(v * (SLIDES.length - 1) - index)));
  const scale = useTransform(f, [0, 1], [0.97, 1]);
  const opacity = useTransform(f, [0, 1], [0.6, 1]);
  return (
    <motion.div style={{ scale, opacity }} className="h-full origin-center" onFocusCapture={onFocusCapture}>
      {children}
    </motion.div>
  );
}

function Pinned() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  // How far the track has to travel: its full width minus one screen.
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const viewport = el.parentElement;
    // The track is `w-max`, so compare its full width with the viewport it slides in.
    const measure = () => setDistance(Math.max(0, el.scrollWidth - (viewport?.clientWidth ?? window.innerWidth)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (viewport) ro.observe(viewport);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.35 });
  const x = useTransform(smooth, (v) => -v * distance);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(SLIDES.length - 1, Math.max(0, Math.round(v * (SLIDES.length - 1))))));

  // Jump to a card by scrolling the page to where that card is centred.
  const goTo = useCallback(
    (i: number) => {
      const el = section.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (i / (SLIDES.length - 1)) * distance, behavior: "smooth" });
    },
    [distance],
  );

  // Keyboard users tabbing into an off-screen card bring it into view.
  const onFocus = (i: number) => {
    if (i !== active) goTo(i);
  };

  useEffect(() => {
    if (active > 0) track_view(SLIDES[active].key);
  }, [active]);

  return (
    <div ref={section} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col overflow-x-clip pb-8 pt-[92px]">
        <div className="wrap flex w-full items-end justify-between gap-8 pb-5">
          <div>
            <p className="kicker">One platform, six products</p>
            <h2 className="mt-3 font-display text-[clamp(28px,3.2vw,46px)] font-medium leading-[1.04] tracking-[-0.035em]">
              Pick a product. <span className="text-fg-muted">See it work.</span>
            </h2>
          </div>

          {/* where you are */}
          <div className="w-[260px] shrink-0 pb-1.5" aria-hidden>
            <div className="flex items-baseline justify-between font-mono text-[12px] tabular-nums text-fg-muted">
              <span>
                <span className="text-[20px] text-fg">{String(active + 1).padStart(2, "0")}</span> / {String(SLIDES.length).padStart(2, "0")}
              </span>
              <span className="truncate pl-4 text-fg-faint">{PAGES[SLIDES[active].key].name}</span>
            </div>
            <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-edge">
              <motion.span className="block h-full origin-left rounded-full bg-navy" style={{ scaleX: bar }} />
            </div>
            <div className="mt-2.5 flex gap-1.5">
              {SLIDES.map((s, i) => (
                <button key={s.key} type="button" tabIndex={-1} onClick={() => goTo(i)} className={clsx("h-1.5 flex-1 rounded-full transition-colors", i <= active ? "bg-primary" : "bg-edge-strong/60")} />
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <motion.div
            ref={track}
            style={{ x }}
            className="flex h-full w-max gap-6 pl-[max(24px,calc((100vw-1240px)/2+40px))] pr-[max(24px,calc((100vw-1240px)/2+40px))] will-change-transform"
          >
            {SLIDES.map((s, i) => (
              <Focus key={s.key} progress={smooth} index={i} onFocusCapture={() => onFocus(i)}>
                <SlideCard slide={s} index={i} wide active={i === active} />
              </Focus>
            ))}
          </motion.div>
        </div>
        <p className="wrap mt-3 text-[12px] text-fg-faint">Illustrative interface · sample data · keep scrolling</p>
      </div>
    </div>
  );
}

function track_view(key: PageKey) {
  track("feature_view", key);
}

/* ---------------- phone / tablet / reduced motion: swipe cards ---------------- */

function Swipe() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const el = scroller.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <div className="py-14 sm:py-20">
      <div className="wrap">
        <p className="kicker">One platform, six products</p>
        <h2 className="mt-3 font-display text-[clamp(30px,8vw,44px)] font-medium leading-[1.05] tracking-[-0.035em]">
          Pick a product. <span className="text-fg-muted">See it work.</span>
        </h2>
      </div>

      <div
        ref={scroller}
        role="group"
        aria-label="Products — swipe sideways"
        tabIndex={0}
        className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-[7vw] pb-2 focus-visible:outline-none sm:px-[15vw]"
      >
        {SLIDES.map((s, i) => (
          <SlideCard key={s.key} slide={s} index={i} wide={false} />
        ))}
      </div>

      <div className="wrap mt-4">
        <div className="flex items-center justify-between font-mono text-[12px] tabular-nums text-fg-muted">
          <span>
            <span className="text-[18px] text-fg">{String(active + 1).padStart(2, "0")}</span> / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <span className="text-fg-faint">Swipe →</span>
        </div>
        <div className="mt-2 flex gap-1.5">
          {SLIDES.map((s, i) => (
            <button key={s.key} type="button" aria-label={`Show ${PAGES[s.key].name}`} onClick={() => goTo(i)} className={clsx("h-1.5 flex-1 rounded-full transition-colors", i === active ? "bg-navy" : "bg-edge-strong/60")} />
          ))}
        </div>
        <p className="mt-3 text-[11.5px] text-fg-faint">Illustrative interface · sample data</p>
      </div>
    </div>
  );
}
