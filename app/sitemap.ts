import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"
import { blogPosts } from "@/lib/blog-data"
import { getProducts, getCollections } from "@/lib/shopify"

const staticRoutes = ["", "/spikeball", "/nexuniversity", "/corporativo", "/contacto", "/blog", "/productos"]

// El sitemap consulta Shopify: sin esto se regenera en cada request.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }))

  // lastModified real por articulo. Antes todos reportaban la hora de generacion,
  // asi que un post sin cambios se veia recien modificado en cada build.
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedISO ?? post.dateISO),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  let productEntries: MetadataRoute.Sitemap = []
  try {
    const { products } = await getProducts({ first: 100 })
    productEntries = products.map((p) => ({
      url: `${SITE_URL}/productos/${p.handle}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }))
  } catch {
    productEntries = []
  }

  let collectionEntries: MetadataRoute.Sitemap = []
  try {
    const collections = await getCollections()
    collectionEntries = collections.map((c) => ({
      url: `${SITE_URL}/productos/categoria/${c.handle}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }))
  } catch {
    collectionEntries = []
  }

  return [...staticEntries, ...blogEntries, ...productEntries, ...collectionEntries]
}
