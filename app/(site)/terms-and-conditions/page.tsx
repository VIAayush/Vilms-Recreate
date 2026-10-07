import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/pages/legal/LegalLayout";
import { ContactPanel, KnownFacts, PlaceholderNotice } from "@/components/pages/legal/Placeholder";
import { href } from "@/lib/site/pages";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("terms");

const TOC = [
  { id: "status", label: "Status of this page" },
  { id: "facts", label: "What is already true" },
  { id: "questions", label: "Questions" },
];

// Placeholder: there is no approved source text for the terms yet, so this page
// states only facts that are already published elsewhere on the site. Do not
// add terms here until they have been written and reviewed.
export default function TermsPage() {
  return (
    <LegalLayout page="terms" summary="The terms that apply to using the VILMS website and plans are being prepared. Here is where things stand." toc={TOC}>
      <LegalSection id="status" n={1} title="Status of this page">
        <PlaceholderNotice what="Terms & Conditions" />
      </LegalSection>

      <LegalSection id="facts" n={2} title="What is already true">
        <p>These points are stated elsewhere on this website, for example on the <Link href={href("pricing")}>pricing page</Link>. They are repeated here for convenience and are not a substitute for the full terms.</p>
        <div className="!mt-6">
          <KnownFacts
            items={[
              { label: "Free trial", text: "A 14-day free trial. No card is needed to start." },
              { label: "Plans", text: "Plans are priced per month and exclude 18% GST." },
              { label: "Student fees", text: "Fees that students pay go to the institute’s own Razorpay account." },
              { label: "Revenue share", text: "0%. VILMS takes no share of the fees students pay." },
            ]}
          />
        </div>
        <p>
          How the website handles your details is described in the <Link href={href("privacy")}>Privacy policy</Link> and the <Link href={href("cookies")}>Cookie policy</Link>.
        </p>
      </LegalSection>

      <LegalSection id="questions" n={3} title="Questions">
        <ContactPanel lead="Write to us if you need something in writing before the full terms are published." />
      </LegalSection>
    </LegalLayout>
  );
}
