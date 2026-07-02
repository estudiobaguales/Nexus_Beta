import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"
import { getAllBlogSlugs } from "@/lib/blog-data"
import { getProducts } from "@/lib/shopify"

const staticRoutes = ["", "/spikeball", "/linderball", "/cursos", "/eventos", "/nosotros", "/blog", "/productos"]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  let productEntries: MetadataRoute.Sitemap = []
  try {
    const products = await getProducts({ first: 100 })
    productEntries = products.map((p) => ({
      url: `${SITE_URL}/productos/${p.handle}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }))
  } catch {
    productEntries = []
  }

  return [...staticEntries, ...blogEntries, ...productEntries]
}
