'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Search } from 'lucide-react'
import { quickLinks } from '@/config/navigation'
import { searchSite } from '@/lib/search-index'
import { Button } from '@/components/ui/button'

/**
 * Search results.
 *
 * The query is read on the client so the page itself stays static. The index is
 * the same bundled one the header palette uses, so results are instant and the
 * route never needs a server render — which is also what keeps it off the
 * request path entirely.
 */
export function SearchResults() {
  const params = useSearchParams()
  const query = params.get('q') ?? ''
  const results = searchSite(query, 20)

  return (
    <>
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
              defaultValue={query}
              placeholder="Search admissions, academics, campus…"
              className="w-full rounded-xl border border-input bg-surface py-3.5 pl-12 pr-4 text-body-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
            />
          </div>
          <Button type="submit" size="lg">
            Search
          </Button>
        </div>
      </form>

      {query ? (
        <p className="mb-8 text-body-sm text-muted-foreground" aria-live="polite">
          {results.length === 0
            ? `Nothing matched “${query}”.`
            : `${results.length} ${results.length === 1 ? 'page matches' : 'pages match'} “${query}”.`}
        </p>
      ) : null}

      {query && results.length ? (
        <ul className="divide-y divide-border border-y border-border">
          {results.map((result) => (
            <li key={result.href}>
              <Link href={result.href} className="group flex items-center gap-6 py-6">
                <span className="min-w-0 flex-1">
                  <span className="block text-caption uppercase tracking-[0.12em] text-primary">
                    {result.section}
                  </span>
                  <span className="mt-2 block font-display text-h5 font-semibold transition-colors duration-300 group-hover:text-primary">
                    {result.title}
                  </span>
                  <span className="mt-1 block text-caption text-muted-foreground">
                    {result.href}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {query && !results.length ? (
        <div className="rounded-2xl border border-border bg-muted p-10 text-center">
          <p className="font-display text-h5 font-semibold">Nothing matched “{query}”</p>
          <p className="mx-auto mt-3 max-w-md text-body-sm text-muted-foreground text-pretty">
            Try a broader word, or start from one of the pages below. You can also call the school
            office and we will point you to the right place.
          </p>
        </div>
      ) : null}

      <div className={query && results.length ? 'mt-16' : 'mt-4'}>
        <p className="eyebrow mb-5">Popular pages</p>
        <ul className="flex flex-wrap gap-2.5">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full border border-border px-4 py-2.5 text-body-sm transition-colors hover:border-primary/50 hover:text-primary"
              >
                {link.title}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/sitemap"
              className="inline-flex min-h-11 items-center rounded-full border border-border px-4 py-2.5 text-body-sm transition-colors hover:border-primary/50 hover:text-primary"
            >
              Full sitemap
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
