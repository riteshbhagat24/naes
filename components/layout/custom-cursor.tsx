'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useHasPointer, usePrefersReducedMotion } from '@/hooks/use-media-query'

/**
 * Decorative cursor for fine-pointer devices.
 *
 * Off by default; the visitor turns it on from the accessibility panel, which
 * also sets `html[data-cursor="custom"]` so the native cursor is hidden. It is
 * never rendered on touch devices or under reduced-motion.
 */
export function CustomCursor({ enabled }: { enabled: boolean }) {
  const hasPointer = useHasPointer()
  const reduced = usePrefersReducedMotion()
  const active = enabled && hasPointer && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 })

  const [hovering, setHovering] = React.useState(false)

  React.useEffect(() => {
    if (!active) return

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      const target = event.target as HTMLElement | null
      setHovering(Boolean(target?.closest('a, button, [role="button"], input, select, textarea')))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [active, x, y])

  if (!active) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      <motion.span
        style={{ x, y }}
        className="absolute -ml-[3px] -mt-[3px] block size-1.5 rounded-full bg-primary"
      />
      <motion.span
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.7 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.25 }}
        className="absolute -ml-5 -mt-5 block size-10 rounded-full border border-primary"
      />
    </div>
  )
}
