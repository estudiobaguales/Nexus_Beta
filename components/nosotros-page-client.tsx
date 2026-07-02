"use client"

import { motion } from "motion/react"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/sections/about-section"

function PageHero() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Nuestra historia</p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
            Somos Nexus.
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground max-w-lg leading-relaxed">
            El ecosistema de los deportes alternativos en Chile. Conexion, comunidad y evolucion desde 2019.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export function NosotrosPageClient() {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen pt-16">
        <PageHero />
        <AboutSection />
      </main>
      <Footer />
    </CartProvider>
  )
}
