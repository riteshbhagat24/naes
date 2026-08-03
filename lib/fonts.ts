import { Inter, Manrope } from 'next/font/google'

/**
 * Both families are self-hosted by next/font: zero render-blocking requests,
 * no layout shift, and a size-adjusted local fallback for the swap period.
 */

export const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
})

export const fontDisplay = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  adjustFontFallback: true,
})
