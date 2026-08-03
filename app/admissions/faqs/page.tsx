import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getFaqs } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Faqs } from '@/components/sections/faqs'

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'School timings, syllabus, safety and security, transport, fees and admission — the questions parents ask New Apostolic English High School, Nagpur, answered.',
  path: '/admissions/faqs',
})

export default function FaqsPage() {
  const faqs = getFaqs()

  return (
    <>
      <PageHero
        eyebrow={faqs.eyebrow}
        title={faqs.title}
        lead={faqs.description}
        trail={[
          { title: 'Admissions', href: '/admissions' },
          { title: 'FAQs', href: '/admissions/faqs' },
        ]}
      />
      <Faqs
        items={faqs.items}
        eyebrow="Everything, in one place"
        title="Answers"
        description="Grouped by the part of school life they belong to. If yours is not here, call the office."
      />
    </>
  )
}
