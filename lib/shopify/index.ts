import {
  ProductCollectionSortKey,
  ProductSortKey,
  ShopifyCart,
  ShopifyCollection,
  ShopifyProduct,
} from './types'

import { parseShopifyDomain } from './parse-shopify-domain'
import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_KEY } from './constants'

const rawStoreDomain =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN
const fallbackStoreDomain = 'v0-template.myshopify.com'
const SHOPIFY_STORE_DOMAIN = rawStoreDomain
  ? parseShopifyDomain(rawStoreDomain)
  : fallbackStoreDomain

const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

const SHOPIFY_STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`

// Tokenless Shopify API request
async function shopifyFetch<T>({
  query,
  variables = {},
  cache,
}: {
  query: string
  variables?: Record<string, any>
  // Cart mutations pass 'no-store' explicitly (always dynamic). Catalog reads
  // omit this so the calling route's `revalidate` config controls ISR caching.
  cache?: RequestCache
}): Promise<{ data: T; errors?: any[] }> {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(SHOPIFY_STOREFRONT_ACCESS_TOKEN
          ? { 'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN }
          : {}),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      ...(cache ? { cache } : {}),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(
        `Shopify API HTTP error! Status: ${response.status}, Body: ${errorBody}`,
      )
    }

    const json = await response.json()

    if (json.errors) {
      console.error('Shopify API errors:', json.errors)
      throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
    }

    return json
  } catch (error) {
    console.error('Shopify fetch error:', error)
    throw error
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
export async function getProducts({
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

  const { data } = await shopifyFetch<{
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
  handle: string,
): Promise<ShopifyProduct | null> {
  const query = /* gql */ `
    query getProduct($handle: String!) {
      product(handle: $handle) {
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

  const { data } = await shopifyFetch<{
    product: any | null
  }>({
    query,
    variables: { handle },
  })

  return data.product ? mapProductNode(data.product) : null
}

// Get collections
export async function getCollections(first = 10): Promise<ShopifyCollection[]> {
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

  const { data } = await shopifyFetch<{
    collections: {
      edges: Array<{ node: ShopifyCollection }>
    }
  }>({
    query,
    variables: { first },
  })

  return data.collections.edges.map((edge) => edge.node)
}

// Get a single collection by handle (without its products)
export async function getCollection(handle: string): Promise<ShopifyCollection | null> {
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

  const { data } = await shopifyFetch<{
    collection: ShopifyCollection | null
  }>({
    query,
    variables: { handle },
  })

  return data.collection
}

// Get products from a specific collection (simplified - no server-side filtering)
export async function getCollectionProducts({
  collection,
  limit = DEFAULT_PAGE_SIZE,
  sortKey = DEFAULT_SORT_KEY,
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

  const { data } = await shopifyFetch<{
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
export async function createCart(): Promise<ShopifyCart> {
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

  const { data } = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({ query, cache: 'no-store' })

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message)
  }

  return data.cartCreate.cart
}

// Add items to cart
export async function addCartLines(
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

  const { data } = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({
    query,
    variables: {
      cartId,
      lines,
    },
    cache: 'no-store',
  })

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message)
  }

  return data.cartLinesAdd.cart
}

// Update items in cart
export async function updateCartLines(
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

  const { data } = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({
    query,
    variables: {
      cartId,
      lines,
    },
    cache: 'no-store',
  })

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message)
  }

  return data.cartLinesUpdate.cart
}

// Remove items from cart
export async function removeCartLines(
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

  const { data } = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({
    query,
    variables: {
      cartId,
      lineIds,
    },
    cache: 'no-store',
  })

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message)
  }

  return data.cartLinesRemove.cart
}

// Get cart
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
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

  const { data } = await shopifyFetch<{
    cart: ShopifyCart | null
  }>({
    query,
    variables: { cartId },
    cache: 'no-store',
  })

  return data.cart
}
