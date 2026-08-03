import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getAlbum, getFacility, getStudentDevelopment } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { ArtsSection } from '@/components/sections/campus-life'
import { GalleryGrid } from '@/components/sections/gallery'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'

export const metadata: Metadata = buildMetadata({
  title: 'Arts & Music',
  description:
    'Theatre, music, elocution and craft at New Apostolic English High School — the annual cultural programme, inter-school competition, and where a quiet child finds their voice.',
  path: '/campus-life/arts',
  image: '/images/gallery/annual-play-aasman-se-gira.jpg',
})

export default function ArtsPage() {
  const arts = getFacility('arts')!
  const productions = getAlbum('annual-productions')
  const { programmes } = getStudentDevelopment()

  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="Theatre, music and the craft table"
        lead="The arts are given real time in the week, because they are where a great deal of the character work actually happens."
        trail={[
          { title: 'Campus Life', href: '/campus-life' },
          { title: 'Arts & Music', href: '/campus-life/arts' },
        ]}
      />

      <ArtsSection
        item={arts}
        supporting={[
          {
            src: '/images/gallery/annual-play-choo-manter.jpg',
            alt: 'Students performing the annual production Choo Manter',
            caption: 'Annual production — Choo Manter',
          },
          {
            src: '/images/gallery/patriotic-singing-medal.jpg',
            alt: 'Students with medals from a patriotic singing competition',
            caption: 'Patriotic singing competition',
          },
        ]}
      />

      {productions ? (
        <Section tone="muted" size="lg">
          <Container>
            <SectionHeader
              eyebrow="Annual productions"
              title={productions.title}
              description={productions.description}
              className="mb-12"
            />
            <GalleryGrid images={productions.images} columns={3} />
          </Container>
        </Section>
      ) : null}

      <Section tone="default" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Through the year"
            title="What the arts calendar looks like"
            className="mb-12"
          />
          <RevealGroup as="ul" gap={0.05} className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme) => (
              <RevealItem as="li" key={programme.title} className="bg-background p-7">
                <h2 className="font-display text-h5 font-semibold text-balance">
                  {programme.title}
                </h2>
                <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                  {programme.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  )
}
