import type { Transition, Variants } from 'framer-motion'

/**
 * Motion vocabulary.
 *
 * Three curves only, so every animation on the site feels like it came from the
 * same hand. Everything is transform/opacity — no layout-thrashing properties —
 * which is what keeps scroll-linked motion at 60fps.
 */

/**
 * Cubic-bezier control points, typed as mutable 4-tuples.
 *
 * `as const` would make these readonly tuples, which Framer Motion's
 * `BezierDefinition` will not accept — hence the explicit annotation.
 */
type Bezier = [number, number, number, number]

export const EASE: {
  /** Decelerating; the default for anything entering the viewport. */
  out: Bezier
  /** Symmetrical; used by overlays, drawers and page transitions. */
  inOut: Bezier
  /** Soft settle; used by hover and micro-interactions. */
  soft: Bezier
} = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.87, 0, 0.13, 1],
  soft: [0.22, 1, 0.36, 1],
}

export const transition = {
  fast: { duration: 0.32, ease: EASE.soft } satisfies Transition,
  base: { duration: 0.6, ease: EASE.out } satisfies Transition,
  slow: { duration: 0.9, ease: EASE.out } satisfies Transition,
  spring: { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 } satisfies Transition,
}

/** Standard viewport trigger — fires once, slightly before the block lands. */
export const viewport = { once: true, amount: 0.25, margin: '0px 0px -8% 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.base },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition.base },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: transition.base },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: transition.base },
}

/** Parent orchestrator — children inherit `hidden` / `visible`. */
export function stagger(delayChildren = 0, staggerChildren = 0.08): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  }
}

/** Per-word / per-line reveal used by the display headings. */
export const revealChild: Variants = {
  hidden: { opacity: 0, y: '0.62em', rotate: 1.6 },
  visible: {
    opacity: 1,
    y: '0em',
    rotate: 0,
    transition: { duration: 0.78, ease: EASE.out },
  },
}

/** Image reveal: the mask lifts, the photograph settles out of a slight zoom. */
export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.08 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 1.05, ease: EASE.out },
  },
}

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE.out } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.24, ease: EASE.inOut } },
}
