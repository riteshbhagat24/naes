import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getCurriculum, getStages, getStudentDevelopment } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { AcademicExcellence, CurriculumSection } from '@/components/sections/academics'
import { StudentDevelopmentSection } from '@/components/sections/campus-life'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { JsonLd } from '@/components/ui/json-ld'
import { courseSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Academics',
  description:
    'A continuous English-medium pathway from Nursery to Class XII, plus BBA and BCCA degree programmes. Maharashtra State Board syllabus with a CBSE-informed foundation in the lower classes.',
  path: '/academics',
  image: '/images/academics/high-school-students.jpg',
})

export default function AcademicsPage() {
  const stages = getStages()
  const curriculum = getCurriculum()
  const development = getStudentDevelopment()

  return (
    <>
      <JsonLd
        id="courses-schema"
        data={{
          '@context': 'https://schema.org',
          '@graph': stages.stages.map((stage) =>
            courseSchema({
              name: stage.name,
              description: stage.summary,
              path: `/academics/${stage.slug}`,
            }),
          ),
        }}
      />

      <PageHero
        eyebrow={stages.eyebrow}
        title={stages.title}
        lead={stages.description}
        trail={[{ title: 'Academics', href: '/academics' }]}
        image={{
          src: '/images/academics/high-school-students.jpg',
          alt: 'High school students of New Apostolic English High School',
        }}
      />

      <AcademicExcellence
        stages={stages.stages}
        eyebrow="The pathway"
        title="Six stages, one continuous education"
        description="Each stage is designed to hand the next one a child who is ready — academically, socially and in the habits of work."
      />

      <Section tone="default" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Assessment"
            title="How we know it is working"
            description={curriculum.medium}
            className="mb-14"
          />
          <RevealGroup as="ul" gap={0.06} className="grid gap-6 sm:grid-cols-2">
            {curriculum.assessment.map((item, index) => (
              <RevealItem
                as="li"
                key={item.title}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <p className="font-display text-caption font-bold tabular-nums text-primary/60">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-4 font-display text-h5 font-semibold">{item.title}</h2>
                <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CurriculumSection
        eyebrow={curriculum.eyebrow}
        title={curriculum.title}
        lead={curriculum.lead}
        groups={curriculum.subjectGroups}
        boards={curriculum.boards}
      />

      <StudentDevelopmentSection
        eyebrow={development.eyebrow}
        title={development.title}
        lead={development.lead}
        pillars={development.pillars}
      />
    </>
  )
}
