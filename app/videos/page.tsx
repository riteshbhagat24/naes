import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getVideos } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { VideoEmbed } from '@/components/ui/video-embed'
import { Reveal } from '@/components/ui/reveal'
import { formatDate } from '@/utils/format'

const POSTERS: Record<string, string> = {
  'apostolic-sports-2025': '/images/campus/campus-2.jpg',
  'ucn-junior-college-feature': '/images/academics/junior-college-students.jpg',
}

export const metadata: Metadata = buildMetadata({
  title: 'Video Gallery',
  description:
    'Films from the school ground and press features — including the full Apostolic Sports meet and regional news coverage of Dr. Bower Apostolic Junior College.',
  path: '/videos',
  image: '/images/campus/campus-2.jpg',
})

export default function VideosPage() {
  const videos = getVideos()

  return (
    <>
      <PageHero
        eyebrow={videos.eyebrow}
        title={videos.title}
        lead={videos.description}
        trail={[{ title: 'Video Gallery', href: '/videos' }]}
        image={{ src: '/images/campus/campus-2.jpg', alt: 'The school ground during a sports session' }}
      />

      <Section tone="default" size="lg">
        <Container>
          <ul className="space-y-16">
            {videos.items.map((video) => (
              <li key={video.id}>
                <Reveal>
                  <article className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-8">
                      <VideoEmbed
                        youtubeId={video.youtubeId}
                        title={video.title}
                        poster={POSTERS[video.id]}
                      />
                    </div>
                    <div className="lg:col-span-4">
                      <p className="text-caption uppercase tracking-[0.12em] text-primary">
                        {video.source}
                      </p>
                      <h2 className="mt-3 font-display text-h3 font-semibold text-balance">
                        {video.title}
                      </h2>
                      <p className="mt-4 text-body text-muted-foreground text-pretty">
                        {video.description}
                      </p>
                      <p className="mt-5 text-caption text-muted-foreground">
                        <time dateTime={video.date}>{formatDate(video.date)}</time>
                        {video.duration ? ` · ${video.duration}` : null}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <p className="mt-16 border-t border-border pt-8 text-caption text-muted-foreground">
            Videos load from YouTube only after you press play, so this page stays fast on a mobile
            connection.
          </p>
        </Container>
      </Section>
    </>
  )
}
