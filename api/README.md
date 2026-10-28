# Survey Suite website API

One endpoint: `POST /api/enquiry`, the demo booking form. It checks the enquiry, filters spam and emails it to the shared mailbox **hi@surveysuite.co.uk** through Microsoft 365. Nothing is stored.

- **Runs in:** Azure Functions `func-surveysuite-api-uks` (Flex Consumption, **UK South**), linked to the Static Web App's `/api`. It only answers requests that come through the website.
- **Signs in with:** the user-assigned managed identity `id-surveysuite-api`. There are no secrets. Exchange limits it to sending as hi@ only (Exchange "RBAC for Applications").
- **Deploys:** `.github/workflows/deploy-api.yml`, on push to `main` when `api/` changes. GitHub signs in with OIDC, so no secrets are stored.

## Application settings (set on the function app, never in the repo)

| Setting | Value |
|---|---|
| `MANAGED_IDENTITY_CLIENT_ID` | client ID of `id-surveysuite-api` |
| `MAIL_FROM` / `MAIL_TO` | `hi@surveysuite.co.uk` |
| `ALLOWED_ORIGINS` | `https://www.surveysuite.co.uk` |
| `ENQUIRY_DRY_RUN` | `true` to check everything without sending email; `false` (or absent) to send |

## Request

```json
{
  "name": "Jane Surveyor",
  "email": "jane@practice.co.uk",
  "practice": "Example Surveyors Ltd",
  "phone": "01243 123456",
  "product": "auto",
  "surveyors": "2–5",
  "message": "Optional",
  "website": "",
  "elapsedMs": 12000
}
```

- **Required:** `name`, `email`, `practice` and `product` (`auto`, `desktop`, `mobile`, `inspect` or `not-sure`).
- **Optional:** `phone`, `message` and `surveyors` (`1`, `2–5`, `6–10` or `10+`).
- **Spam fields:**
  - `website` is a hidden honeypot and must stay empty.
  - `elapsedMs` is how long the form was open; it must be at least 3 seconds.

## Responses

| Status | Body | Meaning |
|---|---|---|
| 200 | `{ "ok": true }` | Sent. Bots also get this, but nothing is sent for them. |
| 400 | `{ "errors": { "field": "message" } }` | Fix the fields shown. |
| 403 | `{ "error": "Forbidden." }` | Not from the website. |
| 413 | `{ "error": "…" }` | Too long. |
| 429 | `{ "error": "…" }` | More than 5 enquiries an hour from one visitor. |
| 502 | `{ "error": "…" }` | Sending failed; the message asks the visitor to email hi@ instead. |

**Logs** record outcomes only (sent, blocked, rejected, error, plus the product). They never record names, emails, phone numbers or messages.

## Working on it locally

```sh
cd api
npm ci
npm test                                  # unit tests, no Azure needed
cp local.settings.example.json local.settings.json   # dry run: never sends email
npm start                                 # needs Azure Functions Core Tools v4
```
