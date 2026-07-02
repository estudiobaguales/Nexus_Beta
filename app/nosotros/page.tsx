import { NosotrosPageClient } from "@/components/nosotros-page-client"
import { absoluteUrl } from "@/lib/site-config"

export const metadata = {
  title: "Nosotros | Nexus",
  description:
    "La comunidad de roundnet mas grande de Latinoamerica. Desde 2019 conectamos personas a traves del deporte en 15 ciudades de Chile.",
  keywords: ["nexus sports", "comunidad roundnet", "historia nexus", "roundnet latinoamerica"],
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Nosotros | Nexus",
    description: "Construyendo comunidad a traves del deporte desde 2019.",
    url: "/nosotros",
    type: "website",
  },
}

export default function NosotrosPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Nosotros", item: absoluteUrl("/nosotros") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <NosotrosPageClient />
    </>
  )
}
