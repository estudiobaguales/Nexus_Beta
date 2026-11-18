import type {
  ProductCollectionSortKey,
  ProductSortKey,
  ShopifyCart,
  ShopifyCollection,
  ShopifyProduct,
} from './types'

import { parseShopifyDomain } from './parse-shopify-domain'
import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_KEY } from './constants'
import {
  PRODUCT_INFO_KEYS,
  PRODUCT_INFO_NAMESPACE,
  parseProductInfo,
} from './product-info'

/**
 * Cliente de la Storefront API.
 *
 * Cada funcion recibe un `sf` (ShopifyClient) como primer argumento:
 * - En los loaders (servidor) se usa `storefrontClient(context.storefront)`, que
 *   pasa por el cache de Hydrogen/Oxygen (reemplaza el ISR de Next).
 * - En el navegador (carrito) se usa `publicShopifyClient(domain, token)` con el
 *   token publico de Storefront, igual que antes.
 */
export type ShopifyClient = <T>(args: {
  query: string
  variables?: Record<string, any>
}) => Promise<{ data: T }>

type StorefrontLike = {
  query: (query: string, options?: any) => Promise<any>
  mutate: (query: string, options?: any) => Promise<any>
  CacheShort: () => any
}

/** Cliente de servidor sobre `context.storefront` (cache corto: el catalogo cambia poco). */
export function storefrontClient(storefront: StorefrontLike): ShopifyClient {
  return async ({ query, variables = {} }) => {
    const isMutation = /^\s*mutation\b/.test(query)
    const data = isMutation
      ? await storefront.mutate(query, { variables })
      : await storefront.query(query, { variables, cache: storefront.CacheShort() })
    return { data }
  }
}

const STOREFRONT_API_VERSION = '2025-07'

/** Cliente de navegador con el token publico de Storefront (usado por el carrito). */
export function publicShopifyClient(domain: string, token: string): ShopifyClient {
  const url = `https://${parseShopifyDomain(domain)}/api/${STOREFRONT_API_VERSION}/graphql.json`
  return async ({ query, variables = {} }) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    })
    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Shopify API HTTP error! Status: ${response.status}, Body: ${errorBody}`)
    }
    const json = (await response.json()) as any
    if (json.errors) {
      console.error('Shopify API errors:', json.errors)
      throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
    }
    return json
  }
}

// Flattens the raw `variants { edges { node } }` shape Shopify returns into
// the flat ProductVariant[] the Product type declares (and every consumer expects).
function mapProductNode(node: any): ShopifyProduct {
  return {
    ...node,
    variants: (node.variants?.edges ?? []).map((edge: { node: any }) => edge.node),
  }
}

export type ProductsPage = {
  products: ShopifyProduct[]
  pageInfo: { hasNextPage: boolean; endCursor: string | null }
}

// Get all products
export async function getProducts(
  sf: ShopifyClient,
{
  first = DEFAULT_PAGE_SIZE,
  after,
  sortKey = DEFAULT_SORT_KEY,
  reverse = false,
  query: searchQuery,
}: {
  first?: number
  after?: string
  sortKey?: ProductSortKey
  reverse?: boolean
  query?: string
}): Promise<ProductsPage> {
  const query = /* gql */ `
    query getProducts($first: Int!, $after: String, $sortKey: ProductSortKeys!, $reverse: Boolean, $query: String) {
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, query: $query) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            description
            descriptionHtml
            handle
            availableForSale
            productType
            options {
              id
              name
              values
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  thumbhash
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  sku
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const { data } = await sf<{
    products: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null }
      edges: Array<{ node: any }>
    }
  }>({
    query,
    variables: { first, after, sortKey, reverse, query: searchQuery },
  })

  return {
    products: data.products.edges.map((edge) => mapProductNode(edge.node)),
    pageInfo: data.products.pageInfo,
  }
}

// Get single product by handle
export async function getProduct(
  sf: ShopifyClient,
  handle: string,
): Promise<ShopifyProduct | null> {
  const query = /* gql */ `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        descriptionHtml
        seo {
          title
          description
        }
        metafields(identifiers: [${PRODUCT_INFO_KEYS.map(
          (key) => `{ namespace: "${PRODUCT_INFO_NAMESPACE}", key: "${key}" }`,
        ).join(', ')}]) {
          key
          value
        }
        handle
        availableForSale
        productType
        category {
          id
          name
        }
        options {
          id
          name
          values
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              thumbhash
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              sku
              price {
                amount
                currencyCode
              }
              availableForSale
              quantityAvailable
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `

  const { data } = await sf<{
    product: any | null
  }>({
    query,
    variables: { handle },
  })

  if (!data.product) return null

  const { metafields, ...node } = data.product
  return { ...mapProductNode(node), info: parseProductInfo(metafields) }
}

