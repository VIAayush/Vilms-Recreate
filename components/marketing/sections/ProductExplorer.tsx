"use client";

import { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { TrackView } from "@/components/site/TrackView";
import { track } from "@/lib/client/tracking";
import { explorer, type ExplorerTabId } from "@/lib/content";
import { EXPLORE_EVENT, tabFromHash } from "../explore-link";
import { BrowserFrame, Illustrative } from "../screens/primitives";
import { EXPLORER_SCREENS } from "../screens/explorer";

const TAB_IDS = explorer.tabs.map((t) => t.id);

// One interactive area instead of a page of feature cards: pick an area of
// the product, then hover (or tap) a feature to see where it lives.
export function ProductExplorer() {
  const uid = useId();
  const [tabId, setTabId] = useState<ExplorerTabId>("teach");
  const [feature, setFeature] = useState<string | null>(null);
  const tab = explorer.tabs.find((t) => t.id === tabId) ?? explorer.tabs[0];
  const { url, Screen } = EXPLORER_SCREENS[tab.id];
  const activeFeature = tab.features.find((f) => f.id === feature) ?? null;

  const select = (id: ExplorerTabId) => {
    setTabId(id);
    setFeature(null);
    track("feature_view", id);
  };

  // Deep links (/#product-assess) and the header's Product menu.
  useEffect(() => {
    const fromHash = () => {
      const id = tabFromHash(window.location.hash, TAB_IDS);
      if (id) {
        setTabId(id);
        setFeature(null);
        document.getElementById("product")?.scrollIntoView({ block: "start" });
      }
    };
    const onExplore = (e: Event) => {
      const id = (e as CustomEvent<ExplorerTabId>).detail;
      if (TAB_IDS.includes(id)) {
        setTabId(id);
        setFeature(null);
      }
    };
    const raf = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    window.addEventListener(EXPLORE_EVENT, onExplore);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener(EXPLORE_EVENT, onExplore);
    };
  }, []);

  return (
    <section id="product" aria-labelledby="product-title" className="relative border-y border-edge bg-canvas-alt py-24 sm:py-32">
      <TrackView name="feature_view" label="explorer" />
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <p className="kicker">{explorer.kicker}</p>
          <h2 id="product-title" className="h2 mt-4 max-w-[13ch]">
            {explorer.title}
          </h2>
          <p className="sub mt-5 max-w-[400px]">{explorer.sub}</p>

          <div
            role="group"
            aria-label="Product areas"
            className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:block lg:overflow-visible lg:border-t lg:border-edge lg:px-0"
          >
            {explorer.tabs.map((t, i) => {
              const on = t.id === tab.id;
              return (
                <div key={t.id} className="shrink-0 lg:border-b lg:border-edge">
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`${uid}-panel`}
                    onClick={() => select(t.id)}
                    className={clsx(
                      "group flex items-baseline gap-3 rounded-full border px-4 py-2 text-left transition-[color,background-color,border-color,padding,box-shadow] duration-300 lg:w-full lg:rounded-none lg:border-0 lg:py-5",
                      on
                        ? "border-primary/40 bg-primary-tint text-primary lg:bg-transparent lg:pl-5 lg:shadow-[inset_3px_0_0_rgb(var(--primary))]"
                        : "border-edge bg-panel text-fg-muted hover:border-primary/40 hover:text-fg lg:bg-transparent lg:pl-0",
                    )}
                  >
                    <span className="hidden font-mono text-[12px] text-fg-faint lg:inline">0{i + 1}</span>
                    <span className="text-[15px] font-semibold lg:font-display lg:text-[clamp(28px,2.6vw,38px)] lg:tracking-[-0.035em]">{t.label}</span>
                    <span className={clsx("ml-auto hidden max-w-[220px] text-right text-[13px] leading-snug transition-opacity xl:block", on ? "opacity-0" : "opacity-100")}>{t.line}</span>
                    <ArrowRight aria-hidden className={clsx("ml-auto hidden h-5 w-5 self-center transition-all lg:block xl:ml-3", on ? "translate-x-0 text-primary opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60")} />
                  </button>

                  {/* Features of the open area (desktop: inline under the tab). */}
                  {on ? (
                    <ul className="hidden flex-wrap gap-2 pb-6 lg:flex" aria-label={`${t.label} features`}>
                      {t.features.map((f) => (
                        <FeatureButton key={f.id} label={f.label} on={feature === f.id} onActivate={() => setFeature(f.id)} />
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Mobile / tablet: the open area's features, as a swipeable row. */}
          <ul className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 lg:hidden" aria-label={`${tab.label} features`}>
            {tab.features.map((f) => (
              <FeatureButton key={f.id} label={f.label} on={feature === f.id} onActivate={() => setFeature(f.id)} />
            ))}
          </ul>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start" id={`${uid}-panel`} role="region" aria-label={`${tab.label} — illustrated screen`}>
          <BrowserFrame url={url} className="lg:mt-2">
            <div key={tab.id} data-focus={feature ? "" : undefined} className="animate-rise-in">
              <Screen active={feature} />
            </div>
          </BrowserFrame>

          <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
            <div aria-live="polite" className="min-h-[76px]">
              <p className="font-display text-[22px] font-semibold leading-tight tracking-tight">{activeFeature ? activeFeature.label : tab.title}</p>
              <p className="mt-1.5 max-w-[520px] text-[15px] leading-relaxed text-fg-muted">
                {activeFeature ? activeFeature.text : `${tab.line}. Hover a feature to see where it lives.`}
              </p>
            </div>
            <Cta intent="demo" location={`explorer_${tab.id}`} className="cta cta-outline" arrow>
              See it in a demo
            </Cta>
          </div>
          <Illustrative className="mt-4" />
        </div>
      </div>
    </section>
  );
}

function FeatureButton({ label, on, onActivate }: { label: string; on: boolean; onActivate: () => void }) {
  return (
    <li className="shrink-0">
      <button
        type="button"
        aria-pressed={on}
        onPointerEnter={(e) => e.pointerType === "mouse" && onActivate()}
        onFocus={onActivate}
        onClick={onActivate}
        className={clsx(
          "rounded-full border px-3.5 py-1.5 text-[13.5px] font-medium transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-px",
          on ? "border-primary/50 bg-primary-tint text-primary" : "border-edge bg-panel text-fg hover:border-primary/50 hover:text-primary",
        )}
      >
        {label}
      </button>
    </li>
  );
}
