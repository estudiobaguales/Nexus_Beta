import { BlogPageClient } from "@/components/blog-page-client"
import { absoluteUrl } from "@/lib/site-config"

export const metadata = {
  title: "Blog | Nexus",
  description: "Noticias, guias, consejos y todo lo que necesitas saber sobre roundnet en Chile.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Nexus",
    description: "Noticias, guias, consejos y todo lo que necesitas saber sobre roundnet en Chile.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Nexus",
    description: "Noticias, guias, consejos y todo lo que necesitas saber sobre roundnet en Chile.",
  },
}

export default function BlogPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BlogPageClient />
    </>
  )
}
