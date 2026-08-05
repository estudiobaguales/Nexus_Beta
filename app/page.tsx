import { getProducts, getCollections } from "@/lib/shopify"
import type { Product, ShopifyCollection } from "@/lib/shopify/types"
import { HomeClient } from "@/components/home-client"

// La home consulta Shopify (productos destacados + categorias). Sin esto se
// renderiza en cada request.
export const revalidate = 300

export default async function Home() {
  const [productsResult, collectionsResult] = await Promise.allSettled([
    getProducts({ first: 50 }),
    getCollections(),
  ])

  const products: Product[] =
    productsResult.status === "fulfilled" ? productsResult.value.products : []
  const collections: ShopifyCollection[] =
    collectionsResult.status === "fulfilled" ? collectionsResult.value : []

  if (productsResult.status === "rejected") {
    console.error("Error fetching products:", productsResult.reason)
  }
  if (collectionsResult.status === "rejected") {
    console.error("Error fetching collections:", collectionsResult.reason)
  }

  return <HomeClient products={products} collections={collections} />
}
