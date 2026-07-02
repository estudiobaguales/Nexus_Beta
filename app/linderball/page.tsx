import { LinderballPageClient } from "@/components/linderball-page-client"
import { absoluteUrl, SITE_NAME } from "@/lib/site-config"

export const metadata = {
  title: "Linderball: que es, mecanicas y como se juega | Nexus",
  description:
    "Guia completa de Linderball: el nuevo deporte de la pelota de espuma en forma de anillo. Descubre sus mas de 16 mecanicas de lanzamiento y como se juega en cualquier espacio.",
  keywords: [
    "linderball",
    "que es linderball",
    "como jugar linderball",
    "pelota anillo espuma",
    "deporte linderball",
    "linderball chile",
  ],
  alternates: { canonical: "/linderball" },
  openGraph: {
    title: "Linderball: que es, mecanicas y como se juega",
    description:
      "El nuevo deporte creativo de lanzamientos con una pelota de espuma en forma de anillo. Mas de 16 mecanicas y juego adaptable a cualquier espacio.",
    url: "/linderball",
    type: "article",
    images: [{ url: "/images/linderball-hero.png" }],
  },
}

export default function LinderballPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Linderball: que es, mecanicas y como se juega",
    about: "Linderball",
    image: [absoluteUrl("/images/linderball-hero.png")],
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Linderball", item: absoluteUrl("/linderball") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <LinderballPageClient />
    </>
  )
}
