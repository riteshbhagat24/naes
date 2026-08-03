import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { GalleryGrid } from '@/components/sections/gallery'
import type { GalleryImage } from '@/types'

/** Homepage gallery band — a curated selection that opens into the lightbox. */
export function GalleryPreview({
  images,
  eyebrow,
  title,
  description,
}: {
  images: GalleryImage[]
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <Section tone="muted" size="lg">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-12"
          action={
            <Button asChild variant="outline" size="md">
              <Link href="/gallery">
                Open the full gallery
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />

        <GalleryGrid images={images} columns={4} />
      </Container>
    </Section>
  )
}
