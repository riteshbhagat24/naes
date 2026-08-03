'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCcw } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Container } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[app] unhandled error', error)
  }, [error])

  return (
    <section className="flex min-h-[70svh] items-center py-section">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Something went wrong</p>
          <h1 className="text-h1 text-balance">We could not load this page</h1>
          <p className="mt-6 text-body-lg text-muted-foreground text-pretty">
            This is our fault, not yours. Try again — and if it keeps happening, call the school
            office on{' '}
            <a href={siteConfig.contact.phoneHref} className="link-underline text-primary">
              {siteConfig.contact.phone}
            </a>{' '}
            and we will help you directly.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" onClick={reset}>
              <RefreshCcw aria-hidden />
              Try again
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">Back to the homepage</Link>
            </Button>
          </div>

          {error.digest ? (
            <p className="mt-10 text-caption text-muted-foreground">
              Reference: <code className="font-mono">{error.digest}</code>
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
