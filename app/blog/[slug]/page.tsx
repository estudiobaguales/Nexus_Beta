import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog-data"
import { absoluteUrl, SITE_NAME, ORG_LOGO } from "@/lib/site-config"
import { buildMetadata, breadcrumbJsonLd, type Crumb } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { BlogPostPageClient } from "@/components/blog-post-page-client"

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

function crumbsFor(post: { title: string; slug: string }): Crumb[] {
  return [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return buildMetadata({
    title: post.title,
    description: post.excerpt.slice(0, 160),
    path: `/blog/${post.slug}`,
    type: "article",
    image: post.image,
    imageAlt: post.title,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.image)],
    // ISO-8601: antes se pasaba post.date ("28 Abr 2026"), que Google descarta.
    datePublished: post.dateISO,
    dateModified: post.updatedISO ?? post.dateISO,
    articleSection: post.category,
    inLanguage: "es-CL",
    author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl(ORG_LOGO) },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  }

  return (
    <>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd(crumbsFor(post))]} />
      <BlogPostPageClient post={post} />
    </>
  )
}
