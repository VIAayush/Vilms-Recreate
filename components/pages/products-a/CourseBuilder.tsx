"use client";

import { useState, type KeyboardEvent } from "react";
import clsx from "clsx";
import { AnimatePresence, Reorder, motion, useDragControls } from "motion/react";
import { Check, ChevronRight, ClipboardCheck, Clock, GripVertical, Lock, Paperclip, Play, Plus, Radio, RotateCcw, Video } from "lucide-react";
import { BrowserFrame, Pill } from "@/components/marketing/screens/primitives";
import { EASE } from "@/components/site-ui/motion-tokens";
import { AVAIL_LABEL, AVAIL_ORDER, EXTRA_MODULES, START_MODULES, type Avail, type CourseModule, type ModuleType } from "./courses-data";
import { MockCaption } from "./shared";

// A course builder you can actually use: drag a module by its handle (or move
// it with the arrow keys), tap its badge to change when it opens, add a
// module. The "what students see" pane follows every change.

const TYPE_ICON: Record<ModuleType, typeof Video> = { recorded: Video, live: Radio, test: ClipboardCheck };
const TYPE_TONE: Record<ModuleType, string> = { recorded: "text-primary", live: "text-red", test: "text-navy" };

const AVAIL_STYLE: Record<Avail, string> = {
  open: "bg-sunken text-fg-muted hover:bg-edge",
  preview: "bg-green-tint text-green hover:brightness-95",
  drip: "bg-panel text-yellow-text ring-1 ring-inset ring-yellow/70 hover:bg-sunken",
  soon: "border border-dashed border-edge-strong bg-panel text-fg-muted hover:bg-sunken",
};

function BuilderRow({ item, index, last, onCycle, onMove }: { item: CourseModule; index: number; last: boolean; onCycle: (id: string) => void; onMove: (index: number, by: number) => void }) {
  const controls = useDragControls();
  const Icon = TYPE_ICON[item.type];

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();
      onMove(index, -1);
    } else if (e.key === "ArrowDown" && !last) {
      e.preventDefault();
      onMove(index, 1);
    }
  };

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      whileDrag={{ scale: 1.02, boxShadow: "0 18px 40px -16px rgb(14 27 44 / 0.35)", zIndex: 5 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="relative mb-2 flex items-center gap-2 rounded-xl border border-edge bg-panel py-2 pl-1.5 pr-2 sm:gap-2.5 sm:pr-3"
    >
      <button
        type="button"
        aria-label={`Reorder ${item.title}. Press the up or down arrow key to move it, or drag.`}
        onPointerDown={(e) => {
          e.preventDefault();
          controls.start(e);
        }}
        onKeyDown={onKey}
        style={{ touchAction: "none" }}
        className="grid h-9 w-7 shrink-0 cursor-grab place-items-center rounded-md text-fg-faint transition-colors hover:bg-sunken hover:text-fg active:cursor-grabbing"
      >
        <GripVertical aria-hidden className="h-4 w-4" />
      </button>
      <span className={clsx("grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-canvas-alt", TYPE_TONE[item.type])}>
        <Icon aria-hidden className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-medium leading-tight">{item.title}</span>
        <span className="mt-0.5 flex items-center gap-2 text-[11px] text-fg-muted">
          <span className="truncate">{item.meta}</span>
          {item.files ? (
            <span className="hidden shrink-0 items-center gap-0.5 sm:inline-flex">
              <Paperclip aria-hidden className="h-3 w-3" />
              {item.files}
            </span>
          ) : null}
        </span>
      </span>
      <button
        type="button"
        onClick={() => onCycle(item.id)}
        aria-label={`${item.title}: ${AVAIL_LABEL[item.avail]}. Activate to change when it opens.`}
        className={clsx("shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors", AVAIL_STYLE[item.avail])}
      >
        {AVAIL_LABEL[item.avail]}
      </button>
    </Reorder.Item>
  );
}

