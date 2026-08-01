"use client"

import { useState, useMemo } from "react"
import { motion } from "motion/react"
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from "lucide-react"
import type { Product } from "@/lib/shopify/types"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ProductCard } from "@/components/product-card"

const fallbackProducts: Product[] = [
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

type SortOption = "featured" | "price-asc" | "price-desc" | "name"

function ProductsContent({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<string>("Todos")
  const [sort, setSort] = useState<SortOption>("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [layout, setLayout] = useState<"grid" | "list">("grid")

  const displayProducts = products.length > 0 ? products : fallbackProducts

  const categories = useMemo(() => {
    const types = new Set(displayProducts.map((p) => p.productType || "Otro"))
    return ["Todos", ...Array.from(types)]
  }, [displayProducts])

  const filtered = useMemo(() => {
    let result = category === "Todos"
      ? displayProducts
      : displayProducts.filter((p) => (p.productType || "Otro") === category)

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount))
        break
      case "price-desc":
        result = [...result].sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount))
        break
      case "name":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title))
        break
    }
    return result
  }, [displayProducts, category, sort])

  const sortLabels: Record<SortOption, string> = {
    featured: "Destacados",
    "price-asc": "Menor precio",
    "price-desc": "Mayor precio",
    name: "A - Z",
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero banner */}
        <section className="relative py-20 lg:py-28 bg-secondary/30">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Tienda", href: "/productos" }]} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Tienda</p>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
                Equipamiento profesional.
              </h1>
              <p className="mt-3 text-[15px] text-muted-foreground max-w-lg">
                Desde sets de competencia hasta accesorios, todo lo que necesitas para jugar al mas alto nivel.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters + Products */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
              <div className="flex items-center gap-2 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`shrink-0 h-9 px-4 rounded-full text-[12px] font-medium transition-all duration-300 ${
                      category === cat
                        ? "bg-foreground text-background"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 h-9 px-4 rounded-full border border-border text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {sortLabels[sort]}
                    <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} strokeWidth={1.5} />
                  </button>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 top-full mt-2 w-44 bg-background border border-border rounded-xl shadow-xl shadow-foreground/5 p-1.5 z-20"
                    >
                      {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => { setSort(key); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[12px] transition-colors ${
                            sort === key ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          {sortLabels[key]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="hidden md:flex items-center gap-1 border border-border rounded-full p-0.5">
                  <button
                    onClick={() => setLayout("grid")}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${layout === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                    aria-label="Vista cuadricula"
                  >
                    <Grid3X3 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setLayout("list")}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${layout === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                    aria-label="Vista lista"
                  >
                    <LayoutList className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters */}
            {category !== "Todos" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-2 mb-8"
              >
                <span className="text-[11px] text-muted-foreground">Filtros activos:</span>
                <button
                  onClick={() => setCategory("Todos")}
                  className="flex items-center gap-1.5 h-7 px-3 rounded-full bg-foreground/[0.06] text-[11px] text-foreground font-medium hover:bg-foreground/[0.1] transition-colors"
                >
                  {category}
                  <X className="w-3 h-3" strokeWidth={2} />
                </button>
              </motion.div>
            )}

            {/* Results count */}
            <p className="text-[12px] text-muted-foreground mb-8">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
            </p>

            {/* Products grid */}
            <div className={`grid gap-6 lg:gap-8 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"}`}>
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <p className="text-[15px] text-muted-foreground">No se encontraron productos en esta categoria.</p>
                <button
                  onClick={() => setCategory("Todos")}
                  className="h-10 px-6 rounded-full bg-foreground text-background text-[13px] font-medium hover:opacity-80 transition-opacity"
                >
                  Ver todos
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function ProductsPageClient({ products }: { products: Product[] }) {
  return (
    <CartProvider>
      <ProductsContent products={products} />
    </CartProvider>
  )
}
