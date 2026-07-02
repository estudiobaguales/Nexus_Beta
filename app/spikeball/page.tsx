import { SpikeballPageClient } from "@/components/spikeball-page-client"

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
  return <SpikeballPageClient />
}
