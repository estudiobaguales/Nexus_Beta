"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ArrowRight, ArrowUpRight } from "lucide-react"
import type { Product } from "@/lib/shopify/types"
import { useCart } from "@/components/cart/cart-context"
import { getFirstAvailableVariant } from "@/lib/shopify/utils"
import { cn } from "@/lib/utils"

/**
 * `default` es la card de las grillas de catalogo (/productos, /categoria).
 * `featured` es la variante mas grande que usaba la seccion de la home, que tenia
 * una copia privada de este componente en sections/products-section.tsx.
 * Las dos difieren solo en escala y en el label del boton.
 */
export type ProductCardSize = "default" | "featured"

export function ProductCard({
  product,
  index,
  size = "default",
}: {
  product: Product
  index: number
  size?: ProductCardSize
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCart()
  const image = product.images.edges[0]?.node
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const availableVariant = getFirstAvailableVariant(product)

  const featured = size === "featured"
  const DetailIcon = featured ? ArrowUpRight : ArrowRight

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: featured ? 50 : 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: featured ? 0.7 : 0.6,
        delay: index * (featured ? 0.1 : 0.06),
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("group", featured && "cursor-pointer")}
    >
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary",
          featured ? "mb-5" : "mb-4",
        )}
      >
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "absolute inset-0 bg-gradient-to-t to-transparent",
            featured ? "from-foreground/55" : "from-foreground/60",
          )}
        />
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "absolute inset-x-0 bottom-0 flex",
            featured ? "p-5 gap-2.5" : "p-4 gap-2",
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (availableVariant) addItem(availableVariant, product)
            }}
            disabled={!availableVariant}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-xl bg-background text-foreground text-caption font-semibold hover:bg-background/90 active:scale-[0.97] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
              featured ? "h-11" : "h-10",
            )}
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
            {availableVariant ? (featured ? "Agregar al carrito" : "Agregar") : "Agotado"}
          </button>
          <Link
            href={`/productos/${product.handle}`}
            aria-label={`Ver detalle de ${product.title}`}
            className={cn(
              "flex items-center justify-center rounded-xl bg-background/20 backdrop-blur-sm border text-background hover:bg-background/30 transition-colors",
              featured ? "w-11 h-11 border-background/25" : "w-10 h-10 border-background/30",
            )}
          >
            <DetailIcon className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
        <div className={cn("absolute", featured ? "top-4 left-4" : "top-3 left-3")}>
          <span
            className={cn(
              "text-micro tracking-[0.1em] uppercase bg-background/90 backdrop-blur-sm text-foreground rounded-full font-medium",
              featured ? "px-3 py-1.5" : "px-2.5 py-1",
            )}
          >
            {product.productType || "Producto"}
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className={cn("flex flex-col", featured && "gap-1")}>
          <h3
            className={cn(
              "font-semibold text-foreground tracking-[-0.01em] group-hover:text-accent transition-colors duration-300",
              featured ? "text-body" : "text-body-sm",
            )}
          >
            {product.title}
          </h3>
          <p
            className={cn(
              "text-caption text-muted-foreground",
              featured ? "line-clamp-2" : "line-clamp-1 mt-0.5",
            )}
          >
            {product.description}
          </p>
        </div>
        <span
          className={cn(
            "font-semibold text-foreground whitespace-nowrap tabular-nums",
            featured ? "text-body" : "text-body-sm",
          )}
        >
          ${price.toLocaleString("es-CL")}
        </span>
      </div>
    </motion.div>
  )
}
