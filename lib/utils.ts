import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge, taught about this project's custom type scale.
 *
 * Left unconfigured it has no way to know that `text-body` or `text-h3` are
 * font sizes, so it files them under the only other thing `text-*` can mean —
 * colour — and drops whichever colour class came before them. That is how the
 * hero's primary button lost its dark label: `text-sand-900` from the variant
 * was silently removed by the `text-body` that the size added a moment later.
 *
 * Registering the scale puts sizes and colours in separate groups again, so
 * both survive the merge. Every component that pairs a custom size with a
 * colour depends on this.
 */
const FONT_SIZES = [
  'label',
  'caption',
  'body-sm',
  'body',
  'body-lg',
  'lead',
  'h6',
  'h5',
  'h4',
  'h3',
  'h2',
  'h1',
  'display',
  'hero',
] as const

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...FONT_SIZES] }],
    },
  },
})

/** Tailwind-aware class concatenation. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Absolute URL against the configured site origin. */
export function absoluteUrl(path: string, origin: string) {
  if (/^https?:\/\//i.test(path)) return path
  return `${origin.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}
