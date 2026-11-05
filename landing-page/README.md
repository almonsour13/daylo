# Daylo Landing Page

The Daylo landing page introduces the Daylo mobile planner and provides product information and Android download links. It is built with Next.js and TypeScript.

## Features

- Product overview, feature descriptions, and app screen previews.
- How-it-works, local data and privacy information, and frequently asked questions.
- Light and dark themes, responsive layouts, and reduced-motion-aware screen transitions.
- Android download links based on the latest GitHub release, with a fallback download URL.

## Requirements

- Node.js and npm.

## Local development

From this directory, install dependencies and start the development server:

```powershell
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). The page reloads as you make changes.

## Available commands

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run clean` | Remove the generated `.next` directory |

To check a production build locally:

```powershell
npm run build
npm run start
```

## Configuration

Set `NEXT_PUBLIC_SITE_URL` to the canonical public URL when deploying. It is used as the metadata base for absolute social-preview URLs; when unset, the site defaults to `http://localhost:3000`.

The download section requests the latest release from the GitHub Releases API for `almonsour13/daylo`, and uses the release's APK asset when available. If the request fails or no release is available, the page uses its configured fallback download link.

## Project structure

```text
src/
├── app/                     # App Router entry point, layout, and global styles
├── components/
│   ├── layout/              # Site header and footer
│   ├── sections/            # Landing page content sections
│   └── ui/                  # Shared interface components
├── constants/               # App screen image paths and metadata
└── hooks/                   # Theme and section observation helpers
public/
└── app/                     # Light and dark mobile app screenshots
```

The landing page is composed in `src/app/page.tsx`. Global SEO and theme setup are in `src/app/layout.tsx`.

## Deployment

Build and run the site with the production commands above, or deploy it to a platform that supports Next.js. Set `NEXT_PUBLIC_SITE_URL` to the deployed site URL so metadata and social previews use the correct origin.
