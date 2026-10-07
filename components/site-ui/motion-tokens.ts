// Shared motion vocabulary for the public site. Components import these
// instead of inventing durations, so every animation has the same feel:
// quick to start, long to settle (ease-out), springs for things you move.

export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = { fast: 0.18, base: 0.35, slow: 0.6 } as const;

export const SPRING = { type: "spring", stiffness: 260, damping: 28 } as const;
export const SPRING_SOFT = { type: "spring", stiffness: 140, damping: 22 } as const;
export const SPRING_SNAP = { type: "spring", stiffness: 420, damping: 32 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE } },
};

export const stagger = (gap = 0.07, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** For AnimatePresence panels that swap content (tabs, steps). */
export const swap = {
  initial: { opacity: 0, y: 14, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: DURATION.base, ease: EASE } },
  exit: { opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: DURATION.fast } },
};
