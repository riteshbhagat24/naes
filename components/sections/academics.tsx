import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import type { AcademicStage } from '@/types'

interface CurriculumGroup {
  title: string
  icon: string
  subjects: string[]
  note: string
}

/**
 * Academic excellence.
 *
 * A horizontally scrolling rail of the six stages: it holds the whole pathway
 * in one gesture on mobile and one glance on desktop, and it is a real
 * scroll container rather than a carousel, so it is keyboard and screen-reader
 * navigable without any JavaScript.
 */
export function AcademicExcellence({
  stages,
  eyebrow,
  title,
  description,
}: {
  stages: AcademicStage[]
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <Section tone="surface" size="lg" className="overflow-hidden border-y border-border">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-12"
          action={
            <Button asChild variant="outline" size="md">
              <Link href="/academics">
                All academic pages
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
      </Container>

      <div className="no-scrollbar overflow-x-auto pb-4">
        <ul className="flex w-max gap-5 px-[clamp(1.25rem,0.6rem+2.6vw,3rem)]">
          {stages.map((stage, index) => (
            <li key={stage.slug} className="w-[19rem] shrink-0 sm:w-[22rem]">
              <Reveal delay={index * 0.05}>
                <Link
                  href={`/academics/${stage.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,box-shadow,transform] duration-500 ease-premium hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="photo-grade relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={stage.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 76vw, 22rem"
                      className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-105"
                    />
                    <Badge variant="light" size="sm" className="absolute left-4 top-4 z-10">
                      {stage.ageRange}
                    </Badge>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-h4 font-semibold">{stage.name}</h3>
                    <p className="mt-2 text-caption text-primary">{stage.grades.join(' · ')}</p>
                    <p className="mt-4 flex-1 text-body-sm text-muted-foreground text-pretty">
                      {stage.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-primary">
                      Explore the stage
                      <ArrowRight
                        aria-hidden
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/**
 * Curriculum overview — a quiet, icon-led grid on the muted surface.
 * Distinct from the stage rail above it in colour, density and geometry.
 */
export function CurriculumSection({
  eyebrow,
  title,
  lead,
  groups,
  boards,
}: {
  eyebrow: string
  title: string
  lead: string
  groups: CurriculumGroup[]
  boards: Array<{ title: string; description: string; applies: string }>
}) {
  return (
    <Section tone="muted" size="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={lead} className="mb-12" />

        <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2">
          {boards.map((board) => (
            <RevealItem
              as="li"
              key={board.title}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-h5 font-semibold text-balance">{board.title}</h3>
                <Badge variant="outline" size="sm">
                  {board.applies}
                </Badge>
              </div>
              <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                {board.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup as="ul" gap={0.06} className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => (
            <RevealItem
              as="li"
              key={group.title}
              className="flex flex-col rounded-2xl border border-border bg-surface p-7"
            >
              <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon name={group.icon} className="size-[1.15rem]" />
              </span>
              <h3 className="mt-5 font-display text-h5 font-semibold">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.subjects.map((subject) => (
                  <li
                    key={subject}
                    className="rounded-full border border-border px-2.5 py-1 text-caption text-muted-foreground"
                  >
                    {subject}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex-1 border-t border-border pt-4 text-body-sm text-muted-foreground text-pretty">
                {group.note}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
