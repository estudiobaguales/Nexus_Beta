// Dominio de produccion: alimenta canonical, sitemap.xml, robots.txt y JSON-LD.
// (En Hydrogen no hay process.env en runtime, por eso va fijo.)
export const SITE_URL = "https://www.nexus-sports.cl"

export const SITE_NAME = "Nexus Sports"

/** Sufijo de marca de los <title>. Definido aca para que la plantilla y los OG no se separen. */
export const TITLE_SUFFIX = "Nexus"

/** Imagen por defecto de Open Graph / Twitter cuando una pagina no aporta la suya. */
export const OG_DEFAULT_IMAGE = "/images/hero-main.jpg"

/**
 * Logo para el JSON-LD de Organization.
 * Tiene que ser raster: Google no acepta SVG en este campo (antes apuntaba a /favicon.svg).
 */
export const ORG_LOGO = "/apple-icon.png"

/**
 * Perfiles oficiales, para `sameAs` del JSON-LD de Organization.
 * Instagram (@nexussportscl) lo confirmo el cliente. TODO: sumar TikTok y YouTube
 * cuando esten las URLs; en el footer (components/footer.tsx) siguen sin link.
 */
export const INSTAGRAM_URL = "https://www.instagram.com/nexussportscl/"

export const SOCIAL_LINKS: string[] = [INSTAGRAM_URL]

/**
 * Umbral de envio gratis, en pesos chilenos.
 *
 * FUENTE UNICA: cambiar solo este numero. Lo consumen la banda de la home
 * (sections/free-shipping-cta.tsx) y el slide de tienda del hero (sections/hero.tsx).
 * Si mañana lo usa tambien el carrito, que lo lea de aca y no lo escriba a mano.
 */
export const FREE_SHIPPING_THRESHOLD = 50000

/** Plazo de despacho. */
export const SHIPPING_ETA = "3 a 5 días hábiles"

/**
 * Nexuniversity (cursos) no se habilita en el lanzamiento.
 * Con `false`: la ruta /nexuniversity responde 404 y sale del sitemap, y se ocultan
 * los links del menu, el footer, el slide de cursos del hero y los botones que
 * apuntan a ella. Para habilitarla basta con pasar esto a `true`.
 */
export const NEXUNIVERSITY_ENABLED = false

export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString("es-CL")}`
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}
