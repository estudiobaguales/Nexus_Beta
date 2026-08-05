import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Boton pill del sistema NEXUS.
 * Reemplaza tres strings copiados por la app: el pill primario (8 usos), el pill
 * accent (`highlightPillClass` en navbar.tsx) y el pill outline.
 *
 * Para links usar `asChild` y envolver un <Link>:
 *   <Button asChild><Link href="/productos">Ver tienda</Link></Button>
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background hover:scale-[1.02] active:scale-[0.97]",
        accent:
          "bg-accent text-accent-foreground hover:brightness-105 hover:scale-[1.03] active:scale-[0.98]",
        outline:
          "border border-border text-foreground hover:bg-foreground hover:text-background",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]",
      },
      size: {
        xs: "h-8 px-4 text-caption",
        sm: "h-9 px-4 text-caption",
        md: "h-11 px-6 text-ui",
        lg: "h-12 px-8 text-ui",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}

export { buttonVariants }
