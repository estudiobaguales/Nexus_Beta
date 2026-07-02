"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingBag, ArrowUpRight } from "lucide-react"
import type { Product } from "@/lib/shopify/types"
import { useCart } from "@/components/cart/cart-context"

const fallbackProducts = [
  {
    id: "0", title: "Set de Linderball Nexus", description: "Pelota de espuma en forma de anillo con mas de 16 mecanicas de lanzamiento. Incluye 2 anillos y guia.", handle: "set-de-linderball-nexus", availableForSale: true, productType: "Linderball", options: [],
    images: { edges: [{ node: { url: "/images/prod-linderball.png", altText: "Set de Linderball Nexus" } }] },
    priceRange: { minVariantPrice: { amount: "49.99", currencyCode: "USD" } },
    variants: [{ id: "v0", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "49.99", currencyCode: "USD" } }],
  },
  {
    id: "1", title: "Set de Pickleball Nexus Pro", description: "2 paletas de grafito, 4 pelotas y bolsa. El deporte de raqueta de mayor crecimiento del mundo.", handle: "set-de-pickleball-nexus-pro", availableForSale: true, productType: "Pickleball", options: [],
    images: { edges: [{ node: { url: "/images/prod-pickleball.png", altText: "Set de Pickleball Nexus Pro" } }] },
    priceRange: { minVariantPrice: { amount: "129.99", currencyCode: "USD" } },
    variants: [{ id: "v1", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "129.99", currencyCode: "USD" } }],
  },
  {
    id: "2", title: "Set de Roundnet Nexus Pro", description: "Red circular de tension ajustable, marco plegable y 3 pelotas. Para torneos y juego 2 vs 2.", handle: "set-de-roundnet-nexus-pro", availableForSale: true, productType: "Spikeball", options: [],
    images: { edges: [{ node: { url: "/images/prod-roundnet.png", altText: "Set de Roundnet Nexus Pro" } }] },
    priceRange: { minVariantPrice: { amount: "69.99", currencyCode: "USD" } },
    variants: [{ id: "v2", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "69.99", currencyCode: "USD" } }],
  },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCart()
  const image = product.images.edges[0]?.node
  const price = parseFloat(product.priceRange.minVariantPrice.amount)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary mb-5">
        {image && (
          <Image src={image.url} alt={image.altText || product.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        )}
        <motion.div initial={false} animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent" />
        <motion.div initial={false} animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }} transition={{ duration: 0.25 }} className="absolute inset-x-0 bottom-0 p-5 flex gap-2.5">
          <button
            onClick={(e) => { e.stopPropagation(); if (product.variants.length > 0) addItem(product.variants[0], product) }}
            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-background text-foreground text-[12px] font-semibold hover:bg-background/90 active:scale-[0.97] transition-all duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
            Agregar al carrito
          </button>
          <Link href={`/productos/${product.handle}`} className="flex items-center justify-center w-11 h-11 rounded-xl bg-background/20 backdrop-blur-sm border border-background/25 text-background hover:bg-background/30 transition-colors">
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
        <div className="absolute top-4 left-4">
          <span className="text-[10px] tracking-[0.1em] uppercase bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full font-medium">
            {product.productType || "Producto"}
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-[15px] font-semibold text-foreground tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">{product.title}</h3>
          <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2">{product.description}</p>
        </div>
        <span className="text-[15px] font-semibold text-foreground whitespace-nowrap tabular-nums">${price.toLocaleString("es-CL")}</span>
      </div>
    </motion.div>
  )
}

export function ProductsSection({ products }: { products?: Product[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const displayProducts = products && products.length > 0 ? products : fallbackProducts as unknown as Product[]

  return (
    <section id="productos" ref={ref} className="relative py-20 md:py-28 lg:py-40 bg-secondary/30">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Tienda</p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.05]">
              Equipamiento <span className="text-muted-foreground">de elite.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/productos" className="group inline-flex items-center gap-2 h-11 px-6 rounded-full border border-border text-foreground text-[13px] font-medium hover:bg-foreground hover:text-background transition-all duration-300">
              Ver catalogo completo
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayProducts.slice(0, 3).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-7 rounded-2xl bg-foreground text-background"
        >
          <div>
            <h3 className="text-lg font-semibold tracking-[-0.02em]">Envio gratis en pedidos sobre $50.000</h3>
            <p className="text-[13px] text-background/45 mt-1">Despacho a todo Chile en 3-5 dias habiles.</p>
          </div>
          <Link href="/productos" className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-background text-foreground text-[13px] font-semibold hover:bg-background/90 active:scale-[0.97] transition-all duration-200 shrink-0">
            Comprar ahora
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
