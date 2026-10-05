import type { ExplorerTabId } from "@/lib/content";

// Lets the header (and any link) open a specific tab of the product explorer
// without a page reload. Off the home page, links use /#product-<tab>, which
// the explorer reads on mount.
export const EXPLORE_EVENT = "vilms:explore";

export function openExplorerTab(tab: ExplorerTabId) {
  window.dispatchEvent(new CustomEvent<ExplorerTabId>(EXPLORE_EVENT, { detail: tab }));
  history.replaceState(null, "", `#product-${tab}`);
  document.getElementById("product")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function tabFromHash(hash: string, valid: readonly string[]): ExplorerTabId | null {
  const m = /^#product-([a-z]+)$/.exec(hash);
  return m && valid.includes(m[1]) ? (m[1] as ExplorerTabId) : null;
}
