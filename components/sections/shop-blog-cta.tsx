"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { Clock, ArrowRight, ArrowUpRight } from "lucide-react"
import { getFeaturedPost } from "@/lib/blog-data"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Button } from "@/components/ui/button"

/**
 * Cierre de /productos: invita a conocer los deportes y las modalidades Nexus
 * en el blog.
 *
 * A proposito NO reutiliza FeaturedPosts: ese bloque es una seccion de marketing
 * de tres columnas con H2 grande, y puesto debajo de la grilla competiria con
 * ella. Aca la escala es menor (spacing="content", H2 en text-subsection, un solo
 * articulo en tarjeta horizontal) para que se lea como pie de pagina de catalogo.
 *
 * El destacado sale de getFeaturedPost(): el flag manual `featured` de blog-data,
 * porque el proyecto no tiene metrica de lecturas.
 */
export function ShopBlogCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const post = getFeaturedPost()

  // Sin articulos no hay bloque: mejor no renderizar que dejar un cierre vacio.
  if (!post) return null

  return (
    <Section
      ref={ref}
      tone="muted"
      spacing="content"
      aria-labelledby="blog-tienda-titulo"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <Eyebrow className="mb-3">Antes de comprar</Eyebrow>
          <h2
            id="blog-tienda-titulo"
            className="text-subsection font-semibold tracking-[-0.03em] text-foreground text-balance"
          >
            Conoce los deportes y las modalidades Nexus.
          </h2>
          <p className="mt-3 text-body text-muted-foreground max-w-md">
            Guías de reglas, formatos de juego y cómo elegir tu equipamiento, escritas
            por el equipo que arma las canchas.
          </p>
        </div>

        <Button asChild variant="outline" size="md" className="group shrink-0 font-medium">
          <Link href="/blog">
            Ver todo el blog
            <ArrowRight
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={1.5}
            />
          </Link>
        </Button>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8"
      >
        <Link
          href={`/blog/${post.slug}`}
          className="group grid grid-cols-1 gap-5 rounded-2xl border border-border bg-card p-4 transition-colors duration-300 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:grid-cols-[minmax(0,17rem)_1fr] sm:gap-6 sm:p-5"
        >
          {/* aspect-ratio fijo: reserva el espacio antes de que cargue la imagen */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-secondary">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, 17rem"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="text-micro tracking-[0.1em] uppercase text-accent font-medium">
                {post.category}
              </span>
              <span aria-hidden className="w-1 h-1 rounded-full bg-border" />
              <time dateTime={post.dateISO} className="text-eyebrow text-muted-foreground">
                {post.date}
              </time>
            </div>

            <h3 className="mt-3 text-body-lg font-semibold tracking-[-0.01em] text-foreground leading-snug transition-colors duration-300 group-hover:text-accent">
              {post.title}
            </h3>
            <p className="mt-2 text-ui text-muted-foreground line-clamp-2">{post.excerpt}</p>

            <div className="mt-4 flex items-center gap-4">
              {post.readTime && (
                <p className="flex items-center gap-1.5 text-eyebrow text-muted-foreground">
                  <Clock className="w-3 h-3" strokeWidth={1.5} />
                  {post.readTime}
                </p>
              )}
              <span className="flex items-center gap-1 text-eyebrow font-medium text-foreground">
                Leer el artículo
                <ArrowUpRight
                  className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    </Section>
  )
}
