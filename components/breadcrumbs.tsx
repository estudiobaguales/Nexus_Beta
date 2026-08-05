import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Crumb } from "@/lib/seo"
import { cn } from "@/lib/utils"

// El tipo vive en lib/seo.ts: el mismo Crumb[] alimenta este breadcrumb visual y
// el BreadcrumbList JSON-LD del server component, para que no se separen.
export type { Crumb }

/**
 * `light` es para los heros con foto de fondo, donde el texto va sobre la imagen.
 * Sube las opacidades respecto de un simple text-background/60 para que el enlace
 * inactivo siga cumpliendo contraste AA sobre el overlay.
 */
export type BreadcrumbsTone = "default" | "light"

export function Breadcrumbs({
  items,
  tone = "default",
}: {
  items: Crumb[]
  tone?: BreadcrumbsTone
}) {
  const light = tone === "light"

  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol
        className={cn(
          "flex items-center flex-wrap gap-1.5 text-caption",
          light ? "text-background/80" : "text-muted-foreground",
        )}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn("font-medium", light ? "text-background" : "text-foreground")}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    light ? "hover:text-background" : "hover:text-foreground",
                  )}
                >
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
