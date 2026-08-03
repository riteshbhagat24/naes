'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'

/**
 * Submit control tied to the enclosing form's pending state.
 * Disabled and labelled while in flight, so a double submit is impossible and
 * the state change is announced.
 */
export function SubmitButton({
  children,
  pendingLabel = 'Sending…',
  ...props
}: ButtonProps & { pendingLabel?: string }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} aria-busy={pending} {...props}>
      {pending ? (
        <>
          <Loader2 className="animate-spin" aria-hidden />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
