/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Optimizacion activada: sin esto no hay WebP/AVIF, ni srcset, y los `sizes`
    // que declaran los componentes no sirven de nada.
    // VERIFICAR en el host de deploy real: si no es Vercel, el optimizador necesita
    // soporte del runtime (en export estatico hay que volver a unoptimized: true).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
  env: {
    // Expose the connected Shopify store domain to the client (cart runs client-side).
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
}

export default nextConfig
