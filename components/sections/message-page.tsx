import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { Container, Section } from '@/components/ui/section'
import { Prose } from '@/components/ui/prose'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import type { MessageDoc } from '@/lib/data'

/**
 * Shared layout for a signed message page.
 *
 * The portrait and attribution sit in a sticky rail beside the letter, so the
 * reader always knows whose voice they are in — the pattern used by the
 * founder's, principal's and head mistress's pages.
 */
export function MessagePage({
  message,
  body,
  related,
}: {
  message: MessageDoc
  body: string
  related: Array<{ title: string; href: string; description: string }>
}) {
  return (
    <>
      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
                <div className="photo-grade relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={message.portrait}
                    alt={`Portrait of ${message.name}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-6 font-display text-h5 font-semibold">{message.name}</p>
                <p className="mt-1.5 text-body-sm text-muted-foreground text-pretty">
                  {message.role}
                </p>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <Reveal>
                <figure className="mb-10 border-l-2 border-primary/40 pl-6">
                  <Quote className="mb-4 size-7 text-primary/50" aria-hidden />
                  <blockquote className="font-display text-h3 font-semibold italic leading-snug text-balance">
                    “{message.quote}”
                  </blockquote>
                </figure>
              </Reveal>

              <Reveal delay={0.06}>
                <Prose markdown={body} className="max-w-none lg:max-w-prose" />
              </Reveal>

              {message.signature ? (
                <Reveal delay={0.1}>
                  <p className="mt-12 border-t border-border pt-8 font-display text-h6 font-semibold">
                    {message.signature}
                  </p>
                </Reveal>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted" size="md">
        <Container>
          <p className="eyebrow mb-8">Continue reading</p>
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-3">
            {related.map((item) => (
              <li key={item.href} className="bg-surface">
                <Link href={item.href} className="group flex h-full flex-col p-7">
                  <h2 className="font-display text-h5 font-semibold transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-body-sm text-muted-foreground text-pretty">
                    {item.description}
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

          <Button asChild variant="outline" size="lg" className="mt-10">
            <Link href="/admissions/enquiry">
              Begin an admission enquiry
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Container>
      </Section>
    </>
  )
}
