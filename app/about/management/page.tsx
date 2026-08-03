import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getLeadership } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = buildMetadata({
  title: 'Management',
  description:
    'The National Apostolic Church Education Society, the leadership of New Apostolic English High School and Dr. Bower Apostolic Junior College, and the teaching staff of each section.',
  path: '/about/management',
  image: '/images/people/principal-vinita-v-bower.jpg',
})

export default function ManagementPage() {
  const content = getLeadership()

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        trail={[
          { title: 'About', href: '/about' },
          { title: 'Management', href: '/about/management' },
        ]}
      />

      <Section tone="default" size="lg">
        <Container>
          <ul className="space-y-16">
            {content.leadership.map((person, index) => (
              <li key={person.name}>
                <Reveal delay={index * 0.04}>
                  <article className="grid gap-8 md:grid-cols-12 md:gap-12">
                    <div className="md:col-span-4 lg:col-span-3">
                      {person.portrait ? (
                        <div className="photo-grade relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                          <Image
                            src={person.portrait}
                            alt={`Portrait of ${person.name}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                    </div>

                    <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
                      <p className="eyebrow mb-3">{person.role}</p>
                      <h2 className="font-display text-h3 font-semibold text-balance">
                        {person.name}
                      </h2>
                      <p className="mt-2 text-body-sm text-muted-foreground">{person.department}</p>
                      <p className="mt-6 max-w-prose text-body text-muted-foreground text-pretty">
                        {person.bio}
                      </p>
                      {person.quote ? (
                        <figure className="mt-7 border-l-2 border-primary/40 pl-6">
                          <Quote className="mb-3 size-5 text-primary/50" aria-hidden />
                          <blockquote className="max-w-prose font-display text-body-lg italic text-pretty">
                            “{person.quote}”
                          </blockquote>
                        </figure>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Teaching staff"
            title="The sections, and the teams that run them"
            description={content.facultyNote}
            className="mb-14"
          />

          <RevealGroup as="ul" gap={0.06} className="grid gap-6 sm:grid-cols-2">
            {content.departments.map((department) => (
              <RevealItem
                as="li"
                key={department.title}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div className="photo-grade relative aspect-[16/10] w-full">
                  <Image
                    src={department.image}
                    alt={department.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <p className="text-caption uppercase tracking-[0.12em] text-primary">
                    {department.session}
                  </p>
                  <h3 className="mt-3 font-display text-h5 font-semibold">{department.title}</h3>
                  <p className="mt-2.5 text-body-sm text-muted-foreground text-pretty">
                    {department.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Button asChild variant="outline" size="lg" className="mt-12">
            <Link href="/careers">
              Teaching vacancies
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Container>
      </Section>
    </>
  )
}
