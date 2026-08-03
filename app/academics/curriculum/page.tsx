import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getCurriculum } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { CurriculumSection } from '@/components/sections/academics'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Icon } from '@/components/ui/icon'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'

export const metadata: Metadata = buildMetadata({
  title: 'Curriculum',
  description:
    'Maharashtra State Board syllabus with a CBSE-informed foundation in the lower classes. Subjects, languages, assessment and teaching method at New Apostolic English High School, Nagpur.',
  path: '/academics/curriculum',
})

export default function CurriculumPage() {
  const curriculum = getCurriculum()

  return (
    <>
      <PageHero
        eyebrow={curriculum.eyebrow}
        title={curriculum.title}
        lead={curriculum.lead}
        trail={[
          { title: 'Academics', href: '/academics' },
          { title: 'Curriculum', href: '/academics/curriculum' },
        ]}
      />

      <CurriculumSection
        eyebrow="Boards & subjects"
        title="What we teach"
        lead={curriculum.medium}
        groups={curriculum.subjectGroups}
        boards={curriculum.boards}
      />

      <Section tone="default" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Method"
            title="How it is taught"
            description="Principles are only worth stating if they change the timetable. These four do."
            className="mb-14"
          />
          <RevealGroup as="ul" gap={0.06} className="grid gap-6 sm:grid-cols-2">
            {curriculum.pedagogy.map((item) => (
              <RevealItem
                as="li"
                key={item.title}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon name={item.icon} className="size-[1.15rem]" />
                </span>
                <h2 className="mt-5 font-display text-h5 font-semibold">{item.title}</h2>
                <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Assessment"
            title="How we know it is working"
            className="mb-14"
          />
          <ul className="divide-y divide-border border-y border-border">
            {curriculum.assessment.map((item) => (
              <li key={item.title} className="grid gap-3 py-7 sm:grid-cols-[16rem_1fr] sm:gap-10">
                <h3 className="font-display text-h5 font-semibold">{item.title}</h3>
                <p className="max-w-prose text-body text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
