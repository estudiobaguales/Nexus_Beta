import type { CSSProperties, ImgHTMLAttributes } from "react"

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src: string
  alt: string
  /** Igual que next/image: la imagen llena a su contenedor (que debe ser relative). */
  fill?: boolean
  /** Igual que next/image: carga inmediata y prioridad alta (imagen LCP). */
  priority?: boolean
  width?: number
  height?: number
}

const SHOPIFY_CDN = /^https:\/\/cdn\.shopify\.com\//
const WIDTHS = [320, 480, 640, 828, 1080, 1280, 1600, 2048]

function withWidth(src: string, width: number) {
  const url = new URL(src)
  url.searchParams.set("width", String(width))
  return url.toString()
}

/**
 * Reemplazo de `next/image`. Sin el optimizador de Vercel:
 * - Imagenes de Shopify: srcset con el redimensionado del CDN de Shopify (que ademas
 *   entrega WebP/AVIF segun el navegador), asi `sizes` sigue sirviendo.
 * - Imagenes locales (/public): se sirven tal cual desde el CDN de Oxygen.
 */
export default function Image({
  src,
  alt,
  fill,
  priority,
  width,
  height,
  sizes,
  style,
  ...rest
}: ImageProps) {
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : undefined

  const isShopify = SHOPIFY_CDN.test(src)
  const srcSet = isShopify
    ? WIDTHS.filter((w) => !width || fill || w <= width * 2)
        .map((w) => `${withWidth(src, w)} ${w}w`)
        .join(", ")
    : undefined

  return (
    <img
      src={isShopify ? withWidth(src, width ? width * 2 : 1080) : src}
      srcSet={srcSet}
      sizes={srcSet ? sizes ?? (fill ? "100vw" : undefined) : undefined}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  )
}
