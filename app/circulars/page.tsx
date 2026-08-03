import type { Metadata } from 'next'
import { Info } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getCirculars } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/ui/reveal'
import { formatDate } from '@/utils/format'

export const metadata: Metadata = buildMetadata({
  title: 'Circulars',
  description:
    'Official notices to parents from New Apostolic English High School, Nagpur — session dates, book sets, identity cards, safety procedure and assessment schedules.',
  path: '/circulars',
})

export default function CircularsPage() {
  const circulars = getCirculars()

  return (
    <>
      <PageHero
        eyebrow={circulars.eyebrow}
        title={circulars.title}
        lead={circulars.description}
        trail={[{ title: 'Circulars', href: '/circulars' }]}
      />

      <Section tone="default" size="lg">
        <Container>
          <ul className="divide-y divide-border border-y border-border">
            {circulars.items
              .slice()
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((circular, index) => (
                <li key={circular.id}>
                  <Reveal delay={index * 0.04}>
                    <article className="grid gap-4 py-7 sm:grid-cols-[11rem_1fr] sm:gap-10">
                      <div>
                        <p className="font-display text-body font-semibold tabular-nums">
                          <time dateTime={circular.date}>
                            {formatDate(circular.date, 'medium')}
                          </time>
                        </p>
                        <p className="mt-1.5 text-caption text-muted-foreground">
                          {circular.reference}
                        </p>
                      </div>
                      <div>
                        <Badge variant="neutral" size="sm">
                          {circular.audience}
                        </Badge>
                        <h2 className="mt-3 font-display text-h5 font-semibold text-balance">
                          {circular.title}
                        </h2>
                        <p className="mt-2.5 max-w-prose text-body-sm text-muted-foreground text-pretty">
                          {circular.summary}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
          </ul>

          <p className="mt-8 flex items-start gap-2.5 rounded-xl border border-border bg-muted px-5 py-4 text-body-sm text-muted-foreground text-pretty">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            {circulars.note}
          </p>
        </Container>
      </Section>
    </>
  )
}
