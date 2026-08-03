'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { TourContent } from '@/lib/data'

/**
 * Interactive campus map.
 *
 * The plan is drawn as an SVG from the same palette as the rest of the site,
 * with a real button at each stop. Selection is keyboard-operable, the detail
 * panel is a live region, and the list beneath the plan carries the same
 * content for anyone who cannot use the map.
 */
export function CampusMap({ tour }: { tour: TourContent }) {
  const [activeId, setActiveId] = React.useState(tour.stops[0].id)
  const active = tour.stops.find((stop) => stop.id === activeId) ?? tour.stops[0]

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      {/* ------------------------------------------------ plan */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-muted">
          <svg
            viewBox="0 0 100 68"
            className="block h-auto w-full"
            role="img"
            aria-label="Schematic plan of the school campus"
          >
            <defs>
              <pattern id="campus-grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path
                  d="M4 0H0V4"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.16"
                />
              </pattern>
            </defs>

            <rect width="100" height="68" fill="url(#campus-grid)" />

            {/* Grounds */}
            <rect
              x="34"
              y="14"
              width="36"
              height="26"
              rx="2"
              fill="hsl(var(--primary) / 0.06)"
              stroke="hsl(var(--primary) / 0.28)"
              strokeWidth="0.3"
            />
            {/* Academic block */}
            <rect
              x="52"
              y="42"
              width="38"
              height="20"
              rx="2"
              fill="hsl(var(--primary) / 0.06)"
              stroke="hsl(var(--primary) / 0.28)"
              strokeWidth="0.3"
            />
            {/* Junior wing */}
            <rect
              x="10"
              y="10"
              width="20"
              height="30"
              rx="2"
              fill="hsl(var(--primary) / 0.06)"
              stroke="hsl(var(--primary) / 0.28)"
              strokeWidth="0.3"
            />
            {/* Approach road */}
            <path
              d="M4 66 H96"
              stroke="hsl(var(--border))"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <text
              x="50"
              y="67.2"
              textAnchor="middle"
              fontSize="1.7"
              fill="hsl(var(--muted-foreground))"
              className="font-sans"
            >
              Kukde Layout · Rameshwari Road
            </text>
          </svg>

          {/* Stops are HTML buttons layered over the plan for real focus rings. */}
          <ul className="absolute inset-0">
            {tour.stops.map((stop) => (
              <li
                key={stop.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(stop.id)}
                  aria-pressed={stop.id === activeId}
                  className="group relative grid place-items-center"
                >
                  <span
                    className={cn(
                      'grid size-6 place-items-center rounded-full border-2 transition-all duration-300',
                      stop.id === activeId
                        ? 'scale-125 border-primary bg-primary'
                        : 'border-primary/60 bg-background group-hover:border-primary',
                    )}
                  >
                    <span
                      className={cn(
                        'size-1.5 rounded-full transition-colors',
                        stop.id === activeId ? 'bg-primary-foreground' : 'bg-primary',
                      )}
                    />
                  </span>
                  {stop.id === activeId ? (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/30"
                    />
                  ) : null}
                  <span className="sr-only">{stop.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-caption text-muted-foreground">
          A schematic plan, not to scale. Select a marker to see what happens there.
        </p>
      </div>

      {/* ------------------------------------------------ detail */}
      <div className="lg:col-span-5">
        <div aria-live="polite" className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE.out }}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="photo-grade relative aspect-[16/10] w-full">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <h3 className="font-display text-h4 font-semibold text-balance">{active.name}</h3>
                <p className="mt-3 text-body text-foreground/80 text-pretty">{active.summary}</p>
                <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                  {active.detail}
                </p>
                <Link
                  href={active.href}
                  className="group mt-6 inline-flex items-center gap-2 font-display text-body font-semibold text-primary"
                >
                  <span className="link-underline">Read more</span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.article>
          </AnimatePresence>

          <ul className="mt-6 flex flex-wrap gap-2">
            {tour.stops.map((stop) => (
              <li key={stop.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(stop.id)}
                  aria-pressed={stop.id === activeId}
                  className={cn(
                    'rounded-full border px-3.5 py-2 text-caption font-medium transition-colors duration-300',
                    stop.id === activeId
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  {stop.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
