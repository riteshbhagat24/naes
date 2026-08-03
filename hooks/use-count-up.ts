'use client'

import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/use-media-query'

interface Options {
  /** Milliseconds for the full run. */
  duration?: number
  /** Only start once the element has entered the viewport. */
  start?: boolean
  decimals?: number
}

/**
 * Eased numeric counter driven by requestAnimationFrame.
 * Honours `prefers-reduced-motion` by snapping straight to the final value.
 */
export function useCountUp(target: number, { duration = 1800, start = true, decimals = 0 }: Options = {}) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    if (reduced) {
      setValue(target)
      return
    }

    const began = performance.now()
    const tick = (now: number) => {
      const elapsed = now - began
      const t = Math.min(1, elapsed / duration)
      // easeOutExpo — fast out of the gate, long graceful settle.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setValue(Number((target * eased).toFixed(decimals)))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [target, duration, start, decimals, reduced])

  return value
}
