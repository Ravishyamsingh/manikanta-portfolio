# Netlify deployment

This is a Next.js App Router site. Netlify should use the repository root containing
`package.json`, `next.config.ts`, and `app/`.

## Deploy

1. Push the repository to GitHub.
2. In Netlify, choose **Add new project → Import an existing project** and select the repository.
3. Keep the build settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `22`
4. Deploy the site.

Netlify detects Next.js and provisions the server-side routes, middleware, image handling, and
App Router output. Do not enable static export for this project: the API routes and interactive
features need a Next.js server runtime.

## Environment variables

Set these in Netlify under **Project configuration → Environment variables**. Keep secrets out of
the repository.

| Variable | Required | Purpose |
|---|---:|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical production URL used by metadata, sitemap, and Open Graph links. Include `https://` and no trailing slash. |
| `UPSTASH_REDIS_REST_URL` | Recommended | Shared notes, scores, visitor counts, and rate limiting. |
| `UPSTASH_REDIS_REST_TOKEN` | Recommended | Upstash credential paired with the URL. |
| `GITHUB_TOKEN` | Optional | GitHub contribution calendar. |
| `STATS_TOKEN` | Optional | Protects the private `/stats` page. |
| `EDIT_GITHUB_APP_CLIENT_ID` | Optional | Enables the `/edit` GitHub editor. |
| `EDIT_GITHUB_APP_CLIENT_SECRET` | Optional | GitHub App client secret. |
| `EDIT_SESSION_SECRET` | Optional | At least 32 random characters for editor sessions. |
| `EDIT_ALLOWED_USER_ID` | Optional | Numeric GitHub user ID allowed to edit. |
| `EDIT_ORIGIN` | Optional | Exact public origin used by the editor OAuth callback. |

For the editor, set all five `EDIT_*` variables together and configure the GitHub App callback as:

`https://your-domain.example/api/edit/auth/callback`

The production deploy automatically uses the production visitor namespace. Deploy previews and
local development use the development namespace, so they do not pollute production analytics.

## Verify after deploy

Open these URLs on the deployed site:

- `/` — home page
- `/work` — project index
- `/api/version` — deployed commit identifier
- `/Bolnidi_Manikanta_Resume.pdf` — résumé download

If `/api/version` returns the Netlify commit SHA and the project pages load, the server runtime is
configured correctly.
