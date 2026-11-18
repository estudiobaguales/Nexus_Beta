import type { Product, ProductVariant } from './types'

export function getShopifyProductId(globalId: string) {
  const segments = globalId.split('/')
  return segments.pop() ?? globalId
}

export function getFirstAvailableVariant(product: Product): ProductVariant | null {
  return product.variants.find((variant) => variant.availableForSale) ?? null
}
