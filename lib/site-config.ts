// Cambia NEXT_PUBLIC_SITE_URL en el entorno de produccion antes del deploy real.
// El fallback solo se usa en dev/preview cuando la variable no esta definida.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.nexus-sports.cl"

export const SITE_NAME = "Nexus Sports"

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}
