# Survey Suite website: site notes

How www.surveysuite.co.uk is built, hosted and deployed. Keep this file up to date when settings change.

## Go-live blockers

Check every item before merging to `main`. **Do not merge while any box is unticked.**

- [x] ICO registration number: **waived for launch by Rob, 28 Oct 2026.** The privacy page hides the ICO line while `company.icoNumber` in `src/content/site.ts` is still `[ICO REG NUMBER]`. **Follow-up:** set the real number there; the line then appears automatically.
- [x] Contact and privacy emails confirmed and working (both `hi@surveysuite.co.uk` in `src/content/site.ts`; confirmed by Rob, 28 Oct 2026)
- [x] PR preview tested and approved by Rob (28 Oct 2026)

Quick check for anything still unfilled:

```sh
grep -rn "\[ICO REG NUMBER\]" src
```

## Other open items (not blockers)

- **Demo videos:** one is live, the Survey Suite Auto demo (https://youtu.be/riRUIujqhmU, public, 1:31). The other two Auto slots (*Hands-free in the car*, *Auto walkthrough*) are still empty and hidden. To add one, upload it to YouTube (Unlisted or Public, with embedding allowed) and paste the link into `youtube` in `src/content/videos.ts`.
- **Titles and descriptions of the two empty video slots** were inferred from the file names. Check them when the videos are added.
- **"Built by surveyors, for surveyors. Designed inside a working surveying practice."** on the Home page. Confirm you're happy to publish it.
- **Step 3 (demo booking form):** decide where the API runs first (see *Data location* below). Then update the privacy policy to cover form submissions, and add the API's address to `connect-src` in the Content Security Policy if the form posts anywhere other than `/api`.
- **Step 4 (analytics):** add a consent banner and update the cookie notice *before* any Google tag goes live.

## Hosting

| Setting | Value |
|---|---|
| Azure resource | Static Web App **SurveySuite**, resource group **SurveySuite** |
| Plan | Free |
| Default address | https://icy-dune-0c5152210.7.azurestaticapps.net |
| Custom domains (in Azure) | `www.surveysuite.co.uk` and `surveysuite.co.uk`, both showing **Ready** (28 Oct 2026) |
| Application settings | None yet (Step 3 will add mail settings here, never in the repo) |
| Deployment token | GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN_ICY_DUNE_0C5152210` (a Static Web Apps token, not an Entra client secret) |
| Repo | https://github.com/robpkenny/surveysuite-website, branch `main` |
| Workflow | `.github/workflows/azure-static-web-apps-icy-dune-0c5152210.yml` |

**Approved decisions:**
- Retention periods in the privacy policy: 24 months for enquiries, 6 years for customer records (approved by Rob, 28 Oct 2026).
- Development happens in `C:\dev\surveysuite-website`, outside OneDrive. OneDrive sync caused a file conflict when the repo lived there, so don't clone it into OneDrive again.

**Data location:** the Static Web App's region is **Central US**, so managed `/api` functions would run there. Static Web Apps can only be created in Central US, East US 2, West US 2, West Europe or East Asia (no UK region), and the region can't be changed after creation. Decide before Step 3.

**Rules:** never create Entra client secrets (tenant policy blocks them). Don't change Azure resources or DNS without Rob's approval. Never touch MX, SPF, DKIM or DMARC records.

## DNS (as found on 28 Oct 2026, registrar 123 Reg)

| Name | Currently points to | Target after cutover |
|---|---|---|
| `www` | CNAME `surveysuitehome.powerappsportals.com` (old Power Pages portal, shows "Page not found"; certificate doesn't match) | CNAME `icy-dune-0c5152210.7.azurestaticapps.net.` (123 Reg needs the trailing full stop) |
| root `surveysuite.co.uk` | 123 Reg web forwarding, 301 to `http://www.surveysuite.co.uk` | 123 Reg web forwarding, Permanent (301) to `https://www.surveysuite.co.uk` |

The cutover steps (removing www from the Power Pages portal, the CNAME change, then the root forwarding) will be added here when we reach that stage.

## How to deploy

1. Create a branch from `main` and make changes.
2. Open a pull request into `main`. GitHub Actions builds the site and Azure publishes a **preview copy**. Its address is posted as a comment on the PR (like `https://icy-dune-0c5152210-<PR number>.westeurope.7.azurestaticapps.net`).
3. Test the preview. The Free plan allows 3 previews at once; closing the PR deletes its preview.
4. Check the go-live blockers above, then merge. Merging to `main` publishes to the live site automatically.

Azure builds the site itself: it runs `npm install` and `npm run build` with Node 22 (set by `engines` in `package.json`) and publishes the `dist` folder.

## Running it locally

```sh
npm ci          # install packages
npm run dev     # local dev server with live reload
npm run build   # type-check and build to dist/
```

The dev server doesn't apply `staticwebapp.config.json` (headers, redirects, 404s); only Azure and the PR preview do.

## Where things live

| What | Where |
|---|---|
| Company details, contact and privacy emails | `src/content/site.ts` |
| Product names, features, copy | `src/content/products.ts` |
| Demo videos (YouTube links) | `src/content/videos.ts` |
| Pages | `src/pages/` |
| Privacy policy / cookie notice | `src/pages/Privacy.tsx`, `src/pages/Cookies.tsx` (update `policyUpdated` in `site.ts` when they change) |
| Routing, 404s, headers, caching, redirects | `staticwebapp.config.json` |
| robots.txt, sitemap.xml, images, favicon | `public/` |

### Adding a page

1. Add the route in `src/App.tsx`.
2. Add a matching `{ "route": "/new-page", "rewrite": "/index.html" }` line to `staticwebapp.config.json`. Without it, the page returns a 404 when opened directly.
3. Add it to `public/sitemap.xml`.

### staticwebapp.config.json in brief

- **Pages:** each real page is listed and served by the app. Anything else returns a **real 404** with the site's own "page not found" screen.
- **Redirects:** `/index.html` → `/`; trailing slashes removed; the old holding-page logo address → `/images/survey-suite-logo.png`.
- **Caching:** built files in `/assets/` have unique names per build, so they're cached for a year. Pages are always re-checked, so updates show straight away.
- **Security headers:** Content Security Policy, no framing by other sites, nosniff, Referrer-Policy, Permissions-Policy. The CSP allows only this site, Google Fonts and `youtube-nocookie.com` embeds. **Any new third-party service (analytics, form provider, chat widget) must be added to the CSP or it will be blocked.**

### Videos

Videos are never stored in this repo. They play from YouTube using the privacy-enhanced `youtube-nocookie.com` domain, and only after the visitor presses play: nothing is loaded from YouTube before then.
