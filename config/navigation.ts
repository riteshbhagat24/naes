import type { FooterColumn, NavItem, QuickLink } from '@/types'

/**
 * Single source of truth for the information architecture.
 * The header mega-menu, the mobile drawer, the sitemap route, the search index
 * and the breadcrumb resolver all read from this structure, so a page can never
 * exist without being reachable.
 */
export const mainNavigation: NavItem[] = [
  {
    title: 'About',
    href: '/about',
    description: 'The people, the principles and the history behind the institution.',
    featured: {
      title: "Principal's Desk",
      description:
        'Ms. Vinita V. Bower on the learning community the school has built in South Nagpur.',
      href: '/about/principal',
      image: '/images/people/principal-vinita-v-bower.jpg',
    },
    groups: [
      {
        title: 'The Institution',
        items: [
          { title: 'Overview', href: '/about', description: 'Who we are, in brief' },
          { title: 'Our History', href: '/about/history', description: 'From a founding vision to today' },
          { title: 'Vision & Mission', href: '/about/vision-mission', description: 'What we are working towards' },
          {
            title: 'Educational Philosophy',
            href: '/about/philosophy',
            description: 'How we believe children learn best',
          },
        ],
      },
      {
        title: 'Leadership',
        items: [
          { title: 'Management', href: '/about/management', description: 'The society and its office bearers' },
          {
            title: "Founder's Vision",
            href: '/about/founder',
            description: 'The message that began the school',
          },
          { title: "Principal's Message", href: '/about/principal', description: 'A word from the Principal' },
          { title: 'Our Faculty', href: '/about/faculty', description: 'The teachers who make it work' },
        ],
      },
    ],
  },
  {
    title: 'Academics',
    href: '/academics',
    description: 'A continuous English-medium pathway from Nursery to Class XII and beyond.',
    featured: {
      title: 'Academic Excellence',
      description:
        'Maharashtra State Board rigour, a CBSE-informed foundation programme, and a laboratory-led approach to science.',
      href: '/academics',
      image: '/images/academics/high-school-students.jpg',
    },
    groups: [
      {
        title: 'Stages',
        items: [
          { title: 'Academics Overview', href: '/academics', description: 'The full learning pathway' },
          { title: 'Pre-Primary', href: '/academics/pre-primary', description: 'Nursery, LKG & UKG' },
          { title: 'Primary School', href: '/academics/primary', description: 'Grades I – V' },
          { title: 'High School', href: '/academics/high-school', description: 'Grades VI – X' },
          { title: 'Junior College', href: '/academics/junior-college', description: 'Grades XI – XII' },
          { title: 'Degree Programmes', href: '/academics/degree-programmes', description: 'BBA & BCCA' },
        ],
      },
      {
        title: 'Learning',
        items: [
          { title: 'Curriculum', href: '/academics/curriculum', description: 'Subjects, boards and assessment' },
          {
            title: 'Student Development',
            href: '/academics/student-development',
            description: 'Beyond the syllabus',
          },
          { title: 'Achievements', href: '/achievements', description: 'What our students have won' },
        ],
      },
    ],
  },
  {
    title: 'Admissions',
    href: '/admissions',
    description: 'Admissions for the 2026–27 academic session are open.',
    featured: {
      title: 'Begin an Enquiry',
      description:
        'Tell us about your child and the grade you are seeking. Our admissions office responds within two working days.',
      href: '/admissions/enquiry',
      image: '/images/gallery/pre-primary-banana-day.jpg',
      cta: 'Start the form',
    },
    groups: [
      {
        title: 'Apply',
        items: [
          { title: 'Admissions Overview', href: '/admissions', description: 'Everything in one place' },
          { title: 'Admission Process', href: '/admissions/process', description: 'Five clear steps' },
          { title: 'Enquiry Form', href: '/admissions/enquiry', description: 'Register your interest' },
          { title: 'Fees & Uniform', href: '/admissions/fees', description: 'Books, uniform and payment' },
          { title: 'Frequently Asked', href: '/admissions/faqs', description: 'Timings, safety, transport' },
        ],
      },
      {
        title: 'Documents',
        items: [
          { title: 'Downloads', href: '/downloads', description: 'Forms, lists and guides' },
          { title: 'Circulars', href: '/circulars', description: 'Official notices to parents' },
          {
            title: 'Mandatory Disclosure',
            href: '/mandatory-disclosure',
            description: 'Statutory information',
          },
        ],
      },
    ],
  },
  {
    title: 'Campus Life',
    href: '/campus-life',
    description: 'Laboratories, library, playing fields, the arts and everything between.',
    featured: {
      title: 'Take the Campus Tour',
      description: 'Walk the corridors, laboratories and playing fields before you visit in person.',
      href: '/campus-life/tour',
      image: '/images/campus/campus-2.jpg',
      cta: 'Open the tour',
    },
    groups: [
      {
        title: 'Facilities',
        items: [
          { title: 'Campus Overview', href: '/campus-life', description: 'Life on campus' },
          { title: 'Infrastructure', href: '/campus-life/infrastructure', description: 'The buildings and grounds' },
          { title: 'Facilities', href: '/campus-life/facilities', description: 'Canteen, halls, safety' },
          { title: 'Laboratories', href: '/campus-life/laboratories', description: 'Physics, computer, robotics' },
          { title: 'Library', href: '/campus-life/library', description: 'Reading at the centre' },
        ],
      },
      {
        title: 'Beyond the Classroom',
        items: [
          { title: 'Sports', href: '/campus-life/sports', description: 'Eight disciplines, one field' },
          { title: 'Arts & Music', href: '/campus-life/arts', description: 'Theatre, music and craft' },
          { title: 'Virtual Tour', href: '/campus-life/tour', description: 'Explore the campus map' },
        ],
      },
    ],
  },
  {
    title: 'Community',
    href: '/gallery',
    description: 'The photographs, films, news and events that record a year at school.',
    featured: {
      title: 'Apostolic Sports 2025',
      description: 'The full film of our annual sports meet, streamed from the school ground.',
      href: '/videos',
      image: '/images/gallery/state-level-throwball.jpg',
      cta: 'Watch the film',
    },
    groups: [
      {
        title: 'Media',
        items: [
          { title: 'Photo Gallery', href: '/gallery', description: 'Curated albums by year' },
          { title: 'Video Gallery', href: '/videos', description: 'Films and press features' },
          { title: 'Achievements', href: '/achievements', description: 'Honours and medals' },
        ],
      },
      {
        title: 'Updates',
        items: [
          { title: 'News', href: '/news', description: 'What is happening now' },
          { title: 'Events', href: '/events', description: 'The school calendar' },
          { title: 'Circulars', href: '/circulars', description: 'Notices to parents' },
          { title: 'Careers', href: '/careers', description: 'Teach with us' },
        ],
      },
    ],
  },
  {
    title: 'Contact',
    href: '/contact',
  },
]

