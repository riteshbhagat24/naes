'use client'

import * as React from 'react'
import { useInView } from 'framer-motion'
import { useCountUp } from '@/hooks/use-count-up'
import { cn } from '@/lib/utils'

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

/**
 * Animated statistic. The literal value is always present for assistive
 * technology; the animated digits are hidden from the accessibility tree.
 */
export function Counter({ value, prefix = '', suffix = '', duration = 1800, className }: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const current = useCountUp(value, { duration, start: inView })

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden>
        {prefix}
        {Math.round(current).toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  )
}
