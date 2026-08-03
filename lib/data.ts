import { getCollection, getJson } from '@/lib/content'
import { isUpcoming } from '@/utils/format'
import type {
  Achievement,
  AcademicStage,
  CircularItem,
  DownloadItem,
  EventItem,
  FacilityItem,
  FaqItem,
  GalleryAlbum,
  GalleryImage,
  JobOpening,
  NewsItem,
  Person,
  ProcessStep,
  Testimonial,
} from '@/types'

/**
 * Typed accessors over the content directory.
 *
 * Every page reads through this module rather than touching the filesystem
 * directly, so the shape of a collection is defined in exactly one place and a
 * renamed field breaks the build instead of a page.
 */

/* ------------------------------------------------------------------ home */

export const getHero = () => getJson<import('@/components/sections/hero').HeroContent>('home/hero.json')
export const getStats = () => getJson<import('@/components/sections/stats').StatsContent>('home/stats.json')
export const getAbout = () =>
  getJson<import('@/components/sections/about-editorial').AboutContent>('home/about.json')
export const getWhyChooseUs = () =>
  getJson<import('@/components/sections/why-choose-us').WhyChooseContent>('home/why-choose-us.json')
export const getCta = () => getJson<import('@/components/sections/cta').CtaContent>('home/cta.json')

/* ----------------------------------------------------------- institution */

export interface MessageDoc {
  slug: string
  name: string
  role: string
  portrait: string
  salutation: string
  quote: string
  signature?: string
  order?: number
}

export function getMessages() {
  return getCollection<MessageDoc>('messages').sort(
    (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0),
  )
}

export function getMessage(slug: string) {
  return getMessages().find((message) => message.slug === slug) ?? null
}

export interface VisionMission {
  eyebrow: string
  title: string
  lead: string
  motto: string
  vision: { title: string; statement: string; paragraphs: string[] }
  mission: { title: string; statement: string; paragraphs: string[] }
  philosophy: { title: string; paragraphs: string[] }
  values: Array<{ title: string; description: string }>
}

export const getVisionMission = () => getJson<VisionMission>('about/vision-mission.json')

export interface HistoryContent {
  eyebrow: string
  title: string
  lead: string
  intro: string[]
  timeline: Array<{ period: string; title: string; description: string }>
  images: Array<{ src: string; alt: string; caption: string }>
}

export const getHistory = () => getJson<HistoryContent>('about/history.json')

export interface LeadershipContent {
  eyebrow: string
  title: string
  lead: string
  leadership: Array<Person & { quote?: string }>
  departments: Array<{ title: string; description: string; image: string; session: string }>
  facultyNote: string
}

export const getLeadership = () => getJson<LeadershipContent>('people/leadership.json')

/* -------------------------------------------------------------- academics */

export interface StagesContent {
  eyebrow: string
  title: string
  description: string
  stages: AcademicStage[]
}

export const getStages = () => getJson<StagesContent>('academics/stages.json')
export const getStage = (slug: string) =>
  getStages().stages.find((stage) => stage.slug === slug) ?? null

export interface CurriculumContent {
  eyebrow: string
  title: string
  lead: string
  medium: string
  boards: Array<{ title: string; description: string; applies: string }>
  subjectGroups: Array<{ title: string; icon: string; subjects: string[]; note: string }>
  assessment: Array<{ title: string; description: string }>
  pedagogy: Array<{ icon: string; title: string; description: string }>
}

export const getCurriculum = () => getJson<CurriculumContent>('academics/curriculum.json')

export interface StudentDevelopmentContent {
  eyebrow: string
  title: string
  lead: string
  pillars: Array<{ icon: string; title: string; description: string }>
  programmes: Array<{ title: string; description: string }>
}

export const getStudentDevelopment = () =>
  getJson<StudentDevelopmentContent>('academics/student-development.json')

/* ----------------------------------------------------------------- campus */

export interface FacilitiesContent {
  eyebrow: string
  title: string
  lead: string
  intro: string[]
  items: FacilityItem[]
  sports: string[]
}

export const getFacilities = () => getJson<FacilitiesContent>('campus/facilities.json')

export function getFacilitiesByCategory(category: FacilityItem['category']) {
  return getFacilities().items.filter((item) => item.category === category)
}

export function getFacility(slug: string) {
  return getFacilities().items.find((item) => item.slug === slug) ?? null
}

export interface TourContent {
  eyebrow: string
  title: string
  lead: string
  note: string
  stops: Array<{
    id: string
    name: string
    x: number
    y: number
    summary: string
    detail: string
    image: string
    href: string
  }>
}

export const getTour = () => getJson<TourContent>('campus/tour.json')

/* ------------------------------------------------------------------ media */

export interface GalleryContent {
  eyebrow: string
  title: string
  description: string
  albums: GalleryAlbum[]
}

export const getGallery = () => getJson<GalleryContent>('media/gallery.json')

