import { getProducts } from "@/lib/shopify"
import type { Product } from "@/lib/shopify/types"
import { HomeClient } from "@/components/home-client"

export default async function Home() {
  let products: Product[] = []

  try {
    ;({ products } = await getProducts({ first: 50 }))
  } catch (error) {
    console.error("Error fetching products:", error)
    products = []
  }

  return <HomeClient products={products} />
}
