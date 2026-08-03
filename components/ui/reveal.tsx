'use client'

import * as React from 'react'
import { motion, type Variants } from 'framer-motion'
import { fadeUp, stagger, transition, viewport } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
}

/**
 * Props are kept deliberately narrow rather than extending the full DOM element
 * props: framer-motion redefines `onDrag`, `onAnimationStart` and friends, and
 * spreading React's versions of those into a motion component is a type error.
 */
interface RevealProps {
  direction?: Direction
  delay?: number
  distance?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'header' | 'figure'
  className?: string
  id?: string
  children?: React.ReactNode
}

/**
 * Scroll-triggered entrance. Fires once, never re-animates, and uses only
 * transform + opacity so it composites on the GPU.
 */
export function Reveal({
  direction = 'up',
  delay = 0,
  distance,
  as = 'div',
  className,
  children,
  id,
}: RevealProps) {
  const base = OFFSET[direction]
  const offset = distance
    ? Object.fromEntries(Object.entries(base).map(([k, v]) => [k, Math.sign(v) * distance]))
    : base

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0, transition: { ...transition.base, delay } },
  }

  const Component = motion[as] as typeof motion.div

  return (
    <Component
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  )
}

interface StaggerProps {
  delay?: number
  gap?: number
  as?: 'div' | 'ul' | 'ol' | 'section'
  className?: string
  id?: string
  children?: React.ReactNode
}

/** Parent orchestrator: wrap `RevealItem` children to cascade them in. */
export function RevealGroup({
  delay = 0,
  gap = 0.08,
  as = 'div',
  className,
  children,
  id,
}: StaggerProps) {
  const Component = motion[as] as typeof motion.div
  return (
    <Component
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger(delay, gap)}
      className={className}
    >
      {children}
    </Component>
  )
}

export function RevealItem({
  className,
  children,
  as = 'div',
  id,
}: {
  as?: 'div' | 'li' | 'article' | 'figure'
  className?: string
  id?: string
  children?: React.ReactNode
}) {
  const Component = motion[as] as typeof motion.div
  return (
    <Component id={id} variants={fadeUp} className={className}>
      {children}
    </Component>
  )
}

/**
 * Word-by-word heading reveal. Renders the full string in the DOM for screen
 * readers and search engines; only the visual spans are animated.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Tag = 'h2',
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}) {
  const words = text.split(' ')
  return (
    <Tag className={cn('text-balance', className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(delay, 0.045)}
        className="inline"
      >
        {words.map((word, index) => (
          <React.Fragment key={`${word}-${index}`}>
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                variants={{
                  hidden: { y: '0.72em', opacity: 0 },
                  visible: {
                    y: '0em',
                    opacity: 1,
                    transition: { duration: 0.76, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className={cn('inline-block', wordClassName)}
              >
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </motion.span>
    </Tag>
  )
}
