import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { ContactForm } from '@/features/contact/contact-form'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description: `New Apostolic English High School, ${siteConfig.address.formatted}. Telephone ${siteConfig.contact.phone}. Office hours Monday to Saturday, 9:00 AM to 4:00 PM.`,
  path: '/contact',
  image: '/images/campus/campus-4.jpg',
  keywords: ['school contact Nagpur', 'Rameshwari school address', 'Kukde Layout school'],
})

const CHANNELS = [
  {
    icon: Phone,
    title: 'Telephone',
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
    note: 'The fastest way to reach the school office during working hours.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'Message the office',
    href: siteConfig.contact.whatsapp,
    note: 'For quick questions about admissions, timings or documents.',
  },
  {
    icon: Mail,
    title: 'Email',
    value: siteConfig.contact.email,
    href: siteConfig.contact.emailHref,
    note: 'For anything that needs a written record or an attachment.',
  },
  {
    icon: MapPin,
    title: 'Visit',
    value: 'Kukde Layout, Rameshwari',
    href: siteConfig.geo.mapsLink,
    note: 'Opposite the Railway Police Headquarters, Nagpur 440027.',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come and talk to us"
        lead="Call, write, or simply arrive on a working morning. Whichever you choose, a person will answer."
        trail={[{ title: 'Contact', href: '/contact' }]}
        image={{
          src: '/images/campus/campus-4.jpg',
          alt: 'The campus of New Apostolic English High School, Nagpur',
        }}
      />

      <Section tone="default" size="md">
        <Container>
          <RevealGroup
            as="ul"
            gap={0.06}
            className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {CHANNELS.map((channel) => (
              <RevealItem as="li" key={channel.title} className="bg-background p-7">
                <a
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex h-full flex-col"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                    <channel.icon className="size-[1.15rem]" aria-hidden />
                  </span>
                  <span className="mt-5 block text-caption uppercase tracking-[0.12em] text-muted-foreground">
                    {channel.title}
                  </span>
                  <span className="mt-2 block font-display text-h6 font-semibold transition-colors duration-300 group-hover:text-primary">
                    {channel.value}
                  </span>
                  <span className="mt-2.5 block flex-1 text-body-sm text-muted-foreground text-pretty">
                    {channel.note}
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="muted" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="Write to us"
                title="Ask us anything"
                description="Feel free to ask a question, or simply leave a comment. The school office reads every message."
                className="mb-10"
              />
              <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <Reveal>
                <div className="rounded-2xl border border-border bg-surface p-7">
                  <h2 className="eyebrow mb-5">School hours</h2>
                  <dl className="divide-y divide-border border-y border-border">
                    {siteConfig.hours.map((entry) => (
                      <div
                        key={entry.label}
                        className="flex items-baseline justify-between gap-6 py-3.5"
                      >
                        <dt className="text-body-sm text-muted-foreground">{entry.label}</dt>
                        <dd className="text-right text-body-sm font-medium">{entry.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 flex items-start gap-2.5 text-body-sm text-muted-foreground">
                    <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    Campus visits are best arranged in advance so a member of staff is free to show
                    you round.
                  </p>
                  <Button asChild size="md" full className="mt-6">
                    <Link href="/admissions/enquiry">Begin an admission enquiry</Link>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                  <iframe
                    src={siteConfig.geo.mapsEmbed}
                    title="Location of New Apostolic English High School on Google Maps"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-[20rem] w-full border-0"
                  />
                  <address className="flex items-start gap-2.5 bg-surface p-5 text-body-sm not-italic text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {siteConfig.address.formatted}
                  </address>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
