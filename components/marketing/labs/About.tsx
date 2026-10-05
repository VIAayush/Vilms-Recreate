"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { about } from "@/lib/content";
import { useReducedMotion } from "../motion";
import { Shape } from "./Shapes";

// A small label, then one big statement that fills in word by word as it
// scrolls through the viewport. The last phrase lands in the logo blue.
const words = about.statement.flatMap((phrase, p) =>
  phrase.split(" ").map((w) => ({ w, last: p === about.statement.length - 1 })),
);

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [lit, setLit] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setLit(Math.round(v * words.length * 1.1)));
  const shown = reduced ? words.length : lit;

  const driftA = useTransform(scrollYProgress, [0, 1], [30, -60]);
  const driftB = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const blob = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={ref} className="relative isolate scroll-mt-20 overflow-hidden py-24 sm:py-36">
      <motion.div aria-hidden style={{ y: blob }} className="absolute -right-[26%] bottom-[-18%] -z-10 w-[min(48vw,540px)] text-gold sm:-right-[16%]">
        <Shape kind="flower" className="w-full" />
      </motion.div>

      <div className="wrap text-center">
        {/* pills that float around the label */}
        <div aria-hidden className="relative mx-auto mb-8 h-20 w-[260px]">
          <motion.span style={{ y: driftA }} className="absolute left-0 top-2 -rotate-[24deg] rounded-full bg-sunken px-5 py-2.5 text-[15px] font-medium text-fg-muted shadow-sm">
            Teach
          </motion.span>
          <motion.span style={{ y: driftB }} className="absolute right-2 top-8 rotate-[18deg] rounded-full bg-navy px-5 py-2.5 text-[15px] font-medium text-white shadow-sm dark:text-[rgb(12_18_26)]">
            Grow
          </motion.span>
          <motion.span style={{ y: driftA }} className="absolute left-[38%] top-12 rotate-[8deg] rounded-full bg-sky/70 px-5 py-2.5 text-[15px] font-medium text-[rgb(0_48_86)] shadow-sm dark:text-white">
            Get paid
          </motion.span>
        </div>

        <p className="text-[12px] font-bold uppercase tracking-[0.06em]">{about.label}</p>
        <p className="mx-auto mt-6 max-w-[1080px] text-balance text-[clamp(28px,4.4vw,58px)] font-normal leading-[1.14] tracking-[-0.03em]">
          {words.map((x, i) => (
            <span
              key={i}
              className="transition-colors duration-300"
              style={{ color: i < shown ? (x.last ? "rgb(var(--primary))" : "rgb(var(--foreground))") : "rgb(var(--foreground) / 0.16)" }}
            >
              {x.w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
