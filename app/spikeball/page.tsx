import { SpikeballPageClient } from "@/components/spikeball-page-client"
import { absoluteUrl, SITE_NAME } from "@/lib/site-config"

export const metadata = {
  title: "Spikeball (Roundnet): que es, reglas y como se juega | Nexus",
  description:
    "Guia completa de Spikeball / Roundnet: su historia, reglas oficiales, como se juega 2 contra 2 y todo lo que necesitas para empezar en Chile.",
  keywords: [
    "spikeball",
    "roundnet",
    "que es spikeball",
    "reglas spikeball",
    "como jugar spikeball",
    "spikeball chile",
    "roundnet chile",
  ],
  alternates: { canonical: "/spikeball" },
  openGraph: {
    title: "Spikeball (Roundnet): que es, reglas y como se juega",
    description:
      "La guia definitiva del roundnet: historia, reglas oficiales y como empezar a jugar el deporte que crece mas rapido en el mundo.",
    url: "/spikeball",
    type: "article",
    images: [{ url: "/images/spikeball-hero.png" }],
  },
}

export default function SpikeballPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Spikeball (Roundnet): que es, reglas y como se juega",
    about: "Spikeball / Roundnet",
    image: [absoluteUrl("/images/spikeball-hero.png")],
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Spikeball", item: absoluteUrl("/spikeball") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SpikeballPageClient />
    </>
  )
}
