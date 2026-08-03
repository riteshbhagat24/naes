'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { useScrollState } from '@/hooks/use-scroll-state'
import { EASE } from '@/lib/motion'

const HIDE_ON = ['/admissions/enquiry', '/contact', '/careers']

/**
 * Sticky admissions bar for small screens.
 *
 * Appears once the visitor is a third of the way down a page, never on the
 * pages that already carry the form, and stays dismissed for the session.
 */
export function StickyAdmissionBar() {
  const pathname = usePathname()
  const { progress } = useScrollState()
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem('naehs.admissionBar') === 'dismissed')
    } catch {
      /* ignore */
    }
  }, [])

  const visible = !dismissed && progress > 0.32 && progress < 0.94 && !HIDE_ON.includes(pathname)

  const dismiss = () => {
    setDismissed(true)
    try {
      window.sessionStorage.setItem('naehs.admissionBar', 'dismissed')
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          exit={{ y: '120%' }}
          transition={{ duration: 0.4, ease: EASE.out }}
          className="fixed inset-x-0 bottom-0 z-[85] border-t border-white/10 bg-brand-800/95 backdrop-blur-lg lg:hidden"
        >
          <div className="layout-container flex items-center gap-3 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-caption font-semibold text-white">
                Admissions {siteConfig.academicSession} are open
              </p>
              <p className="truncate text-[0.6875rem] text-brand-200">
                Nursery to Class XII · reply within two working days
              </p>
            </div>
            <Link
              href="/admissions/enquiry"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-caption font-semibold text-brand-800"
            >
              Enquire
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="grid size-8 shrink-0 place-items-center rounded-full text-brand-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-3.5" aria-hidden />
              <span className="sr-only">Dismiss admissions bar</span>
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
