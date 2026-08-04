import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'group/button relative inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-sans font-semibold tracking-[-0.01em]',
    'transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-premium',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    '[&_svg]:size-[1.05em] [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary-dark hover:shadow-glow active:translate-y-px',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-sand-900 dark:hover:bg-sand-100 active:translate-y-px',
        outline:
          'border border-border bg-transparent text-foreground hover:border-primary/60 hover:bg-primary/[0.04] hover:text-primary',
        ghost: 'bg-transparent text-foreground hover:bg-muted',
        subtle: 'bg-muted text-foreground hover:bg-sand-200 dark:hover:bg-sand-800',
        light:
          'bg-white/95 text-sand-900 shadow-sm backdrop-blur hover:bg-white active:translate-y-px',
        glass:
          'border border-white/70 bg-white/20 text-white shadow-sm backdrop-blur-md hover:border-white hover:bg-white/30',
        accent: 'bg-accent text-accent-foreground shadow-sm hover:bg-gold-600 active:translate-y-px',
        link: 'h-auto p-0 text-primary underline-offset-4 hover:underline',
        danger: 'bg-danger text-danger-foreground shadow-sm hover:brightness-95',
      },
      size: {
        sm: 'h-10 rounded-lg px-4 text-body-sm',
        md: 'h-12 rounded-xl px-6 text-body-sm',
        lg: 'h-14 rounded-xl px-8 text-body',
        xl: 'h-16 rounded-2xl px-10 text-body-lg',
        icon: 'size-11 rounded-full',
        'icon-sm': 'size-9 rounded-full',
      },
      full: { true: 'w-full', false: '' },
    },
    defaultVariants: { variant: 'primary', size: 'md', full: false },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, full }), className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
