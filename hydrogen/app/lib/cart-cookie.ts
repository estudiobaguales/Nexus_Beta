"use client"

// Not httpOnly on purpose: the cart id is not a credential (it only points to
// an empty-until-purchase Shopify cart, and checkout itself happens on
// Shopify's own authenticated domain). Cart mutations already run entirely in
// client components against the public Storefront token, so reading/writing
// this cookie client-side avoids adding a server round-trip for every
// add/remove/update just to keep the id in sync.
const CART_ID_COOKIE = "nexus_cart_id"
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30 // 30 days

export function getCartIdCookie(): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CART_ID_COOKIE}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function setCartIdCookie(cartId: string) {
  if (typeof document === "undefined") return
  document.cookie = `${CART_ID_COOKIE}=${encodeURIComponent(cartId)}; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax`
}

export function clearCartIdCookie() {
  if (typeof document === "undefined") return
  document.cookie = `${CART_ID_COOKIE}=; path=/; max-age=0; samesite=lax`
}
