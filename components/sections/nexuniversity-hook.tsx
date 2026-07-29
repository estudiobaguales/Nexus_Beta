"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react"

const featuredCourse = {
  title: "Fundamentos",
  level: "Principiante",
  schedule: "Sabados 10:00",
  location: "Parque Bicentenario",
  duration: "4 semanas",
  price: "$15.000",
}

export function NexuniversityHook() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="nexuniversity" ref={ref} className="py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image with featured course card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image src="/images/courses.jpg" alt="Instructor ensenando roundnet" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-5 left-5 right-5"
              >
                <div className="bg-background/95 backdrop-blur-xl rounded-xl p-5 shadow-lg shadow-foreground/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold px-3 py-1.5 rounded-lg bg-accent/10 text-accent shrink-0">
                      {featuredCourse.level}
                    </span>
                    <h3 className="text-[15px] font-semibold text-foreground">{featuredCourse.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" strokeWidth={1.5} /> {featuredCourse.schedule}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" strokeWidth={1.5} /> {featuredCourse.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" strokeWidth={1.5} /> {featuredCourse.duration}
                    </span>
                  </div>
                  <p className="text-[16px] font-semibold text-foreground tabular-nums mt-3">{featuredCourse.price}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">Academia</p>
              <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.02]">
                Aprende con
                <br />
                los mejores.
              </h2>
              <p className="mt-5 text-[15px] text-muted-foreground leading-[1.7] max-w-md">
                Instructores certificados, grupos reducidos y un metodo progresivo disenado para cada nivel. Del
                primer saque al torneo nacional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <Link
                href="/nexuniversity"
                className="group inline-flex items-center gap-2.5 h-12 px-8 rounded-full bg-foreground text-background text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
              >
                Ver todos los cursos
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
