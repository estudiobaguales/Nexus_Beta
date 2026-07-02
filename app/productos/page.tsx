import { getProducts } from "@/lib/shopify"
import type { Product } from "@/lib/shopify/types"
import { ProductsPageClient } from "@/components/products-page-client"

export const metadata = {
  title: "Tienda | Nexus",
  description: "Equipamiento para Pickleball, Cornhole, Spikeball, KanJam y Bocce. Sets completos y accesorios.",
}

export default async function ProductosPage() {
  let products: Product[] = []

  try {
    products = await getProducts({ first: 50 })
  } catch {
    products = []
  }

  return <ProductsPageClient products={products} />
}
