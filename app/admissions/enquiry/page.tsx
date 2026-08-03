import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getAdmissionProcess } from '@/lib/data'
import { siteConfig } from '@/config/site'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { EnquiryForm } from '@/features/admissions/enquiry-form'

export const metadata: Metadata = buildMetadata({
  title: 'Admission Enquiry',
  description: `Register your interest in a place at New Apostolic English High School, Nagpur for the ${siteConfig.academicSession} session. Our admissions office replies within two working days.`,
  path: '/admissions/enquiry',
})

export default function EnquiryPage() {
  const process = getAdmissionProcess()

  return (
    <>
      <PageHero
        eyebrow={`Admissions ${siteConfig.academicSession}`}
        title="Begin an admission enquiry"
        lead="Tell us about your child and the grade you are seeking. It takes about two minutes, and a person reads every submission."
        trail={[
          { title: 'Admissions', href: '/admissions' },
          { title: 'Enquiry', href: '/admissions/enquiry' },
        ]}
      />

      <Section tone="default" size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>

            <aside className="lg:col-span-5 lg:col-start-8">
              <div className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)] space-y-6">
                <div className="rounded-2xl border border-border bg-muted p-7">
                  <h2 className="font-display text-h5 font-semibold">Prefer to talk?</h2>
                  <p className="mt-2.5 text-body-sm text-muted-foreground text-pretty">
                    The school office answers the phone during working hours and will tell you
                    plainly whether we are the right school for your child.
                  </p>
                  <ul className="mt-6 space-y-4 text-body-sm">
                    <li className="flex gap-3">
                      <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <a href={siteConfig.contact.phoneHref} className="link-underline">
                        {siteConfig.contact.phone}
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <a href={siteConfig.contact.emailHref} className="link-underline break-all">
                        {siteConfig.contact.email}
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <a
                        href={siteConfig.geo.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        {siteConfig.address.formatted}
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <span>Office: Monday – Saturday, 9:00 AM – 4:00 PM</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border p-7">
                  <h2 className="font-display text-h5 font-semibold">What happens next</h2>
                  <ol className="mt-5 space-y-4">
                    {process.steps.slice(0, 4).map((step) => (
                      <li key={step.step} className="flex gap-4">
                        <span className="font-display text-caption font-bold tabular-nums text-primary/60">
                          {String(step.step).padStart(2, '0')}
                        </span>
                        <span>
                          <span className="block font-display text-body font-semibold">
                            {step.title}
                          </span>
                          <span className="mt-1 block text-body-sm text-muted-foreground text-pretty">
                            {step.description}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 text-caption text-muted-foreground">
                    See the{' '}
                    <Link href="/admissions/process" className="link-underline text-primary">
                      full admission process
                    </Link>
                    , or read the{' '}
                    <Link href="/admissions/faqs" className="link-underline text-primary">
                      frequently asked questions
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
