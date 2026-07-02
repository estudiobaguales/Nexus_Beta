"use client"

import { CartProvider } from "@/components/cart/cart-context"
import { LoadingScreen } from "@/components/loading-screen"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { ProductsSection } from "@/components/sections/products-section"
import { CoursesSection } from "@/components/sections/courses-section"
import { EventsSection } from "@/components/sections/events-section"
import { AboutSection } from "@/components/sections/about-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/shopify/types"

export function HomeClient({ products }: { products: Product[] }) {
  return (
    <CartProvider>
      <LoadingScreen />
      <Navbar overHero />
      <main>
        <Hero />
        <Features />
        <ProductsSection products={products} />
        <CoursesSection />
        <EventsSection />
        <AboutSection />
        <NewsletterSection />
      </main>
      <Footer />
    </CartProvider>
  )
}
