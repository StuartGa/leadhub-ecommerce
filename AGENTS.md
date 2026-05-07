# AGENTS.md

## Commands

```bash
npm run dev      # Start dev server
npm run build    # TypeScript check → Vite production build
npm run lint     # ESLint (React Hooks + refresh plugins)
npm run preview  # Preview production build locally
```

Build must pass both `tsc -b` and `vite build` — always run the full `npm run build` before considering work done.

## Architecture: Clean Architecture (layered)

```
src/
  domain/         # Types & schemas — zero UI deps
    types/        #   Product, GHL interfaces
    schemas/      #   Zod validation schemas
  application/    # Use cases & orchestration
    hooks/        #   useGHLIntegration
    services/     #   productService (DOMPurify-sanitized reads)
  infrastructure/ # External data sources
    data/         #   products.json (local catalog)
  ui/             # Pure presentation
    components/   #   catalog/ form/ layout/
    pages/        #   HomePage
```

**Dependency rule:** `ui/` can import from `application/` and `domain/`. `domain/` imports nothing. `application/` imports only from `domain/` and `infrastructure/`. Layer violations will break TypeScript paths — respect the folder boundaries.

## TypeScript Strictness

`tsconfig.app.json` enforces:

| Setting | Implication |
|---|---|
| `verbatimModuleSyntax: true` | Type-only imports **must** use `import type { X }` |
| `noUnusedLocals: true` | No dead variables — build fails |
| `noUnusedParameters: true` | No dead function params — build fails |
| `erasableSyntaxOnly: true` | No enums or namespaces |

**When adding new files, always check types with `npx tsc -b --noEmit` before running the full build.**

## Tailwind CSS v4 (not v3)

Tailwind is configured via the CSS `@theme` block in `src/index.css`, **not** a `tailwind.config.js`. The `@tailwindcss/vite` plugin handles processing.

Custom design tokens:

- `--color-brand-*` (Indigo scale, 50–950) → classes: `bg-brand-500`, `text-brand-600`
- Slate scale is built-in: `slate-50` through `slate-950`
- For new tokens, add them to the `@theme` block in `src/index.css`

## Security: Non-Negotiable

1. **`VITE_GHL_WEBHOOK_URL`** lives in `.env` only — never hardcoded. `.env` is in `.gitignore`. The template `.env.example` is committed for reference.
2. **Zod validates all form data** before it reaches the GHL `fetch` call — no bypass.
3. **`productService.ts` runs DOMPurify** on every product string (name, description, category, tags) before returning data to components. **All three service methods** (`getAll`, `getById`, `getByCategory`) sanitize. If products ever come from an API, this path is already secure.
4. **No `dangerouslySetInnerHTML`** anywhere in the codebase.
5. **HTTP error codes are not exposed to the UI** — `useGHLIntegration` catches non-2xx responses and returns a generic user-facing message.
6. **HTTP security headers** are set in three places:
   - `vite.config.ts` — dev server headers (local dev only)
   - `public/_headers` — Netlify production deployment
   - `vercel.json` — Vercel production deployment
   Headers applied: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`, `Strict-Transport-Security`.
7. **CSP `connect-src`** is scoped to `self` + `*.gohighlevel.com` only. If the webhook URL changes domain, update the CSP in all three header files.
8. **`VITE_GHL_WEBHOOK_URL` is bundled into the client JS** — this is unavoidable with a Vite SPA. Never put secret API keys in `VITE_*` variables; webhooks are acceptable here since they are write-only endpoints.

## SEO

All SEO metadata is in `index.html` (static — Vite SPA has no SSR):

- Title tag: descriptive, 60 chars, keyword-first
- `<meta name="description">` — 160 chars
- Open Graph (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`)
- Twitter Card (`summary_large_image`)
- `<link rel="canonical">` pointing to the production URL
- `<meta name="robots" content="index, follow, max-snippet:160, ...">` 
- `<meta name="theme-color">` — brand Indigo (`#4f46e5`)
- JSON-LD structured data: `Organization` + `WebSite` schemas
- `public/robots.txt` — allows all crawlers, references sitemap
- `public/sitemap.xml` — lists the homepage URL

**When deploying**, replace all `https://leadhub.example.com` occurrences in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with the real production URL. There are exactly **10 occurrences** across these three files.

## GHL Integration (`useGHLIntegration`)

States: `idle → loading → success | error`. The hook exposes `{ submit, status, error, reset }`.

- `reset()` returns to `idle` (called by ContactForm's "Send another inquiry" button)
- Error message is user-facing; network errors are caught and surfaced
- Webhook URL is read from `import.meta.env.VITE_GHL_WEBHOOK_URL`

## Component Conventions

- **Single Responsibility**: `ProductCard` only renders a product card. `ContactForm` only handles form UI and submission. The wiring lives in `HomePage`.
- **Framer Motion**: Use `whileInView` with `viewport: { once: true }` for scroll-reveal animations. Stagger with `delay: index * 0.08`.
- **Accessibility**: All form fields have `<label htmlFor>`, `aria-invalid`, and `aria-describedby` tied to error messages. `aria-live="polite"` on the success state container. Buttons have `focus-visible:ring` outlines.
- **Responsive**: Mobile-first with Tailwind breakpoints (`sm:`, `lg:`). Grid goes 1→2→3 columns.

## Adding New Features

1. Define types in `src/domain/types/`
2. If input is involved, add Zod schema in `src/domain/schemas/`
3. Create service/hook in `src/application/`
4. Build UI components in `src/ui/components/` under the appropriate subfolder
5. Compose in a page under `src/ui/pages/`

## Dependencies

| Package | Usage |
|---|---|
| `react-hook-form` + `@hookform/resolvers` + `zod` | Form state + validation |
| `framer-motion` | Product card animations |
| `dompurify` + `@types/dompurify` | XSS sanitization |
| `@tailwindcss/vite` | Tailwind CSS v4 build integration |
