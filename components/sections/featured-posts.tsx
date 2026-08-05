"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { Clock, ArrowRight, ArrowUpRight } from "lucide-react"
import { blogPosts, type BlogPost } from "@/lib/blog-data"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Button } from "@/components/ui/button"
import type { SectionTone } from "@/components/ui/section"

/**
 * Bloque 7 de la home: 3 articulos destacados.
 * Toma el destacado del blog primero y completa con los mas recientes por dateISO.
 * El tiempo de lectura se muestra solo si el dato existe.
 */
function pickFeatured(count = 3) {
  const byDate = [...blogPosts].sort((a, b) => b.dateISO.localeCompare(a.dateISO))
  const featured = byDate.filter((p) => p.featured)
  const rest = byDate.filter((p) => !p.featured)
  return [...featured, ...rest].slice(0, count)
}

/**
 * Los props son todos opcionales y sus defaults son exactamente lo que la home
 * mostraba antes, para poder reusar el bloque en paginas interiores
 * (Nexuniversity) sin duplicar la grilla de tarjetas.
 */
export function FeaturedPosts({
  eyebrow = "Blog",
  title = (
    <>
      Guías y <span className="text-muted-foreground">novedades.</span>
    </>
  ),
  posts: postsProp,
  tone = "muted",
}: {
  eyebrow?: string
  title?: React.ReactNode
  posts?: BlogPost[]
  tone?: SectionTone
} = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const posts = postsProp ?? pickFeatured()

  if (posts.length === 0) return null

  return (
    <Section ref={ref} tone={tone} aria-labelledby="blog-titulo">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          <h2
            id="blog-titulo"
            className="text-section font-semibold tracking-[-0.035em] text-foreground"
          >
            {title}
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button asChild variant="outline" size="md" className="group font-medium">
            <Link href="/blog">
              Ver todo el blog
              <ArrowRight
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={1.5}
              />
            </Link>
          </Button>
        </motion.div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {posts.map((post, i) => (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <article className="group h-full">
              <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-secondary mb-5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-3.5 w-3.5 text-foreground" strokeWidth={1.5} />
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-micro tracking-[0.1em] uppercase text-accent font-medium">
                    {post.category}
                  </span>
                  <span aria-hidden className="w-1 h-1 rounded-full bg-border" />
                  <time dateTime={post.dateISO} className="text-eyebrow text-muted-foreground">
                    {post.date}
                  </time>
                </div>

                <h3 className="text-body-lg font-semibold tracking-[-0.01em] text-foreground leading-snug transition-colors duration-300 group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 text-ui text-muted-foreground line-clamp-2">{post.excerpt}</p>

                {post.readTime && (
                  <p className="mt-4 flex items-center gap-1.5 text-eyebrow text-muted-foreground">
                    <Clock className="w-3 h-3" strokeWidth={1.5} />
                    {post.readTime}
                  </p>
                )}
              </Link>
            </article>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
