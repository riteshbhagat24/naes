import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { JsonLd } from '@/components/ui/json-ld'
import { breadcrumbSchema } from '@/lib/schema'

export interface Crumb {
  title: string
  href: string
}

/**
 * Breadcrumb trail. Emits BreadcrumbList JSON-LD alongside the visual list so
 * the two can never disagree.
 */
export function Breadcrumb({
  trail,
  invert = false,
  className,
}: {
  trail: Crumb[]
  invert?: boolean
  className?: string
}) {
  const full: Crumb[] = [{ title: 'Home', href: '/' }, ...trail]

  return (
    <>
      <JsonLd data={breadcrumbSchema(full)} id="breadcrumb-schema" />
      <nav aria-label="Breadcrumb" className={cn('w-full', className)}>
        <ol
          className={cn(
            'flex flex-wrap items-center gap-x-1.5 gap-y-1 text-caption',
            invert ? 'text-sand-300' : 'text-muted-foreground',
          )}
        >
          {full.map((crumb, index) => {
            const isLast = index === full.length - 1
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <ChevronRight aria-hidden className="size-3.5 shrink-0 opacity-50" />
                ) : null}
                {isLast ? (
                  <span aria-current="page" className={invert ? 'text-white' : 'text-foreground'}>
                    {crumb.title}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={cn(
                      'link-underline transition-colors',
                      invert ? 'hover:text-white' : 'hover:text-primary',
                    )}
                  >
                    {crumb.title}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
