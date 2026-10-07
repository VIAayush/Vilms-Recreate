import { SolutionTemplate } from "@/components/pages/solutions/SolutionTemplate";
import { onlineCoachingData } from "@/components/pages/solutions/content/onlineCoaching";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("onlineCoaching");

export default function Page() {
  return <SolutionTemplate data={onlineCoachingData} />;
}
