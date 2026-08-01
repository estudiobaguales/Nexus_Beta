import { getProducts } from "@/lib/shopify"
import type { Product } from "@/lib/shopify/types"
import { ProductsPageClient } from "@/components/products-page-client"
import { absoluteUrl } from "@/lib/site-config"

export const metadata = {
  title: "Tienda | Nexus",
  description: "Equipamiento para Pickleball, Cornhole, Spikeball, KanJam y Bocce. Sets completos y accesorios.",
  alternates: { canonical: "/productos" },
  openGraph: {
    title: "Tienda | Nexus",
    description: "Equipamiento para Pickleball, Cornhole, Spikeball, KanJam y Bocce. Sets completos y accesorios.",
    url: "/productos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda | Nexus",
    description: "Equipamiento para Pickleball, Cornhole, Spikeball, KanJam y Bocce. Sets completos y accesorios.",
  },
}

export const revalidate = 60

export default async function ProductosPage() {
  let products: Product[] = []

  try {
    ;({ products } = await getProducts({ first: 50 }))
  } catch {
    products = []
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Tienda", item: absoluteUrl("/productos") },
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
      <ProductsPageClient products={products} />
    </>
  )
}
