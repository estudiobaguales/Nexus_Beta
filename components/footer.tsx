"use client"

import Link from "next/link"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { ArrowUpRight, Instagram, Youtube } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { NEXUNIVERSITY_ENABLED, INSTAGRAM_URL } from "@/lib/site-config"

// "Blog" vive solo en Comunidad: antes se repetia tambien en Deporte.
const footerLinks = {
  Deporte: [
    { label: "Spikeball / Roundnet", href: "/spikeball" },
    { label: "Tienda", href: "/productos" },
  ],
  Comunidad: [
    ...(NEXUNIVERSITY_ENABLED ? [{ label: "Cursos", href: "/nexuniversity" }] : []),
    { label: "Blog", href: "/blog" },
  ],
  Empresa: [
    { label: "Corporativo", href: "/corporativo" },
    { label: "Contacto", href: "/contacto" },
    { label: "Trabaja con nosotros", href: "#" },
  ],
  Legal: [
    { label: "Privacidad", href: "#" },
    { label: "Términos", href: "#" },
    { label: "Envíos", href: "#" },
    { label: "Devoluciones", href: "#" },
  ],
}

function InstagramIcon() {
  return <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden />
}

function YouTubeIcon() {
  return <Youtube className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden />
}

/** TikTok no existe en lucide: SVG inline. */
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.59-2.6 2.6 2.6 0 0 1 3.35-2.49V9.66a5.73 5.73 0 0 0-.76-.05 5.68 5.68 0 0 0-5.68 5.69A5.68 5.68 0 0 0 9.86 21a5.68 5.68 0 0 0 5.68-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48Z" />
    </svg>
  )
}

// TODO: TikTok y YouTube sin URL todavia (se muestran sin link). Sincronizar con
// SOCIAL_LINKS en lib/site-config.ts, que alimenta el sameAs del JSON-LD.
const socials = [
  { label: "Instagram", href: INSTAGRAM_URL, Icon: InstagramIcon },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
  { label: "YouTube", href: "#", Icon: YouTubeIcon },
]

/** Los "#" son placeholders todavia sin destino: no deben navegar ni pasar link equity. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "text-ui text-background/45 hover:text-background transition-colors duration-300"

  if (href === "#") {
    return (
      <span className={`${className} cursor-default`} aria-disabled="true">
        {children}
      </span>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

/**
 * `showCta`: la franja "Listo para jugar?" del footer. Se apaga en la home, que
 * monta su propio bloque de cierre (sections/closing-cta.tsx) y quedarian dos CTA
 * identicos uno encima del otro.
 */
export function Footer({ showCta = true }: { showCta?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <footer ref={ref} className="bg-foreground text-background border-t border-background/5">
      <Container className="pt-20 pb-10">
        {/* Top: large CTA strip */}
        {showCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 pb-16 border-b border-background/10"
          >
            {/* h2, no h3: el footer esta en todas las paginas y varias (/productos,
                /blog/[slug]) no tienen ningun h2, con lo que se saltaba de H1 a H3. */}
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-background leading-tight text-balance">
              ¿Listos para jugar?
            </h2>
            <Button asChild variant="accent" className="group shrink-0">
              <Link href="/productos">
                Comprar ahora
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
              </Link>
            </Button>
          </motion.div>
        )}

        {/* Links grid */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-8 ${showCta ? "pt-16" : ""}`}>
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="group inline-flex items-center" aria-label="Nexus inicio">
              <img
                src="/nexus-banner-white.svg"
                alt="Nexus"
                className="h-7 w-auto group-hover:opacity-70 transition-opacity duration-300"
              />
            </Link>
            <p className="mt-4 text-caption text-background/35 max-w-[200px]">
              El ecosistema de los deportes alternativos en Chile. Deporte, Entretención, Comunidad, Torneos.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s) =>
                s.href === "#" ? (
                  <span
                    key={s.label}
                    role="img"
                    aria-label={s.label}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-background/10 text-background/40"
                  >
                    <s.Icon />
                  </span>
                ) : (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-background/10 text-background/40 hover:text-background hover:border-background/30 transition-colors duration-300"
                  >
                    <s.Icon />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Link columns.
              Las etiquetas de columna son <p>, no headings: son rotulos de grupos de
              navegacion y no deben entrar en el outline del documento en cada pagina.
              La relacion rotulo-lista queda expresada con aria-labelledby. */}
          {Object.entries(footerLinks).map(([category, links]) => {
            const labelId = `footer-${category.toLowerCase()}`
            return (
              <nav key={category} aria-labelledby={labelId}>
                <p
                  id={labelId}
                  className="text-eyebrow tracking-[0.15em] uppercase text-background/30 mb-5 font-medium"
                >
                  {category}
                </p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )
          })}
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-eyebrow text-background/25">
            © 2026 Nexus Chile. Todos los derechos reservados.
          </p>
          <p className="text-eyebrow text-background/25">
            Diseñado y desarrollado en Chile.
          </p>
        </div>
      </Container>
    </footer>
  )
}
