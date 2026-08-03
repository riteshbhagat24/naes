'use client'

import * as React from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { TimelineEntry } from '@/types'
import { Reveal } from '@/components/ui/reveal'

/**
 * Scroll-driven vertical timeline. The connecting rule draws itself as the
 * section passes through the viewport; each entry reveals independently, so a
 * reader who jumps to the middle never sees an empty column.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const container = React.useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 28,
    mass: 0.5,
  })

  return (
    <ol ref={container} className="relative ml-1 space-y-14 sm:ml-0">
      <div
        aria-hidden
        className="absolute bottom-2 left-[7px] top-2 w-px bg-border sm:left-[calc(11rem+7px)]"
      />
      <motion.div
        aria-hidden
        style={{ scaleY }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-primary sm:left-[calc(11rem+7px)]"
      />

      {entries.map((entry, index) => (
        <li key={`${entry.period}-${index}`} className="relative">
          <Reveal delay={index * 0.04}>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-10">
              <p className="order-2 shrink-0 pl-8 text-caption font-semibold uppercase tracking-[0.14em] text-primary sm:order-1 sm:w-44 sm:pl-0 sm:pt-1 sm:text-right">
                {entry.period}
              </p>

              <span
                aria-hidden
                className="absolute left-0 top-1.5 grid size-[15px] place-items-center rounded-full border-2 border-primary bg-background sm:left-[11rem]"
              >
                <span className="size-[5px] rounded-full bg-primary" />
              </span>

              <div className="order-1 pl-8 sm:order-2 sm:pl-8">
                <h3 className="text-h5 font-display font-semibold text-balance">{entry.title}</h3>
                <p className="mt-3 max-w-prose text-body text-muted-foreground text-pretty">
                  {entry.description}
                </p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
