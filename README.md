# Ministerial Comfort and Renewal (MCR)

Public website for **Ministerial Comfort and Renewal (MCR)**—support, counseling, and resources for ministers through the Foursquare Gospel Church in Nigeria.

Built with [Next.js](https://nextjs.org/) 14 (App Router), TypeScript, and Tailwind CSS.

## Features

- Marketing and information pages: home, services, gallery, eligibility, FAQ, about content from JSON
- **Events** listing and **event registration** flows (with support notifications via EmailJS)
- **Blog** with markdown-backed articles (generated build step for long-form content)
- REST-style **API routes** under `app/api/*` that read from `data/*.json`
- Open Graph / Twitter metadata and a generated share image (`public/assets/og-share.jpg`)

## Requirements

- **Node.js** 18+ (LTS recommended)
- **npm** (ships with Node)

## Getting started

```bash
git clone <repository-url>
cd ministerial-comfort
npm install
```

Create a **`.env.local`** file in the project root (Next.js loads it automatically). See [Environment variables](#environment-variables) below.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses the site URL from env or falls back to `http://localhost:3000` for metadata.

## Environment variables

| Variable | Required for | Description |
|----------|----------------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Metadata, OG URLs, EmailJS template | Public site origin, no trailing slash (e.g. `https://www.example.org`) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Contact & registration emails | [EmailJS](https://www.emailjs.com/) public key |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Contact & registration emails | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Contact & registration emails | EmailJS template ID (params must match `lib/sendSupportEmail.ts`) |

If EmailJS variables are missing, the app throws a clear configuration error when sending mail.

**Production:** On Netlify, `URL` is set automatically; you can still set `NEXT_PUBLIC_SITE_URL` for a canonical domain. On Vercel, `VERCEL_URL` is used when `NEXT_PUBLIC_SITE_URL` is unset.

## npm scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Next.js dev server |
| `npm run dev:clean` | Remove `.next` cache, then start dev |
| `npm run build` | Production build |
| `npm run start` | Run production server (after `build`) |
| `npm run lint` | Run ESLint via Next.js |
| `npm run clean` | Delete `.next` build output |
| `npm run data:blog-articles` | Regenerate `data/blog/articles.json` from `scripts/build-blog-articles.cjs` |
| `npm run build:og-share` | Regenerate `public/assets/og-share.jpg` (1200×630) using `jimp`; run after logo/branding changes |

## Content

Site copy and structured content live under **`data/`**:

- `about.json`, `services.json`, `faq.json`, `eligibility.json`, `gallery.json`
- `events.json`, `news.json`
- `blog/posts.json` and `blog/articles.json` (articles often updated via `npm run data:blog-articles`)

Edit these files and redeploy; no database is required for static content.

## Email templates

HTML templates for EmailJS live in **`emailjs-templates/`** (for reference when configuring the EmailJS dashboard). Application code sends fields documented in `lib/sendSupportEmail.ts`.

## Deployment

The repo includes **`netlify.toml`** with the Next.js plugin (`@netlify/plugin-nextjs`), build command `npm run build`, and security/cache headers for static assets.

Set the `NEXT_PUBLIC_*` variables in the Netlify UI (or your host’s equivalent) before relying on contact or registration email.

## Project structure (overview)

```
app/           # App Router pages and API routes
components/    # React UI components
data/          # JSON content sources
lib/           # Shared utilities, EmailJS, validation, server readers
public/assets/ # Images, logos, OG share image
scripts/       # Node scripts for blog JSON and OG image generation
store/         # Zustand stores (forms, UI)
types/         # TypeScript types for content shapes
```

## License

This project is **private** (`"private": true` in `package.json`). All rights reserved unless otherwise stated by the owners.

## Email JS 
Email service is being managed by Email JS service
The service connected to this project is authenticated via the cedarcedigital@gmail.com email. 
