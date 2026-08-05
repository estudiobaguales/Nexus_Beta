"use client"

import { cn } from "@/lib/utils"

/**
 * Pill de filtro seleccionable. Mismo patron en las categorias de /productos y de /blog.
 * Usa aria-pressed para que el estado activo no dependa solo del color.
 */
export function FilterPill({
  active,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { active: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "shrink-0 h-9 px-4 rounded-full text-caption font-medium transition-all duration-300",
        active
          ? "bg-foreground text-background"
          : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
