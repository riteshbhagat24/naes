import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getHistory } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Timeline } from '@/components/ui/timeline'
import { Figure } from '@/components/ui/media'
import { Reveal } from '@/components/ui/reveal'

export const metadata: Metadata = buildMetadata({
  title: 'Our History',
  description:
    'From a founding vision under the National Apostolic Church Education Society to a full educational pathway — the history of New Apostolic English High School, Nagpur.',
  path: '/about/history',
  image: '/images/people/founder-bishop-vincent-s-bower.jpg',
})

export default function HistoryPage() {
  const history = getHistory()

  return (
    <>
      <PageHero
        eyebrow={history.eyebrow}
        title={history.title}
        lead={history.lead}
        trail={[
          { title: 'About', href: '/about' },
          { title: 'Our History', href: '/about/history' },
        ]}
        image={{
          src: '/images/gallery/campus-moment-4.jpg',
          alt: 'A photograph from the New Apostolic English High School archive',
        }}
      />

      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {history.intro.map((paragraph, index) => (
                  <Reveal key={paragraph.slice(0, 20)} delay={index * 0.06}>
                    <p className="max-w-prose text-body-lg text-muted-foreground text-pretty">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="grid gap-8 lg:col-span-5">
              {history.images.map((image) => (
                <Figure
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  aspect="aspect-[4/5]"
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Timeline"
            title="How the institution grew"
            description="Each stage was added because families asked for the next step, not because a plan on paper called for it."
            className="mb-16"
          />
          <Timeline entries={history.timeline} />
        </Container>
      </Section>
    </>
  )
}
