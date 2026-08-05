import type { Metadata } from "next"
import { NexuniversityPageClient } from "@/components/nexuniversity-page-client"
import { JsonLd } from "@/components/json-ld"
import { buildMetadata, breadcrumbJsonLd, type Crumb } from "@/lib/seo"

const crumbs: Crumb[] = [
  { label: "Inicio", href: "/" },
  { label: "Nexuniversity", href: "/nexuniversity" },
]

export const metadata: Metadata = buildMetadata({
  title: "Nexuniversity",
  description:
    "Cursos y torneos de roundnet en Chile. Instructores certificados, grupos reducidos y calendario 2026 de eventos y ligas.",
  path: "/nexuniversity",
  keywords: ["nexus sports", "cursos roundnet", "academia roundnet", "torneos roundnet", "nexuniversity"],
  image: "/images/courses.jpg",
})

export default function NexuniversityPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <NexuniversityPageClient />
    </>
  )
}
