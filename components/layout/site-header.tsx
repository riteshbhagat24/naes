'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Search } from 'lucide-react'
import { mainNavigation } from '@/config/navigation'
import { isImmersiveRoute } from '@/config/routes'
import { useScrollState } from '@/hooks/use-scroll-state'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/layout/logo'
import { MegaMenuPanel } from '@/components/layout/mega-menu'
import { MobileDrawer } from '@/components/layout/mobile-drawer'
import { SearchOverlay } from '@/components/layout/search-overlay'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { AnnouncementBar, type Announcement } from '@/components/layout/announcement-bar'

/**
 * Sticky site header.
 *
 * Transparent over the photographic mastheads while the page is at rest,
 * frosted glass the moment it scrolls, and hidden on downward scroll deep in a
 * page so long reads keep their full viewport.
 */
export function SiteHeader({ announcement }: { announcement: Announcement }) {
  const pathname = usePathname()
  const { scrolled, direction, progress } = useScrollState(16)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const immersive = isImmersiveRoute(pathname)
  const transparent = immersive && !scrolled && !openMenu
  const hidden = scrolled && direction === 'down' && progress > 0.08 && !openMenu

  /* Close everything on navigation. */
  React.useEffect(() => {
    setOpenMenu(null)
    setDrawerOpen(false)
    setSearchOpen(false)
  }, [pathname])

  /* Global shortcut: ⌘K / Ctrl-K opens search, Escape closes the mega menu. */
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <div className="sticky top-0 z-[80] w-full">
        <AnnouncementBar announcement={announcement} />

        <motion.header
          animate={{ y: hidden ? '-120%' : '0%' }}
          transition={{ duration: 0.4, ease: EASE.inOut }}
          onMouseLeave={scheduleClose}
          className={cn(
            'relative w-full border-b transition-[background-color,border-color,box-shadow] duration-500',
            transparent
              ? 'border-white/10 bg-transparent'
              : 'glass border-border shadow-[0_1px_0_0_hsl(var(--border))]',
          )}
        >
          <div className="layout-container flex h-[var(--nav-height)] items-center justify-between gap-6">
            <Logo invert={transparent} />

            {/* ---------------- desktop navigation ---------------- */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {mainNavigation.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(`${item.href}/`))
                  const hasPanel = Boolean(item.groups?.length)
                  const panelId = `megamenu-${item.title.toLowerCase().replace(/\s+/g, '-')}`

                  return (
                    <li
                      key={item.title}
                      onMouseEnter={() => {
                        cancelClose()
                        setOpenMenu(hasPanel ? item.title : null)
                      }}
                    >
                      {hasPanel ? (
                        <button
                          type="button"
                          aria-expanded={openMenu === item.title}
                          aria-controls={panelId}
                          onClick={() =>
                            setOpenMenu((current) => (current === item.title ? null : item.title))
                          }
                          onFocus={() => setOpenMenu(item.title)}
                          className={cn(
                            'flex items-center gap-1 rounded-lg px-3.5 py-2 text-body-sm font-medium transition-colors duration-300',
                            transparent
                              ? 'text-white/85 hover:text-white'
                              : 'text-foreground/75 hover:text-primary',
                            active && (transparent ? 'text-white' : 'text-primary'),
                          )}
                        >
                          {item.title}
                          <ChevronDown
                            aria-hidden
                            className={cn(
                              'size-3.5 transition-transform duration-300',
                              openMenu === item.title && 'rotate-180',
                            )}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center rounded-lg px-3.5 py-2 text-body-sm font-medium transition-colors duration-300',
                            transparent
                              ? 'text-white/85 hover:text-white'
                              : 'text-foreground/75 hover:text-primary',
                            active && (transparent ? 'text-white' : 'text-primary'),
                          )}
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* ---------------- actions ---------------- */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={cn(
                  'grid size-10 place-items-center rounded-full transition-colors duration-300',
                  transparent
                    ? 'text-white/85 hover:bg-white/12 hover:text-white'
                    : 'text-foreground/70 hover:bg-muted hover:text-primary',
                )}
              >
                <Search className="size-[1.15rem]" aria-hidden />
                <span className="sr-only">Search the website</span>
              </button>

              <ThemeToggle transparent={transparent} />

              <Button
                asChild
                size="sm"
                variant={transparent ? 'glass' : 'primary'}
                className="ml-1 hidden sm:inline-flex"
              >
                <Link href="/admissions/enquiry">Enquire</Link>
              </Button>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-expanded={drawerOpen}
                className={cn(
                  'ml-0.5 grid size-10 place-items-center rounded-full transition-colors duration-300 lg:hidden',
                  transparent
                    ? 'text-white hover:bg-white/12'
                    : 'text-foreground hover:bg-muted',
                )}
              >
                <Menu className="size-[1.3rem]" aria-hidden />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>

          {/* ---------------- mega menu panels ---------------- */}
          <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
            {mainNavigation
              .filter((item) => item.groups?.length)
              .map((item) => (
                <MegaMenuPanel
                  key={item.title}
                  item={item}
                  open={openMenu === item.title}
                  id={`megamenu-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  onNavigate={() => setOpenMenu(null)}
                />
              ))}
          </div>
        </motion.header>

        {/* Reading progress — a single hairline under the header. */}
        <AnimatePresence>
          {scrolled ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left"
            >
              <div
                className="h-full bg-primary transition-[width] duration-150 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
