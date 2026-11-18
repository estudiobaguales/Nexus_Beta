import {redirect} from 'react-router';
import type {Route} from './+types/products.$handle';

/** Ruta estandar de Shopify (correos, checkout, links externos) -> ficha del sitio. */
export function loader({params}: Route.LoaderArgs) {
  return redirect(`/productos/${params.handle}`, 301);
}
