"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = 'a, button, select, summary, label, [role="switch"], [data-cursor]';
const TEXT_ENTRY = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea';
const TONES: Record<string, string> = {
  blue: "var(--primary)",
  navy: "var(--navy)",
  gold: "var(--gold)",
  steel: "var(--steel)",
  green: "var(--green)",
  red: "var(--red)",
};
const SPOT = 520; // half the size of a section's glow spot (px)

/**
 * Every cursor effect on the site, from one pointer listener and one
 * animation frame. Built to stay smooth: it never writes inherited CSS
 * variables onto large containers (that restyles everything inside them).
 * Instead it moves small dedicated layers with GPU transforms:
 *   - .glow-section  → moves its .glow-spot (a soft pool of colour)
 *   - .glow-card     → sets --gx/--gy on the card itself (small subtree)
 *   - [data-tilt]    → sets the element's own transform, and its glare
 *   - .parallax      → each element's own transform, by data-depth
 *   - the cursor ring eases toward the pointer
 * It re-runs on scroll with the last pointer position, so effects keep up
 * when the page moves under a still mouse. Mouse only; touch, pen and
 * reduced-motion visitors get none of it.
 */
export function CursorFx() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const el = ring.current;
    let cx = -1;
    let cy = -1;
    let raf = 0;
    let loop = 0;
    let tilted: HTMLElement | null = null;
    let glowColourFor: Element | null = null;
    let glowColour = "";
    // ring position, eased toward the pointer
    let x = -100;
    let y = -100;

    const follow = () => {
      x += (cx - x) * 0.24;
      y += (cy - y) * 0.24;
      if (el) el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      loop = Math.abs(cx - x) + Math.abs(cy - y) > 0.2 ? requestAnimationFrame(follow) : 0;
    };

    const resetTilt = (t: HTMLElement | null) => {
      if (!t) return;
      t.style.transform = "";
      t.removeAttribute("data-tilting");
    };

    const frame = () => {
      raf = 0;
      if (cx < 0) return;
      const target = document.elementFromPoint(cx, cy);

      // 1. glows: the card under the pointer and the section around it
      let g = target?.closest<HTMLElement>("[data-glow]") ?? null;
      for (let i = 0; g && i < 3; i++) {
        const r = g.getBoundingClientRect();
        if (g.classList.contains("glow-section")) {
          const spot = g.querySelector<HTMLElement>(":scope > .glow-clip > .glow-spot");
          if (spot) spot.style.transform = `translate3d(${(cx - r.left - SPOT).toFixed(0)}px, ${(cy - r.top - SPOT).toFixed(0)}px, 0)`;
        } else {
          g.style.setProperty("--gx", `${(cx - r.left).toFixed(0)}px`);
          g.style.setProperty("--gy", `${(cy - r.top).toFixed(0)}px`);
        }
        g = g.parentElement?.closest<HTMLElement>("[data-glow]") ?? null;
      }

      // 2. tilt (the element's own transform; the glare is its own layer)
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
        t.style.transform = `perspective(1400px) rotateX(${(-ny * max * 2).toFixed(2)}deg) rotateY(${(nx * max * 2).toFixed(2)}deg)`;
        const glare = t.querySelector<HTMLElement>(":scope > .tilt-glare");
        if (glare) {
          glare.style.setProperty("--gx", `${(cx - r.left).toFixed(0)}px`);
          glare.style.setProperty("--gy", `${(cy - r.top).toFixed(0)}px`);
        }
      }

      // 3. parallax: elements drift by their depth, relative to their region
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((region) => {
        const r = region.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const px = Math.max(-1, Math.min(1, ((cx - r.left) / r.width - 0.5) * 2));
        const py = Math.max(-1, Math.min(1, ((cy - r.top) / r.height - 0.5) * 2));
        region.querySelectorAll<HTMLElement>(".parallax").forEach((p) => {
          const d = Number(p.dataset.depth) || 12;
          p.style.transform = `translate3d(${(px * d).toFixed(1)}px, ${(py * d).toFixed(1)}px, 0)`;
        });
      });

      // 4. the ring: state and colour
      if (el) {
        el.setAttribute("data-on", "");
        const text = target?.closest(TEXT_ENTRY);
        const hit = target?.closest(INTERACTIVE);
        el.dataset.state = text ? "text" : hit ? "hover" : "idle";
        const toned = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
        let colour = toned ? TONES[toned] : "";
        if (!colour) {
          const glowed = target?.closest("[data-glow]") ?? null;
          // read the computed colour only when the glowing element changes
          if (glowed !== glowColourFor) {
            glowColourFor = glowed;
            glowColour = glowed ? getComputedStyle(glowed).getPropertyValue("--glow").trim() : "";
          }
          colour = glowColour;
        }
        el.style.setProperty("--ring", colour || "var(--primary)");
      }
      if (!loop) loop = requestAnimationFrame(follow);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cx = e.clientX;
      cy = e.clientY;
      schedule();
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
      cx = -1;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loop);
    };
  }, []);

  return <div ref={ring} aria-hidden className="cursor-ring" />;
}
