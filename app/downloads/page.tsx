import type { Metadata } from 'next'
import { Download, FileText } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getDownloads } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { Badge } from '@/components/ui/badge'
import { formatDate, groupBy } from '@/utils/format'

export const metadata: Metadata = buildMetadata({
  title: 'Downloads',
  description:
    'Admission forms, the document checklist, book set details, the uniform guide, the academic calendar and campus policies — all as PDFs.',
  path: '/downloads',
})

export default function DownloadsPage() {
  const downloads = getDownloads()
  const grouped = groupBy(downloads.items, (item) => item.category)

  return (
    <>
      <PageHero
        eyebrow={downloads.eyebrow}
        title={downloads.title}
        lead={downloads.description}
        trail={[{ title: 'Downloads', href: '/downloads' }]}
      />

      {Object.entries(grouped).map(([category, items], index) => (
        <Section key={category} tone={index % 2 === 0 ? 'default' : 'muted'} size="md">
          <Container>
            <SectionHeader eyebrow={`0${index + 1}`} title={category} className="mb-10" />

            <RevealGroup as="ul" gap={0.05} className="grid gap-4 md:grid-cols-2">
              {items.map((item) => (
                <RevealItem as="li" key={item.id}>
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-start gap-5 rounded-2xl border border-border bg-surface p-6 transition-[border-color,transform] duration-500 ease-premium hover:-translate-y-1 hover:border-primary/40"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-h6 font-semibold transition-colors duration-300 group-hover:text-primary">
                          {item.title}
                        </span>
                        <Badge variant="outline" size="sm">
                          {item.format} · {item.size}
                        </Badge>
                      </span>
                      <span className="mt-2 block text-body-sm text-muted-foreground text-pretty">
                        {item.description}
                      </span>
                      <span className="mt-3 block text-caption text-muted-foreground">
                        Updated {formatDate(item.updated, 'medium')}
                      </span>
                    </span>
                    <Download
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                    />
                    <span className="sr-only">Opens in a new tab</span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ))}
    </>
  )
}
