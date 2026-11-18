import {redirect} from 'react-router';

/**
 * El checkout de Shopify enlaza a /cart ("volver al carrito"). En este sitio el
 * carrito es un panel lateral, asi que se vuelve a la tienda (el carrito sigue en
 * la cookie y se abre desde el navbar).
 */
export function loader() {
  return redirect('/productos', 302);
}
