import {useLoaderData} from 'react-router';
import type {Route} from './+types/blog.$slug';
import {getBlogPost} from '@/lib/blog-data';
import {absoluteUrl, SITE_NAME, ORG_LOGO} from '@/lib/site-config';
import {buildMetadata, breadcrumbJsonLd, type Crumb} from '@/lib/seo';
import {JsonLd} from '@/components/json-ld';
import {BlogPostPageClient} from '@/components/blog-post-page-client';

function crumbsFor(post: {title: string; slug: string}): Crumb[] {
  return [
    {label: 'Inicio', href: '/'},
    {label: 'Blog', href: '/blog'},
    {label: post.title, href: `/blog/${post.slug}`},
  ];
}

export function loader({params}: Route.LoaderArgs) {
  const post = getBlogPost(params.slug);
  if (!post) throw new Response('Not found', {status: 404});
  return {slug: post.slug};
}

export const meta: Route.MetaFunction = ({data}) => {
  const post = data ? getBlogPost(data.slug) : undefined;
  if (!post) return [];
  return buildMetadata({
    title: post.title,
    description: post.excerpt.slice(0, 160),
    path: `/blog/${post.slug}`,
    type: 'article',
    image: post.image,
    imageAlt: post.title,
  });
};

export default function BlogPostPage() {
  const {slug} = useLoaderData<typeof loader>();
  // El contenido es estatico (lib/blog-data.ts): se resuelve aca para no serializarlo.
  const post = getBlogPost(slug)!;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.image)],
    datePublished: post.dateISO,
    dateModified: post.updatedISO ?? post.dateISO,
    articleSection: post.category,
    inLanguage: 'es-CL',
    author: {'@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/')},
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {'@type': 'ImageObject', url: absoluteUrl(ORG_LOGO)},
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd(crumbsFor(post))]} />
      <BlogPostPageClient post={post} />
    </>
  );
}
