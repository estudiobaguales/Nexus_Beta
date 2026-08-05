/**
 * Inyecta uno o varios bloques de structured data.
 * Escapa "<" a <: sin eso, un titulo o descripcion que contenga "</script>"
 * (por ejemplo desde una descripcion de producto de Shopify) cerraria la etiqueta
 * antes de tiempo.
 */
function serialize(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const blocks = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocks.filter(Boolean).map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(block) }}
        />
      ))}
    </>
  )
}
