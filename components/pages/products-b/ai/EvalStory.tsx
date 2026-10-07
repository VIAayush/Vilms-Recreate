"use client";

import { ScrollStory } from "@/components/site-ui/ScrollStory";
import { EvalStage } from "./EvalStage";
import { EVAL_STEPS } from "./data";

/** Seven steps from upload to evaluated copy; the stage follows the scroll. */
export function EvalStory() {
  return <ScrollStory steps={EVAL_STEPS} perStep={0.75} stageHeight="min(760px, calc(100svh - 120px))" stage={(i, p) => <EvalStage step={i} progress={p} />} />;
}
