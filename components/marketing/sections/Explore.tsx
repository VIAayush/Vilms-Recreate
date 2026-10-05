"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { TrackView } from "@/components/site/TrackView";
import { track } from "@/lib/client/tracking";
import { explore, type ExplorerTabId } from "@/lib/content";
import { EXPLORE_EVENT, tabFromHash } from "../explore-link";
import { useInView, useReducedMotion } from "../motion";
import { EXPLORER_SCREENS } from "../screens/explorer";
import { BrowserFrame } from "../screens/primitives";
import { CertScene, EvalScene, LeadScene, LiveScene, PayScene } from "../screens/scenes";
import { AREA_TONE, TONE } from "../tone";

const IDS = explore.areas.map((a) => a.id);
const DWELL = 6500;

// A small piece of the product that floats beside the main screen, so each
// area reads as an environment rather than one screenshot.
function Satellite({ id }: { id: ExplorerTabId }) {
  switch (id) {
    case "teach":
      return <LiveScene />;
    case "assess":
      return <EvalScene approved={false} />;
    case "grow":
      return <LeadScene />;
    case "payments":
      return <PayScene />;
    case "brand":
      return <CertScene name="ABC Coaching Institute" color="#003056" />;
    case "team":
      return (
        <div className="rounded-xl border border-edge bg-panel p-3.5">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-fg-muted">
            <ShieldCheck aria-hidden className="h-3.5 w-3.5 text-green" /> Neha · Sales / Counsellor can see
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11.5px]">
            {["Leads", "Roster", "Payments"].map((x) => (
              <span key={x} className="rounded-full bg-green-tint px-2.5 py-1 font-semibold text-green">
                {x}
              </span>
            ))}
            {["Grading", "Settings"].map((x) => (
              <span key={x} className="rounded-full bg-sunken px-2.5 py-1 text-fg-faint line-through">
                {x}
              </span>
            ))}
          </div>
        </div>
      );
  }
}

const BADGE: Record<ExplorerTabId, { icon: typeof Sparkles; text: string }> = {
  teach: { icon: ArrowRight, text: "Recorded · Live · Hybrid" },
  assess: { icon: Sparkles, text: "AI draft · mentor approves" },
  grow: { icon: MessageCircle, text: "WhatsApp follow-up sent" },
  payments: { icon: ArrowRight, text: "0% revenue share" },
  brand: { icon: ArrowRight, text: "learn.abccoaching.in" },
  team: { icon: ShieldCheck, text: "Each role sees only what it should" },
};

export function Explore() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const [id, setId] = useState<ExplorerTabId>("teach");
  const [hover, setHover] = useState(false);
  const [touched, setTouched] = useState(false); // stop auto-advancing once the visitor chooses
  const area = explore.areas.find((a) => a.id === id) ?? explore.areas[0];
  const tone = TONE[AREA_TONE[id]];
  const { url, Screen } = EXPLORER_SCREENS[id];
  const auto = inView && !hover && !touched && !reduced;

  useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => setId((cur) => IDS[(IDS.indexOf(cur) + 1) % IDS.length]), DWELL);
    return () => window.clearTimeout(t);
  }, [auto, id]);

  // deep links: /#explore-assess, and in-page events
  useEffect(() => {
    const fromHash = () => {
      const h = tabFromHash(window.location.hash, IDS);
      if (h) {
        setId(h);
        setTouched(true);
      }
    };
    const onEvent = (e: Event) => {
      setId((e as CustomEvent<ExplorerTabId>).detail);
      setTouched(true);
    };
    const raf = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    window.addEventListener(EXPLORE_EVENT, onEvent);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener(EXPLORE_EVENT, onEvent);
    };
  }, []);

  const choose = (next: ExplorerTabId) => {
    setId(next);
    setTouched(true);
    track("feature_view", next);
  };
  const Badge = BADGE[id];

  return (
    <section ref={ref} id="explore" aria-labelledby="explore-title" className="py-24 sm:py-32">
      <TrackView name="feature_view" label="explore" />
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker">{explore.kicker}</p>
            <h2 id="explore-title" className="h2 mt-4 max-w-[14ch]">
              {explore.title}
            </h2>
          </div>
          <p className="max-w-[300px] text-[16px] text-fg-muted lg:pb-2 lg:text-right">{explore.sub}</p>
        </div>

        {/* category chips — Labs-style filters, with a progress fill while auto-playing */}
        <div role="tablist" aria-label="Areas of the platform" className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {explore.areas.map((a) => {
            const on = a.id === id;
            const t = TONE[AREA_TONE[a.id]];
            return (
              <button
                key={a.id}
                role="tab"
                aria-selected={on}
                aria-controls="explore-stage"
                onClick={() => choose(a.id)}
                data-cursor={AREA_TONE[a.id] === "yellow" ? undefined : AREA_TONE[a.id]}
                className={clsx(
                  "relative shrink-0 overflow-hidden rounded-full border px-5 py-2.5 text-[15px] font-semibold transition-colors duration-300",
                  on ? "border-fg bg-fg text-canvas" : "border-edge bg-panel text-fg-muted hover:border-edge-strong hover:text-fg",
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className={clsx("h-2 w-2 rounded-full", t.fill)} />
                  {a.label}
                </span>
                {on && auto ? (
                  <span key={id} aria-hidden className="absolute inset-y-0 left-0 bg-canvas/15" style={{ animation: `hero-fill ${DWELL}ms linear both`, width: "100%" }} />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* the stage */}
        <div
          id="explore-stage"
          role="tabpanel"
          aria-label={area.label}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
          className={clsx("relative mt-6 overflow-hidden rounded-[28px] border border-edge transition-colors duration-700 sm:rounded-[36px]", tone.wash)}
        >
          <div aria-hidden className="absolute inset-0 [background-image:radial-gradient(rgb(var(--foreground)/0.07)_1px,transparent_1.3px)] [background-size:22px_22px]" />
          <div className="relative grid min-h-[520px] items-center gap-6 p-4 sm:p-8 lg:min-h-[600px] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={`main-${id}`}
                initial={{ opacity: 0, y: 30, rotateX: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 1200 }}
              >
                <BrowserFrame url={url} tilt={3}>
                  <Screen active={null} />
                </BrowserFrame>
              </motion.div>
            </AnimatePresence>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`side-${id}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <div className="hidden shadow-window sm:block [&>*]:rounded-xl">
                    <Satellite id={id} />
                  </div>
                  <div>
                    <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold", tone.tint)}>
                      <Badge.icon aria-hidden className="h-3.5 w-3.5" />
                      {Badge.text}
                    </span>
                    <h3 className="mt-4 font-display text-[clamp(24px,2.6vw,34px)] font-semibold leading-[1.1] tracking-[-0.03em]">{area.title}</h3>
                    <p className="mt-2 text-[15.5px] text-fg-muted">{area.line}</p>
                    <Cta intent="demo" location={`explore_${id}`} className="cta cta-outline mt-5" arrow>
                      {area.cta}
                    </Cta>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
