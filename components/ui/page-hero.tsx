import Image from 'next/image'
import { Breadcrumb, type Crumb } from '@/components/ui/breadcrumb'
import { Container } from '@/components/ui/section'
import { Reveal, TextReveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow?: string
  title: string
  lead?: string
  trail: Crumb[]
  image?: { src: string; alt: string }
  /** `feature` uses a full-bleed photograph; `plain` is a typographic band. */
  variant?: 'feature' | 'plain'
  align?: 'left' | 'center'
  children?: React.ReactNode
}

/**
 * The masthead every inner page opens with. Two variants keep the site varied
 * without letting each page invent its own header.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  trail,
  image,
  variant = image ? 'feature' : 'plain',
  align = 'left',
  children,
}: PageHeroProps) {
  if (variant === 'plain') {
    return (
      <header className="relative isolate overflow-hidden border-b border-border bg-muted pb-16 pt-[calc(var(--nav-height)+3.5rem)] sm:pb-20 sm:pt-[calc(var(--nav-height)+5rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-radial-fade opacity-70"
        />
        <Container>
          <Breadcrumb trail={trail} className="mb-8" />
          <div className={cn('max-w-4xl', align === 'center' && 'mx-auto text-center')}>
            {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
            <TextReveal as="h1" text={title} className="text-h1" />
            {lead ? (
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-lead text-muted-foreground text-pretty">{lead}</p>
              </Reveal>
            ) : null}
            {children ? (
              <Reveal delay={0.16} className="mt-9">
                {children}
              </Reveal>
            ) : null}
          </div>
        </Container>
      </header>
    )
  }

  return (
    <header className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-sand-950 pb-14 pt-[calc(var(--nav-height)+4rem)] sm:min-h-[70svh] sm:pb-20">
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-60 saturate-[0.8]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-sand-950 via-sand-950/80 to-sand-950/35"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-brand-950/60 via-transparent to-transparent mix-blend-multiply"
          />
        </div>
      ) : null}

      <Container className="relative">
        <Breadcrumb trail={trail} invert className="mb-8" />
        <div className={cn('max-w-4xl', align === 'center' && 'mx-auto text-center')}>
          {eyebrow ? <p className="eyebrow mb-4 text-gold-400">{eyebrow}</p> : null}
          <TextReveal as="h1" text={title} className="text-h1 text-white" />
          {lead ? (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lead text-sand-200 text-pretty">{lead}</p>
            </Reveal>
          ) : null}
          {children ? (
            <Reveal delay={0.16} className="mt-9">
              {children}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </header>
  )
}