export function getAlbum(slug: string) {
  return getGallery().albums.find((album) => album.slug === slug) ?? null
}

/** A curated cross-album selection for the homepage band. */
export function getGalleryHighlights(count = 8): GalleryImage[] {
  const albums = getGallery().albums
  const picks: GalleryImage[] = []
  let cursor = 0
  while (picks.length < count && cursor < 6) {
    for (const album of albums) {
      const image = album.images[cursor]
      if (image && picks.length < count) picks.push({ ...image, album: album.title })
    }
    cursor += 1
  }
  return picks
}

export function getAllGalleryImages(): GalleryImage[] {
  return getGallery().albums.flatMap((album) =>
    album.images.map((image) => ({ ...image, album: album.title })),
  )
}

export interface VideosContent {
  eyebrow: string
  title: string
  description: string
  items: Array<import('@/components/sections/video').HomeVideo>
}

export const getVideos = () => getJson<VideosContent>('media/videos.json')

/* ------------------------------------------------------- events and news */

export function getEvents(): EventItem[] {
  return getCollection<Omit<EventItem, 'slug' | 'body'>>('events')
    .map((doc) => ({ ...(doc.data as Omit<EventItem, 'slug' | 'body'>), slug: doc.slug, body: doc.body }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getUpcomingEvents(limit?: number): EventItem[] {
  const events = getEvents()
  const upcoming = events.filter((event) => isUpcoming(event.endDate ?? event.date))
  // Never show an empty calendar: fall back to the most recent entries.
  const list = upcoming.length ? upcoming : events.slice(-4).reverse()
  return limit ? list.slice(0, limit) : list
}

export function getEvent(slug: string) {
  return getEvents().find((event) => event.slug === slug) ?? null
}

export function getNews(): NewsItem[] {
  return getCollection<Omit<NewsItem, 'slug' | 'body'>>('news').map((doc) => ({
    ...(doc.data as Omit<NewsItem, 'slug' | 'body'>),
    slug: doc.slug,
    body: doc.body,
  }))
}

export function getNewsItem(slug: string) {
  return getNews().find((item) => item.slug === slug) ?? null
}

/* ------------------------------------------------------------- documents */

export interface CircularsContent {
  eyebrow: string
  title: string
  description: string
  note: string
  items: CircularItem[]
}

export const getCirculars = () => getJson<CircularsContent>('circulars.json')

export interface DownloadsContent {
  eyebrow: string
  title: string
  description: string
  categories: string[]
  items: DownloadItem[]
}

export const getDownloads = () => getJson<DownloadsContent>('downloads.json')

/* ------------------------------------------------------------ admissions */

export interface AdmissionProcessContent {
  eyebrow: string
  title: string
  lead: string
  intro: string[]
  steps: ProcessStep[]
  documents: string[]
  eligibility: Array<{ grade: string; criteria: string }>
  cta: { label: string; href: string }
}

export const getAdmissionProcess = () =>
  getJson<AdmissionProcessContent>('admissions/process.json')

export interface FeesContent {
  eyebrow: string
  title: string
  lead: string
  notice: string
  books: { title: string; note: string; rows: Array<{ grade: string; amount: number }> }
  uniform: {
    title: string
    intro: string
    groups: Array<{ group: string; formal: string; sports: string }>
    rules: string[]
  }
  payment: { title: string; items: Array<{ title: string; description: string }> }
}

export const getFees = () => getJson<FeesContent>('admissions/fees.json')

/* ------------------------------------------------------------------ misc */

export interface FaqsContent {
  eyebrow: string
  title: string
  description: string
  items: FaqItem[]
}

export const getFaqs = () => getJson<FaqsContent>('faqs.json')

export interface TestimonialsContent {
  eyebrow: string
  title: string
  description: string
  note: string
  items: Testimonial[]
}

export const getTestimonials = () => getJson<TestimonialsContent>('testimonials.json')

export interface AchievementsContent {
  eyebrow: string
  title: string
  description: string
  items: Achievement[]
}

export const getAchievements = () => getJson<AchievementsContent>('achievements.json')

export interface CareersContent {
  eyebrow: string
  title: string
  lead: string
  intro: string[]
  whyJoin: Array<{ icon: string; title: string; description: string }>
  openings: JobOpening[]
  howToApply: string[]
}

export const getCareers = () => getJson<CareersContent>('careers/careers.json')

export interface DisclosureContent {
  eyebrow: string
  title: string
  lead: string
  notice: string
  sections: Array<{ title: string; rows: Array<{ label: string; value: string }> }>
}

export const getDisclosure = () => getJson<DisclosureContent>('legal/mandatory-disclosure.json')

export function getLegalDoc(slug: 'privacy-policy' | 'terms') {
  const docs = getCollection<{ title: string; updated: string }>('legal')
  return docs.find((doc) => doc.slug === slug) ?? null
}
