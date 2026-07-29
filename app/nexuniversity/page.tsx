import { NexuniversityPageClient } from "@/components/nexuniversity-page-client"
import { absoluteUrl } from "@/lib/site-config"

export const metadata = {
  title: "Nexuniversity | Nexus",
  description:
    "Cursos y torneos de roundnet en Chile. Instructores certificados, grupos reducidos y calendario 2026 de eventos y ligas.",
  keywords: ["nexus sports", "cursos roundnet", "academia roundnet", "torneos roundnet", "nexuniversity"],
  alternates: { canonical: "/nexuniversity" },
  openGraph: {
    title: "Nexuniversity | Nexus",
    description: "Formacion y competencia: cursos, ligas y torneos de roundnet en todo Chile.",
    url: "/nexuniversity",
    type: "website",
  },
}

export default function NexuniversityPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Nexuniversity", item: absoluteUrl("/nexuniversity") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <NexuniversityPageClient />
    </>
  )
}
