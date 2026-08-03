import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { getLegalDoc } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { Prose } from '@/components/ui/prose'
import { formatDate } from '@/utils/format'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use',
  description:
    'The terms on which New Apostolic English High School publishes this website, including accuracy of information, admissions and intellectual property.',
  path: '/terms',
})

export default function TermsPage() {
  const doc = getLegalDoc('terms')
  if (!doc) notFound()

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.data.title}
        lead={`Last revised ${formatDate(doc.data.updated)}.`}
        trail={[{ title: 'Terms of Use', href: '/terms' }]}
      />
      <Section tone="default" size="lg">
        <Container>
          <Prose markdown={doc.body} />
        </Container>
      </Section>
    </>
  )
}
