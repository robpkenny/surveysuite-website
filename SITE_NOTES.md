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
- **Step 3 (demo booking form):** the API is built (PR A, see *Demo booking API* below). Still to do: the form page (PR B), a privacy-policy section for the form, then a live test.
- **ICO registration number:** add it to `company.icoNumber` in `src/content/site.ts` when it arrives.
- **Step 4 (analytics):** add a consent banner and update the cookie notice *before* any Google tag goes live.

## Hosting

| Setting | Value |
|---|---|
| Azure resource | Static Web App **SurveySuite**, resource group **SurveySuite** |
| Plan | **Standard** (£6.79/month list price, upgraded 28 Oct 2026 to link the UK South API) |
| Region | Central US (static files are served worldwide; this is where Azure keeps the app's settings) |
| Default address | https://icy-dune-0c5152210.7.azurestaticapps.net |
| Custom domain (in Azure) | `www.surveysuite.co.uk`, **Ready**, free certificate renewed automatically. The root domain was removed from Azure because 123 Reg forwards it. |
| Linked API | `func-surveysuite-api-uks` (UK South) on `/api`. Not available on PR previews. |
| Application settings | None on the Static Web App. The API's settings live on the function app. |
| Deployment token | GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN_ICY_DUNE_0C5152210` (a Static Web Apps token, not an Entra client secret) |
| Repo | https://github.com/robpkenny/surveysuite-website, branch `main` |
| Workflow | `.github/workflows/azure-static-web-apps-icy-dune-0c5152210.yml` |

**Approved decisions:**
- Retention periods in the privacy policy: 24 months for enquiries, 6 years for customer records (approved by Rob, 28 Oct 2026).
- Development happens in `C:\dev\surveysuite-website`, outside OneDrive. OneDrive sync caused a file conflict when the repo lived there, so don't clone it into OneDrive again.

- Form data is processed in the **UK**: the API is a separate Functions app in **UK South**, linked to the site (Option A, approved 28 Oct 2026). Static Web Apps has no UK region, so the site's own managed functions are not used.
- No auto-reply to people who send an enquiry; they see an on-screen confirmation only.

**Rules:** never create Entra client secrets (tenant policy blocks them). Don't change Azure resources or DNS without Rob's approval. Never touch MX, SPF, DKIM or DMARC records.

## DNS (registrar 123 Reg; cutover completed 28 Oct 2026)

| Name | Points to |
|---|---|
| `www` | CNAME `icy-dune-0c5152210.7.azurestaticapps.net.` (123 Reg needs the trailing full stop) |
| root `surveysuite.co.uk` | 123 Reg web forwarding, Permanent (301) to `https://www.surveysuite.co.uk`. Paths aren't forwarded (e.g. `/products` gives 404); Rob decided to leave this as is. |

- `www` was removed from the old Power Pages portal (`surveysuitehome`) before the cutover.
- MX, SPF, DKIM, DMARC and the TXT verification records were not touched.

**Re-test all four addresses:**
```sh
curl -sI https://www.surveysuite.co.uk | head -1                          # 200
curl -sI http://www.surveysuite.co.uk  | grep -iE "^HTTP|^location"       # 301 -> https://www
curl -sI https://surveysuite.co.uk     | grep -iE "^HTTP|^location"       # 301 -> https://www
curl -sI http://surveysuite.co.uk      | grep -iE "^HTTP|^location"       # 301 -> https://www
```

## Demo booking API (UK South)

See `api/README.md` for the endpoint, the fields and how to run it locally.

| Item | Value |
|---|---|
| Resource group | `SurveySuite-UKS` (UK South) |
| Function app | `func-surveysuite-api-uks`: Flex Consumption, Node 22, HTTPS only; answers only through the website (direct calls get 401) |
| Identity used by the app | `id-surveysuite-api`, client ID `22c85ee9-caca-4fbb-a4c8-ccdb7bc75159`. Roles: Storage Blob Data Owner/Contributor on `stsurveysuiteapi`, Monitoring Metrics Publisher on `appi-surveysuite-api` |
| Email permission | Exchange RBAC for Applications: "Application Mail.Send" scoped to **hi@surveysuite.co.uk only** (scope "SurveySuite website - hi mailbox only"). Tested 28 Oct 2026: allowed for hi@, refused for rob@. **Never** grant Mail.Send in Entra; it would apply to every mailbox. |
| Storage | `stsurveysuiteapi`: shared keys off, no public blobs, TLS 1.2 |
| Logs | `appi-surveysuite-api` + `log-surveysuite-uks` (30 days). Outcomes only, no personal details. |
| Deploys from GitHub | identity `id-surveysuite-github` (client ID `36a9f1e5-46ac-4bae-a26e-28a977c2e4f3`), OIDC trust for `repo:robpkenny/surveysuite-website:ref:refs/heads/main` only, Website Contributor on the function app only. GitHub **variables** `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`. No secrets. |
| Function app settings | `MANAGED_IDENTITY_CLIENT_ID`, `MAIL_FROM`, `MAIL_TO`, `ALLOWED_ORIGINS`, `ENQUIRY_DRY_RUN` (see `api/README.md`) |

**To undo the email permission** (Exchange Online PowerShell):
```powershell
Remove-ManagementRoleAssignment "SurveySuite website API - Mail.Send hi@ only" -Confirm:$false
Remove-ManagementScope "SurveySuite website - hi mailbox only" -Confirm:$false
Remove-ServicePrincipal -Identity 22c85ee9-caca-4fbb-a4c8-ccdb7bc75159 -Confirm:$false
```
**To unlink the API from the site:** `az staticwebapp backends unlink -n SurveySuite -g SurveySuite`

## How to deploy

1. Create a branch from `main` and make changes.
2. Open a pull request into `main`. GitHub Actions builds the site and Azure publishes a **preview copy**. Its address is posted as a comment on the PR (like `https://icy-dune-0c5152210-<PR number>.centralus.7.azurestaticapps.net`). Previews don't include the API, so forms can't be submitted there.
3. Test the preview. The Standard plan allows 10 previews at once; closing the PR deletes its preview.
4. Check the go-live blockers above, then merge. Merging to `main` publishes to the live site automatically.

- **The site:** Azure builds it itself. It runs `npm install` and `npm run build` with Node 22 (set by `engines` in `package.json`) and publishes the `dist` folder.
- **The API** (`api/`): it has its own workflow, `.github/workflows/deploy-api.yml`. Tests run on every PR that changes `api/`; merging to `main` deploys to UK South.

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
