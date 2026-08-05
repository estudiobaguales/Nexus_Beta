import type { Metadata } from "next"
import { BlogPageClient } from "@/components/blog-page-client"
import { JsonLd } from "@/components/json-ld"
import { buildMetadata, breadcrumbJsonLd, type Crumb } from "@/lib/seo"

const crumbs: Crumb[] = [
  { label: "Inicio", href: "/" },
  { label: "Blog", href: "/blog" },
]

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Noticias, guias, consejos y todo lo que necesitas saber sobre roundnet en Chile.",
  path: "/blog",
})

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <BlogPageClient />
    </>
  )
}
