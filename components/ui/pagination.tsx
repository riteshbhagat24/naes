import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  page: number
  totalPages: number
  /** Builder for each page's href, so this works for any listing route. */
  hrefFor: (page: number) => string
  className?: string
  label?: string
}

/** Server-rendered pagination — real links, crawlable, no client JavaScript. */
export function Pagination({
  page,
  totalPages,
  hrefFor,
  className,
  label = 'Pagination',
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (candidate) =>
      candidate === 1 ||
      candidate === totalPages ||
      Math.abs(candidate - page) <= 1,
  )

  const itemClass =
    'grid h-11 min-w-11 place-items-center rounded-xl border px-3 text-body-sm font-semibold transition-colors duration-200'

  return (
    <nav aria-label={label} className={cn('flex items-center justify-center gap-2', className)}>
      {page > 1 ? (
        <Link
          href={hrefFor(page - 1)}
          rel="prev"
          className={cn(itemClass, 'border-border hover:border-primary/50 hover:text-primary')}
        >
          <ChevronLeft className="size-4" aria-hidden />
          <span className="sr-only">Previous page</span>
        </Link>
      ) : null}

      {pages.map((candidate, index) => {
        const previous = pages[index - 1]
        const gap = previous !== undefined && candidate - previous > 1
        return (
          <span key={candidate} className="flex items-center gap-2">
            {gap ? (
              <span className="px-1 text-muted-foreground" aria-hidden>
                …
              </span>
            ) : null}
            <Link
              href={hrefFor(candidate)}
              aria-current={candidate === page ? 'page' : undefined}
              className={cn(
                itemClass,
                candidate === page
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/50 hover:text-primary',
              )}
            >
              {candidate}
            </Link>
          </span>
        )
      })}

      {page < totalPages ? (
        <Link
          href={hrefFor(page + 1)}
          rel="next"
          className={cn(itemClass, 'border-border hover:border-primary/50 hover:text-primary')}
        >
          <ChevronRight className="size-4" aria-hidden />
          <span className="sr-only">Next page</span>
        </Link>
      ) : null}
    </nav>
  )
}
