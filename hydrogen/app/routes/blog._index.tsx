import type {Route} from './+types/blog._index';
import {BlogPageClient} from '@/components/blog-page-client';
import {JsonLd} from '@/components/json-ld';
import {buildMetadata, breadcrumbJsonLd, type Crumb} from '@/lib/seo';

const crumbs: Crumb[] = [
  {label: 'Inicio', href: '/'},
  {label: 'Blog', href: '/blog'},
];

export const meta: Route.MetaFunction = () =>
  buildMetadata({
    title: 'Blog',
    description: 'Noticias, guías, consejos y todo lo que necesitas saber sobre roundnet en Chile.',
    path: '/blog',
  });

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <BlogPageClient />
    </>
  );
}
