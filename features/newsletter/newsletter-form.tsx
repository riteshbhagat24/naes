'use client'

import * as React from 'react'
import { useActionState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { subscribeToNewsletter } from '@/features/forms/actions'
import { AntiSpamFields } from '@/components/ui/form-field'
import { SubmitButton } from '@/features/forms/submit-button'
import { cn } from '@/lib/utils'
import type { FormResult } from '@/types'

/** Compact newsletter signup used in the footer. */
export function NewsletterForm({ className }: { className?: string }) {
  const [state, action] = useActionState<FormResult | null, FormData>(subscribeToNewsletter, null)
  const succeeded = state?.status === 'success'

  return (
    <form action={action} className={cn('relative', className)} noValidate>
      <AntiSpamFields />

      {succeeded ? (
        <p className="flex items-center gap-2.5 rounded-xl border border-success/35 bg-success/10 px-4 py-3.5 text-body-sm text-success">
          <Check className="size-4 shrink-0" aria-hidden />
          {state.message}
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="your@email.com"
                aria-invalid={Boolean(state?.fieldErrors?.email)}
                aria-describedby={state?.fieldErrors?.email ? 'newsletter-error' : undefined}
                className={cn(
                  'w-full rounded-xl border bg-white/5 px-4 py-3 text-body-sm text-white',
                  'placeholder:text-sand-500 focus:outline-none focus:ring-2 focus:ring-primary-light/70',
                  state?.fieldErrors?.email ? 'border-danger' : 'border-white/15',
                )}
              />
            </div>
            <SubmitButton size="md" variant="light" pendingLabel="Signing up…">
              Sign up
              <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </SubmitButton>
          </div>

          {state?.status === 'error' ? (
            <p id="newsletter-error" role="alert" className="mt-2.5 text-caption text-danger">
              {state.fieldErrors?.email?.[0] ?? state.message}
            </p>
          ) : null}
        </>
      )}
    </form>
  )
}
