"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import type { ShopifyCollection } from "@/lib/shopify/types"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Button } from "@/components/ui/button"

/**
 * Bloque 2 de la home: acceso directo a la tienda por categoria.
 *
 * Enlaza a /productos/categoria/[handle], que son rutas reales e indexables, en vez
 * de a los chips de /productos, que hoy son estado de React y no tienen URL.
 * Si Shopify no devuelve colecciones, la seccion degrada a solo cabecera + CTA.
 */
export function ShopSection({ collections }: { collections: ShopifyCollection[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const visible = collections.slice(0, 6)

  return (
    <Section id="tienda" ref={ref} tone="muted" aria-labelledby="tienda-titulo">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow className="mb-3">Tienda</Eyebrow>
          <h2
            id="tienda-titulo"
            className="text-section font-semibold tracking-[-0.035em] text-foreground"
          >
            Equipamiento <span className="text-muted-foreground">de élite.</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button asChild variant="outline" size="md" className="group font-medium">
            <Link href="/productos">
              Ver catálogo completo
              <ArrowRight
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={1.5}
              />
            </Link>
          </Button>
        </motion.div>
      </div>

      {visible.length > 0 && (
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {visible.map((collection, i) => (
            <motion.li
              key={collection.handle}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/productos/categoria/${collection.handle}`}
                className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl bg-foreground"
              >
                {collection.image && (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent"
                />
                <div className="relative z-10 flex w-full items-center justify-between gap-3 p-5">
                  <span className="text-body font-semibold text-background tracking-[-0.01em]">
                    {collection.title}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/15 text-background transition-colors group-hover:bg-background group-hover:text-foreground">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </Section>
  )
}
