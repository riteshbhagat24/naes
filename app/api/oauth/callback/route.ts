import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Step 2 of the Decap CMS GitHub login.
 *
 * Exchanges the authorisation code for an access token and hands it back to the
 * CMS window with the `authorization:github:success` postMessage handshake that
 * Decap listens for. The token is never stored server-side and never written to
 * a cookie — it lives only in the CMS tab.
 */
function respondWithScript(payload: string, status: 'success' | 'error') {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Signing in…</title></head>
<body style="font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;padding:40px;color:#231A16;background:#FBF8F6">
<p>Completing sign-in…</p>
<script>
(function () {
  var message = 'authorization:github:${status}:' + ${JSON.stringify(payload)};
  function send(event) {
    if (!window.opener) return;
    window.opener.postMessage(message, event && event.origin ? event.origin : '*');
  }
  window.addEventListener('message', send, false);
  send();
  setTimeout(function () { window.close(); }, 1200);
})();
</script>
</body></html>`

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return respondWithScript(JSON.stringify({ message: 'GitHub OAuth is not configured.' }), 'error')
  }

  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')
  const expectedState = request.cookies.get('decap_oauth_state')?.value

  if (!code) {
    return respondWithScript(JSON.stringify({ message: 'No authorisation code returned.' }), 'error')
  }
  if (!state || !expectedState || state !== expectedState) {
    return respondWithScript(
      JSON.stringify({ message: 'Login state did not match. Please try again.' }),
      'error',
    )
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${request.nextUrl.origin}/api/oauth/callback`,
      }),
    })

    const data = (await tokenResponse.json()) as {
      access_token?: string
      error_description?: string
      error?: string
    }

    if (!data.access_token) {
      return respondWithScript(
        JSON.stringify({ message: data.error_description ?? data.error ?? 'Token exchange failed.' }),
        'error',
      )
    }

    // Fail early and legibly if this GitHub account cannot write to the content
    // repository. GitHub would reject the commit anyway, but only after the
    // editor had written a whole page — this catches it at the login screen.
    const repo = process.env.GITHUB_OAUTH_REPO
    if (repo) {
      const repoResponse = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'naehs-cms',
        },
      })

      if (!repoResponse.ok) {
        return respondWithScript(
          JSON.stringify({
            message: `This GitHub account cannot see ${repo}. Ask an administrator to add you as a collaborator.`,
          }),
          'error',
        )
      }

      const repoData = (await repoResponse.json()) as { permissions?: { push?: boolean } }
      if (!repoData.permissions?.push) {
        return respondWithScript(
          JSON.stringify({
            message: `This GitHub account has read-only access to ${repo}. Write access is required to publish content.`,
          }),
          'error',
        )
      }
    }

    const response = respondWithScript(
      JSON.stringify({ token: data.access_token, provider: 'github' }),
      'success',
    )
    response.cookies.delete('decap_oauth_state')
    return response
  } catch (error) {
    console.error('[oauth] token exchange failed', error)
    return respondWithScript(
      JSON.stringify({ message: 'Could not reach GitHub. Please try again.' }),
      'error',
    )
  }
}
