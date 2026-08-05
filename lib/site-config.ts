// Cambia NEXT_PUBLIC_SITE_URL en el entorno de produccion antes del deploy real.
// El fallback solo se usa en dev/preview cuando la variable no esta definida.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.nexus-sports.cl"

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
 * TODO: completar con las URLs reales. Mientras esten vacias se omite el campo,
 * que es preferible a declarar perfiles inexistentes. Los enlaces del footer
 * (components/footer.tsx) siguen apuntando a "#" y deben actualizarse a la par.
 */
export const SOCIAL_LINKS: string[] = []

/**
 * Umbral de envio gratis, en pesos chilenos.
 *
 * FUENTE UNICA: cambiar solo este numero. Lo consumen la banda de la home
 * (sections/free-shipping-cta.tsx) y el slide de tienda del hero (sections/hero.tsx).
 * Si mañana lo usa tambien el carrito, que lo lea de aca y no lo escriba a mano.
 */
export const FREE_SHIPPING_THRESHOLD = 50000

/** Plazo de despacho declarado junto al envio gratis. */
export const SHIPPING_ETA = "3 a 5 dias habiles"

export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString("es-CL")}`
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}
