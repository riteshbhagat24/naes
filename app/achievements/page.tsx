import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getAchievements } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { AchievementsSection } from '@/components/sections/achievements'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { groupBy } from '@/utils/format'

export const metadata: Metadata = buildMetadata({
  title: 'Achievements',
  description:
    'State-level throwball, medals in inter-school patriotic singing, science exhibitions, robotics and press recognition — the record of New Apostolic English High School, Nagpur.',
  path: '/achievements',
  image: '/images/gallery/state-level-throwball.jpg',
})

export default function AchievementsPage() {
  const achievements = getAchievements()
  const byCategory = groupBy(achievements.items, (item) => item.category)

  return (
    <>
      <PageHero
        eyebrow={achievements.eyebrow}
        title={achievements.title}
        lead={achievements.description}
        trail={[{ title: 'Achievements', href: '/achievements' }]}
        image={{
          src: '/images/gallery/state-level-throwball.jpg',
          alt: 'The school throwball team after a state-level fixture',
        }}
      />

      <AchievementsSection
        items={achievements.items}
        eyebrow="The record"
        title="What our students have gone out and won"
        description="Recorded from the school archive and from the regional press."
        limit={achievements.items.length}
        showCta={false}
      />

      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader eyebrow="By category" title="Where we compete" className="mb-12" />
          <RevealGroup
            as="ul"
            gap={0.05}
            className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {Object.entries(byCategory).map(([category, items]) => (
              <RevealItem as="li" key={category} className="bg-surface p-7">
                <h2 className="font-display text-h5 font-semibold">{category}</h2>
                <p className="mt-1.5 text-caption uppercase tracking-[0.12em] text-primary">
                  {items.length} {items.length === 1 ? 'entry' : 'entries'}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {items.map((item) => (
                    <li key={item.title} className="text-body-sm text-muted-foreground text-pretty">
                      {item.title}{' '}
                      <span className="whitespace-nowrap text-caption">({item.year})</span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  )
}
