import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getNews, getNewsItem } from '@/lib/data'
import { articleSchema } from '@/lib/schema'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { Prose } from '@/components/ui/prose'
import { JsonLd } from '@/components/ui/json-ld'
import { Badge } from '@/components/ui/badge'
import { RevealImage } from '@/components/ui/media'
import { formatDate, readingTime } from '@/utils/format'

interface Params {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getNews().map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const item = getNewsItem(slug)
  if (!item) {
    return buildMetadata({ title: 'Story not found', description: '', path: `/news/${slug}`, noindex: true })
  }
  return buildMetadata({
    title: item.title,
    description: item.summary,
    path: `/news/${item.slug}`,
    image: item.image,
    type: 'article',
    publishedTime: item.date,
  })
}

export default async function NewsArticlePage({ params }: Params) {
  const { slug } = await params
  const item = getNewsItem(slug)
  if (!item) notFound()

  const related = getNews()
    .filter((entry) => entry.slug !== item.slug)
    .slice(0, 3)

  return (
    <>
      {/* Article structured data is emitted only where the publication date is
          exact; archive stories carry a session label instead. */}
      {item.approximateDate ? null : (
        <JsonLd
          id="article-schema"
          data={articleSchema({
            title: item.title,
            description: item.summary,
            path: `/news/${item.slug}`,
            date: item.date,
            image: item.image,
            author: item.author,
          })}
        />
      )}

      <PageHero
        eyebrow={`${item.category} · ${
          item.approximateDate && item.sessionLabel ? item.sessionLabel : formatDate(item.date)
        }`}
        title={item.title}
        lead={item.summary}
        trail={[
          { title: 'News', href: '/news' },
          { title: item.title, href: `/news/${item.slug}` },
        ]}
      />

      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <dl className="space-y-5 border-t border-border pt-6 text-body-sm lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
                <div>
                  <dt className="text-caption uppercase tracking-[0.12em] text-muted-foreground">
                    Published
                  </dt>
                  <dd className="mt-1 font-medium">
                    {item.approximateDate && item.sessionLabel
                      ? item.sessionLabel
                      : formatDate(item.date)}
                  </dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-[0.12em] text-muted-foreground">
                    Category
                  </dt>
                  <dd className="mt-1.5">
                    <Badge variant="primary" size="sm">
                      {item.category}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-[0.12em] text-muted-foreground">
                    Reading time
                  </dt>
                  <dd className="mt-1 font-medium">{readingTime(item.body)}</dd>
                </div>
              </dl>
            </aside>

            <article className="lg:col-span-9">
              {item.image ? (
                <RevealImage
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  wrapperClassName="mb-12 aspect-[16/9] w-full"
                />
              ) : null}
              <Prose markdown={item.body} className="max-w-none lg:max-w-prose" />
            </article>
          </div>
        </Container>
      </Section>

      <Section tone="muted" size="md">
        <Container>
          <p className="eyebrow mb-8">More from the newsroom</p>
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-3">
            {related.map((entry) => (
              <li key={entry.slug} className="bg-surface">
                <Link href={`/news/${entry.slug}`} className="group flex h-full flex-col p-7">
                  <p className="text-caption uppercase tracking-[0.12em] text-primary">
                    {entry.category}
                  </p>
                  <h2 className="mt-3 font-display text-h5 font-semibold text-balance transition-colors duration-300 group-hover:text-primary">
                    {entry.title}
                  </h2>
                  <p className="mt-3 flex-1 text-body-sm text-muted-foreground text-pretty">
                    {entry.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-primary">
                    Read
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
