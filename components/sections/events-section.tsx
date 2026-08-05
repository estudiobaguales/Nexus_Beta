"use client"

import { motion, useInView, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, MapPin, Users, Calendar } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Nexus Open Santiago",
    date: "12 - 13 Jul",
    year: "2026",
    location: "Parque Araucano, Las Condes",
    participants: "64 equipos",
    category: "Nacional",
    featured: true,
  },
  {
    id: 2,
    title: "Beach Cup Vina",
    date: "02 Ago",
    year: "2026",
    location: "Playa Renaca",
    participants: "32 equipos",
    category: "Regional",
    featured: false,
  },
  {
    id: 3,
    title: "Liga Universitaria",
    date: "20 Sep",
    year: "2026",
    location: "Campus San Joaquin, PUC",
    participants: "24 equipos",
    category: "Liga",
    featured: false,
  },
]

export function EventsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"])

  return (
    <section id="eventos" ref={ref} className="relative py-20 md:py-32 lg:py-44 bg-foreground overflow-hidden">
      {/* Parallax background texture */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-[0.03]"
      >
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </motion.div>

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Header with CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-eyebrow tracking-[0.3em] uppercase text-accent mb-4 font-medium">
              Calendario 2026
            </p>
            <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-semibold tracking-[-0.035em] text-background leading-[1.02]">
              Donde la
              <br />
              competencia vive.
            </h2>
            <p className="mt-4 text-body text-background/40 leading-relaxed max-w-md">
              Torneos, ligas y encuentros en todo Chile. Compite o ven a vivir la experiencia.
            </p>
          </motion.div>

          <motion.a
            href="#"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group inline-flex items-center gap-2 h-12 px-8 rounded-full bg-background text-foreground text-ui font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-300 w-fit"
          >
            Ver todos los eventos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Featured event */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/events.jpg"
                alt="Torneo Nexus Open"
                fill
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex gap-2">
                    <span className="text-micro tracking-[0.12em] uppercase bg-accent/90 text-accent-foreground px-3 py-1.5 rounded-full font-semibold">
                      Destacado
                    </span>
                    <span className="text-micro tracking-[0.12em] uppercase bg-background/15 backdrop-blur-md text-background/90 px-3 py-1.5 rounded-full font-medium">
                      {events[0].category}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-background/30 group-hover:text-background group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                    <p className="text-caption text-background/60">{events[0].date}, {events[0].year}</p>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-semibold text-background tracking-[-0.03em] leading-tight">{events[0].title}</h3>
                  <div className="flex gap-5 mt-3 text-caption text-background/50">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" strokeWidth={1.5} /> {events[0].location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3 h-3" strokeWidth={1.5} /> {events[0].participants}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 mt-5 h-10 px-6 rounded-full bg-background text-foreground text-caption font-semibold hover:bg-background/90 active:scale-[0.97] transition-all duration-200"
                  >
                    Inscribir equipo
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side events */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {events.slice(1).map((event, i) => (
              <motion.a
                key={event.id}
                href="#"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-background/10 hover:border-background/20 hover:bg-background/[0.04] transition-all duration-500 flex-1"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-micro tracking-[0.12em] uppercase text-background/40 font-medium">
                    {event.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-background/15 group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar className="w-3 h-3 text-accent/60" strokeWidth={1.5} />
                    <p className="text-eyebrow text-background/40">{event.date}, {event.year}</p>
                  </div>
                  <h3 className="text-lg font-semibold text-background tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">{event.title}</h3>
                  <p className="text-caption text-background/35 mt-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" strokeWidth={1.5} /> {event.location}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-eyebrow text-background/50 group-hover:text-accent/80 transition-colors duration-300 font-medium">
                      Mas info
                    </span>
                    <ArrowRight className="w-3 h-3 text-background/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
