import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProduct, getProducts } from "@/lib/shopify"
import { getFirstAvailableVariant } from "@/lib/shopify/utils"
import { absoluteUrl, SITE_NAME } from "@/lib/site-config"
import { buildMetadata, breadcrumbJsonLd, type Crumb } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { ProductDetailPageClient } from "@/components/product-detail-page-client"

export async function generateStaticParams() {
  try {
    const { products } = await getProducts({ first: 100 })
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

  return buildMetadata({
    title: product.title,
    description: product.description.slice(0, 160),
    path: `/productos/${product.handle}`,
    ...(image ? { image: image.url, imageAlt: image.altText || product.title } : {}),
  })
}

/** Google pide priceValidUntil en la oferta; sin un dato real, se proyecta un ano. */
function oneYearFromNow(): string {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  return date.toISOString().split("T")[0]
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
  const url = absoluteUrl(`/productos/${product.handle}`)

  // Antes se usaba product.id, que es el GID crudo de Shopify
  // ("gid://shopify/Product/123") y no es un SKU valido.
  const variant = getFirstAvailableVariant(product) ?? product.variants[0]
  const sku = variant?.sku || product.handle

  const crumbs: Crumb[] = [
    { label: "Inicio", href: "/" },
    { label: "Tienda", href: "/productos" },
    { label: product.title, href: `/productos/${product.handle}` },
  ]

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: image ? [absoluteUrl(image.url)] : undefined,
    sku,
    ...(product.productType ? { category: product.productType } : {}),
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      priceCurrency: price.currencyCode,
      price: price.amount,
      priceValidUntil: oneYearFromNow(),
      itemCondition: "https://schema.org/NewCondition",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url,
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  }

  return (
    <>
      <JsonLd data={[productJsonLd, breadcrumbJsonLd(crumbs)]} />
      <ProductDetailPageClient product={product} />
    </>
  )
}
