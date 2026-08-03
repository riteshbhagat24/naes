import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/config/site'
import { fontDisplay, fontSans } from '@/lib/fonts'
import { getJson } from '@/lib/content'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/layout/providers'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { ExperienceLayer } from '@/components/layout/experience-layer'
import { PageTransition } from '@/components/layout/page-transition'
import { JsonLd } from '@/components/ui/json-ld'
import type { Announcement } from '@/components/layout/announcement-bar'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.society }],
  creator: siteConfig.society,
  publisher: siteConfig.legalName,
  category: 'education',
  alternates: { canonical: '/' },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/brand/logo-crest-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/brand/logo-crest-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/brand/logo-crest-512.png', sizes: '512x512', type: 'image/png' }],
  },
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: siteConfig.isStaging
    ? { index: false, follow: false, nocache: true }
    : {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
      },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBF8F6' },
    { media: '(prefers-color-scheme: dark)', color: '#15100E' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
}

/**
 * Applies stored reader preferences before first paint so a visitor who has
 * chosen larger text or higher contrast never sees the default styling flash.
 */
const PREFERENCES_SCRIPT = `(function(){try{var p=JSON.parse(localStorage.getItem('naehs.preferences')||'{}');var d=document.documentElement;d.dataset.fontScale=p.fontScale||'default';d.dataset.contrast=p.contrast||'default';d.dataset.motion=p.motion==='off'?'off':'on';d.dataset.cursor=p.cursor||'default';}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const announcement = getJson<Announcement>('site/announcement.json')

  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={cn(fontSans.variable, fontDisplay.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFERENCES_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-background font-sans antialiased">
        <JsonLd data={organizationSchema()} id="organization-schema" />
        <JsonLd data={websiteSchema()} id="website-schema" />

        <Providers>
          <SiteHeader announcement={announcement} />

          <main id="main" className="min-h-[60svh]">
            <PageTransition>{children}</PageTransition>
          </main>

          <SiteFooter />
          <ExperienceLayer />
        </Providers>
      </body>
    </html>
  )
}
