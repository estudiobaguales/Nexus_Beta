import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCollections, getCollection, getCollectionProducts } from "@/lib/shopify"
import { absoluteUrl } from "@/lib/site-config"
import { CollectionPageClient } from "@/components/collection-page-client"

export async function generateStaticParams() {
  try {
    const collections = await getCollections()
    return collections.map((c) => ({ handle: c.handle }))
  } catch {
    return []
  }
}

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const collection = await getCollection(handle).catch(() => null)
  if (!collection) return {}

  const url = `/productos/categoria/${collection.handle}`
  const description = collection.description?.slice(0, 160) || `Productos de la categoria ${collection.title} en Nexus.`

  return {
    title: `${collection.title} | Tienda | Nexus`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${collection.title} | Nexus`,
      description,
      url,
      type: "website",
      images: collection.image ? [{ url: collection.image.url, alt: collection.image.altText || collection.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection.title} | Nexus`,
      description,
      images: collection.image ? [collection.image.url] : undefined,
    },
  }
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const collection = await getCollection(handle).catch(() => null)
  if (!collection) notFound()

  const products = await getCollectionProducts({ collection: handle }).catch(() => [])

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Tienda", item: absoluteUrl("/productos") },
      { "@type": "ListItem", position: 3, name: collection.title, item: absoluteUrl(`/productos/categoria/${collection.handle}`) },
    ],
  }

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/productos/${p.handle}`),
      name: p.title,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {products.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      )}
      <CollectionPageClient collection={collection} products={products} />
    </>
  )
}
