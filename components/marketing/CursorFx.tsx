"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = 'a, button, select, summary, label, [role="switch"], [data-cursor]';
const TEXT_ENTRY = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea';
const TONES: Record<string, string> = {
  blue: "var(--primary)",
  red: "var(--red)",
  yellow: "var(--yellow)",
  green: "var(--green)",
  teal: "var(--teal)",
};

/**
 * Every cursor effect on the site, driven by one pointer listener and one
 * animation frame:
 *   - [data-glow]     gets --gx/--gy (pointer position inside it)
 *   - [data-tilt]     gets --rx/--ry (a few degrees toward the pointer)
 *   - [data-parallax] gets --px/--py (-1…1 from its centre)
 *   - a ring follows the pointer, grows over clickable things and takes the
 *     colour of the nearest [data-cursor="<tone>"] (or [data-glow] colour).
 * Mouse only; touch, pen and reduced-motion visitors get none of it.
 */
export function CursorFx() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const el = ring.current;
    let raf = 0;
    let loop = 0;
    let last: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;
    let parallax: HTMLElement[] = [];
    // ring position, eased toward the pointer
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;

    const follow = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (el) el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      loop = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(follow) : 0;
    };

    const resetTilt = (t: HTMLElement | null) => {
      if (!t) return;
      t.style.setProperty("--rx", "0deg");
      t.style.setProperty("--ry", "0deg");
      t.removeAttribute("data-tilting");
    };

    const frame = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const target = e.target instanceof Element ? e.target : null;
      const { clientX: cx, clientY: cy } = e;

      // 1. glow pools (the hovered element and up to two glowing ancestors)
      let g = target?.closest<HTMLElement>("[data-glow]") ?? null;
      for (let i = 0; g && i < 3; i++) {
        const r = g.getBoundingClientRect();
        g.style.setProperty("--gx", `${(cx - r.left).toFixed(0)}px`);
        g.style.setProperty("--gy", `${(cy - r.top).toFixed(0)}px`);
        g = g.parentElement?.closest<HTMLElement>("[data-glow]") ?? null;
      }

      // 2. tilt
      const t = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (t !== tilted) {
        resetTilt(tilted);
        tilted = t;
      }
      if (t) {
        const r = t.getBoundingClientRect();
        const nx = (cx - r.left) / r.width - 0.5;
        const ny = (cy - r.top) / r.height - 0.5;
        const max = Number(t.dataset.tilt) || 4;
        t.setAttribute("data-tilting", "");
        t.style.setProperty("--ry", `${(nx * max * 2).toFixed(2)}deg`);
        t.style.setProperty("--rx", `${(-ny * max * 2).toFixed(2)}deg`);
        t.style.setProperty("--gx", `${(cx - r.left).toFixed(0)}px`);
        t.style.setProperty("--gy", `${(cy - r.top).toFixed(0)}px`);
      }

      // 3. parallax regions currently on screen
      for (const p of parallax) {
        const r = p.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;
        const clamp = (v: number) => Math.max(-1, Math.min(1, v));
        p.style.setProperty("--px", clamp(((cx - r.left) / r.width - 0.5) * 2).toFixed(3));
        p.style.setProperty("--py", clamp(((cy - r.top) / r.height - 0.5) * 2).toFixed(3));
      }

      // 4. ring state and colour
      if (el) {
        el.setAttribute("data-on", "");
        const text = target?.closest(TEXT_ENTRY);
        const hit = target?.closest<HTMLElement>(INTERACTIVE);
        el.dataset.state = text ? "text" : hit ? "hover" : "idle";
        const toned = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
        const glowed = target?.closest<HTMLElement>("[data-glow]");
        const colour = (toned && TONES[toned]) || (glowed && getComputedStyle(glowed).getPropertyValue("--glow").trim()) || "";
        el.style.setProperty("--ring", colour || "var(--primary)");
      }
      tx = cx;
      ty = cy;
      if (!loop) loop = requestAnimationFrame(follow);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !el) return;
      el.setAttribute("data-down", "");
      const ripple = document.createElement("span");
      ripple.className = "cursor-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.setProperty("--ring", el.style.getPropertyValue("--ring") || "var(--primary)");
      el.parentElement?.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 650);
    };
    const onUp = () => el?.removeAttribute("data-down");
    const onLeave = () => {
      el?.removeAttribute("data-on");
      resetTilt(tilted);
      tilted = null;
    };

    // Parallax regions are few and rarely change; re-scan at most every 300ms.
    let scan = 0;
    const collect = () => {
      parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    };
    collect();
    const mo = new MutationObserver(() => {
      if (scan) return;
      scan = window.setTimeout(() => {
        scan = 0;
        collect();
      }, 300);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      mo.disconnect();
      window.clearTimeout(scan);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loop);
    };
  }, []);

  return <div ref={ring} aria-hidden className="cursor-ring" />;
}
