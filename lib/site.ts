/**
 * The canonical origin, in one place.
 *
 * Set NEXT_PUBLIC_SITE_URL in deployment to the public origin. The local fallback keeps metadata
 * valid during development without pointing a new portfolio at somebody else's domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/+$/, '')
