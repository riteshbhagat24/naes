import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertCircle, Download, Phone } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getFees } from '@/lib/data'
import { siteConfig } from '@/config/site'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { formatCurrencyINR } from '@/utils/format'

export const metadata: Metadata = buildMetadata({
  title: 'Fees & Uniform',
  description:
    'Approximate book-set costs by grade, the complete formal and sports uniform requirement, and how fees are paid at New Apostolic English High School, Nagpur.',
  path: '/admissions/fees',
})

export default function FeesPage() {
  const fees = getFees()

  return (
    <>
      <PageHero
        eyebrow={fees.eyebrow}
        title={fees.title}
        lead={fees.lead}
        trail={[
          { title: 'Admissions', href: '/admissions' },
          { title: 'Fees & Uniform', href: '/admissions/fees' },
        ]}
      />

      {/* ------------------------------------------------ notice */}
      <Section tone="default" size="sm">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-5 rounded-2xl border border-primary/25 bg-primary/[0.05] p-7 sm:flex-row sm:items-center sm:gap-8">
              <AlertCircle className="size-6 shrink-0 text-primary" aria-hidden />
              <p className="flex-1 text-body-sm text-pretty">{fees.notice}</p>
              <Button asChild variant="outline" size="md" className="shrink-0">
                <a href={siteConfig.contact.phoneHref}>
                  <Phone aria-hidden />
                  Call the office
                </a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------ books */}
      <Section tone="default" size="md">
        <Container>
          <SectionHeader
            eyebrow="Books"
            title={fees.books.title}
            description={fees.books.note}
            className="mb-10"
          />

          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[26rem] border-collapse text-left">
                <caption className="sr-only">
                  Approximate cost of the complete book set by grade
                </caption>
                <thead>
                  <tr className="bg-muted">
                    <th
                      scope="col"
                      className="px-6 py-4 text-caption font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      Grade
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-right text-caption font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      Approximate cost
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {fees.books.rows.map((row) => (
                    <tr key={row.grade} className="bg-surface">
                      <th scope="row" className="px-6 py-4 font-display text-body font-semibold">
                        {row.grade}
                      </th>
                      <td className="px-6 py-4 text-right tabular-nums text-body">
                        {formatCurrencyINR(row.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <p className="mt-5 text-caption text-muted-foreground">
            Book sets are collected from the school office. Grades not listed are confirmed by
            circular at the start of the session.
          </p>
        </Container>
      </Section>

      {/* ------------------------------------------------ uniform */}
      <Section tone="muted" size="lg">
        <Container>
          <SectionHeader
            eyebrow="Uniform"
            title={fees.uniform.title}
            description={fees.uniform.intro}
            className="mb-12"
          />

          <RevealGroup as="ul" gap={0.06} className="grid gap-5 md:grid-cols-2">
            {fees.uniform.groups.map((group) => (
              <RevealItem
                as="li"
                key={group.group}
                className="rounded-2xl border border-border bg-surface p-7"
              >
                <h3 className="font-display text-h5 font-semibold">{group.group}</h3>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-primary">
                      Formal
                    </dt>
                    <dd className="mt-1.5 text-body-sm text-muted-foreground text-pretty">
                      {group.formal}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-primary">
                      Sports
                    </dt>
                    <dd className="mt-1.5 text-body-sm text-muted-foreground text-pretty">
                      {group.sports}
                    </dd>
                  </div>
                </dl>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-border bg-surface p-7">
              <h3 className="eyebrow mb-5">Uniform rules</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {fees.uniform.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-body-sm">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------ payment */}
      <Section tone="default" size="lg">
        <Container>
          <SectionHeader eyebrow="Payment" title={fees.payment.title} className="mb-12" />

          <RevealGroup
            as="ul"
            gap={0.06}
            className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {fees.payment.items.map((item) => (
              <RevealItem as="li" key={item.title} className="bg-background p-7">
                <h3 className="font-display text-h6 font-semibold">{item.title}</h3>
                <p className="mt-3 text-body-sm text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/downloads">
                <Download aria-hidden />
                Download the uniform guide
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/admissions/enquiry">Begin an admission enquiry</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
