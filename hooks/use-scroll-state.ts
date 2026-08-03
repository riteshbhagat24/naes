'use client'

import { useEffect, useRef, useState } from 'react'

export interface ScrollState {
  /** Page has moved past the threshold — used to frost the navigation. */
  scrolled: boolean
  /** Last movement direction; drives the auto-hiding header. */
  direction: 'up' | 'down'
  /** 0 → 1 progress through the document. */
  progress: number
  /** True while the viewport sits at the very top. */
  atTop: boolean
}

/**
 * A single rAF-throttled scroll listener shared by the header, the reading
 * progress bar and the back-to-top control, so the page never registers more
 * than one passive scroll handler.
 */
export function useScrollState(threshold = 24): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrolled: false,
    direction: 'up',
    progress: 0,
    atTop: true,
  })
  const lastY = useRef(0)
  const directionRef = useRef<'up' | 'down'>('up')
  const ticking = useRef(false)

  useEffect(() => {
    const read = () => {
      ticking.current = false

      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0

      if (y > lastY.current + 4) directionRef.current = 'down'
      else if (y < lastY.current - 4) directionRef.current = 'up'
      lastY.current = y

      const next: ScrollState = {
        scrolled: y > threshold,
        direction: directionRef.current,
        progress,
        atTop: y <= 2,
      }

      setState((previous) =>
        previous.scrolled === next.scrolled &&
        previous.direction === next.direction &&
        previous.atTop === next.atTop &&
        Math.abs(previous.progress - next.progress) < 0.002
          ? previous
          : next,
      )
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [threshold])

  return state
}
