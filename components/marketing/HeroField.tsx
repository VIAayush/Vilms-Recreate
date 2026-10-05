"use client";

import { useEffect, useRef } from "react";

const GAP = 26; // grid spacing (px)
const REACH = 170; // how far the cursor's influence spreads (px)

/**
 * The hero's interactive backdrop: a quiet grid of dots. Near the cursor they
 * swell, lean away from it and pick up colour by direction — blue, green,
 * yellow and red around the pointer. With no mouse (phones), a slow
 * "autopilot" point drifts across instead. Drawn on one canvas, only while
 * the hero is on screen; a single static frame under reduced motion.
 */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let colours: string[] = [];
    let base = "";
    const readColours = () => {
      const cs = getComputedStyle(canvas);
      const v = (n: string) => cs.getPropertyValue(n).trim().replace(/ /g, ",");
      colours = [v("--primary"), v("--green"), v("--yellow"), v("--red")];
      base = v("--border-strong");
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // pointer (eased) and whether a real mouse is steering
    let px = -9999;
    let py = -9999;
    let tx = -9999;
    let ty = -9999;
    let steered = false;
    let lastMove = 0;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      if (!steered || t - lastMove > 4000) {
        // autopilot: a slow figure-eight across the field
        tx = w * (0.62 + 0.3 * Math.sin(t / 3100));
        ty = h * (0.5 + 0.32 * Math.sin(t / 2300) * Math.cos(t / 4100));
      }
      px += (tx - px) * 0.12;
      py += (ty - py) * 0.12;

      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const dx = x - px;
          const dy = y - py;
          const d = Math.hypot(dx, dy);
          if (d > REACH) {
            ctx.fillStyle = `rgba(${base},0.55)`;
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
            continue;
          }
          const k = 1 - d / REACH; // 0 at the edge → 1 at the pointer
          const ease = k * k * (3 - 2 * k);
          // direction picks the colour: four quadrants around the pointer
          const a = Math.atan2(dy, dx) + Math.PI; // 0 … 2π
          const c = colours[Math.floor((a / (Math.PI * 2)) * 4) % 4];
          const push = ease * 7;
          const ox = d ? (dx / d) * push : 0;
          const oy = d ? (dy / d) * push : 0;
          ctx.fillStyle = `rgba(${c},${(0.25 + ease * 0.75).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(x + ox, y + oy, 1 + ease * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let raf = 0;
    let visible = false;
    const tick = (t: number) => {
      draw(t);
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf && visible && !reduced) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      steered = true;
      lastMove = performance.now();
    };

    readColours();
    resize();
    if (reduced) draw(0);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(canvas);
    const mo = new MutationObserver(() => {
      readColours();
      if (reduced) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(ellipse_at_60%_45%,black_35%,transparent_80%)]"
    />
  );
}
