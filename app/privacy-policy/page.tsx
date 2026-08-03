import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { getLegalDoc } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { Prose } from '@/components/ui/prose'
import { formatDate } from '@/utils/format'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'What New Apostolic English High School collects through this website, why, where it goes and how long it is kept.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  const doc = getLegalDoc('privacy-policy')
  if (!doc) notFound()

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.data.title}
        lead={`Last revised ${formatDate(doc.data.updated)}.`}
        trail={[{ title: 'Privacy Policy', href: '/privacy-policy' }]}
      />
      <Section tone="default" size="lg">
        <Container>
          <Prose markdown={doc.body} />
        </Container>
      </Section>
    </>
  )
}
