"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Mail, Instagram } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"
import { PageHero } from "@/components/ui/page-hero"

// Placeholder de contacto derivado del dominio del sitio (SITE_URL en lib/site-config.ts).
// TODO: reemplazar por el email/redes reales antes de publicar.
const CONTACT_EMAIL = "hola@nexus-sports.cl"

function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Contacto web - ${data.get("nombre") || ""}`)
    const body = encodeURIComponent(`Nombre: ${data.get("nombre")}\nEmail: ${data.get("email")}\n\nMensaje:\n${data.get("mensaje")}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <Section spacing="content" containerClassName="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Info column */}
      <div className="lg:col-span-4">
        <h2 className="text-body font-semibold text-foreground">Datos de contacto</h2>
        <div className="mt-5 flex flex-col gap-4">
          <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-center gap-3 text-body-sm text-muted-foreground hover:text-foreground transition-colors">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border group-hover:border-foreground/20 transition-colors">
              <Mail className="w-4 h-4" strokeWidth={1.5} />
            </span>
            {CONTACT_EMAIL}
          </a>
          <a href="#" className="group flex items-center gap-3 text-body-sm text-muted-foreground hover:text-foreground transition-colors">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border group-hover:border-foreground/20 transition-colors">
              <Instagram className="w-4 h-4" strokeWidth={1.5} />
            </span>
            @nexus.sports
          </a>
        </div>
        <p className="mt-6 text-caption text-muted-foreground/70">
          Para consultas comerciales, empresas e instituciones, visita nuestra{" "}
          <Link href="/corporativo" className="text-accent hover:underline">pagina Corporativo</Link>.
        </p>
      </div>

      {/* Form column */}
      <div className="lg:col-span-8">
        {submitted ? (
          <div className="p-6 rounded-2xl border border-border bg-card text-body-sm text-foreground">
            Gracias por escribirnos, se abrio tu cliente de correo con los datos precargados. Si no se abrio, escribinos directamente a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="nombre" required placeholder="Nombre" aria-label="Nombre" />
            <Input name="email" type="email" required placeholder="Email" aria-label="Email" />
            <Textarea name="mensaje" required placeholder="En que podemos ayudarte?" rows={5} aria-label="Mensaje" className="sm:col-span-2" />
            <Button type="submit" variant="accent" className="sm:col-span-2 w-fit">
              Enviar mensaje
            </Button>
          </form>
        )}
      </div>
    </Section>
  )
}

export function ContactoPageClient() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Contacto", href: "/contacto" },
        ]}
        eyebrow="Contacto"
        title="Hablemos."
        lede="Dudas sobre productos, pedidos o la comunidad Nexus? Escribinos y te respondemos a la brevedad."
      />
      <ContactSection />
    </SiteShell>
  )
}
