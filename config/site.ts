/**
 * Institution-wide constants.
 *
 * Anything an editor is expected to change frequently lives in /content and is
 * edited through Decap CMS. This file holds the values that are structural —
 * they are referenced by metadata, JSON-LD, redirects and the build itself.
 */

/**
 * Resolves the canonical origin without anyone having to hard-code a domain.
 *
 *   1. NEXT_PUBLIC_SITE_URL                        — an explicit override, always wins
 *   2. NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL   — set automatically by Vercel;
 *      it points at the custom domain as soon as one is attached to the project,
 *      and at the *.vercel.app address until then
 *   3. NEXT_PUBLIC_VERCEL_URL                      — the per-deployment URL
 *   4. localhost                                   — development
 *
 * The practical effect: the site is correct on the Vercel address today, and
 * becomes correct on the school's own domain the moment it is added — with no
 * code change and no redeploy of edited config.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')

  const productionUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  if (productionUrl) return `https://${productionUrl}`

  const deploymentUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  if (deploymentUrl) return `https://${deploymentUrl}`

  return 'http://localhost:3000'
}

const siteUrl = resolveSiteUrl()

/**
 * True while the site is still being served from a Vercel address or a preview
 * deployment — i.e. during client review, before the school's own domain is
 * attached. Search engines are kept out until then, so a staging copy can never
 * outrank the real site or be shared publicly by accident.
 *
 * This flips itself off automatically once a custom domain is added.
 */
const isStaging =
  siteUrl.includes('.vercel.app') ||
  siteUrl.includes('localhost') ||
  (process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production')

export const siteConfig = {
  name: 'New Apostolic English High School',
  shortName: 'New Apostolic',
  legalName: 'New Apostolic English High School & Dr. Bower Apostolic Junior College',
  society: 'National Apostolic Church Education Society',
  motto: 'Love thy neighbour as thyself',
  tagline: 'Where learning meets inspiration',
  description:
    'New Apostolic English High School and Dr. Bower Apostolic Junior College, Nagpur — an English-medium institution offering Pre-Primary to Junior College and degree programmes, founded on academic rigour, character and community.',
  url: siteUrl,
  /** The domain the school will eventually run on — used in copy, not in links. */
  intendedDomain: 'www.apostoliceducation.org',
  /** While true, every page is served `noindex` and robots.txt disallows all. */
  isStaging,
  locale: 'en_IN',
  language: 'en-IN',
  /** Current academic session — surfaced in admissions copy and JSON-LD. */
  academicSession: '2026–27',

  contact: {
    phone: '+91 96577 66740',
    phoneHref: 'tel:+919657766740',
    whatsapp: 'https://wa.me/919657766740',
    email: 'naehs_bajc@yahoo.com',
    emailHref: 'mailto:naehs_bajc@yahoo.com',
    admissionsEmail: 'naehs_bajc@yahoo.com',
    careersEmail: 'naehs_bajc@yahoo.com',
  },

  address: {
    line1: '48, Kukde Layout',
    line2: 'Opposite Railway Police Headquarters, Rameshwari Road',
    locality: 'Rameshwari',
    city: 'Nagpur',
    state: 'Maharashtra',
    postalCode: '440027',
    country: 'IN',
    countryName: 'India',
    formatted:
      '48, Kukde Layout, Opposite Railway Police Headquarters, Rameshwari Road, Nagpur, Maharashtra 440027, India',
  },

  geo: {
    latitude: 21.1207651,
    longitude: 79.0929288,
    mapsLink: 'https://maps.app.goo.gl/xyeawBuWK6q8ZePT9',
    mapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.7943099722556!2d79.0929288!3d21.1207651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bf58b39f3bbd%3A0xb8c87682058e1fe8!2sDr.%20Bower%20Apostolic%20Junior%20College!5e0!3m2!1sen!2sin!4v1694154995386!5m2!1sen!2sin',
  },

  hours: [
    { label: 'Pre-Primary', value: '8:00 AM – 11:00 AM' },
    { label: 'Primary School', value: '7:00 AM – 11:30 AM' },
    { label: 'High School & Junior College', value: '12:00 PM – 5:00 PM' },
    { label: 'Administrative Office', value: 'Monday – Saturday, 9:00 AM – 4:00 PM' },
  ],

  social: [
    { name: 'YouTube', href: 'https://www.youtube.com/watch?v=8sjZjpvc14Q', icon: 'youtube' },
    { name: 'WhatsApp', href: 'https://wa.me/919657766740', icon: 'whatsapp' },
    { name: 'Google Maps', href: 'https://maps.app.goo.gl/xyeawBuWK6q8ZePT9', icon: 'map' },
    { name: 'Email', href: 'mailto:naehs_bajc@yahoo.com', icon: 'mail' },
  ],

  brand: {
    crest: '/brand/logo-crest.png',
    crestLight: '/brand/logo-crest-light.png',
    crestSmall: '/brand/logo-crest-512.png',
    icon: '/brand/logo-crest-192.png',
    /** The single chromatic ink sampled from the crest artwork. */
    inkHex: '#973520',
    inkHsl: 'hsl(11 65% 36%)',
  },

  ogImage: '/images/hero/hero-1.jpg',
} as const

export type SiteConfig = typeof siteConfig
