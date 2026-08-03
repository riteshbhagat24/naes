import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock, MapPin } from 'lucide-react'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { formatDate, splitDate } from '@/utils/format'
import type { EventItem, NewsItem } from '@/types'

/* ==========================================================================
   Events and news.
   Two adjacent listing bands, given deliberately opposite geometry: the events
   list is a dense ruled calendar, the news band is a wide editorial grid.
   ========================================================================== */

/** Date chip shared by the events list and the events page. */
export function DateChip({ date, className }: { date: string; className?: string }) {
  const { day, month, year } = splitDate(date)
  return (
    <div
      className={
        className ??
        'flex w-16 shrink-0 flex-col items-center rounded-xl border border-border bg-surface py-2.5 text-center'
      }
    >
      <span className="font-display text-h4 font-bold leading-none tabular-nums text-primary">
        {day}
      </span>
      <span className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {month}
      </span>
      <span className="text-[0.625rem] text-muted-foreground">{year}</span>
    </div>
  )
}

export function UpcomingEvents({
  events,
  eyebrow,
  title,
  description,
  note,
}: {
  events: EventItem[]
  eyebrow: string
  title: string
  description: string
  note?: string
}) {
  return (
    <Section tone="surface" size="lg" className="border-y border-border">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-12"
          action={
            <Button asChild variant="outline" size="md">
              <Link href="/events">
                Full academic calendar
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />

        <ul className="divide-y divide-border border-y border-border">
          {events.map((event, index) => (
            <li key={event.slug}>
              <Reveal delay={index * 0.04}>
                <Link
                  href={`/events/${event.slug}`}
                  className="group flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:gap-8"
                >
                  <DateChip date={event.date} />

                  <div className="min-w-0 flex-1">
                    <Badge variant="neutral" size="sm">
                      {event.category}
                    </Badge>
                    <h3 className="mt-3 font-display text-h4 font-semibold text-balance transition-colors duration-300 group-hover:text-primary">
                      {event.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-body-sm text-muted-foreground text-pretty">
                      {event.summary}
                    </p>
                    <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-caption text-muted-foreground">
                      {event.time ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-3.5" aria-hidden />
                          {event.time}
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" aria-hidden />
                        {event.location}
                      </span>
                    </p>
                  </div>

                  <span
                    aria-hidden
                    className="hidden size-11 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover:border-primary/50 group-hover:text-primary sm:grid"
                  >
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {note ? (
          <p className="mt-6 flex items-start gap-2 text-caption text-muted-foreground">
            <CalendarDays className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            {note}
          </p>
        ) : null}
      </Container>
    </Section>
  )
}

export function LatestNews({
  news,
  eyebrow,
  title,
  description,
}: {
  news: NewsItem[]
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <Section tone="default" size="lg">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-12"
          action={
            <Button asChild variant="outline" size="md">
              <Link href="/news">
                Newsroom
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />

        <RevealGroup as="ul" gap={0.07} className="grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <RevealItem as="li" key={item.slug}>
              <Link href={`/news/${item.slug}`} className="group flex h-full flex-col">
                {item.image ? (
                  <div className="photo-grade relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-900 ease-premium group-hover:scale-105"
                    />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col pt-6">
                  <p className="flex items-center gap-3 text-caption text-muted-foreground">
                    <span className="font-semibold uppercase tracking-[0.12em] text-primary">
                      {item.category}
                    </span>
                    <span className="h-px w-4 bg-border" aria-hidden />
                    {item.approximateDate && item.sessionLabel ? (
                      <span>{item.sessionLabel}</span>
                    ) : (
                      <time dateTime={item.date}>{formatDate(item.date, 'medium')}</time>
                    )}
                  </p>
                  <h3 className="mt-3 font-display text-h5 font-semibold text-balance transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-body-sm text-muted-foreground text-pretty">
                    {item.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-primary">
                    Read the story
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
