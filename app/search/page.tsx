import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
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
          {/* The form is server-rendered so the page is complete before any
              JavaScript arrives; only the results need the query string. */}
          <form action="/search" method="get" className="mb-14 max-w-2xl" role="search">
            <label htmlFor="site-search" className="sr-only">
              Search the website
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 size-[1.15rem] -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="site-search"
                  type="search"
                  name="q"
                  placeholder="Search admissions, academics, campus…"
                  className="w-full rounded-xl border border-input bg-surface py-3.5 pl-12 pr-4 text-body-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </div>
          </form>

          <noscript>
            <p className="mb-10 rounded-xl border border-border bg-muted px-5 py-4 text-body-sm text-muted-foreground">
              Search needs JavaScript. The{' '}
              <Link href="/sitemap" className="link-underline font-medium text-primary">
                full sitemap
              </Link>{' '}
              lists every page on this website.
            </p>
          </noscript>

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
