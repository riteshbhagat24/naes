import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

interface BuildMetadataArgs {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  noindex?: boolean
  keywords?: string[]
}

/**
 * Every route builds its <head> through this helper so canonical URLs, Open
 * Graph, Twitter cards and robots directives can never drift apart.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  noindex = false,
  keywords = [],
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path, siteConfig.url)
  const ogImage = absoluteUrl(image ?? siteConfig.ogImage, siteConfig.url)
  const fullTitle = path === '/' ? title : `${title} — ${siteConfig.name}`

  return {
    title,
    description,
    keywords: [
      'New Apostolic English High School',
      'Dr. Bower Apostolic Junior College',
      'school in Nagpur',
      'English medium school Nagpur',
      'Rameshwari Nagpur school',
      ...keywords,
    ],
    alternates: { canonical: url },
    // Staging deployments are never indexed — see siteConfig.isStaging.
    robots:
      noindex || siteConfig.isStaging
        ? { index: false, follow: false, nocache: true }
        : {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-video-preview': -1,
              'max-image-preview': 'large',
              'max-snippet': -1,
            },
          },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}
