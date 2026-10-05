"use client";

import clsx from "clsx";
import { BookOpen, CreditCard, Palette, PenLine, TrendingUp } from "lucide-react";
import { explorer, type ExplorerTabId } from "@/lib/content";
import { openExplorerTab } from "../explore-link";
import { AREA_TONE, TONE } from "../tone";

const ICONS: Record<ExplorerTabId, typeof BookOpen> = {
  teach: BookOpen,
  assess: PenLine,
  grow: TrendingUp,
  payments: CreditCard,
  brand: Palette,
};

// Loose, slightly tilted, each at its own depth so they drift apart as
// the cursor moves — like notes stuck above the screen.
const PLACE: Record<ExplorerTabId, string> = {
  teach: "left-[2%] -top-[52px] -rotate-3 [--depth:18]",
  assess: "left-[22%] -top-[30px] rotate-2 [--depth:10]",
  grow: "left-[42%] -top-[58px] -rotate-1 [--depth:22]",
  payments: "left-[62%] -top-[34px] rotate-3 [--depth:14]",
  brand: "left-[80%] -top-[56px] -rotate-2 [--depth:20]",
};

/** The five product areas, floating above the hero's product window. Each one opens its tab in the explorer. */
export function HeroAreas() {
  return (
    <ul className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden xl:block" aria-label="Product areas">
      {explorer.tabs.map((t) => {
        const Icon = ICONS[t.id];
        const tone = TONE[AREA_TONE[t.id]];
        return (
          <li key={t.id} className={clsx("parallax absolute", PLACE[t.id])}>
            <a
              href={`#product-${t.id}`}
              data-cursor={AREA_TONE[t.id]}
              onClick={(e) => {
                e.preventDefault();
                openExplorerTab(t.id);
              }}
              className="group pointer-events-auto flex items-center gap-2 rounded-xl border border-edge bg-panel py-1.5 pl-1.5 pr-3 text-[13px] font-semibold shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-spring hover:-translate-y-1 hover:rotate-0 hover:shadow-window"
            >
              <span className={clsx("grid h-7 w-7 place-items-center rounded-lg transition-transform duration-300 ease-spring group-hover:scale-110 group-hover:-rotate-6", tone.tint, tone.text)}>
                <Icon aria-hidden className="h-4 w-4" />
              </span>
              {t.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
