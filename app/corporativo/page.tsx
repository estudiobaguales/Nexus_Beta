import { CorporativoPageClient } from "@/components/corporativo-page-client"
import { absoluteUrl } from "@/lib/site-config"

export const metadata = {
  title: "Corporativo | Nexus",
  description:
    "Compras al por mayor, cursos corporativos y organizacion de eventos deportivos de roundnet para instituciones y empresas en Chile.",
  keywords: ["nexus sports", "compras al por mayor", "cursos corporativos", "eventos empresas", "roundnet empresas"],
  alternates: { canonical: "/corporativo" },
  openGraph: {
    title: "Corporativo | Nexus",
    description: "Nexus para instituciones y empresas: compras al por mayor, cursos y eventos a medida.",
    url: "/corporativo",
    type: "website",
  },
}

export default function CorporativoPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Corporativo", item: absoluteUrl("/corporativo") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CorporativoPageClient />
    </>
  )
}
