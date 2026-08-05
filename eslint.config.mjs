import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

/**
 * Config plana de ESLint 9. `next lint` fue removido en Next 16, asi que el
 * script `lint` del package.json invoca el CLI de ESLint directamente.
 *
 * Se usa `core-web-vitals` en vez del config base: sube a error las reglas que
 * afectan LCP y CLS (no-img-element, no-sync-scripts, no-html-link-for-pages),
 * que es justo lo que el estandar de rendimiento del proyecto pide cuidar.
 *
 * No se suma `eslint-config-next/typescript`: traeria typescript-eslint entero y
 * marcaria bastante en el codigo que ya existe. El chequeo de tipos lo cubre
 * `pnpm typecheck`.
 */
export default defineConfig([
  ...nextVitals,

  // globalIgnores pisa los ignores por defecto de eslint-config-next, asi que hay
  // que repetirlos ademas de los propios.
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])
