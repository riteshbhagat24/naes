'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CornerDownLeft, Search, X } from 'lucide-react'
import { quickLinks } from '@/config/navigation'
import { searchSite, type SearchEntry } from '@/lib/search-index'
import { useLockBody } from '@/hooks/use-lock-body'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Command-palette style search.
 *
 * The index is static and bundled, so results are instant and offline-capable.
 * Arrow keys move the selection, Enter navigates, Escape closes, and the
 * listbox/option roles keep it announced correctly by screen readers.
 */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  useLockBody(open)

  const results: SearchEntry[] = React.useMemo(() => searchSite(query), [query])

  React.useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [open])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }
    if (!results.length) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => (index + 1) % results.length)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => (index - 1 + results.length) % results.length)
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      const target = results[active]
      if (target) {
        onClose()
        router.push(target.href)
      }
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[110] flex items-start justify-center bg-sand-950/55 px-4 pt-[12vh] backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the website"
            initial={{ opacity: 0, y: -14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.28, ease: EASE.out }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-popover shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-5">
              <Search className="size-[1.15rem] shrink-0 text-muted-foreground" aria-hidden />
              <input
                ref={inputRef}
                type="search"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
                aria-autocomplete="list"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActive(0)
                }}
                onKeyDown={onKeyDown}
                placeholder="Search admissions, academics, campus…"
                className="w-full bg-transparent py-5 text-body text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" aria-hidden />
                <span className="sr-only">Close search</span>
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-3">
              {query.trim().length < 2 ? (
                <div className="p-2">
                  <p className="eyebrow mb-3 px-2 text-muted-foreground">Popular</p>
                  <ul className="grid gap-1 sm:grid-cols-2">
                    {quickLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-body-sm transition-colors hover:bg-muted"
                        >
                          {link.title}
                          <ArrowRight className="size-3.5 text-muted-foreground" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : results.length ? (
                <ul id="search-results" role="listbox" aria-label="Search results" className="space-y-0.5">
                  {results.map((result, index) => (
                    <li key={result.href} role="option" aria-selected={index === active}>
                      <Link
                        href={result.href}
                        onClick={onClose}
                        onMouseEnter={() => setActive(index)}
                        className={cn(
                          'flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition-colors',
                          index === active ? 'bg-primary/10' : 'hover:bg-muted',
                        )}
                      >
                        <span className="min-w-0">
                          <span
                            className={cn(
                              'block truncate font-display text-body-sm font-semibold',
                              index === active ? 'text-primary' : 'text-foreground',
                            )}
                          >
                            {result.title}
                          </span>
                          <span className="block truncate text-caption text-muted-foreground">
                            {result.section} · {result.href}
                          </span>
                        </span>
                        {index === active ? (
                          <CornerDownLeft className="size-4 shrink-0 text-primary" aria-hidden />
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-10 text-center">
                  <p className="text-body-sm text-muted-foreground">
                    Nothing matched “{query}”. Try “admission”, “fees”, “sports” or “contact”.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/60 px-5 py-3 text-caption text-muted-foreground">
              <span className="hidden sm:inline">
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-sans">↑</kbd>{' '}
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-sans">↓</kbd>{' '}
                to navigate ·{' '}
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-sans">
                  Enter
                </kbd>{' '}
                to open
              </span>
              <Link href="/sitemap" onClick={onClose} className="link-underline hover:text-primary">
                Browse the full sitemap
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
