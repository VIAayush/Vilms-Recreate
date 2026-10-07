"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ClipboardCheck, Radio, Video } from "lucide-react";
import { EASE } from "@/components/site-ui/motion-tokens";
import { HYBRID_COPY, HYBRID_MODULES, type HybridFormat, type ModuleType } from "./courses-data";
import { MockCaption, Segmented, panelDomId, tabDomId } from "./shared";

// One course, three formats. Switch the format and the modules that don't
// belong to it dim; Hybrid keeps all of them in one place.

const ID = "hyb";
const ICON: Record<ModuleType, typeof Video> = { recorded: Video, live: Radio, test: ClipboardCheck };
const LABEL: Record<ModuleType, string> = { recorded: "Recorded", live: "Live", test: "Test" };

export function HybridBlock() {
  const [format, setFormat] = useState<HybridFormat>("hybrid");
  const copy = HYBRID_COPY[format];

  return (
    <div>
      <Segmented
        label="Course format"
        idPrefix={ID}
        value={format}
        onChange={setFormat}
        options={[
          { id: "recorded", label: "Recorded" },
          { id: "live", label: "Live" },
          { id: "hybrid", label: "Hybrid" },
        ]}
      />

      <div id={panelDomId(ID)} role="tabpanel" aria-labelledby={tabDomId(ID, format)} className="mt-8">
        <div className="relative">
          <span aria-hidden className={clsx("absolute left-0 right-0 top-[26px] hidden h-px bg-edge-strong transition-opacity duration-500 lg:block", format === "hybrid" ? "opacity-100" : "opacity-0")} />
          <ol className="relative grid gap-2.5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
            {HYBRID_MODULES.map((m, i) => {
              const Icon = ICON[m.type];
              const lit = format === "hybrid" || m.type === "test" || m.type === format;
              return (
                <li
                  key={m.id}
                  className={clsx(
                    "relative rounded-2xl border p-3.5 transition-all duration-500",
                    lit ? "border-edge-strong bg-panel shadow-soft" : "border-dashed border-edge bg-transparent opacity-45",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={clsx(
                        "grid h-[34px] w-[34px] place-items-center rounded-full border transition-colors duration-500",
                        lit ? (m.type === "live" ? "border-red/30 bg-red-tint text-red" : "border-primary/30 bg-primary-tint text-primary") : "border-edge bg-sunken text-fg-faint",
                      )}
                    >
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-faint">
                      {String(i + 1).padStart(2, "0")} · {LABEL[m.type]}
                    </span>
                  </span>
                  <p className="mt-3 text-[14.5px] font-medium leading-snug">{m.title}</p>
                  <p className="mt-0.5 text-[12.5px] text-fg-muted">{lit ? m.meta : "Not in this format"}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-8 grid items-start gap-5 border-t border-edge pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={format} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
              <h3 className="font-display text-[26px] font-medium tracking-[-0.03em]">{copy.title}</h3>
              <p className="mt-2 max-w-[560px] text-[16px] leading-relaxed text-fg-muted">{copy.text}</p>
            </motion.div>
          </AnimatePresence>
          <ul className="flex flex-wrap gap-2 md:max-w-[260px] md:justify-end">
            {["One price", "One progress view", "One certificate"].map((t) => (
              <li key={t} className={clsx("rounded-full border px-3 py-1 text-[12.5px] font-medium transition-colors duration-500", format === "hybrid" ? "border-primary/40 bg-primary-tint text-primary" : "border-edge text-fg-faint")}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <MockCaption className="mt-5" />
    </div>
  );
}
