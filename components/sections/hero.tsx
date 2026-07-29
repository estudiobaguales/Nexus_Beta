"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
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

const slides: Slide[] = [
  {
    id: "nexus",
    variant: "photo",
    image: "/images/hero-main.jpg",
    imageAlt: "Personas jugando roundnet en la playa al atardecer",
    eyebrow: "El deporte que mueve a Chile",
    title: [
      { text: "Juega. " },
      { text: "Compite.", accent: true },
      { text: "", break: true },
      { text: "Conecta." },
    ],
    subheadline:
      "Equipamiento profesional, cursos y torneos de roundnet. Unete a la comunidad deportiva mas innovadora del pais.",
    cta: { label: "Conocer Nexus", href: "#nosotros" },
  },
  {
    id: "tienda",
    variant: "product",
    image: "/images/prod-roundnet.png",
    imageAlt: "Set de Roundnet Nexus Pro",
    eyebrow: "Tienda",
    title: [{ text: "Equipamiento " }, { text: "de elite.", accent: true }],
    subheadline: "Envio gratis en pedidos sobre $50.000. Despacho a todo Chile en 3-5 dias habiles.",
    cta: { label: "Comprar ahora", href: "/productos" },
  },
  {
    id: "nexuniversity",
    variant: "photo",
    image: "/images/courses.jpg",
    imageAlt: "Instructor ensenando roundnet",
    eyebrow: "Academia",
    title: [{ text: "Aprende con" }, { text: "", break: true }, { text: "los mejores.", accent: true }],
    subheadline:
      "Instructores certificados, grupos reducidos y un metodo progresivo disenado para cada nivel. Del primer saque al torneo nacional.",
    cta: { label: "Ver cursos", href: "/nexuniversity" },
  },
]

const stats = [
  { value: "5K+", label: "Jugadores" },
  { value: "15", label: "Ciudades" },
  { value: "120+", label: "Torneos" },
]

const AUTOPLAY_DELAY = 6000

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [])

  const startAutoplay = useCallback(() => {
    stopAutoplay()
    autoplayRef.current = setInterval(() => emblaApi?.scrollNext(), AUTOPLAY_DELAY)
  }, [emblaApi, stopAutoplay])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
    startAutoplay()
    return () => {
      emblaApi.off("select", onSelect)
      stopAutoplay()
    }
  }, [emblaApi, startAutoplay, stopAutoplay])

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 4.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-screen overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={slide.id} className="relative h-full w-full flex-shrink-0">
              {slide.variant === "photo" ? (
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
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
                      <Image src={slide.image} alt={slide.imageAlt} fill className="object-contain drop-shadow-2xl" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/70 to-transparent lg:to-foreground/10" />
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 h-full w-full mx-auto max-w-[1280px] px-6 lg:px-10 flex flex-col justify-end pb-16 md:pb-24">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
                  <div className="flex flex-col gap-5 max-w-2xl">
                    <p className="text-[11px] tracking-[0.4em] uppercase text-background/45 font-light">
                      {slide.eyebrow}
                    </p>

                    <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-semibold text-background tracking-[-0.04em] leading-[0.92] text-balance">
                      {slide.title.map((seg, idx) =>
                        seg.break ? (
                          <br key={idx} />
                        ) : (
                          <span key={idx} className={seg.accent ? "text-accent" : undefined}>
                            {seg.text}
                          </span>
                        ),
                      )}
                    </h1>

                    <p className="text-[15px] text-background/55 leading-relaxed max-w-md">{slide.subheadline}</p>

                    <div className="flex flex-wrap gap-3 mt-1">
                      {slide.cta.href.startsWith("#") ? (
                        <a
                          href={slide.cta.href}
                          className="inline-flex items-center h-12 px-7 rounded-full bg-background text-foreground text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
                        >
                          {slide.cta.label}
                        </a>
                      ) : (
                        <Link
                          href={slide.cta.href}
                          className="inline-flex items-center h-12 px-7 rounded-full bg-background text-foreground text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
                        >
                          {slide.cta.label}
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Stats -- brand-wide, same on every slide */}
                  <div className="flex items-center gap-8 sm:gap-10 lg:gap-8 pb-2 border-t border-background/15 pt-6 lg:border-t-0 lg:pt-0">
                    {stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col items-start lg:items-center">
                        <span className="text-xl sm:text-2xl font-semibold text-background tracking-[-0.02em] tabular-nums">
                          {stat.value}
                        </span>
                        <span className="text-[10px] text-background/40 tracking-[0.1em] uppercase mt-0.5">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Diapositiva anterior"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-background/10 border border-background/25 text-background hover:bg-background/20 transition-colors duration-300"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Siguiente diapositiva"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-background/10 border border-background/25 text-background hover:bg-background/20 transition-colors duration-300"
      >
        <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Ir a diapositiva ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === selectedIndex ? "w-6 bg-background" : "w-1.5 bg-background/35 hover:bg-background/55",
            )}
          />
        ))}
      </div>
    </motion.section>
  )
}
