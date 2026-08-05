import { cn } from "@/lib/utils"

/**
 * Campos de formulario. Reemplazan el string
 * `h-12 px-4 rounded-xl border border-border bg-background ... focus:border-accent`
 * repetido 7 veces entre /contacto y /corporativo.
 */
const fieldClass =
  "w-full px-4 rounded-xl border border-border bg-background text-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldClass, "h-12", className)} {...props} />
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldClass, "py-3 resize-none", className)} {...props} />
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select className={cn(fieldClass, "h-12", className)} {...props}>
      {children}
    </select>
  )
}
