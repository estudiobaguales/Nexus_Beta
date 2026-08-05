"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { Building2, Trophy, GraduationCap, ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Button } from "@/components/ui/button"

const offers = [
  {
    icon: Building2,
    title: "Ventas corporativas",
    text: "Equipamiento al por mayor para clubes, municipios y empresas, con precios por volumen.",
  },
  {
    icon: Trophy,
    title: "Torneos de empresa",
    text: "Organizamos la jornada completa: formato, arbitraje, equipamiento y producción.",
  },
  {
    icon: GraduationCap,
    title: "Capacitaciones",
    text: "Talleres y clínicas para escuelas y colegios, dictadas por instructores certificados.",
  },
]

/** Bloque 6 de la home: puerta de entrada al canal B2B. */
export function CorporateCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Section ref={ref} tone="dark" spacing="content" aria-labelledby="corporativo-titulo">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <Eyebrow className="mb-3">Corporativo</Eyebrow>
          <h2
            id="corporativo-titulo"
            className="text-section font-semibold tracking-[-0.035em] text-background text-balance"
          >
            También jugamos <span className="text-background/45">en tu institución.</span>
          </h2>
          <p className="mt-5 text-body text-background/55 max-w-md">
            Trabajamos con empresas, municipios, escuelas y colegios: desde una compra por volumen
            hasta un torneo llave en mano.
          </p>
          <Button asChild variant="accent" className="group mt-8">
            <Link href="/corporativo">
              Ver propuesta corporativa
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
                strokeWidth={1.5}
              />
            </Link>
          </Button>
        </motion.div>

        <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {offers.map((offer, i) => (
            <motion.li
              key={offer.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl border border-background/10 bg-background/[0.03]"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent/15 text-accent mb-5">
                <offer.icon className="w-5 h-5" strokeWidth={1.5} />
              </span>
              <h3 className="text-body font-semibold text-background">{offer.title}</h3>
              <p className="mt-2 text-ui text-background/50">{offer.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
