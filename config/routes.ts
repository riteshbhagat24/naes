/**
 * Routes that open with a full-bleed photographic masthead.
 *
 * The header renders transparent over these while the page is scrolled to the
 * top, and frosts as soon as it moves. Any page listed here must use
 * `<PageHero variant="feature">` (or be the homepage) so the two stay in step.
 */
export const IMMERSIVE_ROUTES = new Set<string>([
  '/',
  '/about',
  '/about/history',
  '/about/founder',
  '/academics',
  '/admissions',
  '/campus-life',
  '/campus-life/tour',
  '/gallery',
  '/videos',
  '/achievements',
  '/careers',
  '/contact',
])

export function isImmersiveRoute(pathname: string): boolean {
  return IMMERSIVE_ROUTES.has(pathname)
}
