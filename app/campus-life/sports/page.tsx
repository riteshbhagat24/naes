import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getAchievements, getFacilities, getFacility } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { SportsSection, TickList } from '@/components/sections/campus-life'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = buildMetadata({
  title: 'Sports',
  description:
    'Basketball, volleyball, cricket, athletics, karate, carrom, table tennis and a gymnasium — timetabled physical education and inter-school competition at New Apostolic English High School.',
  path: '/campus-life/sports',
  image: '/images/gallery/state-level-throwball.jpg',
})

export default function SportsPage() {
  const facilities = getFacilities()
  const sports = getFacility('sports')!
  const achievements = getAchievements().items.filter((item) => item.category === 'Sport')

  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="Eight disciplines, one field, every grade"
        lead="Physical education is timetabled for every grade, and inter-house competition runs through the year."
        trail={[
          { title: 'Campus Life', href: '/campus-life' },
          { title: 'Sports', href: '/campus-life/sports' },
        ]}
      />

      <SportsSection item={sports} disciplines={facilities.sports} />

      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader eyebrow="Facilities" title="What is on the ground" className="mb-8" />
              <TickList items={facilities.sports} />
              <div className="mt-8 space-y-4">
                {sports.description.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 20)}
                    className="max-w-prose text-body text-muted-foreground text-pretty"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow="On the record"
                title="Where our teams have played"
                className="mb-8"
              />
              <RevealGroup as="ul" gap={0.06} className="space-y-4">
                {achievements.map((item) => (
                  <RevealItem
                    as="li"
                    key={item.title}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="primary" size="sm">
                        {item.level}
                      </Badge>
                      <span className="text-caption text-muted-foreground">{item.year}</span>
                    </div>
                    <h3 className="mt-3 font-display text-h5 font-semibold text-balance">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-muted-foreground text-pretty">
                      {item.description}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Button asChild variant="outline" size="lg" className="mt-8">
                <Link href="/achievements">
                  All achievements
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
