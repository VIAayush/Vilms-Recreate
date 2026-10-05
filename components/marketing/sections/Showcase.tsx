"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, MessageSquare, Mic, Users, Video } from "lucide-react";
import { showcase } from "@/lib/content";
import { useInView, useReducedMotion } from "../motion";
import { AssessScreen, GrowScreen, PaymentsScreen, TeachScreen } from "../screens/explorer";
import { LiveDashboard } from "../screens/LiveDashboard";
import { Avatar, BrowserFrame, LiveDot } from "../screens/primitives";

const DWELL = 5500;

function LiveClassScreen() {
  const people = ["Sneha P", "Aman V", "Isha M", "Karan S", "Divya R", "Arjun T"];
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-[1fr_210px] sm:p-4">
      <div className="relative overflow-hidden rounded-xl bg-[rgb(23_23_23)] p-3 text-white">
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <LiveDot /> Live · Polity · Batch A
          <span className="ml-auto rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium">42 joined</span>
        </div>
        <div className="mt-3 grid aspect-[16/8] place-items-center rounded-lg bg-[radial-gradient(circle_at_50%_40%,rgb(60_64_67),rgb(32_33_36))]">
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[rgb(26_115_232)] text-[18px] font-semibold">MI</span>
            <p className="mt-2 text-[12px] text-white/80">Meera Iyer · presenting</p>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-6 gap-1.5">
          {people.map((p, i) => (
            <div key={p} className="grid aspect-video place-items-center rounded-md bg-white/10">
              <Avatar name={p} size="sm" tone={i % 5} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {[Mic, Video, MessageSquare, Users].map((I, i) => (
            <span key={i} className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
              <I aria-hidden className="h-3.5 w-3.5" />
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-edge bg-panel p-3">
          <p className="text-[10.5px] text-fg-muted">Part of</p>
          <p className="text-[12.5px] font-semibold">Prelims Foundation Batch</p>
          <p className="mt-2 text-[10.5px] text-fg-muted">Zoom link attached · reminders sent</p>
        </div>
        <div className="rounded-xl border border-edge bg-panel p-3">
          <p className="text-[10.5px] text-fg-muted">RSVPs</p>
          <p className="font-display text-[24px] font-semibold">42</p>
          <div className="mt-1 h-1.5 rounded-full bg-sunken">
            <div className="h-full w-[84%] rounded-full bg-green" />
          </div>
          <p className="mt-1.5 text-[10.5px] text-fg-muted">of 50 in the batch</p>
        </div>
      </div>
    </div>
  );
}

const SLIDES: Record<string, { url: string; render: () => React.ReactNode }> = {
  dashboard: { url: "", render: () => <LiveDashboard compact /> },
  courses: { url: "yourinstitute.vilms.in/admin/courses", render: () => <TeachScreen active={null} /> },
  live: { url: "yourinstitute.vilms.in/live/polity-batch-a", render: () => <LiveClassScreen /> },
  evaluation: { url: "yourinstitute.vilms.in/admin/evaluations", render: () => <AssessScreen active={null} /> },
  crm: { url: "yourinstitute.vilms.in/admin/leads", render: () => <GrowScreen active={null} /> },
  payments: { url: "yourinstitute.vilms.in/admin/payments", render: () => <PaymentsScreen active={null} /> },
};

export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const n = showcase.slides.length;
  const playing = inView && !paused && !reduced;

  const go = (next: number) => {
    setDir(next > i || (i === n - 1 && next === 0) ? 1 : -1);
    setI((next + n) % n);
  };

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      setDir(1);
      setI((v) => (v + 1) % n);
    }, DWELL);
    return () => window.clearTimeout(t);
  }, [playing, i, n]);

  const slide = showcase.slides[i];
  const S = SLIDES[slide.id];

  return (
    <section
      ref={ref}
      id="platform"
      aria-labelledby="platform-title"
      aria-roledescription="carousel"
      className="band-navy relative overflow-hidden py-24 sm:py-32"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1.3px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="wrap relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker text-white/70">{showcase.kicker}</p>
            <h2 id="platform-title" className="h2 mt-4 text-white">
              {showcase.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous screen" onClick={() => go(i - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white/10">
              <ArrowLeft aria-hidden className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next screen" onClick={() => go(i + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white/10">
              <ArrowRight aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* the stage: drag/swipe to change */}
        <div
          className="relative mt-10 [perspective:1400px]"
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={slide.id}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 80, rotateY: d * -6, scale: 0.96 }),
                center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
                exit: (d: number) => ({ opacity: 0, x: d * -80, rotateY: d * 6, scale: 0.96 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(i + 1);
                else if (info.offset.x > 60) go(i - 1);
              }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${slide.label}`}
              className="mx-auto max-w-[1040px] cursor-grab active:cursor-grabbing"
            >
              {S.url ? <BrowserFrame url={S.url}>{S.render()}</BrowserFrame> : S.render()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* progress tabs */}
        <ol className="mx-auto mt-10 grid max-w-[1040px] grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-6">
          {showcase.slides.map((s, k) => {
            const on = k === i;
            return (
              <li key={s.id}>
                <button type="button" onClick={() => go(k)} aria-current={on ? "true" : undefined} className="group block w-full text-left">
                  <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/15">
                    {on ? (
                      <span
                        key={`${s.id}-${playing}`}
                        className="absolute inset-y-0 left-0 w-full rounded-full bg-white"
                        style={playing ? { animation: `hero-fill ${DWELL}ms linear both` } : undefined}
                      />
                    ) : k < i ? (
                      <span className="absolute inset-0 rounded-full bg-white/40" />
                    ) : null}
                  </span>
                  <span className="mt-3 flex items-baseline gap-2">
                    <span className="font-mono text-[11px] text-white/50">0{k + 1}</span>
                    <span className={clsx("text-[14px] font-semibold transition-colors", on ? "text-white" : "text-white/60 group-hover:text-white/90")}>{s.label}</span>
                  </span>
                  <span className={clsx("mt-1 hidden text-[12.5px] leading-snug transition-colors md:block", on ? "text-white/75" : "text-white/40")}>{s.line}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
