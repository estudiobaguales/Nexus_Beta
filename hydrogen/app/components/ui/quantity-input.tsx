"use client"

import { useId, useState } from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Selector de cantidad del PDP.
 *
 * Permite escribir el numero a mano, ademas de los botones -/+. Mientras el campo
 * esta enfocado se guarda el texto crudo (`draft`) para que se pueda borrar y
 * reescribir sin que el valor salte a 1 en cada tecla; al salir del campo se
 * normaliza contra [1, max].
 *
 * `max` es el stock real cuando Shopify lo entrega. Si viene null/undefined no
 * hay tope: es preferible a inventar uno, porque Shopify rechaza el exceso en el
 * checkout de todos modos.
 */
export function QuantityInput({
  value,
  onChange,
  max,
  disabled = false,
  className,
}: {
  value: number
  onChange: (quantity: number) => void
  max?: number | null
  disabled?: boolean
  className?: string
}) {
  const id = useId()
  const [draft, setDraft] = useState<string | null>(null)

  // Sin narrowing por alias: se calcula el tope una sola vez y el resto usa ese numero.
  const upperBound =
    typeof max === "number" && max > 0 ? max : Number.POSITIVE_INFINITY
  const hasMax = Number.isFinite(upperBound)

  const clamp = (n: number) => Math.min(Math.max(Math.floor(n), 1), upperBound)

  const canDecrease = !disabled && value > 1
  const canIncrease = !disabled && value < upperBound

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-eyebrow tracking-[0.1em] uppercase text-muted-foreground">
        Cantidad
      </label>

      <div
        className={cn(
          "flex h-12 w-fit items-center rounded-xl border border-border bg-background transition-colors focus-within:border-accent",
          disabled && "opacity-50",
        )}
      >
        <StepButton
          label="Quitar uno"
          disabled={!canDecrease}
          onClick={() => onChange(clamp(value - 1))}
        >
          <Minus className="h-3.5 w-3.5" strokeWidth={2} />
        </StepButton>

        <input
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          disabled={disabled}
          value={draft ?? String(value)}
          aria-label="Cantidad"
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, "")
            setDraft(raw)
            if (raw !== "") onChange(clamp(Number(raw)))
          }}
          onFocus={() => setDraft(String(value))}
          onBlur={() => {
            // Campo vacio o basura al salir: vuelve al ultimo valor valido.
            if (draft !== null && draft !== "") onChange(clamp(Number(draft)))
            setDraft(null)
          }}
          className="h-full w-12 border-0 bg-transparent text-center text-body-sm font-semibold text-foreground tabular-nums focus:outline-none"
        />

        <StepButton
          label="Agregar uno"
          disabled={!canIncrease}
          onClick={() => onChange(clamp(value + 1))}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
        </StepButton>
      </div>

      {/* Solo se avisa el tope cuando el usuario ya lo alcanzo: antes seria ruido. */}
      {hasMax && value >= upperBound && (
        <p role="status" className="text-caption text-muted-foreground">
          {upperBound === 1 ? "Queda 1 unidad" : `Quedan ${upperBound} unidades`}
        </p>
      )}
    </div>
  )
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-full w-10 shrink-0 items-center justify-center text-foreground transition-colors hover:text-accent disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      {children}
    </button>
  )
}
