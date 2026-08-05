import type { Product } from "@/lib/shopify/types"

export type SortOption = "featured" | "price-asc" | "price-desc" | "name"

export const sortLabels: Record<SortOption, string> = {
  featured: "Destacados",
  "price-asc": "Menor precio",
  "price-desc": "Mayor precio",
  name: "A - Z",
}

const price = (p: Product) => parseFloat(p.priceRange.minVariantPrice.amount)

/**
 * Orden de catalogo en cliente. Estaba duplicado literal en products-page-client
 * y collection-page-client. "featured" respeta el orden que devuelve Shopify.
 */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  switch (sort) {
    case "price-asc":
      return [...products].sort((a, b) => price(a) - price(b))
    case "price-desc":
      return [...products].sort((a, b) => price(b) - price(a))
    case "name":
      return [...products].sort((a, b) => a.title.localeCompare(b.title))
    default:
      return products
  }
}
