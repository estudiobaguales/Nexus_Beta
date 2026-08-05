"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/shopify/types"
import { useCart } from "@/components/cart/cart-context"
import { SiteShell } from "@/components/site-shell"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getFirstAvailableVariant } from "@/lib/shopify/utils"

export function ProductDetailPageClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0)
  const { addItem } = useCart()
  const images = product.images.edges.map((edge) => edge.node)
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const currentImage = images[activeImage]
  const availableVariant = getFirstAvailableVariant(product)

  return (
    <SiteShell>
      <Section spacing="compact">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Tienda", href: "/productos" },
            { label: product.title, href: `/productos/${product.handle}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary mb-4">
              {currentImage && (
                <Image
                  src={currentImage.url}
                  alt={currentImage.altText || product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((image, i) => (
                  <button
                    key={image.url + i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Ver imagen ${i + 1} de ${product.title}`}
                    aria-pressed={activeImage === i}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden bg-secondary border-2 transition-colors ${
                      activeImage === i ? "border-accent" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || product.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            {product.productType && (
              <span className="text-eyebrow tracking-[0.1em] uppercase text-accent font-medium mb-3">
                {product.productType}
              </span>
            )}
            <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground leading-[1.1]">
              {product.title}
            </h1>
            <p className="mt-4 text-[20px] font-semibold text-foreground tabular-nums">
              ${price.toLocaleString("es-CL")}
            </p>
            <p className="mt-6 text-body text-muted-foreground max-w-md">
              {product.description}
            </p>

            <Button
              onClick={() => {
                if (availableVariant) addItem(availableVariant, product)
              }}
              disabled={!availableVariant}
              className="mt-8 w-full sm:w-auto"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2} />
              {availableVariant ? "Agregar al carrito" : "Agotado"}
            </Button>
          </div>
        </div>
      </Section>
    </SiteShell>
  )
}
