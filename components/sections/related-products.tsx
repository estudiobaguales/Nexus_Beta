"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/lib/shopify/types"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

/**
 * Productos relacionados debajo de la ficha. Reutiliza ProductCard tal cual, con
 * la misma variante `default` de las grillas de catalogo.
 *
 * La seleccion se resuelve en el server component (app/productos/[handle]/page.tsx):
 * aca solo se pinta lo que llega. Sin productos, no se renderiza.
 */
export function RelatedProducts({ products }: { products: Product[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  if (products.length === 0) return null

  return (
    <Section ref={ref} tone="muted" spacing="content" aria-labelledby="relacionados-titulo">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <Eyebrow className="mb-3">También te puede servir</Eyebrow>
          <h2
            id="relacionados-titulo"
            className="text-subsection font-semibold tracking-[-0.03em] text-foreground text-balance"
          >
            Completa tu equipo.
          </h2>
        </div>

        <Button asChild variant="outline" size="md" className="group shrink-0 font-medium">
          <Link href="/productos">
            Ver todo el catálogo
            <ArrowRight
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={1.5}
            />
          </Link>
        </Button>
      </motion.div>

      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </Section>
  )
}
