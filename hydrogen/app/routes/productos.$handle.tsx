import {useLoaderData} from 'react-router';
import type {Route} from './+types/productos.$handle';
import {getProduct, getProducts, storefrontClient, type ShopifyClient} from '@/lib/shopify';
import type {Product} from '@/lib/shopify/types';
import {getFirstAvailableVariant} from '@/lib/shopify/utils';
import {absoluteUrl, SITE_NAME} from '@/lib/site-config';
import {buildMetadata, breadcrumbJsonLd, type Crumb} from '@/lib/seo';
import {JsonLd} from '@/components/json-ld';
import {ProductDetailPageClient} from '@/components/product-detail-page-client';

export const meta: Route.MetaFunction = ({data}) => {
  const product = data?.product;
  if (!product) return [];

  const image = product.images.edges[0]?.node;

  // El meta title/description SEO de Shopify manda; si no esta cargado se cae al
  // titulo del producto (con el sufijo de marca) y al inicio de la descripcion.
  const seoTitle = product.seo?.title?.trim();
  const seoDescription = product.seo?.description?.trim();

  return buildMetadata({
    title: seoTitle || product.title,
    absoluteTitle: Boolean(seoTitle),
    description: seoDescription || product.description.slice(0, 160),
    path: `/productos/${product.handle}`,
    ...(image ? {image: image.url, imageAlt: image.altText || product.title} : {}),
  });
};

/** Google pide priceValidUntil en la oferta; sin un dato real, se proyecta un ano. */
function oneYearFromNow(): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().split('T')[0];
}

const RELATED_PRODUCTS_LIMIT = 4;

/**
 * Productos relacionados: primero los del mismo productType, y si no alcanzan se
 * completa con el resto del catalogo para no dejar una fila coja.
 * Si Shopify falla, devuelve [] y el bloque no se renderiza.
 */
async function getRelatedProducts(sf: ShopifyClient, current: Product): Promise<Product[]> {
  const {products} = await getProducts(sf, {first: 50}).catch(() => ({
    products: [] as Product[],
    pageInfo: {hasNextPage: false, endCursor: null},
  }));

  const others = products.filter((p) => p.handle !== current.handle);
  const sameType = current.productType
    ? others.filter((p) => p.productType === current.productType)
    : [];
  const rest = others.filter((p) => !sameType.includes(p));

  return [...sameType, ...rest].slice(0, RELATED_PRODUCTS_LIMIT);
}

export async function loader({params, context}: Route.LoaderArgs) {
  const sf = storefrontClient(context.storefront);
  const product = await getProduct(sf, params.handle).catch(() => null);
  if (!product) throw new Response('Not found', {status: 404});

  const relatedProducts = await getRelatedProducts(sf, product);
  return {product, relatedProducts};
}

export default function ProductDetailPage() {
  const {product, relatedProducts} = useLoaderData<typeof loader>();

  const price = product.priceRange.minVariantPrice;
  const images = product.images.edges.map((edge) => edge.node);
  const url = absoluteUrl(`/productos/${product.handle}`);

  // El SKU real de la variante (el GID de Shopify no es un SKU valido).
  const variant = getFirstAvailableVariant(product) ?? product.variants[0];
  const sku = variant?.sku || product.handle;

  const crumbs: Crumb[] = [
    {label: 'Inicio', href: '/'},
    {label: 'Tienda', href: '/productos'},
    {label: product.title, href: `/productos/${product.handle}`},
  ];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.info?.shortDescription || product.description,
    image: images.length ? images.map((image) => absoluteUrl(image.url)) : undefined,
    sku,
    ...(product.productType ? {category: product.productType} : {}),
    brand: {'@type': 'Brand', name: 'NEXUS'},
    offers: {
      '@type': 'Offer',
      priceCurrency: price.currencyCode,
      price: price.amount,
      priceValidUntil: oneYearFromNow(),
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url,
      seller: {'@type': 'Organization', name: SITE_NAME},
    },
  };

  return (
    <>
      <JsonLd data={[productJsonLd, breadcrumbJsonLd(crumbs)]} />
      <ProductDetailPageClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
