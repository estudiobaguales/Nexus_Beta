"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { motion, useInView } from "motion/react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import type { Product } from "@/lib/shopify/types"
import { fallbackProducts } from "@/lib/fallback-products"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"

const MAX_SLIDES = 8

/**
 * Bloque 5 de la home: carrusel de productos destacados.
 * Reutiliza ProductCard tal cual (imagen, precio, agregar al carrito y acceso al PDP).
 *
 * Sin autoplay a proposito: es un carrusel de exploracion, no un banner. Solo avanza
 * por accion del usuario, asi que no necesita control de pausa.
 */
export function FeaturedProductsCarousel({ products }: { products: Product[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  // Mismo respaldo que /productos: sin Shopify conectado la home no se queda sin
  // bloque de productos.
  const source = products.length > 0 ? products : fallbackProducts
  const slides = source.slice(0, MAX_SLIDES)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  if (slides.length === 0) return null

  return (
    <Section ref={ref} aria-labelledby="destacados-titulo">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow className="mb-3">Destacados</Eyebrow>
          <h2
            id="destacados-titulo"
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.05]"
          >
            Lo que mas <span className="text-muted-foreground">se juega.</span>
          </h2>
        </motion.div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="md" className="group font-medium">
            <Link href="/productos">
              Ver todo
              <ArrowRight
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={1.5}
              />
            </Link>
          </Button>
          <div className="hidden sm:flex items-center gap-2">
            <CarouselArrow
              direction="prev"
              disabled={!canPrev}
              onClick={() => emblaApi?.scrollPrev()}
            />
            <CarouselArrow
              direction="next"
              disabled={!canNext}
              onClick={() => emblaApi?.scrollNext()}
            />
          </div>
        </div>
      </div>

      <div
        className="overflow-hidden"
        ref={emblaRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Productos destacados"
      >
        <ul className="flex gap-6 lg:gap-8">
          {slides.map((product, i) => (
            <li
              key={product.id}
              className="flex-[0_0_78%] sm:flex-[0_0_46%] lg:flex-[0_0_31%] xl:flex-[0_0_23.5%]"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${slides.length}`}
            >
              {/* index acotado: el stagger no debe crecer sin techo en un carrusel */}
              <ProductCard product={product} index={i % 4} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function CarouselArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next"
  disabled: boolean
  onClick: () => void
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Productos anteriores" : "Siguientes productos"}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground transition-all duration-300",
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:bg-foreground hover:text-background hover:border-foreground",
      )}
    >
      <Icon className="w-4 h-4" strokeWidth={1.5} />
    </button>
  )
}
