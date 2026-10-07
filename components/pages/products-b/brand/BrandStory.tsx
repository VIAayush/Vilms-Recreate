"use client";

import { ScrollStory } from "@/components/site-ui/ScrollStory";
import { BrowserFrame, Illustrative } from "@/components/marketing/screens/primitives";
import { settle, useStepClock } from "../shared/clock";
import { BRAND_STEPS } from "./data";
import { BrandCertificate, BrandEmail, BrandPortal } from "./pieces";
import { DEFAULT_BRAND, type Brand } from "./brand";

const N = BRAND_STEPS.length;

/** VILMS branding, then the institute's, then its own address. */
export function BrandStory() {
  return <ScrollStory steps={BRAND_STEPS} perStep={0.7} stageHeight="min(760px, calc(100svh - 120px))" stage={(i, p) => <BrandStage step={i} progress={p} />} />;
}

function BrandStage({ step, progress }: { step: number; progress: number }) {
  const { u } = useStepClock(step, progress, N);
  const v = settle(u);
  const branded = step > 1 || (step === 1 && v > 0.3);
  const custom = step === 4 && v > 0.3;
  const brand: Brand = { ...DEFAULT_BRAND, branded, domainMode: custom ? "custom" : "sub" };
  const url = step < 3 ? "app.vilms.in" : custom ? "abcacademy.in" : "abcacademy.vilms.in";
  const showCert = step > 2 || (step === 2 && v > 0.25);
  const showMail = step > 2 || (step === 2 && v > 0.55);

  return (
    <div role="img" aria-label={`Illustrative interface, sample data. Step ${step + 1} of ${N}: ${BRAND_STEPS[step].title}.`} className="space-y-3">
      <BrowserFrame url={url} className="rounded-[20px]">
        <BrandPortal b={brand} />
      </BrowserFrame>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="transition duration-500" style={{ opacity: showCert ? 1 : 0.18, transform: showCert ? "none" : "translateY(14px) scale(0.98)" }}>
          <BrandCertificate b={brand} />
        </div>
        <div className="transition duration-500" style={{ opacity: showMail ? 1 : 0.18, transform: showMail ? "none" : "translateY(14px) scale(0.98)" }}>
          <BrandEmail b={brand} />
        </div>
      </div>
      <Illustrative />
    </div>
  );
}
