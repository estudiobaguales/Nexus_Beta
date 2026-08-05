import type { Metadata } from "next"
import { getProducts } from "@/lib/shopify"
import type { Product } from "@/lib/shopify/types"
import { ProductsPageClient } from "@/components/products-page-client"
import { JsonLd } from "@/components/json-ld"
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd, type Crumb } from "@/lib/seo"

const crumbs: Crumb[] = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/productos" },
]

export const metadata: Metadata = buildMetadata({
  title: "Tienda",
  description: "Equipamiento para Pickleball, Cornhole, Spikeball, KanJam y Bocce. Sets completos y accesorios.",
  path: "/productos",
})

export const revalidate = 60

export default async function ProductosPage() {
  let products: Product[] = []

  try {
    ;({ products } = await getProducts({ first: 50 }))
  } catch {
    products = []
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          products.length > 0 ? itemListJsonLd(products.slice(0, 20)) : null,
        ]}
      />
      <ProductsPageClient products={products} />
    </>
  )
}
