import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import type {Route} from './+types/root';
import appStyles from '~/styles/app.css?url';
import {CartProvider} from '@/components/cart/cart-context';
import {JsonLd} from '@/components/json-ld';
import {NotFoundPage} from '@/components/not-found-page';
import {
  SITE_URL,
  SITE_NAME,
  ORG_LOGO,
  SOCIAL_LINKS,
  absoluteUrl,
} from '@/lib/site-config';

export type RootLoader = typeof loader;

/** Evita volver a pedir los datos raiz en cada navegacion (no cambian). */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};

export function links() {
  return [
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous'},
    // Montserrat (antes via next/font). display=swap igual que en Next.
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap',
    },
    {rel: 'stylesheet', href: appStyles},
    {rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg'},
    {rel: 'shortcut icon', href: '/favicon.svg'},
    {rel: 'apple-touch-icon', href: '/apple-icon.png'},
  ];
}

/** Solo se usa cuando una ruta falla (404/500): las rutas normales traen su propio meta. */
export const meta: Route.MetaFunction = ({error}) => {
  if (!error) return [];
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  return [
    {title: is404 ? 'Página no encontrada | Nexus' : 'Error | Nexus'},
    {name: 'robots', content: 'noindex, follow'},
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  const {storefront, env} = context;

  return {
    // El carrito corre en el navegador con el token publico de Storefront.
    storeDomain: env.PUBLIC_STORE_DOMAIN,
    storefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  };
}

const description =
  'El ecosistema de los deportes alternativos en Chile. Deporte, Entretención, Comunidad, Torneos.';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl(ORG_LOGO),
  description,
  areaServed: {'@type': 'Country', name: 'Chile'},
  ...(SOCIAL_LINKS.length > 0 ? {sameAs: SOCIAL_LINKS} : {}),
};

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<RootLoader>('root');

  return (
    <html lang="es" className="bg-background">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#0c0c0f" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans antialiased min-h-screen" suppressHydrationWarning>
        <JsonLd data={organizationJsonLd} />
        <CartProvider
          storeDomain={data?.storeDomain ?? ''}
          storefrontToken={data?.storefrontToken ?? ''}
        >
          {children}
        </CartProvider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<RootLoader>('root');

  if (!data) return <Outlet />;

  return (
    <Analytics.Provider cart={null} shop={data.shop} consent={data.consent}>
      <Outlet />
    </Analytics.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  let errorMessage = 'Error desconocido';
  let errorStatus = 500;
  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="p-8">
      <h1 className="text-page font-semibold">Ocurrió un error</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && <pre className="mt-4 whitespace-pre-wrap">{errorMessage}</pre>}
    </div>
  );
}
