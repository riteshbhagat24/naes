import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getLeadership, getMessage } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Prose } from '@/components/ui/prose'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = buildMetadata({
  title: 'Our Faculty',
  description:
    'The teachers of New Apostolic English High School — Pre-Primary, Primary, High School and Junior College — and a message from the Head Mistress, Dr. Vandana P. Benjamin.',
  path: '/about/faculty',
  image: '/images/people/staff-primary-2024-25.jpg',
})

export default function FacultyPage() {
  const content = getLeadership()
  const headMistress = getMessage('head-mistress')

  return (
    <>
      <PageHero
        eyebrow="Our faculty"
        title="Teachers who go beyond the syllabus"
        lead="Every section is led by staff who know each child's pace, not only the class average."
        trail={[
          { title: 'About', href: '/about' },
          { title: 'Our Faculty', href: '/about/faculty' },
        ]}
      />

      {headMistress ? (
        <Section tone="default" size="lg">
          <Container>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="photo-grade relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={headMistress.data.portrait}
                    alt={`Portrait of ${headMistress.data.name}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-6 font-display text-h5 font-semibold">{headMistress.data.name}</p>
                <p className="mt-1.5 text-body-sm text-muted-foreground">
                  {headMistress.data.role}
                </p>
              </div>

              <div className="lg:col-span-8">
                <Reveal>
                  <p className="eyebrow mb-5">{headMistress.data.salutation}</p>
                  <blockquote className="mb-9 border-l-2 border-primary/40 pl-6 font-display text-h3 font-semibold italic leading-snug text-balance">
                    “{headMistress.data.quote}”
                  </blockquote>
                </Reveal>
                <Reveal delay={0.06}>
                  <Prose markdown={headMistress.body} className="max-w-none lg:max-w-prose" />
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader
            eyebrow="By section"
            title="The teams behind each stage"
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
                  <h2 className="mt-3 font-display text-h5 font-semibold">{department.title}</h2>
                  <p className="mt-2.5 text-body-sm text-muted-foreground text-pretty">
                    {department.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/careers">
                Join the faculty
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about/management">Management &amp; leadership</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
