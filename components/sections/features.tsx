"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Zap, Users, MapPin, Trophy, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Adrenalina pura",
    stat: "360",
    unit: "grados",
    description: "Reflejos, agilidad y velocidad. El deporte mas explosivo que puedas jugar.",
    accent: "group-hover:text-brand-terracotta",
    accentBg: "group-hover:bg-brand-terracotta/10",
    line: "bg-brand-terracotta",
  },
  {
    icon: Users,
    title: "Hecho para compartir",
    stat: "2v2",
    unit: "jugadores",
    description: "Forma equipo, haz amigos, construye lazos que van mas alla de la cancha.",
    accent: "group-hover:text-brand-blue",
    accentBg: "group-hover:bg-brand-blue/10",
    line: "bg-brand-blue",
  },
  {
    icon: MapPin,
    title: "Juega donde quieras",
    stat: "30",
    unit: "seg armado",
    description: "Playa, parque o patio. Tu set cabe en una mochila. Lleva el juego contigo.",
    accent: "group-hover:text-brand-sage",
    accentBg: "group-hover:bg-brand-sage/10",
    line: "bg-brand-sage",
  },
  {
    icon: Trophy,
    title: "Compite al maximo",
    stat: "15",
    unit: "ciudades",
    description: "Torneos, rankings y ligas en todo Chile. Sube de nivel y demuestralo.",
    accent: "group-hover:text-brand-gold",
    accentBg: "group-hover:bg-brand-gold/10",
    line: "bg-brand-gold",
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="relative py-20 md:py-28 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">
              Por que Nexus
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.05] text-balance">
              Un deporte sin limites.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/productos"
              className="group inline-flex items-center gap-2 h-11 px-7 rounded-full bg-foreground text-background text-[13px] font-medium hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
            >
              Explorar tienda
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative rounded-2xl border border-border bg-card p-7 hover:border-foreground/12 hover:shadow-xl hover:shadow-foreground/[0.03] transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Hover background shift */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.accentBg.replace("group-hover:", "")}`} />

              <div className="relative z-10">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-foreground/[0.04] ${feature.accentBg} transition-colors duration-500 mb-5`}>
                  <feature.icon className={`w-[18px] h-[18px] text-muted-foreground ${feature.accent} transition-colors duration-500`} strokeWidth={1.5} />
                </div>

                <div className="mb-3">
                  <span className="text-[2.2rem] font-semibold tracking-[-0.04em] text-foreground leading-none">
                    {feature.stat}
                  </span>
                  <span className="text-[11px] text-muted-foreground ml-1.5">{feature.unit}</span>
                </div>

                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground mb-2">{feature.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>

              {/* Bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={hoveredIndex === i ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute bottom-0 left-0 right-0 h-[2px] origin-left ${feature.line}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
