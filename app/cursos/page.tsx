import { CursosPageClient } from "@/components/cursos-page-client"

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
  return <CursosPageClient />
}
