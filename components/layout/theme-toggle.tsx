'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Light / dark switch. Renders a stable placeholder until mounted so the
 * server and client markup match and nothing shifts on hydration.
 */
export function ThemeToggle({ transparent = false }: { transparent?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const dark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={mounted ? `Switch to ${dark ? 'light' : 'dark'} theme` : 'Switch theme'}
      className={cn(
        'grid size-10 place-items-center rounded-full transition-colors duration-300',
        transparent
          ? 'text-white/85 hover:bg-white/12 hover:text-white'
          : 'text-foreground/70 hover:bg-muted hover:text-primary',
      )}
    >
      {mounted && dark ? (
        <Sun className="size-[1.15rem]" aria-hidden />
      ) : (
        <Moon className="size-[1.15rem]" aria-hidden />
      )}
    </button>
  )
}
