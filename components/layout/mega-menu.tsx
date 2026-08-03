'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { NavItem } from '@/types'
import { EASE } from '@/lib/motion'

/**
 * Desktop mega-menu panel.
 *
 * Opens on hover and on keyboard focus, closes on Escape, on blur out of the
 * subtree and on route change. The trigger carries `aria-expanded` and
 * `aria-controls`, and the panel is a labelled region, so the whole menu is
 * operable without a pointer.
 */
export function MegaMenuPanel({
  item,
  open,
  id,
  onNavigate,
}: {
  item: NavItem
  open: boolean
  id: string
  onNavigate: () => void
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.26, ease: EASE.out }}
          className="absolute inset-x-0 top-full z-50 pt-3"
        >
          {/* Inset from the container edge so the panel reads as a floating
              sheet rather than a full-width bar. */}
          <div className="layout-container">
            <div className="overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr_22rem]">
                {item.groups?.map((group) => (
                  <div key={group.title} className="border-border p-7 lg:border-r">
                    <p className="eyebrow mb-5 text-muted-foreground">{group.title}</p>
                    <ul className="space-y-1">
                      {group.items.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onNavigate}
                            className="group/link flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-muted focus-visible:bg-muted"
                          >
                            <span className="flex items-center gap-1.5 font-display text-body-sm font-semibold text-foreground">
                              {link.title}
                              <ArrowRight
                                aria-hidden
                                className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 ease-premium group-hover/link:translate-x-0 group-hover/link:opacity-100"
                              />
                            </span>
                            {link.description ? (
                              <span className="text-caption text-muted-foreground">
                                {link.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {item.featured ? (
                  <Link
                    href={item.featured.href}
                    onClick={onNavigate}
                    className="group/feature relative isolate hidden min-h-[19rem] flex-col justify-end overflow-hidden p-7 lg:flex"
                  >
                    <Image
                      src={item.featured.image}
                      alt=""
                      fill
                      sizes="352px"
                      className="-z-10 object-cover transition-transform duration-[900ms] ease-premium group-hover/feature:scale-105"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-gradient-to-t from-sand-950/92 via-sand-950/55 to-sand-950/15"
                    />
                    <p className="eyebrow mb-2 text-gold-400">Featured</p>
                    <p className="font-display text-h5 font-semibold text-white text-balance">
                      {item.featured.title}
                    </p>
                    <p className="mt-2 text-caption text-sand-200 text-pretty">
                      {item.featured.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-caption font-semibold uppercase tracking-[0.12em] text-white">
                      {item.featured.cta ?? 'Read more'}
                      <ArrowRight
                        aria-hidden
                        className="size-3.5 transition-transform duration-300 group-hover/feature:translate-x-1"
                      />
                    </span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
