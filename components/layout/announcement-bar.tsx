'use client'

import * as React from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { EASE } from '@/lib/motion'

export interface Announcement {
  enabled: boolean
  label: string
  message: string
  linkText: string
  linkHref: string
}

const DISMISS_KEY = 'naehs.announcement.dismissed'

/**
 * Top announcement strip. Dismissal is remembered per message, so editing the
 * text in the CMS brings the bar back for everybody.
 */
export function AnnouncementBar({ announcement }: { announcement: Announcement }) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (!announcement.enabled) return
    try {
      setVisible(window.localStorage.getItem(DISMISS_KEY) !== announcement.message)
    } catch {
      setVisible(true)
    }
  }, [announcement.enabled, announcement.message])

  const dismiss = () => {
    setVisible(false)
    try {
      window.localStorage.setItem(DISMISS_KEY, announcement.message)
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE.inOut }}
          className="relative z-[70] overflow-hidden bg-brand-800 text-brand-50"
        >
          <div className="layout-container flex min-h-10 items-center justify-center gap-3 py-2 text-center">
            <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-caption">
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em]">
                {announcement.label}
              </span>
              <span className="text-brand-100">{announcement.message}</span>
              <Link
                href={announcement.linkHref}
                className="group inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
              >
                {announcement.linkText}
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-4 grid size-7 place-items-center rounded-full text-brand-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="size-3.5" aria-hidden />
              <span className="sr-only">Dismiss announcement</span>
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
