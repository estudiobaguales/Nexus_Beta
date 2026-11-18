import {redirect} from 'react-router';

/** Ruta estandar de Shopify -> tienda del sitio. */
export function loader() {
  return redirect('/productos', 301);
}
