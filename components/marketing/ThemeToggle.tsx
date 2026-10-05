"use client";

import { useEffect, useSyncExternalStore } from "react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";

export const THEME_KEY = "vilms-theme";
type Theme = "light" | "dark";

// The initial theme is set before first paint by the inline script in
// app/layout.tsx (stored choice, else the system preference). This component
// only reads and changes it.
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function storedTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function applyTheme(next: Theme, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const set = () => {
    root.dataset.theme = next;
  };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

  if (doc.startViewTransition && !reduced && origin) {
    const r = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
    doc
      .startViewTransition(set)
      .ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${r}px at ${origin.x}px ${origin.y}px)`] },
          { duration: 600, easing: "cubic-bezier(.16,1,.3,1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
    return;
  }
  root.classList.add("theme-fading");
  set();
  window.setTimeout(() => root.classList.remove("theme-fading"), 400);
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, read, () => "light" as Theme);
  const dark = theme === "dark";

  // Follow the system setting until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!storedTheme()) applyTheme(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={(e) => {
        const next: Theme = dark ? "light" : "dark";
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {
          /* private mode: the choice lasts for this page only */
        }
        const b = e.currentTarget.getBoundingClientRect();
        applyTheme(next, { x: b.left + b.width / 2, y: b.top + b.height / 2 });
      }}
      className={clsx(
        "group relative inline-flex h-9 w-[62px] shrink-0 items-center rounded-full border border-edge/15 bg-panel/70 p-1 backdrop-blur transition-colors hover:border-edge/30",
        className,
      )}
    >
      {/* Knob position comes from CSS (data-theme), so it's right on first paint. */}
      <span
        aria-hidden
        className="absolute left-1 top-1 h-[26px] w-[26px] rounded-full bg-fg shadow-sm transition-transform duration-300 ease-out dark:translate-x-[26px]"
      />
      <Sun aria-hidden className="relative z-10 ml-[5px] h-4 w-4 text-canvas transition-colors dark:text-fg-muted" />
      <Moon aria-hidden className="relative z-10 ml-[10px] h-4 w-4 text-fg-muted transition-colors dark:text-canvas" />
    </button>
  );
}
