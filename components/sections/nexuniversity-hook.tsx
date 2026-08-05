"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Button } from "@/components/ui/button"

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
    <Section id="nexuniversity" ref={ref} className="py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image with featured course card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image src="/images/courses.jpg" alt="Instructor ensenando roundnet" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-5 left-5 right-5"
              >
                <div className="bg-background/95 backdrop-blur-xl rounded-xl p-5 shadow-lg shadow-foreground/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-micro tracking-[0.1em] uppercase font-semibold px-3 py-1.5 rounded-lg bg-accent/10 text-accent shrink-0">
                      {featuredCourse.level}
                    </span>
                    {/* <p>, no <h3>: esta tarjeta flotante aparece ANTES en el DOM que el
                        <h2> de la seccion, asi que como heading invertia el outline. */}
                    <p className="text-body font-semibold text-foreground">{featuredCourse.title}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-eyebrow text-muted-foreground">
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
                  <p className="text-body-lg font-semibold text-foreground tabular-nums mt-3">{featuredCourse.price}</p>
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
              <Eyebrow className="mb-4">Academia</Eyebrow>
              <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.02]">
                Aprende con
                <br />
                los mejores.
              </h2>
              <p className="mt-5 text-body text-muted-foreground leading-[1.7] max-w-md">
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
              <Button asChild className="group">
                <Link href="/nexuniversity">
                  Ver todos los cursos
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
                </Link>
              </Button>
            </motion.div>
          </div>
      </div>
    </Section>
  )
}
