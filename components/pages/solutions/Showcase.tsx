import { ScaledVisual } from "@/components/marketing/labs/ScaledVisual";
import { BrowserFrame, Illustrative } from "@/components/marketing/screens/primitives";
import { Reveal } from "@/components/site-ui/Reveal";
import type { SolutionData } from "./types";

/**
 * Two real-sized product views for the page: what the institute's team sees
 * (a browser) and what the student sees (a phone). Both are drawn from the
 * same sample record, scaled to fit.
 */
export function Showcase({ admin, student }: Pick<SolutionData["showcase"], "admin" | "student">) {
  return (
    <div>
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
        <Reveal className="group hidden min-w-0 sm:block">
          <BrowserFrame url={admin.url} className="transition duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-float">
            <div style={{ aspectRatio: `${admin.w} / ${admin.h}` }}>
              <ScaledVisual width={admin.w} height={admin.h} fit="width">
                {admin.node}
              </ScaledVisual>
            </div>
          </BrowserFrame>
          <p className="mt-4 flex items-center gap-2 text-[14px] text-fg-muted">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Team view</span>
            <span aria-hidden className="h-px w-6 bg-edge-strong" />
            {admin.label}
          </p>
        </Reveal>

        <Reveal delay={120} className="group mx-auto w-full min-w-0 max-w-[280px] lg:mx-0">
          <div className="rounded-[34px] border-[7px] border-edge-strong bg-panel shadow-window transition duration-500 ease-out group-hover:-translate-y-1.5 group-hover:rotate-[-0.6deg] group-hover:shadow-float">
            <div className="relative overflow-hidden rounded-[26px]">
              <span aria-hidden className="absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-edge-strong" />
              <div style={{ aspectRatio: `${student.w} / ${student.h}` }}>
                <ScaledVisual width={student.w} height={student.h} fit="width">
                  {student.node}
                </ScaledVisual>
              </div>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-[14px] text-fg-muted">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Student view</span>
            <span aria-hidden className="h-px w-6 bg-edge-strong" />
            <span className="min-w-0">{student.label}</span>
          </p>
        </Reveal>
      </div>
      <p className="mt-6 max-w-[320px] text-[14px] leading-snug text-fg-muted sm:hidden">{admin.label}</p>
      <Illustrative className="mt-8" />
    </div>
  );
}
