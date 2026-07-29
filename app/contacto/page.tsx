import { ContactoPageClient } from "@/components/contacto-page-client"
import { absoluteUrl } from "@/lib/site-config"

export const metadata = {
  title: "Contacto | Nexus",
  description: "Escribinos tus dudas sobre productos, pedidos o la comunidad Nexus. Te respondemos a la brevedad.",
  keywords: ["nexus sports", "contacto", "soporte nexus"],
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Nexus",
    description: "Escribinos tus dudas sobre productos, pedidos o la comunidad Nexus.",
    url: "/contacto",
    type: "website",
  },
}

export default function ContactoPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Contacto", item: absoluteUrl("/contacto") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ContactoPageClient />
    </>
  )
}
