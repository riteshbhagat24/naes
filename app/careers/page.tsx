import type { Metadata } from 'next'
import { Briefcase, Download, GraduationCap, MapPin } from 'lucide-react'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { getCareers } from '@/lib/data'
import { jobPostingSchema } from '@/lib/schema'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Icon } from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/ui/json-ld'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { CareerForm } from '@/features/careers/career-form'
import { formatDate } from '@/utils/format'

export const metadata: Metadata = buildMetadata({
  title: 'Careers',
  description:
    'Teaching and non-teaching vacancies at New Apostolic English High School and Dr. Bower Apostolic Junior College, Nagpur. Apply online.',
  path: '/careers',
  image: '/images/people/staff-primary-2024-25.jpg',
})

export default function CareersPage() {
  const careers = getCareers()

  return (
    <>
      <JsonLd
        id="jobs-schema"
        data={{
          '@context': 'https://schema.org',
          '@graph': careers.openings.map((opening) =>
            jobPostingSchema({
              title: opening.title,
              description: opening.summary,
              department: opening.department,
              employmentType: opening.employmentType,
              posted: opening.posted,
            }),
          ),
        }}
      />

      <PageHero
        eyebrow={careers.eyebrow}
        title={careers.title}
        lead={careers.lead}
        trail={[{ title: 'Careers', href: '/careers' }]}
        image={{
          src: '/images/people/staff-primary-2024-25.jpg',
          alt: 'Teaching staff of New Apostolic English School',
        }}
      />

      <Section tone="default" size="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {careers.intro.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 20)} delay={index * 0.06}>
                <p
                  className={
                    index === 0
                      ? 'font-display text-lead font-medium text-pretty'
                      : 'text-body text-muted-foreground text-pretty'
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader eyebrow="Why join us" title="What the job is actually like" className="mb-12" />
          <RevealGroup
            as="ul"
            gap={0.06}
            className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {careers.whyJoin.map((item) => (
              <RevealItem as="li" key={item.title} className="bg-surface p-7">
                <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon name={item.icon} className="size-[1.15rem]" />
                </span>
                <h2 className="mt-5 font-display text-h6 font-semibold">{item.title}</h2>
                <p className="mt-2.5 text-body-sm text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="default" size="lg" id="openings">
        <Container>
          <SectionHeader
            eyebrow="Current openings"
            title={`${careers.openings.length} positions open`}
            description="Each vacancy is filled by demonstration lesson and interview, in that order."
            className="mb-12"
          />

          <ul className="space-y-6">
            {careers.openings.map((opening) => (
              <li key={opening.id}>
                <Reveal>
                  <article className="rounded-2xl border border-border bg-card p-7 sm:p-9">
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div>
                        <h3 className="font-display text-h3 font-semibold text-balance">
                          {opening.title}
                        </h3>
                        <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="size-3.5" aria-hidden />
                            {opening.department}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="size-3.5" aria-hidden />
                            {opening.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <GraduationCap className="size-3.5" aria-hidden />
                            {opening.qualification}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="primary" size="sm">
                          {opening.employmentType}
                        </Badge>
                        <Badge variant="outline" size="sm">
                          {opening.experience}
                        </Badge>
                      </div>
                    </div>

                    <p className="mt-6 max-w-prose text-body text-muted-foreground text-pretty">
                      {opening.summary}
                    </p>

                    <h4 className="mt-7 eyebrow">Responsibilities</h4>
                    <ul className="mt-4 space-y-2.5">
                      {opening.responsibilities.map((responsibility) => (
                        <li
                          key={responsibility.slice(0, 24)}
                          className="flex gap-3 text-body-sm text-muted-foreground text-pretty"
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 size-1 shrink-0 rounded-full bg-primary"
                          />
                          {responsibility}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-7 text-caption text-muted-foreground">
                      Posted {formatDate(opening.posted, 'medium')}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader eyebrow="Apply" title="Send us your application" />
              <ol className="mt-8 space-y-4">
                {careers.howToApply.map((step, index) => (
                  <li key={step.slice(0, 24)} className="flex gap-4 text-body-sm">
                    <span className="font-display font-bold tabular-nums text-primary/60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-muted-foreground text-pretty">{step}</span>
                  </li>
                ))}
              </ol>
              <Button asChild variant="outline" size="md" className="mt-8">
                <Link href="/downloads">
                  <Download aria-hidden />
                  Printable application form
                </Link>
              </Button>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9">
                <CareerForm openings={careers.openings} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
