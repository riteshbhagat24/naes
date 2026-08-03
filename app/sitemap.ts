import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { flattenNavigation } from '@/config/navigation'
import { getEvents, getGallery, getNews, getStages } from '@/lib/data'

/**
 * XML sitemap.
 *
 * Built from the same navigation structure the header renders, plus every
 * generated route, so a page cannot exist without being listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const priorityFor = (href: string) => {
    if (href === '/') return 1
    if (href.startsWith('/admissions')) return 0.9
    if (href.startsWith('/academics') || href.startsWith('/about')) return 0.8
    if (href.startsWith('/campus-life')) return 0.7
    return 0.6
  }

  const staticRoutes = flattenNavigation()
    .filter((entry) => entry.href !== '/search')
    .map((entry) => ({
      url: `${siteConfig.url}${entry.href === '/' ? '' : entry.href}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: priorityFor(entry.href),
    }))

  const stages = getStages().stages.map((stage) => ({
    url: `${siteConfig.url}/academics/${stage.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const albums = getGallery().albums.map((album) => ({
    url: `${siteConfig.url}/gallery/${album.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const news = getNews().map((item) => ({
    url: `${siteConfig.url}/news/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const events = getEvents().map((event) => ({
    url: `${siteConfig.url}/events/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const legal = ['/privacy-policy', '/terms', '/sitemap', '/mandatory-disclosure'].map((href) => ({
    url: `${siteConfig.url}${href}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  const all = [...staticRoutes, ...stages, ...albums, ...news, ...events, ...legal]
  const seen = new Set<string>()
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })
}
