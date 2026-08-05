"use client"

import { useState, useMemo } from "react"
import type { Product, ShopifyCollection } from "@/lib/shopify/types"
import { sortProducts, type SortOption } from "@/lib/product-sort"
import { SiteShell } from "@/components/site-shell"
import { Section } from "@/components/ui/section"
import { PageHero } from "@/components/ui/page-hero"
import {
  ProductToolbar,
  catalogGridClass,
  type CatalogLayout,
} from "@/components/ui/product-toolbar"
import { ProductCard } from "@/components/product-card"

export function CollectionPageClient({
  collection,
  products,
}: {
  collection: ShopifyCollection
  products: Product[]
}) {
  const [sort, setSort] = useState<SortOption>("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [layout, setLayout] = useState<CatalogLayout>("grid")

  const sorted = useMemo(() => sortProducts(products, sort), [products, sort])

  return (
    <SiteShell>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Tienda", href: "/productos" },
          { label: collection.title, href: `/productos/categoria/${collection.handle}` },
        ]}
        eyebrow="Categoria"
        title={collection.title}
        lede={collection.description || undefined}
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
          <p className="text-caption text-muted-foreground">
            {sorted.length} {sorted.length === 1 ? "producto" : "productos"}
          </p>
        </ProductToolbar>

        <div className={catalogGridClass(layout)}>
          {sorted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <p className="text-body text-muted-foreground">
              Todavia no hay productos en esta categoria.
            </p>
          </div>
        )}
      </Section>
    </SiteShell>
  )
}
