# Ishita Agrawal — Portfolio

A responsive, dark-first portfolio built with Next.js, TypeScript, Tailwind CSS, and Lucide icons. Content and public links are centralized in `src/data/portfolio.ts`.

## Requirements

- Node.js 20 or later
- npm

## Run locally

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks and production build

```powershell
npm run typecheck
npm run lint
npm run build
npm start
```

## Updating portfolio content

Edit `src/data/portfolio.ts` to update:

- Profile details and social links
- Navigation, projects, categories, and case-study content
- Experience, skills, achievements, certificates, and research

Items with `published: false` are deliberately omitted from the interface until their ownership or details are confirmed. Certificate cards are shown when their title and local `file` path are filled in; each card supports an in-page PDF preview and a link to open the document in a new tab. Add certificate PDFs under `public/certificates/` and update their metadata in `src/data/portfolio.ts`. Replace the initials artwork by providing a portrait path in the profile configuration and wiring an image component if desired.

The project's claims are intentionally limited to what was supplied or visible in the linked repositories. The research page does not publish metrics because evaluation-result artifacts were not found. The Cortex repository currently has a README but no application source. Hirenext is a private repository associated with the Bluestock experience based on the supplied details; the available repository did not independently establish individual commit authorship. The experience is described without a public source link. QuickCourt remains hidden until personal contribution is confirmed; the supplied brief is retained in the editable configuration. Courtly-Link remains hidden because its details and attribution are unverified.

## Contact form

The form validates required fields in the browser and opens a pre-filled email draft with a `mailto:` link. It does **not** send or store messages. Visitors can email `ishitaag23@gmail.com` directly if no email application opens. No server or email-service credentials are required.

## Metadata and deployment

SEO metadata, a custom favicon, Open Graph image, robots rules, and sitemap are included. Set `profile.siteUrl` in `src/data/portfolio.ts` to the chosen deployment domain before launch; canonical metadata and sitemap entries are omitted until then.

Deploy as a standard Next.js application on a provider that supports Next.js (for example, Vercel). Set no environment variables for the portfolio itself.
