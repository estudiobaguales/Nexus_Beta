import {useLoaderData} from 'react-router';
import type {Route} from './+types/productos._index';
import {getProducts, storefrontClient} from '@/lib/shopify';
import type {Product} from '@/lib/shopify/types';
import {ProductsPageClient} from '@/components/products-page-client';
import {JsonLd} from '@/components/json-ld';
import {buildMetadata, breadcrumbJsonLd, itemListJsonLd, type Crumb} from '@/lib/seo';

const crumbs: Crumb[] = [
  {label: 'Inicio', href: '/'},
  {label: 'Tienda', href: '/productos'},
];

export const meta: Route.MetaFunction = () =>
  buildMetadata({
    title: 'Tienda',
    description:
      'Equipamiento para Spikeball / Roundnet, Pickleball y Ultimate Frisbee. Sets completos, accesorios, ropa y repuestos.',
    path: '/productos',
  });

export async function loader({context}: Route.LoaderArgs) {
  let products: Product[] = [];
  try {
    ({products} = await getProducts(storefrontClient(context.storefront), {first: 50}));
  } catch {
    products = [];
  }
  return {products};
}

export default function ProductosPage() {
  const {products} = useLoaderData<typeof loader>();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          products.length > 0 ? itemListJsonLd(products.slice(0, 20)) : null,
        ]}
      />
      <ProductsPageClient products={products} />
    </>
  );
}
