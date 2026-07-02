"use client"

import Image from "next/image"
import { Clock } from "lucide-react"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import type { BlogPost } from "@/lib/blog-data"

function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
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
              <span className="text-[11px] tracking-[0.1em] uppercase text-accent font-medium">{post.category}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[12px] text-muted-foreground">{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.03em] text-foreground leading-[1.1]">
              {post.title}
            </h1>

            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-secondary mt-8 mb-10">
              <Image src={post.image} alt={post.title} fill priority className="object-cover" />
            </div>

            {/* TODO: reemplazar por contenido real del articulo */}
            <div className="text-[16px] text-muted-foreground leading-relaxed space-y-4">
              <p>{post.excerpt}</p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

export function BlogPostPageClient({ post }: { post: BlogPost }) {
  return (
    <CartProvider>
      <BlogPostContent post={post} />
    </CartProvider>
  )
}
