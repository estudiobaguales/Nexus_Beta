"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

/**
 * Bloque 8 de la home: cierre emocional hacia tienda o contacto.
 *
 * OJO: el Footer trae su propia franja "Listo para jugar?" en todas las paginas.
 * Para que no queden dos CTA identicos pegados, la home monta este bloque y apaga
 * el del footer con <SiteShell showFooterCta={false}>.
 */
export function ClosingCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Section ref={ref} aria-labelledby="cierre-titulo" className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-2xl flex-col items-center"
      >
        <h2
          id="cierre-titulo"
          className="text-[clamp(2.2rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] text-foreground leading-[1.02] text-balance"
        >
          Listos para <span className="text-accent">jugar?</span>
        </h2>
        <p className="mt-5 text-body-lg text-muted-foreground max-w-md">
          Arma tu set, sumate a un curso o escribinos. La cancha es donde vos quieras.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="group">
            <Link href="/productos">
              Ir a la tienda
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contacto">Hablar con nosotros</Link>
          </Button>
        </div>
      </motion.div>
    </Section>
  )
}
