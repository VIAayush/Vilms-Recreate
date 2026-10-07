# VILMS public site — build guide

Working notes for building pages on the public site (`app/(site)/…`). The CRM
(`app/crm`, `components/crm`, `lib/crm|server|integrations|supabase`,
`app/api`, `proxy.ts`, `supabase/`) is **off limits** — never edit it.

## Sources of truth

- **Structure / URLs / keywords:** `lib/site/pages.ts` (the registry — built from
  `VILMS-Structure.jpeg` and the "VI LMS Website Structure and Suggested SEO
  Friendly URL" Google Sheet). Every page's `<title>`, description, primary and
  secondary keywords are already there: `export const metadata = pageMetadata("key")`.
- **Product facts:** `C:\VI\VILMS Recreate\VILMS Sales Brochure.pdf` as text:
  `C:\Users\Aayush\AppData\Local\Temp\claude\C--VI-VILMS-Recreate\0a351169-0b8a-4501-9ddd-9a38e094c9e0\scratchpad\VILMS_Sales_Brochure.pdf.txt`
  (read it before writing copy), plus `lib/content.ts` (current plans/prices).
- **Brand:** the real logo — `components/marketing/BrandMark.tsx` (`BrandMark`, `Wordmark`).
  Never redraw it.

## Hard content rules

1. **No invented proof.** No customers, logos, testimonials, reviews, ratings,
   statistics, awards, certifications, revenue figures, student counts,
   employee counts, case studies. The only "proof" VILMS has: *it runs a live
   coaching institute in production* (say exactly that, no numbers).
2. **Interface content is sample data** (Rahul Kumar, Prelims Foundation, ₹15,000,
   "Your Institute", yourinstitute.vilms.in …). Label big mock-ups
   "Illustrative interface · sample data" (small, `text-fg-faint`).
3. **No real competitor claims.** Don't name competitors with made-up facts.
4. **Pricing** (single source: `lib/content.ts` → `pricing`): Base ₹499 / up to 50
   students · Growth ₹1,199 / 200 · Scale ₹2,499 / 500 · Institute ₹4,999 / 1,500,
   per month, excluding 18% GST, 0% revenue share, 14-day free trial, no card.
   Read the numbers from `pricing.plans`, never retype them.
5. **Contact details:** only `hello@vilms.in` (general/support), `billing@vilms.in`,
   `vilms.in`. No phone, no address, no social links — they don't exist in the source.
6. Where a capability comes from the project brief but not the brochure
   (batches, faculty, rank/performance views, parent/student communication)
   write it modestly and list it in your final report under "Unverified claims".
7. Short copy. If a section can be a visual, make it a visual.

## Design rules

- **Palette** is the logo's: navy `#003056`, blue `#1D63B4`, sky, gold `#C9A24B`
  (accent only, never a large fill), silver, white and cool greys. **Forbidden:**
  beige / cream / tan / brown / warm greys, purple, blue-purple gradients,
  floating blobs, glassmorphism, AI sparkle icons (use `ScanText` for AI),
  dark-mode-by-default "AI" look, repeated three-card grids, static screenshots in boxes.
- Use Tailwind token classes only — never hard-code colours in components:
  `bg-canvas` `bg-canvas-alt` `bg-panel` `bg-sunken` · `text-fg` `text-fg-muted`
  `text-fg-faint` · `border-edge` `border-edge-strong` · `bg-navy` `text-navy`
  `bg-primary` `text-primary` `bg-primary-tint` · `text-green` `bg-green-tint`
  `text-red` `bg-red-tint` · `text-gold` `bg-sky` `bg-silver`. All adapt to dark mode.
  Dark bands: wrap in `band-navy` (deep navy, tokens flip automatically).
  A light mock-up inside a dark band: wrap it in `band-light`.
- Type: `font-display` (= sans, Figtree) for headings, weights 400–600,
  tight tracking (`tracking-[-0.035em]`), `font-mono` for small labels.
  Headings are big and editorial: `text-[clamp(32px,4.2vw,54px)]`.
- Existing primitives (see `app/globals.css`): `.wrap` (page container), `.kicker`,
  `.sub`, `.tag`, `.window`, `.link`, `.cta` + `.cta-primary|-ghost|-outline|-sm|-lg`,
  `.v-field` `.v-label`, `.no-scrollbar`, `.grid-bg`, `.prose-vilms` (long text).
- Radius: cards `rounded-2xl` / `rounded-[24px]`, panels `rounded-[28px]–[32px]`,
  small chips/inputs `rounded-lg`/`rounded-full`. Don't put everything in giant rounded boxes —
  vary: full-bleed bands, hairline-divided lists, asymmetric splits.
- Layout must hold from **320px to 1920px with no horizontal overflow**. Use
  `min-w-0` in grids, `grid-cols-1` base, and `ScaledVisual` to fit fixed-size mock-ups.
- Motion (Motion library, `import { motion, AnimatePresence, useScroll, … } from "motion/react"`):
  tokens in `components/site-ui/motion-tokens.ts` (`EASE`, `SPRING`, `swap`, `fadeUp`,
  `stagger`). `MotionConfig reducedMotion="user"` is already global. For anything that
  loops/autoplays also gate on `useReducedMotion()` and `useInView()`
  (`components/marketing/motion.ts`), and stop when off-screen. Hover states must
  mean something (buttons lift, cards raise + arrow slides, images scale 1.02–1.04).
  Plain fade-ups: wrap in `<Reveal>` (CSS only, no JS cost).
- Keep client JS lean: pages are **Server Components**; put interactivity in small
  `"use client"` components under `components/pages/<area>/`. Don't add dependencies.

## Shared building blocks (read these files first)

| Need | Import |
| --- | --- |
| Page metadata | `pageMetadata("key")` from `@/lib/site/seo` |
| JSON-LD | `<JsonLd data={…}/>`, `faqLd(items)`, `softwareLd`, `articleLd(key)`, `breadcrumbLd` (breadcrumbs are emitted by `PageHero` / `Breadcrumbs`) |
| Registry | `PAGES`, `href("key")` from `@/lib/site/pages` |
| Hero | `<PageHero page kicker title lead visual layout="split\|stack" />` — **the only `<h1>`** |
| Section | `<Section id kicker title lead tone="plain\|alt\|navy" align>` (renders `<h2>`) |
| Related links | `<RelatedPages keys={[…3–4 PageKeys]} />` — internal-link cluster |
| Closing CTA | `<CtaBand />` — last thing on every marketing page |
| FAQ | `<FaqAccordion items={[{q,a}]} />` + `<JsonLd data={faqLd(items)} />` |
| Scroll story | `<ScrollStory steps stage={(i, progress) => …} />` (pinned on desktop, stepper on phones) |
| Lead capture | `<Cta intent="trial\|demo" location="…">` (opens the lead dialog), or `<LeadForm interest location />` inline |
| Mock-up chrome | `BrowserFrame`, `Avatar`, `Pill`, `LiveDot`, `Meter`, `InstituteMark` — `components/marketing/screens/primitives.tsx` |
| Ready product UIs | `scenes.tsx` (`LeadScene EnrolScene CourseScene LiveScene EvalScene PayScene CertScene RenewScene`), `explorer.tsx` (`TeachScreen AssessScreen GrowScreen PaymentsScreen BrandScreen TeamScreen`, each takes `{active:null}`), `CrmBoard`, `EvalFlow`/`EvalStage({step 0-4})`, `LiveClass.tsx` (`LiveClassScreen`), `LiveDashboard`, `labs/visuals.tsx` (`PRODUCT_VISUALS`) |
| Fit a fixed-size mock-up into any box | `labs/ScaledVisual` (`width`,`height`,`fit="width\|contain"`) |
| Hooks | `useInView`, `useAutoplay`, `useCountUp`, `useMediaQuery`, `useReducedMotion`, `inr` — `components/marketing/motion.ts` |
| Tracking | `<TrackView name="pricing_view" />` from `@/components/site/TrackView` (allowed names: page_view, cta_click, pricing_view, feature_view, …) |

Reuse before you build, but each page's *hero visual must be its own composition* —
don't drop the same screenshot on two pages.

## Page file pattern

```tsx
// app/(site)/lms-platform/page.tsx
import { PageHero } from "@/components/site-ui/PageHero";
import { Section } from "@/components/site-ui/Section";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { JsonLd, pageMetadata, softwareLd } from "@/lib/site/seo";

export const metadata = pageMetadata("lmsPlatform");

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ description: "…" })} />
      <PageHero page="lmsPlatform" kicker="…" title={<>…</>} lead="…" visual={<HeroVisual />} />
      <Section …>…</Section>
      <RelatedPages keys={["coaching", "leadCrm", "pricing"]} />
      <CtaBand />
    </>
  );
}
```

Page content (copy, FAQ items, step lists) lives in a typed data file next to the
visuals (`components/pages/<area>/data.ts`) so components stay presentational.
Every page: unique title/H1/intro, ≥1 FAQ block where it helps (with FAQPage
schema), 3–4 internal links (`RelatedPages`), exactly one `<h1>`, logical `<h2>/<h3>`.

## Page anatomy for product & solution pages

hero (H1 + lead + 2 CTAs + **interactive visual**) → the problem (shown, not
lectured) → the solution as a workflow / scroll story → capability explorer
(tabs/hover that change a visual) → who it's for / use cases → benefits (grounded
in how the product works, not promises) → FAQ → related pages → `CtaBand`.

