import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getTour } from '@/lib/data'
import { siteConfig } from '@/config/site'
import { PageHero } from '@/components/ui/page-hero'
import { CampusMap } from '@/components/sections/campus-map'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = buildMetadata({
  title: 'Virtual Campus Tour',
  description:
    'Walk the campus of New Apostolic English High School, Nagpur before you visit — entrance, playground, laboratories, library, canteen and classrooms.',
  path: '/campus-life/tour',
  image: '/images/campus/campus-2.jpg',
})

export default function TourPage() {
  const tour = getTour()

  return (
    <>
      <PageHero
        eyebrow={tour.eyebrow}
        title={tour.title}
        lead={tour.lead}
        trail={[
          { title: 'Campus Life', href: '/campus-life' },
          { title: 'Virtual Tour', href: '/campus-life/tour' },
        ]}
        image={{
          src: '/images/campus/campus-2.jpg',
          alt: 'The campus of New Apostolic English High School',
        }}
      />

      <Section tone="default" size="lg">
        <Container>
          <CampusMap tour={tour} />
        </Container>
      </Section>

      <Section tone="muted" size="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="Come in person"
                title="A plan is no substitute for a working morning"
                description={tour.note}
              />
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={siteConfig.contact.phoneHref}>
                    <Phone aria-hidden />
                    Book a visit
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    Directions &amp; contact
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                src={siteConfig.geo.mapsEmbed}
                title="Location of New Apostolic English High School on Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[22rem] w-full border-0"
              />
              <p className="flex items-start gap-2.5 bg-surface p-5 text-body-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {siteConfig.address.formatted}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
