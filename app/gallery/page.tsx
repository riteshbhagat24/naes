import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getGallery } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { Container, Section } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = buildMetadata({
  title: 'Photo Gallery',
  description:
    'Albums from New Apostolic English High School, Nagpur — cultural activities, annual productions, festivals, sport, science exhibitions and everyday school life.',
  path: '/gallery',
  image: '/images/gallery/patriotic-singing-medal.jpg',
})

export default function GalleryPage() {
  const gallery = getGallery()
  const total = gallery.albums.reduce((count, album) => count + album.images.length, 0)

  return (
    <>
      <PageHero
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        lead={`${gallery.description} ${total} photographs across ${gallery.albums.length} albums.`}
        trail={[{ title: 'Gallery', href: '/gallery' }]}
        image={{
          src: '/images/gallery/patriotic-singing-medal.jpg',
          alt: 'Students with medals from an inter-school patriotic singing competition',
        }}
      />

      <Section tone="default" size="lg">
        <Container>
          <RevealGroup as="ul" gap={0.06} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.albums.map((album) => (
              <RevealItem as="li" key={album.slug}>
                <Link
                  href={`/gallery/${album.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,transform,box-shadow] duration-500 ease-premium hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="photo-grade relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={album.cover}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-900 ease-premium group-hover:scale-105"
                    />
                    <Badge variant="light" size="sm" className="absolute left-4 top-4 z-10">
                      {album.images.length} photos
                    </Badge>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-caption uppercase tracking-[0.12em] text-primary">
                      {album.session}
                    </p>
                    <h2 className="mt-3 font-display text-h4 font-semibold text-balance">
                      {album.title}
                    </h2>
                    <p className="mt-3 flex-1 text-body-sm text-muted-foreground text-pretty">
                      {album.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-primary">
                      Open the album
                      <ArrowRight
                        aria-hidden
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  )
}
