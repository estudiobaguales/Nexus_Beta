import { NosotrosPageClient } from "@/components/nosotros-page-client"

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
  return <NosotrosPageClient />
}