// Get collections
export async function getCollections(
  sf: ShopifyClient,
  first = 10,
): Promise<ShopifyCollection[]> {
  const query = /* gql */ `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
              thumbhash
            }
          }
        }
      }
    }
  `

  const { data } = await sf<{
    collections: {
      edges: Array<{ node: ShopifyCollection }>
    }
  }>({
    query,
    variables: { first },
  })

  // "frontpage" es la coleccion por defecto de Shopify ("Página de inicio"): no es
  // una categoria real y su pagina queda vacia, asi que no se lista en el sitio.
  return data.collections.edges
    .map((edge) => edge.node)
    .filter((collection) => collection.handle !== "frontpage")
}

// Get a single collection by handle (without its products)
export async function getCollection(
  sf: ShopifyClient,
  handle: string,
): Promise<ShopifyCollection | null> {
  const query = /* gql */ `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        image {
          url
          altText
          thumbhash
        }
      }
    }
  `

  const { data } = await sf<{
    collection: ShopifyCollection | null
  }>({
    query,
    variables: { handle },
  })

  return data.collection
}

// Get products from a specific collection (simplified - no server-side filtering)
export async function getCollectionProducts(
  sf: ShopifyClient,
{
  collection,
  limit = DEFAULT_PAGE_SIZE,
  sortKey = 'RELEVANCE',
  query: searchQuery,
  reverse = false,
}: {
  collection: string
  limit?: number
  sortKey?: ProductCollectionSortKey
  query?: string
  reverse?: boolean
}): Promise<ShopifyProduct[]> {
  const query = /* gql */ `
    query getCollectionProducts($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys!, $reverse: Boolean) {
      collection(handle: $handle) {
        products(first: $first, sortKey: $sortKey, reverse: $reverse) {
          edges {
            node {
              id
              title
              description
              descriptionHtml
              handle
              productType
              category {
                id
                name
              }
              options {
                id
                name
                values
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                    thumbhash
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    sku
                    price {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const { data } = await sf<{
    collection: {
      products: {
        edges: Array<{ node: any }>
      }
    } | null
  }>({
    query,
    variables: {
      handle: collection,
      first: limit,
      sortKey,
      query: searchQuery,
      reverse,
    },
  })

  if (!data.collection) {
    return []
  }

  return data.collection.products.edges.map((edge) => mapProductNode(edge.node))
}

// Create cart
export async function createCart(
  sf: ShopifyClient,
): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartCreate {
      cartCreate {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    sku
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await sf<{
    cartCreate: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({ query })

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message)
  }

  return data.cartCreate.cart
}

// Add items to cart
export async function addCartLines(
  sf: ShopifyClient,
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    sku
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await sf<{
    cartLinesAdd: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({
    query,
    variables: {
      cartId,
      lines,
    }
  })

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message)
  }

  return data.cartLinesAdd.cart
}

// Update items in cart
export async function updateCartLines(
  sf: ShopifyClient,
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    sku
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await sf<{
    cartLinesUpdate: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({
    query,
    variables: {
      cartId,
      lines,
    }
  })

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message)
  }

  return data.cartLinesUpdate.cart
}

// Remove items from cart
export async function removeCartLines(
  sf: ShopifyClient,
  cartId: string,
  lineIds: string[],
): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    sku
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await sf<{
    cartLinesRemove: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({
    query,
    variables: {
      cartId,
      lineIds,
    }
  })

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message)
  }

  return data.cartLinesRemove.cart
}

// Get cart
export async function getCart(
  sf: ShopifyClient,
  cartId: string,
): Promise<ShopifyCart | null> {
  const query = /* gql */ `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  sku
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    title
                    handle
                    images(first: 10) {
                      edges {
                        node {
                          url
                          altText
                          thumbhash
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        checkoutUrl
      }
    }
  `

  const { data } = await sf<{
    cart: ShopifyCart | null
  }>({
    query,
    variables: { cartId }
  })

  return data.cart
}
