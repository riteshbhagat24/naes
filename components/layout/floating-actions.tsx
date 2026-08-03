'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, MessageCircle, Phone, Plus, Sparkles } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { useScrollState } from '@/hooks/use-scroll-state'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Floating quick actions and back-to-top control.
 *
 * A single collapsed control expands into call / WhatsApp / enquiry. Hidden
 * until the visitor has scrolled, so it never competes with the hero.
 */
export function FloatingActions() {
  const pathname = usePathname()
  const { scrolled, progress } = useScrollState(280)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => setOpen(false), [pathname])

  const actions = [
    {
      label: 'Call the school office',
      short: 'Call',
      href: siteConfig.contact.phoneHref,
      icon: Phone,
      external: true,
    },
    {
      label: 'Message us on WhatsApp',
      short: 'WhatsApp',
      href: siteConfig.contact.whatsapp,
      icon: MessageCircle,
      external: true,
    },
    {
      label: 'Begin an admission enquiry',
      short: 'Enquire',
      href: '/admissions/enquiry',
      icon: Sparkles,
      external: false,
    },
  ]

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {scrolled ? (
          <motion.button
            key="top"
            type="button"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.28, ease: EASE.out }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pointer-events-auto relative grid size-11 place-items-center rounded-full border border-border bg-surface/90 text-foreground shadow-md backdrop-blur transition-colors hover:border-primary/40 hover:text-primary"
          >
            {/* Progress ring drawn from the same scroll state as the header. */}
            <svg
              aria-hidden
              viewBox="0 0 44 44"
              className="pointer-events-none absolute inset-0 size-full -rotate-90"
            >
              <circle
                cx="22"
                cy="22"
                r="20.5"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 20.5}
                strokeDashoffset={2 * Math.PI * 20.5 * (1 - progress)}
                className="transition-[stroke-dashoffset] duration-200 ease-linear"
              />
            </svg>
            <ArrowUp className="size-4" aria-hidden />
            <span className="sr-only">Back to top</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-auto flex flex-col items-end gap-2.5">
        <AnimatePresence>
          {open
            ? actions.map((action, index) => {
                const Body = (
                  <>
                    <span className="text-caption font-semibold">{action.short}</span>
                    <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                      <action.icon className="size-4" aria-hidden />
                    </span>
                  </>
                )
                const className =
                  'flex items-center gap-3 rounded-full border border-border bg-surface/95 py-1.5 pl-4 pr-1.5 shadow-md backdrop-blur transition-colors hover:border-primary/40'

                return (
                  <motion.div
                    key={action.short}
                    initial={{ opacity: 0, y: 12, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.94 }}
                    transition={{ duration: 0.24, ease: EASE.out, delay: index * 0.04 }}
                  >
                    {action.external ? (
                      <a href={action.href} className={className} aria-label={action.label}>
                        {Body}
                      </a>
                    ) : (
                      <Link href={action.href} className={className} aria-label={action.label}>
                        {Body}
                      </Link>
                    )}
                  </motion.div>
                )
              })
            : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className={cn(
            'grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-[transform,background-color] duration-300 ease-premium hover:bg-primary-dark',
            open && 'rotate-45',
          )}
        >
          <Plus className="size-5" aria-hidden />
          <span className="sr-only">{open ? 'Close quick actions' : 'Open quick actions'}</span>
        </button>
      </div>
    </div>
  )
}