/** Compact links pinned into the announcement bar and the mobile drawer. */
export const quickLinks: QuickLink[] = [
  { title: 'Admission Enquiry', href: '/admissions/enquiry', icon: 'sparkles' },
  { title: 'Fees & Uniform', href: '/admissions/fees', icon: 'receipt' },
  { title: 'Downloads', href: '/downloads', icon: 'download' },
  { title: 'Circulars', href: '/circulars', icon: 'megaphone' },
  { title: 'Careers', href: '/careers', icon: 'briefcase' },
  { title: 'Contact', href: '/contact', icon: 'map-pin' },
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Institution',
    links: [
      { title: 'About the School', href: '/about' },
      { title: 'Our History', href: '/about/history' },
      { title: 'Vision & Mission', href: '/about/vision-mission' },
      { title: 'Educational Philosophy', href: '/about/philosophy' },
      { title: 'Management', href: '/about/management' },
      { title: 'Faculty', href: '/about/faculty' },
    ],
  },
  {
    title: 'Academics',
    links: [
      { title: 'Pre-Primary', href: '/academics/pre-primary' },
      { title: 'Primary School', href: '/academics/primary' },
      { title: 'High School', href: '/academics/high-school' },
      { title: 'Junior College', href: '/academics/junior-college' },
      { title: 'Degree Programmes', href: '/academics/degree-programmes' },
      { title: 'Curriculum', href: '/academics/curriculum' },
    ],
  },
  {
    title: 'Admissions',
    links: [
      { title: 'Admission Process', href: '/admissions/process' },
      { title: 'Enquiry Form', href: '/admissions/enquiry' },
      { title: 'Fees & Uniform', href: '/admissions/fees' },
      { title: 'FAQs', href: '/admissions/faqs' },
      { title: 'Downloads', href: '/downloads' },
      { title: 'Mandatory Disclosure', href: '/mandatory-disclosure' },
    ],
  },
  {
    title: 'Campus & Community',
    links: [
      { title: 'Infrastructure', href: '/campus-life/infrastructure' },
      { title: 'Laboratories', href: '/campus-life/laboratories' },
      { title: 'Sports', href: '/campus-life/sports' },
      { title: 'Photo Gallery', href: '/gallery' },
      { title: 'Events', href: '/events' },
      { title: 'Careers', href: '/careers' },
    ],
  },
]

export const legalLinks = [
  { title: 'Privacy Policy', href: '/privacy-policy' },
  { title: 'Terms of Use', href: '/terms' },
  { title: 'Sitemap', href: '/sitemap' },
  { title: 'Contact', href: '/contact' },
]

/**
 * Flattened index of every reachable page — powers the search overlay,
 * the HTML sitemap and the XML sitemap.
 */
export function flattenNavigation(): Array<{ title: string; href: string; section: string }> {
  const out: Array<{ title: string; href: string; section: string }> = [
    { title: 'Home', href: '/', section: 'Home' },
  ]
  for (const item of mainNavigation) {
    out.push({ title: item.title, href: item.href, section: item.title })
    for (const group of item.groups ?? []) {
      for (const link of group.items) {
        if (!out.some((o) => o.href === link.href)) {
          out.push({ title: link.title, href: link.href, section: item.title })
        }
      }
    }
  }
  for (const extra of [
    { title: 'News', href: '/news', section: 'Community' },
    { title: 'Events', href: '/events', section: 'Community' },
    { title: 'Downloads', href: '/downloads', section: 'Admissions' },
    { title: 'Circulars', href: '/circulars', section: 'Admissions' },
    { title: 'Careers', href: '/careers', section: 'Community' },
    { title: 'Achievements', href: '/achievements', section: 'Academics' },
    { title: 'Video Gallery', href: '/videos', section: 'Community' },
    { title: 'Mandatory Disclosure', href: '/mandatory-disclosure', section: 'Admissions' },
    { title: 'Privacy Policy', href: '/privacy-policy', section: 'Legal' },
    { title: 'Terms of Use', href: '/terms', section: 'Legal' },
    { title: 'Sitemap', href: '/sitemap', section: 'Legal' },
    { title: 'Search', href: '/search', section: 'Legal' },
  ]) {
    if (!out.some((o) => o.href === extra.href)) out.push(extra)
  }
  return out
}
