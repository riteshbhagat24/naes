'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

/**
 * Page transition.
 *
 * A short, keyed fade-and-lift on route change. Deliberately does not use
 * AnimatePresence exit animations: in the App Router those delay the new
 * route's paint, which would cost more in perceived speed than the animation
 * returns. `prefers-reduced-motion` is handled globally in CSS.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: EASE.out }}
    >
      {children}
    </motion.div>
  )
}
