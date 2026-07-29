"use client"

import { useState, type FormEvent } from "react"
import { motion } from "motion/react"
import { Building2, GraduationCap, PartyPopper, ArrowRight } from "lucide-react"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Placeholder de contacto derivado del dominio del sitio (SITE_URL en lib/site-config.ts).
// TODO: reemplazar por el email/telefono real de ventas corporativas antes de publicar.
const SALES_EMAIL = "corporativo@nexus-sports.cl"

const propositions = [
  {
    icon: Building2,
    title: "Compras al por mayor",
    text: "Equipamiento de roundnet, pickleball, cornhole y mas para tu institucion, club o empresa, con precios y volumenes especiales.",
  },
  {
    icon: GraduationCap,
    title: "Cursos corporativos",
    text: "Clinicas y capacitaciones a medida para colegios, universidades y equipos de trabajo, dictadas por instructores certificados.",
  },
  {
    icon: PartyPopper,
    title: "Eventos y activaciones",
    text: "Organizamos torneos, activaciones de marca y jornadas deportivas llave en mano para tu organizacion.",
  },
]

function PageHero() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Corporativo", href: "/corporativo" }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Corporativo</p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
            Nexus para instituciones y empresas.
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground max-w-lg leading-relaxed">
            Compras al por mayor, cursos corporativos y organizacion de eventos deportivos para tu organizacion.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function PropositionsSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {propositions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent mb-5">
                <item.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-[17px] font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const interestOptions = ["Compras al por mayor", "Cursos corporativos", "Eventos y activaciones", "Otro"]

function LeadFormSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Contacto corporativo - ${data.get("empresa") || ""}`)
    const body = encodeURIComponent(
      `Empresa: ${data.get("empresa")}\nContacto: ${data.get("nombre")}\nEmail: ${data.get("email")}\nTelefono: ${data.get("telefono")}\nInteres: ${data.get("interes")}\n\nMensaje:\n${data.get("mensaje")}`
    )
    window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section className="py-16 lg:py-20 bg-secondary/30">
      <div className="mx-auto max-w-[720px] px-6 lg:px-10">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-foreground">
          Cuentanos que necesita tu organizacion.
        </h2>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Completa el formulario y te contactaremos a la brevedad. Tambien puedes escribirnos directamente a{" "}
          <a href={`mailto:${SALES_EMAIL}`} className="text-accent hover:underline">
            {SALES_EMAIL}
          </a>
          .
        </p>

        {submitted ? (
          <div className="mt-8 p-6 rounded-2xl border border-border bg-card text-[14px] text-foreground">
            Gracias, se abrio tu cliente de correo con los datos precargados. Si no se abrio, escribinos directamente a{" "}
            <a href={`mailto:${SALES_EMAIL}`} className="text-accent hover:underline">
              {SALES_EMAIL}
            </a>
            .
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="empresa" required placeholder="Empresa / institucion" className="sm:col-span-2 h-12 px-4 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
            <input name="nombre" required placeholder="Nombre de contacto" className="h-12 px-4 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
            <input name="email" type="email" required placeholder="Email" className="h-12 px-4 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
            <input name="telefono" placeholder="Telefono (opcional)" className="h-12 px-4 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent" />
            <select name="interes" defaultValue={interestOptions[0]} className="h-12 px-4 rounded-xl border border-border bg-background text-[14px] text-foreground focus:outline-none focus:border-accent">
              {interestOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <textarea name="mensaje" required placeholder="Contanos brevemente que necesitas" rows={4} className="sm:col-span-2 px-4 py-3 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none" />
            <button
              type="submit"
              className="sm:col-span-2 group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-accent text-accent-foreground text-[13px] font-semibold hover:brightness-105 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 w-fit"
            >
              Enviar solicitud
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export function CorporativoPageClient() {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen pt-16">
        <PageHero />
        <PropositionsSection />
        <LeadFormSection />
      </main>
      <Footer />
    </CartProvider>
  )
}
