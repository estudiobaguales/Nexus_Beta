"use client"

import { useState, useSyncExternalStore } from "react"
import {
  BadgeCheck,
  Check,
  ChevronDown,
  Package,
  Ruler,
  Sparkles,
  Trophy,
  Truck,
  type LucideIcon,
} from "lucide-react"
import type { ProductInfo as ProductInfoData, ProductInfoItem } from "@/lib/shopify/types"
import { hasProductInfoSections, splitLabel } from "@/lib/shopify/product-info"
import { Section } from "@/components/ui/section"

type Panel = {
  id: string
  title: string
  icon: LucideIcon
  content: React.ReactNode
}

const subscribe = () => () => {}

/** Tarjetas icono + titulo + texto (caracteristicas, atributos, requisitos). */
function ItemCards({ items }: { items: ProductInfoItem[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={`${item.title}-${item.text}`}
          className="flex gap-3 rounded-xl bg-secondary p-4"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            {item.title && (
              <p className="text-body font-semibold text-foreground">{item.title}</p>
            )}
            <p className="text-body-sm text-muted-foreground text-justify hyphens-auto">
              {item.text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function PackageGrid({ items }: { items: ProductInfoData["packageContents"] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={`${item.quantity}-${item.label}`}
          className="flex min-h-14 items-center gap-3 rounded-xl bg-secondary px-4 py-3"
        >
          <span className="flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg bg-background px-2 text-body-lg font-semibold tabular-nums text-foreground">
            {item.quantity ?? (
              <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
            )}
          </span>
          <span className="text-body font-medium text-foreground">{item.label}</span>
        </li>
      ))}
    </ul>
  )
}

function HowToPlaySteps({ groups }: { groups: ProductInfoData["howToPlay"] }) {
  return (
    <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {groups.map((group, i) => (
        <li key={group.title ?? i} className="rounded-xl bg-secondary p-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-ui font-semibold tabular-nums text-accent-foreground"
            >
              {i + 1}
            </span>
            {group.title && (
              <h4 className="text-body font-semibold text-foreground">{group.title}</h4>
            )}
          </div>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-body-sm text-muted-foreground marker:text-foreground">
            {group.items.map((line) => {
              const { title, text } = splitLabel(line)
              return (
                <li key={line}>
                  {title && <strong className="font-semibold text-foreground">{title}: </strong>}
                  {text}
                </li>
              )
            })}
          </ul>
        </li>
      ))}
    </ol>
  )
}

/**
 * Ficha del producto en acordeones, entre la zona de compra y el blog.
 *
 * <details>/<summary> nativo a proposito (y no el Accordion de Radix): abre y
 * cierra sin JavaScript, y el contenido cerrado sigue en el HTML inicial, que es
 * lo que indexa Google. React solo aporta el "expandir / contraer todo".
 * Un bloque sin datos no se renderiza; sin ningun bloque, la seccion tampoco.
 */
export function ProductInfo({ info }: { info: ProductInfoData | null | undefined }) {
  const panels: Panel[] = []

  if (info?.features.length) {
    panels.push({
      id: "caracteristicas",
      title: "Características clave",
      icon: Sparkles,
      content: <ItemCards items={info.features} />,
    })
  }
  if (info?.highlights.length) {
    panels.push({
      id: "atributos",
      title: "Atributos destacados",
      icon: BadgeCheck,
      content: <ItemCards items={info.highlights} />,
    })
  }
  if (info?.packageContents.length) {
    panels.push({
      id: "contenido",
      title: "Contenido del paquete",
      icon: Package,
      content: <PackageGrid items={info.packageContents} />,
    })
  }
  if (info?.howToPlay.length) {
    panels.push({
      id: "como-jugar",
      title: "Cómo jugar / Modalidades",
      icon: Trophy,
      content: <HowToPlaySteps groups={info.howToPlay} />,
    })
  }
  if (info?.techSpecs.length) {
    panels.push({
      id: "requisitos",
      title: "Requisitos técnicos",
      icon: Ruler,
      content: <ItemCards items={info.techSpecs} />,
    })
  }

  const [openIds, setOpenIds] = useState<string[]>(() => panels.slice(0, 1).map((p) => p.id))
  // El boton "expandir todo" depende de JS: se mantiene invisible (pero ocupando su
  // lugar, para no mover el layout) hasta que la pagina hidrata.
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false)

  if (!hasProductInfoSections(info)) return null

  const allOpen = openIds.length === panels.length

  const setOpen = (id: string, open: boolean) =>
    setOpenIds((current) => {
      if (open === current.includes(id)) return current
      return open ? [...current, id] : current.filter((openId) => openId !== id)
    })

  return (
    <Section spacing="content" tone="muted" aria-labelledby="info-producto-titulo" lang="es">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <h2
          id="info-producto-titulo"
          className="text-subsection font-semibold tracking-[-0.03em] text-foreground text-balance"
        >
          Información del producto
        </h2>
        {panels.length > 1 && (
          <button
            type="button"
            onClick={() => setOpenIds(allOpen ? [] : panels.map((p) => p.id))}
            className={`min-h-11 rounded-sm text-ui font-medium text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              hydrated ? "" : "invisible"
            }`}
          >
            {allOpen ? "Contraer todo" : "Expandir todo"}
          </button>
        )}
      </div>

      <p className="mt-4 flex items-center gap-2 text-body-sm font-medium text-foreground">
        <Truck aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.75} />
        Despacho disponible a todo Chile
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        {panels.map((panel) => {
          const isOpen = openIds.includes(panel.id)
          const Icon = panel.icon
          return (
            <details
              key={panel.id}
              open={isOpen}
              onToggle={(event) => setOpen(panel.id, event.currentTarget.open)}
              className="details-animated group border-b border-border last:border-b-0"
            >
              {/* Sin aria-expanded/aria-controls: <summary> ya expone el estado
                  abierto/cerrado al lector de pantalla, y la spec de HTML no admite
                  esos atributos aqui (el validador los marca como error). */}
              <summary
                className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-6 [&::-webkit-details-marker]:hidden"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                  <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <h3 className="flex-1 text-body-lg font-semibold text-foreground">
                  {panel.title}
                </h3>
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
                  strokeWidth={1.5}
                />
              </summary>
              <div className="px-4 pb-5 pt-1 sm:px-6 sm:pb-6">
                {panel.content}
              </div>
            </details>
          )
        })}
      </div>
    </Section>
  )
}