function StudentRow({ item, going, onRsvp }: { item: CourseModule; going: boolean; onRsvp: () => void }) {
  const Icon = TYPE_ICON[item.type];
  let right: React.ReactNode;
  let dim = false;

  if (item.avail === "drip") {
    dim = true;
    right = (
      <span className="flex items-center gap-1 text-[11px] text-fg-muted">
        <Lock aria-hidden className="h-3 w-3" /> Unlocks in 7 days
      </span>
    );
  } else if (item.avail === "soon") {
    dim = true;
    right = (
      <span className="flex items-center gap-1 text-[11px] text-fg-muted">
        <Clock aria-hidden className="h-3 w-3" /> Coming soon
      </span>
    );
  } else if (item.type === "live") {
    right = (
      <button
        type="button"
        onClick={onRsvp}
        aria-pressed={going}
        className={clsx(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors",
          going ? "bg-green-tint text-green" : "bg-navy text-primary-ink hover:bg-primary",
        )}
      >
        {going ? (
          <>
            <Check aria-hidden className="h-3 w-3" /> Going
          </>
        ) : (
          "RSVP"
        )}
      </button>
    );
  } else if (item.avail === "preview") {
    right = (
      <span className="flex items-center gap-1 rounded-full bg-green-tint px-2 py-0.5 text-[11px] font-semibold text-green">
        <Play aria-hidden className="h-3 w-3" fill="currentColor" /> Free preview
      </span>
    );
  } else {
    right = (
      <span className="flex items-center gap-0.5 text-[11.5px] font-medium text-primary">
        {item.type === "test" ? "Start" : "Watch"} <ChevronRight aria-hidden className="h-3.5 w-3.5" />
      </span>
    );
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex items-center gap-2.5 rounded-lg border border-edge bg-panel px-2.5 py-2.5"
    >
      <span className={clsx("grid h-7 w-7 shrink-0 place-items-center rounded-md", dim ? "bg-sunken text-fg-faint" : "bg-primary-tint text-primary")}>
        {dim ? <Lock aria-hidden className="h-3.5 w-3.5" /> : <Icon aria-hidden className="h-3.5 w-3.5" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className={clsx("block truncate text-[12.5px] font-medium leading-tight", dim && "text-fg-muted")}>{item.title}</span>
        {item.type === "live" && !dim ? <span className="block truncate text-[10.5px] text-fg-muted">{item.meta.replace("Live · ", "")}</span> : null}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={`${item.avail}-${going}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="shrink-0">
          {right}
        </motion.span>
      </AnimatePresence>
    </motion.li>
  );
}

export function CourseBuilder() {
  const [items, setItems] = useState<CourseModule[]>(START_MODULES);
  const [added, setAdded] = useState(0);
  const [going, setGoing] = useState(false);

  const cycle = (id: string) =>
    setItems((cur) => cur.map((m) => (m.id === id ? { ...m, avail: AVAIL_ORDER[(AVAIL_ORDER.indexOf(m.avail) + 1) % AVAIL_ORDER.length] } : m)));

  const move = (index: number, by: number) =>
    setItems((cur) => {
      const next = [...cur];
      const [m] = next.splice(index, 1);
      next.splice(index + by, 0, m);
      return next;
    });

  const add = () => {
    if (added >= EXTRA_MODULES.length) return;
    setItems((cur) => [...cur, EXTRA_MODULES[added]]);
    setAdded((n) => n + 1);
  };

  const reset = () => {
    setItems(START_MODULES);
    setAdded(0);
    setGoing(false);
  };

  const hasRec = items.some((m) => m.type === "recorded");
  const hasLive = items.some((m) => m.type === "live");
  const format = hasRec && hasLive ? "Hybrid" : hasLive ? "Live" : hasRec ? "Recorded" : "Empty";
  const changed = added > 0 || items.some((m, i) => m.id !== START_MODULES[i]?.id || m.avail !== START_MODULES[i]?.avail) || going;

  return (
    <div className="relative">
      <BrowserFrame url="yourinstitute.vilms.in/admin/courses/builder" className="shadow-window">
        <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          {/* builder */}
          <div className="min-w-0 p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] text-fg-muted">Courses / Course builder</p>
                <p className="truncate text-[17px] font-semibold tracking-tight">Prelims Foundation Batch</p>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={format} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Pill tone="primary" className="px-2.5 py-1 text-[11.5px]">
                    {format}
                  </Pill>
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="mb-3 mt-3 text-[12.5px] text-fg-muted">Drag a handle to reorder. Tap a badge to change when a module opens.</p>

            <Reorder.Group as="ul" axis="y" values={items} onReorder={setItems} className="list-none">
              {items.map((m, i) => (
                <BuilderRow key={m.id} item={m} index={i} last={i === items.length - 1} onCycle={cycle} onMove={move} />
              ))}
            </Reorder.Group>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={add}
                disabled={added >= EXTRA_MODULES.length}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-dashed border-edge-strong px-3.5 text-[13px] font-medium text-fg-muted transition hover:border-primary hover:bg-primary-tint hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-edge-strong disabled:hover:bg-transparent disabled:hover:text-fg-muted"
              >
                <Plus aria-hidden className="h-4 w-4" /> Add module
              </button>
              <AnimatePresence>
                {changed ? (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-fg-muted transition-colors hover:text-primary"
                  >
                    <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Reset
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* student view */}
          <div className="min-w-0 border-t border-edge bg-canvas-alt p-4 sm:p-6 lg:border-l lg:border-t-0">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">What students see</p>
            <div className="mt-3 rounded-2xl border border-edge bg-panel p-3.5 shadow-soft">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold leading-tight">Prelims Foundation Batch</p>
                  <p className="mt-0.5 text-[11px] text-fg-muted">
                    {format} · {going ? 43 : 42} students RSVP’d
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-navy px-3 py-1.5 text-[11.5px] font-semibold text-primary-ink">Enrol · ₹15,000</span>
              </div>
              <ul className="mt-3 space-y-1.5">
                <AnimatePresence initial={false} mode="popLayout">
                  {items.map((m) => (
                    <StudentRow key={m.id} item={m} going={going} onRsvp={() => setGoing((g) => !g)} />
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </div>
      </BrowserFrame>
      <MockCaption className="mt-4 text-center">Illustrative interface · sample data · try it</MockCaption>
    </div>
  );
}
