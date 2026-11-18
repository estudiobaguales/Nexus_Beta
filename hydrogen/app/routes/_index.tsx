import {useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {getProducts, getCollections, storefrontClient} from '@/lib/shopify';
import type {Product, ShopifyCollection} from '@/lib/shopify/types';
import {HomeClient} from '@/components/home-client';
import {buildMetadata} from '@/lib/seo';
import {SITE_NAME} from '@/lib/site-config';

export const meta: Route.MetaFunction = () =>
  buildMetadata({
    title: 'NEXUS Sports | Deporte · Entretención · Comunidad · Torneos',
    absoluteTitle: true,
    description:
      'El ecosistema de los deportes alternativos en Chile. Deporte, Entretención, Comunidad, Torneos.',
    path: '/',
    imageAlt: SITE_NAME,
    keywords: ['nexus', 'nexus sports', 'roundnet', 'spikeball', 'deporte', 'chile', 'torneos', 'deportes alternativos'],
  });

export async function loader({context}: Route.LoaderArgs) {
  const sf = storefrontClient(context.storefront);
  const [productsResult, collectionsResult] = await Promise.allSettled([
    getProducts(sf, {first: 50}),
    getCollections(sf),
  ]);

  const products: Product[] =
    productsResult.status === 'fulfilled' ? productsResult.value.products : [];
  const collections: ShopifyCollection[] =
    collectionsResult.status === 'fulfilled' ? collectionsResult.value : [];

  if (productsResult.status === 'rejected') console.error('Error fetching products:', productsResult.reason);
  if (collectionsResult.status === 'rejected') console.error('Error fetching collections:', collectionsResult.reason);

  return {products, collections};
}

export default function Home() {
  const {products, collections} = useLoaderData<typeof loader>();
  return <HomeClient products={products} collections={collections} />;
}
