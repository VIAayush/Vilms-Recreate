"use client";

import { useCallback, useEffect, useId, useState } from "react";
import clsx from "clsx";
import { Eraser, RefreshCw, ShieldCheck, ShieldQuestion } from "lucide-react";
import { privacyOptOut } from "@/lib/client/tracking";

type Row = { key: string; where: "local storage" | "session storage" | null; preview: string };

const KEYS = ["vilms-theme", "vilms_vid", "vilms_first_touch", "vilms_last_touch", "vilms_sid"] as const;

function get(kind: "local" | "session", key: string): string | null {
  try {
    return (kind === "local" ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function preview(key: string, raw: string): string {
  if (key === "vilms-theme") return raw;
  if (key === "vilms_vid" || key === "vilms_sid") return `${raw.slice(0, 8)}…`;
  try {
    const t = JSON.parse(raw) as { landing_page?: string | null; source?: string | null };
    return [t.landing_page, t.source ? `source ${t.source}` : null].filter(Boolean).join(" · ") || "stored";
  } catch {
    return "stored";
  }
}

function snapshot(): { rows: Row[]; signal: boolean } {
  const rows = KEYS.map<Row>((key) => {
    const local = get("local", key);
    if (local !== null) return { key, where: "local storage", preview: preview(key, local) };
    const session = get("session", key);
    if (session !== null) return { key, where: "session storage", preview: preview(key, session) };
    return { key, where: null, preview: "" };
  });
  return { rows, signal: privacyOptOut() };
}

/**
 * A live look at what this site has stored in the visitor's own browser, plus
 * whether a privacy signal is on, with a button to clear it. It reads storage
 * on the visitor's device only; nothing is sent anywhere.
 */
export function StorageInspector() {
  const uid = useId();
  const [state, setState] = useState<{ rows: Row[]; signal: boolean } | null>(null);
  const [cleared, setCleared] = useState(false);

  const refresh = useCallback(() => setState(snapshot()), []);

  useEffect(() => {
    // Storage and privacy signals only exist in the browser, so read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const clear = () => {
    for (const key of KEYS) {
      for (const kind of ["local", "session"] as const) {
        try {
          (kind === "local" ? window.localStorage : window.sessionStorage).removeItem(key);
        } catch {
          /* storage unavailable: nothing to clear */
        }
      }
    }
    setCleared(true);
    refresh();
  };

  const present = state?.rows.filter((r) => r.where).length ?? 0;

  return (
    <div className="rounded-[28px] border border-edge-strong bg-panel p-5 shadow-soft sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Live, on this device</p>
          <h3 className="mt-1 font-display text-[22px] font-medium tracking-[-0.03em]">What this site has stored in your browser right now</h3>
        </div>
        <button type="button" onClick={refresh} className="cta cta-ghost cta-sm">
          <RefreshCw aria-hidden className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-sunken p-4">
        {state?.signal ? <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-green" /> : <ShieldQuestion aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-fg-muted" />}
        <p role="status" className="text-[14.5px] leading-snug text-fg-muted">
          {state === null ? (
            "Checking your browser…"
          ) : state.signal ? (
            <>
              <span className="font-medium text-fg">Privacy signal detected.</span> Your browser sends Global Privacy Control or Do Not Track, so this site records no analytics events, does not create a visitor ID and does not load Google Analytics or the Meta Pixel.
            </>
          ) : (
            <>
              <span className="font-medium text-fg">No privacy signal detected.</span> If your browser sends Global Privacy Control or Do Not Track, this site stops recording analytics events.
            </>
          )}
        </p>
      </div>

      <ul className="mt-5 divide-y divide-edge border-y border-edge" aria-describedby={`${uid}-count`}>
        {(state?.rows ?? KEYS.map<Row>((key) => ({ key, where: null, preview: "" }))).map((r) => (
          <li key={r.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-3.5 sm:grid-cols-[210px_minmax(0,1fr)_auto]">
            <code className="truncate font-mono text-[13px] text-fg">{r.key}</code>
            <span className="order-3 col-span-2 min-w-0 truncate text-[13.5px] text-fg-muted sm:order-none sm:col-span-1">{r.where ? `${r.where} · ${r.preview}` : "not set"}</span>
            <span className={clsx("rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em]", r.where ? "bg-primary-tint text-primary" : "bg-sunken text-fg-faint")}>{r.where ? "present" : "absent"}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p id={`${uid}-count`} role="status" aria-live="polite" className="text-[13.5px] text-fg-muted">
          {state === null ? "" : cleared && present === 0 ? "Cleared. This site may write them again as you browse." : `${present} of ${KEYS.length} items present.`}
        </p>
        <button type="button" onClick={clear} disabled={present === 0} className="cta cta-outline cta-sm">
          <Eraser aria-hidden className="h-4 w-4" />
          Clear these items
        </button>
      </div>
    </div>
  );
}
