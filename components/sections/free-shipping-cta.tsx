"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { Truck, ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { FREE_SHIPPING_THRESHOLD, SHIPPING_ETA, formatCLP } from "@/lib/site-config"

/**
 * Banda de envio gratis, a sangre completa.
 *
 * El umbral NO se escribe aca: viene de FREE_SHIPPING_THRESHOLD en lib/site-config.ts,
 * que es la unica fuente. Antes este mensaje vivia como una tarjeta dentro de la
 * seccion de productos y repetia el monto a mano.
 *
 * El tono es de beneficio, no de letra chica: una sola idea, el monto grande, y el
 * plazo de despacho como apoyo.
 */
export function FreeShippingCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      aria-labelledby="envio-gratis-titulo"
      className="relative bg-accent text-accent-foreground overflow-hidden"
    >
      {/* Halo suave para que la banda no se lea como un bloque plano */}
      <div
        aria-hidden
        className="absolute -top-1/2 left-1/4 w-[60%] aspect-square rounded-full bg-background/10 blur-3xl"
      />

      <Container className="relative py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
        >
          <div className="flex items-start gap-5">
            <span className="hidden sm:flex items-center justify-center w-12 h-12 shrink-0 rounded-2xl bg-accent-foreground/10">
              <Truck className="w-5 h-5" strokeWidth={1.5} />
            </span>
            <div>
              <h2
                id="envio-gratis-titulo"
                className="text-section font-semibold tracking-[-0.035em] text-balance"
              >
                Envío gratis sobre {formatCLP(FREE_SHIPPING_THRESHOLD)}
              </h2>
              <p className="mt-2 text-body text-accent-foreground/70 max-w-md">
                A todo Chile, en {SHIPPING_ETA}. Sin códigos ni condiciones raras.
              </p>
            </div>
          </div>

          <Button
            asChild
            className="group shrink-0 bg-accent-foreground text-accent hover:bg-accent-foreground/90"
          >
            <Link href="/productos">
              Ver la tienda
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
                strokeWidth={1.5}
              />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
