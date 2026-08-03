import Link from 'next/link'
import { ArrowRight, Clapperboard } from 'lucide-react'
import { Container, Section } from '@/components/ui/section'
import { VideoEmbed } from '@/components/ui/video-embed'
import { Reveal, TextReveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/format'
import type { VideoItem } from '@/types'

export interface HomeVideo extends VideoItem {
  date: string
  poster?: string
}

/**
 * Video band.
 *
 * The lead film gets the width; the rest are listed beside it. Nothing loads
 * from YouTube until a visitor presses play — see `VideoEmbed`.
 */
export function VideoSection({
  eyebrow,
  title,
  description,
  items,
  posters,
}: {
  eyebrow: string
  title: string
  description: string
  items: HomeVideo[]
  posters: Record<string, string>
}) {
  const [lead, ...rest] = items

  return (
    <Section tone="ink" size="lg" grain>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[30rem] w-[52rem] -translate-x-1/2 rounded-full bg-brand-700/20 blur-[130px]"
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5 flex items-center gap-3 text-gold-400">
                <Clapperboard className="size-4" aria-hidden />
                {eyebrow}
              </p>
            </Reveal>
            <TextReveal as="h2" text={title} className="text-h2 text-white" />
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-xl text-body-lg text-sand-300 text-pretty">{description}</p>
            </Reveal>

            <Reveal delay={0.14} className="mt-10">
              <VideoEmbed
                youtubeId={lead.youtubeId}
                title={lead.title}
                poster={posters[lead.id]}
              />
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-5">
                <h3 className="font-display text-h5 font-semibold text-white">{lead.title}</h3>
                <p className="mt-2 max-w-2xl text-body-sm text-sand-400 text-pretty">
                  {lead.description}
                </p>
                <p className="mt-3 text-caption text-sand-500">
                  {lead.source} · {formatDate(lead.date, 'medium')}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-24">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {rest.map((video) => (
                <li key={video.id} className="py-7">
                  <Reveal>
                    <VideoEmbed
                      youtubeId={video.youtubeId}
                      title={video.title}
                      poster={posters[video.id]}
                      className="mb-5"
                    />
                    <h3 className="font-display text-h6 font-semibold text-white">{video.title}</h3>
                    <p className="mt-2 text-body-sm text-sand-400 text-pretty">
                      {video.description}
                    </p>
                    <p className="mt-3 text-caption text-sand-500">
                      {video.source} · {formatDate(video.date, 'medium')}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <Button asChild variant="glass" size="md" className="mt-8">
                <Link href="/videos">
                  All films &amp; features
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
