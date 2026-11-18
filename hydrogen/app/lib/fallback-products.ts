import type { Product } from "@/lib/shopify/types"

/**
 * Catalogo de respaldo para cuando la Storefront API de Shopify no responde o el
 * entorno todavia no tiene credenciales (ver .env.example).
 *
 * Estaba duplicado en products-page-client.tsx y en sections/products-section.tsx,
 * con listas y precios distintos entre si.
 *
 * TODO: los precios estan en USD mientras el sitio factura en CLP. Revisar antes de
 * publicar, o dejar la home vacia en vez de mostrar montos que no corresponden.
 */
export const fallbackProducts: Product[] = [
  {
    id: "0", title: "Set de Linderball Nexus", description: "Pelota de espuma en forma de anillo con mas de 16 mecanicas de lanzamiento. Incluye 2 anillos y guia de juego.", handle: "set-de-linderball-nexus", availableForSale: true, productType: "Linderball", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/prod-linderball.png", altText: "Set de Linderball Nexus" } }] },
    priceRange: { minVariantPrice: { amount: "49.99", currencyCode: "USD" } },
    variants: [{ id: "v0", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "49.99", currencyCode: "USD" } }],
  },
  {
    id: "1", title: "Set de Pickleball Nexus Pro", description: "2 paletas de grafito, 4 pelotas perforadas y bolsa. El deporte de raqueta de mayor crecimiento del mundo.", handle: "set-de-pickleball-nexus-pro", availableForSale: true, productType: "Pickleball", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/prod-pickleball.png", altText: "Set de Pickleball Nexus Pro" } }] },
    priceRange: { minVariantPrice: { amount: "129.99", currencyCode: "USD" } },
    variants: [{ id: "v1", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "129.99", currencyCode: "USD" } }],
  },
  {
    id: "2", title: "Set de Cornhole Nexus", description: "2 tableros oficiales de madera y 8 bolsas reglamentarias. El clasico de los tailgates y ligas.", handle: "set-de-cornhole-nexus", availableForSale: true, productType: "Cornhole", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/prod-cornhole.png", altText: "Set de Cornhole Nexus" } }] },
    priceRange: { minVariantPrice: { amount: "149.99", currencyCode: "USD" } },
    variants: [{ id: "v2", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "149.99", currencyCode: "USD" } }],
  },
  {
    id: "3", title: "Set de Roundnet Nexus Pro", description: "Red circular de tension ajustable, marco plegable y 3 pelotas. Para torneos y juego 2 vs 2.", handle: "set-de-roundnet-nexus-pro", availableForSale: true, productType: "Spikeball", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/prod-roundnet.png", altText: "Set de Roundnet Nexus Pro" } }] },
    priceRange: { minVariantPrice: { amount: "69.99", currencyCode: "USD" } },
    variants: [{ id: "v3", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "69.99", currencyCode: "USD" } }],
  },
  {
    id: "4", title: "Set de KanJam Nexus", description: "2 canastas de ranura y disco volador oficial. El juego explosivo de universidades y eventos.", handle: "set-de-kanjam-nexus", availableForSale: true, productType: "KanJam", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/prod-kanjam.png", altText: "Set de KanJam Nexus" } }] },
    priceRange: { minVariantPrice: { amount: "59.99", currencyCode: "USD" } },
    variants: [{ id: "v4", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "59.99", currencyCode: "USD" } }],
  },
  {
    id: "5", title: "Set de Bocce & Petanca Nexus", description: "8 bochas metalicas pulidas, boliche y bolsa. El deporte de arrastre historico y global.", handle: "set-de-bocce-petanca-nexus", availableForSale: true, productType: "Bocce", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/prod-bocce.png", altText: "Set de Bocce y Petanca Nexus" } }] },
    priceRange: { minVariantPrice: { amount: "99.99", currencyCode: "USD" } },
    variants: [{ id: "v5", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "99.99", currencyCode: "USD" } }],
  },
] as unknown as Product[]
