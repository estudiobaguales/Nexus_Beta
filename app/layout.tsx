import type { Metadata, Viewport } from "next"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import {
  SITE_URL,
  SITE_NAME,
  TITLE_SUFFIX,
  OG_DEFAULT_IMAGE,
  ORG_LOGO,
  SOCIAL_LINKS,
  absoluteUrl,
} from "@/lib/site-config"
import { CartProvider } from "@/components/cart/cart-context"
import { JsonLd } from "@/components/json-ld"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const title = "NEXUS Sports | Conexion. Comunidad. Movimiento."
const description =
  "NEXUS Sports es el ecosistema de los deportes alternativos en Chile. Equipamiento profesional de roundnet, cursos, torneos y comunidad."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // La plantilla evita que cada pagina repita el sufijo a mano (antes convivian
  // "| Nexus", "| Nexus Blog" y "NEXUS Sports |").
  title: {
    default: title,
    template: `%s | ${TITLE_SUFFIX}`,
  },
  description,
  keywords: ["nexus", "nexus sports", "roundnet", "spikeball", "deporte", "chile", "torneos", "deportes alternativos"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "es_CL",
    url: "/",
    title,
    description,
    images: [{ url: OG_DEFAULT_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_DEFAULT_IMAGE],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/apple-icon.png",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl(ORG_LOGO),
  description,
  areaServed: { "@type": "Country", name: "Chile" },
  // Se omite si no hay perfiles reales cargados (ver SOCIAL_LINKS en lib/site-config.ts).
  ...(SOCIAL_LINKS.length > 0 ? { sameAs: SOCIAL_LINKS } : {}),
}

export const viewport: Viewport = {
  themeColor: "#0c0c0f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body
        className={`${montserrat.variable} font-sans antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <JsonLd data={organizationJsonLd} />
        <CartProvider>{children}</CartProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
