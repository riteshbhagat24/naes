import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import type { ProcessStep } from '@/types'

/**
 * Admission process.
 *
 * A ruled, numbered sequence with the heading pinned on the left at desktop
 * widths — the steps scroll past a fixed statement of intent, which reads as a
 * single argument rather than five unrelated cards.
 */
export function AdmissionProcess({
  steps,
  eyebrow,
  title,
  lead,
  showDetail = true,
}: {
  steps: ProcessStep[]
  eyebrow: string
  title: string
  lead: string
  showDetail?: boolean
}) {
  return (
    <Section tone="default" size="lg">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
              <SectionHeader eyebrow={eyebrow} title={title} description={lead} as="h2" />
              <Reveal delay={0.16}>
                <Button asChild size="lg" className="mt-9">
                  <Link href="/admissions/enquiry">
                    Begin an enquiry
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </Reveal>
            </div>
          </div>

          <ol className="lg:col-span-8">
            {steps.map((step, index) => (
              <li
                key={step.step}
                className="border-t border-border py-8 last:border-b sm:py-10"
              >
                <Reveal delay={index * 0.05}>
                  <div className="flex gap-6 sm:gap-9">
                    <span
                      aria-hidden
                      className="font-display text-h3 font-bold leading-none tabular-nums text-primary/25"
                    >
                      {String(step.step).padStart(2, '0')}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-h4 font-semibold text-balance">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-body-lg text-foreground/80 text-pretty">
                        {step.description}
                      </p>

                      {showDetail ? (
                        <ul className="mt-5 space-y-2.5">
                          {step.detail.map((line) => (
                            <li
                              key={line.slice(0, 24)}
                              className="flex gap-3 text-body-sm text-muted-foreground text-pretty"
                            >
                              <span
                                aria-hidden
                                className="mt-2.5 size-1 shrink-0 rounded-full bg-primary"
                              />
                              {line}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
