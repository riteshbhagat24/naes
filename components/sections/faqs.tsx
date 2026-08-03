import Link from 'next/link'
import { Phone } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Container, Section } from '@/components/ui/section'
import { Reveal, TextReveal } from '@/components/ui/reveal'
import { JsonLd } from '@/components/ui/json-ld'
import { faqSchema } from '@/lib/schema'
import { siteConfig } from '@/config/site'
import type { FaqItem } from '@/types'

/**
 * Frequently asked questions.
 *
 * The heading and the escalation route stay pinned on the left; the questions
 * are a single Radix accordion, and the same items are emitted as FAQPage
 * JSON-LD so they can surface directly in search results.
 */
export function Faqs({
  items,
  eyebrow,
  title,
  description,
  limit,
}: {
  items: FaqItem[]
  eyebrow: string
  title: string
  description: string
  limit?: number
}) {
  const shown = limit ? items.slice(0, limit) : items

  return (
    <Section tone="surface" size="lg" className="border-t border-border">
      <JsonLd data={faqSchema(shown)} id="faq-schema" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
              <Reveal>
                <p className="eyebrow mb-4">{eyebrow}</p>
              </Reveal>
              <TextReveal as="h2" text={title} className="text-h3" />
              <Reveal delay={0.08}>
                <p className="mt-5 text-body text-muted-foreground text-pretty">{description}</p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-8 rounded-2xl border border-border bg-muted p-6">
                  <p className="font-display text-h6 font-semibold">Still unsure?</p>
                  <p className="mt-2 text-body-sm text-muted-foreground text-pretty">
                    The school office answers the phone during working hours and will tell you
                    plainly whether we are the right school for your child.
                  </p>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="mt-4 inline-flex items-center gap-2 font-display text-body font-semibold text-primary"
                  >
                    <Phone className="size-4" aria-hidden />
                    <span className="link-underline">{siteConfig.contact.phone}</span>
                  </a>
                  <p className="mt-4 text-caption text-muted-foreground">
                    Or{' '}
                    <Link href="/contact" className="link-underline font-medium text-primary">
                      write to us
                    </Link>
                    .
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-t border-border">
              {shown.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
                  <AccordionTrigger>
                    <span>
                      <span className="mr-3 font-sans text-caption font-semibold uppercase tracking-[0.12em] text-primary/70">
                        {item.category}
                      </span>
                      <span className="mt-2 block">{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  )
}
