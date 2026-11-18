import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge no lee globals.css: usa su configuracion por defecto. Ahi el grupo
 * `font-size` solo reconoce `text-base` y las tallas tipo t-shirt (xs/sm/md/lg/xl),
 * mientras que `text-color` valida con `isAny`, o sea acepta cualquier valor.
 *
 * Sin esta extension, los tokens de la escala NEXUS (--text-* de globals.css) caen
 * en `text-color` y colisionan con el color real. En el Boton eso borraba el color:
 *
 *   cva -> "... bg-foreground text-background ... h-12 px-8 text-ui"
 *                             ^ se descartaba          ^ ganaba como "color"
 *
 * y el pill primario quedaba con fondo negro y texto negro heredado del body.
 * Declarar los tokens como font-size deja que color y tamano convivan.
 *
 * Mantener esta lista sincronizada con los --text-* de app/globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'micro',
            'eyebrow',
            'caption',
            'ui',
            'body',
            'body-sm',
            'body-lg',
            'display',
            'section',
            'page',
            'subsection',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
