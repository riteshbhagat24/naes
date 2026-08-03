'use client'

import * as React from 'react'
import Script from 'next/script'

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

/**
 * Cloudflare Turnstile.
 *
 * Renders — and loads the script — only when a site key is configured, so the
 * forms work perfectly with no captcha at all until the school opts in. The
 * honeypot and timing checks in the server action run either way.
 */
export function TurnstileWidget({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    if (!SITE_KEY || !ready || !ref.current) return
    const turnstile = (window as unknown as { turnstile?: { render: (el: HTMLElement, options: Record<string, unknown>) => void } })
      .turnstile
    if (!turnstile) return
    turnstile.render(ref.current, {
      sitekey: SITE_KEY,
      theme: 'auto',
      'response-field-name': 'turnstileToken',
    })
  }, [ready])

  if (!SITE_KEY) return null

  return (
    <div className={className}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={() => setReady(true)}
      />
      <div ref={ref} />
    </div>
  )
}
