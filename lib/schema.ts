import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

/**
 * JSON-LD builders. Structured data is emitted from the server so crawlers see
 * it in the initial HTML with no hydration cost.
 */

const ORG_ID = `${siteConfig.url}/#organization`
const SITE_ID = `${siteConfig.url}/#website`

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'School'],
    '@id': ORG_ID,
    name: siteConfig.name,
    alternateName: [siteConfig.legalName, siteConfig.shortName],
    parentOrganization: { '@type': 'Organization', name: siteConfig.society },
    slogan: siteConfig.motto,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(siteConfig.brand.crest, siteConfig.url),
      width: 1024,
      height: 1022,
    },
    image: absoluteUrl(siteConfig.ogImage, siteConfig.url),
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.geo.mapsLink,
    areaServed: { '@type': 'City', name: 'Nagpur' },
    sameAs: siteConfig.social.map((s) => s.href),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '17:00',
      },
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { '@id': ORG_ID },
    inLanguage: siteConfig.language,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(trail: Array<{ title: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.title,
      item: absoluteUrl(crumb.href, siteConfig.url),
    })),
  }
}

export function articleSchema(article: {
  title: string
  description: string
  path: string
  date: string
  image?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: absoluteUrl(article.path, siteConfig.url),
    image: absoluteUrl(article.image ?? siteConfig.ogImage, siteConfig.url),
    author: { '@type': 'Organization', name: article.author ?? siteConfig.name },
    publisher: { '@id': ORG_ID },
  }
}

export function eventSchema(event: {
  title: string
  description: string
  path: string
  start: string
  end?: string
  location: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.start,
    endDate: event.end ?? event.start,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: absoluteUrl(event.path, siteConfig.url),
    image: absoluteUrl(event.image ?? siteConfig.ogImage, siteConfig.url),
    organizer: { '@id': ORG_ID },
    location: {
      '@type': 'Place',
      name: event.location,
      address: postalAddress(),
    },
  }
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function jobPostingSchema(job: {
  title: string
  description: string
  department: string
  employmentType: string
  posted: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.posted,
    employmentType: job.employmentType.toUpperCase().replace(/\s+/g, '_'),
    hiringOrganization: { '@id': ORG_ID },
    jobLocation: { '@type': 'Place', address: postalAddress() },
    industry: 'Education',
    occupationalCategory: job.department,
  }
}

export function courseSchema(course: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    url: absoluteUrl(course.path, siteConfig.url),
    provider: { '@id': ORG_ID },
  }
}
