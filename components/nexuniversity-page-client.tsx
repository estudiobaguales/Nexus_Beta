"use client"

import { SiteShell } from "@/components/site-shell"
import { PageHero } from "@/components/ui/page-hero"
import { CoursesSection } from "@/components/sections/courses-section"
import { EventsSection } from "@/components/sections/events-section"

export function NexuniversityPageClient() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Nexuniversity", href: "/nexuniversity" },
        ]}
        eyebrow="Nexuniversity"
        title="Formacion y competencia."
        lede="Instructores certificados, grupos reducidos y un calendario de torneos en todo Chile. Del primer saque al torneo nacional."
      />
      <CoursesSection />
      <EventsSection />
    </SiteShell>
  )
}
