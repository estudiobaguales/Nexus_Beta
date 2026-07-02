import { EventosPageClient } from "@/components/eventos-page-client"
import { absoluteUrl } from "@/lib/site-config"

export const metadata = {
  title: "Eventos y Torneos | Nexus",
  description:
    "Calendario 2026 de torneos, ligas y encuentros de roundnet en todo Chile. Compite o ven a vivir la experiencia.",
  keywords: ["torneos roundnet", "eventos spikeball chile", "liga roundnet", "campeonato spikeball"],
  alternates: { canonical: "/eventos" },
  openGraph: {
    title: "Eventos y Torneos | Nexus",
    description: "Torneos, ligas y encuentros en todo Chile. Donde la competencia vive.",
    url: "/eventos",
    type: "website",
  },
}

export default function EventosPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Eventos", item: absoluteUrl("/eventos") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <EventosPageClient />
    </>
  )
}
