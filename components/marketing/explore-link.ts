import type { ExplorerTabId } from "@/lib/content";

// Deep links into the Explore section: /#explore-<area> opens that area.
// In-page links dispatch an event instead of reloading.
export const EXPLORE_EVENT = "vilms:explore";

export function openExplorerTab(tab: ExplorerTabId) {
  window.dispatchEvent(new CustomEvent<ExplorerTabId>(EXPLORE_EVENT, { detail: tab }));
  history.replaceState(null, "", `#explore-${tab}`);
  document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function tabFromHash(hash: string, valid: readonly string[]): ExplorerTabId | null {
  const m = /^#explore-([a-z]+)$/.exec(hash);
  return m && valid.includes(m[1]) ? (m[1] as ExplorerTabId) : null;
}
