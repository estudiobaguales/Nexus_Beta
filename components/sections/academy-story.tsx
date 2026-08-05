"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "motion/react"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"

/**
 * Historia y trayectoria del equipo, version extendida para Nexuniversity.
 *
 * No reusa AboutSection: ese bloque es el resumen de la home, con su parallax, su
 * contador animado y su CTA hacia esta misma pagina. Aca el texto es otro a
 * proposito (lo pide el brief) y el formato es una linea de tiempo, que es lo que
 * sostiene el argumento de trayectoria.
 *
 * PLACEHOLDER: los hitos de `milestones` son la version narrativa de lo que ya
 * decia la home, no fechas confirmadas por el equipo. Revisar antes de publicar.
 */
const milestones = [
  {
    period: "Antes de Nexus",
    title: "Años produciendo eventos",
    text: "El equipo se formó organizando torneos, activaciones de marca y jornadas deportivas para empresas, municipios y colegios en todo Chile.",
  },
  {
    period: "El origen",
    title: "De la producción a la cancha",
    text: "De tanto montar canchas para otros apareció la pregunta obvia: por qué no enseñar a jugar, además de producir el evento.",
  },
  {
    period: "2025",
    title: "Nace Nexuniversity",
    text: "La escuela toma forma: instructores certificados, grupos reducidos y un método progresivo que va del primer saque al torneo nacional.",
  },
]

export function AcademyStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <Section ref={ref} spacing="content" aria-labelledby="academia-historia-titulo">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <Eyebrow className="mb-3">Quiénes enseñan</Eyebrow>
          <h2
            id="academia-historia-titulo"
            className="text-section font-semibold tracking-[-0.035em] text-foreground text-balance"
          >
            La escuela llegó después del oficio.
          </h2>
          <p className="mt-5 text-body-lg text-muted-foreground">
            Nexuniversity no nació como una idea de negocio: nació de un equipo que
            llevaba años armando canchas, arbitrando partidos y explicando reglas a
            gente que agarraba una pelota por primera vez.
          </p>

          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/events.jpg"
              alt="Equipo de Nexus dirigiendo una jornada deportiva al aire libre"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </motion.div>

        <ol className="lg:col-span-7 lg:pt-2">
          {milestones.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-l border-border pb-9 pl-7 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
              />
              <p className="text-eyebrow tracking-[0.1em] uppercase text-muted-foreground">
                {item.period}
              </p>
              <h3 className="mt-2 text-subsection font-semibold tracking-[-0.02em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-2.5 text-body text-muted-foreground max-w-lg">{item.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
