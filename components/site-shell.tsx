"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

/**
 * Cascaron comun de pagina: Navbar + <main> + Footer.
 * Antes cada uno de los 10 *-page-client.tsx lo re-armaba a mano, con dos
 * convenciones distintas de <main>.
 *
 * `overHero`: la pagina abre con un hero a sangre completa bajo el navbar
 * transparente (home, spikeball). En ese caso <main> no lleva el pt-16 que
 * compensa la altura del navbar fijo.
 *
 * CartProvider ya no vive aca: subio a app/layout.tsx.
 */
export function SiteShell({
  overHero = false,
  showFooterCta = true,
  className,
  children,
}: {
  overHero?: boolean
  /** false cuando la pagina ya trae su propio CTA de cierre (la home). */
  showFooterCta?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar overHero={overHero} />
      <main className={cn("min-h-screen", !overHero && "pt-16", className)}>
        {children}
      </main>
      <Footer showCta={showFooterCta} />
    </>
  )
}
