'use server'

import { headers } from 'next/headers'
import { z } from 'zod'
import {
  admissionEnquirySchema,
  careerSchema,
  contactSchema,
  newsletterSchema,
} from '@/lib/validations'
import { deliver, isTooFast, toFields, verifyTurnstile } from '@/lib/notify'
import type { FormResult } from '@/types'

/**
 * Server actions for every form on the site.
 *
 * The browser copy of each schema gives instant feedback; this is the
 * authoritative pass. Nothing is trusted until it has been parsed here.
 */

const GENERIC_ERROR =
  'Something went wrong on our side. Please try again, or call the school office on +91 96577 66740.'

async function clientIp(): Promise<string | undefined> {
  const headerList = await headers()
  return (
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    undefined
  )
}

/** Shared guard: honeypot, submission speed and Turnstile. */
async function passesSpamChecks(data: {
  website?: string
  startedAt?: string
  turnstileToken?: string
}): Promise<FormResult | null> {
  if (data.website) {
    // A bot filled the hidden field. Return success so it learns nothing.
    return { status: 'success', message: 'Thank you — your message has been received.' }
  }
  if (isTooFast(data.startedAt)) {
    return {
      status: 'error',
      message: 'That was submitted a little too quickly. Please take a moment and try again.',
    }
  }
  if (!(await verifyTurnstile(data.turnstileToken, await clientIp()))) {
    return {
      status: 'error',
      message: 'We could not verify that you are human. Please reload the page and try again.',
    }
  }
  return null
}

function invalid(error: z.ZodError): FormResult {
  return {
    status: 'error',
    message: 'Please check the highlighted fields and try again.',
    fieldErrors: error.flatten().fieldErrors as Record<string, string[]>,
  }
}

/* ------------------------------------------------------------ admissions */

export async function submitAdmissionEnquiry(
  _previous: FormResult | null,
  formData: FormData,
): Promise<FormResult> {
  const parsed = admissionEnquirySchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return invalid(parsed.error)

  const spam = await passesSpamChecks(parsed.data)
  if (spam) return spam

  try {
    await deliver({
      kind: 'Admission Enquiry',
      subject: `${parsed.data.studentName} — ${parsed.data.grade}`,
      fields: toFields(parsed.data),
      replyTo: parsed.data.email,
    })
  } catch (error) {
    return { status: 'error', message: error instanceof Error ? error.message : GENERIC_ERROR }
  }

  return {
    status: 'success',
    message:
      'Thank you. Your enquiry has reached our admissions office, and we will be in touch within two working days.',
  }
}

/* --------------------------------------------------------------- contact */

export async function submitContactMessage(
  _previous: FormResult | null,
  formData: FormData,
): Promise<FormResult> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return invalid(parsed.error)

  const spam = await passesSpamChecks(parsed.data)
  if (spam) return spam

  try {
    await deliver({
      kind: 'Contact Message',
      subject: parsed.data.subject,
      fields: toFields(parsed.data),
      replyTo: parsed.data.email,
    })
  } catch (error) {
    return { status: 'error', message: error instanceof Error ? error.message : GENERIC_ERROR }
  }

  return {
    status: 'success',
    message: 'Thank you for writing to us. The school office will reply to you shortly.',
  }
}

/* --------------------------------------------------------------- careers */

export async function submitCareerApplication(
  _previous: FormResult | null,
  formData: FormData,
): Promise<FormResult> {
  const parsed = careerSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return invalid(parsed.error)

  const spam = await passesSpamChecks(parsed.data)
  if (spam) return spam

  try {
    await deliver({
      kind: 'Career Application',
      subject: `${parsed.data.name} — ${parsed.data.position}`,
      fields: toFields(parsed.data),
      replyTo: parsed.data.email,
    })
  } catch (error) {
    return { status: 'error', message: error instanceof Error ? error.message : GENERIC_ERROR }
  }

  return {
    status: 'success',
    message:
      'Thank you for applying. We review every application, and will contact you if your profile matches a current vacancy.',
  }
}

/* ------------------------------------------------------------ newsletter */

export async function subscribeToNewsletter(
  _previous: FormResult | null,
  formData: FormData,
): Promise<FormResult> {
  const parsed = newsletterSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return invalid(parsed.error)

  const spam = await passesSpamChecks(parsed.data)
  if (spam) return spam

  try {
    await deliver({
      kind: 'Newsletter Signup',
      subject: parsed.data.email,
      fields: toFields(parsed.data),
      replyTo: parsed.data.email,
    })
  } catch (error) {
    return { status: 'error', message: error instanceof Error ? error.message : GENERIC_ERROR }
  }

  return { status: 'success', message: 'You are subscribed. Thank you.' }
}
