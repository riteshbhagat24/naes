import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { flattenNavigation } from '@/config/navigation'
import { getEvents, getGallery, getNews, getStages } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { groupBy } from '@/utils/format'

export const metadata: Metadata = buildMetadata({
  title: 'Sitemap',
  description: 'Every page on the New Apostolic English High School website, in one list.',
  path: '/sitemap',
})

export default function SitemapPage() {
  const sections = groupBy(flattenNavigation(), (entry) => entry.section)

  const collections = [
    {
      title: 'Academic stages',
      links: getStages().stages.map((stage) => ({
        title: stage.name,
        href: `/academics/${stage.slug}`,
      })),
    },
    {
      title: 'Gallery albums',
      links: getGallery().albums.map((album) => ({
        title: album.title,
        href: `/gallery/${album.slug}`,
      })),
    },
    {
      title: 'News stories',
      links: getNews().map((item) => ({ title: item.title, href: `/news/${item.slug}` })),
    },
    {
      title: 'Events',
      links: getEvents().map((event) => ({ title: event.title, href: `/events/${event.slug}` })),
    },
  ]

  return (
    <>
      <PageHero
        eyebrow="Index"
        title="Sitemap"
        lead="Every page on this website, grouped the way the navigation groups it."
        trail={[{ title: 'Sitemap', href: '/sitemap' }]}
      />

      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(sections).map(([section, entries]) => (
              <div key={section}>
                <h2 className="eyebrow mb-5">{section}</h2>
                <ul className="space-y-2.5 border-t border-border pt-5">
                  {entries.map((entry) => (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        className="link-underline text-body-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {entry.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {collections.map((collection) => (
              <div key={collection.title}>
                <h2 className="eyebrow mb-5">{collection.title}</h2>
                <ul className="space-y-2.5 border-t border-border pt-5">
                  {collection.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link-underline text-body-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
