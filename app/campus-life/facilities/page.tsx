import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getFacilities } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { FacilityList } from '@/components/sections/campus-life'
import { groupBy } from '@/utils/format'

const CATEGORY_TITLES: Record<string, string> = {
  infrastructure: 'Buildings & grounds',
  laboratories: 'Laboratories & workshops',
  library: 'Library',
  sports: 'Sport',
  arts: 'Arts, music & theatre',
  wellbeing: 'Wellbeing & safety',
}

export const metadata: Metadata = buildMetadata({
  title: 'Facilities',
  description:
    'Every facility on the New Apostolic campus — playground and hall, physics and computer laboratories, library, healthy canteen, sports and full CCTV security.',
  path: '/campus-life/facilities',
  image: '/images/facilities/canteen.jpg',
})

export default function FacilitiesPage() {
  const facilities = getFacilities()
  const grouped = groupBy(facilities.items, (item) => item.category)

  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="Every facility, listed in full"
        lead="What is here, what it is for, and how it is used during a normal school week."
        trail={[
          { title: 'Campus Life', href: '/campus-life' },
          { title: 'Facilities', href: '/campus-life/facilities' },
        ]}
      />

      {Object.entries(grouped).map(([category, items], index) => (
        <Section
          key={category}
          tone={index % 2 === 0 ? 'default' : 'muted'}
          size="lg"
        >
          <Container>
            <SectionHeader
              eyebrow={`0${index + 1}`}
              title={CATEGORY_TITLES[category] ?? category}
              className="mb-12"
            />
            <FacilityList items={items} />
          </Container>
        </Section>
      ))}
    </>
  )
}
