import type { Metadata } from 'next'
import { Suspense } from 'react'
import { buildMetadata } from '@/lib/seo'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { SearchResults } from '@/features/search/search-results'

export const metadata: Metadata = buildMetadata({
  title: 'Search',
  description: 'Search the New Apostolic English High School website.',
  path: '/search',
  noindex: true,
})

/**
 * Search.
 *
 * Deliberately static. Reading `searchParams` here would opt the route into
 * per-request rendering, which is what previously made this the only page on
 * the site that could fail at runtime. The query is read on the client instead,
 * against the same bundled index the header palette uses — so the page is
 * served from the CDN, results are instant, and a shared `?q=` link still works.
 */
export default function SearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Search the website"
        lead="Find a page by name, or by what it is about — try “fees”, “sports”, “nursery” or “transport”."
        trail={[{ title: 'Search', href: '/search' }]}
      />

      <Section tone="default" size="lg">
        <Container>
          <Suspense
            fallback={
              <div className="h-14 w-full max-w-2xl animate-pulse rounded-xl bg-muted" aria-hidden />
            }
          >
            <SearchResults />
          </Suspense>
        </Container>
      </Section>
    </>
  )
}
