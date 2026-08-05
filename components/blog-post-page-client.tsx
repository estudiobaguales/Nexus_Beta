"use client"

import Image from "next/image"
import { Clock } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { Breadcrumbs } from "@/components/breadcrumbs"
import type { BlogPost } from "@/lib/blog-data"

export function BlogPostPageClient({ post }: { post: BlogPost }) {
  return (
    <SiteShell>
      <article className="py-16 lg:py-20">
        <div className="mx-auto max-w-[820px] px-6 lg:px-10">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <div className="flex items-center gap-3 mb-4">
            <span className="text-eyebrow tracking-[0.1em] uppercase text-accent font-medium">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-caption text-muted-foreground">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              {post.readTime}
            </div>
          </div>

          <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.03em] text-foreground leading-[1.1]">
            {post.title}
          </h1>

          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-secondary mt-8 mb-10">
            <Image src={post.image} alt={post.title} fill priority sizes="(max-width: 820px) 100vw, 820px" className="object-cover" />
          </div>

          {/* TODO: reemplazar por contenido real del articulo (Fase 7) */}
          <div className="text-body-lg text-muted-foreground space-y-4">
            <p>{post.excerpt}</p>
          </div>
        </div>
      </article>
    </SiteShell>
  )
}
