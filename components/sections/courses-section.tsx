"use client"

import { motion, useInView, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import Image from "next/image"
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Fundamentos",
    level: "Principiante",
    schedule: "Sabados 10:00",
    location: "Parque Bicentenario",
    duration: "4 semanas",
    price: "$15.000",
    color: "bg-accent/10 text-accent",
  },
  {
    id: 2,
    title: "Tecnica y Estrategia",
    level: "Intermedio",
    schedule: "Mie & Vie 18:00",
    location: "Parque Araucano",
    duration: "6 semanas",
    price: "$25.000",
    color: "bg-foreground/[0.06] text-foreground",
  },
  {
    id: 3,
    title: "Competitivo Elite",
    level: "Avanzado",
    schedule: "Mar & Jue 17:00",
    location: "Estadio Nacional",
    duration: "8 semanas",
    price: "$35.000",
    color: "bg-foreground text-background",
  },
]

export function CoursesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section id="cursos" ref={ref} className="py-20 md:py-32 lg:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <motion.div style={{ y: imgY }} className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/courses.jpg"
                alt="Instructor ensenando roundnet"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-5 left-5 right-5"
              >
                <div className="bg-background/95 backdrop-blur-xl rounded-xl p-5 shadow-lg shadow-foreground/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <p className="text-[11px] tracking-[0.15em] uppercase text-accent font-medium">Inscripciones abiertas</p>
                  </div>
                  <p className="text-[15px] font-semibold text-foreground">Proximo curso: 15 de Junio</p>
                  <p className="text-[12px] text-muted-foreground mt-1">Parque Bicentenario, Santiago</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 mt-4 h-10 px-5 rounded-full bg-foreground text-background text-[12px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
                  >
                    Reservar mi cupo
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Content + Course list */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">
                Academia
              </p>
              <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.02]">
                Aprende con
                <br />
                los mejores.
              </h2>
              <p className="mt-5 text-[15px] text-muted-foreground leading-[1.7] max-w-md">
                Instructores certificados, grupos reducidos y un metodo progresivo
                disenado para cada nivel. Del primer saque al torneo nacional.
              </p>
            </motion.div>

            {/* Course cards */}
            <div className="mt-10 flex flex-col gap-4">
              {courses.map((course, i) => (
                <motion.a
                  key={course.id}
                  href="#"
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border hover:border-foreground/15 hover:shadow-md hover:shadow-foreground/[0.02] bg-card transition-all duration-500"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className={`text-[10px] tracking-[0.1em] uppercase font-semibold px-3 py-1.5 rounded-lg shrink-0 ${course.color}`}>
                      {course.level}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-foreground group-hover:text-accent transition-colors duration-300">{course.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-1.5 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" strokeWidth={1.5} /> {course.schedule}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" strokeWidth={1.5} /> {course.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" strokeWidth={1.5} /> {course.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-[16px] font-semibold text-foreground tabular-nums">{course.price}</span>
                    <div className="flex items-center justify-center w-9 h-9 rounded-full border border-border group-hover:border-foreground/20 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
