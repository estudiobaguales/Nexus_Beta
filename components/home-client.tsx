"use client"

import { CartProvider } from "@/components/cart/cart-context"
import { LoadingScreen } from "@/components/loading-screen"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { ProductsSection } from "@/components/sections/products-section"
import { AboutSection } from "@/components/sections/about-section"
import { NexuniversityHook } from "@/components/sections/nexuniversity-hook"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/shopify/types"

export function HomeClient({ products }: { products: Product[] }) {
  return (
    <CartProvider>
      <LoadingScreen />
      <Navbar overHero />
      <main>
        <Hero />
        <ProductsSection products={products} />
        <AboutSection />
        <NexuniversityHook />
      </main>
      <Footer />
    </CartProvider>
  )
}
