import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getVisionMission } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'

export const metadata: Metadata = buildMetadata({
  title: 'Vision & Mission',
  description:
    'To create caring, responsible and dynamic global citizens of tomorrow — the vision, mission and values of New Apostolic English High School, Nagpur.',
  path: '/about/vision-mission',
})

export default function VisionMissionPage() {
  const content = getVisionMission()

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        trail={[
          { title: 'About', href: '/about' },
          { title: 'Vision & Mission', href: '/about/vision-mission' },
        ]}
      />

      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {[content.vision, content.mission].map((block, index) => (
              <Reveal key={block.title} delay={index * 0.08}>
                <Card
                  variant={index === 0 ? 'ink' : 'raised'}
                  padded="lg"
                  className={index === 0 ? 'h-full bg-brand-sheen text-brand-50' : 'h-full'}
                >
                  <p className={index === 0 ? 'eyebrow text-gold-400' : 'eyebrow'}>{block.title}</p>
                  <p
                    className={
                      index === 0
                        ? 'mt-6 font-display text-h3 font-semibold leading-snug text-white text-balance'
                        : 'mt-6 font-display text-h3 font-semibold leading-snug text-balance'
                    }
                  >
                    {block.statement}
                  </p>
                  <div className="mt-7 space-y-4">
                    {block.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 20)}
                        className={
                          index === 0
                            ? 'text-body-sm text-brand-100 text-pretty'
                            : 'text-body-sm text-muted-foreground text-pretty'
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-16 max-w-3xl text-center font-display text-h3 font-medium italic text-balance">
              “{content.motto}”
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Our values"
            title="Six values, taught rather than displayed"
            className="mb-14"
          />
          <RevealGroup
            as="ul"
            gap={0.06}
            className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {content.values.map((value, index) => (
              <RevealItem as="li" key={value.title} className="bg-surface p-8">
                <p className="font-display text-caption font-bold tabular-nums text-primary/60">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-4 font-display text-h5 font-semibold">{value.title}</h2>
                <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                  {value.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  )
}
