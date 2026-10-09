import type {
  PackageItem,
  ProductInfo,
  ProductInfoGroup,
  ProductInfoItem,
} from './types'

/**
 * Ficha de producto estructurada (acordeones del PDP).
 *
 * Los datos viven en metafields del producto en Shopify, namespace `custom`.
 * Para cargar un producto nuevo no se toca codigo: se llenan estos campos en
 * Admin > Producto > Metafields. Un campo vacio = ese bloque no se muestra.
 *
 * Convenciones de carga (una linea por item):
 *  - caracteristicas / atributos_destacados / requisitos_tecnicos:
 *      "Titulo: texto"  (sin "Titulo: " queda solo el texto)
 *  - contenido_paquete: "12 Plumillas"  (el numero inicial se destaca; es opcional)
 *  - como_jugar: "Preparacion: Cada jugador usa 1 paleta."
 *      (los items se agrupan por el prefijo, en orden de aparicion)
 */
export const PRODUCT_INFO_NAMESPACE = 'custom'

export const PRODUCT_INFO_KEYS = [
  'descripcion_corta',
  'caracteristicas',
  'atributos_destacados',
  'contenido_paquete',
  'como_jugar',
  'requisitos_tecnicos',
] as const

type ProductInfoKey = (typeof PRODUCT_INFO_KEYS)[number]

type RawMetafield = { key: string; value: string } | null

/** Los metafields de tipo lista llegan como un array JSON serializado. */
function parseList(value: string | undefined): string[] {
  if (!value) return []
  try {
    const parsed: unknown = JSON.parse(value)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

/** "Titulo: texto" -> { title, text }. Sin separador, todo es texto. */
export function splitLabel(line: string): ProductInfoItem {
  const index = line.indexOf(': ')
  if (index <= 0) return { title: null, text: line }
  return { title: line.slice(0, index).trim(), text: line.slice(index + 2).trim() }
}

function parsePackageItem(line: string): PackageItem {
  const match = line.match(/^(\d+)\s+(.+)$/)
  return match ? { quantity: match[1], label: match[2] } : { quantity: null, label: line }
}

function groupByLabel(lines: string[]): ProductInfoGroup[] {
  const groups: ProductInfoGroup[] = []
  for (const line of lines) {
    const { title, text } = splitLabel(line)
    const group = groups.find((g) => g.title === title)
    if (group) group.items.push(text)
    else groups.push({ title, items: [text] })
  }
  return groups
}

export function hasProductInfoSections(info: ProductInfo | null | undefined): boolean {
  if (!info) return false
  return (
    info.features.length > 0 ||
    info.highlights.length > 0 ||
    info.packageContents.length > 0 ||
    info.howToPlay.length > 0 ||
    info.techSpecs.length > 0
  )
}

/** Devuelve null si el producto no tiene ningun dato de ficha cargado. */
export function parseProductInfo(metafields: RawMetafield[] | null | undefined): ProductInfo | null {
  const byKey = new Map<string, string>()
  for (const metafield of metafields ?? []) {
    if (metafield?.value) byKey.set(metafield.key, metafield.value)
  }
  const get = (key: ProductInfoKey) => byKey.get(key)

  const info: ProductInfo = {
    shortDescription: get('descripcion_corta')?.trim() || null,
    features: parseList(get('caracteristicas')).map(splitLabel),
    highlights: parseList(get('atributos_destacados')).map(splitLabel),
    packageContents: parseList(get('contenido_paquete')).map(parsePackageItem),
    howToPlay: groupByLabel(parseList(get('como_jugar'))),
    techSpecs: parseList(get('requisitos_tecnicos')).map(splitLabel),
  }

  return info.shortDescription || hasProductInfoSections(info) ? info : null
}
