import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { Container, Section } from '@/components/ui/section'
import { ParallaxImage } from '@/components/ui/media'
import { Reveal, TextReveal } from '@/components/ui/reveal'
import { excerpt } from '@/utils/format'

export interface MessageContent {
  name: string
  role: string
  portrait: string
  salutation: string
  quote: string
  body: string
  href: string
}

/**
 * Founder's message — a premium dark card.
 *
 * The crest ink is used at full strength here and nowhere else on the homepage,
 * which is what makes this band read as the institutional voice.
 */
export function FounderMessage({ content }: { content: MessageContent }) {
  return (
    <Section tone="ink" size="lg" grain className="text-sand-100">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-700/25 blur-[120px]"
      />
      <Container>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="eyebrow mb-8 flex items-center gap-3 text-gold-400">
              <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden />
              {content.salutation}
            </p>
          </Reveal>

          <figure>
            <Quote className="mb-6 size-9 text-brand-400" aria-hidden />
            <blockquote>
              <TextReveal
                as="p"
                text={`“${content.quote}”`}
                className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white"
              />
            </blockquote>

            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl text-body-lg text-sand-300 text-pretty">
                {excerpt(content.body, 420)}
              </p>
            </Reveal>

            <figcaption className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8">
              <Image
                src={content.portrait}
                alt={`Portrait of ${content.name}`}
                width={140}
                height={140}
                sizes="72px"
                className="size-[4.5rem] rounded-full object-cover ring-1 ring-white/15"
              />
              <div className="min-w-0">
                <p className="font-display text-h6 font-semibold text-white">{content.name}</p>
                <p className="mt-1 text-body-sm text-sand-400">{content.role}</p>
              </div>
              <Link
                href={content.href}
                className="group ml-auto inline-flex items-center gap-2 text-body-sm font-semibold text-white"
              >
                <span className="link-underline">Read the full message</span>
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  )
}

/**
 * Principal's message — a modern split.
 *
 * Full-bleed portrait against a warm surface, with the copy set on the
 * editorial measure. Distinct from the founder band in tone, colour and rhythm.
 */
export function PrincipalMessage({ content }: { content: MessageContent }) {
  return (
    <Section tone="muted" size="none" className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[26rem] lg:min-h-[46rem]">
          <ParallaxImage
            src={content.portrait}
            alt={`Portrait of ${content.name}, ${content.role}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            strength={7}
            rounded={false}
            wrapperClassName="absolute inset-0"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-muted to-transparent lg:hidden"
          />
        </div>

        <div className="flex items-center px-gutter py-section lg:px-16 xl:px-20">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow mb-6">{content.salutation}</p>
            </Reveal>

            <TextReveal as="h2" text={`“${content.quote}”`} className="text-h3 italic" />

            <Reveal delay={0.1}>
              <p className="mt-8 text-body text-muted-foreground text-pretty">
                {excerpt(content.body, 560)}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 border-t border-border pt-7">
                <p className="font-display text-h6 font-semibold">{content.name}</p>
                <p className="mt-1 text-body-sm text-muted-foreground">{content.role}</p>
                <Link
                  href={content.href}
                  className="group mt-6 inline-flex items-center gap-2 font-display text-body font-semibold text-primary"
                >
                  <span className="link-underline">Read the full message</span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
