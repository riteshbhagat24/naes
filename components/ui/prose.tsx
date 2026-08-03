import { renderMarkdown } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * Renders editor-written Markdown on the editorial measure.
 * The HTML is produced on the server by `renderMarkdown`, which escapes all
 * input before applying its own small, fixed set of tags.
 */
export function Prose({
  markdown,
  className,
  invert = false,
}: {
  markdown: string
  className?: string
  invert?: boolean
}) {
  return (
    <div
      className={cn(
        'prose prose-editorial max-w-prose',
        'prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-[-0.02em]',
        'prose-p:text-body prose-p:text-pretty prose-li:text-body',
        'prose-a:font-medium prose-a:underline-offset-4',
        'prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:font-display prose-blockquote:not-italic',
        invert && 'prose-invert',
        className,
      )}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
    />
  )
}
