'use client'

import { useCallback, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { useHasPointer, usePrefersReducedMotion } from '@/hooks/use-media-query'

/**
 * Magnetic pointer attraction for buttons and cards.
 * Disabled entirely on touch devices and when reduced motion is requested —
 * the returned handlers become no-ops so no listener work is done at all.
 */
export function useMagnetic(strength = 0.28, radius = 120) {
  // Both media queries must be read unconditionally. Combining them as
  // `useHasPointer() && !usePrefersReducedMotion()` short-circuits: on the first
  // render `useHasPointer()` is false, so the second hook is never called — and
  // once the media listener settles to true on a desktop pointer, React sees a
  // different number of hooks and throws (error #311).
  const hasPointer = useHasPointer()
  const prefersReducedMotion = usePrefersReducedMotion()
  const enabled = hasPointer && !prefersReducedMotion

  const ref = useRef<HTMLSpanElement | null>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.6 })

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (!enabled || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const distance = Math.hypot(dx, dy)
      const falloff = Math.max(0, 1 - distance / (radius + rect.width / 2))
      rawX.set(dx * strength * falloff)
      rawY.set(dy * strength * falloff)
    },
    [enabled, radius, strength, rawX, rawY],
  )

  const onPointerLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { ref, x, y, onPointerMove, onPointerLeave, enabled }
}
