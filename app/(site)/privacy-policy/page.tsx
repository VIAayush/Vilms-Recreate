import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/pages/legal/LegalLayout";
import { brand } from "@/lib/content";
import { href } from "@/lib/site/pages";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("privacy");

const TOC = [
  { id: "contact-us", label: "What we collect when you contact us" },
  { id: "why", label: "Why we use it" },
  { id: "analytics", label: "Website analytics" },
  { id: "storage", label: "Where it is stored" },
  { id: "choices", label: "Your choices" },
];

// Plain-language notice for this marketing website. Have it reviewed by your
// legal advisor before relying on it.
export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      page="privacy"
      summary={`How the VILMS website (${brand.domain}) handles the details you share with us and the analytics we collect, in plain language.`}
      meta="Last updated October 2026"
      glance={[
        "We collect what you type into a form, plus the page or advert that brought you.",
        "We do not sell your details.",
        "Analytics use a random identifier. No fingerprinting, and we honour Global Privacy Control and Do Not Track.",
        "Enquiries are stored in India (Mumbai region), visible only to signed-in VILMS team members.",
      ]}
      toc={TOC}
    >
      <LegalSection id="contact-us" n={1} title="What we collect when you contact us">
        <p>
          When you book a demo or ask to start a trial, we collect what you type into the form: your name, institute name, work email, phone number, city, institute type, number of students and any optional details you add. We also record when you submitted it and which page or advert brought you to us (for example a campaign tag in the link).
        </p>
      </LegalSection>
      <LegalSection id="why" n={2} title="Why we use it">
        <p>Only to respond to your enquiry: a member of the VILMS team may call, WhatsApp or email you about it. We do not sell your details. You agree to this contact when you tick the consent box on the form.</p>
      </LegalSection>
      <LegalSection id="analytics" n={3} title="Website analytics">
        <p>
          We measure how the site is used (pages viewed and buttons clicked) with a random identifier stored in your browser. We don’t use fingerprinting and we don’t store your IP address in readable form. If your browser sends a Global Privacy Control or Do Not Track signal, we don’t record this activity.
        </p>
        <p>
          Google Analytics 4 and the Meta Pixel load on this site only if the VILMS team has enabled them, and never when your browser sends one of those privacy signals. The exact items this site keeps in your browser, and how to clear them, are listed in our <Link href={href("cookies")}>Cookie policy</Link>.
        </p>
      </LegalSection>
      <LegalSection id="storage" n={4} title="Where it is stored and who can see it">
        <p>Enquiries are stored in a database hosted in India (Mumbai region). Only signed-in members of the VILMS team can view them.</p>
      </LegalSection>
      <LegalSection id="choices" n={5} title="Your choices">
        <p>
          To see, correct or delete the details you sent us, email <a href={`mailto:${brand.emails.general}`}>{brand.emails.general}</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
