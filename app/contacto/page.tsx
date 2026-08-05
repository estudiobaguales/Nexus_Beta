import type { Metadata } from "next"
import { ContactoPageClient } from "@/components/contacto-page-client"
import { JsonLd } from "@/components/json-ld"
import { buildMetadata, breadcrumbJsonLd, type Crumb } from "@/lib/seo"

const crumbs: Crumb[] = [
  { label: "Inicio", href: "/" },
  { label: "Contacto", href: "/contacto" },
]

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description: "Escribinos tus dudas sobre productos, pedidos o la comunidad Nexus. Te respondemos a la brevedad.",
  path: "/contacto",
  keywords: ["nexus sports", "contacto", "soporte nexus"],
})

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <ContactoPageClient />
    </>
  )
}
