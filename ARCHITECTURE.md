# Architecture

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| State | Zustand v5 with persistence |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Heroicons |
| Tables | TanStack Table |

---

## Folder Structure

```
amelia_sage_admin/
│
├── app/                        # Next.js App Router
│   ├── api/                    # Route handlers (server-side only)
│   │   ├── auth/signin/        # POST /api/auth/signin
│   │   └── navigation/         # GET /api/navigation
│   ├── layout.tsx              # Root layout (Sidebar + fonts)
│   └── [feature]/page.tsx      # One page per feature
│
├── Services/                   # Business logic & external API calls
│   ├── authService.ts          # Auth: calls /api/auth/signin
│   ├── authApi.ts              # Auth: calls external backend (NEXT_PUBLIC_API_BASE_URL)
│   └── navigationService.ts    # Single source of truth for nav structure
│
├── components/
│   ├── auth/                   # Sign-in / sign-up UI components
│   ├── charts/                 # Reusable Recharts wrappers
│   ├── common/                 # Generic containers (Card, Tabs)
│   ├── demographics/           # Domain-specific demographics cards
│   ├── layout/                 # Sidebar, Navbar, PageLayout
│   ├── loaders/                # Skeleton / loading states
│   ├── review/                 # Content review components
│   ├── risk/                   # Governance & risk components
│   └── ui/                     # Atomic design-system components (Button, Input, …)
│
├── controllers/                # Thin controller wrappers (DI boundary)
│   └── authController.ts
│
├── hooks/                      # Client-only custom hooks
│   ├── useAuth.ts              # signIn / signOut / auth state
│   └── useMobile.tsx           # Responsive breakpoint detection
│
├── lib/                        # Pure utility functions (canonical location)
│   ├── utils.ts                # cn() class-name helper
│   └── validators.ts           # Zod schemas (signInSchema, signupSchema)
│
├── store/                      # Zustand stores
│   └── authStore.ts            # Auth token + user, persisted to localStorage
│
├── types/                      # Shared TypeScript types
│   └── auth.ts                 # AuthUser, SignInRequest, SignInResponse, …
│
├── utils/                      # Re-exports from lib/ (backwards-compat shim)
│   ├── cn.ts                   # re-exports cn from lib/utils
│   └── constants.ts            # UI gradient constants
│
├── data/
│   └── app-data.json           # Static mock data (replace with API calls)
│
└── middleware.ts               # Auth guard — redirects unauthenticated users
```

---

## Request Flow

### Authenticated Page Load

```
Browser → middleware.ts
           ├── reads auth-token cookie
           ├── missing → redirect /signin?from=<path>
           └── present → NextResponse.next()
                          └── app/[page]/page.tsx
                               └── components/layout/PageLayout
                                    └── feature components
```

### Sign-In

```
SignInForm (react-hook-form + Zod)
  └── useAuth.signIn(payload)
        └── authService.login(payload)              [Services/authService.ts]
              └── POST /api/auth/signin             [app/api/auth/signin/route.ts]
                    ├── validates with signInSchema
                    ├── calls real backend (TODO: replace mock)
                    ├── sets httpOnly auth-token cookie
                    └── returns { token, user }
        └── authStore.setAuth(token, user)           [store/authStore.ts]
              └── persisted to localStorage (key: amelia-auth)
        └── router.push(redirectPath)
```

### Navigation

```
navigationService.ts  ← single source of truth
  ├── Sidebar.tsx consumes getNavigationSections()
  └── GET /api/navigation returns getNavigationPayload()
```

---

## Key Patterns

### Service Layer
All external I/O (HTTP, API calls) goes in `Services/`. Page components and hooks never call `fetch` directly.

- `authService.ts` — talks to the internal Next.js API route (`/api/auth/signin`)
- `authApi.ts` — talks to the real backend (`NEXT_PUBLIC_API_BASE_URL`); wire it in once the backend is ready

### Hooks as the Component API
Hooks translate service calls into component-friendly state (loading, error, data). Components receive props or call hooks — they never call services directly.

### Zustand for Client State
Auth state is the only global client state. Everything else is local or fetched per-page. The store is persisted to localStorage so tokens survive page refresh.

### Zod at Every Boundary
All form inputs and API request bodies are validated with Zod schemas defined in `lib/validators.ts`. Route handlers re-validate before processing.

### Middleware as Auth Guard
`middleware.ts` is the single enforcement point for authentication. Page components do not implement their own auth checks.

---

## Known Issues (To Resolve)

| Severity | Issue | File |
|----------|-------|------|
| 🔴 Critical | Mock auth — always returns hardcoded token | `app/api/auth/signin/route.ts` |
| 🟠 High | `authApi.ts` unused — real backend not integrated | `Services/authApi.ts` |
| 🟠 High | `authController.ts` unused — no instantiation point | `controllers/authController.ts` |
| 🟠 High | `/api/navigation` route never called from frontend | `app/api/navigation/route.ts` |
| 🟡 Medium | Page components > 300 lines (dashboard, demographics) | `app/dashboard/page.tsx` |
| 🟡 Medium | `any` types in demographics page | `app/demographics/page.tsx` |
| 🟡 Medium | 20+ placeholder pages not implemented | `app/*/page.tsx` |
| 🟡 Medium | No error boundaries anywhere | — |
| 🟡 Medium | Static JSON replaces real API data | `data/app-data.json` |
