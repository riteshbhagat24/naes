import { Container } from '@/components/ui/section'

/**
 * Route-level loading state.
 * A skeleton in the shape of a page masthead, so the layout does not jump when
 * the real content arrives.
 */
export default function Loading() {
  return (
    <div className="py-section" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      <Container>
        <div className="animate-pulse space-y-6">
          <div className="h-3 w-32 rounded-full bg-muted" />
          <div className="h-14 w-full max-w-3xl rounded-2xl bg-muted" />
          <div className="h-4 w-full max-w-xl rounded-full bg-muted" />
          <div className="h-4 w-full max-w-lg rounded-full bg-muted" />
          <div className="grid gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="aspect-[4/3] rounded-2xl bg-muted" />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
