import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getAbout, getHistory, getLeadership, getStats, getVisionMission } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Figure, RevealImage } from '@/components/ui/media'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { Counter } from '@/components/ui/counter'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = buildMetadata({
  title: 'About the School',
  description:
    'New Apostolic English High School, Nagpur — founded under the National Apostolic Church Education Society by the late Bishop Adv. Dr. Vincent S. Bower. Our story, our principles and the people who run the institution.',
  path: '/about',
  image: '/images/academics/primary-students.jpg',
})

export default function AboutPage() {
  const about = getAbout()
  const stats = getStats()
  const vision = getVisionMission()
  const history = getHistory()
  const leadership = getLeadership()

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A school with a difference"
        lead={about.lead}
        trail={[{ title: 'About', href: '/about' }]}
        image={{
          src: '/images/hero/hero-1.jpg',
          alt: 'Students and teachers of New Apostolic English High School at a welcome morning',
        }}
      />

      {/* ------------------------------------------------ the institution */}
      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-5">The institution</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-h2 text-balance">{about.title}</h2>
              </Reveal>
              <div className="mt-8 space-y-6">
                {about.paragraphs.map((paragraph, index) => (
                  <Reveal key={paragraph.slice(0, 20)} delay={0.08 + index * 0.05}>
                    <p className="max-w-prose text-body text-muted-foreground text-pretty">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {stats.items.map((item) => (
                  <li key={item.label} className="border-t border-border pt-5">
                    <p className="font-display text-h2 font-bold leading-none text-primary">
                      <Counter value={item.value} suffix={item.suffix} />
                    </p>
                    <p className="mt-2.5 font-display text-h6 font-semibold">{item.label}</p>
                    <p className="mt-1.5 text-body-sm text-muted-foreground text-pretty">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="space-y-6">
                <RevealImage
                  src="/images/academics/high-school-students.jpg"
                  alt="High school students of New Apostolic English High School"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  wrapperClassName="aspect-[4/5] w-full"
                />
                <Card variant="raised" padded="lg" className="bg-brand-sheen text-brand-50">
                  <p className="eyebrow text-gold-400">Our motto</p>
                  <p className="mt-5 font-display text-h3 font-semibold italic leading-snug text-white text-balance">
                    “Love thy neighbour as thyself”
                  </p>
                  <p className="mt-5 text-body-sm text-brand-100 text-pretty">
                    It sits at the centre of our crest, above an open book and a rising sun, and it
                    is the standard the institution is still measured against.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------ values */}
      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader
            eyebrow="What we hold to"
            title="Six values, taught rather than displayed"
            description={vision.lead}
            className="mb-14"
          />

          <RevealGroup
            as="ul"
            gap={0.06}
            className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {vision.values.map((value, index) => (
              <RevealItem as="li" key={value.title} className="bg-surface p-8">
                <p className="font-display text-caption font-bold tabular-nums text-primary/60">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-display text-h5 font-semibold">{value.title}</h3>
                <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                  {value.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------ founders */}
      <Section tone="default" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Our founders"
            title="The two people this school was built by"
            description={history.intro[0]}
            className="mb-14"
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
            {history.images.map((image) => (
              <Figure
                key={image.src}
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                aspect="aspect-[4/5]"
                sizes="(max-width: 640px) 100vw, 45vw"
              />
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/about/history">
                  Read our history
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about/management">Meet the management</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------ leadership strip */}
      <Section tone="ink" size="lg" grain>
        <Container>
          <SectionHeader
            eyebrow="Leadership"
            title="Who runs the school"
            description={leadership.lead}
            invert
            className="mb-14"
          />

          <RevealGroup as="ul" gap={0.06} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.leadership.map((person) => (
              <RevealItem as="li" key={person.name}>
                {person.portrait ? (
                  <div className="photo-grade relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={person.portrait}
                      alt={`Portrait of ${person.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <h3 className="mt-5 font-display text-h6 font-semibold text-white text-balance">
                  {person.name}
                </h3>
                <p className="mt-1.5 text-caption text-gold-400">{person.role}</p>
                <p className="mt-1 text-caption text-sand-400 text-pretty">{person.department}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  )
}
