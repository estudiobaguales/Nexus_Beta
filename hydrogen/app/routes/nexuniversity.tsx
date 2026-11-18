import type {Route} from './+types/nexuniversity';
import {NEXUNIVERSITY_ENABLED} from '@/lib/site-config';
import {NexuniversityPageClient} from '@/components/nexuniversity-page-client';
import {JsonLd} from '@/components/json-ld';
import {buildMetadata, breadcrumbJsonLd, type Crumb} from '@/lib/seo';

const crumbs: Crumb[] = [
  {label: 'Inicio', href: '/'},
  {label: 'Nexuniversity', href: '/nexuniversity'},
];

export const meta: Route.MetaFunction = () =>
  buildMetadata({
    title: 'Nexuniversity',
    description:
      'Cursos y torneos de roundnet en Chile. Instructores certificados, grupos reducidos y calendario 2026 de eventos y ligas.',
    path: '/nexuniversity',
    keywords: ['nexus sports', 'cursos roundnet', 'academia roundnet', 'torneos roundnet', 'nexuniversity'],
    image: '/images/courses.jpg',
  });

export function loader() {
  // Seccion deshabilitada en el lanzamiento: ver NEXUNIVERSITY_ENABLED en lib/site-config.ts.
  if (!NEXUNIVERSITY_ENABLED) throw new Response('Not found', {status: 404});
  return null;
}

export default function NexuniversityPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <NexuniversityPageClient />
    </>
  );
}
