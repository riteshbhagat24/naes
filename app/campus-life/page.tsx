import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getFacilities, getFacilitiesByCategory, getFacility } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import {
  ArtsSection,
  InfrastructureSection,
  LaboratoriesSection,
  LibrarySection,
  SportsSection,
} from '@/components/sections/campus-life'

export const metadata: Metadata = buildMetadata({
  title: 'Campus Life',
  description:
    'A peaceful, well-maintained campus in Rameshwari, Nagpur — laboratories, library, playing fields, the arts, a healthy canteen and full CCTV coverage.',
  path: '/campus-life',
  image: '/images/campus/campus-2.jpg',
})

export default function CampusLifePage() {
  const facilities = getFacilities()

  return (
    <>
      <PageHero
        eyebrow={facilities.eyebrow}
        title={facilities.title}
        lead={facilities.lead}
        trail={[{ title: 'Campus Life', href: '/campus-life' }]}
        image={{
          src: '/images/campus/campus-2.jpg',
          alt: 'The campus of New Apostolic English High School, Nagpur',
        }}
      />

      <Section tone="default" size="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {facilities.intro.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 20)} delay={index * 0.06}>
                <p
                  className={
                    index === 0
                      ? 'font-display text-lead font-medium text-pretty'
                      : 'text-body text-muted-foreground text-pretty'
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <InfrastructureSection items={getFacilitiesByCategory('infrastructure')} />
      <LaboratoriesSection items={getFacilitiesByCategory('laboratories')} />
      <LibrarySection item={getFacility('library')!} />
      <SportsSection item={getFacility('sports')!} disciplines={facilities.sports} />
      <ArtsSection
        item={getFacility('arts')!}
        supporting={[
          {
            src: '/images/gallery/annual-play-laher-badlav-ki.jpg',
            alt: 'Students performing the annual production Laher Badlav Ki',
            caption: 'Annual production — Laher Badlav Ki',
          },
          {
            src: '/images/gallery/primary-teachers-day.jpg',
            alt: "Primary school students at the Teachers' Day celebration",
            caption: "Teachers' Day, Primary School",
          },
        ]}
      />
    </>
  )
}
