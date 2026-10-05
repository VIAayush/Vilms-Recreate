"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Check } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { hero } from "@/lib/content";
import { Magnetic } from "../Magnetic";
import { useReducedMotion } from "../motion";
import { LiveDashboard } from "../screens/LiveDashboard";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// Attention, positioning, the product, a button. Very little text: the live
// dashboard underneath does the explaining. It starts tilted back, like a
// screen on a desk, and straightens as the page scrolls.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.93, 1]);
  const y = useTransform(scrollYProgress, [0, 0.35], [0, -20]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      {/* backdrop: a faint dotted floor and one soft pool of blue */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[780px] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(var(--primary)/0.10),transparent_70%)]" />
        <div className="absolute inset-x-0 top-[420px] h-[900px] [background-image:radial-gradient(rgb(var(--foreground)/0.09)_1px,transparent_1.3px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_60%,transparent)]" />
      </div>

      <div className="wrap text-center">
        <motion.p {...rise(0)} className="mx-auto inline-flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] text-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {hero.eyebrow}
        </motion.p>
        <h1 id="hero-title" className="display mx-auto mt-6 max-w-[14ch] text-balance text-[clamp(44px,7.6vw,112px)]">
          <motion.span {...rise(0.08)} className="block">
            {hero.lines[0]}
          </motion.span>
          <motion.span {...rise(0.18)} className="block text-primary">
            {hero.lines[1]}
          </motion.span>
        </h1>
        <motion.p {...rise(0.3)} className="mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed text-fg-muted sm:text-[19px]">
          {hero.sub}
        </motion.p>
        <motion.div {...rise(0.4)} className="mt-9 flex flex-col items-center justify-center gap-3 min-[460px]:flex-row">
          <Magnetic>
            <Cta intent="trial" location="hero" className="cta cta-primary cta-lg w-full min-[460px]:w-auto" arrow>
              Start 14-Day Free Trial
            </Cta>
          </Magnetic>
          <Cta intent="demo" location="hero" className="cta cta-outline cta-lg w-full min-[460px]:w-auto">
            Book a Demo
          </Cta>
        </motion.div>
        <motion.ul {...rise(0.5)} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[13px] text-fg-muted">
          {hero.notes.map((n) => (
            <li key={n} className="flex items-center gap-1.5">
              <Check aria-hidden className="h-3.5 w-3.5 text-green" strokeWidth={3} />
              {n}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="wrap mt-14 sm:mt-16 [perspective:1600px]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={reduced ? undefined : { rotateX, scale, y, transformOrigin: "50% 0%" }}
          className="mx-auto max-w-[1080px]"
        >
          <LiveDashboard />
        </motion.div>
        <p className="mt-5 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Illustrative interface · sample data</p>
      </div>
    </section>
  );
}
