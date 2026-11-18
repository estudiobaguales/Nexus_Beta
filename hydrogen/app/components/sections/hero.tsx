"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion, useReducedMotion } from "motion/react"
import Image from "@/components/ui/image"
import Link from "@/components/ui/link"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { SHIPPING_ETA, NEXUNIVERSITY_ENABLED } from "@/lib/site-config"
import { cn } from "@/lib/utils"

type TitleSegment = { text: string; accent?: boolean; break?: boolean }

type Slide = {
  id: string
  variant: "photo" | "product"
  image: string
  imageAlt: string
  eyebrow: string
  title: TitleSegment[]
  subheadline: string
  cta: { label: string; href: string }
}

const allSlides: Slide[] = [
  {
    id: "nexus",
    variant: "photo",
    image: "/images/hero-main.jpg",
    imageAlt: "Personas jugando roundnet en la playa al atardecer",
    eyebrow: "La marca que mueve a Chile",
    title: [
      { text: "Juega. " },
      { text: "Compite.", accent: true },
      { text: "", break: true },
      { text: "Conecta." },
    ],
    subheadline:
      "Equipamiento profesional, cursos y torneos de roundnet. Únete a la comunidad deportiva más innovadora del país.",
    cta: { label: "Conocer Nexus", href: "#nosotros" },
  },
  {
    id: "tienda",
    variant: "product",
    image: "/images/prod-roundnet.png",
    imageAlt: "Set de Roundnet Nexus Pro",
    eyebrow: "Tienda",
    title: [{ text: "Equipamiento " }, { text: "de élite.", accent: true }],
    // El plazo sale de lib/site-config.ts. No hay envio gratis: no prometerlo aca.
    subheadline: `Envío a todo Chile en ${SHIPPING_ETA}.`,
    cta: { label: "Comprar ahora", href: "/productos" },
  },
  {
    id: "nexuniversity",
    variant: "photo",
    image: "/images/courses.jpg",
    imageAlt: "Instructor enseñando roundnet a un grupo de alumnos",
    eyebrow: "Cursos",
    title: [{ text: "Aprende con" }, { text: "", break: true }, { text: "los mejores.", accent: true }],
    subheadline:
      "Instructores certificados, cursos para profesores, entrenadores y jugadores. Para todos los niveles, de novato a experto.",
    cta: { label: "Ver cursos", href: "/nexuniversity" },
  },
]

// El slide de cursos apunta a Nexuniversity: se oculta mientras la seccion este deshabilitada.
const slides = allSlides.filter((s) => s.id !== "nexuniversity" || NEXUNIVERSITY_ENABLED)

const stats = [
  { value: 500, suffix: "+", label: "Jugadores" },
  { value: 15, suffix: "", label: "Ciudades" },
  { value: 120, suffix: "+", label: "Torneos" },
]

const COUNT_DURATION = 2000

const AUTOPLAY_DELAY = 6000

