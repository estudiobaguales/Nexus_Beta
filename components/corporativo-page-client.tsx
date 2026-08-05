"use client"

import { useState, type FormEvent } from "react"
import { motion } from "motion/react"
import { Building2, GraduationCap, PartyPopper, ArrowRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Input, Textarea, Select } from "@/components/ui/input"
import { PageHero } from "@/components/ui/page-hero"

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

function PropositionsSection() {
  return (
    <Section spacing="content">
      {/* TODO (Fase 2/6): esta seccion tiene tres <h3> y ningun <h2> que los cuelgue. */}
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
            <p className="mt-2 text-ui text-muted-foreground">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
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
    <Section spacing="content" tone="muted" containerClassName="max-w-[720px]">
      <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-foreground">
        Cuentanos que necesita tu organizacion.
      </h2>
      <p className="mt-2 text-body-sm text-muted-foreground">
        Completa el formulario y te contactaremos a la brevedad. Tambien puedes escribirnos directamente a{" "}
        <a href={`mailto:${SALES_EMAIL}`} className="text-accent hover:underline">
          {SALES_EMAIL}
        </a>
        .
      </p>

      {submitted ? (
        <div className="mt-8 p-6 rounded-2xl border border-border bg-card text-body-sm text-foreground">
          Gracias, se abrio tu cliente de correo con los datos precargados. Si no se abrio, escribinos directamente a{" "}
          <a href={`mailto:${SALES_EMAIL}`} className="text-accent hover:underline">
            {SALES_EMAIL}
          </a>
          .
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input name="empresa" required placeholder="Empresa / institucion" aria-label="Empresa o institucion" className="sm:col-span-2" />
          <Input name="nombre" required placeholder="Nombre de contacto" aria-label="Nombre de contacto" />
          <Input name="email" type="email" required placeholder="Email" aria-label="Email" />
          <Input name="telefono" placeholder="Telefono (opcional)" aria-label="Telefono" />
          <Select name="interes" defaultValue={interestOptions[0]} aria-label="Interes">
            {interestOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Select>
          <Textarea name="mensaje" required placeholder="Contanos brevemente que necesitas" rows={4} aria-label="Mensaje" className="sm:col-span-2" />
          <Button type="submit" variant="accent" className="sm:col-span-2 group w-fit">
            Enviar solicitud
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
          </Button>
        </form>
      )}
    </Section>
  )
}

export function CorporativoPageClient() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Corporativo", href: "/corporativo" },
        ]}
        eyebrow="Corporativo"
        title="Nexus para instituciones y empresas."
        lede="Compras al por mayor, cursos corporativos y organizacion de eventos deportivos para tu organizacion."
      />
      <PropositionsSection />
      <LeadFormSection />
    </SiteShell>
  )
}
