import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const toneClasses = {
  default: "",
  muted: "bg-secondary/30",
  dark: "bg-foreground text-background",
  accent: "bg-accent text-accent-foreground",
} as const

/** Ritmo vertical. `page` es el de las cabeceras de pagina interior, `marketing` el de las secciones del home. */
const spacingClasses = {
  marketing: "py-20 md:py-32 lg:py-44",
  page: "py-20 lg:py-28",
  content: "py-16 lg:py-20",
  compact: "py-12 lg:py-16",
} as const

export type SectionTone = keyof typeof toneClasses
export type SectionSpacing = keyof typeof spacingClasses

type SectionProps = React.ComponentProps<"section"> & {
  tone?: SectionTone
  spacing?: SectionSpacing
  /** false para maquetar el interior a mano (heros full-bleed, carruseles). */
  contained?: boolean
  containerClassName?: string
}

export function Section({
  tone = "default",
  spacing = "marketing",
  contained = true,
  containerClassName,
  className,
  children,
  // Explicito para dejar claro que la seccion es un objetivo valido de useInView
  // (React 19 permite `ref` como prop normal en componentes de funcion).
  ref,
  ...props
}: SectionProps) {
  return (
    <section
      ref={ref}
      className={cn("relative", spacingClasses[spacing], toneClasses[tone], className)}
      {...props}
    >
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  )
}
