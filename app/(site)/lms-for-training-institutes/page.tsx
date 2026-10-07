import { SolutionTemplate } from "@/components/pages/solutions/SolutionTemplate";
import { trainingData } from "@/components/pages/solutions/content/training";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("training");

export default function Page() {
  return <SolutionTemplate data={trainingData} />;
}
