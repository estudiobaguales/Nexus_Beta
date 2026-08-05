"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { Clock, ArrowUpRight } from "lucide-react"
import { getRelatedPosts } from "@/lib/blog-data"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"

/**
 * Articulos relacionados del PDP: como jugar o como usar este producto.
 *
 * La cascada (producto -> deporte -> marca) vive en getRelatedPosts, en blog-data.
 * Si no devuelve nada, el bloque no se renderiza: no hay estado vacio que mostrar.
 *
 * A proposito sin imagenes, a diferencia de FeaturedPosts y ShopBlogCta: en el PDP
 * la fotografia del producto manda, y tres miniaturas mas compiten con ella. Ademas
 * evita cargar tres imagenes por debajo del fold en la pagina que mas pesa.
 */
export function RelatedArticles({
  productHandle,
  productType,
}: {
  productHandle: string
  productType: string | null
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const posts = getRelatedPosts({ productHandle, sport: productType })

  if (posts.length === 0) return null

  return (
    <Section ref={ref} spacing="content" aria-labelledby="relacionados-blog-titulo">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eyebrow className="mb-3">Cómo se juega</Eyebrow>
        <h2
          id="relacionados-blog-titulo"
          className="text-subsection font-semibold tracking-[-0.03em] text-foreground text-balance"
        >
          Saca más de tu equipamiento.
        </h2>
      </motion.div>

      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map((post, i) => (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <article className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors duration-300 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="text-micro tracking-[0.1em] uppercase text-accent font-medium">
                  {post.category}
                </span>

                <h3 className="mt-3 text-body font-semibold tracking-[-0.01em] text-foreground leading-snug transition-colors duration-300 group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 text-ui text-muted-foreground line-clamp-2">{post.excerpt}</p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  {post.readTime ? (
                    <span className="flex items-center gap-1.5 text-eyebrow text-muted-foreground">
                      <Clock className="h-3 w-3" strokeWidth={1.5} />
                      {post.readTime}
                    </span>
                  ) : (
                    <span />
                  )}
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            </article>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
