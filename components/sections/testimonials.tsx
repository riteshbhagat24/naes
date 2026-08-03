'use client'

import * as React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Container, Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/types'

/**
 * Testimonial carousel.
 *
 * One large quote at a time, advanced by real buttons — no autoplay, because a
 * quote that moves while it is being read is a usability failure rather than a
 * flourish. The live region announces each change.
 */
export function Testimonials({
  items,
  eyebrow,
  title,
  note,
}: {
  items: Testimonial[]
  eyebrow: string
  title: string
  note?: string
}) {
  const [index, setIndex] = React.useState(0)
  const active = items[index]

  const go = (delta: number) => setIndex((current) => (current + delta + items.length) % items.length)

  return (
    <Section tone="muted" size="lg">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow mb-5">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-h3 text-balance">{title}</h2>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <Quote className="mx-auto mb-8 size-9 text-primary/40" aria-hidden />

          <div aria-live="polite" className="min-h-[19rem] sm:min-h-[16rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: EASE.out }}
                className="text-center"
              >
                <blockquote className="mx-auto max-w-3xl font-display text-[clamp(1.25rem,1rem+1.3vw,1.875rem)] font-medium leading-[1.35] tracking-[-0.02em] text-foreground text-balance">
                  “{active.quote}”
                </blockquote>

                <figcaption className="mt-9 flex flex-col items-center gap-3">
                  {active.portrait ? (
                    <Image
                      src={active.portrait}
                      alt=""
                      width={120}
                      height={120}
                      sizes="64px"
                      className="size-16 rounded-full object-cover ring-1 ring-border"
                    />
                  ) : null}
                  <div>
                    <p className="font-display text-body font-semibold">{active.name}</p>
                    <p className="mt-1 max-w-md text-caption text-muted-foreground text-pretty">
                      {active.role}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid size-11 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ChevronLeft className="size-4" aria-hidden />
              <span className="sr-only">Previous testimonial</span>
            </button>

            <ul className="flex items-center gap-2">
              {items.map((item, itemIndex) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => setIndex(itemIndex)}
                    aria-current={itemIndex === index}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-500',
                      itemIndex === index ? 'w-8 bg-primary' : 'w-1.5 bg-border hover:bg-primary/40',
                    )}
                  >
                    <span className="sr-only">{`Show testimonial ${itemIndex + 1}`}</span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => go(1)}
              className="grid size-11 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ChevronRight className="size-4" aria-hidden />
              <span className="sr-only">Next testimonial</span>
            </button>
          </div>

          {note ? (
            <p className="mt-8 text-center text-caption text-muted-foreground text-pretty">{note}</p>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
