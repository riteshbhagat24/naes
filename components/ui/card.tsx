import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'relative flex flex-col overflow-hidden transition-[box-shadow,border-color,transform] duration-500 ease-premium',
  {
    variants: {
      variant: {
        default: 'rounded-2xl border border-border bg-card text-card-foreground',
        raised: 'rounded-2xl border border-border bg-card text-card-foreground shadow-sm',
        outline: 'rounded-2xl border border-border bg-transparent',
        ghost: 'rounded-2xl bg-transparent',
        ink: 'rounded-2xl border border-white/10 bg-sand-900 text-sand-50',
        editorial: 'rounded-none border-t border-border bg-transparent',
      },
      hoverable: {
        true: 'hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg',
        false: '',
      },
      padded: {
        none: '',
        sm: 'p-5',
        md: 'p-6 sm:p-7',
        lg: 'p-8 sm:p-10',
      },
    },
    defaultVariants: { variant: 'default', hoverable: false, padded: 'none' },
  },
)

export interface CardProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, hoverable, padded, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, hoverable, padded }), className)} {...props} />
}

export function CardHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

export function CardTitle({
  className,
  as: Tag = 'h3',
  ...props
}: React.ComponentPropsWithoutRef<'h3'> & { as?: 'h2' | 'h3' | 'h4' }) {
  return <Tag className={cn('text-h5 font-display font-semibold text-balance', className)} {...props} />
}

export function CardDescription({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p className={cn('text-body-sm text-muted-foreground text-pretty', className)} {...props} />
}

export function CardContent({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('flex-1', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('flex items-center gap-4 pt-2', className)} {...props} />
}
