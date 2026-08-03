import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/**
 * The entire palette is generated from the single chromatic colour found in the
 * school crest (#973520 → hsl(11 65% 36%)). See styles/globals.css for the
 * token definitions and docs/DESIGN-SYSTEM in README for the derivation rules.
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
    './content/**/*.{md,json}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      screens: {
        xs: '420px',
        '3xl': '1728px',
      },
      maxWidth: {
        content: '1440px',
        prose: '68ch',
        measure: '56ch',
      },
      colors: {
        /* ---- brand ramp (from the crest) ---- */
        brand: {
          50: 'hsl(var(--brand-50) / <alpha-value>)',
          100: 'hsl(var(--brand-100) / <alpha-value>)',
          200: 'hsl(var(--brand-200) / <alpha-value>)',
          300: 'hsl(var(--brand-300) / <alpha-value>)',
          400: 'hsl(var(--brand-400) / <alpha-value>)',
          500: 'hsl(var(--brand-500) / <alpha-value>)',
          600: 'hsl(var(--brand-600) / <alpha-value>)',
          700: 'hsl(var(--brand-700) / <alpha-value>)',
          800: 'hsl(var(--brand-800) / <alpha-value>)',
          900: 'hsl(var(--brand-900) / <alpha-value>)',
          950: 'hsl(var(--brand-950) / <alpha-value>)',
        },
        /* ---- warm neutral ramp (brand hue, desaturated) ---- */
        sand: {
          50: 'hsl(var(--sand-50) / <alpha-value>)',
          100: 'hsl(var(--sand-100) / <alpha-value>)',
          200: 'hsl(var(--sand-200) / <alpha-value>)',
          300: 'hsl(var(--sand-300) / <alpha-value>)',
          400: 'hsl(var(--sand-400) / <alpha-value>)',
          500: 'hsl(var(--sand-500) / <alpha-value>)',
          600: 'hsl(var(--sand-600) / <alpha-value>)',
          700: 'hsl(var(--sand-700) / <alpha-value>)',
          800: 'hsl(var(--sand-800) / <alpha-value>)',
          900: 'hsl(var(--sand-900) / <alpha-value>)',
          950: 'hsl(var(--sand-950) / <alpha-value>)',
        },
        /* ---- accent: the rising sun of the crest ---- */
        gold: {
          100: 'hsl(var(--gold-100) / <alpha-value>)',
          200: 'hsl(var(--gold-200) / <alpha-value>)',
          300: 'hsl(var(--gold-300) / <alpha-value>)',
          400: 'hsl(var(--gold-400) / <alpha-value>)',
          500: 'hsl(var(--gold-500) / <alpha-value>)',
          600: 'hsl(var(--gold-600) / <alpha-value>)',
          700: 'hsl(var(--gold-700) / <alpha-value>)',
        },
        /* ---- semantic tokens (theme aware) ---- */
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        surface: {
          DEFAULT: 'hsl(var(--surface) / <alpha-value>)',
          raised: 'hsl(var(--surface-raised) / <alpha-value>)',
          sunken: 'hsl(var(--surface-sunken) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          light: 'hsl(var(--primary-light) / <alpha-value>)',
          dark: 'hsl(var(--primary-dark) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          foreground: 'hsl(var(--warning-foreground) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger) / <alpha-value>)',
          foreground: 'hsl(var(--danger-foreground) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        /* Fluid editorial scale — every step interpolates 360px → 1440px. */
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'body-sm': ['clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)', { lineHeight: '1.65' }],
        'body': ['clamp(1rem, 0.96rem + 0.18vw, 1.0625rem)', { lineHeight: '1.72' }],
        'body-lg': ['clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)', { lineHeight: '1.7' }],
        'lead': ['clamp(1.125rem, 1.02rem + 0.5vw, 1.375rem)', { lineHeight: '1.62', letterSpacing: '-0.008em' }],
        'h6': ['clamp(1rem, 0.96rem + 0.2vw, 1.125rem)', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'h5': ['clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)', { lineHeight: '1.35', letterSpacing: '-0.012em' }],
        'h4': ['clamp(1.3125rem, 1.18rem + 0.6vw, 1.625rem)', { lineHeight: '1.28', letterSpacing: '-0.016em' }],
        'h3': ['clamp(1.5rem, 1.28rem + 1vw, 2.125rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.875rem, 1.45rem + 1.9vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.026em' }],
        'h1': ['clamp(2.375rem, 1.7rem + 3vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.032em' }],
        'display': ['clamp(2.75rem, 1.6rem + 5.1vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.038em' }],
        'hero': ['clamp(3rem, 1.2rem + 8vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
      },
      spacing: {
        'section': 'clamp(4.5rem, 3rem + 6vw, 9rem)',
        'section-sm': 'clamp(3rem, 2.2rem + 3.5vw, 5.5rem)',
        'section-lg': 'clamp(6rem, 4rem + 9vw, 12rem)',
        'gutter': 'clamp(1.25rem, 0.8rem + 2vw, 3rem)',
        '4.5': '1.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        xs: '0.25rem',
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        md: '0.625rem',
        lg: '0.875rem',
        xl: '1.125rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.75rem',
      },
      boxShadow: {
        xs: '0 1px 2px 0 hsl(var(--shadow-color) / 0.05)',
        sm: '0 1px 3px 0 hsl(var(--shadow-color) / 0.07), 0 1px 2px -1px hsl(var(--shadow-color) / 0.06)',
        DEFAULT: '0 4px 14px -4px hsl(var(--shadow-color) / 0.10), 0 2px 4px -2px hsl(var(--shadow-color) / 0.06)',
        md: '0 10px 30px -12px hsl(var(--shadow-color) / 0.16), 0 4px 8px -4px hsl(var(--shadow-color) / 0.07)',
        lg: '0 24px 56px -20px hsl(var(--shadow-color) / 0.22), 0 8px 16px -8px hsl(var(--shadow-color) / 0.08)',
        xl: '0 40px 90px -32px hsl(var(--shadow-color) / 0.28), 0 12px 24px -12px hsl(var(--shadow-color) / 0.10)',
        glow: '0 0 0 1px hsl(var(--primary) / 0.22), 0 18px 46px -18px hsl(var(--primary) / 0.42)',
        inset: 'inset 0 1px 0 0 hsl(0 0% 100% / 0.06)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")",
        'radial-fade': 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.10), transparent 68%)',
        'brand-sheen':
          'linear-gradient(135deg, hsl(var(--brand-700)) 0%, hsl(var(--brand-800)) 42%, hsl(var(--brand-950)) 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.04) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.16) translate3d(-1.2%, -1.4%, 0)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.35' },
          '50%': { transform: 'translateY(7px)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.28s cubic-bezier(0.22,1,0.36,1)',
        'accordion-up': 'accordion-up 0.24s cubic-bezier(0.22,1,0.36,1)',
        marquee: 'marquee 42s linear infinite',
        'ken-burns': 'ken-burns 18s ease-out both',
        shimmer: 'shimmer 2.4s infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
      },
      typography: () => ({
        editorial: {
          css: {
            '--tw-prose-body': 'hsl(var(--foreground) / 0.86)',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-links': 'hsl(var(--primary))',
            '--tw-prose-bold': 'hsl(var(--foreground))',
            '--tw-prose-quotes': 'hsl(var(--foreground))',
            '--tw-prose-quote-borders': 'hsl(var(--primary) / 0.35)',
            '--tw-prose-bullets': 'hsl(var(--primary) / 0.5)',
            '--tw-prose-counters': 'hsl(var(--muted-foreground))',
            '--tw-prose-hr': 'hsl(var(--border))',
            '--tw-prose-captions': 'hsl(var(--muted-foreground))',
            maxWidth: '68ch',
          },
        },
      }),
    },
  },
  plugins: [animate, typography],
}

export default config
