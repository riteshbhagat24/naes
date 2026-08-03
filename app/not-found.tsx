import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { quickLinks } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { Container } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-sand-950 py-section">
      <Image
        src="/images/gallery/campus-moment-6.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950/92 via-sand-950/90 to-sand-950/78"
      />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <Container>
        <div className="max-w-3xl">
          <p className="font-display text-[clamp(5rem,10vw,11rem)] font-bold leading-none tracking-[-0.05em] text-white/10">
            404
          </p>
          <h1 className="-mt-6 font-display text-h1 font-bold text-white text-balance sm:-mt-10">
            This page is not on the timetable
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-sand-300 text-pretty">
            The link may be out of date, or the page may have moved when the website was rebuilt.
            Everything from the old site has a new home — here are the most likely ones.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="light">
              <Link href="/">
                Back to the homepage
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="/search">Search the website</Link>
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-white/20 px-4 py-2.5 text-body-sm text-sand-200 transition-colors hover:border-white/45 hover:text-white"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-caption text-sand-500">
            Still stuck? Call the school office on{' '}
            <a href={siteConfig.contact.phoneHref} className="link-underline text-sand-300">
              {siteConfig.contact.phone}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}
