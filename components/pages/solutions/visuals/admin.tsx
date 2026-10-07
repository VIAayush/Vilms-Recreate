import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { Avatar, InstituteMark, Pill } from "@/components/marketing/screens/primitives";
import { Bar } from "../kit";

// The team-view product screen, one layout for every solution page: a left
// menu, a title with one action, a row of figures and a table. 720 x 420
// design size; <Showcase> scales it to fit.

type Cell = string | { pct: number } | { pill: string; tone: "green" | "primary" | "yellow" | "muted" };

export function AdminScreen({
  org,
  nav,
  active,
  crumb,
  title,
  action,
  stats,
  head,
  rows,
}: {
  org: string;
  nav: { label: string; icon: LucideIcon }[];
  active: number;
  crumb: string;
  title: string;
  action: string;
  stats: [string, string][];
  head: string[];
  rows: Cell[][];
}) {
  return (
    <div className="flex h-full w-full bg-canvas text-[13px]">
      <div className="w-[132px] shrink-0 border-r border-edge bg-canvas-alt p-3">
        <div className="mb-4 flex items-center gap-2">
          <InstituteMark name={org} className="h-7 w-7 text-[10px]" />
          <span className="text-[12px] font-semibold leading-tight">{org}</span>
        </div>
        <ul className="space-y-1">
          {nav.map(({ label, icon: Icon }, i) => (
            <li key={label} className={clsx("flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px]", i === active ? "bg-primary-tint font-semibold text-primary" : "text-fg-muted")}>
              <Icon aria-hidden className="h-3.5 w-3.5" /> {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 flex-1 p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] text-fg-muted">{crumb}</p>
            <p className="text-[18px] font-semibold tracking-tight">{title}</p>
          </div>
          <span className="rounded-lg bg-navy px-3 py-1.5 text-[12px] font-semibold text-white">{action}</span>
        </div>
        <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
          {stats.map(([k, v]) => (
            <div key={k} className="rounded-xl border border-edge bg-panel px-2.5 py-2">
              <p className="truncate text-[10.5px] text-fg-muted">{k}</p>
              <p className="truncate text-[13.5px] font-semibold tabular-nums">{v}</p>
            </div>
          ))}
        </div>
        <table className="mt-3 w-full table-fixed border-collapse text-left text-[12px]">
          <thead>
            <tr className="text-[10.5px] uppercase tracking-wide text-fg-muted">
              {head.map((h) => (
                <th key={h} className="border-b border-edge py-1.5 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className="border-b border-edge">
                {r.map((c, ci) => (
                  <td key={ci} className="py-1.5 pr-2">
                    {typeof c === "string" ? (
                      ci === 0 ? (
                        <span className="flex items-center gap-2 truncate">
                          <Avatar name={c} size="sm" /> <span className="truncate">{c}</span>
                        </span>
                      ) : (
                        <span className="block truncate text-fg-muted">{c}</span>
                      )
                    ) : "pct" in c ? (
                      <span className="flex items-center gap-2">
                        <Bar value={c.pct / 100} tone={c.pct >= 100 ? "green" : "primary"} className="flex-1" />
                        <span className="w-8 text-right font-mono text-[11px] tabular-nums">{c.pct}%</span>
                      </span>
                    ) : (
                      <Pill tone={c.tone}>{c.pill}</Pill>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
