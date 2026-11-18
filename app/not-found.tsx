import type { Metadata } from "next"
import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Button } from "@/components/ui/button"

/** 404 en español: reemplaza la página por defecto de Next ("This page could not be found."). */
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <SiteShell>
      <Section tone="muted" spacing="page">
        <Eyebrow className="mb-3">Error 404</Eyebrow>
        <h1 className="text-page font-semibold tracking-[-0.04em] text-foreground">
          No encontramos esta página.
        </h1>
        <p className="mt-3 text-body text-muted-foreground max-w-lg">
          Puede que el enlace esté roto o que la página ya no exista.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/productos">Ir a la tienda</Link>
          </Button>
        </div>
      </Section>
    </SiteShell>
  )
}
