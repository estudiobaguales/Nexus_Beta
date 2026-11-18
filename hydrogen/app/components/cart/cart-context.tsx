"use client"

import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from "react"
import type { Product, ProductVariant, ShopifyCart, ShopifyCartLine } from "@/lib/shopify/types"
import { createCart, addCartLines, updateCartLines, removeCartLines, getCart, publicShopifyClient } from "@/lib/shopify"
import { getCartIdCookie, setCartIdCookie, clearCartIdCookie } from "@/lib/cart-cookie"

type CartContextType = {
  cart: ShopifyCart | null
  isOpen: boolean
  isLoading: boolean
  openCart: () => void
  closeCart: () => void
  /** `quantity` es opcional y por defecto 1: las cards del catalogo siguen llamando addItem(variant, product). */
  addItem: (variant: ProductVariant, product: Product, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  totalQuantity: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

/**
 * El carrito vive en el navegador y habla directo con la Storefront API usando el
 * token publico (el mismo flujo que en Next). `storeDomain` y `storefrontToken`
 * llegan desde el loader raiz (app/root.tsx), que los lee del entorno de Oxygen.
 */
export function CartProvider({
  children,
  storeDomain,
  storefrontToken,
}: {
  children: ReactNode
  storeDomain: string
  storefrontToken: string
}) {
  const sf = useMemo(() => publicShopifyClient(storeDomain, storefrontToken), [storeDomain, storefrontToken])
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const existingCartId = getCartIdCookie()
    if (!existingCartId) return
    getCart(sf, existingCartId)
      .then((existingCart) => {
        if (existingCart) {
          setCart(existingCart)
        } else {
          // Cart expired or was completed at checkout.
          clearCartIdCookie()
        }
      })
      .catch((error) => console.error("Error hydrating cart:", error))
  }, [sf])

  const ensureCart = useCallback(async () => {
    if (cart) return cart
    const newCart = await createCart(sf)
    setCart(newCart)
    setCartIdCookie(newCart.id)
    return newCart
  }, [cart, sf])

  const addItem = useCallback(
    async (variant: ProductVariant, _product: Product, quantity = 1) => {
      setIsLoading(true)
      try {
        const currentCart = await ensureCart()
        const updatedCart = await addCartLines(sf, currentCart.id, [
          // Entero y >= 1: el input de cantidad del PDP acepta escritura libre.
          { merchandiseId: variant.id, quantity: Math.max(1, Math.floor(quantity)) },
        ])
        setCart(updatedCart)
        setIsOpen(true)
      } catch (error) {
        console.error("Error adding to cart:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [ensureCart]
  )

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return
      setIsLoading(true)
      try {
        const updatedCart = await updateCartLines(sf, cart.id, [{ id: lineId, quantity }])
        setCart(updatedCart)
      } catch (error) {
        console.error("Error updating cart:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart, sf]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return
      setIsLoading(true)
      try {
        const updatedCart = await removeCartLines(sf, cart.id, [lineId])
        setCart(updatedCart)
      } catch (error) {
        console.error("Error removing from cart:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart, sf]
  )

  const totalQuantity = cart?.lines.edges.reduce(
    (total: number, edge: { node: ShopifyCartLine }) => total + edge.node.quantity,
    0
  ) ?? 0

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
