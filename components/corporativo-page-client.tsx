"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { Building2, GraduationCap, PartyPopper, ArrowRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Input, Textarea, Select } from "@/components/ui/input"
import { Eyebrow } from "@/components/ui/eyebrow"
import { PageHero } from "@/components/ui/page-hero"

// Placeholder de contacto derivado del dominio del sitio (SITE_URL en lib/site-config.ts).
// TODO: reemplazar por el email/telefono real de ventas corporativas antes de publicar.
const SALES_EMAIL = "corporativo@nexus-sports.cl"

/** Ancla unica del formulario, para el CTA primario del hero. */
const FORM_ANCHOR = "cotizar"

const propositions = [
  {
    icon: Building2,
    title: "Compras al por mayor",
    text: "Equipamiento de roundnet, pickleball, cornhole y más para tu institución, club o empresa, con precios y volúmenes especiales.",
  },
  {
    icon: GraduationCap,
    title: "Cursos corporativos",
    text: "Clínicas y capacitaciones a medida para colegios, universidades y equipos de trabajo, dictadas por instructores certificados.",
  },
  {
    icon: PartyPopper,
    title: "Eventos y activaciones",
    text: "Organizamos torneos, activaciones de marca y jornadas deportivas llave en mano para tu organización.",
  },
]

function PropositionsSection() {
  return (
    <Section spacing="content" aria-labelledby="propuesta-titulo">
      {/* El H2 faltaba: las tres tarjetas eran <h3> colgando de nada y rompian el
          outline de la pagina entre el H1 del hero y el H2 del formulario. */}
      <div className="mb-10 max-w-xl">
        <Eyebrow className="mb-3">Qué hacemos</Eyebrow>
        <h2
          id="propuesta-titulo"
          className="text-subsection font-semibold tracking-[-0.03em] text-foreground text-balance"
        >
          Tres formas de trabajar juntos.
        </h2>
      </div>

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
            <h3 className="text-body-lg font-semibold text-foreground">{item.title}</h3>
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
    <Section
      id={FORM_ANCHOR}
      spacing="content"
      tone="muted"
      containerClassName="max-w-[720px]"
      aria-labelledby="formulario-titulo"
    >
      <h2
        id="formulario-titulo"
        className="text-subsection font-semibold tracking-[-0.03em] text-foreground"
      >
        Cuéntanos qué necesita tu organización.
      </h2>
      <p className="mt-2 text-body-sm text-muted-foreground">
        Completa el formulario y te contactamos a la brevedad. También puedes escribirnos directamente a{" "}
        <a href={`mailto:${SALES_EMAIL}`} className="text-accent hover:underline">
          {SALES_EMAIL}
        </a>
        .
      </p>

      {submitted ? (
        <div className="mt-8 p-6 rounded-2xl border border-border bg-card text-body-sm text-foreground">
          Listo: se abrió tu cliente de correo con los datos precargados. Si no se abrió, escríbenos directamente a{" "}
          <a href={`mailto:${SALES_EMAIL}`} className="text-accent hover:underline">
            {SALES_EMAIL}
          </a>
          .
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input name="empresa" required placeholder="Empresa / institución" aria-label="Empresa o institución" className="sm:col-span-2" />
          <Input name="nombre" required placeholder="Nombre de contacto" aria-label="Nombre de contacto" />
          <Input name="email" type="email" required placeholder="Email" aria-label="Email" />
          <Input name="telefono" placeholder="Teléfono (opcional)" aria-label="Teléfono" />
          <Select name="interes" defaultValue={interestOptions[0]} aria-label="Interés">
            {interestOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Select>
          <Textarea name="mensaje" required placeholder="Cuéntanos brevemente qué necesitas" rows={4} aria-label="Mensaje" className="sm:col-span-2" />
          <Button type="submit" variant="accent" className="sm:col-span-2 group w-fit">
            Abrir correo con la solicitud
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
          </Button>
        </form>
      )}
    </Section>
  )
}

/**
 * Mismo tratamiento de hero que Nexuniversity (PageHero con `image`), con imagen y
 * mensaje propios: empresas, torneos y activaciones en vez de academia.
 *
 * El flujo comercial es de un salto: el CTA primario del hero baja directo al
 * formulario (#cotizar) y el secundario abre el correo a ventas, para quien
 * prefiere escribir en vez de llenar campos. El formulario repite el email como
 * salida alternativa.
 */
export function CorporativoPageClient() {
  return (
    <SiteShell overHero>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Corporativo", href: "/corporativo" },
        ]}
        eyebrow="Corporativo"
        title="Nexus para instituciones y empresas."
        lede="Compras al por mayor, cursos corporativos y torneos llave en mano. Nos encargamos de la jornada completa."
        image={{
          // PLACEHOLDER: foto de evento reutilizada de la home. Reemplazar por una
          // imagen de una activación corporativa real antes de publicar.
          src: "/images/events.jpg",
          alt: "Jornada deportiva de empresa organizada por Nexus",
        }}
        actions={
          <>
            <Button asChild variant="accent">
              <Link href={`#${FORM_ANCHOR}`}>Pedir una cotización</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-background/30 text-background hover:bg-background hover:text-foreground"
            >
              <a href={`mailto:${SALES_EMAIL}`}>Escribir a ventas</a>
            </Button>
          </>
        }
      />
      <PropositionsSection />
      <LeadFormSection />
    </SiteShell>
  )
}
