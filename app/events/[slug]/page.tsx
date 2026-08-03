import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CalendarDays, Clock, MapPin } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getEvent, getEvents } from '@/lib/data'
import { eventSchema } from '@/lib/schema'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { Prose } from '@/components/ui/prose'
import { JsonLd } from '@/components/ui/json-ld'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RevealImage } from '@/components/ui/media'
import { formatDate } from '@/utils/format'

interface Params {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getEvents().map((event) => ({ slug: event.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const event = getEvent(slug)
  if (!event) {
    return buildMetadata({ title: 'Event not found', description: '', path: `/events/${slug}`, noindex: true })
  }
  return buildMetadata({
    title: event.title,
    description: event.summary,
    path: `/events/${event.slug}`,
    image: event.image,
    type: 'article',
  })
}

export default async function EventPage({ params }: Params) {
  const { slug } = await params
  const event = getEvent(slug)
  if (!event) notFound()

  const others = getEvents()
    .filter((entry) => entry.slug !== event.slug)
    .slice(0, 3)

  return (
    <>
      <JsonLd
        id="event-schema"
        data={eventSchema({
          title: event.title,
          description: event.summary,
          path: `/events/${event.slug}`,
          start: event.date,
          end: event.endDate,
          location: event.location,
          image: event.image,
        })}
      />

      <PageHero
        eyebrow={`${event.category} · ${formatDate(event.date)}`}
        title={event.title}
        lead={event.summary}
        trail={[
          { title: 'Events', href: '/events' },
          { title: event.title, href: `/events/${event.slug}` },
        ]}
      />

      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-border bg-muted p-7 lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
                <h2 className="eyebrow mb-5">Details</h2>
                <dl className="space-y-5 text-body-sm">
                  <div className="flex gap-3">
                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <div>
                      <dt className="font-semibold">Date</dt>
                      <dd className="mt-0.5 text-muted-foreground">
                        <time dateTime={event.date}>{formatDate(event.date)}</time>
                      </dd>
                    </div>
                  </div>
                  {event.time ? (
                    <div className="flex gap-3">
                      <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <div>
                        <dt className="font-semibold">Time</dt>
                        <dd className="mt-0.5 text-muted-foreground">{event.time}</dd>
                      </div>
                    </div>
                  ) : null}
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <div>
                      <dt className="font-semibold">Location</dt>
                      <dd className="mt-0.5 text-muted-foreground">{event.location}</dd>
                    </div>
                  </div>
                </dl>

                {event.provisional ? (
                  <p className="mt-6 border-t border-border pt-5 text-caption text-muted-foreground text-pretty">
                    This date is provisional and is confirmed by circular from the school office
                    ahead of the event.
                  </p>
                ) : null}

                <Button asChild variant="outline" size="md" full className="mt-6">
                  <Link href="/circulars">Read the latest circulars</Link>
                </Button>
              </div>
            </aside>

            <article className="lg:col-span-8">
              {event.image ? (
                <RevealImage
                  src={event.image}
                  alt={event.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  wrapperClassName="mb-12 aspect-[16/9] w-full"
                />
              ) : null}
              <Prose markdown={event.body} className="max-w-none lg:max-w-prose" />
            </article>
          </div>
        </Container>
      </Section>

      <Section tone="muted" size="md">
        <Container>
          <p className="eyebrow mb-8">Also in the calendar</p>
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-3">
            {others.map((entry) => (
              <li key={entry.slug} className="bg-surface">
                <Link href={`/events/${entry.slug}`} className="group flex h-full flex-col p-7">
                  <Badge variant="neutral" size="sm" className="self-start">
                    {entry.category}
                  </Badge>
                  <h2 className="mt-4 font-display text-h5 font-semibold text-balance transition-colors duration-300 group-hover:text-primary">
                    {entry.title}
                  </h2>
                  <p className="mt-2 text-caption text-muted-foreground">
                    {formatDate(entry.date, 'medium')}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-primary">
                    Open
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
