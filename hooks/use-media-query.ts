'use client'

import { useEffect, useState } from 'react'

/**
 * SSR-safe media query subscription.
 * Returns `false` on the server and during the first client render, then
 * settles synchronously in a layout-safe effect.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [query])

  return matches
}

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023.98px)')
export const useIsMobile = () => useMediaQuery('(max-width: 767.98px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const useHasPointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
