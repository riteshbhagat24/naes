'use client'

import * as React from 'react'
import Image, { type ImageProps } from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { imageReveal } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

/* --------------------------------------------------------------------------
   Photography treatments.
   The archive spans several years and cameras; these wrappers apply the same
   grade, reveal and parallax vocabulary everywhere so the imagery reads as one
   commissioned set rather than a folder of files.
   -------------------------------------------------------------------------- */

interface RevealImageProps extends Omit<ImageProps, 'className'> {
  className?: string
  wrapperClassName?: string
  /** Applies the unifying warm grade + vignette. */
  graded?: boolean
  rounded?: boolean
}

export function RevealImage({
  className,
  wrapperClassName,
  graded = true,
  rounded = true,
  ...props
}: RevealImageProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={imageReveal}
      className={cn(
        'relative overflow-hidden',
        rounded && 'rounded-2xl',
        graded && 'photo-grade',
        wrapperClassName,
      )}
    >
      <Image {...props} className={cn('size-full object-cover', className)} />
    </motion.div>
  )
}

interface ParallaxImageProps extends RevealImageProps {
  /** Travel distance in percent of the container height. */
  strength?: number
}

/**
 * Vertical parallax bound to the element's own scroll progress.
 * Falls back to a static image when reduced motion is requested.
 */
export function ParallaxImage({
  strength = 12,
  className,
  wrapperClassName,
  graded = true,
  rounded = true,
  ...props
}: ParallaxImageProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        rounded && 'rounded-2xl',
        graded && 'photo-grade',
        wrapperClassName,
      )}
    >
      <motion.div style={reduced ? undefined : { y }} className="relative size-full scale-[1.18]">
        <Image {...props} className={cn('size-full object-cover', className)} />
      </motion.div>
    </div>
  )
}

/** Editorial figure with a hairline caption underneath. */
export function Figure({
  src,
  alt,
  caption,
  priority,
  sizes = '(max-width: 768px) 100vw, 50vw',
  aspect = 'aspect-[4/3]',
  className,
}: {
  src: string
  alt: string
  caption?: string
  priority?: boolean
  sizes?: string
  aspect?: string
  className?: string
}) {
  return (
    <figure className={cn('flex flex-col gap-3', className)}>
      <RevealImage
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        wrapperClassName={cn('w-full', aspect)}
      />
      {caption ? (
        <figcaption className="border-t border-border pt-3 text-caption text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
