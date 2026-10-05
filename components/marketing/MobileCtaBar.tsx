"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Cta } from "@/components/site/Cta";
import { useScrolledPast } from "./motion";

// Phones only: once the hero is behind the visitor, a slim bar keeps both
// actions in reach. It steps aside when the closing CTA or footer is on
// screen, where the same buttons are already visible.
export function MobileCtaBar() {
  const past = useScrolledPast(640);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const targets = [document.getElementById("final-cta"), document.querySelector("footer")].filter(Boolean) as Element[];
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setNearEnd(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const show = past && !nearEnd;
  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={clsx(
        "fixed inset-x-0 bottom-0 z-30 border-t border-edge/10 bg-canvas/85 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5 backdrop-blur-xl transition-transform duration-300 ease-out md:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-md gap-2">
        <Cta intent="demo" location="mobile_bar" className="cta cta-accent flex-1">
          Book a Demo
        </Cta>
        <Cta intent="trial" location="mobile_bar" className="cta cta-ghost flex-1">
          Free trial
        </Cta>
      </div>
    </div>
  );
}
