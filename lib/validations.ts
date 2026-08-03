import { z } from 'zod'

/**
 * One schema per form, shared by the client (instant feedback) and the server
 * action (authoritative validation). Never trust the browser copy.
 */

const name = z
  .string()
  .trim()
  .min(2, 'Please enter at least 2 characters.')
  .max(80, 'Please keep this under 80 characters.')
  .regex(/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u, 'Please use letters, spaces, apostrophes or hyphens.')

const email = z
  .string()
  .trim()
  .min(1, 'An email address is required.')
  .max(160)
  .email('Please enter a valid email address.')

const phone = z
  .string()
  .trim()
  .min(10, 'Please enter a 10-digit mobile number.')
  .max(18)
  .regex(/^[+]?[\d\s-]{10,18}$/, 'Please enter a valid mobile number.')

const message = z
  .string()
  .trim()
  .max(1500, 'Please keep your message under 1,500 characters.')
  .optional()
  .or(z.literal(''))

/** Present on every form: bots fill hidden fields, humans do not. */
const antiSpam = {
  /** Honeypot — must stay empty. */
  website: z.string().max(0, 'Submission blocked.').optional().or(z.literal('')),
  /** Client timestamp — a real person needs more than three seconds. */
  startedAt: z.string().optional(),
  /** Cloudflare Turnstile token when the site key is configured. */
  turnstileToken: z.string().optional(),
}

export const GRADE_OPTIONS = [
  'Nursery',
  'LKG',
  'UKG',
  'Grade I',
  'Grade II',
  'Grade III',
  'Grade IV',
  'Grade V',
  'Grade VI',
  'Grade VII',
  'Grade VIII',
  'Grade IX',
  'Grade X',
  'Grade XI',
  'Grade XII',
  'BBA',
  'BCCA',
] as const

export const SOURCE_OPTIONS = [
  'Newspaper',
  'Radio',
  'Hoarding',
  'Friends & family',
  'Pamphlet',
  'Playschool',
  'Search engine',
  'Social media',
  'Other',
] as const

export const admissionEnquirySchema = z.object({
  guardianName: name,
  email,
  phone,
  studentName: name,
  dateOfBirth: z
    .string()
    .min(1, 'Please provide the date of birth.')
    .refine((value) => {
      const date = new Date(value)
      if (Number.isNaN(date.getTime())) return false
      const age = (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      return age >= 2 && age <= 25
    }, 'Please check the date of birth.'),
  grade: z.enum(GRADE_OPTIONS, { errorMap: () => ({ message: 'Please choose a grade.' }) }),
  currentSchool: z.string().trim().max(120).optional().or(z.literal('')),
  city: z.string().trim().max(80).optional().or(z.literal('')),
  source: z.enum(SOURCE_OPTIONS, {
    errorMap: () => ({ message: 'Please tell us how you heard about us.' }),
  }),
  message,
  consent: z
    .union([z.literal('on'), z.literal('true'), z.boolean()])
    .refine((value) => value === 'on' || value === 'true' || value === true, {
      message: 'Please confirm you are happy for us to contact you.',
    }),
  ...antiSpam,
})

export const contactSchema = z.object({
  name,
  email,
  phone: phone.optional().or(z.literal('')),
  subject: z
    .string()
    .trim()
    .min(3, 'Please add a short subject.')
    .max(120, 'Please keep the subject under 120 characters.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more — at least 10 characters.')
    .max(1500, 'Please keep your message under 1,500 characters.'),
  ...antiSpam,
})

export const careerSchema = z.object({
  name,
  email,
  phone,
  position: z.string().trim().min(2, 'Please tell us which role you are applying for.').max(120),
  qualification: z.string().trim().min(2, 'Please add your highest qualification.').max(160),
  experience: z.string().trim().min(1, 'Please add your years of experience.').max(60),
  portfolioUrl: z
    .string()
    .trim()
    .url('Please enter a full URL, including https://')
    .max(300)
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(20, 'Please write a short note about yourself — at least 20 characters.')
    .max(2000),
  ...antiSpam,
})

export const newsletterSchema = z.object({
  email,
  ...antiSpam,
})

export type AdmissionEnquiryInput = z.infer<typeof admissionEnquirySchema>
export type ContactInput = z.infer<typeof contactSchema>
export type CareerInput = z.infer<typeof careerSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>
