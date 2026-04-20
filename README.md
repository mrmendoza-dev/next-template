# Next.js Template

A **Bun-first** starter for full-stack React: **React 19**, **Next.js 16** (App Router), **Tailwind CSS v4**, **shadcn-style UI** (Base UI primitives), **Drizzle** schema + SQL migrations (SQLite file via **`bun:sqlite` in Bun-only scripts** — no **`better-sqlite3`** / native Node DB addon), **TanStack Query** for client state, and versioned **Route Handlers** under `/api/v1`. Linting and formatting are unified with **Biome**; **Turborepo** runs the CI task graph (`lint` → `test` → `build`).

Add optional narrative docs (for example `docs/CHANGELOG.md` or a modernization note) beside the repo if you want the same “why we changed X” story as other templates.

## Features

- **Runtime & tooling:** Bun 1.3+ (`packageManager` pinned in `package.json`), Turborepo pipeline, Vitest + Testing Library deps, GitHub Actions CI
- **Framework:** Next.js App Router, React 19, TypeScript strict, `next/font` (Geist), Route Handlers for API
- **Styling:** Tailwind v4 (`@tailwindcss/postcss`), theme tokens in CSS (`src/app/globals.css`, `src/styles/`)
- **UI:** Broad shadcn/ui kit under `src/components/ui/` (`@base-ui/react`, `components.json` for the CLI), `AppShell` with sidebar and navbar
- **Data:** TanStack Query (`src/lib/query-client.ts`, `src/contexts/providers.tsx`); public API URL helper in `src/lib/config.ts` (`NEXT_PUBLIC_API_URL` or same-origin)
- **Database:** Drizzle schema in `src/lib/db/schema.ts`, migrations in `drizzle/`; apply with **`bun run db:migrate`** (`scripts/migrate.ts` uses **`bun:sqlite`**). Next.js Route Handlers stay free of SQLite/native drivers — `/api/v1/examples` is a placeholder until you wire your own store.
- **Quality:** Biome (`lint`, `format`, `check` / `ci`)

## Prerequisites

