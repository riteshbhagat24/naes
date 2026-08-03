import type { NextConfig } from 'next'

/**
 * Production configuration.
 *
 * - Images are served locally from /public and optimised by the Next.js image
 *   pipeline into AVIF/WebP at the exact sizes the layout requests.
 * - Security headers are applied to every route (Best Practices score).
 * - The legacy CodeIgniter URLs of the previous website are permanently
 *   redirected so no inbound link or search result ever 404s.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1440, 1920, 2400],
    imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 384, 512],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  /**
   * Ship the content directory with the serverless functions.
   *
   * Statically prerendered pages read /content at build time, so the values are
   * baked into the HTML. A dynamic route re-renders the root layout at request
   * time instead — and the layout reads the announcement bar from disk. Next.js
   * traces file dependencies statically, so a path assembled at runtime
   * (`path.join(CONTENT_ROOT, relativePath)`) is invisible to it and /content
   * never reaches the lambda, which is what made /search return a 500 while
   * every static route was fine.
   */
  outputFileTracingIncludes: {
    '/**': ['./content/**/*'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/brand/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/downloads/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ]
  },

  async redirects() {
    /** Old website (CodeIgniter) routes → new information architecture. */
    const legacy: Array<[string, string]> = [
      ['/index.php/Welcome/index', '/'],
      ['/index.php/Welcome/mission_vision', '/about/vision-mission'],
      ['/index.php/Welcome/principle_desk', '/about/principal'],
      ['/index.php/Welcome/team', '/about/management'],
      ['/index.php/Welcome/campus', '/campus-life/infrastructure'],
      ['/index.php/Welcome/RegForm', '/admissions/enquiry'],
      ['/index.php/Welcome/fees', '/admissions/fees'],
      ['/index.php/Welcome/career', '/careers'],
      ['/index.php/Welcome/faq', '/admissions/faqs'],
      ['/index.php/Welcome/contact', '/contact'],
      ['/index.php/Welcome/view_facilities', '/campus-life/facilities'],
      ['/index.php/Welcome/culturalActivityImages', '/gallery'],
    ]

    return [
      ...legacy.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      { source: '/admin', destination: '/admin/index.html', permanent: false },
    ]
  },
}

export default nextConfig
