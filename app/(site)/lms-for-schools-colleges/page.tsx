import { SolutionTemplate } from "@/components/pages/solutions/SolutionTemplate";
import { schoolsCollegesData } from "@/components/pages/solutions/content/schoolsColleges";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("schoolsColleges");

export default function Page() {
  return <SolutionTemplate data={schoolsCollegesData} />;
}
