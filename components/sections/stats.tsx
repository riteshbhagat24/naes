import { Container, Section } from '@/components/ui/section'
import { Counter } from '@/components/ui/counter'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'

export interface StatsContent {
  eyebrow: string
  title: string
  description: string
  items: Array<{ value: number; suffix?: string; prefix?: string; label: string; detail: string }>
}

/**
 * Achievements counter band.
 *
 * Deliberately typographic — oversized numerals on hairline-separated columns,
 * with no cards and no colour blocks, so it reads as a masthead statistic
 * rather than a dashboard.
 */
export function StatsSection({ content }: { content: StatsContent }) {
  return (
    <Section tone="surface" size="md" className="border-b border-border">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">{content.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-h3 text-balance">{content.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-body text-muted-foreground text-pretty">
                {content.description}
              </p>
            </Reveal>
          </div>

          <RevealGroup
            as="ul"
            gap={0.09}
            className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2"
          >
            {content.items.map((item) => (
              <RevealItem
                as="li"
                key={item.label}
                className="flex flex-col justify-between bg-surface p-7 sm:p-8"
              >
                <p className="font-display text-[clamp(2.75rem,2rem+3vw,4rem)] font-bold leading-none tracking-[-0.04em] text-primary">
                  <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} />
                </p>
                <div className="mt-6">
                  <p className="font-display text-h6 font-semibold">{item.label}</p>
                  <p className="mt-2 text-body-sm text-muted-foreground text-pretty">
                    {item.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  )
}
