import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProduct, getProducts } from "@/lib/shopify"
import { absoluteUrl } from "@/lib/site-config"
import { ProductDetailPageClient } from "@/components/product-detail-page-client"

export async function generateStaticParams() {
  try {
    const products = await getProducts({ first: 100 })
    return products.map((p) => ({ handle: p.handle }))
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
  const product = await getProduct(handle).catch(() => null)
  if (!product) return {}

  const image = product.images.edges[0]?.node
  const description = product.description.slice(0, 160)
  const url = `/productos/${product.handle}`

  return {
    title: `${product.title} | Nexus`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: product.title,
      description,
      url,
      type: "website",
      images: image ? [{ url: image.url, alt: image.altText || product.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: image ? [image.url] : undefined,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await getProduct(handle).catch(() => null)
  if (!product) notFound()

  const price = product.priceRange.minVariantPrice
  const image = product.images.edges[0]?.node

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: image ? [absoluteUrl(image.url)] : undefined,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: price.currencyCode,
      price: price.amount,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: absoluteUrl(`/productos/${product.handle}`),
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Tienda", item: absoluteUrl("/productos") },
      { "@type": "ListItem", position: 3, name: product.title, item: absoluteUrl(`/productos/${product.handle}`) },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ProductDetailPageClient product={product} />
    </>
  )
}
