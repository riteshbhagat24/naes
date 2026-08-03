import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getNews } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils/format'

export const metadata: Metadata = buildMetadata({
  title: 'Newsroom',
  description:
    'Results, fixtures, workshops and press coverage from New Apostolic English High School and Dr. Bower Apostolic Junior College, Nagpur.',
  path: '/news',
  image: '/images/gallery/state-level-throwball.jpg',
})

export default function NewsPage() {
  const news = getNews()
  const [lead, ...rest] = news

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="What has been happening"
        lead="Stories from the school archive and the regional press, newest first."
        trail={[{ title: 'News', href: '/news' }]}
      />

      <Section tone="default" size="lg">
        <Container>
          {/* lead story */}
          <Link href={`/news/${lead.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:gap-12">
            {lead.image ? (
              <div className="photo-grade relative aspect-[16/10] w-full overflow-hidden rounded-2xl lg:col-span-7">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-105"
                />
              </div>
            ) : null}
            <div className="flex flex-col justify-center lg:col-span-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary" size="sm">
                  {lead.category}
                </Badge>
                <span className="text-caption text-muted-foreground">
                  {lead.approximateDate && lead.sessionLabel
                    ? lead.sessionLabel
                    : formatDate(lead.date)}
                </span>
              </div>
              <h2 className="mt-4 font-display text-h2 font-semibold text-balance transition-colors duration-300 group-hover:text-primary">
                {lead.title}
              </h2>
              <p className="mt-4 text-body-lg text-muted-foreground text-pretty">{lead.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-primary">
                Read the story
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>

          {/* the rest */}
          <RevealGroup
            as="ul"
            gap={0.06}
            className="mt-20 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((item) => (
              <RevealItem as="li" key={item.slug}>
                <Link href={`/news/${item.slug}`} className="group flex h-full flex-col">
                  {item.image ? (
                    <div className="photo-grade relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col pt-6">
                    <p className="flex items-center gap-3 text-caption text-muted-foreground">
                      <span className="font-semibold uppercase tracking-[0.12em] text-primary">
                        {item.category}
                      </span>
                      <span className="h-px w-4 bg-border" aria-hidden />
                      {item.approximateDate && item.sessionLabel
                        ? item.sessionLabel
                        : formatDate(item.date, 'medium')}
                    </p>
                    <h2 className="mt-3 font-display text-h5 font-semibold text-balance transition-colors duration-300 group-hover:text-primary">
                      {item.title}
                    </h2>
                    <p className="mt-3 flex-1 text-body-sm text-muted-foreground text-pretty">
                      {item.summary}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  )
}
