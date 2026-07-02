"use client"

import { motion, useInView, useScroll, useTransform } from "motion/react"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: 5000, suffix: "+", label: "Jugadores activos" },
  { value: 120, suffix: "+", label: "Torneos realizados" },
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

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section id="nosotros" ref={ref} className="relative py-20 md:py-32 lg:py-44 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">
                Nuestra historia
              </p>
              <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.02] text-balance">
                Construyendo
                <br />
                comunidad.
              </h2>
              <p className="mt-6 text-[15px] text-muted-foreground leading-[1.7] max-w-md">
                Desde 2019 trabajamos para traer un deporte accesible, divertido y competitivo a Chile.
                No solo vendemos equipamiento: organizamos torneos, formamos jugadores y conectamos personas.
              </p>
              <p className="mt-4 text-[15px] text-muted-foreground leading-[1.7] max-w-md">
                Hoy somos la comunidad de roundnet mas grande de Latinoamerica, con presencia en 15 ciudades
                y miles de jugadores que comparten la misma pasion.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col p-4 rounded-xl bg-secondary/60"
                >
                  <span className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-foreground tabular-nums">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex gap-3"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-2 h-12 px-8 rounded-full bg-foreground text-background text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
              >
                Unete a Nexus
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full border border-border text-foreground text-[13px] font-medium hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Conocer mas
              </a>
            </motion.div>
          </motion.div>

          {/* Image with parallax */}
          <motion.div
            style={{ y: imgY }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/about.jpg"
                alt="Jugador haciendo spike en roundnet"
                fill
                className="object-cover"
              />
              {/* Accent overlay on bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-accent/20 to-transparent" />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -left-6 bg-background rounded-xl p-5 shadow-xl shadow-foreground/5 border border-border hidden lg:block"
            >
              <p className="text-[32px] font-semibold tracking-[-0.03em] text-accent leading-none">2019</p>
              <p className="text-[11px] text-muted-foreground mt-1">Fundada en Santiago</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
