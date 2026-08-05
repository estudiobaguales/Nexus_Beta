import type { Metadata } from "next"
import { SpikeballPageClient } from "@/components/spikeball-page-client"
import { JsonLd } from "@/components/json-ld"
import { buildMetadata, breadcrumbJsonLd, type Crumb } from "@/lib/seo"
import { absoluteUrl, SITE_NAME, ORG_LOGO } from "@/lib/site-config"

const TITLE = "Spikeball (Roundnet): que es, reglas y como se juega"
const HERO_IMAGE = "/images/spikeball-hero.png"

// Fechas de la guia pillar. Actualizar PUBLISHED solo si se reescribe el articulo;
// UPDATED cada vez que cambie el contenido de fondo.
const PUBLISHED = "2026-04-01"
const UPDATED = "2026-08-01"

const crumbs: Crumb[] = [
  { label: "Inicio", href: "/" },
  { label: "Spikeball", href: "/spikeball" },
]

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description:
    "Guia completa de Spikeball / Roundnet: su historia, reglas oficiales, como se juega 2 contra 2 y todo lo que necesitas para empezar en Chile.",
  path: "/spikeball",
  type: "article",
  image: HERO_IMAGE,
  imageAlt: "Jugadores de spikeball en accion",
  keywords: [
    "spikeball",
    "roundnet",
    "que es spikeball",
    "reglas spikeball",
    "como jugar spikeball",
    "spikeball chile",
    "roundnet chile",
  ],
})

export default function SpikeballPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description:
      "Guia completa de Spikeball / Roundnet: historia, reglas oficiales y como empezar a jugar en Chile.",
    about: "Spikeball / Roundnet",
    image: [absoluteUrl(HERO_IMAGE)],
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    inLanguage: "es-CL",
    author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl(ORG_LOGO) },
    },
    mainEntityOfPage: absoluteUrl("/spikeball"),
  }

  return (
    <>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd(crumbs)]} />
      <SpikeballPageClient />
    </>
  )
}
