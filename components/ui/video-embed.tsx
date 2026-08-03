'use client'

import * as React from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoEmbedProps {
  youtubeId: string
  title: string
  className?: string
  poster?: string
}

/**
 * Click-to-load YouTube facade.
 *
 * Nothing from youtube.com is requested until the visitor presses play, so the
 * page ships no third-party JavaScript, no third-party cookies and no extra
 * main-thread work. The poster is served from YouTube's static image host on
 * first paint only after interaction, so we use a local still where provided.
 */
export function VideoEmbed({ youtubeId, title, className, poster }: VideoEmbedProps) {
  const [active, setActive] = React.useState(false)

  return (
    <div
      className={cn(
        'group relative aspect-video w-full overflow-hidden rounded-2xl bg-sand-900',
        className,
      )}
    >
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 size-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        >
          {poster ? (
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover opacity-75 transition-[opacity,transform] duration-700 ease-premium group-hover:scale-[1.03] group-hover:opacity-85"
            />
          ) : null}
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-sand-950/85 via-sand-950/25 to-transparent"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-[4.5rem] place-items-center rounded-full border border-white/30 bg-white/12 backdrop-blur-md transition-[transform,background-color] duration-500 ease-premium group-hover:scale-110 group-hover:bg-white/25">
              <Play className="ml-1 size-7 fill-white text-white" aria-hidden />
            </span>
          </span>
          <span className="sr-only">{`Play video: ${title}`}</span>
        </button>
      )}
    </div>
  )
}
