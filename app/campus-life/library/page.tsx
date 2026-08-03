import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getFacility } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { LibrarySection, TickList } from '@/components/sections/campus-life'
import { Container, Section, SectionHeader } from '@/components/ui/section'

export const metadata: Metadata = buildMetadata({
  title: 'Library',
  description:
    'Reading periods for the lower grades and supervised private study for the seniors — the library at New Apostolic English High School, Nagpur.',
  path: '/campus-life/library',
  image: '/images/facilities/library.jpg',
})

export default function LibraryPage() {
  const library = getFacility('library')!

  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="A quiet room at the centre of the school"
        lead={library.summary}
        trail={[
          { title: 'Campus Life', href: '/campus-life' },
          { title: 'Library', href: '/campus-life/library' },
        ]}
      />

      <LibrarySection item={library} />

      <Section tone="muted" size="md">
        <Container>
          <SectionHeader
            eyebrow="The collection"
            title="What is on the shelves"
            description="Built for two different readers: the child discovering that books are enjoyable, and the senior student who needs a source."
            className="mb-10"
          />
          <TickList
            columns={3}
            items={[
              'Fiction for every reading level from Grade I',
              'Picture books and early readers for Pre-Primary',
              'General knowledge and reference',
              'Science, mathematics and technology titles',
              'History, civics and geography reference',
              'Marathi, Hindi and Sanskrit language titles',
              'Competitive examination and career guidance material',
              'Newspapers and current affairs periodicals',
              'Project and exhibition research material',
            ]}
          />
        </Container>
      </Section>
    </>
  )
}
