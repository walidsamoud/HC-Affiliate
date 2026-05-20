# CrownX Partners — Affiliate Portal

Standalone Next.js application for the official CrownXBet affiliate program.

Lives at `affiliate.crownxbet.com`. Talks to the same Laravel API (`api.crownxbet.com`) used by the main casino site.

## Stack

- Next.js 13 (App Router)
- React 18
- `next-intl` (en/tr)
- Sass (single global stylesheet — see `styles/globals.scss`)
- Axios for the API client

## Scripts

```bash
npm install
npm run dev     # runs on http://localhost:3200
npm run build
npm run start   # serves the production build on :3200
```

## Environment

Copy `.env.example` to `.env` and adjust:

```
NEXT_PUBLIC_APP_URL="https://affiliate.crownxbet.com"
NEXT_PUBLIC_MAIN_SITE_URL="https://crownxbet.com"
NEXT_PUBLIC_API_URL="https://api.crownxbet.com"
NEXT_PUBLIC_DEFAULT_LANGUAGE="en"
```

## Project structure

```
affiliate/
├── messages/                  next-intl bundles (en.json, tr.json)
├── public/                    static assets (logo, og image, robots.txt)
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.js      header / footer / NextIntlClientProvider
│   │       ├── page.jsx       landing
│   │       ├── login/         partner login
│   │       ├── join/          public registration
│   │       ├── contact/       support-ticket form (creates backoffice ticket)
│   │       ├── faq/           16 FAQs, tabbed
│   │       └── dashboard/     (Phase 3 — authenticated area)
│   ├── components/            Header, Footer
│   ├── _services/             API services (auth, dashboard, …)
│   ├── lib/api.js             axios instance + token storage
│   ├── theme.config.js        brand & program constants
│   ├── i18n.ts                next-intl request config
│   └── middleware.ts          locale prefix middleware
└── styles/globals.scss        single dark-glass design system
```

## Backend integration

All endpoints live under `/api/affiliate/*` in the Laravel API:

- Public: `POST /login`, `POST /register`, `POST /contact`
- Authenticated: `GET /me`, `POST /logout`, `POST /change-password`,
  `GET /stats`, `GET /players`, `GET /sub-affiliators`, `POST /sub-affiliators`,
  `GET /withdrawals`

## Affiliate program rules

- Player commission: 10% of monthly GGR (bets − wins), converted to EUR.
- Sub-affiliator commission: 10% of the sub-affiliator's own commission.
- Base currency: **EUR** (auto-converts player currency via `FxService`).
- Withdrawals are auto-generated at 23:59 on the last day of each month with
  status `pending`. No minimum threshold.
- Approval is **manual** by an admin — new accounts land in `pending` until
  reviewed in the backoffice.
