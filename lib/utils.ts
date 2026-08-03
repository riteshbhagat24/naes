import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Tailwind-aware class concatenation. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Absolute URL against the configured site origin. */
export function absoluteUrl(path: string, origin: string) {
  if (/^https?:\/\//i.test(path)) return path
  return `${origin.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}
