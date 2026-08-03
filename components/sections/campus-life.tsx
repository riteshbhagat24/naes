import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Figure, ParallaxImage, RevealImage } from '@/components/ui/media'
import { Reveal, RevealGroup, RevealItem, TextReveal } from '@/components/ui/reveal'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import type { FacilityItem } from '@/types'

/* ==========================================================================
   Campus-life bands.

   Seven consecutive sections on one page risk turning into a single grey
   stripe, so each one below changes at least two of: surface tone, grid
   geometry, image treatment and typographic scale.
   ========================================================================== */

/** 1 — Campus life opener: full-bleed parallax with the copy inset. */
export function CampusLifeIntro({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string
  title: string
  lead: string
  image: { src: string; alt: string }
}) {
  return (
    <section className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-sand-950 py-section lg:min-h-[42rem]">
      <ParallaxImage
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        strength={10}
        rounded={false}
        graded={false}
        wrapperClassName="absolute inset-0 -z-20"
        className="opacity-55"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-sand-950 via-sand-950/70 to-sand-950/25"
      />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-5 text-gold-400">{eyebrow}</p>
          </Reveal>
          <TextReveal as="h2" text={title} className="text-h2 text-white" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-body-lg text-sand-300 text-pretty">{lead}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <Button asChild variant="light" size="lg" className="mt-9">
              <Link href="/campus-life/tour">
                Take the virtual tour
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/** 2 — Infrastructure: asymmetric split, image left, ruled list right. */
export function InfrastructureSection({ items }: { items: FacilityItem[] }) {
  const lead = items[0]

  return (
    <Section tone="default" size="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <RevealImage
              src={lead.image}
              alt={lead.title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              wrapperClassName="aspect-[16/11] w-full"
            />
          </div>

          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <p className="eyebrow mb-4">Infrastructure</p>
            </Reveal>
            <TextReveal
              as="h2"
              text="Buildings arranged around the working day"
              className="text-h3"
            />
            <Reveal delay={0.08}>
              <p className="mt-5 text-body text-muted-foreground text-pretty">
                Everything here is placed where it is needed. The laboratories sit next to the
                classrooms that use them; the canteen is reachable inside a short break; the hall,
                basement and playground carry assembly, rehearsal, examinations and sport in turn.
              </p>
            </Reveal>

            <ul className="mt-8 divide-y divide-border border-y border-border">
              {items.map((item, index) => (
                <li key={item.slug}>
                  <Reveal delay={index * 0.05}>
                    <div className="flex items-start gap-4 py-5">
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                        <Icon name={item.icon} className="size-4" />
                      </span>
                      <div>
                        <p className="font-display text-h6 font-semibold">{item.title}</p>
                        <p className="mt-1.5 text-body-sm text-muted-foreground text-pretty">
                          {item.summary}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** 3 — Laboratories: dark band, three-up, technical tone. */
export function LaboratoriesSection({ items }: { items: FacilityItem[] }) {
  return (
    <Section tone="ink" size="lg" grain>
      <Container>
        <SectionHeader
          eyebrow="Laboratories"
          title="Science that is done, not described"
          description="Physics, computing and robotics are timetabled practical subjects here. Students set up their own apparatus, take their own readings, and account for their own error."
          invert
          className="mb-14"
        />

        <RevealGroup as="ul" className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <RevealItem as="li" key={item.slug} className="group">
              <div className="photo-grade relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-900 ease-premium group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 font-display text-h5 font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-body-sm text-sand-400 text-pretty">{item.summary}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}

/** 4 — Library: quiet, centred, single photograph. */
export function LibrarySection({ item }: { item: FacilityItem }) {
  return (
    <Section tone="surface" size="lg">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-5">Library</p>
          </Reveal>
          <TextReveal as="h2" text={item.title === 'Library' ? 'A quiet room at the centre of the school' : item.title} className="text-h2" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-body-lg text-muted-foreground text-pretty">{item.summary}</p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <RevealImage
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 56rem"
            wrapperClassName="aspect-[16/9] w-full"
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
          {item.description.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 20)} delay={index * 0.06}>
              <p className="text-body text-muted-foreground text-pretty">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/** 5 — Sport: a marquee of disciplines above a wide photograph. */
export function SportsSection({
  item,
  disciplines,
}: {
  item: FacilityItem
  disciplines: string[]
}) {
  const track = [...disciplines, ...disciplines]

  return (
    <Section tone="muted" size="lg" className="overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Sport"
          title="Eight disciplines, one field, every grade"
          description={item.summary}
          className="mb-12"
          action={
            <Button asChild variant="outline" size="md">
              <Link href="/campus-life/sports">
                Sports at the school
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
      </Container>

      <div className="mask-fade-x relative flex select-none overflow-hidden py-6">
        <ul aria-hidden className="flex w-max animate-marquee items-center gap-10">
          {track.map((discipline, index) => (
            <li
              key={`${discipline}-${index}`}
              className="flex items-center gap-10 whitespace-nowrap font-display text-[clamp(1.5rem,1rem+2vw,2.5rem)] font-semibold tracking-[-0.02em] text-foreground/25"
            >
              {discipline}
              <span className="size-1.5 rounded-full bg-primary/50" />
            </li>
          ))}
        </ul>
        <p className="sr-only">Sports offered: {disciplines.join(', ')}.</p>
      </div>

      <Container className="mt-8">
        <RevealImage
          src={item.image}
          alt={item.title}
          fill
          sizes="100vw"
          wrapperClassName="aspect-[21/9] w-full"
        />
      </Container>
    </Section>
  )
}

/** 6 — Arts & music: overlapping figures, editorial captions. */
export function ArtsSection({
  item,
  supporting,
}: {
  item: FacilityItem
  supporting: Array<{ src: string; alt: string; caption: string }>
}) {
  return (
    <Section tone="default" size="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-4">Arts &amp; music</p>
            </Reveal>
            <TextReveal
              as="h2"
              text="Where a quiet child finds their voice"
              className="text-h3"
            />
            <div className="mt-6 space-y-5">
              {item.description.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 20)} delay={0.06 + index * 0.05}>
                  <p className="max-w-prose text-body text-muted-foreground text-pretty">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <Button asChild variant="outline" size="md" className="mt-8">
                <Link href="/campus-life/arts">
                  Arts, music &amp; theatre
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-5">
              <Figure
                src={item.image}
                alt={item.title}
                caption={item.title}
                aspect="aspect-[3/4]"
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="col-span-1"
              />
              <div className="col-span-1 space-y-5 pt-12">
                {supporting.map((support) => (
                  <Figure
                    key={support.src}
                    src={support.src}
                    alt={support.alt}
                    caption={support.caption}
                    aspect="aspect-[4/3]"
                    sizes="(max-width: 1024px) 45vw, 28vw"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** 7 — Student development: numbered pillars on a tinted surface. */
export function StudentDevelopmentSection({
  eyebrow,
  title,
  lead,
  pillars,
}: {
  eyebrow: string
  title: string
  lead: string
  pillars: Array<{ icon: string; title: string; description: string }>
}) {
  return (
    <Section tone="surface" size="lg" className="border-y border-border">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={lead} className="mb-14" />

        <RevealGroup as="ul" gap={0.06} className="grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2 xl:grid-cols-3">
          {pillars.map((pillar, index) => (
            <RevealItem as="li" key={pillar.title} className="flex flex-col bg-surface p-8">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon name={pillar.icon} className="size-[1.15rem]" />
                </span>
                <span className="font-display text-h4 font-bold tabular-nums text-border">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 font-display text-h5 font-semibold">{pillar.title}</h3>
              <p className="mt-3 flex-1 text-body-sm text-muted-foreground text-pretty">
                {pillar.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}

/** Compact facility list used on inner pages. */
export function FacilityList({ items }: { items: FacilityItem[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.slug}
          className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="photo-grade relative aspect-[16/10] w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon name={item.icon} className="size-4" />
              </span>
              <h3 className="font-display text-h5 font-semibold">{item.title}</h3>
            </div>
            <div className="mt-4 flex-1 space-y-3">
              {item.description.map((paragraph) => (
                <p key={paragraph.slice(0, 20)} className="text-body-sm text-muted-foreground text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Simple ticked list used for sports disciplines and similar. */
export function TickList({ items, columns = 2 }: { items: string[]; columns?: 2 | 3 }) {
  return (
    <ul
      className={
        columns === 3
          ? 'grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid gap-x-8 gap-y-3 sm:grid-cols-2'
      }
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-body-sm">
          <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
