"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-main.jpg"
          alt="Personas jugando roundnet en la playa al atardecer"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/35 to-foreground/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-[1280px] px-6 lg:px-10 pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          {/* Left */}
          <div className="flex flex-col gap-5 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 4.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] tracking-[0.4em] uppercase text-background/45 font-light"
            >
              El deporte que mueve a Chile
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 4.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,8vw,5.5rem)] font-semibold text-background tracking-[-0.04em] leading-[0.92] text-balance"
            >
              Juega.{" "}
              <span className="text-accent">Compite.</span>
              <br />
              Conecta.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 5.0, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15px] text-background/55 leading-relaxed max-w-md"
            >
              Equipamiento profesional, cursos y torneos de roundnet.
              Unete a la comunidad deportiva mas innovadora del pais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 5.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3 mt-1"
            >
              <Link
                href="/productos"
                className="inline-flex items-center h-12 px-7 rounded-full bg-background text-foreground text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
              >
                Ver Productos
              </Link>
              <a
                href="#cursos"
                className="group inline-flex items-center gap-2.5 h-12 px-7 rounded-full border border-background/25 text-background text-[13px] font-medium hover:bg-background/10 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-background/15">
                  <Play className="w-2.5 h-2.5 text-background ml-0.5" fill="currentColor" />
                </div>
                Ver como se juega
              </a>
            </motion.div>
          </div>

          {/* Right -- quick stats (visible on all devices) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 5.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-8 sm:gap-10 lg:gap-8 pb-2 border-t border-background/15 pt-6 lg:border-t-0 lg:pt-0"
          >
            {[
              { value: "5K+", label: "Jugadores" },
              { value: "15", label: "Ciudades" },
              { value: "120+", label: "Torneos" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-start lg:items-center">
                <span className="text-xl sm:text-2xl font-semibold text-background tracking-[-0.02em] tabular-nums">{stat.value}</span>
                <span className="text-[10px] text-background/40 tracking-[0.1em] uppercase mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.8, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-background/30" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
