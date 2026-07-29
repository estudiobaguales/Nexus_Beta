"use client"

import Link from "next/link"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const footerLinks = {
  Deportes: [
    { label: "Spikeball", href: "/spikeball" },
    { label: "Tienda", href: "/productos" },
    { label: "Blog", href: "/blog" },
  ],
  Comunidad: [
    { label: "Nexuniversity", href: "/nexuniversity" },
    { label: "Blog", href: "/blog" },
    { label: "Rankings", href: "#" },
  ],
  Empresa: [
    { label: "Corporativo", href: "/corporativo" },
    { label: "Contacto", href: "/contacto" },
    { label: "Prensa", href: "#" },
    { label: "Trabaja con nosotros", href: "#" },
  ],
  Legal: [
    { label: "Privacidad", href: "#" },
    { label: "Terminos", href: "#" },
    { label: "Envios", href: "#" },
    { label: "Devoluciones", href: "#" },
  ],
}

const socials = [
  { label: "Instagram", href: "#", tag: "IG" },
  { label: "TikTok", href: "#", tag: "TK" },
  { label: "YouTube", href: "#", tag: "YT" },
]

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <footer ref={ref} className="bg-foreground text-background border-t border-background/5">
      <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-10">
        {/* Top: large CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pb-16 border-b border-background/10"
        >
          <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-background leading-tight text-balance">
            Listo para jugar?
          </h3>
          <a
            href="/productos"
            className="group inline-flex items-center gap-2 h-12 px-8 rounded-full bg-accent text-accent-foreground text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200 shrink-0"
          >
            Comprar ahora
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
          </a>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="group inline-flex items-center" aria-label="Nexus inicio">
              <img
                src="/nexus-banner-white.svg"
                alt="Nexus"
                className="h-7 w-auto group-hover:opacity-70 transition-opacity duration-300"
              />
            </Link>
            <p className="mt-4 text-[12px] text-background/35 leading-relaxed max-w-[200px]">
              El ecosistema de los deportes alternativos en Chile. Conexion, comunidad y evolucion.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.tag}
                  href={s.href}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-background/10 text-[10px] font-medium text-background/40 hover:text-background hover:border-background/30 hover:bg-background/5 transition-all duration-300"
                >
                  {s.tag}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] tracking-[0.15em] uppercase text-background/30 mb-5 font-medium">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-background/45 hover:text-background transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-background/25">
            2026 Nexus Chile. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-background/25">
            Disenado y desarrollado en Chile.
          </p>
        </div>
      </div>
    </footer>
  )
}
