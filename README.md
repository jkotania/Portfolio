## Personal Portfolio

My portfolio website built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com). It showcases my projects, work experience, and provides an easy way to get in touch. The site is fast, responsive, SEO-friendly, and deployable with a single command.

## Features

- Responsive, accessible UI with Tailwind CSS
- Projects and experience sections with links and visuals
- Downloadable resume from `public/CV/`
- SEO basics: `sitemap.xml`, `robots.txt`, and metadata
- Contact form powered by a Next.js API route (`src/app/api/send/route.js`)
- Basic analytics hook (`src/app/hooks/useAnalytics.js`)

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI**: React + Tailwind CSS (configured via `tailwind.config.mjs` and `postcss.config.mjs`)
- **Deployment**: Vercel (recommended) or any Node-compatible host
