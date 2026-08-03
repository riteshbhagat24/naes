import type { Metadata } from 'next'
import { Info } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getDisclosure } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'

export const metadata: Metadata = buildMetadata({
  title: 'Mandatory Disclosure',
  description:
    'Statutory and general information about New Apostolic English High School and Dr. Bower Apostolic Junior College, Nagpur, published in the interest of transparency.',
  path: '/mandatory-disclosure',
})

export default function MandatoryDisclosurePage() {
  const disclosure = getDisclosure()

  return (
    <>
      <PageHero
        eyebrow={disclosure.eyebrow}
        title={disclosure.title}
        lead={disclosure.lead}
        trail={[{ title: 'Mandatory Disclosure', href: '/mandatory-disclosure' }]}
      />

      <Section tone="default" size="lg">
        <Container>
          <Reveal>
            <p className="mb-14 flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/[0.05] p-6 text-body-sm text-pretty">
              <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              {disclosure.notice}
            </p>
          </Reveal>

          <div className="space-y-16">
            {disclosure.sections.map((section, index) => (
              <section key={section.title}>
                <Reveal delay={index * 0.04}>
                  <h2 className="font-display text-h3 font-semibold text-balance">
                    {section.title}
                  </h2>
                  <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
                    <table className="w-full min-w-[32rem] border-collapse text-left">
                      <caption className="sr-only">{section.title}</caption>
                      <tbody className="divide-y divide-border">
                        {section.rows.map((row) => (
                          <tr key={row.label} className="bg-surface">
                            <th
                              scope="row"
                              className="w-[38%] px-6 py-4 align-top font-sans text-body-sm font-semibold"
                            >
                              {row.label}
                            </th>
                            <td className="px-6 py-4 align-top text-body-sm text-muted-foreground text-pretty">
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
