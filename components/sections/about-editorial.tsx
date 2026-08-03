import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, Section } from '@/components/ui/section'
import { ParallaxImage, RevealImage } from '@/components/ui/media'
import { Reveal, TextReveal } from '@/components/ui/reveal'

export interface AboutContent {
  eyebrow: string
  title: string
  lead: string
  paragraphs: string[]
  highlights: Array<{ title: string; description: string }>
  images: Array<{ src: string; alt: string }>
  cta: { label: string; href: string }
}

/**
 * Editorial about block.
 *
 * A magazine spread: a drop-lead paragraph, a staggered image cluster that
 * parallaxes at two different rates, and a hairline-ruled list of principles.
 */
export function AboutEditorial({ content }: { content: AboutContent }) {
  const [first, second, third] = content.images

  return (
    <Section tone="default" size="lg">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---------------------------------------------- copy */}
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <p className="eyebrow mb-5 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-current opacity-50" aria-hidden />
                {content.eyebrow}
              </p>
            </Reveal>

            <TextReveal as="h2" text={content.title} className="text-h2" />

            <Reveal delay={0.08}>
              <p className="mt-7 font-display text-lead font-medium text-foreground text-pretty">
                {content.lead}
              </p>
            </Reveal>

            <div className="mt-6 space-y-5">
              {content.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 24)} delay={0.1 + index * 0.05}>
                  <p className="max-w-prose text-body text-muted-foreground text-pretty">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <Link
                href={content.cta.href}
                className="group mt-9 inline-flex items-center gap-2 font-display text-body font-semibold text-primary"
              >
                <span className="link-underline">{content.cta.label}</span>
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          {/* ---------------------------------------------- image cluster */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-12 gap-4 sm:gap-5">
              <div className="col-span-8">
                <ParallaxImage
                  src={first.src}
                  alt={first.alt}
                  fill
                  sizes="(max-width: 1024px) 60vw, 32vw"
                  strength={9}
                  wrapperClassName="aspect-[4/5] w-full"
                />
              </div>
              <div className="col-span-4 self-end">
                <RevealImage
                  src={second.src}
                  alt={second.alt}
                  fill
                  sizes="(max-width: 1024px) 30vw, 16vw"
                  wrapperClassName="aspect-square w-full"
                />
              </div>
              <div className="col-span-7 col-start-5 -mt-8 sm:-mt-12">
                <ParallaxImage
                  src={third.src}
                  alt={third.alt}
                  fill
                  sizes="(max-width: 1024px) 52vw, 28vw"
                  strength={14}
                  wrapperClassName="aspect-[5/4] w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------- principles */}
        <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-3">
          {content.highlights.map((highlight, index) => (
            <li key={highlight.title} className="bg-background p-7 sm:p-8">
              <Reveal delay={index * 0.06}>
                <p className="font-display text-caption font-bold uppercase tracking-[0.14em] text-primary">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-display text-h5 font-semibold text-balance">
                  {highlight.title}
                </h3>
                <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                  {highlight.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
