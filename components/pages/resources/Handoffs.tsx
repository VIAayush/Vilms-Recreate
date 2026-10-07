import { Database, Keyboard } from "lucide-react";

// "Every dashed arrow is a person re-typing something." Four separate tools on
// the left with hand-offs between them; one database on the right. Pure
// markup + SVG, no motion. Illustrative.
const TOOLS = ["WhatsApp", "Zoom", "Google Forms", "Spreadsheets"];

export function Handoffs() {
  return (
    <div className="grid items-stretch gap-4 sm:grid-cols-[1.25fr_1fr]">
      {/* the patchwork */}
      <div className="relative rounded-2xl border border-dashed border-edge-strong bg-panel p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">A stack of tools</p>
        <div className="relative mt-5 grid grid-cols-2 gap-x-6 gap-y-9">
          {TOOLS.map((t, i) => (
            <div key={t} className="relative rounded-xl border border-edge bg-canvas-alt px-3 py-3.5 text-center text-[14px] font-medium">
              {t}
              {i % 2 === 0 ? (
                <span aria-hidden className="absolute left-full top-1/2 h-px w-6 border-t border-dashed border-red" />
              ) : null}
              {i < 2 ? (
                <span aria-hidden className="absolute left-1/2 top-full h-9 w-px border-l border-dashed border-red" />
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-2 text-[13.5px] text-fg-muted">
          <Keyboard aria-hidden className="h-4 w-4 text-red" />
          Each dashed link is a person copying details across.
        </p>
      </div>

      {/* one database */}
      <div className="band-navy relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">One database</p>
        <div className="my-6 flex items-center justify-center">
          <span className="relative grid h-24 w-24 place-items-center rounded-full border border-edge-strong bg-primary-tint text-primary">
            <Database aria-hidden className="h-9 w-9" />
            <span aria-hidden className="absolute -inset-3 rounded-full border border-dashed border-edge-strong" />
          </span>
        </div>
        <ul className="flex flex-wrap justify-center gap-1.5 text-[12.5px]">
          {["Leads", "Courses", "Live classes", "Tests", "Payments", "Certificates"].map((t) => (
            <li key={t} className="rounded-full border border-edge-strong px-2.5 py-1 text-fg">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-[13.5px] text-fg-muted">Entered once. Nothing re-typed.</p>
      </div>
    </div>
  );
}
