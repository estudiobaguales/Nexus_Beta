import {useLoaderData} from 'react-router';
import type {Route} from './+types/productos.categoria.$handle';
import {getCollection, getCollectionProducts, storefrontClient} from '@/lib/shopify';
import {buildMetadata, breadcrumbJsonLd, itemListJsonLd, type Crumb} from '@/lib/seo';
import {JsonLd} from '@/components/json-ld';
import {CollectionPageClient} from '@/components/collection-page-client';

export const meta: Route.MetaFunction = ({data}) => {
  const collection = data?.collection;
  if (!collection) return [];

  return buildMetadata({
    title: `${collection.title} | Tienda`,
    description:
      collection.description?.slice(0, 160) || `Productos de la categoría ${collection.title} en Nexus.`,
    path: `/productos/categoria/${collection.handle}`,
    ...(collection.image
      ? {image: collection.image.url, imageAlt: collection.image.altText || collection.title}
      : {}),
  });
};

export async function loader({params, context}: Route.LoaderArgs) {
  const sf = storefrontClient(context.storefront);
  const collection = await getCollection(sf, params.handle).catch(() => null);
  if (!collection) throw new Response('Not found', {status: 404});

  const products = await getCollectionProducts(sf, {collection: params.handle}).catch(() => []);
  return {collection, products};
}

export default function CategoriaPage() {
  const {collection, products} = useLoaderData<typeof loader>();

  const crumbs: Crumb[] = [
    {label: 'Inicio', href: '/'},
    {label: 'Tienda', href: '/productos'},
    {label: collection.title, href: `/productos/categoria/${collection.handle}`},
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          products.length > 0 ? itemListJsonLd(products.slice(0, 20)) : null,
        ]}
      />
      <CollectionPageClient collection={collection} products={products} />
    </>
  );
}
