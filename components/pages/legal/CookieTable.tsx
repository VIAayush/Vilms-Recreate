// What the VILMS website keeps in the visitor's browser. Every row is taken
// from the code that writes it:
//   vilms-theme                       components/marketing/ThemeToggle.tsx
//   vilms_vid, vilms_first_touch,
//   vilms_last_touch, vilms_sid        lib/client/tracking.ts
// If that code changes, change this table with it.

export const STORAGE_ITEMS = [
  {
    name: "vilms-theme",
    kind: "Local storage",
    purpose: "Remembers whether you chose light or dark mode. Written only when you use the theme switch.",
    lasts: "Until you clear it",
  },
  {
    name: "vilms_vid",
    kind: "Local storage",
    purpose: "A random visitor ID that ties page views and button clicks from the same browser together in our own analytics. Not created when a privacy signal is on.",
    lasts: "Until you clear it",
  },
  {
    name: "vilms_first_touch",
    kind: "Local storage (session storage with a privacy signal)",
    purpose: "Your first visit: the landing page, the external site you came from and any campaign tags in the link (UTM tags, Google or Meta ad click IDs).",
    lasts: "Until you clear it (this tab only, with a privacy signal)",
  },
  {
    name: "vilms_last_touch",
    kind: "Local storage (session storage with a privacy signal)",
    purpose: "The most recent campaign tags you arrived with. Only written when the link you used carries campaign tags or an ad click ID. Not used for attribution after 30 days.",
    lasts: "Until you clear it (this tab only, with a privacy signal)",
  },
  {
    name: "vilms_sid",
    kind: "Session storage",
    purpose: "A random session ID attached to analytics events from this tab, so one visit can be told apart from the next.",
    lasts: "Until you close the tab",
  },
] as const;

export const EVENTS = [
  { name: "Page view", text: "A page of this site was opened." },
  { name: "Button click", text: "A Book a Demo or Start Free Trial button was clicked." },
  { name: "Section views", text: "The pricing section, or a feature section, scrolled into view." },
  { name: "Lead form", text: "The enquiry form was opened, or submitted." },
];

/** Name / where / purpose / duration. A table from tablet up; stacked cards on phones. */
export function CookieTable() {
  return (
    <div role="table" aria-label="Items this website stores in your browser" className="overflow-hidden rounded-[24px] border border-edge-strong bg-panel">
      <div role="row" className="hidden grid-cols-[190px_190px_minmax(0,1fr)_170px] gap-x-5 border-b border-edge-strong bg-canvas-alt px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint md:grid">
        <span role="columnheader">Name</span>
        <span role="columnheader">Where</span>
        <span role="columnheader">What it is for</span>
        <span role="columnheader">How long</span>
      </div>
      {STORAGE_ITEMS.map((i) => (
        <div key={i.name} role="row" className="grid gap-x-5 gap-y-1.5 border-b border-edge px-5 py-5 last:border-b-0 md:grid-cols-[190px_190px_minmax(0,1fr)_170px]">
          <span role="rowheader">
            <code className="break-all rounded-md bg-sunken px-2 py-1 font-mono text-[13px] text-fg">{i.name}</code>
          </span>
          <span role="cell" className="text-[14px] text-fg-muted">
            <span className="mr-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg-faint md:hidden">Where</span>
            {i.kind}
          </span>
          <span role="cell" className="text-[14.5px] leading-snug">
            {i.purpose}
          </span>
          <span role="cell" className="text-[14px] text-fg-muted">
            <span className="mr-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg-faint md:hidden">How long</span>
            {i.lasts}
          </span>
        </div>
      ))}
    </div>
  );
}
