import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { getMessage } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { MessagePage } from '@/components/sections/message-page'

export const metadata: Metadata = buildMetadata({
  title: "The Founder's Vision",
  description:
    'The founding vision of New Apostolic English High School, established under the National Apostolic Church Education Society by the late Bishop Adv. Dr. Vincent S. Bower.',
  path: '/about/founder',
  image: '/images/people/founder-bishop-vincent-s-bower.jpg',
})

export default function FounderPage() {
  const message = getMessage('founder')
  if (!message) notFound()

  return (
    <>
      <PageHero
        eyebrow="The founder's vision"
        title="Love thy neighbour as thyself"
        lead="The argument this school was founded on, and the standard it is still measured against."
        trail={[
          { title: 'About', href: '/about' },
          { title: "Founder's Vision", href: '/about/founder' },
        ]}
        image={{
          src: '/images/people/founder-bishop-vincent-s-bower.jpg',
          alt: 'Portrait of the late Bishop Adv. Dr. Vincent S. Bower, founder of the school',
        }}
      />
      <MessagePage
        message={message.data}
        body={message.body}
        related={[
          {
            title: "Principal's Message",
            href: '/about/principal',
            description: 'Ms. Vinita V. Bower on the learning community the school has built.',
          },
          {
            title: 'Our History',
            href: '/about/history',
            description: 'How the institution grew from a founding vision into a full pathway.',
          },
          {
            title: 'Management',
            href: '/about/management',
            description: 'The Society, the leadership and the teaching staff of each section.',
          },
        ]}
      />
    </>
  )
}
