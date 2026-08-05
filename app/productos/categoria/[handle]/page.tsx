import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCollections, getCollection, getCollectionProducts } from "@/lib/shopify"
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd, type Crumb } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
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

  return buildMetadata({
    title: `${collection.title} | Tienda`,
    description:
      collection.description?.slice(0, 160) || `Productos de la categoria ${collection.title} en Nexus.`,
    path: `/productos/categoria/${collection.handle}`,
    ...(collection.image
      ? { image: collection.image.url, imageAlt: collection.image.altText || collection.title }
      : {}),
  })
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

  const crumbs: Crumb[] = [
    { label: "Inicio", href: "/" },
    { label: "Tienda", href: "/productos" },
    { label: collection.title, href: `/productos/categoria/${collection.handle}` },
  ]

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          products.length > 0 ? itemListJsonLd(products.slice(0, 20)) : null,
        ]}
      />
      <CollectionPageClient collection={collection} products={products} />
    </>
  )
}
