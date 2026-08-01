"use client"

import { useState, useMemo } from "react"
import { motion } from "motion/react"
import { SlidersHorizontal, ChevronDown, Grid3X3, LayoutList } from "lucide-react"
import type { Product, ShopifyCollection } from "@/lib/shopify/types"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ProductCard } from "@/components/product-card"

type SortOption = "featured" | "price-asc" | "price-desc" | "name"

const sortLabels: Record<SortOption, string> = {
  featured: "Destacados",
  "price-asc": "Menor precio",
  "price-desc": "Mayor precio",
  name: "A - Z",
}

function CollectionContent({ collection, products }: { collection: ShopifyCollection; products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [layout, setLayout] = useState<"grid" | "list">("grid")

  const sorted = useMemo(() => {
    let result = products
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
  }, [products, sort])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero banner */}
        <section className="relative py-20 lg:py-28 bg-secondary/30">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Tienda", href: "/productos" }, { label: collection.title, href: `/productos/categoria/${collection.handle}` }]} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Categoria</p>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
                {collection.title}
              </h1>
              {collection.description && (
                <p className="mt-3 text-[15px] text-muted-foreground max-w-lg">{collection.description}</p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Filters + Products */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
              <p className="text-[12px] text-muted-foreground">
                {sorted.length} {sorted.length === 1 ? "producto" : "productos"}
              </p>

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

            {/* Products grid */}
            <div className={`grid gap-6 lg:gap-8 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"}`}>
              {sorted.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {sorted.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <p className="text-[15px] text-muted-foreground">Todavia no hay productos en esta categoria.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function CollectionPageClient({ collection, products }: { collection: ShopifyCollection; products: Product[] }) {
  return (
    <CartProvider>
      <CollectionContent collection={collection} products={products} />
    </CartProvider>
  )
}
