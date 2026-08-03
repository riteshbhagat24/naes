import * as React from 'react'
import { cn } from '@/lib/utils'
import { Reveal, TextReveal } from '@/components/ui/reveal'

/* --------------------------------------------------------------------------
   Section primitives.
   Every band on the site is composed from these three pieces, which is what
   keeps the vertical rhythm identical from the homepage to a legal page.
   -------------------------------------------------------------------------- */

type Tone = 'default' | 'muted' | 'ink' | 'brand' | 'surface'

const TONE: Record<Tone, string> = {
  default: 'bg-background text-foreground',
  surface: 'bg-surface text-foreground',
  muted: 'bg-muted text-foreground',
  ink: 'bg-sand-950 text-sand-50 dark:bg-sand-900',
  brand: 'bg-brand-sheen text-brand-50',
}

interface SectionProps extends React.ComponentPropsWithoutRef<'section'> {
  tone?: Tone
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** Adds the film-grain overlay used on the dark editorial bands. */
  grain?: boolean
}

export function Section({
  tone = 'default',
  size = 'md',
  grain = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative isolate w-full',
        TONE[tone],
        size === 'sm' && 'py-section-sm',
        size === 'md' && 'py-section',
        size === 'lg' && 'py-section-lg',
        grain && 'grain overflow-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function Container({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('layout-container', className)} {...props}>
      {children}
    </div>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  /** Heading level for correct document outline. */
  as?: 'h1' | 'h2' | 'h3'
  /** Optional slot rendered on the right at large sizes. */
  action?: React.ReactNode
  invert?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  titleClassName,
  as = 'h2',
  action,
  invert = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between',
        align === 'center' && 'lg:flex-col lg:items-center',
        className,
      )}
    >
      <div className={cn('max-w-3xl', align === 'center' && 'text-center')}>
        {eyebrow ? (
          <Reveal>
            <p
              className={cn(
                'eyebrow mb-4 flex items-center gap-3',
                align === 'center' && 'justify-center',
                invert && 'text-gold-400',
              )}
            >
              <span
                className={cn(
                  'inline-block h-px w-8 bg-current opacity-50',
                  align === 'center' && 'hidden sm:inline-block',
                )}
                aria-hidden
              />
              {eyebrow}
            </p>
          </Reveal>
        ) : null}

        <TextReveal
          as={as}
          text={title}
          className={cn('text-h2', invert ? 'text-white' : 'text-foreground', titleClassName)}
        />

        {description ? (
          <Reveal delay={0.08}>
            <p
              className={cn(
                'mt-5 max-w-2xl text-body-lg text-pretty',
                invert ? 'text-sand-200' : 'text-muted-foreground',
                align === 'center' && 'mx-auto',
              )}
            >
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? (
        <Reveal delay={0.14} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  )
}
