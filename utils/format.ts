/** Presentation helpers. Pure, dependency-free and safe on the server. */

const DATE_LOCALE = 'en-IN'

export function formatDate(
  value: string | Date,
  style: 'long' | 'medium' | 'short' | 'month' = 'long',
): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const options: Record<typeof style, Intl.DateTimeFormatOptions> = {
    long: { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' },
    medium: { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' },
    short: { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' },
    month: { month: 'long', year: 'numeric', timeZone: 'UTC' },
  }
  return new Intl.DateTimeFormat(DATE_LOCALE, options[style]).format(date)
}

/** "12" / "MAR" pair used by the event calendar chips. */
export function splitDate(value: string): { day: string; month: string; year: string } {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return { day: '', month: '', year: '' }
  return {
    day: new Intl.DateTimeFormat(DATE_LOCALE, { day: '2-digit', timeZone: 'UTC' }).format(date),
    month: new Intl.DateTimeFormat(DATE_LOCALE, { month: 'short', timeZone: 'UTC' })
      .format(date)
      .toUpperCase(),
    year: new Intl.DateTimeFormat(DATE_LOCALE, { year: 'numeric', timeZone: 'UTC' }).format(date),
  }
}

export function isUpcoming(value: string, reference: Date = new Date()): boolean {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return false
  const endOfDay = new Date(date)
  endOfDay.setUTCHours(23, 59, 59, 999)
  return endOfDay.getTime() >= reference.getTime()
}

export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat(DATE_LOCALE, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function titleCase(input: string): string {
  return input.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
}

export function excerpt(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, clean.lastIndexOf(' ', max))}…`
}

export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 210))} min read`
}

/** Groups an array into a record keyed by the chosen field. */
export function groupBy<T, K extends string | number>(
  items: readonly T[],
  key: (item: T) => K,
): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const k = key(item)
    ;(acc[k] ||= []).push(item)
    return acc
  }, {} as Record<K, T[]>)
}

/** Deterministic chunking used by the masonry gallery columns. */
export function distribute<T>(items: readonly T[], columns: number): T[][] {
  const out: T[][] = Array.from({ length: columns }, () => [])
  items.forEach((item, index) => out[index % columns].push(item))
  return out
}
