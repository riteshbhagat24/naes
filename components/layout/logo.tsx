import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

/**
 * The crest, lifted off its original white plate into a transparent PNG so it
 * sits correctly on light, dark and photographic surfaces.
 */
export function Logo({
  invert = false,
  compact = false,
  className,
}: {
  invert?: boolean
  compact?: boolean
  className?: string
}) {
  return (
    <Link
      href="/"
      className={cn(
        'group/logo flex items-center gap-3 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4',
        className,
      )}
      aria-label={`${siteConfig.name} — home`}
    >
      <Image
        src={invert ? siteConfig.brand.crestLight : siteConfig.brand.crest}
        alt=""
        width={112}
        height={112}
        priority
        className={cn(
          'shrink-0 transition-transform duration-500 ease-premium group-hover/logo:scale-[1.04]',
          compact ? 'size-9' : 'size-11 sm:size-[3.25rem]',
        )}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            'font-display font-bold leading-[1.05] tracking-[-0.02em]',
            compact ? 'text-[0.9375rem]' : 'text-[0.9375rem] sm:text-[1.0625rem]',
            invert ? 'text-white' : 'text-foreground',
          )}
        >
          New Apostolic
        </span>
        <span
          className={cn(
            'mt-0.5 font-sans font-medium uppercase leading-tight tracking-[0.13em]',
            compact ? 'text-[0.5625rem]' : 'text-[0.5625rem] sm:text-[0.625rem]',
            invert ? 'text-sand-300' : 'text-muted-foreground',
          )}
        >
          English High School
        </span>
      </span>
    </Link>
  )
}
