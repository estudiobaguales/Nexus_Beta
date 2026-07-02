import { EventosPageClient } from "@/components/eventos-page-client"

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
  return <EventosPageClient />
}
