'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Mail, Phone, X } from 'lucide-react'
import { mainNavigation, quickLinks } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { useLockBody } from '@/hooks/use-lock-body'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Logo } from '@/components/layout/logo'

/**
 * Full-height mobile navigation drawer.
 *
 * Focus is trapped while open, the background is inert to scrolling, Escape
 * closes, and each top-level section is a disclosure with a real
 * `aria-expanded` button rather than a styled div.
 */
export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const [expanded, setExpanded] = React.useState<string | null>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const restore = React.useRef<HTMLElement | null>(null)

  useLockBody(open)

  React.useEffect(() => {
    if (!open) return
    restore.current = document.activeElement as HTMLElement
    const frame = requestAnimationFrame(() => panelRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      restore.current?.focus?.()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[95] bg-sand-950/50 backdrop-blur-sm lg:hidden"
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: EASE.inOut }}
            className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-md flex-col bg-background shadow-xl focus:outline-none lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Logo compact />
              <button
                type="button"
                onClick={onClose}
                className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
              >
                <X className="size-5" aria-hidden />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
              <ul className="space-y-1">
                {mainNavigation.map((item) => {
                  const hasGroups = Boolean(item.groups?.length)
                  const isOpen = expanded === item.title
                  const active = pathname.startsWith(item.href) && item.href !== '/'

                  return (
                    <li key={item.title} className="border-b border-border/70 last:border-b-0">
                      {hasGroups ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setExpanded(isOpen ? null : item.title)}
                            className={cn(
                              'flex w-full items-center justify-between gap-4 py-4 text-left font-display text-h5 font-semibold transition-colors',
                              active ? 'text-primary' : 'text-foreground',
                            )}
                          >
                            {item.title}
                            <ChevronDown
                              aria-hidden
                              className={cn(
                                'size-5 shrink-0 text-muted-foreground transition-transform duration-300',
                                isOpen && 'rotate-180 text-primary',
                              )}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: EASE.inOut }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-5 pb-5">
                                  {item.groups?.map((group) => (
                                    <div key={group.title}>
                                      <p className="eyebrow mb-2 text-muted-foreground">
                                        {group.title}
                                      </p>
                                      <ul className="space-y-0.5">
                                        {group.items.map((link) => (
                                          <li key={link.href}>
                                            <Link
                                              href={link.href}
                                              onClick={onClose}
                                              className={cn(
                                                'block rounded-lg px-3 py-2.5 text-body-sm transition-colors',
                                                pathname === link.href
                                                  ? 'bg-primary/10 font-semibold text-primary'
                                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                              )}
                                            >
                                              {link.title}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            'block py-4 font-display text-h5 font-semibold transition-colors',
                            pathname === item.href ? 'text-primary' : 'text-foreground',
                          )}
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8">
                <p className="eyebrow mb-3 text-muted-foreground">Quick links</p>
                <ul className="grid grid-cols-2 gap-2">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center gap-2.5 rounded-xl border border-border px-3.5 py-3 text-caption font-medium transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        <Icon name={link.icon} className="size-4 shrink-0 text-primary" />
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="border-t border-border px-5 py-5">
              <Button asChild full size="md">
                <Link href="/admissions/enquiry" onClick={onClose}>
                  Begin an admission enquiry
                </Link>
              </Button>
              <div className="mt-4 flex flex-col gap-2 text-caption text-muted-foreground">
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center gap-2 hover:text-primary"
                >
                  <Phone className="size-3.5" aria-hidden />
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={siteConfig.contact.emailHref}
                  className="inline-flex items-center gap-2 hover:text-primary"
                >
                  <Mail className="size-3.5" aria-hidden />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
