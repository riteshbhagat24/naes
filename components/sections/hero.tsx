'use client'

import * as React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { EASE } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/hooks/use-media-query'

interface HeroSlide {
  src: string
  alt: string
  caption: string
}

export interface HeroContent {
  eyebrow: string
  headlineLines: string[]
  subheadline: string
  intro: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  scrollHint: string
  videoUrl?: string
  slides: HeroSlide[]
}

const SLIDE_MS = 6400

/**
 * Cinematic hero.
 *
 * An animated photographic sequence — a slow Ken Burns push with a cross-fade
 * and a unifying warm grade — rather than a video file, so the largest
 * contentful paint is a single optimised image and the section costs almost
 * nothing on a mobile connection. If the school later supplies a campus film,
 * setting `videoUrl` in the CMS swaps the sequence for the video automatically.
 */
export function Hero({ content }: { content: HeroContent }) {
  const [index, setIndex] = React.useState(0)
  const reduced = usePrefersReducedMotion()
  const ref = React.useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const overlayY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8], [1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])

  React.useEffect(() => {
    if (content.videoUrl || content.slides.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % content.slides.length), SLIDE_MS)
    return () => clearInterval(timer)
  }, [content.videoUrl, content.slides.length])

  const active = content.slides[index]

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative isolate mt-[calc(var(--nav-height)*-1)] flex min-h-[100svh] flex-col justify-center overflow-hidden bg-sand-950 pb-20 pt-[calc(var(--nav-height)+2rem)] sm:pb-24 short:pb-16 short:pt-[calc(var(--nav-height)+1rem)]"
    >
      {/* ------------------------------------------------ backdrop */}
      <motion.div style={{ y: overlayY }} className="absolute inset-0 -z-20 scale-110">
        {content.videoUrl ? (
          <video
            src={content.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            poster={content.slides[0]?.src}
            aria-hidden
            className="size-full object-cover"
          />
        ) : (
          <AnimatePresence initial={false}>
            <motion.div
              key={active.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: EASE.inOut }}
              className="absolute inset-0"
            >
              <Image
                src={active.src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                quality={80}
                className={
                  reduced
                    ? 'object-cover object-center'
                    : 'animate-ken-burns object-cover object-center'
                }
              />
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Warm grade + vignette that unifies photographs shot years apart. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-sand-950 via-sand-950/72 to-sand-950/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950/70 via-transparent to-brand-900/40 mix-blend-multiply"
      />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      {/* ------------------------------------------------ content */}
      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="layout-container">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.15 }}
          className="eyebrow mb-5 flex flex-wrap items-center gap-3 text-gold-400 short:mb-3"
        >
          <span className="inline-block h-px w-10 bg-current opacity-60" aria-hidden />
          {content.eyebrow}
        </motion.p>

        <h1 className="max-w-5xl font-display text-hero font-bold text-white short:text-[clamp(2.25rem,1rem+4.2vw,4.5rem)] shorter:text-[clamp(2rem,1rem+3.4vw,3.5rem)]">
          <span className="sr-only">{content.headlineLines.join(' ')}</span>
          <span aria-hidden className="block">
            {content.headlineLines.map((line, lineIndex) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '108%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 1.05,
                    ease: EASE.out,
                    delay: 0.2 + lineIndex * 0.11,
                  }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE.out, delay: 0.55 }}
          className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end short:mt-5"
        >
          <div className="max-w-xl">
            <p className="font-display text-h5 font-medium text-sand-100 short:text-h6">
              {content.subheadline}
            </p>
            <p className="mt-5 line-clamp-4 max-w-xl text-body-lg text-sand-200 text-pretty sm:line-clamp-none short:mt-3 short:text-body shorter:hidden">
              {content.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center short:mt-6">
              <MagneticButton
                href={content.primaryCta.href}
                size="lg"
                variant="light"
                className="w-full sm:w-auto"
              >
                {content.primaryCta.label}
                <ArrowRight aria-hidden />
              </MagneticButton>
              <MagneticButton
                href={content.secondaryCta.href}
                size="lg"
                variant="glass"
                className="w-full sm:w-auto"
              >
                <Play className="fill-current" aria-hidden />
                {content.secondaryCta.label}
              </MagneticButton>
            </div>
          </div>

          {/* Slide caption + progress, aligned to the baseline of the copy. */}
          {!content.videoUrl && content.slides.length > 1 ? (
            <div className="hidden lg:block">
              <p className="mb-3 text-right text-caption text-sand-400">{active.caption}</p>
              <div className="flex items-center gap-2">
                {content.slides.map((slide, slideIndex) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => setIndex(slideIndex)}
                    aria-label={`Show slide ${slideIndex + 1}: ${slide.caption}`}
                    aria-current={slideIndex === index}
                    className="group relative h-0.5 w-12 overflow-hidden rounded-full bg-white/25"
                  >
                    <span
                      className={
                        slideIndex === index
                          ? 'absolute inset-0 origin-left bg-white'
                          : 'absolute inset-0 origin-left scale-x-0 bg-white/60 transition-transform duration-300 group-hover:scale-x-100'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>
      </motion.div>

      {/* ------------------------------------------------ scroll hint */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-4 hidden justify-center lg:flex short:hidden"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-caption uppercase tracking-[0.2em] text-sand-400"
        >
          {content.scrollHint}
          <span className="grid h-9 w-5 place-items-start rounded-full border border-sand-500/60 pt-1.5">
            <span className="size-1 animate-scroll-hint rounded-full bg-sand-300" />
          </span>
        </motion.span>
      </motion.div>
    </section>
  )
}
