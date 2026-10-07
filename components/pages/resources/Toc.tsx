"use client";

import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EASE } from "@/components/site-ui/motion-tokens";
import { goToSection, useScrollSpy } from "./useScrollSpy";

export type TocItem = { id: string; label: string };

/**
 * Sticky table of contents with scroll-spy.
 *   rail — a vertical list beside the content on desktop (sticky), and a
 *          one-line "section 2 of 6" pill that opens a list on phones.
 *   bar  — a horizontal strip pinned under the header at every width, for
 *          pages whose sections run full-bleed.
 * It must sit inside a taller container (the GuideFrame) so it can stay stuck.
 */
export function Toc({ items, variant = "rail", title = "On this page" }: { items: TocItem[]; variant?: "rail" | "bar"; title?: string }) {
  const uid = useId();
  const ids = items.map((i) => i.id);
  const active = useScrollSpy(ids, variant === "bar" ? 190 : 150);
  const index = Math.max(0, ids.indexOf(active));
  const [open, setOpen] = useState(false);
  const scroller = useRef<HTMLUListElement>(null);

  // Keep the active chip of the bar in view (scrolls the strip, never the page).
  useEffect(() => {
    if (variant !== "bar") return;
    const strip = scroller.current;
    const chip = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!strip || !chip) return;
    const left = chip.offsetLeft - (strip.clientWidth - chip.offsetWidth) / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [active, variant]);

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    goToSection(id);
  };

  if (variant === "bar") {
    return (
      <nav aria-label={title} className="sticky top-[69px] z-30 border-b border-edge bg-canvas">
        <div className="wrap">
          <ul ref={scroller} className="no-scrollbar relative flex gap-1 overflow-x-auto py-2">
            {items.map((it, i) => {
              const on = it.id === active;
              return (
                <li key={it.id} className="shrink-0">
                  <a
                    href={`#${it.id}`}
                    onClick={jump(it.id)}
                    aria-current={on ? "true" : undefined}
                    className={clsx(
                      "relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                      on ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {on ? <motion.span layoutId={`toc-bar-${uid}`} transition={{ duration: 0.35, ease: EASE }} className="absolute inset-0 rounded-full bg-sunken" /> : null}
                    <span className="relative font-mono text-[11px] text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="relative">{it.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* phones & tablets: a pill that opens the list */}
      <nav aria-label={title} className="sticky top-[69px] z-30 -mx-4 border-b border-edge bg-canvas px-4 sm:-mx-6 sm:px-6 lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${uid}-list`}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-3 py-3 text-left"
        >
          <span className="flex min-w-0 items-center gap-2.5 text-[14px]">
            <span className="font-mono text-[11px] text-fg-faint">
              {index + 1}/{items.length}
            </span>
            <span className="truncate font-medium">{items[index]?.label}</span>
          </span>
          <ChevronDown aria-hidden className={clsx("h-4 w-4 shrink-0 text-fg-muted transition-transform duration-300", open && "rotate-180")} />
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.ul
              id={`${uid}-list`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              {items.map((it, i) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    onClick={jump(it.id)}
                    aria-current={it.id === active ? "true" : undefined}
                    className={clsx("flex items-center gap-3 border-t border-edge py-3 text-[14.5px]", it.id === active ? "font-medium text-fg" : "text-fg-muted")}
                  >
                    <span className="font-mono text-[11px] text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                    {it.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </nav>

      {/* desktop: the rail */}
      <nav aria-label={title} className="hidden lg:block">
        <div className="sticky top-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">{title}</p>
          <ol className="relative mt-4 border-l border-edge">
            {items.map((it, i) => {
              const on = it.id === active;
              return (
                <li key={it.id} className="relative">
                  {on ? <motion.span layoutId={`toc-rail-${uid}`} transition={{ duration: 0.35, ease: EASE }} className="absolute -left-px top-0 h-full w-[2px] bg-navy" /> : null}
                  <a
                    href={`#${it.id}`}
                    onClick={jump(it.id)}
                    aria-current={on ? "true" : undefined}
                    className={clsx("group flex gap-3 py-2 pl-4 pr-2 text-[14px] leading-snug transition-colors", on ? "font-medium text-fg" : "text-fg-muted hover:text-fg")}
                  >
                    <span className={clsx("pt-px font-mono text-[11px] tabular-nums transition-colors", on ? "text-primary" : "text-fg-faint group-hover:text-fg-muted")}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{it.label}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
