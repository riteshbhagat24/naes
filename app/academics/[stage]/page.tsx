import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getStage, getStages } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { ParallaxImage } from '@/components/ui/media'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { JsonLd } from '@/components/ui/json-ld'
import { courseSchema } from '@/lib/schema'

interface Params {
  params: Promise<{ stage: string }>
}

export function generateStaticParams() {
  return getStages().stages.map((stage) => ({ stage: stage.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { stage: slug } = await params
  const stage = getStage(slug)
  if (!stage) return buildMetadata({ title: 'Not found', description: '', path: `/academics/${slug}`, noindex: true })

  return buildMetadata({
    title: stage.name,
    description: `${stage.summary} ${stage.grades.join(', ')} at New Apostolic English High School, Nagpur.`,
    path: `/academics/${stage.slug}`,
    image: stage.image,
  })
}

export default async function StagePage({ params }: Params) {
  const { stage: slug } = await params
  const stage = getStage(slug)
  if (!stage) notFound()

  const all = getStages().stages
  const position = all.findIndex((item) => item.slug === stage.slug)
  const next = all[position + 1]

  return (
    <>
      <JsonLd
        id="stage-schema"
        data={courseSchema({
          name: stage.name,
          description: stage.summary,
          path: `/academics/${stage.slug}`,
        })}
      />

      <PageHero
        eyebrow={`Academics · ${stage.ageRange}`}
        title={stage.name}
        lead={stage.summary}
        trail={[
          { title: 'Academics', href: '/academics' },
          { title: stage.name, href: `/academics/${stage.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          {stage.grades.map((grade) => (
            <Badge key={grade} variant="outline">
              {grade}
            </Badge>
          ))}
        </div>
      </PageHero>

      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {stage.description.map((paragraph, index) => (
                  <Reveal key={paragraph.slice(0, 20)} delay={index * 0.05}>
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

              <Reveal delay={0.16}>
                <div className="mt-12">
                  <h2 className="eyebrow mb-5">Subjects</h2>
                  <ul className="flex flex-wrap gap-2">
                    {stage.subjects.map((subject) => (
                      <li
                        key={subject}
                        className="rounded-full border border-border px-3.5 py-2 text-body-sm text-muted-foreground"
                      >
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <ParallaxImage
                src={stage.image}
                alt={`${stage.name} at New Apostolic English High School`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                strength={9}
                wrapperClassName="aspect-[4/5] w-full"
              />
              {stage.timings ? (
                <p className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-border bg-muted px-4 py-3 text-body-sm">
                  <Clock className="size-4 text-primary" aria-hidden />
                  <span>
                    <span className="font-semibold">School hours:</span> {stage.timings}
                  </span>
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader
            eyebrow="What sets this stage apart"
            title={`Three things that define ${stage.name}`}
            className="mb-14"
          />
          <RevealGroup as="ul" gap={0.06} className="grid gap-6 md:grid-cols-3">
            {stage.highlights.map((highlight) => (
              <RevealItem
                as="li"
                key={highlight.title}
                className="rounded-2xl border border-border bg-surface p-8"
              >
                <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon name={highlight.icon} className="size-[1.15rem]" />
                </span>
                <h3 className="mt-5 font-display text-h5 font-semibold">{highlight.title}</h3>
                <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                  {highlight.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/admissions/enquiry">
                Enquire about {stage.name}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            {next ? (
              <Button asChild variant="outline" size="lg">
                <Link href={`/academics/${next.slug}`}>Next stage: {next.name}</Link>
              </Button>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  )
}
