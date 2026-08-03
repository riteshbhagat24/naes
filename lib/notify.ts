import 'server-only'
import { siteConfig } from '@/config/site'

/**
 * Form delivery.
 *
 * Two zero-cost providers, tried in order. Whichever is configured first wins:
 *
 *   1. RESEND_API_KEY   → a formatted email to the school office (free tier).
 *   2. FORM_WEBHOOK_URL → the validated payload as JSON to any HTTPS endpoint
 *                         (Google Apps Script, Make, Zapier, n8n, Slack …).
 *
 * In development with neither configured, submissions are written to the server
 * console so the whole flow can be exercised locally.
 */

export interface Submission {
  kind: 'Admission Enquiry' | 'Contact Message' | 'Career Application' | 'Newsletter Signup'
  subject: string
  fields: Array<{ label: string; value: string }>
  replyTo?: string
}

const LABELS: Record<string, string> = {
  guardianName: 'Parent / Guardian',
  studentName: 'Student',
  dateOfBirth: 'Date of birth',
  grade: 'Grade sought',
  currentSchool: 'Current school',
  source: 'Heard about us via',
  portfolioUrl: 'Portfolio / profile',
  qualification: 'Highest qualification',
  experience: 'Years of experience',
  position: 'Position applied for',
}

/** Turns a validated payload into an ordered, human-readable field list. */
export function toFields(data: Record<string, unknown>): Submission['fields'] {
  const skip = new Set(['website', 'startedAt', 'turnstileToken', 'consent'])
  return Object.entries(data)
    .filter(([key, value]) => !skip.has(key) && value !== '' && value !== undefined)
    .map(([key, value]) => ({
      label: LABELS[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()),
      value: String(value),
    }))
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderEmail(submission: Submission): string {
  const rows = submission.fields
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #EAE3DE;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#7A6A63;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #EAE3DE;font:400 15px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#231A16">${escapeHtml(value).replace(/\n/g, '<br />')}</td>
        </tr>`,
    )
    .join('')

  return `<!doctype html><html><body style="margin:0;background:#FBF8F6;padding:32px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #EAE3DE;border-radius:16px;overflow:hidden">
      <tr><td style="background:#973520;padding:22px 24px">
        <div style="font:600 11px/1 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#F6DDD3">${escapeHtml(submission.kind)}</div>
        <div style="margin-top:8px;font:600 22px/1.25 Georgia,serif;color:#fff">${escapeHtml(submission.subject)}</div>
      </td></tr>
      <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
      <tr><td style="padding:18px 24px;font:400 12px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#7A6A63">
        Submitted from ${escapeHtml(siteConfig.url)} — replies go directly to the sender.
      </td></tr>
    </table></body></html>`
}

async function sendViaResend(submission: Submission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  const to = (process.env.FORM_TO_EMAIL || siteConfig.contact.email)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.FORM_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`,
      to,
      subject: `[${submission.kind}] ${submission.subject}`,
      html: renderEmail(submission),
      ...(submission.replyTo ? { reply_to: submission.replyTo } : {}),
    }),
  })

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`)
  }
  return true
}

async function sendViaWebhook(submission: Submission): Promise<boolean> {
  const url = process.env.FORM_WEBHOOK_URL
  if (!url) return false

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: submission.kind,
      subject: submission.subject,
      submittedAt: new Date().toISOString(),
      source: siteConfig.url,
      replyTo: submission.replyTo,
      data: Object.fromEntries(submission.fields.map((f) => [f.label, f.value])),
    }),
  })

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`)
  }
  return true
}

/** Delivers a submission, or throws with a message safe to show a visitor. */
export async function deliver(submission: Submission): Promise<void> {
  try {
    if (await sendViaResend(submission)) return
    if (await sendViaWebhook(submission)) return
  } catch (error) {
    console.error('[notify] delivery failed', error)
    throw new Error(
      'We could not send your message just now. Please call the school office on ' +
        `${siteConfig.contact.phone} and we will help you straight away.`,
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[notify] no provider configured — submission logged only:\n', submission)
    return
  }

  throw new Error(
    'Our enquiry system is not accepting messages at the moment. Please call ' +
      `${siteConfig.contact.phone} or email ${siteConfig.contact.email}.`,
  )
}

/** Server-side Cloudflare Turnstile check. A no-op until keys are configured. */
export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false

  const body = new URLSearchParams({ secret, response: token })
  if (ip) body.set('remoteip', ip)

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  const result = (await response.json()) as { success?: boolean }
  return result.success === true
}

/** Rejects submissions completed faster than a human plausibly could. */
export function isTooFast(startedAt: string | undefined, minimumMs = 2500): boolean {
  if (!startedAt) return false
  const started = Number(startedAt)
  if (!Number.isFinite(started)) return false
  return Date.now() - started < minimumMs
}
