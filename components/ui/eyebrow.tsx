import { cn } from "@/lib/utils"

/**
 * Kicker sobre los titulos de seccion.
 * Reemplaza el string `text-eyebrow tracking-[0.3em] uppercase text-accent` repetido 16 veces.
 * Es un <p>, no un heading: no debe entrar en el outline del documento.
 */
export function Eyebrow({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-eyebrow tracking-[0.3em] uppercase text-accent font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}
