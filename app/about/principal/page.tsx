import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { getMessage } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { MessagePage } from '@/components/sections/message-page'

export const metadata: Metadata = buildMetadata({
  title: "Principal's Message",
  description:
    "A message from Ms. Vinita V. Bower, Principal of New Apostolic English High School and Dr. Bower Apostolic Junior College, Nagpur.",
  path: '/about/principal',
  image: '/images/people/principal-vinita-v-bower.jpg',
})

export default function PrincipalPage() {
  const message = getMessage('principal')
  if (!message) notFound()

  return (
    <>
      <PageHero
        eyebrow="From the Principal's desk"
        title="Develop a passion for learning"
        lead="Ms. Vinita V. Bower, Principal of New Apostolic English High School and Dr. Bower Apostolic Junior College."
        trail={[
          { title: 'About', href: '/about' },
          { title: "Principal's Message", href: '/about/principal' },
        ]}
      />
      <MessagePage
        message={message.data}
        body={message.body}
        related={[
          {
            title: 'From the Head Mistress',
            href: '/about/faculty',
            description: 'Dr. Vandana P. Benjamin on the all-round personality the school builds.',
          },
          {
            title: 'Academics',
            href: '/academics',
            description: 'The full learning pathway, from Nursery to the degree programmes.',
          },
          {
            title: 'Admissions',
            href: '/admissions',
            description: 'Five clear steps, and a person on the other end of each one.',
          },
        ]}
      />
    </>
  )
}
