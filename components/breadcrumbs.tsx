import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Crumb } from "@/lib/seo"

// El tipo vive en lib/seo.ts: el mismo Crumb[] alimenta este breadcrumb visual y
// el BreadcrumbList JSON-LD del server component, para que no se separen.
export type { Crumb }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1.5 text-caption text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-foreground font-medium">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              )}
              {!isLast && <ChevronRight className="w-3 h-3" strokeWidth={1.5} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
