import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/pages/legal/LegalLayout";
import { ContactPanel, KnownFacts, PlaceholderNotice } from "@/components/pages/legal/Placeholder";
import { href } from "@/lib/site/pages";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("refund");

const TOC = [
  { id: "status", label: "Status of this page" },
  { id: "facts", label: "What is already true" },
  { id: "billing", label: "Billing questions" },
];

// Placeholder: there is no approved source text for refunds yet, so this page
// states only facts that are already published elsewhere on the site. Do not
// add refund terms here until they have been written and reviewed.
export default function RefundPolicyPage() {
  return (
    <LegalLayout page="refund" summary="The refund and billing terms for VILMS plans are being prepared. Here is where things stand." toc={TOC}>
      <LegalSection id="status" n={1} title="Status of this page">
        <PlaceholderNotice what="Refund Policy" />
      </LegalSection>

      <LegalSection id="facts" n={2} title="What is already true">
        <p>These points are stated elsewhere on this website, for example on the <Link href={href("pricing")}>pricing page</Link>. They are repeated here for convenience and are not a substitute for the full policy.</p>
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
      </LegalSection>

      <LegalSection id="billing" n={3} title="Billing questions">
        <ContactPanel lead="For anything about an invoice or a payment, write to billing. For everything else, write to the general address." />
      </LegalSection>
    </LegalLayout>
  );
}
