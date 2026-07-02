export type BlogPost = {
  id: number
  title: string
  excerpt: string
  category: string
  image: string
  date: string
  readTime: string
  featured: boolean
  slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Como elegir tu primer set de roundnet",
    excerpt: "Una guia completa para principiantes que quieren entrar al mundo del roundnet con el equipo correcto.",
    category: "Guias",
    image: "/images/blog-1.jpg",
    date: "28 Abr 2026",
    readTime: "5 min",
    featured: true,
    slug: "como-elegir-primer-set",
  },
  {
    id: 2,
    title: "5 ejercicios para mejorar tu spike",
    excerpt: "Rutina de entrenamiento disenada por nuestros coaches para llevar tu spike al siguiente nivel.",
    category: "Tips",
    image: "/images/blog-2.jpg",
    date: "22 Abr 2026",
    readTime: "4 min",
    featured: false,
    slug: "ejercicios-mejorar-spike",
  },
  {
    id: 3,
    title: "Guia de armado rapido: 30 segundos",
    excerpt: "Aprende a armar tu set en menos de 30 segundos con estos tips de nuestros jugadores profesionales.",
    category: "Guias",
    image: "/images/blog-3.jpg",
    date: "18 Abr 2026",
    readTime: "3 min",
    featured: false,
    slug: "guia-armado-rapido",
  },
  {
    id: 4,
    title: "Resultados del Nexus Open 2025",
    excerpt: "Resumen completo del torneo mas grande del ano con mas de 64 equipos participantes.",
    category: "Torneos",
    image: "/images/events.jpg",
    date: "10 Abr 2026",
    readTime: "6 min",
    featured: false,
    slug: "resultados-nexus-open",
  },
  {
    id: 5,
    title: "La comunidad Nexus en numeros",
    excerpt: "De 10 jugadores a 5.000: la historia de como el roundnet se expandio por todo Chile.",
    category: "Comunidad",
    image: "/images/about.jpg",
    date: "5 Abr 2026",
    readTime: "7 min",
    featured: false,
    slug: "comunidad-nexus-numeros",
  },
  {
    id: 6,
    title: "Nuevo set Nexus Tournament: review completo",
    excerpt: "Probamos el nuevo set de grado torneo durante 3 meses. Aca nuestras impresiones honestas.",
    category: "Producto",
    image: "/images/product-pro.jpg",
    date: "1 Abr 2026",
    readTime: "8 min",
    featured: false,
    slug: "review-nexus-tournament",
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}
