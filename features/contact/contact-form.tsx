'use client'

import * as React from 'react'
import { useActionState } from 'react'
import { Send } from 'lucide-react'
import { submitContactMessage } from '@/features/forms/actions'
import { FormStatus } from '@/features/forms/form-status'
import { SubmitButton } from '@/features/forms/submit-button'
import { TurnstileWidget } from '@/features/forms/turnstile'
import { AntiSpamFields, Field, Input, Textarea } from '@/components/ui/form-field'
import type { FormResult } from '@/types'

const SUBJECTS = [
  'General enquiry',
  'Admissions',
  'Fees and payments',
  'Transport',
  'Academic matter',
  'Feedback',
]

export function ContactForm() {
  const [state, action] = useActionState<FormResult | null, FormData>(submitContactMessage, null)
  const errors = state?.fieldErrors ?? {}
  const formRef = React.useRef<HTMLFormElement>(null)

  React.useEffect(() => {
    if (state?.status === 'success') formRef.current?.reset()
  }, [state])

  return (
    <form ref={formRef} action={action} noValidate className="relative space-y-6">
      <AntiSpamFields />
      <FormStatus state={state} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required error={errors.name}>
          {(props) => <Input type="text" autoComplete="name" {...props} />}
        </Field>

        <Field label="Email address" name="email" required error={errors.email}>
          {(props) => <Input type="email" autoComplete="email" placeholder="you@example.com" {...props} />}
        </Field>

        <Field label="Phone number" name="phone" error={errors.phone}>
          {(props) => <Input type="tel" autoComplete="tel" {...props} />}
        </Field>

        <Field label="Subject" name="subject" required error={errors.subject}>
          {(props) => (
            <Input type="text" list="contact-subjects" placeholder="What is this about?" {...props} />
          )}
        </Field>
      </div>

      <datalist id="contact-subjects">
        {SUBJECTS.map((subject) => (
          <option key={subject} value={subject} />
        ))}
      </datalist>

      <Field
        label="Your message"
        name="message"
        required
        hint="Feel free to ask a question, or simply leave a comment."
        error={errors.message}
      >
        {(props) => <Textarea rows={6} {...props} />}
      </Field>

      <TurnstileWidget />

      <SubmitButton size="lg" pendingLabel="Sending your message…">
        Send message
        <Send aria-hidden />
      </SubmitButton>
    </form>
  )
}
