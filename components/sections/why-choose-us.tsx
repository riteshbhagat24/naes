'use client'

import * as React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Icon } from '@/components/ui/icon'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface WhyChooseContent {
  eyebrow: string
  title: string
  description: string
  items: Array<{ icon: string; title: string; description: string; image: string }>
}

/**
 * Interactive reasons list.
 *
 * On desktop the list drives a single pinned photograph — hovering or focusing
 * a row cross-fades the image, which keeps six reasons in one screen instead of
 * six cards competing for attention. Below `lg` it collapses to a plain,
 * fully readable card grid with no hover dependency.
 */
export function WhyChooseUs({ content }: { content: WhyChooseContent }) {
  const [active, setActive] = React.useState(0)
  const current = content.items[active]

  return (
    <Section tone="default" size="lg">
      <Container>
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          className="mb-14"
        />

        {/* ------------------------------------------------ desktop */}
        <div className="hidden gap-16 lg:grid lg:grid-cols-[1fr_minmax(0,26rem)]">
          <ul className="border-t border-border">
            {content.items.map((item, index) => (
              <li key={item.title}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-current={index === active}
                  className={cn(
                    'group flex w-full items-start gap-6 border-b border-border py-7 text-left transition-colors duration-500',
                    index === active ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-500',
                      index === active
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground',
                    )}
                  >
                    <Icon name={item.icon} className="size-[1.15rem]" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-caption font-bold tabular-nums text-primary/70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-h4 font-semibold text-balance">
                        {item.title}
                      </span>
                    </span>
                    <motion.span
                      initial={false}
                      animate={{
                        height: index === active ? 'auto' : 0,
                        opacity: index === active ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: EASE.out }}
                      className="block overflow-hidden"
                    >
                      <span className="block max-w-prose pt-3 text-body text-muted-foreground text-pretty">
                        {item.description}
                      </span>
                    </motion.span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="sticky top-[calc(var(--nav-height)+3rem)] self-start">
            <div className="photo-grade relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.image}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE.out }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt=""
                    fill
                    sizes="26rem"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-caption text-muted-foreground">{current.title}</p>
          </div>
        </div>

        {/* ------------------------------------------------ mobile & tablet */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:hidden">
          {content.items.map((item) => (
            <li
              key={item.title}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="photo-grade relative aspect-[16/10] w-full">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="grid size-10 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <Icon name={item.icon} className="size-[1.05rem]" />
                </span>
                <h3 className="mt-4 font-display text-h5 font-semibold text-balance">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-body-sm text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
