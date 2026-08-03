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
  const enabled = useHasPointer() && !usePrefersReducedMotion()
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
