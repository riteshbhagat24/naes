/* ==========================================================================
   Shared domain types.
   Content shapes mirror the Decap CMS collections in public/admin/config.yml —
   changing one means changing the other.
   ========================================================================== */

export interface NavLink {
  title: string
  href: string
  description?: string
}

export interface NavGroup {
  title: string
  items: NavLink[]
}

export interface NavFeature {
  title: string
  description: string
  href: string
  image: string
  cta?: string
}

export interface NavItem extends NavLink {
  groups?: NavGroup[]
  featured?: NavFeature
}

export interface QuickLink {
  title: string
  href: string
  icon: string
}

export interface FooterColumn {
  title: string
  links: NavLink[]
}

/* ---------------------------------------------------------------- content */

export interface SeoFields {
  title?: string
  description?: string
  image?: string
  noindex?: boolean
}

export interface ImageAsset {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  detail?: string
}

export interface Feature {
  title: string
  description: string
  icon: string
}

export interface Message {
  slug: string
  name: string
  role: string
  portrait: string
  salutation: string
  quote: string
  body: string[]
  signature?: string
}

export interface Person {
  name: string
  role: string
  department?: string
  qualification?: string
  portrait?: string
  bio?: string
  order?: number
}

export interface AcademicStage {
  slug: string
  name: string
  ageRange: string
  grades: string[]
  summary: string
  description: string[]
  subjects: string[]
  highlights: Feature[]
  image: string
  timings?: string
}

export interface FacilityItem {
  slug: string
  title: string
  summary: string
  description: string[]
  image: string
  icon: string
  category: 'infrastructure' | 'laboratories' | 'library' | 'sports' | 'arts' | 'wellbeing'
}

export interface GalleryImage {
  src: string
  alt: string
  caption: string
  /**
   * Intrinsic pixel dimensions, recorded when the album is built. They let each
   * tile reserve its exact space before the image loads, which is what keeps
   * cumulative layout shift at zero in the masonry grid.
   */
  width?: number
  height?: number
  /** Filled in when images are flattened across albums. */
  album?: string
  year?: string
  orientation?: 'portrait' | 'landscape' | 'square'
}

export interface GalleryAlbum {
  slug: string
  title: string
  description: string
  cover: string
  session: string
  images: GalleryImage[]
}

export interface VideoItem {
  id: string
  title: string
  description: string
  youtubeId: string
  source: string
  duration?: string
}

export interface EventItem {
  slug: string
  title: string
  date: string
  endDate?: string
  time?: string
  location: string
  category: string
  summary: string
  body: string
  image?: string
  registerHref?: string
  /** Calendar entries are indicative until confirmed by circular. */
  provisional?: boolean
}

export interface NewsItem {
  slug: string
  title: string
  date: string
  category: string
  author?: string
  summary: string
  body: string
  image?: string
  featured?: boolean
  /** Archive stories carry a session label instead of an exact date. */
  approximateDate?: boolean
  sessionLabel?: string
}

export interface CircularItem {
  id: string
  title: string
  date: string
  audience: string
  reference: string
  summary: string
  file?: string
}

export interface DownloadItem {
  id: string
  title: string
  description: string
  file: string
  category: string
  format: string
  size: string
  updated: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  portrait?: string
  relation: 'parent' | 'student' | 'alumnus' | 'faculty'
}

export interface FaqItem {
  question: string
  answer: string
  category: string
}

export interface Achievement {
  title: string
  description: string
  year: string
  category: string
  level: string
  image?: string
}

export interface TimelineEntry {
  period: string
  title: string
  description: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  detail: string[]
}

export interface JobOpening {
  id: string
  title: string
  department: string
  employmentType: string
  location: string
  experience: string
  qualification: string
  summary: string
  responsibilities: string[]
  posted: string
}

export interface FeeRow {
  grade: string
  books: string
  note?: string
}

export interface UniformRow {
  group: string
  formal: string
  sports: string
}

/* ---------------------------------------------------------------- forms */

export type FormState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string[]> }

export interface FormResult {
  status: 'success' | 'error'
  message: string
  fieldErrors?: Record<string, string[]>
}
