import {SITE_URL} from '@/lib/site-config';

/** Mismo contenido que generaba app/robots.ts en Next. */
export function loader() {
  const body = [
    'User-Agent: *',
    'Allow: /',
    // /cart y /account no existen en este sitio; se bloquea /api por compatibilidad con el sitio anterior.
    'Disallow: /api/',
    '',
    `Host: ${SITE_URL}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}
