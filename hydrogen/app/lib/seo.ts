import type { MetaDescriptor } from "react-router"
import { SITE_NAME, TITLE_SUFFIX, absoluteUrl, OG_DEFAULT_IMAGE } from "@/lib/site-config"

/** Un escalon del breadcrumb. Alimenta el <Breadcrumbs> visual y el BreadcrumbList JSON-LD. */
export type Crumb = { label: string; href: string }

type BuildMetadataInput = {
  /** Titulo SIN sufijo de marca: el helper agrega " | Nexus". */
  title: string
  /**
   * true cuando el titulo ya trae su propia marca (p. ej. el meta title SEO de un
   * producto en Shopify): se usa tal cual, sin la plantilla " | Nexus".
   */
  absoluteTitle?: boolean
  description: string
  /** Ruta absoluta del sitio, empezando con "/". Alimenta canonical y og:url. */
  path: string
  keywords?: string[]
  image?: string
  imageAlt?: string
  type?: "website" | "article"
  /** true para paginas que no deben indexarse (p. ej. 404). */
  noindex?: boolean
}

/**
 * Construye las etiquetas <head> completas de una pagina (title, description,
 * canonical, Open Graph y Twitter) como `meta` de React Router.
 *
 * En Next existia por el merge *shallow* de metadata; en React Router cada ruta
 * declara su `meta` completo, asi que este helper sigue siendo la unica fuente
 * para que ninguna ruta quede sin og:image, og:site_name u og:locale.
 */
export function buildMetadata({
  title,
  absoluteTitle = false,
  description,
  path,
  keywords,
  image = OG_DEFAULT_IMAGE,
  imageAlt,
  type = "website",
  noindex = false,
}: BuildMetadataInput): MetaDescriptor[] {
  const brandedTitle = absoluteTitle ? title : `${title} | ${TITLE_SUFFIX}`
  const url = absoluteUrl(path)
  const imageUrl = /^https?:/.test(image) ? image : absoluteUrl(image)

  return [
    { title: brandedTitle },
    { name: "description", content: description },
    ...(keywords ? [{ name: "keywords", content: keywords.join(", ") }] : []),
    ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "es_CL" },
    { property: "og:url", content: url },
    { property: "og:title", content: brandedTitle },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: imageAlt ?? brandedTitle },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: brandedTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ]
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
