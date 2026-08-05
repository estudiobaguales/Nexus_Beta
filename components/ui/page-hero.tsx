"use client"

import { motion } from "motion/react"
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"

/**
 * Cabecera de pagina interior.
 * Estaba reimplementada como componente privado en 6 archivos distintos
 * (nexuniversity, corporativo, contacto, productos, categoria, blog).
 *
 * `crumbs` debe ser el mismo array que alimenta el BreadcrumbList JSON-LD del
 * server component, para que el breadcrumb visual y el structured data no se
 * separen.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
}: {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  lede?: string
}) {
  return (
    <Section tone="muted" spacing="page">
      <Breadcrumbs items={crumbs} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
        <h1 className="text-page font-semibold tracking-[-0.04em] text-foreground">
          {title}
        </h1>
        {lede && (
          <p className="mt-3 text-body text-muted-foreground max-w-lg">{lede}</p>
        )}
      </motion.div>
    </Section>
  )
}
