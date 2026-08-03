import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getAdmissionProcess } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { AdmissionProcess } from '@/components/sections/admission-process'
import { Container, Section, SectionHeader } from '@/components/ui/section'

export const metadata: Metadata = buildMetadata({
  title: 'Admission Process',
  description:
    'The five-step admission process at New Apostolic English High School, Nagpur — enquiry, campus visit, interaction, documents and confirmation.',
  path: '/admissions/process',
})

export default function AdmissionProcessPage() {
  const process = getAdmissionProcess()

  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="How admission works, step by step"
        lead={process.lead}
        trail={[
          { title: 'Admissions', href: '/admissions' },
          { title: 'Admission Process', href: '/admissions/process' },
        ]}
      />

      <AdmissionProcess
        steps={process.steps}
        eyebrow="The process"
        title="Five steps"
        lead="Each one has a named point of contact at the school office."
      />

      <Section tone="muted" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader eyebrow="Documents" title="What to bring" className="mb-8" />
              <ul className="space-y-3">
                {process.documents.map((document) => (
                  <li
                    key={document}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-body-sm"
                  >
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {document}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeader eyebrow="Eligibility" title="Age and grade criteria" className="mb-8" />
              <ul className="divide-y divide-border border-y border-border">
                {process.eligibility.map((row) => (
                  <li key={row.grade} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <span className="font-display text-body font-semibold">{row.grade}</span>
                    <span className="text-body-sm text-muted-foreground text-pretty">
                      {row.criteria}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
