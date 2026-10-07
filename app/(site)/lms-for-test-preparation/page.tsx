import { SolutionTemplate } from "@/components/pages/solutions/SolutionTemplate";
import { testPrepData } from "@/components/pages/solutions/content/testPrep";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("testPrep");

export default function Page() {
  return <SolutionTemplate data={testPrepData} />;
}
