"use client"

import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import { SlidersHorizontal, ChevronDown, Grid3X3, LayoutList } from "lucide-react"
import { sortLabels, type SortOption } from "@/lib/product-sort"
import { cn } from "@/lib/utils"

export type CatalogLayout = "grid" | "list"

/** Clases de grilla segun el toggle. Se exporta para que las paginas no las repitan. */
export function catalogGridClass(layout: CatalogLayout) {
  return cn(
    "grid gap-6 lg:gap-8",
    layout === "grid"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2",
  )
}

/**
 * Barra de orden + vista del catalogo.
 * Estaba duplicada literal entre /productos y /productos/categoria/[handle].
 * `children` es la zona izquierda (chips de categoria en /productos, contador en categoria).
 */
export function ProductToolbar({
  sort,
  onSortChange,
  layout,
  onLayoutChange,
  open,
  onOpenChange,
  children,
}: {
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  layout: CatalogLayout
  onLayoutChange: (layout: CatalogLayout) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  children?: React.ReactNode
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  // El dropdown antes solo se cerraba al elegir una opcion: quedaba abierto al
  // hacer click fuera o al presionar Escape.
  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onOpenChange(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open, onOpenChange])

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
      {children}

      <div className="flex items-center gap-3">
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => onOpenChange(!open)}
            aria-expanded={open}
            aria-haspopup="listbox"
            className="flex items-center gap-2 h-9 px-4 rounded-full border border-border text-caption text-muted-foreground hover:text-foreground transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
            {sortLabels[sort]}
            <ChevronDown
              className={cn("w-3 h-3 transition-transform", open && "rotate-180")}
              strokeWidth={1.5}
            />
          </button>
          {open && (
            <motion.div
              role="listbox"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-full mt-2 w-44 bg-background border border-border rounded-xl shadow-xl shadow-foreground/5 p-1.5 z-20"
            >
              {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="option"
                  aria-selected={sort === key}
                  onClick={() => {
                    onSortChange(key)
                    onOpenChange(false)
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-caption transition-colors",
                    sort === key
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {sortLabels[key]}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-1 border border-border rounded-full p-0.5">
          <button
            type="button"
            onClick={() => onLayoutChange("grid")}
            aria-pressed={layout === "grid"}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
              layout === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="Vista cuadricula"
          >
            <Grid3X3 className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => onLayoutChange("list")}
            aria-pressed={layout === "list"}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
              layout === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="Vista lista"
          >
            <LayoutList className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
