// Gets access tokens for the function's user-assigned managed identity, using the
// App Service / Azure Functions local token endpoint (IDENTITY_ENDPOINT + IDENTITY_HEADER).
// See: https://learn.microsoft.com/azure/app-service/overview-managed-identity#rest-endpoint-reference
// Used instead of @azure/identity to keep the API to one dependency.

const REFRESH_MARGIN_MS = 5 * 60 * 1000

export function createManagedIdentityCredential({
  clientId,
  env = process.env,
  fetchImpl = fetch,
  now = () => Date.now(),
} = {}) {
  const cache = new Map() // resource -> { token, expiresAt }

  return {
    /** @param {string} scope e.g. "https://graph.microsoft.com/.default" */
    async getToken(scope) {
      const resource = scope.replace(/\/\.default$/, '')
      const hit = cache.get(resource)
      if (hit && hit.expiresAt - REFRESH_MARGIN_MS > now()) return { token: hit.token, expiresOnTimestamp: hit.expiresAt }

      const endpoint = env.IDENTITY_ENDPOINT
      const header = env.IDENTITY_HEADER
      if (!endpoint || !header) throw new Error('Managed identity endpoint not available (IDENTITY_ENDPOINT/IDENTITY_HEADER missing).')
      if (!clientId) throw new Error('MANAGED_IDENTITY_CLIENT_ID is not set.')

      const url = new URL(endpoint)
      url.searchParams.set('resource', resource)
      url.searchParams.set('api-version', '2019-08-01')
      url.searchParams.set('client_id', clientId)

      const res = await fetchImpl(url, { headers: { 'X-IDENTITY-HEADER': header } })
      if (!res.ok) throw new Error(`Managed identity token request failed: ${res.status}`)
      const body = await res.json()
      if (!body.access_token) throw new Error('Managed identity token response had no access_token.')

      const expiresAt = Number(body.expires_on) * 1000 || now() + 60 * 60 * 1000
      cache.set(resource, { token: body.access_token, expiresAt })
      return { token: body.access_token, expiresOnTimestamp: expiresAt }
    },
  }
}
