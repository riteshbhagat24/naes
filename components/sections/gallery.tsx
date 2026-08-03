'use client'

import * as React from 'react'
import Image from 'next/image'
import { Expand } from 'lucide-react'
import { Lightbox } from '@/components/ui/lightbox'
import { distribute } from '@/utils/format'
import { cn } from '@/lib/utils'
import type { GalleryImage } from '@/types'

/**
 * Masonry gallery grid with lightbox.
 *
 * Columns are built server-deterministically (round-robin), so the markup is
 * identical on both renders and the layout never reflows after hydration.
 * Intrinsic width/height come from the content file, so every tile reserves
 * its exact space before the image arrives — no cumulative layout shift.
 */
export function GalleryGrid({
  images,
  columns = 3,
  className,
}: {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  className?: string
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  // Keep a flat index so lightbox navigation follows reading order.
  const indexed = images.map((image, index) => ({ image, index }))
  const columnised = distribute(indexed, columns)

  return (
    <>
      <div
        className={cn(
          'grid gap-4 sm:gap-5',
          columns === 2 && 'grid-cols-1 sm:grid-cols-2',
          columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          columns === 4 && 'grid-cols-2 lg:grid-cols-4',
          className,
        )}
      >
        {columnised.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4 sm:gap-5">
            {column.map(({ image, index }) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="photo-grade block">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width ?? 1200}
                    height={image.height ?? 900}
                    sizes={
                      columns === 4
                        ? '(max-width: 1024px) 45vw, 24vw'
                        : '(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 31vw'
                    }
                    className="h-auto w-full object-cover transition-transform duration-900 ease-premium group-hover:scale-[1.04]"
                  />
                </span>

                <span
                  aria-hidden
                  className="absolute inset-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-sand-950/85 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <span className="text-left text-caption text-white text-pretty">
                    {image.caption}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
                    <Expand className="size-4 text-white" />
                  </span>
                </span>

                <span className="sr-only">{`Open image: ${image.caption}`}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  )
}
