import { cn } from "@/lib/utils"

/**
 * Ancho de contenido unico del sitio.
 *
 * Antes convivian dos anchos: max-w-[1280px] px-6 lg:px-10 (17 usos, incluido el
 * Navbar) y max-w-[1200px] px-6 (10 usos, secciones del home + footer). Se unifica
 * en 1280 para que el contenido quede alineado con el Navbar, que es el ancla visual.
 */
export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto max-w-[1280px] px-6 lg:px-10", className)} {...props}>
      {children}
    </div>
  )
}
