import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-sans font-semibold uppercase tracking-[0.12em]',
  {
    variants: {
      variant: {
        primary: 'bg-primary/10 text-primary',
        accent: 'bg-accent/15 text-gold-700 dark:text-gold-300',
        neutral: 'bg-muted text-muted-foreground',
        outline: 'border border-border text-muted-foreground',
        ink: 'bg-sand-900 text-sand-50',
        light: 'bg-white/15 text-white backdrop-blur',
        success: 'bg-success/12 text-success',
        warning: 'bg-warning/15 text-warning',
        danger: 'bg-danger/12 text-danger',
      },
      size: {
        sm: 'px-2.5 py-1 text-[0.625rem]',
        md: 'px-3 py-1.5 text-label',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<'span'>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}
