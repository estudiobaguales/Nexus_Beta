"use client"

import { motion, useInView, useScroll, useTransform } from "motion/react"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays, Megaphone, GraduationCap, Users } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Button } from "@/components/ui/button"

/** Año de fundacion de la marca. El oficio del equipo es anterior: ese es el angulo. */
const FOUNDED_YEAR = 2025

/**
 * El oficio del equipo, previo a la marca. Es lo que sostiene el "marca nueva,
 * oficio viejo" sin depender de un parrafo largo.
 */
const craft = [
  { icon: CalendarDays, label: "Organización de eventos deportivos" },
  { icon: Megaphone, label: "Activaciones de marca" },
  { icon: GraduationCap, label: "Cursos y capacitaciones" },
  { icon: Users, label: "Formación de comunidad" },
]

/**
 * Trayectoria acumulada del equipo, no de la marca.
 * TODO: confirmar estas cifras antes de publicar; vienen del diseño original y no
 * estan verificadas. Las mismas aparecen en el hero (sections/hero.tsx).
 */
const stats = [
  { value: 5000, suffix: "+", label: "Jugadores convocados" },
  { value: 120, suffix: "+", label: "Torneos y eventos" },
  { value: 15, suffix: "", label: "Ciudades" },
]

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setDisplay(Math.round(eased * value))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return <span>{display.toLocaleString("es-CL")}{suffix}</span>
}

/** Bloque 4 de la home: Nuestra Historia. */
export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <Section
      id="nosotros"
      ref={ref}
      aria-labelledby="historia-titulo"
      className="overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Content */}
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow className="mb-4">Nuestra historia</Eyebrow>
            <h2
              id="historia-titulo"
              className="text-section font-semibold tracking-[-0.035em] text-foreground text-balance"
            >
              Marca nueva,
              <br />
              <span className="text-muted-foreground">oficio viejo.</span>
            </h2>
            <p className="mt-6 text-body-lg text-muted-foreground max-w-md">
              Nexus nace en {FOUNDED_YEAR}. El equipo que está detrás, no: llevamos años
              produciendo eventos deportivos, activaciones, cursos y capacitaciones en todo Chile.
            </p>
            <p className="mt-4 text-body text-muted-foreground max-w-md">
              Lo que cambia es el nombre y el foco. Lo que no cambia es cómo trabajamos: la cancha
              armada a tiempo, la gente jugando y las ganas de volver el fin de semana siguiente.
            </p>
          </motion.div>

          {/* El oficio, en lugar de un segundo bloque de parrafos */}
          <ul className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
            {craft.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <item.icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="text-ui text-foreground">{item.label}</span>
              </motion.li>
            ))}
          </ul>

          {/* Trayectoria */}
          <div className="mt-10 grid grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.45 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col p-4 rounded-xl bg-secondary/60"
              >
                <span className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-foreground tabular-nums">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                </span>
                <span className="text-eyebrow text-muted-foreground mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button asChild className="group">
              <Link href="/nexuniversity">
                Conocer Nexuniversity
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  strokeWidth={1.5}
                />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contacto">Hablar con el equipo</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Image with parallax */}
        <motion.div style={{ y: imgY }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/about.jpg"
              alt="Equipo de Nexus montando una cancha de roundnet antes de un torneo"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-accent/20 to-transparent"
            />
          </motion.div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 -left-6 bg-background rounded-xl p-5 shadow-xl shadow-foreground/5 border border-border hidden lg:block"
          >
            <p className="text-3xl font-semibold tracking-[-0.03em] text-accent leading-none tabular-nums">
              {FOUNDED_YEAR}
            </p>
            <p className="text-eyebrow text-muted-foreground mt-1">Nace Nexus, en Chile</p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
