'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RefreshCcw } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Container } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

/**
 * Route-level error boundary.
 *
 * Rendered on the dark surface deliberately: the header is transparent over the
 * photographic mastheads, so an error screen on a light background would leave
 * the navigation illegible exactly when a visitor most needs it.
 */
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
    <section className="relative isolate mt-[calc(var(--nav-height)*-1)] flex min-h-[86svh] items-center overflow-hidden bg-sand-950 pb-section pt-[calc(var(--nav-height)+4rem)]">
      <Image
        src="/images/gallery/campus-moment-6.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-20"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950/92 via-sand-950/90 to-sand-950/80"
      />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 text-gold-400">Something went wrong</p>
          <h1 className="text-h1 text-white text-balance">We could not load this page</h1>
          <p className="mt-6 text-body-lg text-sand-300 text-pretty">
            This is our fault, not yours. Try again — and if it keeps happening, call the school
            office on{' '}
            <a href={siteConfig.contact.phoneHref} className="link-underline text-white">
              {siteConfig.contact.phone}
            </a>{' '}
            and we will help you directly.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" variant="light" onClick={reset}>
              <RefreshCcw aria-hidden />
              Try again
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="/">Back to the homepage</Link>
            </Button>
          </div>

          {/* Collapsed by default: gives the school office something concrete to
              quote when reporting a fault, without putting a stack trace in
              front of a parent. */}
          {error.message || error.digest ? (
            <details className="mt-12 max-w-xl text-caption text-sand-500">
              <summary className="cursor-pointer select-none transition-colors hover:text-sand-300">
                Technical details
              </summary>
              <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-[0.6875rem] leading-relaxed text-sand-400">
                {error.message ? <p className="break-words">{error.message}</p> : null}
                {error.digest ? <p>Reference: {error.digest}</p> : null}
              </div>
            </details>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