function slideTitle(slide: Slide) {
  return slide.title.map((s) => s.text).join("")
}

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  // Estado explicito del autoplay: es lo que refleja el boton de pausa.
  const [isPlaying, setIsPlaying] = useState(true)
  // Pausas temporales (hover / foco de teclado) que no cambian la intencion del usuario.
  const [isSuspended, setIsSuspended] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  // Autoplay como efecto derivado del estado: no quedan intervalos huerfanos si
  // el usuario pausa, saca el mouse y vuelve a entrar.
  useEffect(() => {
    if (!emblaApi || !isPlaying || isSuspended || prefersReducedMotion) return
    const id = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_DELAY)
    return () => clearInterval(id)
  }, [emblaApi, isPlaying, isSuspended, prefersReducedMotion])

  const autoplayRunning = isPlaying && !isSuspended && !prefersReducedMotion

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      // 100svh en vez de 100vh: con 100vh la barra de direcciones del navegador movil
      // cambia la altura al hacer scroll y el hero salta.
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-foreground"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Destacados de Nexus"
      onMouseEnter={() => setIsSuspended(true)}
      onMouseLeave={() => setIsSuspended(false)}
      onFocusCapture={() => setIsSuspended(true)}
      onBlurCapture={() => setIsSuspended(false)}
    >
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => {
            const isActive = i === selectedIndex
            return (
              <div
                key={slide.id}
                className="relative h-full w-full flex-shrink-0"
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${slides.length}: ${slideTitle(slide)}`}
                // Las diapositivas ocultas quedan fuera del orden de tabulacion:
                // antes se podia tabular hacia CTAs invisibles.
                inert={!isActive}
              >
                {slide.variant === "photo" ? (
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/35 to-foreground/5" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-foreground">
                    <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[8%]">
                      <div className="relative w-[65%] max-w-[380px] lg:w-[36%] lg:max-w-[480px] aspect-square">
                        <div className="absolute inset-0 rounded-full bg-accent/15 blur-3xl" />
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain drop-shadow-2xl"
                        />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/70 to-transparent lg:to-foreground/10" />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 h-full w-full flex flex-col justify-end pb-16 md:pb-24">
                  <Container>
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
                      <div className="flex flex-col gap-5 max-w-2xl">
                        <p className="text-eyebrow tracking-[0.4em] uppercase text-background/45 font-light">
                          {slide.eyebrow}
                        </p>

                        {/* Solo la primera diapositiva aporta el H1 del documento. Antes cada
                            diapositiva emitia su propio <h1> y la home tenia tres. */}
                        <SlideTitle asHeading={i === 0} slide={slide} />

                        <p className="text-body text-background/55 max-w-md">{slide.subheadline}</p>

                        <div className="flex flex-wrap gap-3 mt-1">
                          <Button
                            asChild
                            className="bg-background text-foreground hover:bg-background/90 px-7"
                          >
                            {slide.cta.href.startsWith("#") ? (
                              <a href={slide.cta.href}>{slide.cta.label}</a>
                            ) : (
                              <Link href={slide.cta.href}>{slide.cta.label}</Link>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Stats -- solo en la primera diapositiva; cuentan desde 0 cada vez que se muestra */}
                      {i === 0 && (
                      <div className="flex items-center gap-8 sm:gap-10 lg:gap-8 pb-2 border-t border-background/15 pt-6 lg:border-t-0 lg:pt-0">
                        {stats.map((stat) => (
                          <div key={stat.label} className="flex flex-col items-start lg:items-center">
                            <span className="text-xl sm:text-2xl font-semibold text-background tracking-[-0.02em] tabular-nums">
                              <CountUp value={stat.value} active={isActive} instant={!!prefersReducedMotion} />
                              {stat.suffix}
                            </span>
                            <span className="text-micro text-background/40 tracking-[0.1em] uppercase mt-0.5">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      )}
                    </div>
                  </Container>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Anuncio del cambio de diapositiva para lectores de pantalla. Solo cuando el
          carrusel esta detenido: con autoplay activo seria ruido constante. */}
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {!autoplayRunning && `Diapositiva ${selectedIndex + 1} de ${slides.length}`}
      </p>

      {/* Arrows */}
      <HeroControl
        className="left-3 md:left-6 top-1/2 -translate-y-1/2"
        label="Diapositiva anterior"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
      </HeroControl>
      <HeroControl
        className="right-3 md:right-6 top-1/2 -translate-y-1/2"
        label="Siguiente diapositiva"
        onClick={scrollNext}
      >
        <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
      </HeroControl>

      {/* Dots + pausa */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <div className="flex items-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Ir a la diapositiva ${i + 1}: ${slideTitle(slide)}`}
              aria-current={i === selectedIndex}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === selectedIndex ? "w-6 bg-background" : "w-1.5 bg-background/35 hover:bg-background/55",
              )}
            />
          ))}
        </div>

        {!prefersReducedMotion && (
          <button
            type="button"
            onClick={() => setIsPlaying((playing) => !playing)}
            aria-pressed={!isPlaying}
            aria-label={isPlaying ? "Pausar carrusel" : "Reanudar carrusel"}
            className="ml-1 flex items-center justify-center w-7 h-7 rounded-full bg-background/10 border border-background/25 text-background hover:bg-background/20 transition-colors duration-300"
          >
            {isPlaying ? (
              <Pause className="w-3 h-3" strokeWidth={2} />
            ) : (
              <Play className="w-3 h-3" strokeWidth={2} />
            )}
          </button>
        )}
      </div>
    </motion.section>
  )
}

/** Cuenta de 0 al valor cada vez que `active` pasa a true. Con movimiento reducido muestra el valor final. */
function CountUp({ value, active, instant }: { value: number; active: boolean; instant: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (instant || !active) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / COUNT_DURATION, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 4)) * value))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      setCount(0)
    }
  }, [active, instant, value])

  const display = instant ? value : count
  return <>{display.toLocaleString("es-CL")}</>
}

function SlideTitle({ slide, asHeading }: { slide: Slide; asHeading: boolean }) {
  const className =
    "text-display font-semibold text-background tracking-[-0.04em] text-balance"
  const content = slide.title.map((seg, idx) =>
    seg.break ? (
      <br key={idx} />
    ) : (
      <span key={idx} className={seg.accent ? "text-accent" : undefined}>
        {seg.text}
      </span>
    ),
  )

  return asHeading ? <h1 className={className}>{content}</h1> : <p className={className}>{content}</p>
}

function HeroControl({
  className,
  label,
  onClick,
  children,
}: {
  className: string
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute z-20 flex items-center justify-center w-10 h-10 rounded-full bg-background/10 border border-background/25 text-background hover:bg-background/20 transition-colors duration-300",
        className,
      )}
    >
      {children}
    </button>
  )
}
