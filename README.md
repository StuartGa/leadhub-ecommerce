# LeadHub — Lead Generation SPA

A modern, production-ready single-page application built with React 19, TypeScript, and Tailwind CSS v4. LeadHub is a fictional lead generation service showcase with a complete contact workflow, product catalog, and integrated tracking.

## Features

- **Clean Architecture**: Layered architecture with clear separation between domain, application, infrastructure, and UI layers
- **Product Catalog**: 14 services with detail pages, filtering, and responsive design
- **Contact Page**: Dedicated contact page with office location, business hours, and embedded Google Maps
- **GHL Integration**: Webhook integration for lead capture via Go High Level
- **Tracking & Analytics**: Integrated support for Google Tag Manager, Google Analytics 4, and Meta Pixel with granular consent management
- **Cookie Consent**: GDPR-friendly banner with Accept/Reject/Customize options
- **SEO Optimized**: Meta tags, structured data, sitemap, and canonical URLs
- **Security First**: DOMPurify sanitization, Zod validation, secure headers, and CSP configuration
- **GitHub Pages Ready**: Includes SPA fallback for client-side routing

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** for build and dev server
- **Tailwind CSS v4** configured via `@theme` in CSS
- **React Router DOM** for client-side routing
- **React Hook Form + Zod** for form validation
- **Framer Motion** for scroll animations
- **DOMPurify** for XSS protection

## Project Structure

```
src/
  domain/         # Types & schemas (zero UI dependencies)
    types/        # Product, GHL, and tracking interfaces
    schemas/      # Zod validation schemas
  application/    # Use cases & orchestration
    hooks/        # useGHLIntegration, useTrackingConsent, usePageTracking
    services/     # productService (sanitized reads), trackingService
  infrastructure/ # External data sources
    data/         # products.json (local catalog)
  ui/             # Pure presentation
    components/   # catalog/, form/, layout/, tracking/
    pages/        # HomePage, ProductPage, ContactPage
```

## Getting Started

### Prerequisites

- Node.js 24+
- npm or pnpm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:

```
VITE_GHL_WEBHOOK_URL=https://rest.gohighlevel.com/v1/your-webhook-endpoint

# Optional tracking IDs (features work gracefully without them)
VITE_GTM_ID=GTM-XXXXXXX
VITE_GA4_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=123456789012345
```

**Security Note**: Never commit `.env` to version control. The webhook URL is bundled into the client JS (acceptable for write-only webhooks), but never use `VITE_*` for secret API keys.

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build

```bash
npm run build
```

The build runs TypeScript checking (`tsc -b`) followed by Vite production build. Output is in `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment via GitHub Actions.

**Workflow**: `.github/workflows/deploy-pages.yml`

- Triggers on push to `main` or manual dispatch
- Sets `VITE_BASE=/leadhub-ecommerce/`
- Builds and deploys to `gh-pages` branch

**SPA Routing Fallback**:

- `public/404.html` redirects 404s to `/?p=<path>`
- `src/main.tsx` reads `p` param and rewrites URL

**Important**: GitHub Pages doesn't support custom headers. The CSP in `vite.config.ts` only applies to local development. The `public/_headers` file is for Netlify/Vercel, not GitHub Pages.

### Netlify / Vercel

The project includes configuration for both:

- **Netlify**: `public/_headers` (security headers)
- **Vercel**: `vercel.json` (security headers)

Both support the full CSP and security headers in production.

## Architecture

### Dependency Rule

- **`ui/`** can import from `application/` and `domain/`
- **`application/`** imports only from `domain/` and `infrastructure/`
- **`domain/`** imports nothing (pure types and schemas)

Layer violations will break TypeScript paths. Respect folder boundaries.

### TypeScript Strictness

`tsconfig.app.json` enforces:

- `verbatimModuleSyntax: true` — type-only imports must use `import type`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `erasableSyntaxOnly: true` — no enums or namespaces

Always check types with `npx tsc -b --noEmit` before committing.

### Tailwind CSS v4

Configured via `@theme` block in `src/index.css` (not `tailwind.config.js`).

Custom design tokens:

- `--color-brand-*` (Indigo scale, 50–950) → `bg-brand-500`, `text-brand-600`
- Built-in Slate scale: `slate-50` through `slate-950`

## Security

1. **Environment Variables**: `VITE_GHL_WEBHOOK_URL` in `.env` only, never hardcoded
2. **Validation**: Zod validates all form data before GHL submission
3. **Sanitization**: `productService` runs DOMPurify on all product strings
4. **No `dangerouslySetInnerHTML`** anywhere
5. **HTTP Errors**: Not exposed to UI; generic messages returned
6. **CSP**: Configured for dev (`vite.config.ts`), Netlify (`_headers`), and Vercel (`vercel.json`)
7. **Tracking**: Only loads with user consent

## Tracking & Analytics

### Google Tag Manager

Loaded when analytics consent is granted. Configure via `VITE_GTM_ID`.

### Google Analytics 4

Loaded when analytics consent is granted. Configure via `VITE_GA4_ID`.

### Meta Pixel

Loaded when marketing consent is granted. Configure via `VITE_META_PIXEL_ID`.

### Consent Management

- **Hook**: `useTrackingConsent` manages preferences in `localStorage`
- **Banner**: `CookieConsentBanner` shows on first visit
- **Options**: Accept All, Reject All, Customize (analytics/marketing separately)
- **SPA Pageviews**: `usePageTracking` fires pageview events on route change

## SEO

- **Meta tags** in `index.html`: title, description, Open Graph, Twitter Card
- **Structured data**: Organization and WebSite schemas
- **Sitemap**: `public/sitemap.xml` (homepage, contact, 14 products)
- **Robots.txt**: `public/robots.txt`
- **Canonical URL**: Set to production GitHub Pages URL

**Note**: As a client-side SPA, SEO is limited compared to SSR. For better SEO, consider migrating to Next.js or another SSR framework.

## Contact Integration

The contact form submits to a Go High Level webhook. Workflow:

1. User fills form on `/contact` or product detail pages
2. Form validated with Zod (`contactSchema`)
3. Data sent to `VITE_GHL_WEBHOOK_URL` via `useGHLIntegration`
4. Success/error state shown to user
5. Errors are generic (no internal HTTP codes exposed)

## Product Catalog

- **Data Source**: `src/infrastructure/data/products.json`
- **Service**: `productService` (sanitized reads with DOMPurify)
- **Detail Pages**: `/products/:productId`
- **Preselection**: Product pages link to `/contact?product=:id`

## Component Conventions

- **Single Responsibility**: Each component has one clear purpose
- **Accessibility**: All form fields have labels, `aria-invalid`, `aria-describedby`, and `aria-live` for state changes
- **Responsive**: Mobile-first with Tailwind breakpoints (`sm:`, `lg:`)
- **Animations**: Framer Motion with `whileInView` and `viewport: { once: true }`

## Contributing

1. Follow the existing architecture and folder structure
2. Run `npx tsc -b --noEmit` before committing
3. Ensure `npm run build` passes
4. Respect the dependency rule (domain → application → UI)
5. Use DOMPurify for any user-generated or external content

## License

This is a demonstration project. Modify as needed for your use case.

## Contact

For questions or issues, open an issue on the GitHub repository.
