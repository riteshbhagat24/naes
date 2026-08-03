import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getFacilitiesByCategory } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import {
  FacilityList,
  LaboratoriesSection,
  TickList,
} from '@/components/sections/campus-life'

export const metadata: Metadata = buildMetadata({
  title: 'Laboratories',
  description:
    'Physics laboratory, computer laboratory and robotics workshops — timetabled practical work at New Apostolic English High School and Dr. Bower Apostolic Junior College.',
  path: '/campus-life/laboratories',
  image: '/images/facilities/physics-laboratory.jpg',
})

export default function LaboratoriesPage() {
  const labs = getFacilitiesByCategory('laboratories')

  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="Science that is done, not described"
        lead="Physics, computing and robotics are practical subjects here — timetabled, supervised and assessed on method as well as result."
        trail={[
          { title: 'Campus Life', href: '/campus-life' },
          { title: 'Laboratories', href: '/campus-life/laboratories' },
        ]}
      />

      <LaboratoriesSection items={labs} />

      <Section tone="default" size="lg">
        <Container>
          <SectionHeader
            eyebrow="In detail"
            title="What happens in each room"
            className="mb-12"
          />
          <FacilityList items={labs} />
        </Container>
      </Section>

      <Section tone="muted" size="md">
        <Container>
          <SectionHeader
            eyebrow="Practical work"
            title="What a student actually does"
            className="mb-10"
          />
          <TickList
            columns={3}
            items={[
              'Sets up apparatus without a pre-built demonstration',
              'Records observations as they are taken, not afterwards',
              'Accounts for their own experimental error',
              'Maintains a practical journal through the year',
              'Writes and debugs their own programs',
              'Wires sensors and control logic in robotics sessions',
              'Presents a working model at the annual exhibition',
              'Defends their method under questioning',
              'Works in a small team with a shared deadline',
            ]}
          />
        </Container>
      </Section>
    </>
  )
}
