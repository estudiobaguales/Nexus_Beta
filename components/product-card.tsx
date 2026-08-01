"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ArrowRight } from "lucide-react"
import type { Product } from "@/lib/shopify/types"
import { useCart } from "@/components/cart/cart-context"
import { getFirstAvailableVariant } from "@/lib/shopify/utils"

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCart()
  const image = product.images.edges[0]?.node
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const availableVariant = getFirstAvailableVariant(product)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary mb-4">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent"
        />
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-x-0 bottom-0 p-4 flex gap-2"
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (availableVariant) addItem(availableVariant, product)
            }}
            disabled={!availableVariant}
            className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-background text-foreground text-[12px] font-semibold hover:bg-background/90 active:scale-[0.97] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
            {availableVariant ? "Agregar" : "Agotado"}
          </button>
          <Link
            href={`/productos/${product.handle}`}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/20 backdrop-blur-sm border border-background/30 text-background hover:bg-background/30 transition-colors"
          >
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-[0.1em] uppercase bg-background/90 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-full font-medium">
            {product.productType || "Producto"}
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-semibold text-foreground tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-1 mt-0.5">{product.description}</p>
        </div>
        <span className="text-[14px] font-semibold text-foreground whitespace-nowrap tabular-nums">
          ${price.toLocaleString("es-CL")}
        </span>
      </div>
    </motion.div>
  )
}
