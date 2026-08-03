'use client'

import * as React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLockBody } from '@/hooks/use-lock-body'
import { EASE } from '@/lib/motion'
import type { GalleryImage } from '@/types'

interface LightboxProps {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

/**
 * Accessible image lightbox.
 *
 * Focus is trapped inside the dialog, Escape closes, arrow keys navigate, and
 * focus returns to the thumbnail that opened it. Rendered as a modal dialog so
 * the rest of the page is hidden from assistive technology while it is open.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const restoreFocus = React.useRef<HTMLElement | null>(null)

  useLockBody(open)

  React.useEffect(() => {
    if (!open) return
    restoreFocus.current = document.activeElement as HTMLElement
    const frame = requestAnimationFrame(() => dialogRef.current?.focus())
    return () => {
      cancelAnimationFrame(frame)
      restoreFocus.current?.focus?.()
    }
  }, [open])

  React.useEffect(() => {
    if (!open || index === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate((index + 1) % images.length)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onNavigate((index - 1 + images.length) % images.length)
      }
      if (event.key === 'Tab') {
        // Keep focus inside the dialog.
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, index, images.length, onClose, onNavigate])

  const current = index !== null ? images[index] : null

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${(index ?? 0) + 1} of ${images.length}: ${current.caption}`}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE.inOut }}
          className="fixed inset-0 z-[120] flex flex-col bg-sand-950/95 backdrop-blur-xl focus:outline-none"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <p className="text-caption uppercase tracking-[0.16em] text-sand-400">
              {(index ?? 0) + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="size-5" aria-hidden />
              <span className="sr-only">Close gallery</span>
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
            <button
              type="button"
              onClick={() => onNavigate(((index ?? 0) - 1 + images.length) % images.length)}
              className="absolute left-2 z-10 grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white sm:left-5"
            >
              <ChevronLeft className="size-5" aria-hidden />
              <span className="sr-only">Previous image</span>
            </button>

            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE.out }}
              className="flex h-full max-h-full w-full max-w-5xl flex-col items-center justify-center gap-4"
            >
              <div className="relative h-full max-h-[68svh] w-full">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="max-w-2xl text-center text-body-sm text-sand-300 text-pretty">
                {current.caption}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={() => onNavigate(((index ?? 0) + 1) % images.length)}
              className="absolute right-2 z-10 grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white sm:right-5"
            >
              <ChevronRight className="size-5" aria-hidden />
              <span className="sr-only">Next image</span>
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
