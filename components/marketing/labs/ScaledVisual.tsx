"use client";

import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

// Renders a product mock-up at a fixed design size and scales it to fit its
// box, so a full screen reads like a screenshot at any card size.
//   fit="contain" — the whole design is visible, centred
//   fit="width"   — fills the width, anchored to the top, bottom cropped
export function ScaledVisual({
  width,
  height,
  fit = "width",
  className,
  children,
}: {
  width: number;
  height: number;
  fit?: "contain" | "width";
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setScale(fit === "contain" && h ? Math.min(w / width, h / height) : w / width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height, fit]);

  return (
    <div ref={ref} aria-hidden inert className={clsx("relative h-full w-full select-none overflow-hidden", className)}>
      <div
        className="absolute left-1/2 origin-top"
        style={{
          width,
          height,
          top: fit === "contain" ? "50%" : 0,
          transform: fit === "contain" ? `translate(-50%, -50%) scale(${scale})` : `translateX(-50%) scale(${scale})`,
          transformOrigin: fit === "contain" ? "center" : "top center",
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
