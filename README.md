# aaditgolwala.com

Personal site. **Astro 7** (static) · **Tailwind 4** · **Cloudflare Workers**
static assets, same stack and deploy shape as `PetnixWeb` and
`aligna-store-frontend`.

Content plan — what goes on the site and why — is in [PLAN.md](PLAN.md).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321 — drafts are visible here
npm run check    # astro check (typecheck)
npm run build    # production build into dist/ — drafts excluded
```

## Design

Tokens (colour, type, the one display size) are declared once at the top of
`src/styles/global.css` and nothing else hardcodes a colour. Light is the base;
the two blocks under it re-declare the same variables for dark, once for system
preference and once for an explicit choice, so the toggle wins in both
directions. Utilities emit `var(--color-*)`, so there is no `dark:` prefix
anywhere in the markup.

Fonts are self-hosted through Fontsource — Inter for text, JetBrains Mono for
every piece of metadata (dates, stacks, section labels, result figures). No
font-CDN request, no flash of fallback text.

The theme toggle cycles system → light → dark. An inline script in `<head>`
applies the stored choice before first paint; without it a visitor who chose
dark sees a white flash on every navigation.

## Content

Projects are markdown in `src/content/projects/`. The frontmatter schema lives
in `src/content.config.ts` and asks for two fields most portfolios omit:

- `hardPart` — what broke and what you measured. The section people read.
- `metrics` — numbers only.

Beyond those: `group` picks the homepage section (product / research /
project), `description` is two or three paragraphs of substance, `highlights`
are the specific things built, and `links` is where to see it — live site,
beta, campaign, code — shown as pills. `caseStudy: true` is what makes a
`/projects/<slug>` page exist; a project without one is homepage-only, so a
TODO body can never sit behind a real link.

`draft: true` keeps a project out of production builds but visible in `npm run
dev`. Every project currently ships as a draft; flip to `false` as you finish
each one.

Posts are markdown in `src/content/writing/`, listed at `/writing` and on the
homepage. Same `draft` behaviour.

Identity, nav, and the work history are in `src/site.ts`. The copy there is a
draft written from the résumé — see [PLAN.md](PLAN.md) §2.

## Deploy

Pushing to `main` builds and deploys via `.github/workflows/deploy.yml`.

One-time setup — **Settings → Secrets and variables → Actions**:

| Secret | Where to get it |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → *Edit Cloudflare Workers* template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages, right sidebar |

The first deploy creates the DNS records and certificates for
`aaditgolwala.com` and `www.aaditgolwala.com` — `custom_domain` routes in
`wrangler.jsonc` handle it, nothing to click in the dashboard. `worker/index.js`
301s `www` to the apex and sets security headers.

To deploy by hand: `npx wrangler login && npm run deploy`.

## Monitoring

**In-repo (already set up).** `.github/workflows/uptime.yml` probes the site
every 15 minutes. It fails if the request errors, returns anything but 200, *or*
returns 200 without the expected text — a build that deployed empty is down too.
On failure it opens an issue labelled `uptime`, which emails you; on recovery it
comments and closes it.

Two limits, both real:

- GitHub delays or skips scheduled workflows under load. Expect minutes of slop.
- GitHub disables schedules after 60 days with no repo activity.

**External (recommended, 2 minutes).** Because the above cannot alert you when
GitHub itself is having a bad day, add a free external monitor:

- [UptimeRobot](https://uptimerobot.com) — free tier, 5-minute checks, email +
  push. Monitor type HTTP(s), URL `https://aaditgolwala.com`, keyword
  `Aadit Golwala`.
- [Better Stack](https://betterstack.com/uptime) — free tier, 3-minute checks,
  nicer alerting and a hosted status page.

Cloudflare Workers itself is about as reliable as the internet gets, so in
practice these catch *your* mistakes — a bad deploy, an expired token, a DNS
change — far more often than an outage.

## CI

`.github/workflows/ci.yml` runs on every push and PR:

- `astro check` typecheck
- production build
- `npm audit --omit=dev --audit-level=high`
- **link check** on the built HTML (lychee) — dead links are the most common way
  a portfolio site embarrasses you. `--fallback-extensions html` is required:
  `build.format: "file"` emits extensionless hrefs against `.html` files, which
  Cloudflare resolves at request time but a filesystem check will not.
- gitleaks secret scan

Dependabot opens grouped npm PRs weekly and Actions PRs monthly.
