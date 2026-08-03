import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Download, Phone } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getAdmissionProcess, getFaqs, getStages } from '@/lib/data'
import { siteConfig } from '@/config/site'
import { PageHero } from '@/components/ui/page-hero'
import { AdmissionProcess } from '@/components/sections/admission-process'
import { Faqs } from '@/components/sections/faqs'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'

export const metadata: Metadata = buildMetadata({
  title: 'Admissions',
  description: `Admissions for the ${siteConfig.academicSession} session are open at New Apostolic English High School, Nagpur — Nursery to Class XII, plus BBA and BCCA. Five clear steps, and a reply within two working days.`,
  path: '/admissions',
  image: '/images/gallery/pre-primary-banana-day.jpg',
  keywords: ['school admission Nagpur', 'nursery admission Nagpur', 'Class XI admission Nagpur'],
})

export default function AdmissionsPage() {
  const process = getAdmissionProcess()
  const faqs = getFaqs()
  const stages = getStages()

  return (
    <>
      <PageHero
        eyebrow={process.eyebrow}
        title={process.title}
        lead={process.lead}
        trail={[{ title: 'Admissions', href: '/admissions' }]}
        image={{
          src: '/images/gallery/pre-primary-banana-day.jpg',
          alt: 'Pre-primary children taking part in an activity day at the school',
        }}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" variant="light">
            <Link href="/admissions/enquiry">
              Begin an enquiry
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <a href={siteConfig.contact.phoneHref}>
              <Phone aria-hidden />
              {siteConfig.contact.phone}
            </a>
          </Button>
        </div>
      </PageHero>

      <Section tone="default" size="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {process.intro.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 20)}
                className={
                  index === 0
                    ? 'font-display text-lead font-medium text-pretty'
                    : 'text-body text-muted-foreground text-pretty'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <AdmissionProcess
        steps={process.steps}
        eyebrow="The process"
        title="Five steps, and a person on the other end of each one"
        lead="We keep it short and human. There is no entrance examination for the lower grades."
      />

      <Section tone="muted" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="Eligibility"
                title="Which grade is right for your child"
                className="mb-8"
              />
              <ul className="divide-y divide-border border-y border-border">
                {process.eligibility.map((row) => (
                  <li key={row.grade} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <span className="font-display text-body font-semibold">{row.grade}</span>
                    <span className="text-body-sm text-muted-foreground text-pretty">
                      {row.criteria}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeader
                eyebrow="Documents"
                title="What to bring with you"
                className="mb-8"
              />
              <ul className="space-y-3">
                {process.documents.map((document) => (
                  <li
                    key={document}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-body-sm"
                  >
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {document}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="md" className="mt-6">
                <Link href="/downloads">
                  <Download aria-hidden />
                  Download the checklist
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" size="lg" className="border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Where to apply"
            title="Every stage is open for the current session"
            description="Places in each grade are limited and are offered in the order enquiries are received and completed."
            className="mb-12"
          />
          <RevealGroup as="ul" gap={0.05} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stages.stages.map((stage) => (
              <RevealItem as="li" key={stage.slug}>
                <Link
                  href={`/academics/${stage.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-[border-color,transform] duration-500 ease-premium hover:-translate-y-1 hover:border-primary/40"
                >
                  <p className="text-caption uppercase tracking-[0.12em] text-primary">
                    {stage.ageRange}
                  </p>
                  <h3 className="mt-3 font-display text-h5 font-semibold">{stage.name}</h3>
                  <p className="mt-2 flex-1 text-body-sm text-muted-foreground">
                    {stage.grades.join(' · ')}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-primary">
                    Details
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Faqs
        items={faqs.items}
        eyebrow={faqs.eyebrow}
        title={faqs.title}
        description={faqs.description}
        limit={8}
      />
    </>
  )
}
