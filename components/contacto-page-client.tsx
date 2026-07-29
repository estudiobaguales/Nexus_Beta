"use client"

import { useState, type FormEvent } from "react"
import { motion } from "motion/react"
import { Mail, Instagram } from "lucide-react"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Placeholder de contacto derivado del dominio del sitio (SITE_URL en lib/site-config.ts).
// TODO: reemplazar por el email/redes reales antes de publicar.
const CONTACT_EMAIL = "hola@nexus-sports.cl"

function PageHero() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto", href: "/contacto" }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Contacto</p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
            Hablemos.
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground max-w-lg leading-relaxed">
            Dudas sobre productos, pedidos o la comunidad Nexus? Escribinos y te respondemos a la brevedad.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

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
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info column */}
        <div className="lg:col-span-4">
          <h2 className="text-[15px] font-semibold text-foreground">Datos de contacto</h2>
          <div className="mt-5 flex flex-col gap-4">
            <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-center gap-3 text-[14px] text-muted-foreground hover:text-foreground transition-colors">
              <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border group-hover:border-foreground/20 transition-colors">
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              </span>
              {CONTACT_EMAIL}
            </a>
            <a href="#" className="group flex items-center gap-3 text-[14px] text-muted-foreground hover:text-foreground transition-colors">
              <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border group-hover:border-foreground/20 transition-colors">
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </span>
              @nexus.sports
            </a>
          </div>
          <p className="mt-6 text-[12px] text-muted-foreground/70 leading-relaxed">
            Para consultas comerciales, empresas e instituciones, visita nuestra{" "}
            <a href="/corporativo" className="text-accent hover:underline">pagina Corporativo</a>.
          </p>
        </div>

        {/* Form column */}
        <div className="lg:col-span-8">
          {submitted ? (
            <div className="p-6 rounded-2xl border border-border bg-card text-[14px] text-foreground">
              Gracias por escribirnos, se abrio tu cliente de correo con los datos precargados. Si no se abrio, escribinos directamente a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="nombre" required placeholder="Nombre" className="h-12 px-4 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
              <input name="email" type="email" required placeholder="Email" className="h-12 px-4 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
              <textarea name="mensaje" required placeholder="En que podemos ayudarte?" rows={5} className="sm:col-span-2 px-4 py-3 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none" />
              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground text-[13px] font-semibold hover:brightness-105 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 w-fit"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export function ContactoPageClient() {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen pt-16">
        <PageHero />
        <ContactSection />
      </main>
      <Footer />
    </CartProvider>
  )
}
