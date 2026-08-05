"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs"
import { Container } from "@/components/ui/container"
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
 *
 * Dos variantes:
 *
 *   - sin `image`: la cabecera plana de siempre sobre fondo muted. Es la que usan
 *     /productos, /blog, /contacto y /productos/categoria, y no cambia.
 *   - con `image`: hero a sangre con la foto de fondo, para las paginas que tienen
 *     que entrar con presencia (Nexuniversity, Corporativo). La imagen va con
 *     `priority` y `fill` dentro de un contenedor de alto fijo, asi que reserva su
 *     espacio y no mueve el layout al cargar.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  image,
  actions,
}: {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  lede?: string
  /** Activa la variante con foto de fondo. `alt` describe la escena, no la pagina. */
  image?: { src: string; alt: string }
  /** CTAs del hero. Solo se pintan en la variante con foto. */
  actions?: ReactNode
}) {
  if (!image) {
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

  return (
    <section className="relative flex min-h-[68svh] items-end overflow-hidden bg-foreground pt-28 pb-14 lg:min-h-[72svh] lg:pb-20">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      {/* Doble capa a proposito: el velo plano fija un piso de contraste parejo y el
          degradado carga la base, donde vive el texto. Sobre el negro de marca el
          blanco queda holgadamente sobre AA incluso en la zona mas clara de la foto. */}
      <div aria-hidden className="absolute inset-0 bg-foreground/55" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/25"
      />

      <Container className="relative z-10">
        <Breadcrumbs items={crumbs} tone="light" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          <h1 className="text-page font-semibold tracking-[-0.04em] text-background text-balance max-w-3xl">
            {title}
          </h1>
          {lede && (
            <p className="mt-4 text-body-lg text-background/75 max-w-xl">{lede}</p>
          )}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </motion.div>
      </Container>
    </section>
  )
}
