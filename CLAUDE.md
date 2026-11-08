# CLAUDE.md — big-nuxt-app

> Context file for AI assistants (Claude Code etc.). Read this before doing anything in the repo.

## 1. What this project is

A **learning project**. One large Nuxt 4 app that uses the free [DummyJSON](https://dummyjson.com/docs) API to practise:

- **Architecture** — clear layers (UI → composables → BFF server → external API), shared types
- **TypeScript** — strict mode, no `any`, typed API responses (OpenAPI-generated if a spec is available, hand-written otherwise)
- **Rendering modes** — CSR, SSR, SWR, ISR, SSG in the same app via `routeRules`
- **Caching** — Nitro cached handlers, route rules, Nuxt data cache (`useNuxtData`, `getCachedData`), HTTP cache headers
- **Big data** — pagination, search, sort, filtering, infinite scroll, virtual lists (10k–100k rows)
- **Performance** — lazy hydration, islands, lazy components, image optimisation, bundle analysis
- **Testing** — Vitest (unit + Nuxt runtime), integration, Cypress e2e (happy paths)

## 2. How to help me (mentor mode) — IMPORTANT

I am a senior frontend dev learning deeper Nuxt/architecture. I want to **write the logic myself**.

- **Default: explain + hint, don't implement.** Give the approach, the relevant Nuxt APIs, and a short snippet or skeleton. Let me write the real code.
- **Full code is OK for:** styling/CSS, static content, config boilerplate, test fixtures, or when I explicitly ask "give me the code".
- Explain the **why** (trade-offs, what happens on server vs client, what gets cached where) in a few sentences, not essays.
- When reviewing my code: point out bugs, type holes, hydration risks, caching mistakes, and perf issues. Be direct.
- One task at a time. Suggest the next step at the end.
- Never run destructive commands (`git reset --hard`, deleting folders, force push) without asking.
- I'm on **Windows 11 / PowerShell / VS Code**. Give PowerShell-compatible commands. Use `pnpm dlx` instead of `npx`.
- If unsure about a Nuxt API (the framework moves fast), say so and point me to the docs page instead of guessing.

## 3. Stack

| Area | Choice |
|---|---|
| Runtime | Node **24.22.2** (nvm-windows), see `.nvmrc` |
| Package manager | **pnpm** |
| Framework | **Nuxt 4** (Vue 3, Vite, Nitro), `app/` directory structure |
| Language | TypeScript (strict), `<script setup lang="ts">` only |
| State | Pinia (`@pinia/nuxt`) for client state; Nuxt data cache for server state |
| Styling | _TBD in the styling task_ |
| Lint/format | `@nuxt/eslint` with stylistic rules (no Prettier) |
| Testing | Vitest + `@nuxt/test-utils`, `@vue/test-utils`, Cypress |
| API | DummyJSON, accessed **only through our own Nitro server routes** (BFF) |
| CI | GitHub Actions |

## 4. Commands

```powershell
pnpm install          # install deps
pnpm dev              # dev server → http://localhost:3000  (DevTools: Shift+Alt+D)
pnpm build            # production build (.output/)
pnpm preview          # run the production build locally
pnpm generate         # full static generation (not our main target)
pnpm lint             # eslint
pnpm lint:fix         # eslint --fix
pnpm typecheck        # nuxt typecheck (vue-tsc)
pnpm test             # vitest            (added in the test task)
pnpm test:e2e         # cypress           (added in the test task)
```

## 5. Folder structure

Folders are created **when the task needs them** — don't scaffold empty folders.

```
big-nuxt-app/
├─ app/                        # Vue side (Nuxt 4 srcDir)
│  ├─ app.vue                  # root: <NuxtLayout><NuxtPage/></NuxtLayout> + global indicators
│  ├─ app.config.ts            # public, reactive, non-secret config (theme, site name)
│  ├─ error.vue                # global error page
│  ├─ assets/css/              # global styles
│  ├─ components/
│  │  ├─ ui/                   # dumb reusable components → <UiButton>, <UiPagination>
│  │  ├─ layout/               # <LayoutHeader>, <LayoutFooter>, <LayoutSidebar>
│  │  └─ <feature>/            # products/Card.vue → <ProductsCard>
│  ├─ composables/             # useProducts(), useAuth(), usePagination()...
│  ├─ layouts/                 # default.vue, auth.vue, dashboard.vue
│  ├─ middleware/              # auth.ts, guest.ts, *.global.ts
│  ├─ pages/                   # file-based routes (see rendering map)
│  ├─ plugins/                 # api.ts (custom $fetch instance), etc.
│  ├─ stores/                  # Pinia stores: auth.ts, cart.ts, ui.ts
│  └─ utils/                   # pure helpers, auto-imported (formatPrice...)
├─ server/                     # Nitro — our BFF in front of DummyJSON
│  ├─ api/                     # /api/products/index.get.ts, /api/auth/login.post.ts ...
│  ├─ middleware/              # request logging, auth header injection
│  ├─ plugins/                 # nitro plugins
│  └─ utils/                   # dummyjson client, error mapping, auth helpers
├─ shared/                     # used by BOTH app/ and server/
│  ├─ types/                   # Product, User, Paginated<T>, ApiError...
│  └─ utils/                   # constants, zod schemas, pure functions
├─ public/                     # static files served as-is
├─ test/
│  ├─ unit/                    # pure TS/logic tests (node env)
│  └─ nuxt/                    # component/composable tests (nuxt env)
├─ cypress/                    # e2e specs (happy paths)
├─ .github/workflows/          # CI
├─ .vscode/                    # extensions.json, settings.json
├─ nuxt.config.ts
├─ eslint.config.mjs
├─ .env / .env.example         # .env is git-ignored
├─ .nvmrc  .gitattributes  .editorconfig
└─ CLAUDE.md  README.md
```

### Layer rules (the architecture we're learning)

```
page / component  →  feature composable  →  /api/* (Nitro BFF)  →  DummyJSON
     (UI only)        (useFetch + key,        (cache, auth,          (external)
                        mapping, state)         error mapping)
```

1. **Pages and components never call DummyJSON directly.** They call feature composables (`useProducts`), which call our `/api/*` routes.
2. **The server layer owns**: the DummyJSON base URL, auth tokens (httpOnly cookies), caching (`defineCachedEventHandler`), and mapping external errors to our `ApiError` shape.
3. **Types live in `shared/types`** so server and client agree on the contract.
4. **Server state ≠ client state.** Fetched data stays in the Nuxt data cache (`useFetch`/`useAsyncData`). Pinia is only for client state that crosses pages (auth user, cart, UI prefs).
5. **UI components are dumb**: props in, events out, no fetching.
6. URL is the source of truth for list state (page, sort, search, filters → `route.query`).

## 6. Rendering map (planned, configured in `routeRules`)

| Route | Mode | Why |
|---|---|---|
| `/` , `/about` | **SSG** (`prerender: true`) | static, never changes |
| `/products` | **SWR** (`swr: 60`) | list changes; serve cached, revalidate in background |
| `/products/**` | **ISR** (`isr: 3600`) | detail pages, CDN-cacheable |
| `/blog/**` (DummyJSON posts) | **ISR** / prerender top posts | content pages |
| `/search` | **SSR** (default) | query-dependent, no cache |
| `/login` | **SSR** | needs cookies/redirects on server |
| `/dashboard/**` | **CSR** (`ssr: false`) | private, behind auth |
| `/explorer` | **CSR** | big-data playground (virtual list, 100k rows) |

Note: real ISR needs a host that supports it (Vercel/Netlify). On `node-server` locally it behaves like SWR.

## 7. DummyJSON quick reference

- Base: `https://dummyjson.com`
- Lists: `/products`, `/users`, `/posts`, `/comments`, `/recipes`, `/todos`, `/carts`, `/quotes`
- Pagination: `?limit=20&skip=40` (`limit=0` = all). Response: `{ items[], total, skip, limit }` (items key = resource name)
- Select fields: `?select=title,price`
- Sort: `?sortBy=price&order=asc`
- Search: `/products/search?q=phone`
- Categories: `/products/categories`, `/products/category/{slug}`
- Auth: `POST /auth/login`, `GET /auth/me`, `POST /auth/refresh` (access + refresh token)
- Test user: see a user from `/users` (e.g. `emilys` / `emilyspass`)
- Always verify against the docs — it's a free API and may change.
- "Big data": DummyJSON lists are small (~200 items). For real volume we'll add a local server route that generates 10k–100k seeded fake rows.

## 8. Conventions

- **TypeScript**: strict, no `any` (use `unknown` + narrowing), prefer `type` for data shapes, use `satisfies` for config objects, generics for reusable composables (`Paginated<T>`).
- **Vue**: `<script setup lang="ts">`, `defineProps<T>()` / `defineEmits<T>()` with type-only syntax, `defineModel` for v-model.
- **Data fetching**: always pass an explicit, stable `key` to `useAsyncData`; make keys depend on params (`products:${page}:${sort}`). Use `$fetch` only for event handlers (clicks, submits), not for initial page data (avoids double fetch).
- **Naming**: components PascalCase, composables `useXxx`, stores `useXxxStore`, server routes `name.method.ts`.
- **Env/config**: secrets in `runtimeConfig` (server only), public values in `runtimeConfig.public`, overridden by `NUXT_*` env vars. Non-secret UI config in `app.config.ts`.
- **Errors**: server throws `createError({ statusCode, statusMessage, data })`; client handles via `error` from `useFetch`, `<NuxtErrorBoundary>`, or `error.vue`.
- **Git**: small commits, conventional messages (`feat:`, `fix:`, `chore:`, `test:`, `refactor:`), one branch per task (`task/03-api-layer`).
- **Line endings**: LF (enforced by `.gitattributes`).

## 9. Task roadmap

- [x] 00 Setup — Node, pnpm, create app, git, VS Code, lint, typecheck
- [x] 01 Config — `nuxt.config`, runtimeConfig/.env, routeRules skeleton, app.config, CI (lint + typecheck)
- [ ] 02 Style & layout — design system, layouts, header/nav, dark mode, fonts, icons
- [ ] 03 API layer — shared types (OpenAPI if possible), Nitro BFF, DummyJSON client, error mapping, custom fetch
- [ ] 04 Routes & rendering — pages for every mode, dynamic routes, page meta, layouts per route
- [ ] 05 Auth & middleware — login/logout, httpOnly cookies, refresh token, route + server middleware
- [ ] 06 State — Pinia (auth, cart, ui), `useState` vs Pinia, SSR-safe state
- [ ] 07 Lists — search, sort, filter, pagination synced with URL, infinite scroll
- [ ] 08 Caching — Nitro cache, routeRules, `getCachedData`, `useNuxtData`, optimistic updates, cache invalidation
- [ ] 09 Big data & performance — virtual list, 100k rows, web worker, lazy hydration, islands, bundle analysis, Lighthouse
- [ ] 10 Errors, SEO, a11y — error pages/boundaries, `useSeoMeta`, announcers, `<NuxtImg>`
- [ ] 11 Testing — Vitest unit, Nuxt runtime tests, API integration tests, Cypress happy paths
- [ ] 12 CI/CD & deploy — GitHub Actions pipeline, deploy (Vercel/Netlify for ISR)

## 10. Nuxt API learning tracker

Tick these off when used for real somewhere in the app.

**Data & cache**: `useFetch` · `useAsyncData` · `useLazyFetch` · `useLazyAsyncData` · `$fetch` · `createUseFetch` · `createUseAsyncData` · `useRequestFetch` · `useNuxtData` · `refreshNuxtData` · `clearNuxtData` · `callOnce` · `defineUseFetchAddon` / `defineUseAsyncDataAddon`

**State & cookies**: `useState` · `clearNuxtState` · `useCookie` · `refreshCookie` · Pinia

**Routing & middleware**: `useRoute` · `useRouter` · `navigateTo` · `abortNavigation` · `definePageMeta` · `defineRouteRules` · `defineNuxtRouteMiddleware` · `addRouteMiddleware` · `onBeforeRouteLeave` · `onBeforeRouteUpdate` · `setPageLayout` · `useLayout` · `<NuxtLink>` · `<NuxtPage>` · `<NuxtLayout>`

**Rendering & performance**: `routeRules` · `prerenderRoutes` · `<ClientOnly>` · `<DevOnly>` · `<NuxtClientFallback>` · `<NuxtIsland>` · `defineLazyHydrationComponent` · `prefetchComponents` · `preloadComponents` · `preloadRouteComponents` · `onPrehydrate` · `useHydration` · `<NuxtImg>` · `<NuxtPicture>` · `<NuxtLoadingIndicator>` · `useLoadingIndicator`

**SEO & a11y**: `useHead` · `useHeadSafe` · `useSeoMeta` · `useServerSeoMeta` · `<NuxtRouteAnnouncer>` · `useRouteAnnouncer` · `<NuxtAnnouncer>` · `useAnnouncer` · `<NuxtTime>` · `<Teleport>`

**Errors**: `createError` · `showError` · `clearError` · `useError` · `<NuxtErrorBoundary>` · `error.vue`

**Server / request context**: `useRequestEvent` · `useRequestHeader(s)` · `useRequestURL` · `useResponseHeader` · `setResponseStatus`

**App & plugins**: `defineNuxtPlugin` · `defineNuxtComponent` · `useNuxtApp` · `useRuntimeConfig` · `useAppConfig` · `updateAppConfig` · `useRuntimeHook` · `onNuxtReady` · `reloadNuxtApp` · `usePreviewMode`

## 11. Current status

- Current task: **00 Setup**
- Notes / decisions log: _(append decisions here as we make them, e.g. "02: chose X for styling because Y")_
