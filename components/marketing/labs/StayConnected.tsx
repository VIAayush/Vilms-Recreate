"use client";

import { useRef } from "react";
import clsx from "clsx";
import { motion, useInView } from "motion/react";
import { Cta } from "@/components/site/Cta";
import { connect } from "@/lib/content";
import { useMediaQuery, useReducedMotion } from "../motion";
import { Shape, type ShapeKind } from "./Shapes";

// The closing call to action over a pile of brand shapes that tumble in
// from above. Grab one and throw it — it springs back.
const PILE: { kind: ShapeKind; color: string; cls: string; rot: number }[] = [
  { kind: "circle", color: "text-navy", cls: "left-[-2%] top-[2%] w-[26%]", rot: 0 },
  { kind: "circle", color: "text-primary", cls: "left-[21%] top-[0%] w-[25%]", rot: 0 },
  { kind: "hexagon", color: "text-gold", cls: "left-[46%] top-[6%] w-[24%]", rot: 18 },
  { kind: "flower", color: "text-sky", cls: "left-[70%] top-[-2%] w-[26%]", rot: -8 },
  { kind: "squircle", color: "text-silver", cls: "left-[0%] top-[44%] w-[22%]", rot: -4 },
  { kind: "squircle", color: "text-sky", cls: "left-[21%] top-[46%] w-[22%]", rot: 3 },
  { kind: "pentagon", color: "text-navy", cls: "left-[43%] top-[44%] w-[23%]", rot: -6 },
  { kind: "flower", color: "text-gold", cls: "left-[66%] top-[42%] w-[23%]", rot: 12 },
  { kind: "circle", color: "text-primary", cls: "left-[80%] top-[44%] w-[20%]", rot: 0 },
];

export function StayConnected() {
  const pile = useRef<HTMLDivElement>(null);
  const inView = useInView(pile, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const grab = fine && !reduced;

  return (
    <section className="overflow-hidden pt-20 sm:pt-28">
      <div className="wrap text-center">
        <h2 className="mx-auto max-w-[820px] text-balance text-[clamp(34px,5vw,60px)] font-normal leading-[1.08] tracking-[-0.035em]">{connect.title}</h2>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Cta intent="trial" location="stay_connected" className="cta cta-primary cta-lg w-full rounded-full sm:w-auto">
            Start 14-Day Free Trial
          </Cta>
          <Cta intent="demo" location="stay_connected" className="cta cta-ghost cta-lg w-full rounded-full sm:w-auto">
            Book a Demo
          </Cta>
        </div>
      </div>

      <div className="wrap">
        <div ref={pile} aria-hidden className="relative mt-16 aspect-[2.6/1] w-full sm:mt-20">
          {PILE.map((s, i) => (
            <motion.div
              key={i}
              className={clsx("absolute", grab && "cursor-grab touch-none active:cursor-grabbing", s.cls, s.color)}
              initial={reduced ? false : { y: "-140%", rotate: s.rot - 40, opacity: 0 }}
              animate={inView || reduced ? { y: 0, rotate: s.rot, opacity: 1 } : undefined}
              transition={{ type: "spring", stiffness: 90, damping: 11, mass: 0.9, delay: reduced ? 0 : 0.05 * ((i * 7) % PILE.length) }}
              drag={grab}
              dragSnapToOrigin
              dragElastic={0.5}
              whileHover={!grab ? undefined : { scale: 1.04, rotate: s.rot + 6 }}
              whileDrag={{ scale: 1.08, zIndex: 10 }}
            >
              <Shape kind={s.kind} className="pointer-events-none w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
