import { CursosPageClient } from "@/components/cursos-page-client"
import { absoluteUrl } from "@/lib/site-config"

export const metadata = {
  title: "Cursos y Academia | Nexus",
  description:
    "Aprende roundnet con instructores certificados. Cursos para principiantes, intermedios y competitivos en Santiago y todo Chile.",
  keywords: ["cursos roundnet", "academia spikeball", "clases roundnet chile", "aprender spikeball"],
  alternates: { canonical: "/cursos" },
  openGraph: {
    title: "Cursos y Academia | Nexus",
    description: "Instructores certificados, grupos reducidos y un metodo progresivo para cada nivel.",
    url: "/cursos",
    type: "website",
  },
}

export default function CursosPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Cursos", item: absoluteUrl("/cursos") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CursosPageClient />
    </>
  )
}
