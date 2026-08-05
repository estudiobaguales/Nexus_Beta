"use client"

import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { PageHero } from "@/components/ui/page-hero"
import { Button } from "@/components/ui/button"
import { AcademyStory } from "@/components/sections/academy-story"
import { CoursesSection } from "@/components/sections/courses-section"
import { EventsSection } from "@/components/sections/events-section"
import { FeaturedPosts } from "@/components/sections/featured-posts"
import { ClosingCta } from "@/components/sections/closing-cta"
import { getRelatedPosts } from "@/lib/blog-data"

/**
 * Orden de la pagina, segun el brief:
 *   hero con foto -> historia y trayectoria -> cursos -> blogs relacionados -> CTA
 *
 * EventsSection queda entre cursos y blogs: ya existia en esta pagina y los torneos
 * son parte de la oferta de la academia, asi que se conserva en vez de sacarla.
 *
 * showFooterCta={false}: ClosingCta ya es el cierre de esta pagina y el footer trae
 * su propia franja, igual que en la home.
 */
export function NexuniversityPageClient() {
  // Los articulos del deporte que ensena la academia, con la misma cascada del PDP.
  const posts = getRelatedPosts({ sport: "Spikeball" })

  return (
    <SiteShell overHero showFooterCta={false}>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Nexuniversity", href: "/nexuniversity" },
        ]}
        eyebrow="Nexuniversity"
        title="Formación y competencia."
        lede="Instructores certificados, grupos reducidos y un calendario de torneos en todo Chile. Del primer saque al torneo nacional."
        image={{
          // PLACEHOLDER: foto de comunidad reutilizada de la home. Reemplazar por
          // una imagen propia de la academia antes de publicar.
          src: "/images/hero-main.jpg",
          alt: "Grupo de jugadores compartiendo en una jornada de roundnet al aire libre",
        }}
        actions={
          <>
            <Button asChild variant="accent">
              <Link href="#cursos">Ver cursos disponibles</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-background/30 text-background hover:bg-background hover:text-foreground"
            >
              <Link href="/contacto">Consultar por un curso</Link>
            </Button>
          </>
        }
      />

      <AcademyStory />
      <CoursesSection />
      <EventsSection />

      <FeaturedPosts
        eyebrow="Para leer"
        title={
          <>
            Antes de tu <span className="text-muted-foreground">primera clase.</span>
          </>
        }
        posts={posts}
      />

      <ClosingCta
        title={
          <>
            ¿Partimos <span className="text-accent">este mes?</span>
          </>
        }
        lede="Cuéntanos tu nivel y te recomendamos el curso que te sirve. Sin compromiso."
        actions={
          <>
            <Button asChild>
              <Link href="/contacto">Consultar por un curso</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#cursos">Ver el calendario</Link>
            </Button>
          </>
        }
      />
    </SiteShell>
  )
}
