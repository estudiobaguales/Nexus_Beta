"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { FilterPill } from "@/components/ui/filter-pill"
import { PageHero } from "@/components/ui/page-hero"
import { blogPosts, type BlogPost } from "@/lib/blog-data"

const categories = ["Todos", "Guias", "Torneos", "Comunidad", "Producto", "Tips"]

const posts = blogPosts

function FeaturedPost({ post }: { post: BlogPost }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 620px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="text-micro tracking-[0.1em] uppercase bg-accent text-accent-foreground px-3 py-1.5 rounded-full font-semibold">
              Destacado
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-eyebrow tracking-[0.1em] uppercase text-accent font-medium">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-caption text-muted-foreground">{post.date}</span>
          </div>
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground leading-[1.1] group-hover:text-accent transition-colors duration-300">
            {post.title}
          </h2>
          <p className="mt-4 text-body text-muted-foreground leading-relaxed max-w-md">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              {post.readTime}
            </div>
            <span className="group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1.5 text-caption text-foreground font-medium">
              Leer articulo <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-secondary mb-5">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-foreground" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-micro tracking-[0.1em] uppercase text-accent font-medium">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-eyebrow text-muted-foreground">{post.date}</span>
        </div>
        <h3 className="text-body-lg font-semibold tracking-[-0.01em] text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
          {post.title}
        </h3>
        <p className="mt-2 text-ui text-muted-foreground leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-1.5 mt-4 text-eyebrow text-muted-foreground">
          <Clock className="w-3 h-3" strokeWidth={1.5} />
          {post.readTime}
        </div>
      </Link>
    </motion.article>
  )
}

function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("Todos")

  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  const filtered = activeCategory === "Todos"
    ? rest
    : rest.filter((p) => p.category === activeCategory)

  return (
    <SiteShell>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        eyebrow="Blog"
        title="Noticias y guias."
        lede="Tips, torneos, lanzamientos y todo lo que pasa en la comunidad Nexus."
      />

      {/* Featured article */}
      {featured && (
        <Section spacing="content">
          <FeaturedPost post={featured} />
        </Section>
      )}

      {/* Category filter + articles grid */}
      <Section spacing="marketing" className="pt-0">
        <div className="flex items-center gap-2 overflow-x-auto mb-12 pb-6 border-b border-border">
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </FilterPill>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filtered.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 gap-3 text-center">
            <p className="text-body text-muted-foreground">No hay articulos en esta categoria aun.</p>
            <Button size="sm" onClick={() => setActiveCategory("Todos")}>
              Ver todos
            </Button>
          </div>
        )}
      </Section>
    </SiteShell>
  )
}

export function BlogPageClient() {
  return <BlogContent />
}
