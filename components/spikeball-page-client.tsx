"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import {
  ArrowRight,
  ArrowDown,
  Users,
  Repeat,
  Target,
  Ban,
  Trophy,
  CircleDot,
} from "lucide-react"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-foreground">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src="/images/spikeball-hero.png" alt="Jugadores de spikeball en accion" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-foreground/60" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-center">
        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5 font-medium"
          >
            El deporte que crece mas rapido del mundo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3.5rem,12vw,9rem)] font-bold tracking-[-0.05em] text-background leading-[0.9]"
          >
            Spikeball
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-[16px] md:text-[18px] text-background/60 max-w-xl leading-relaxed"
          >
            Tambien conocido como <span className="text-background font-medium">roundnet</span>. Dos contra dos,
            una red circular y 360 grados de pura adrenalina. Sin limites de cancha.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#como-jugar"
              className="group inline-flex items-center gap-2 h-12 px-8 rounded-full bg-accent text-accent-foreground text-[13px] font-semibold hover:scale-[1.03] active:scale-[0.97] transition-transform duration-300"
            >
              Como se juega
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" strokeWidth={2} />
            </a>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full border border-background/25 text-background text-[13px] font-medium hover:bg-background hover:text-foreground transition-all duration-300"
            >
              Ver equipamiento
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-background/40">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-background/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ---------- Intro ---------- */
function Intro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 md:py-28 lg:py-40">
      <div className="mx-auto max-w-[1000px] px-6">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Spikeball", href: "/spikeball" }]} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6 font-medium"
        >
          Que es el roundnet
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.15] text-balance"
        >
          Imagina el voleibol, pero jugado alrededor de una{" "}
          <span className="text-accent">red circular</span> tensada al nivel del suelo, sin lineas ni limites de cancha.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 text-[16px] md:text-[17px] text-muted-foreground leading-[1.8] max-w-2xl"
        >
          El roundnet se juega 2 contra 2. El objetivo es golpear la pelota contra la red de modo que el equipo
          rival no pueda devolverla. Cada equipo tiene hasta tres toques para preparar y ejecutar el remate, y como
          no hay limites de campo, los jugadores se mueven libremente en 360 grados. Es rapido, explosivo y adictivo.
        </motion.p>
      </div>
    </section>
  )
}

/* ---------- History timeline ---------- */
const timeline = [
  { year: "1989", title: "El origen", text: "Jeff Knurek inventa el juego en Estados Unidos, pero con el tiempo pierde popularidad." },
  { year: "2008", title: "El renacer", text: "Chris Ruder lo redescubre y lo relanza bajo la marca Spikeball, iniciando su expansion masiva." },
  { year: "Hoy", title: "Deporte global", text: "Regulado por la World Roundnet Federation, se juega de forma competitiva en todo el mundo." },
]

function History() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 md:py-28 lg:py-40 bg-secondary/40">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-xl"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">La historia</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.05]">
            De un patio trasero al mundo.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 rounded-2xl bg-background border border-border"
            >
              <span className="text-[2.5rem] font-bold tracking-[-0.04em] text-accent leading-none tabular-nums">
                {item.year}
              </span>
              <h3 className="mt-5 text-[17px] font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- How to play ---------- */
const rules = [
  { icon: Users, title: "2 contra 2", text: "Se juega en parejas. Dos equipos de dos jugadores rodean la red circular." },
  { icon: Repeat, title: "Hasta 3 toques", text: "Cada equipo dispone de un maximo de tres toques alternos para devolver la pelota a la red." },
  { icon: Target, title: "360 grados", text: "No hay limites de cancha. Una vez servida la pelota, los jugadores se mueven en cualquier direccion." },
  { icon: Ban, title: "Faltas", text: "Pierdes el punto si la pelota toca el suelo, golpea el aro, rebota dos veces o si obstruyes al rival." },
]

function HowToPlay() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="como-jugar" ref={ref} className="py-20 md:py-28 lg:py-40 scroll-mt-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-xl"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">Como se juega</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.05]">
            Las reglas, en simple.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex gap-5 p-7 rounded-2xl border border-border hover:border-accent/40 hover:shadow-lg hover:shadow-foreground/[0.03] transition-all duration-500 bg-card"
            >
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <rule.icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-foreground">{rule.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted-foreground leading-relaxed">{rule.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Scoring ---------- */
const scoring = [
  { value: "11 / 15 / 21", label: "Puntos por set", detail: "Los partidos se juegan a 11, 15 o 21 puntos segun el formato." },
  { value: "+2", label: "Diferencia para ganar", detail: "Debes ganar por una diferencia minima de dos puntos." },
  { value: "360", label: "Grados de juego", detail: "Movimiento libre alrededor de la red, sin lineas." },
]

function Scoring() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 md:py-28 lg:py-40 bg-foreground overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-xl"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">Puntuacion</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.035em] text-background leading-[1.05]">
            Como se gana.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {scoring.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-2xl border border-background/10 bg-background/[0.03]"
            >
              <span className="text-[2.5rem] md:text-[3rem] font-bold tracking-[-0.04em] text-accent leading-none">
                {s.value}
              </span>
              <p className="mt-4 text-[15px] font-semibold text-background">{s.label}</p>
              <p className="mt-1.5 text-[13px] text-background/45 leading-relaxed">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Equipment ---------- */
function Equipment() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="py-20 md:py-28 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div style={{ y: imgY }}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
              <Image src="/images/spikeball-net.png" alt="Set de spikeball con red circular" fill className="object-cover" />
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">El equipamiento</p>
              <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.05]">
                Solo necesitas un set.
              </h2>
              <p className="mt-6 text-[15px] text-muted-foreground leading-[1.8] max-w-md">
                Una red circular tensada, una pelota de alta visibilidad y ganas de moverte. El set es portable,
                se arma en segundos y puedes jugar en la playa, el parque o donde quieras.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {["Red circular con tension ajustable", "Pelota oficial de competencia", "Portable: cabe en una mochila"].map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-[14px] text-foreground"
                  >
                    <CircleDot className="w-4 h-4 text-accent shrink-0" strokeWidth={1.75} />
                    {f}
                  </motion.div>
                ))}
              </div>
              <Link
                href="/productos"
                className="group inline-flex items-center gap-2 mt-9 h-12 px-8 rounded-full bg-foreground text-background text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
              >
                Ver sets en la tienda
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- CTA ---------- */
function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="pb-20 md:pb-28 lg:pb-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-accent overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
        >
          <Trophy className="w-10 h-10 text-accent-foreground/80 mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.035em] text-accent-foreground leading-[1.1] text-balance max-w-2xl mx-auto">
            Listo para tu primer punto?
          </h2>
          <p className="mt-4 text-[15px] text-accent-foreground/70 max-w-md mx-auto leading-relaxed">
            Consigue tu set, unete a un curso y forma parte de la comunidad de roundnet mas grande de Chile.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 justify-center">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-accent-foreground text-accent text-[13px] font-semibold hover:scale-[1.03] active:scale-[0.97] transition-transform duration-300"
            >
              Comprar un set
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link
              href="/nexuniversity"
              className="inline-flex items-center h-12 px-8 rounded-full border border-accent-foreground/30 text-accent-foreground text-[13px] font-medium hover:bg-accent-foreground/10 transition-all duration-300"
            >
              Tomar un curso
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function SpikeballPageClient() {
  return (
    <CartProvider>
      <Navbar overHero />
      <main>
        <Hero />
        <Intro />
        <History />
        <HowToPlay />
        <Scoring />
        <Equipment />
        <CTA />
      </main>
      <Footer />
    </CartProvider>
  )
}
