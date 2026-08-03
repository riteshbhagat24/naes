import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import type { Achievement } from '@/types'

/**
 * Achievements.
 *
 * A staggered grid where the first entry runs wide — a masonry rhythm without
 * a masonry library, which keeps the section free of layout-shift risk.
 */
export function AchievementsSection({
  items,
  eyebrow,
  title,
  description,
  limit = 6,
  showCta = true,
}: {
  items: Achievement[]
  eyebrow: string
  title: string
  description: string
  limit?: number
  showCta?: boolean
}) {
  const shown = items.slice(0, limit)

  return (
    <Section tone="default" size="lg">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-14"
          action={
            showCta ? (
              <Button asChild variant="outline" size="md">
                <Link href="/achievements">
                  All achievements
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            ) : undefined
          }
        />

        <RevealGroup as="ul" gap={0.06} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, index) => (
            <RevealItem
              as="li"
              key={item.title}
              className={
                index === 0
                  ? 'group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl p-7 md:col-span-2 lg:min-h-[26rem]'
                  : 'group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,transform] duration-500 ease-premium hover:-translate-y-1 hover:border-primary/30'
              }
            >
              {index === 0 ? (
                <>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="-z-10 object-cover transition-transform duration-1100 ease-premium group-hover:scale-105"
                    />
                  ) : null}
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-sand-950/94 via-sand-950/55 to-sand-950/10"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="light" size="sm">
                      {item.category}
                    </Badge>
                    <Badge variant="light" size="sm">
                      {item.level}
                    </Badge>
                    <Badge variant="light" size="sm">
                      {item.year}
                    </Badge>
                  </div>
                  <h3 className="mt-4 max-w-xl font-display text-h3 font-semibold text-white text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-body-sm text-sand-200 text-pretty">
                    {item.description}
                  </p>
                </>
              ) : (
                <>
                  {item.image ? (
                    <div className="photo-grade relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-900 ease-premium group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="primary" size="sm">
                        {item.category}
                      </Badge>
                      <span className="text-caption text-muted-foreground">
                        {item.level} · {item.year}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-h5 font-semibold text-balance">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-body-sm text-muted-foreground text-pretty">
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
