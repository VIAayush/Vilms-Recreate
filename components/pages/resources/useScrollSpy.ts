"use client";

import { useEffect, useState } from "react";

/**
 * Which section is the reader in? The last section whose top has passed the
 * line just under the sticky chrome. Cheap: a handful of rects per frame,
 * throttled to one rAF, and nothing runs when the page is not scrolling.
 */
export function useScrollSpy(ids: string[], offset = 150) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (!list.length) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6) current = list[list.length - 1];
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [key, offset]);

  return active;
}

/** Smooth-scrolls to a section (instant under reduced motion) and keeps the hash in the URL. */
export function goToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  try {
    window.history.replaceState(null, "", `#${id}`);
  } catch {
    /* some sandboxes block history changes; the scroll still happened */
  }
}
