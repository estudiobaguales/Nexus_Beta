import type { Metadata } from "next"
import { CorporativoPageClient } from "@/components/corporativo-page-client"
import { JsonLd } from "@/components/json-ld"
import { buildMetadata, breadcrumbJsonLd, type Crumb } from "@/lib/seo"

const crumbs: Crumb[] = [
  { label: "Inicio", href: "/" },
  { label: "Corporativo", href: "/corporativo" },
]

export const metadata: Metadata = buildMetadata({
  title: "Corporativo",
  description:
    "Compras al por mayor, cursos corporativos y organizacion de eventos deportivos de roundnet para instituciones y empresas en Chile.",
  path: "/corporativo",
  keywords: ["nexus sports", "compras al por mayor", "cursos corporativos", "eventos empresas", "roundnet empresas"],
})

export default function CorporativoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <CorporativoPageClient />
    </>
  )
}
