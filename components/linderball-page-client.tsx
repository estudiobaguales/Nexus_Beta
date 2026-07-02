"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import {
  ArrowRight,
  ArrowDown,
  Wind,
  Zap,
  Rocket,
  Flag,
  Sparkles,
  MapPin,
  CircleDot,
} from "lucide-react"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

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
        <Image src="/images/linderball-hero.png" alt="Personas jugando linderball con la pelota de anillo" fill priority className="object-cover" />
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
            El nuevo deporte de lanzamientos creativos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3.5rem,12vw,9rem)] font-bold tracking-[-0.05em] text-background leading-[0.9]"
          >
            Linderball
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-[16px] md:text-[18px] text-background/60 max-w-xl leading-relaxed"
          >
            Una pelota de espuma en forma de <span className="text-background font-medium">anillo</span> y mas de 16
            mecanicas de lanzamiento. Un sistema de juego que se adapta a cualquier grupo, espacio y estilo.
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6 font-medium"
        >
          Que es Linderball
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.15] text-balance"
        >
          No es un solo juego, es un{" "}
          <span className="text-accent">sistema de juego</span> construido alrededor de una pelota de espuma con forma de anillo.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 text-[16px] md:text-[17px] text-muted-foreground leading-[1.8] max-w-2xl"
        >
          El anillo de espuma vuela distinto a cualquier pelota: puedes hacerlo planear, girar, curvarse o caer en
          picada. Con mas de 16 mecanicas de lanzamiento diferentes, los jugadores experimentan con agarres y efectos
          para manipular la trayectoria. No tiene reglas fijas universales: se adapta a dos personas en un espacio
          pequeno o a equipos completos al aire libre.
        </motion.p>
      </div>
    </section>
  )
}

/* ---------- Throwing mechanics ---------- */
const mechanics = [
  { icon: Wind, title: "Glide", text: "Un lanzamiento suave y flotante que planea por el aire de forma predecible." },
  { icon: Zap, title: "Flick", text: "Un tiro rapido de muneca con efecto, ideal para distancias cortas y precisas." },
  { icon: Rocket, title: "Dive Bomb", text: "El anillo sube y luego cae en picada, imposible de anticipar para el rival." },
  { icon: Sparkles, title: "Spins & Curves", text: "Distintos agarres generan giros que curvan la trayectoria a tu voluntad." },
]

function Mechanics() {
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
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">Mecanicas</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.05]">
            Mas de 16 formas de lanzar.
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
            Estas son solo algunas. La gracia esta en experimentar y crear tu propio estilo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {mechanics.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex gap-5 p-7 rounded-2xl border border-border hover:border-accent/40 hover:shadow-lg hover:shadow-foreground/[0.03] transition-all duration-500 bg-background"
            >
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <m.icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-foreground">{m.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted-foreground leading-relaxed">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- How to play (modes) ---------- */
const modes = [
  { icon: MapPin, title: "Espacio reducido", text: "Dos jugadores pueden pasarse el anillo en un patio o pasillo, probando mecanicas." },
  { icon: Flag, title: "Ultimate Linderball", text: "En equipos, se pasa el anillo hasta anotar en una zona de gol, estilo Ultimate frisbee." },
  { icon: Sparkles, title: "Juego libre", text: "Sin reglas fijas: inventa desafios, trucos y variantes segun el grupo y el lugar." },
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
            Se adapta a ti.
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
            El mismo anillo, infinitas formas de jugar. Elige el modo segun tu grupo y tu espacio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode, i) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-6">
                <mode.icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground/60 font-medium">
                Modo {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[17px] font-semibold text-foreground">{mode.title}</h3>
              <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{mode.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Origin ---------- */
function Origin() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="py-20 md:py-28 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">El origen</p>
              <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.05]">
                Nacido para reinventar el juego.
              </h2>
              <p className="mt-6 text-[15px] text-muted-foreground leading-[1.8] max-w-md">
                Linderball fue creado por un estudiante universitario que buscaba una alternativa versatil a los juegos
                de patio tradicionales. En lugar de una pelota mas, diseno un anillo de espuma que vuela de formas
                impredecibles y que invita a experimentar. El resultado: un deporte portable, creativo y para todos.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {["Anillo de espuma seguro y liviano", "Portable: juega donde quieras", "Para todas las edades y niveles"].map((f, i) => (
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
                Ver en la tienda
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>

          <motion.div style={{ y: imgY }} className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
              <Image src="/images/linderball-ring.png" alt="Anillo de espuma de linderball" fill className="object-cover" />
            </div>
          </motion.div>
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
          className="relative rounded-3xl bg-foreground overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
        >
          <Sparkles className="w-10 h-10 text-accent mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.035em] text-background leading-[1.1] text-balance max-w-2xl mx-auto">
            Atrevete a lanzar distinto.
          </h2>
          <p className="mt-4 text-[15px] text-background/50 max-w-md mx-auto leading-relaxed">
            Consigue tu anillo de linderball y descubre un deporte que se reinventa cada vez que juegas.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 justify-center">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-accent text-accent-foreground text-[13px] font-semibold hover:scale-[1.03] active:scale-[0.97] transition-transform duration-300"
            >
              Comprar linderball
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link
              href="/spikeball"
              className="inline-flex items-center h-12 px-8 rounded-full border border-background/25 text-background text-[13px] font-medium hover:bg-background hover:text-foreground transition-all duration-300"
            >
              Conoce el Spikeball
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function LinderballPageClient() {
  return (
    <CartProvider>
      <Navbar overHero />
      <main>
        <Hero />
        <Intro />
        <Mechanics />
        <HowToPlay />
        <Origin />
        <CTA />
      </main>
      <Footer />
    </CartProvider>
  )
}
