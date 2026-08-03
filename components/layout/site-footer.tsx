import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { footerColumns, legalLinks } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { Container } from '@/components/ui/section'
import { Icon } from '@/components/ui/icon'
import { NewsletterForm } from '@/features/newsletter/newsletter-form'

/**
 * Premium footer.
 *
 * Rendered on the server: the only interactive island inside it is the
 * newsletter form, so the bottom of every page costs almost no JavaScript.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative isolate overflow-hidden bg-sand-950 text-sand-300">
      <div aria-hidden className="grain absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[38rem] w-[68rem] -translate-x-1/2 rounded-full bg-brand-700/20 blur-[130px]"
      />

      {/* ------------------------------------------------ masthead */}
      <Container className="border-b border-white/10 py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <div className="flex items-start gap-5">
              <Image
                src={siteConfig.brand.crestLight}
                alt=""
                width={160}
                height={160}
                className="size-16 shrink-0 sm:size-20"
              />
              <div>
                <p className="font-display text-h4 font-bold leading-tight text-white text-balance">
                  New Apostolic English High School
                </p>
                <p className="mt-1.5 text-body-sm text-sand-400">
                  &amp; Dr. Bower Apostolic Junior College
                </p>
                <p className="mt-4 max-w-md font-display text-body italic text-gold-400">
                  “{siteConfig.motto}”
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-lg text-body-sm text-sand-400 text-pretty">
              An English-medium institution in South Nagpur offering a continuous education from
              Nursery to Class XII, alongside BBA and BCCA degree programmes, under the{' '}
              {siteConfig.society}.
            </p>

            <ul className="mt-8 space-y-4 text-body-sm">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden />
                <a
                  href={siteConfig.geo.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sand-300 transition-colors hover:text-white"
                >
                  {siteConfig.address.formatted}
                </a>
              </li>
              <li className="flex gap-3.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden />
                <a
                  href={siteConfig.contact.phoneHref}
                  className="link-underline text-sand-300 transition-colors hover:text-white"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex gap-3.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden />
                <a
                  href={siteConfig.contact.emailHref}
                  className="link-underline break-all text-sand-300 transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {siteConfig.social.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-11 place-items-center rounded-full border border-white/12 text-sand-300 transition-colors duration-300 hover:border-white/35 hover:bg-white/8 hover:text-white"
                  >
                    <Icon name={social.icon} className="size-[1.05rem]" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold-400">School hours</p>
            <dl className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {siteConfig.hours.map((entry) => (
                <div key={entry.label} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-body-sm text-sand-400">{entry.label}</dt>
                  <dd className="text-right text-body-sm font-medium text-sand-100">
                    {entry.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <p className="eyebrow text-gold-400">School updates</p>
              <p className="mt-4 max-w-sm text-body-sm text-sand-400 text-pretty">
                Circulars, events and admission announcements, sent to your inbox. No more than a
                few emails each term.
              </p>
              <NewsletterForm className="mt-5" />
            </div>
          </div>
        </div>
      </Container>

      {/* ------------------------------------------------ link columns */}
      <Container className="border-b border-white/10 py-14">
        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="eyebrow text-white">{column.title}</h2>
              <ul className="mt-5 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-body-sm text-sand-400 transition-colors duration-300 hover:text-white"
                    >
                      {link.title}
                      <ArrowUpRight
                        aria-hidden
                        className="size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-70"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      {/* ------------------------------------------------ legal */}
      <Container className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption text-sand-500">
          © {year} {siteConfig.legalName}. All rights reserved.
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-caption text-sand-500 transition-colors hover:text-sand-200"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}
