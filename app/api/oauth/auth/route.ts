import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Step 1 of the Decap CMS GitHub login.
 *
 * Decap opens this endpoint in a popup; we redirect to GitHub's authorisation
 * screen with a signed-in-this-tab state value, and GitHub sends the visitor
 * back to /api/oauth/callback. This replaces the hosted Netlify service, so the
 * whole CMS runs on Vercel with nothing to pay for.
 */
export function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID
  if (!clientId) {
    return NextResponse.json(
      {
        error: 'github_oauth_not_configured',
        message:
          'Set GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET in the project environment to enable CMS login.',
      },
      { status: 500 },
    )
  }

  const origin = request.nextUrl.origin
  const state = crypto.randomUUID()

  /**
   * `public_repo` grants write access to the editor's *public* repositories
   * only, which is all Decap needs while the content repository is public — and
   * it means a staff member's editing token can never touch their private work.
   *
   * If the content repository is ever switched to private, set
   * GITHUB_OAUTH_SCOPE=repo, or the CMS will report that it cannot find it.
   */
  const scope = process.env.GITHUB_OAUTH_SCOPE || 'public_repo,user'

  const authorize = new URL('https://github.com/login/oauth/authorize')
  authorize.searchParams.set('client_id', clientId)
  authorize.searchParams.set('redirect_uri', `${origin}/api/oauth/callback`)
  authorize.searchParams.set('scope', scope)
  authorize.searchParams.set('state', state)

  const response = NextResponse.redirect(authorize.toString())
  response.cookies.set('decap_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  })
  return response
}
