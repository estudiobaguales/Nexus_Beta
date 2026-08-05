import type { Metadata } from "next"
import { SITE_NAME, TITLE_SUFFIX, absoluteUrl, OG_DEFAULT_IMAGE } from "@/lib/site-config"

/** Un escalon del breadcrumb. Alimenta el <Breadcrumbs> visual y el BreadcrumbList JSON-LD. */
export type Crumb = { label: string; href: string }

type BuildMetadataInput = {
  /** Titulo SIN sufijo de marca: la plantilla de app/layout.tsx agrega " | Nexus". */
  title: string
  description: string
  /** Ruta absoluta del sitio, empezando con "/". Alimenta canonical y og:url. */
  path: string
  keywords?: string[]
  image?: string
  imageAlt?: string
  type?: "website" | "article"
}

/**
 * Construye el bloque de metadata completo de una pagina.
 *
 * Existe por un detalle de Next: el merge de metadata es *shallow* por clave de
 * primer nivel, asi que un `openGraph` en una pagina hija reemplaza entero al del
 * layout raiz. Antes eso hacia que 5 de 11 rutas quedaran sin og:image y que
 * og:site_name / og:locale desaparecieran en todas menos "/". Este helper vuelve a
 * armar el bloque base en cada ruta para que eso no pueda pasar por olvido.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = OG_DEFAULT_IMAGE,
  imageAlt,
  type = "website",
}: BuildMetadataInput): Metadata {
  // Mismo sufijo que la plantilla de <title> en app/layout.tsx, para que el titulo
  // de la pestana y el de Open Graph no digan cosas distintas.
  const brandedTitle = `${title} | ${TITLE_SUFFIX}`

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "es_CL",
      url: path,
      title: brandedTitle,
      description,
      images: [{ url: image, alt: imageAlt ?? brandedTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [image],
    },
  }
}

/** BreadcrumbList a partir del mismo Crumb[] que renderiza el breadcrumb visible. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  }
}

/** ItemList de un listado de productos. */
export function itemListJsonLd(items: Array<{ handle: string; title: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/productos/${item.handle}`),
      name: item.title,
    })),
  }
}
