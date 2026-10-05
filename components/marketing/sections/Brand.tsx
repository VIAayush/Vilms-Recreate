"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, Lock, PlayCircle } from "lucide-react";
import { whiteLabel } from "@/lib/content";
import { BrandMark } from "../BrandMark";
import { useInView } from "../motion";

const DEFAULT = { name: "VILMS", host: "yourinstitute.vilms.in", colour: "#5F6368" };

// One switch, and the student-facing product changes hands: logo, colours,
// domain, certificate, app. Flips by itself the first time it's seen.
export function Brand() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-35% 0px" });
  const [branded, setBranded] = useState(false);
  const [colour, setColour] = useState(whiteLabel.swatches[1]);
  const [userTouched, setUserTouched] = useState(false);

  useEffect(() => {
    if (!inView || userTouched) return;
    const t = window.setTimeout(() => setBranded(true), 900);
    return () => window.clearTimeout(t);
  }, [inView, userTouched]);

  const c = branded ? colour : DEFAULT.colour;
  const name = branded ? whiteLabel.institute : DEFAULT.name;
  const host = branded ? whiteLabel.domain : DEFAULT.host;

  return (
    <section ref={ref} id="brand" aria-labelledby="brand-title" className="overflow-hidden bg-canvas-alt py-24 sm:py-32">
      <div className="wrap text-center">
        <p className="kicker justify-center">{whiteLabel.kicker}</p>
        <h2 id="brand-title" className="h2 mx-auto mt-4 max-w-[16ch]">
          {whiteLabel.title}
        </h2>

        {/* the switch */}
        <div className="mt-9 inline-flex rounded-full border border-edge bg-panel p-1 shadow-soft" role="group" aria-label="Preview">
          {[
            { on: false, label: "VILMS default" },
            { on: true, label: "Your brand" },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              aria-pressed={branded === o.on}
              onClick={() => {
                setBranded(o.on);
                setUserTouched(true);
              }}
              className="relative rounded-full px-5 py-2.5 text-[14px] font-semibold"
            >
              {branded === o.on ? <motion.span layoutId="brand-switch" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 380, damping: 32 }} /> : null}
              <span className={clsx("relative transition-colors", branded === o.on ? "text-canvas" : "text-fg-muted")}>{o.label}</span>
            </button>
          ))}
        </div>
        <div className={clsx("mt-4 flex justify-center gap-2 transition-opacity duration-500", branded ? "opacity-100" : "pointer-events-none opacity-0")} aria-hidden={!branded}>
          {whiteLabel.swatches.map((s) => (
            <button
              key={s}
              type="button"
              aria-label={`Brand colour ${s}`}
              aria-pressed={colour === s}
              tabIndex={branded ? 0 : -1}
              onClick={() => {
                setColour(s);
                setUserTouched(true);
              }}
              className="grid h-8 w-8 place-items-center rounded-full text-white shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)] transition-transform hover:scale-110"
              style={{ background: s }}
            >
              {colour === s ? <Check aria-hidden className="h-4 w-4" /> : null}
            </button>
          ))}
        </div>
      </div>

      {/* the composition: portal, app, certificate */}
      <div className="wrap mt-12">
        <div className="relative mx-auto max-w-[1000px] pb-8 sm:pb-16">
          <div className="window text-left" data-tilt="2">
            <span aria-hidden className="tilt-glare" />
            <div className="flex items-center gap-3 border-b border-edge px-4 py-2.5">
              <span aria-hidden className="flex gap-1.5">
                <i className="h-2.5 w-2.5 rounded-full bg-edge" />
                <i className="h-2.5 w-2.5 rounded-full bg-edge" />
                <i className="h-2.5 w-2.5 rounded-full bg-edge" />
              </span>
              <span className="mx-auto flex items-center gap-1.5 rounded-md bg-canvas-alt px-3 py-1 font-mono text-[11px] text-fg-muted">
                <Lock aria-hidden className="h-3 w-3" />
                <AnimatePresence mode="wait">
                  <motion.span key={host} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
                    {host}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-4 sm:px-8">
              <Logo branded={branded} colour={c} />
              <AnimatePresence mode="wait">
                <motion.span key={name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-[15px] font-semibold">
                  {name}
                </motion.span>
              </AnimatePresence>
              <span className="ml-auto hidden gap-6 text-[13px] text-fg-muted sm:flex">
                <span>Courses</span>
                <span>Free materials</span>
                <span>Webinars</span>
              </span>
              <span className="rounded-full px-4 py-1.5 text-[12.5px] font-semibold text-white transition-colors duration-700" style={{ background: c }}>
                Enrol now
              </span>
            </div>
            <div className="px-5 pb-6 sm:px-8 sm:pb-8">
              <div className="grid items-center gap-6 rounded-2xl p-6 text-white transition-colors duration-700 sm:grid-cols-[1.4fr_1fr] sm:p-8" style={{ background: c }}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">Hybrid · recorded + live</p>
                  <p className="mt-2 font-display text-[clamp(22px,3vw,34px)] font-semibold leading-tight tracking-tight">Prelims Foundation Batch</p>
                  <p className="mt-2 text-[13.5px] text-white/80">Weekly live classes, answer writing with mentor evaluation, certificate on completion.</p>
                  <span className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-[rgb(32_33_36)]">Enrol · ₹15,000</span>
                </div>
                <div className="hidden aspect-video place-items-center rounded-xl bg-white/10 sm:grid">
                  <PlayCircle aria-hidden className="h-12 w-12 text-white/80" />
                </div>
              </div>
            </div>
          </div>

          {/* app */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-2 right-2 hidden w-[180px] rounded-[30px] border-[6px] border-[rgb(32_33_36)] bg-panel p-3 text-left shadow-window md:block lg:-right-8"
          >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-edge" />
            <Logo branded={branded} colour={c} />
            <p className="mt-2 truncate text-[12.5px] font-semibold">{name}</p>
            <p className="text-[10.5px] text-fg-muted">Your app · Android &amp; iOS</p>
            <div className="mt-3 space-y-1.5">
              {["Polity · Lesson 3", "Mock test 4", "Live at 7 PM"].map((t) => (
                <div key={t} className="rounded-lg bg-canvas-alt px-2 py-1.5 text-[10.5px]">
                  {t}
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg py-1.5 text-center text-[11px] font-semibold text-white transition-colors duration-700" style={{ background: c }}>
              Continue learning
            </div>
          </motion.div>

          {/* certificate */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-4 -left-6 hidden w-[250px] rounded-xl border border-edge bg-panel p-4 text-center shadow-window lg:block"
          >
            <div className="mx-auto w-fit">
              <Logo branded={branded} colour={c} />
            </div>
            <p className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.2em] text-fg-muted">Certificate of completion</p>
            <p className="mt-1 font-serif text-[22px] italic leading-none">Rahul Kumar</p>
            <p className="mt-1.5 text-[10.5px] text-fg-muted">Issued by {name}</p>
          </motion.div>
        </div>
        <p className="mt-6 text-center text-[15px] font-semibold">
          {branded ? "Students see your brand. Never “VILMS”." : "Flip the switch →"}
        </p>
      </div>
    </section>
  );
}

function Logo({ branded, colour }: { branded: boolean; colour: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {branded ? (
        <motion.span
          key="abc"
          initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[12px] font-bold text-white transition-colors duration-700"
          style={{ background: colour }}
        >
          ABC
        </motion.span>
      ) : (
        <motion.span key="vilms" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className="grid h-9 w-9 shrink-0 place-items-center">
          <BrandMark className="h-7 w-9" />
        </motion.span>
      )}
    </AnimatePresence>
  );
}
