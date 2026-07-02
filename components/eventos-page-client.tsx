"use client"

import { motion } from "motion/react"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { EventsSection } from "@/components/sections/events-section"

function PageHero() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Eventos", href: "/eventos" }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Calendario 2026</p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
            Eventos y torneos.
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground max-w-lg leading-relaxed">
            Torneos, ligas y encuentros en todo Chile. Compite al mas alto nivel o ven a vivir la experiencia
            junto a la comunidad.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export function EventosPageClient() {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen pt-16">
        <PageHero />
        <EventsSection />
      </main>
      <Footer />
    </CartProvider>
  )
}
