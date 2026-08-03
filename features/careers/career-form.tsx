'use client'

import * as React from 'react'
import { useActionState } from 'react'
import { ArrowRight } from 'lucide-react'
import { submitCareerApplication } from '@/features/forms/actions'
import { FormStatus } from '@/features/forms/form-status'
import { SubmitButton } from '@/features/forms/submit-button'
import { TurnstileWidget } from '@/features/forms/turnstile'
import { AntiSpamFields, Field, Input, Select, Textarea } from '@/components/ui/form-field'
import type { FormResult, JobOpening } from '@/types'

export function CareerForm({ openings }: { openings: JobOpening[] }) {
  const [state, action] = useActionState<FormResult | null, FormData>(submitCareerApplication, null)
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
        <Field label="Your full name" name="name" required error={errors.name}>
          {(props) => <Input type="text" autoComplete="name" {...props} />}
        </Field>

        <Field label="Mobile number" name="phone" required error={errors.phone}>
          {(props) => <Input type="tel" autoComplete="tel" {...props} />}
        </Field>

        <Field label="Email address" name="email" required error={errors.email}>
          {(props) => <Input type="email" autoComplete="email" {...props} />}
        </Field>

        <Field label="Position applied for" name="position" required error={errors.position}>
          {(props) => (
            <Select defaultValue="" {...props}>
              <option value="" disabled>
                Select a position
              </option>
              {openings.map((opening) => (
                <option key={opening.id} value={opening.title}>
                  {opening.title}
                </option>
              ))}
              <option value="General application">General application</option>
            </Select>
          )}
        </Field>

        <Field
          label="Highest qualification"
          name="qualification"
          required
          error={errors.qualification}
        >
          {(props) => <Input type="text" placeholder="e.g. M.Sc. Mathematics, B.Ed." {...props} />}
        </Field>

        <Field label="Years of experience" name="experience" required error={errors.experience}>
          {(props) => <Input type="text" placeholder="e.g. 4 years" {...props} />}
        </Field>

        <Field
          label="Link to your CV or profile"
          name="portfolioUrl"
          hint="A Google Drive, Dropbox or LinkedIn link works. Include https://"
          error={errors.portfolioUrl}
          className="sm:col-span-2"
        >
          {(props) => <Input type="url" placeholder="https://" {...props} />}
        </Field>
      </div>

      <Field
        label="Tell us about yourself"
        name="message"
        required
        hint="What you teach, how you teach it, and why this school."
        error={errors.message}
      >
        {(props) => <Textarea rows={7} {...props} />}
      </Field>

      <TurnstileWidget />

      <SubmitButton size="lg" pendingLabel="Sending your application…">
        Submit application
        <ArrowRight aria-hidden />
      </SubmitButton>
    </form>
  )
}
