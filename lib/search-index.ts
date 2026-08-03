import { flattenNavigation } from '@/config/navigation'

export interface SearchEntry {
  title: string
  href: string
  section: string
  keywords: string
}

/**
 * Static search index.
 *
 * Small enough (a few dozen entries) to ship with the client bundle, which
 * means search results appear instantly with no network request and no service
 * to pay for. Extra keywords cover the words a parent would actually type.
 */
const EXTRA_KEYWORDS: Record<string, string> = {
  '/': 'home welcome new apostolic english high school nagpur rameshwari kukde layout',
  '/about': 'about us who we are institution society history bishop bower',
  '/about/history': 'history founding founder timeline bishop vincent bower alice mother superior',
  '/about/vision-mission': 'vision mission values philosophy goals aims',
  '/about/philosophy': 'educational philosophy teaching approach individual learning',
  '/about/management': 'management team staff leadership society office bearers principal head mistress',
  '/about/founder': 'founder chairman message bishop vincent bower society vision',
  '/about/principal': "principal desk message vinita bower principal's message",
  '/about/faculty': 'faculty teachers teaching staff departments',
  '/academics': 'academics curriculum classes grades subjects learning pathway',
  '/academics/pre-primary': 'nursery lkg ukg kg playgroup pre primary kindergarten age 3 4 5',
  '/academics/primary': 'primary grade 1 2 3 4 5 i ii iii iv v',
  '/academics/high-school': 'high school grade 6 7 8 9 10 vi vii viii ix x ssc board',
  '/academics/junior-college': 'junior college 11 12 xi xii hsc dr bower commerce science',
  '/academics/degree-programmes': 'bba bcca degree bachelor business administration computer applications',
  '/academics/curriculum': 'syllabus maharashtra state board cbse subjects assessment examination',
  '/academics/student-development': 'personality development activities life skills career guidance',
  '/admissions': 'admission apply enrol enrollment registration form 2026 27 open',
  '/admissions/process': 'admission process steps documents eligibility age criteria',
  '/admissions/enquiry': 'enquiry form register apply online admission application',
  '/admissions/fees': 'fees fee structure books cost uniform payment',
  '/admissions/faqs': 'faq questions timings safety transport security',
  '/campus-life': 'campus life facilities infrastructure sports library laboratory',
  '/campus-life/infrastructure': 'building classrooms smart board hall basement playground',
  '/campus-life/facilities': 'canteen safety cctv security playground facilities',
  '/campus-life/laboratories': 'physics lab computer lab science laboratory robotics',
  '/campus-life/library': 'library books reading reference',
  '/campus-life/sports': 'sports basketball volleyball cricket athletics karate carrom table tennis gymnasium throwball',
  '/campus-life/arts': 'arts music theatre drama craft cultural annual production',
  '/campus-life/tour': 'virtual tour campus map visit',
  '/gallery': 'gallery photos photographs images albums cultural activity',
  '/videos': 'video films youtube sports live stream news feature',
  '/news': 'news updates stories newsroom press',
  '/events': 'events calendar academic calendar celebrations sports day',
  '/circulars': 'circulars notices parents official communication',
  '/downloads': 'downloads forms pdf documents prospectus checklist calendar',
  '/achievements': 'achievements awards medals winners results honours',
  '/careers': 'careers jobs vacancy teaching post recruitment apply teacher',
  '/contact': 'contact address phone email map location directions visit',
  '/mandatory-disclosure': 'mandatory disclosure statutory information recognition',
  '/privacy-policy': 'privacy policy data personal information',
  '/terms': 'terms conditions use legal',
  '/sitemap': 'sitemap all pages index',
}

export const searchIndex: SearchEntry[] = flattenNavigation().map((entry) => ({
  ...entry,
  keywords: `${entry.title} ${entry.section} ${EXTRA_KEYWORDS[entry.href] ?? ''}`.toLowerCase(),
}))

/** Ranks entries: title prefix > title match > keyword match. */
export function searchSite(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []

  const terms = q.split(/\s+/)

  return searchIndex
    .map((entry) => {
      const title = entry.title.toLowerCase()
      let score = 0
      for (const term of terms) {
        if (title.startsWith(term)) score += 6
        else if (title.includes(term)) score += 4
        else if (entry.keywords.includes(term)) score += 2
      }
      return { entry, score }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((result) => result.entry)
}