- **[Bun](https://bun.sh/)** 1.3+ (recommended; matches `package.json` `packageManager`)

```bash
bun --version
```

## Setup

### Clone the repository

```bash
git clone https://github.com/your-org/next-template.git
cd next-template
```

### Install dependencies

```bash
bun install
```

### Environment

Next.js loads env from **`.env.local`** (and other [standard env files](https://nextjs.org/docs/app/guides/environment-variables)). Nothing is required for a local dev start; add as needed:

```env
# Optional: SQLite path (default data/dev.db)
# DATABASE_PATH=data/dev.db

# Optional: call a separate API origin from the browser; unset = same-origin paths only
# NEXT_PUBLIC_API_URL=http://127.0.0.1:3000

```

## Running the application

### Development

```bash
bun run dev
```

Next.js dev server (default **http://localhost:3000**). API routes are same-origin, e.g. `GET /api/v1/health`.

### Production build & run

```bash
bun run build
bun run start
```

Serves the production build (default port **3000**, or `PORT`).

## Scripts

| Script | Description |
| ------ | ----------- |
| `bun run dev` | Next.js dev server |
| `bun run build` | Production build |
| `bun run start` | Run production server (after `build`) |
| `bun run test` | Vitest once |
| `bun run test:watch` | Vitest watch mode |
| `bun run lint` / `lint:fix` | Biome check / write |
| `bun run format` | Biome format |
| `bun run check` | `biome ci` |
| `bun run ci` | Turbo: `lint`, `test`, `build` |
| `bun run db:generate` | Drizzle Kit: generate SQL from schema |
| `bun run db:migrate` | Apply migrations via `scripts/migrate.ts` (Bun + `bun:sqlite`) |
| `bun run db:push` / `db:studio` | Drizzle Kit (inspect/push against `drizzle.config.ts`) |

## Project structure

```
next-template/
├── .github/
│   └── workflows/          # CI (bun install + bun run ci)
├── data/                   # Default SQLite file (e.g. dev.db); gitignored; path via DATABASE_PATH
├── drizzle/                # Generated SQL migrations + meta
├── public/                 # Static assets (favicon path, robots.txt, icons)
├── scripts/
│   └── migrate.ts          # Bun-only migrate (bun:sqlite + Drizzle migrator)
├── src/
│   ├── app/
│   │   ├── (app)/          # Route group: home, chat, profile, detail/[id], dev/error-boom, error.tsx
│   │   ├── api/v1/         # Route Handlers (health, examples, …)
│   │   ├── globals.css     # Tailwind entry + tokens
│   │   └── layout.tsx      # Root layout, fonts, providers
│   ├── components/
│   │   ├── common/         # e.g. theme toggle
│   │   ├── dev/            # Dev-only error triggers / boom UI
│   │   ├── feedback/       # Error boundary, generic error UI
│   │   ├── layout/         # AppShell, navbar, sidebar
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # QueryClient, theme, application context
│   ├── hooks/              # use-mobile, use-local-storage, …
│   ├── lib/                # config, `db/schema.ts`, query-client, utils (cn)
│   └── styles/             # shadcn.css, base.css (imported from globals)
├── tests/                  # Vitest (see vitest.config.ts)
├── biome.json
├── components.json         # shadcn CLI
├── drizzle.config.ts
├── next.config.ts          # Security headers
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── turbo.json
└── vitest.config.ts
```

## Environment variables

| Variable | Description | Required |
| -------- | ----------- | -------- |
| `DATABASE_PATH` | SQLite file path (migrate script + Drizzle Kit) | No (default `data/dev.db`) |
| `NEXT_PUBLIC_API_URL` | Absolute API origin for browser calls; if unset, use same-origin paths | No |

## Tech stack

### App & UI

- React 19, TypeScript, Next.js 16 (App Router), `next/font`
- Tailwind CSS v4, `tailwind-merge`, `class-variance-authority`
- shadcn/ui-style components (`@base-ui/react`, `shadcn` CLI)
- TanStack Query, Lucide icons, `next-themes`, Sonner toasts

### Data & API

- Drizzle ORM (schema + Kit); SQLite access for **migrations** uses Bun’s **`bun:sqlite`** in `scripts/migrate.ts` only — **no `better-sqlite3`**
- REST shape under **`/api/v1`** (see `src/app/api/v1/`); example list route is a **placeholder** (`[]`) until you connect a datastore

### Tooling

- Biome (lint + format), Turborepo, Vitest, Testing Library, jsdom (for future component tests)

## Included UI & behavior

- **Layout:** `AppShell` with collapsible sidebar, navbar, theme toggle, `Toaster`
- **Routes:** Home, Chat, Profile, generic detail (`/detail/[id]`), dev error playground (`/dev/error-boom`)
- **Errors:** `error.tsx` in the `(app)` group (Try again + Back to home), client `ErrorBoundary` in root and shell
- **Hooks:** e.g. `useIsMobile` (`use-mobile.ts`), `useLocalStorage` (sidebar state)

## Testing

- **Vitest** — `tests/**/*.test.ts` / `tests/**/*.test.tsx` (see `vitest.config.ts`), `@/*` alias matches app code

```bash
bun run test
bun run test:watch
```

## Deployment

- **Output:** Next.js production server (`bun run build` then `bun run start`) or a platform that runs the Node server (Docker, VPS, etc.).
- **Vercel / serverless:** Prefer a hosted database for app data; Route Handlers here do not open a local SQLite file.
- **Netlify / static-only hosts:** Use a Next adapter or host the Node/Bun runtime your deployment requires.

Apply schema changes locally with **`bun run db:migrate`** (requires **Bun**). CI does not need SQLite for `next build`.

## Customizing theme & components

- Global tokens and layers: `src/app/globals.css` and `src/styles/`
- Use the `cn()` helper from `src/lib/utils.ts` for class composition
- Add or regenerate shadcn components with the `shadcn` CLI and `components.json`

## Troubleshooting

- **Module not found:** Run `bun install`; check `@/*` paths and case-sensitive imports
- **Styles look wrong:** Confirm `globals.css` imports Tailwind and `src/styles/*`; check dark mode class on `<html>`
- **Migrations:** Run `bun run db:migrate` (uses `bun:sqlite`; must run with **Bun**, not plain `node`). Root TypeScript excludes `scripts/` so `next build` does not typecheck `bun:sqlite`.
- **DB from API routes:** Wire your own client (hosted SQL, HTTP API, etc.); this template avoids native DB bindings in Next for a smaller Node surface

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Drizzle](https://orm.drizzle.team/), [TanStack Query](https://tanstack.com/query), [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/), [Bun](https://bun.sh/), [Turborepo](https://turbo.build/), [Biome](https://biomejs.dev/)
