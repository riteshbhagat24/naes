import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { buildMetadata } from '@/lib/seo'
import {
  getAbout,
  getAchievements,
  getAdmissionProcess,
  getCta,
  getCurriculum,
  getFacilitiesByCategory,
  getFacility,
  getFacilities,
  getFaqs,
  getGalleryHighlights,
  getHero,
  getMessage,
  getNews,
  getStages,
  getStats,
  getStudentDevelopment,
  getTestimonials,
  getUpcomingEvents,
  getVideos,
  getWhyChooseUs,
} from '@/lib/data'
import { Hero } from '@/components/sections/hero'
import { StatsSection } from '@/components/sections/stats'
import { AboutEditorial } from '@/components/sections/about-editorial'
import { FounderMessage, PrincipalMessage } from '@/components/sections/messages'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { AcademicExcellence, CurriculumSection } from '@/components/sections/academics'
import {
  ArtsSection,
  CampusLifeIntro,
  InfrastructureSection,
  LaboratoriesSection,
  LibrarySection,
  SportsSection,
  StudentDevelopmentSection,
} from '@/components/sections/campus-life'
import { AchievementsSection } from '@/components/sections/achievements'
import { GalleryPreview } from '@/components/sections/gallery-preview'
import { VideoSection } from '@/components/sections/video'
import { LatestNews, UpcomingEvents } from '@/components/sections/events-news'
import { Testimonials } from '@/components/sections/testimonials'
import { AdmissionProcess } from '@/components/sections/admission-process'
import { Faqs } from '@/components/sections/faqs'
import { CallToAction } from '@/components/sections/cta'

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description:
    'New Apostolic English High School & Dr. Bower Apostolic Junior College, Nagpur. English-medium education from Nursery to Class XII, with BBA and BCCA degree programmes. Admissions open for 2026–27.',
  path: '/',
  keywords: ['admission Nagpur 2026-27', 'best school in south Nagpur', 'Maharashtra State Board school'],
})

/**
 * Homepage.
 *
 * Twenty-five bands, composed from the shared section vocabulary. Everything is
 * server-rendered; the only client islands are the hero sequence, the
 * interactive reason list, the gallery lightbox, the testimonial carousel and
 * the video facades.
 */
export default function HomePage() {
  const hero = getHero()
  const stats = getStats()
  const about = getAbout()
  const founder = getMessage('founder')!
  const principal = getMessage('principal')!
  const why = getWhyChooseUs()
  const stages = getStages()
  const curriculum = getCurriculum()
  const facilities = getFacilities()
  const development = getStudentDevelopment()
  const achievements = getAchievements()
  const gallery = getGalleryHighlights(8)
  const videos = getVideos()
  const events = getUpcomingEvents(4)
  const news = getNews().slice(0, 3)
  const testimonials = getTestimonials()
  const admissions = getAdmissionProcess()
  const faqs = getFaqs()
  const cta = getCta()

  const library = getFacility('library')!
  const sports = getFacility('sports')!
  const arts = getFacility('arts')!

  return (
    <>
      {/* 1 */}
      <Hero content={hero} />

      {/* 2 */}
      <StatsSection content={stats} />

      {/* 3 */}
      <AboutEditorial content={about} />

      {/* 4 */}
      <FounderMessage
        content={{
          name: founder.data.name,
          role: founder.data.role,
          portrait: founder.data.portrait,
          salutation: founder.data.salutation,
          quote: founder.data.quote,
          body: founder.body.replace(/\*\*/g, ''),
          href: '/about/founder',
        }}
      />

      {/* 5 */}
      <PrincipalMessage
        content={{
          name: principal.data.name,
          role: principal.data.role,
          portrait: principal.data.portrait,
          salutation: principal.data.salutation,
          quote: principal.data.quote,
          body: principal.body,
          href: '/about/principal',
        }}
      />

      {/* 6 */}
      <WhyChooseUs content={why} />

      {/* 7 */}
      <AcademicExcellence
        stages={stages.stages}
        eyebrow={stages.eyebrow}
        title={stages.title}
        description={stages.description}
      />

      {/* 8 */}
      <CurriculumSection
        eyebrow={curriculum.eyebrow}
        title={curriculum.title}
        lead={curriculum.lead}
        groups={curriculum.subjectGroups}
        boards={curriculum.boards}
      />

      {/* 9 */}
      <CampusLifeIntro
        eyebrow={facilities.eyebrow}
        title={facilities.title}
        lead={facilities.lead}
        image={{ src: '/images/campus/campus-2.jpg', alt: 'The campus of New Apostolic English High School' }}
      />

      {/* 10 */}
      <InfrastructureSection items={getFacilitiesByCategory('infrastructure')} />

      {/* 11 */}
      <LaboratoriesSection items={getFacilitiesByCategory('laboratories')} />

      {/* 12 */}
      <LibrarySection item={library} />

      {/* 13 */}
      <SportsSection item={sports} disciplines={facilities.sports} />

      {/* 14 */}
      <ArtsSection
        item={arts}
        supporting={[
          {
            src: '/images/gallery/annual-play-choo-manter.jpg',
            alt: 'Students performing the annual production Choo Manter',
            caption: 'Annual production — Choo Manter',
          },
          {
            src: '/images/gallery/patriotic-singing-medal.jpg',
            alt: 'Students with medals from a patriotic singing competition',
            caption: 'Patriotic singing competition',
          },
        ]}
      />

      {/* 15 */}
      <StudentDevelopmentSection
        eyebrow={development.eyebrow}
        title={development.title}
        lead={development.lead}
        pillars={development.pillars}
      />

      {/* 16 */}
      <AchievementsSection
        items={achievements.items}
        eyebrow={achievements.eyebrow}
        title={achievements.title}
        description={achievements.description}
      />

      {/* 17 */}
      <GalleryPreview
        images={gallery}
        eyebrow="Gallery"
        title="A school year, photographed"
        description="Every photograph on this site was taken on our own campus. Select any image to open it."
      />

      {/* 18 */}
      <VideoSection
        eyebrow={videos.eyebrow}
        title={videos.title}
        description={videos.description}
        items={videos.items}
        posters={{
          'apostolic-sports-2025': '/images/campus/campus-2.jpg',
          'ucn-junior-college-feature': '/images/academics/junior-college-students.jpg',
        }}
      />

      {/* 19 */}
      <UpcomingEvents
        events={events}
        eyebrow="What's on"
        title="Upcoming events"
        description="The next dates in the school calendar, from national days to the annual sports meet."
        note="Calendar dates are provisional and confirmed by circular from the school office."
      />

      {/* 20 */}
      <LatestNews
        news={news}
        eyebrow="Newsroom"
        title="Latest from the school"
        description="Results, fixtures, workshops and the moments worth recording."
      />

      {/* 21 */}
      <Testimonials
        items={testimonials.items}
        eyebrow={testimonials.eyebrow}
        title={testimonials.title}
        note={testimonials.note}
      />

      {/* 22 */}
      <AdmissionProcess
        steps={admissions.steps}
        eyebrow={admissions.eyebrow}
        title={admissions.title}
        lead={admissions.lead}
        showDetail={false}
      />

      {/* 23 */}
      <Faqs
        items={faqs.items}
        eyebrow={faqs.eyebrow}
        title={faqs.title}
        description={faqs.description}
        limit={6}
      />

      {/* 24 */}
      <CallToAction content={cta} />

      {/* 25 — the premium footer is rendered by the root layout. */}
    </>
  )
}
