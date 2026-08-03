import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getFacilities, getFacilitiesByCategory } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { FacilityList } from '@/components/sections/campus-life'
import { Reveal } from '@/components/ui/reveal'

export const metadata: Metadata = buildMetadata({
  title: 'Infrastructure',
  description:
    'Smart classrooms, the hall and basement, the playground and the buildings that carry the school day at New Apostolic English High School, Nagpur.',
  path: '/campus-life/infrastructure',
  image: '/images/facilities/playground.jpg',
})

export default function InfrastructurePage() {
  const facilities = getFacilities()

  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="Buildings arranged around the working day"
        lead="Everything here is placed where it is needed, not where it photographs best."
        trail={[
          { title: 'Campus Life', href: '/campus-life' },
          { title: 'Infrastructure', href: '/campus-life/infrastructure' },
        ]}
      />

      <Section tone="default" size="lg">
        <Container>
          <div className="mb-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
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
          <FacilityList items={getFacilitiesByCategory('infrastructure')} />
        </Container>
      </Section>

      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Wellbeing & safety"
            title="The canteen, and the arrangements that keep the campus safe"
            className="mb-12"
          />
          <FacilityList items={getFacilitiesByCategory('wellbeing')} />
        </Container>
      </Section>
    </>
  )
}
