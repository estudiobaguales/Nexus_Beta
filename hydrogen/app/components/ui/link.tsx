import { forwardRef, type AnchorHTMLAttributes } from "react"
import { Link as RouterLink } from "react-router"

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string
  /** Compatibilidad con la API de next/link. */
  prefetch?: boolean
  scroll?: boolean
  replace?: boolean
}

const EXTERNAL = /^(https?:|mailto:|tel:|#)/

/**
 * Reemplazo de `next/link` sobre React Router: mantiene la prop `href` para no
 * tocar los componentes portados. Los links externos, mailto/tel y anclas van
 * como <a> normal; los internos navegan sin recargar y precargan al hover.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, prefetch, scroll, replace, children, ...rest },
  ref,
) {
  if (EXTERNAL.test(href)) {
    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <RouterLink
      ref={ref}
      to={href}
      prefetch={prefetch === false ? "none" : "intent"}
      preventScrollReset={scroll === false}
      replace={replace}
      {...rest}
    >
      {children}
    </RouterLink>
  )
})

export default Link
