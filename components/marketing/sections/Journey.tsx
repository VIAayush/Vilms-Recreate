"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Award, BookOpen, Database, PenLine, Repeat2, UserPlus, UserRound } from "lucide-react";
import { lifecycle } from "@/lib/content";
import { useMediaQuery, useReducedMotion } from "../motion";
import { Avatar } from "../screens/primitives";
import { CertScene, CourseScene, EnrolScene, EvalScene, LeadScene, RenewScene } from "../screens/scenes";

const VISUALS = [LeadScene, EnrolScene, CourseScene, () => <EvalScene />, () => <CertScene />, RenewScene];
// who Rahul is at each stage — the token transforms as he travels
const ROLE = [
  { icon: UserPlus, label: "Lead", tone: "bg-primary" },
  { icon: UserRound, label: "Student", tone: "bg-green" },
  { icon: BookOpen, label: "Learner", tone: "bg-navy" },
  { icon: PenLine, label: "Answer submitted", tone: "bg-purple" },
  { icon: Award, label: "Graduate", tone: "bg-yellow" },
  { icon: Repeat2, label: "Next batch", tone: "bg-primary" },
];
const STATION = 460; // px per station on desktop

export function Journey() {
  const pinnable = useMediaQuery("(min-width: 1024px) and (min-height: 700px)");
  const reduced = useReducedMotion();
  return pinnable && !reduced ? <PinnedJourney /> : <StackedJourney />;
}

/* Desktop: the section pins; scrolling slides the stations past Rahul. */
function PinnedJourney() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const n = lifecycle.stages.length;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDistance(Math.max(0, el.scrollWidth - el.parentElement!.clientWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(n - 1, Math.round(p * (n - 1)))));

  const Role = ROLE[active];
  return (
    <section ref={ref} id="journey" aria-labelledby="journey-title" className="relative bg-canvas-alt" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-14">
        <div className="wrap flex items-end justify-between gap-6">
          <div>
            <p className="kicker">{lifecycle.kicker}</p>
            <h2 id="journey-title" className="h2 mt-4">
              {lifecycle.title}
            </h2>
          </div>
          <p className="pb-2 font-mono text-[12px] tabular-nums text-fg-faint">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
        </div>

        <div className="relative mt-10">
          {/* the stations */}
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-0 pl-[max(40px,calc((100vw_-_1240px)/2_+_40px))] pr-[30vw]">
            {lifecycle.stages.map((s, i) => {
              const Visual = VISUALS[i];
              const on = i === active;
              return (
                <div key={s.id} style={{ width: STATION }} className="shrink-0 pr-10">
                  <motion.div animate={{ opacity: on ? 1 : 0.35, scale: on ? 1 : 0.94, y: on ? 0 : 10 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                    <p className="flex items-baseline gap-2.5">
                      <span className="font-mono text-[12px] text-fg-faint">0{i + 1}</span>
                      <span className="font-display text-[24px] font-semibold tracking-tight">{s.title}</span>
                    </p>
                    <p className="mt-1 text-[15px] text-fg-muted">{s.line}</p>
                    <div className="mt-5 [&>*]:shadow-window">
                      <Visual />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* the database rail, with Rahul travelling along it */}
          <div className="wrap mt-10">
            <div className="relative h-[3px] rounded-full bg-edge">
              <motion.div style={{ width: fill }} className="absolute inset-y-0 left-0 rounded-full bg-primary" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-6">
              <p className="flex items-center gap-2 text-[13px] text-fg-muted">
                <Database aria-hidden className="h-4 w-4 text-primary" /> One database — nothing re-typed by hand
              </p>
              <div className="flex items-center gap-3 rounded-full border border-edge bg-panel py-1.5 pl-1.5 pr-4 shadow-soft">
                <Avatar name="Rahul Kumar" tone={0} />
                <span className="text-[13.5px] font-semibold">Rahul Kumar</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={Role.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={clsx("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold text-white", Role.tone)}
                  >
                    <Role.icon aria-hidden className="h-3.5 w-3.5" /> {Role.label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Phones, tablets, reduced motion: a vertical timeline, one stage per step. */
function StackedJourney() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="bg-canvas-alt py-24">
      <div className="wrap">
        <p className="kicker">{lifecycle.kicker}</p>
        <h2 id="journey-title" className="h2 mt-4">
          {lifecycle.title}
        </h2>
        <ol className="relative mt-10 space-y-10 border-l-2 border-edge pl-6">
          {lifecycle.stages.map((s, i) => {
            const Visual = VISUALS[i];
            const Role = ROLE[i];
            return (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span className={clsx("absolute -left-[38px] top-0 grid h-7 w-7 place-items-center rounded-full text-white ring-4 ring-[rgb(var(--background-alt))]", Role.tone)}>
                  <Role.icon aria-hidden className="h-3.5 w-3.5" />
                </span>
                <p className="font-display text-[21px] font-semibold tracking-tight">{s.title}</p>
                <p className="mt-0.5 text-[14.5px] text-fg-muted">{s.line}</p>
                <div className="mt-4 max-w-[460px] [&>*]:shadow-soft">
                  <Visual />
                </div>
              </motion.li>
            );
          })}
        </ol>
        <p className="mt-8 flex items-center gap-2 text-[13px] text-fg-muted">
          <Database aria-hidden className="h-4 w-4 text-primary" /> One database — nothing re-typed by hand
        </p>
      </div>
    </section>
  );
}
