"use client"

import { LoadingScreen } from "@/components/loading-screen"
import { SiteShell } from "@/components/site-shell"
import { Hero } from "@/components/sections/hero"
import { ShopSection } from "@/components/sections/shop-section"
import { FreeShippingCta } from "@/components/sections/free-shipping-cta"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturedProductsCarousel } from "@/components/sections/featured-products-carousel"
import { CorporateCta } from "@/components/sections/corporate-cta"
import { FeaturedPosts } from "@/components/sections/featured-posts"
import { ClosingCta } from "@/components/sections/closing-cta"
import type { Product, ShopifyCollection } from "@/lib/shopify/types"

/**
 * Home como landing. El orden de los bloques es la secuencia definida en el brief
 * y no deberia reordenarse sin revisarla:
 *
 *   1. Hero (carrusel)            5. Carrusel de productos destacados
 *   2. Tienda (categorias)        6. CTA corporativo
 *   3. CTA envio gratis           7. Blogs destacados
 *   4. Nuestra historia           8. CTA de cierre
 *
 * showFooterCta={false}: el bloque 8 ya es el "Listos para jugar?" de esta pagina,
 * y el footer trae el suyo en todas las demas.
 */
export function HomeClient({
  products,
  collections,
}: {
  products: Product[]
  collections: ShopifyCollection[]
}) {
  return (
    <>
      <LoadingScreen />
      <SiteShell overHero showFooterCta={false}>
        <Hero />
        <ShopSection collections={collections} />
        <FreeShippingCta />
        <AboutSection />
        <FeaturedProductsCarousel products={products} />
        <CorporateCta />
        <FeaturedPosts />
        <ClosingCta />
      </SiteShell>
    </>
  )
}
