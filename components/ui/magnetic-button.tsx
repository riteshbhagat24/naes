'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { useMagnetic } from '@/hooks/use-magnetic'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends Omit<ButtonProps, 'asChild'> {
  href?: string
  /** Adds the diagonal arrow that lifts on hover. */
  arrow?: boolean
  external?: boolean
}

/**
 * The site's primary call to action: a button that leans towards the pointer
 * within a short radius and returns on a spring. On touch devices and under
 * `prefers-reduced-motion` it renders as an ordinary button with no listeners.
 */
export function MagneticButton({
  href,
  arrow = false,
  external = false,
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const { ref, x, y, onPointerMove, onPointerLeave, enabled } = useMagnetic()

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow ? (
        <ArrowUpRight
          aria-hidden
          className="relative z-10 transition-transform duration-300 ease-premium group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
        />
      ) : null}
    </>
  )

  const inner = href ? (
    <Button asChild className={cn('overflow-hidden', className)} {...props}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={href}>{content}</Link>
      )}
    </Button>
  ) : (
    <Button className={cn('overflow-hidden', className)} {...props}>
      {content}
    </Button>
  )

  if (!enabled) return inner

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="inline-flex"
    >
      {inner}
    </motion.span>
  )
}
