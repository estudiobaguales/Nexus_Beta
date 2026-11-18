import {redirect} from 'react-router';
import type {Route} from './+types/collections.$handle';

/** Ruta estandar de Shopify -> categoria del sitio ("all" es el catalogo completo). */
export function loader({params}: Route.LoaderArgs) {
  if (params.handle === 'all') return redirect('/productos', 301);
  return redirect(`/productos/categoria/${params.handle}`, 301);
}
