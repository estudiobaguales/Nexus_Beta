"use client"

import { useState, useMemo } from "react"
import { motion } from "motion/react"
import { X } from "lucide-react"
import type { Product } from "@/lib/shopify/types"
import { sortProducts, type SortOption } from "@/lib/product-sort"
import { fallbackProducts } from "@/lib/fallback-products"
import { SiteShell } from "@/components/site-shell"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { FilterPill } from "@/components/ui/filter-pill"
import { PageHero } from "@/components/ui/page-hero"
import {
  ProductToolbar,
  catalogGridClass,
  type CatalogLayout,
} from "@/components/ui/product-toolbar"
import { ProductCard } from "@/components/product-card"
import { ShopBlogCta } from "@/components/sections/shop-blog-cta"

/** Orden de los filtros de la tienda definido por el cliente (tipos de producto de Shopify). */
const FILTER_ORDER = ["Roundnet", "Pickleball", "Ultimate Frisbee", "Accesorios", "Ropa", "Repuestos"]

function ProductsContent({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<string>("Todos")
  const [sort, setSort] = useState<SortOption>("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [layout, setLayout] = useState<CatalogLayout>("grid")

  const displayProducts = products.length > 0 ? products : fallbackProducts

  // Los filtros son los "Tipo de producto" de Shopify. Los productos sin tipo ya no
  // generan un chip "Otro" (solo aparecen en "Todos"). Los tipos definidos por el
  // cliente salen primero y en este orden; cualquier otro tipo va al final.
  const categories = useMemo(() => {
    const types = Array.from(new Set(displayProducts.map((p) => p.productType).filter(Boolean)))
    const rank = (t: string) => {
      const i = FILTER_ORDER.indexOf(t)
      return i === -1 ? FILTER_ORDER.length : i
    }
    return ["Todos", ...types.sort((a, b) => rank(a) - rank(b))]
  }, [displayProducts])

  const filtered = useMemo(() => {
    const result = category === "Todos"
      ? displayProducts
      : displayProducts.filter((p) => p.productType === category)
    return sortProducts(result, sort)
  }, [displayProducts, category, sort])

  return (
    <SiteShell>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Tienda", href: "/productos" },
        ]}
        eyebrow="Tienda"
        title="Todo para salir a jugar."
        lede="Desde el juego familiar hasta sets de competencia, todo lo que necesitas para jugar."
      />

      <Section spacing="compact">
        <ProductToolbar
          sort={sort}
          onSortChange={setSort}
          layout={layout}
          onLayoutChange={setLayout}
          open={showFilters}
          onOpenChange={setShowFilters}
        >
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <FilterPill
                key={cat}
                active={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </FilterPill>
            ))}
          </div>
        </ProductToolbar>

        {/* Active filters */}
        {category !== "Todos" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="text-eyebrow text-muted-foreground">Filtros activos:</span>
            <button
              onClick={() => setCategory("Todos")}
              className="flex items-center gap-1.5 h-7 px-3 rounded-full bg-foreground/[0.06] text-eyebrow text-foreground font-medium hover:bg-foreground/[0.1] transition-colors"
            >
              {category}
              <X className="w-3 h-3" strokeWidth={2} />
            </button>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-caption text-muted-foreground mb-8">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>

        <div className={catalogGridClass(layout)}>
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <p className="text-body text-muted-foreground">
              No hay productos en esta categoría.
            </p>
            <Button size="sm" onClick={() => setCategory("Todos")}>
              Ver todos los productos
            </Button>
          </div>
        )}
      </Section>

      {/* Cierre de pagina. Va fuera de la <Section> de la grilla para que no
          herede su spacing y quede claro que no es parte del catalogo. */}
      <ShopBlogCta />
    </SiteShell>
  )
}

export function ProductsPageClient({ products }: { products: Product[] }) {
  return <ProductsContent products={products} />
}