## Verifying your work

- Typecheck: `npx tsc --noEmit` (from `repo/`). Lint your files: `npx eslint <paths>`.
  Other people are editing other files at the same time — only fix errors in *your* files.
  **Do not run `npm run build`** (another agent may be running it) and don't touch git.
- The dev server is on **http://localhost:3100** (already running; hot reloads).
- Screenshot QA (headless Chrome via puppeteer-core), from the scratchpad
  `C:\Users\Aayush\AppData\Local\Temp\claude\C--VI-VILMS-Recreate\0a351169-0b8a-4501-9ddd-9a38e094c9e0\scratchpad`:
  - `URL=http://localhost:3100/<path> node walk.js <w> <h> <light|dark> <yourprefix>`
    scrolls the page and saves `shots/<prefix>-NN.png`, prints horizontal-overflow offenders
    and console errors. (`WAIT=1500` for slow sections, `ONLY=0,2,5` to save only some stops.)
  - `python sheet.py <prefix> <cols> <scale> [start] [count]` builds a contact sheet
    `shots/<prefix>-sheetN.png` — **open it with the Read tool and look at it.**
  - Check at 390×844 and 1440×900, light and dark, and 320×640 for overflow.
  Use a unique prefix per agent (`a1`, `a2`, `b`, `c`, `d`) so shots don't collide.
- Interactive pieces: test with puppeteer (click tabs, hover, type) — don't assume.
- Fix problems you find. Don't just report them.

## Final report format

List: files created, pages done, shared files you wanted changed (don't change them —
describe), claims you flagged as unverified, anything left undone.
