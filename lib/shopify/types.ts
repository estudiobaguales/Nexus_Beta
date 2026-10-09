export type Money = {
  amount: string
  currencyCode: string
}

export type SelectedOption = {
  name: string
  value: string
}

export type ProductVariant = {
  id: string
  title: string
  /** SKU real de Shopify. Puede venir null si el producto no lo define. */
  sku?: string | null
  availableForSale: boolean
  /**
   * Stock real de la variante.
   *
   * Shopify solo lo entrega si el producto tiene inventario con seguimiento y el
   * token tiene el scope unauthenticated_read_product_inventory. Si no, viene
   * null o undefined y el consumidor no debe asumir un tope.
   * Hoy lo pide getProduct (el PDP); las queries de listado no lo necesitan.
   */
  quantityAvailable?: number | null
  selectedOptions: SelectedOption[]
  price: Money
}

export type ProductImage = {
  url: string
  altText: string | null
  thumbhash?: string | null
}

export type ProductOption = {
  id: string
  name: string
  values: string[]
}

export type ProductInfoItem = {
  title: string | null
  text: string
}

export type ProductInfoGroup = {
  title: string | null
  items: string[]
}

export type PackageItem = {
  quantity: string | null
  label: string
}

/** Ficha estructurada del PDP. Sale de metafields; ver lib/shopify/product-info.ts. */
export type ProductInfo = {
  shortDescription: string | null
  features: ProductInfoItem[]
  highlights: ProductInfoItem[]
  packageContents: PackageItem[]
  howToPlay: ProductInfoGroup[]
  techSpecs: ProductInfoItem[]
}

export type Product = {
  id: string
  title: string
  description: string
  descriptionHtml: string
  /**
   * Meta title/description cargados en Shopify (Admin > Producto > SEO).
   * Solo lo pide getProduct (el PDP); vienen null si no se definieron.
   */
  seo?: {
    title: string | null
    description: string | null
  } | null
  /** Solo lo pide getProduct (el PDP). null si el producto no tiene ficha cargada. */
  info?: ProductInfo | null
  handle: string
  availableForSale: boolean
  productType: string | null
  category?: {
    id: string
    name: string
  } | null
  options: ProductOption[]
  images: {
    edges: Array<{ node: ProductImage }>
  }
  priceRange: {
    minVariantPrice: Money
  }
  compareAtPriceRange?: {
    minVariantPrice: Money | null
  } | null
  variants: ProductVariant[]
}

export type ShopifyProduct = Product

export type ShopifyCollection = {
  id: string
  title: string
  handle: string
  description: string
  image: {
    url: string
    altText: string | null
    thumbhash?: string | null
  } | null
}

export type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: ProductVariant & {
    product: {
      title: string
      handle?: string
      images: {
        edges: Array<{ node: ProductImage }>
      }
    }
  }
}

export type ShopifyCart = {
  id: string
  lines: {
    edges: Array<{ node: ShopifyCartLine }>
  }
  cost: {
    totalAmount: Money
    subtotalAmount?: Money
    totalTaxAmount?: Money | null
  }
  checkoutUrl: string
}

export type ProductSortKey =
  | 'TITLE'
  | 'CREATED_AT'
  | 'PRICE'
  | 'BEST_SELLING'
  | 'RELEVANCE'

export type ProductCollectionSortKey =
  | 'TITLE'
  | 'PRICE'
  | 'BEST_SELLING'
  | 'MANUAL'
  | 'CREATED'
