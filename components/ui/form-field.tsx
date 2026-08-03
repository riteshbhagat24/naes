'use client'

import * as React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/* --------------------------------------------------------------------------
   Accessible form primitives.
   Each field wires label ↔ control ↔ description ↔ error with real ids, sets
   aria-invalid / aria-describedby, and announces errors politely.
   -------------------------------------------------------------------------- */

interface FieldProps {
  label: string
  name: string
  error?: string[]
  hint?: string
  required?: boolean
  className?: string
  children: (props: {
    id: string
    name: string
    'aria-invalid': boolean
    'aria-describedby': string | undefined
    required: boolean
    className: string
  }) => React.ReactNode
}

const controlClass = [
  'w-full rounded-xl border bg-surface px-4 py-3.5 text-body-sm text-foreground',
  'placeholder:text-muted-foreground/70',
  'transition-[border-color,box-shadow] duration-200',
  'focus:outline-none focus:ring-2 focus:ring-ring/60 focus:ring-offset-0',
  'disabled:cursor-not-allowed disabled:opacity-60',
].join(' ')

export function Field({ label, name, error, hint, required, className, children }: FieldProps) {
  const id = React.useId()
  const fieldId = `${name}-${id}`
  const hintId = hint ? `${fieldId}-hint` : undefined
  const errorId = error?.length ? `${fieldId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={fieldId} className="text-body-sm font-semibold text-foreground">
        {label}
        {required ? (
          <span className="ml-1 text-primary" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-2 text-caption font-normal text-muted-foreground">Optional</span>
        )}
      </label>

      {hint ? (
        <p id={hintId} className="text-caption text-muted-foreground">
          {hint}
        </p>
      ) : null}

      {children({
        id: fieldId,
        name,
        'aria-invalid': Boolean(error?.length),
        'aria-describedby': describedBy,
        required: Boolean(required),
        className: cn(controlClass, error?.length ? 'border-danger' : 'border-input'),
      })}

      {error?.length ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-start gap-1.5 text-caption font-medium text-danger"
        >
          <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden />
          {error[0]}
        </p>
      ) : null}
    </div>
  )
}

export const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(className)} {...props} />,
)
Input.displayName = 'Input'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<'textarea'>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn('min-h-32 resize-y', className)} {...props} />
))
Textarea.displayName = 'Textarea'

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithoutRef<'select'>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      'appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-11',
      "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A6A63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")]",
      className,
    )}
    {...props}
  >
    {children}
  </select>
))
Select.displayName = 'Select'

/** Honeypot + timing pair rendered inside every form. */
export function AntiSpamFields() {
  const [startedAt] = React.useState(() => String(Date.now()))
  return (
    <>
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website-field">Leave this field empty</label>
        <input
          id="website-field"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input type="hidden" name="startedAt" defaultValue={startedAt} />
    </>
  )
}

export function Checkbox({
  label,
  name,
  error,
  required,
}: {
  label: React.ReactNode
  name: string
  error?: string[]
  required?: boolean
}) {
  const id = React.useId()
  const fieldId = `${name}-${id}`
  const errorId = error?.length ? `${fieldId}-error` : undefined

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          id={fieldId}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={Boolean(error?.length)}
          aria-describedby={errorId}
          className="mt-1 size-4 shrink-0 cursor-pointer rounded border-input accent-primary focus-visible:ring-2 focus-visible:ring-ring"
        />
        <label htmlFor={fieldId} className="text-body-sm text-muted-foreground text-pretty">
          {label}
        </label>
      </div>
      {error?.length ? (
        <p id={errorId} role="alert" className="text-caption font-medium text-danger">
          {error[0]}
        </p>
      ) : null}
    </div>
  )
}
