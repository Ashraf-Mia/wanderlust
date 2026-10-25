# AGENTS.md

## Project

Wanderlust — a single Next.js 16 (App Router) app, not a monorepo. It is still mostly the create-next-app starter page with a shadcn/ui setup added on top. npm is the package manager (`package-lock.json`). Dev runs on Windows/PowerShell.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build (also typechecks)
- `npm run lint` — ESLint over the whole project (flat config on `eslint-config-next`)
- There is no test or typecheck script; typecheck with `npx tsc --noEmit`

## Stack quirks

- `next.config.ts` enables `cacheComponents: true` (Cache Components), `partialPrefetching: true`, and `reactCompiler: true`. CSS is compiled by the `@tailwindcss/turbopack` rule — do not add PostCSS or Tailwind config files.
- **This Next.js version has breaking changes.** Consult `node_modules/next/dist/docs/` before writing Next.js code (see managed block at the bottom).
- With Cache Components on, route segment configs are migrated away: do not add `export const dynamic` / `revalidate` / `fetchCache` / `runtime`. Use `"use cache"` with `cacheLife` / `cacheTag` for caching. Component state now persists across navigations (React `<Activity>`), so `useState`, form inputs, and scroll position survive navigation — do not rely on them resetting.
- `PageProps<'/route'>` and `LayoutProps<'/route'>` are generated global helpers with no import (the root layout already uses `LayoutProps<"/">`).
- Path alias: `@/*` maps to `./src/*`.

## UI / styling

- Tailwind CSS v4, CSS-first: there is no `tailwind.config`. Theme tokens live in `src/app/globals.css` (`@theme inline` plus shadcn CSS variables in oklch, neutral base). Dark mode is the `.dark` class variant.
- shadcn CLI v4 with style `base-nova`: components are built on **`@base-ui/react`, not Radix** — do not paste Radix-based shadcn examples. Add components with `npx shadcn add <name>` (config in `components.json`); they land in `src/components/ui/`, and `@/hooks` (aliased there) does not exist yet.
- `cn` comes from the `cn` npm package, re-exported by `src/lib/utils.ts`; components import `{ cn } from "cn"` directly. Follow that pattern.
- Font: Josefin Sans via `next/font/google`, applied as a class on `<html>` in `src/app/layout.tsx` (the `--font-sans` CSS variable is not wired to it).

## Layout of src/

- `src/app/` — routes (only `/` exists); `src/components/ui/` — shadcn primitives; `src/lib/` — helpers (`utils.ts`).
- No tests, no CI workflows, no `.env` files (none required yet; `.env*` is gitignored).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
