import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getStudentDevelopment } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { StudentDevelopmentSection } from '@/components/sections/campus-life'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'

export const metadata: Metadata = buildMetadata({
  title: 'Student Development',
  description:
    'Confidence, responsibility and judgement are taught on purpose at New Apostolic English High School — stage, service, sport, study skills and structured career guidance.',
  path: '/academics/student-development',
  image: '/images/gallery/annual-play-aasman-se-gira.jpg',
})

export default function StudentDevelopmentPage() {
  const content = getStudentDevelopment()

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        trail={[
          { title: 'Academics', href: '/academics' },
          { title: 'Student Development', href: '/academics/student-development' },
        ]}
      />

      <StudentDevelopmentSection
        eyebrow="Six pillars"
        title="What we teach beyond the syllabus"
        lead="Each one has a timetabled home, a named member of staff and a visible outcome."
        pillars={content.pillars}
      />

      <Section tone="default" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Programmes"
            title="What runs through the year"
            description="These are not extras bolted onto the timetable. They are how a child learns to stand up in front of people and carry a responsibility to the end."
            className="mb-14"
          />
          <RevealGroup as="ul" gap={0.05} className="divide-y divide-border border-y border-border">
            {content.programmes.map((programme, index) => (
              <RevealItem as="li" key={programme.title} className="py-7">
                <div className="grid gap-3 sm:grid-cols-[4rem_1fr] sm:gap-8">
                  <span className="font-display text-h4 font-bold tabular-nums text-primary/25">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-display text-h4 font-semibold text-balance">
                      {programme.title}
                    </h2>
                    <p className="mt-2.5 max-w-prose text-body text-muted-foreground text-pretty">
                      {programme.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  )
}
