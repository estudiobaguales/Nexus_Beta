import type {Route} from './+types/[sitemap.xml]';
import {SITE_URL, NEXUNIVERSITY_ENABLED} from '@/lib/site-config';
import {blogPosts} from '@/lib/blog-data';
import {getProducts, getCollections, storefrontClient} from '@/lib/shopify';

const staticRoutes = [
  '',
  '/spikeball',
  ...(NEXUNIVERSITY_ENABLED ? ['/nexuniversity'] : []),
  '/corporativo',
  '/contacto',
  '/blog',
  '/productos',
];

type Entry = {url: string; lastModified: Date; changeFrequency: string; priority: number};

/** Mismas URLs, prioridades y frecuencias que el app/sitemap.ts de Next. */
export async function loader({context}: Route.LoaderArgs) {
  const sf = storefrontClient(context.storefront);
  const now = new Date();

  const staticEntries: Entry[] = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const blogEntries: Entry[] = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedISO ?? post.dateISO),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  let productEntries: Entry[] = [];
  try {
    const {products} = await getProducts(sf, {first: 100});
    productEntries = products.map((p) => ({
      url: `${SITE_URL}/productos/${p.handle}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch {
    productEntries = [];
  }

  let collectionEntries: Entry[] = [];
  try {
    const collections = await getCollections(sf);
    collectionEntries = collections.map((c) => ({
      url: `${SITE_URL}/productos/categoria/${c.handle}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  } catch {
    collectionEntries = [];
  }

  const entries = [...staticEntries, ...blogEntries, ...productEntries, ...collectionEntries];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries
      .map(
        (e) =>
          `<url>\n<loc>${e.url}</loc>\n<lastmod>${e.lastModified.toISOString()}</lastmod>\n<changefreq>${e.changeFrequency}</changefreq>\n<priority>${e.priority}</priority>\n</url>`,
      )
      .join('\n') +
    '\n</urlset>\n';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `max-age=${60 * 60}`,
    },
  });
}
