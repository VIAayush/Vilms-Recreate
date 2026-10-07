import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { PageKey } from "@/lib/site/pages";
import { JsonLd, breadcrumbLd, trailFor } from "@/lib/site/seo";

// Visible trail plus BreadcrumbList structured data, from the page registry.
export function Breadcrumbs({ page, className }: { page: PageKey; className?: string }) {
  const trail = trailFor(page);
  return (
    <>
      <JsonLd data={breadcrumbLd(trail)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-fg-muted">
          {trail.map((t, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={t.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-fg">
                    {t.name}
                  </span>
                ) : (
                  <>
                    <Link href={t.path} className="transition-colors hover:text-primary">
                      {t.name}
                    </Link>
                    <ChevronRight aria-hidden className="h-3.5 w-3.5 text-fg-faint" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
