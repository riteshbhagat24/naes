import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getEvents } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { DateChip } from '@/components/sections/events-news'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/ui/reveal'
import { isUpcoming } from '@/utils/format'

export const metadata: Metadata = buildMetadata({
  title: 'Events & Academic Calendar',
  description:
    'The academic calendar of New Apostolic English High School, Nagpur — national days, celebrations, examinations, the annual cultural programme and the Apostolic Sports meet.',
  path: '/events',
  image: '/images/campus/campus-2.jpg',
})

export default function EventsPage() {
  const events = getEvents()
  const upcoming = events.filter((event) => isUpcoming(event.endDate ?? event.date))
  const past = events.filter((event) => !isUpcoming(event.endDate ?? event.date)).reverse()

  const renderList = (list: typeof events, muted = false) => (
    <ul className="divide-y divide-border border-y border-border">
      {list.map((event, index) => (
        <li key={event.slug}>
          <Reveal delay={index * 0.03}>
            <Link
              href={`/events/${event.slug}`}
              className={`group flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:gap-8 ${
                muted ? 'opacity-70 hover:opacity-100' : ''
              }`}
            >
              <DateChip date={event.date} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="neutral" size="sm">
                    {event.category}
                  </Badge>
                  {event.provisional ? (
                    <Badge variant="outline" size="sm">
                      Provisional
                    </Badge>
                  ) : null}
                </div>
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
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <PageHero
        eyebrow="Academic calendar"
        title="The year, dated"
        lead="Celebrations, examinations, exhibitions and the annual sports meet. Dates are provisional until confirmed by circular from the school office."
        trail={[{ title: 'Events', href: '/events' }]}
      />

      <Section tone="default" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Coming up"
            title={upcoming.length ? 'Next in the calendar' : 'The session calendar'}
            className="mb-10"
          />
          {renderList(upcoming.length ? upcoming : events)}
        </Container>
      </Section>

      {past.length ? (
        <Section tone="muted" size="lg">
          <Container>
            <SectionHeader eyebrow="Earlier this session" title="Already held" className="mb-10" />
            {renderList(past, true)}
          </Container>
        </Section>
      ) : null}
    </>
  )
}
