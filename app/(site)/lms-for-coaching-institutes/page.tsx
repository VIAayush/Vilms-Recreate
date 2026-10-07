import { SolutionTemplate } from "@/components/pages/solutions/SolutionTemplate";
import { coachingData } from "@/components/pages/solutions/content/coaching";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("coaching");

export default function Page() {
  return <SolutionTemplate data={coachingData} />;
}
