import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getCurriculum, getVisionMission } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Icon } from '@/components/ui/icon'
import { ParallaxImage } from '@/components/ui/media'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'

export const metadata: Metadata = buildMetadata({
  title: 'Educational Philosophy',
  description:
    'Every student is an individual with a unique personality. How New Apostolic English High School weaves academic and artistic excellence together with social engagement and moral awareness.',
  path: '/about/philosophy',
  image: '/images/academics/classroom-1.jpg',
})

export default function PhilosophyPage() {
  const { philosophy } = getVisionMission()
  const { pedagogy } = getCurriculum()

  return (
    <>
      <PageHero
        eyebrow="Educational philosophy"
        title="Every student is an individual"
        lead="An education that weaves academic and artistic excellence together with social engagement and moral awareness."
        trail={[
          { title: 'About', href: '/about' },
          { title: 'Educational Philosophy', href: '/about/philosophy' },
        ]}
      />

      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="space-y-6">
                {philosophy.paragraphs.map((paragraph, index) => (
                  <Reveal key={paragraph.slice(0, 20)} delay={index * 0.06}>
                    <p
                      className={
                        index === 0
                          ? 'max-w-prose font-display text-lead font-medium text-pretty'
                          : 'max-w-prose text-body text-muted-foreground text-pretty'
                      }
                    >
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <ParallaxImage
                src="/images/academics/classroom-1.jpg"
                alt="A classroom at New Apostolic English School during a lesson"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                strength={10}
                wrapperClassName="aspect-[4/5] w-full"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader
            eyebrow="In practice"
            title="What the philosophy looks like on a Tuesday morning"
            description="Principles are only worth stating if they change the timetable. These four do."
            className="mb-14"
          />
          <RevealGroup as="ul" gap={0.06} className="grid gap-6 sm:grid-cols-2">
            {pedagogy.map((item) => (
              <RevealItem
                as="li"
                key={item.title}
                className="rounded-2xl border border-border bg-surface p-8"
              >
                <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon name={item.icon} className="size-[1.15rem]" />
                </span>
                <h2 className="mt-5 font-display text-h5 font-semibold">{item.title}</h2>
                <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  )
}
