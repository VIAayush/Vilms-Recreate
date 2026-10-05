"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

/* ---------- media queries ---------- */

function subscribeQuery(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
}
const queryCache = new Map<string, (onChange: () => void) => () => void>();

/** A media query as state. Server and first client render agree on `false`. */
export function useMediaQuery(query: string) {
  let subscribe = queryCache.get(query);
  if (!subscribe) {
    subscribe = subscribeQuery(query);
    queryCache.set(query, subscribe);
  }
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/* ---------- visibility ---------- */

/** True while the element is on screen (or, with `once`, after it first was). */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = false, margin = "0px", threshold = 0 }: { once?: boolean; margin?: string; threshold?: number } = {},
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin: margin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, margin, threshold]);
  return inView;
}

/* ---------- scroll ---------- */

// One rAF-throttled scroll/resize loop shared by every scroll-driven scene.
const frameListeners = new Set<() => void>();
let frameQueued = false;
function queueFrame() {
  if (frameQueued) return;
  frameQueued = true;
  requestAnimationFrame(() => {
    frameQueued = false;
    frameListeners.forEach((fn) => fn());
  });
}
function onFrame(fn: () => void) {
  if (frameListeners.size === 0) {
    window.addEventListener("scroll", queueFrame, { passive: true });
    window.addEventListener("resize", queueFrame);
  }
  frameListeners.add(fn);
  fn();
  return () => {
    frameListeners.delete(fn);
    if (frameListeners.size === 0) {
      window.removeEventListener("scroll", queueFrame);
      window.removeEventListener("resize", queueFrame);
    }
  };
}

/**
 * Writes the element's scroll progress (0 → 1 while it travels through a
 * pinned viewport) into a CSS variable on the element. No React re-renders —
 * the animation itself is pure CSS reading that variable.
 */
export function useScrollVar<T extends HTMLElement>(ref: RefObject<T | null>, name = "--p", enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let last = -1;
    return onFrame(() => {
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 1;
      const rounded = Math.round(p * 1000) / 1000;
      if (rounded !== last) {
        last = rounded;
        el.style.setProperty(name, String(rounded));
      }
    });
  }, [ref, name, enabled]);
}

/** True once the page has scrolled past `offset` pixels. */
export function useScrolledPast(offset: number) {
  const [past, setPast] = useState(false);
  useEffect(() => onFrame(() => setPast(window.scrollY > offset)), [offset]);
  return past;
}

/* ---------- time ---------- */

/**
 * Steps through `count` states every `interval` ms while `running`. Manual
 * selection resets the timer so the visitor's choice isn't overwritten
 * immediately.
 */
export function useAutoplay(count: number, { interval = 2600, running = true } = {}) {
  const [index, setIndex] = useState(0);
  const [epoch, setEpoch] = useState(0);
  useEffect(() => {
    if (!running || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [running, count, interval, epoch]);
  const select = useCallback((i: number) => {
    setIndex(i);
    setEpoch((e) => e + 1);
  }, []);
  return [index, select] as const;
}

/** Counts from 0 to `target` once `active` turns true. Instant under reduced motion. */
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    if (reduced) {
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduced]);
  return value;
}

/* ---------- pointer ---------- */

/**
 * Tracks the pointer over an element as CSS variables (--mx, --my in px) for
 * spotlight effects. Mouse only; touch devices get the static look.
 */
export function usePointerVars<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
