'use client'

import * as React from 'react'
import { useActionState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { submitAdmissionEnquiry } from '@/features/forms/actions'
import { FormStatus } from '@/features/forms/form-status'
import { SubmitButton } from '@/features/forms/submit-button'
import { TurnstileWidget } from '@/features/forms/turnstile'
import {
  AntiSpamFields,
  Checkbox,
  Field,
  Input,
  Select,
  Textarea,
} from '@/components/ui/form-field'
import { GRADE_OPTIONS, SOURCE_OPTIONS } from '@/lib/validations'
import type { FormResult } from '@/types'

/**
 * Admission enquiry.
 *
 * Progressive enhancement throughout: the form posts to a server action, so it
 * works before hydration and validates identically on both sides.
 */
export function EnquiryForm() {
  const [state, action] = useActionState<FormResult | null, FormData>(submitAdmissionEnquiry, null)
  const errors = state?.fieldErrors ?? {}
  const formRef = React.useRef<HTMLFormElement>(null)

  React.useEffect(() => {
    if (state?.status === 'success') formRef.current?.reset()
  }, [state])

  return (
    <form ref={formRef} action={action} noValidate className="relative space-y-7">
      <AntiSpamFields />
      <FormStatus state={state} />

      <fieldset className="space-y-5 border-0 p-0">
        <legend className="mb-1 font-display text-h6 font-semibold">About the student</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Student's full name" name="studentName" required error={errors.studentName}>
            {(props) => <Input type="text" autoComplete="off" placeholder="As on the birth certificate" {...props} />}
          </Field>

          <Field label="Date of birth" name="dateOfBirth" required error={errors.dateOfBirth}>
            {(props) => <Input type="date" {...props} />}
          </Field>

          <Field label="Grade seeking admission to" name="grade" required error={errors.grade}>
            {(props) => (
              <Select defaultValue="" {...props}>
                <option value="" disabled>
                  Select a grade
                </option>
                {GRADE_OPTIONS.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </Select>
            )}
          </Field>

          <Field label="Current school" name="currentSchool" error={errors.currentSchool}>
            {(props) => <Input type="text" placeholder="If applicable" {...props} />}
          </Field>
        </div>
      </fieldset>

      <hr className="hairline" />

      <fieldset className="space-y-5 border-0 p-0">
        <legend className="mb-1 font-display text-h6 font-semibold">
          Parent or guardian details
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your full name" name="guardianName" required error={errors.guardianName}>
            {(props) => <Input type="text" autoComplete="name" {...props} />}
          </Field>

          <Field label="Mobile number" name="phone" required error={errors.phone}>
            {(props) => <Input type="tel" autoComplete="tel" placeholder="10-digit number" {...props} />}
          </Field>

          <Field label="Email address" name="email" required error={errors.email}>
            {(props) => <Input type="email" autoComplete="email" placeholder="you@example.com" {...props} />}
          </Field>

          <Field label="City" name="city" error={errors.city}>
            {(props) => <Input type="text" autoComplete="address-level2" placeholder="Nagpur" {...props} />}
          </Field>

          <Field
            label="How did you hear about us?"
            name="source"
            required
            error={errors.source}
            className="sm:col-span-2"
          >
            {(props) => (
              <Select defaultValue="" {...props}>
                <option value="" disabled>
                  Select an option
                </option>
                {SOURCE_OPTIONS.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </div>
      </fieldset>

      <hr className="hairline" />

      <Field
        label="Anything you would like us to know?"
        name="message"
        hint="Questions about the grade, transport, timings, or your child's needs."
        error={errors.message}
      >
        {(props) => <Textarea rows={5} placeholder="Optional" {...props} />}
      </Field>

      <Checkbox
        name="consent"
        required
        error={errors.consent}
        label={
          <>
            I am happy for the school to contact me about this enquiry. I have read the{' '}
            <Link href="/privacy-policy" className="font-medium text-primary underline underline-offset-4">
              privacy policy
            </Link>
            .
          </>
        }
      />

      <TurnstileWidget />

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <SubmitButton size="lg" pendingLabel="Sending your enquiry…">
          Submit enquiry
          <ArrowRight aria-hidden />
        </SubmitButton>
        <p className="text-caption text-muted-foreground">
          We reply within two working days.
        </p>
      </div>
    </form>
  )
}
