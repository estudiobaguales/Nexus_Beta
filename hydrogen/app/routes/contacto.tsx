import type {Route} from './+types/contacto';
import {ContactoPageClient} from '@/components/contacto-page-client';
import {JsonLd} from '@/components/json-ld';
import {buildMetadata, breadcrumbJsonLd, type Crumb} from '@/lib/seo';

const crumbs: Crumb[] = [
  {label: 'Inicio', href: '/'},
  {label: 'Contacto', href: '/contacto'},
];

export const meta: Route.MetaFunction = () =>
  buildMetadata({
    title: 'Contacto',
    description: 'Escríbenos tus dudas sobre productos, pedidos o la comunidad Nexus. Te respondemos a la brevedad.',
    path: '/contacto',
    keywords: ['nexus sports', 'contacto', 'soporte nexus'],
  });

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <ContactoPageClient />
    </>
  );
}
