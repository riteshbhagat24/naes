import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getAlbum, getGallery } from '@/lib/data'
import { PageHero } from '@/components/ui/page-hero'
import { GalleryGrid } from '@/components/sections/gallery'
import { Container, Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

interface Params {
  params: Promise<{ album: string }>
}

export function generateStaticParams() {
  return getGallery().albums.map((album) => ({ album: album.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { album: slug } = await params
  const album = getAlbum(slug)
  if (!album) {
    return buildMetadata({ title: 'Album not found', description: '', path: `/gallery/${slug}`, noindex: true })
  }
  return buildMetadata({
    title: album.title,
    description: album.description,
    path: `/gallery/${album.slug}`,
    image: album.cover,
  })
}

export default async function AlbumPage({ params }: Params) {
  const { album: slug } = await params
  const album = getAlbum(slug)
  if (!album) notFound()

  const albums = getGallery().albums
  const position = albums.findIndex((item) => item.slug === album.slug)
  const previous = albums[position - 1]
  const next = albums[position + 1]

  return (
    <>
      <PageHero
        eyebrow={`Gallery · ${album.session}`}
        title={album.title}
        lead={album.description}
        trail={[
          { title: 'Gallery', href: '/gallery' },
          { title: album.title, href: `/gallery/${album.slug}` },
        ]}
      />

      <Section tone="default" size="lg">
        <Container>
          <GalleryGrid images={album.images} columns={3} />

          <nav
            aria-label="Album navigation"
            className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8"
          >
            {previous ? (
              <Button asChild variant="ghost" size="md">
                <Link href={`/gallery/${previous.slug}`}>
                  <ArrowLeft aria-hidden />
                  {previous.title}
                </Link>
              </Button>
            ) : (
              <span />
            )}
            {next ? (
              <Button asChild variant="ghost" size="md">
                <Link href={`/gallery/${next.slug}`}>
                  {next.title}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            ) : (
              <span />
            )}
          </nav>
        </Container>
      </Section>
    </>
  )
}
