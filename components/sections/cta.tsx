import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'
import { Container } from '@/components/ui/section'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Reveal, TextReveal } from '@/components/ui/reveal'

export interface CtaContent {
  eyebrow: string
  title: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  note: string
  image: { src: string; alt: string }
}

/**
 * Closing call to action — a full-bleed photographic band that hands the
 * visitor straight to the enquiry form or the telephone.
 */
export function CallToAction({ content }: { content: CtaContent }) {
  return (
    <section className="relative isolate overflow-hidden bg-sand-950 py-section-lg">
      <Image
        src={content.image.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-45"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950/90 via-sand-950/85 to-sand-950/70"
      />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-6 text-gold-400">{content.eyebrow}</p>
          </Reveal>

          <TextReveal as="h2" text={content.title} className="text-display text-white" />

          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-xl text-body-lg text-sand-300 text-pretty">
              {content.description}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href={content.primaryCta.href} size="xl" variant="light" arrow>
                {content.primaryCta.label}
              </MagneticButton>
              <MagneticButton
                href={content.secondaryCta.href}
                size="xl"
                variant="glass"
                external
              >
                <Phone aria-hidden />
                {content.secondaryCta.label}
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-8 inline-flex items-center gap-2 text-caption text-sand-400">
              <ArrowRight className="size-3.5" aria-hidden />
              {content.note}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
