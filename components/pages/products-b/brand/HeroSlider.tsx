"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserFrame, Illustrative } from "@/components/marketing/screens/primitives";
import { useInView, useReducedMotion } from "@/components/marketing/motion";
import { BrandPortal } from "./pieces";
import { addressOf, DEFAULT_BRAND, type Brand } from "./brand";

const BEFORE: Brand = { ...DEFAULT_BRAND, branded: false };
const AFTER: Brand = DEFAULT_BRAND;

/**
 * Hero: the same student portal before and after branding, split by a handle
 * you can drag (or move with the arrow keys). It sweeps by itself until you
 * touch it.
 */
export function HeroSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-5% 0px" });
  const reduced = useReducedMotion();
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const drag = useRef(false);

  useEffect(() => {
    if (!inView || touched || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      setPos(50 + Math.sin(((t - t0) / 1000) * 0.9) * 32);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, touched, reduced]);

  const setFromX = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <div
        ref={ref}
        className="relative touch-pan-y select-none"
        onPointerDown={(e) => {
          drag.current = true;
          setTouched(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => drag.current && setFromX(e.clientX)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
      >
        <BrowserFrame url={addressOf(BEFORE)} className="rounded-[18px]">
          <BrandPortal b={BEFORE} />
        </BrowserFrame>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} aria-hidden>
          <BrowserFrame url={addressOf(AFTER)} className="h-full rounded-[18px]">
            <BrandPortal b={AFTER} />
          </BrowserFrame>
        </div>

        <span className="pointer-events-none absolute left-3 top-14 z-10 rounded-full bg-navy px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">VILMS default</span>
        <span className="pointer-events-none absolute right-3 top-14 z-10 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ background: AFTER.color, color: "#fff" }}>
          ABC Academy
        </span>

        <div
          role="slider"
          tabIndex={0}
          aria-label="Compare VILMS default with a branded institute portal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              e.preventDefault();
              setTouched(true);
              setPos((p) => Math.min(96, Math.max(4, p + (e.key === "ArrowRight" ? 6 : -6))));
            }
          }}
          className="absolute inset-y-0 z-20 -ml-4 flex w-8 cursor-ew-resize items-center justify-center outline-none"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(14_27_44/0.18)]" />
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white text-[#0E1B2C] shadow-lift ring-1 ring-black/10 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary">
            <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4">
              <path d="M5 4 1.5 8 5 12M11 4l3.5 4L11 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <Illustrative />
        <p className="text-[12.5px] text-fg-muted">Drag to compare</p>
      </div>
    </div>
  );
}
