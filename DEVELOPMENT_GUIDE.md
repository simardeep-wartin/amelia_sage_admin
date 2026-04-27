# Development Guide

## Table of Contents

1. [Definition of Ready (DoR)](#definition-of-ready)
2. [Definition of Done (DoD)](#definition-of-done)
3. [Git Workflow](#git-workflow)
4. [API Standards](#api-standards)
5. [TypeScript Standards](#typescript-standards)
6. [Best Practices](#best-practices)

---

## Definition of Ready

A ticket is ready to be picked up when ALL of the following are true:

- [ ] Acceptance criteria are written and unambiguous
- [ ] Design mockup is linked (for any UI work)
- [ ] Affected routes / API endpoints are identified
- [ ] Dependency on external backend is documented (mock or real)
- [ ] Edge cases and error states are described
- [ ] Ticket is scoped to a single concern (split if unclear)

---

## Definition of Done

A PR is shippable when ALL of the following are true:

- [ ] Acceptance criteria from the ticket are met
- [ ] No `any` types introduced
- [ ] No hardcoded secrets, tokens, or credentials
- [ ] Zod validation added for any new API route input
- [ ] Import paths use the correct casing (`@/Services/`, `@/lib/`, etc.)
- [ ] No new utility functions duplicated — added to `lib/` and re-exported if needed
- [ ] Navigation changes go through `Services/navigationService.ts` only
- [ ] No UI / CSS changes unless the ticket explicitly requires it
- [ ] TypeScript compiles without errors (`pnpm build`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] PR description explains _why_, not just _what_
- [ ] QA sign-off received

---

## Git Workflow

### Branch Naming

```
feat/<short-description>      # new feature
fix/<short-description>       # bug fix
refactor/<short-description>  # code quality, no behaviour change
chore/<short-description>     # tooling, deps, config
docs/<short-description>      # documentation only
```

### Commit Style (Conventional Commits)

```
<type>(<scope>): <short summary>

feat(auth): integrate real backend login via authApi
fix(sidebar): correct import path casing for navigationService
refactor(demographics): extract inline data to constants
docs(architecture): add request flow diagrams
```

Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`

### PR Rules

- One concern per PR — do not bundle features with refactors
- Link the ticket in the PR description
- Self-review before requesting review
- Squash-merge into `main` after approval

---

## API Standards

### Route Handlers (`app/api/`)

Every route handler must:

1. Parse request body with `.catch(() => null)` — never let JSON.parse throw unhandled
2. Validate with Zod `safeParse` — return 400 on failure
3. Return typed `NextResponse.json()` with explicit status codes
4. Never expose raw error messages from the backend to the client

```ts
// Correct pattern
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = mySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }
  // ...
}
```

### Service Layer (`Services/`)

- One file per domain (auth, navigation, users, …)
- All `fetch` calls live here — no raw fetch in components or hooks
- Throw typed `Error` on failure; let the hook catch and expose it
- `authService.ts` — internal Next.js API routes
- `authApi.ts` — external backend (`NEXT_PUBLIC_API_BASE_URL`); use this once real backend is live

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Yes (prod) | External backend base URL |

Add to `.env.local` for local development. Never commit real secrets to `.env`.

---

## TypeScript Standards

- **Strict mode is on.** Do not disable it or add `// @ts-ignore`.
- Never use `any`. Use `unknown` and narrow, or define a proper type in `types/`.
- Shared types belong in `types/` — import from there, never redefine inline.
- Zod schemas belong in `lib/validators.ts` — co-locate the inferred type.

```ts
// Correct: infer type from schema
import { z } from "zod";
export const signInSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
export type SignInFormValues = z.infer<typeof signInSchema>;
```

---

## Best Practices

### Layers

Follow this dependency direction — outer layers call inner layers, never the reverse:

```
Page → Hook → Service → API Route / External Backend
                      ↘ Store (read only)
```

### Do

- Keep page components under 150 lines — extract to named components or hooks
- Add one Zod schema per API boundary
- Source all navigation from `Services/navigationService.ts`
- Put new utilities in `lib/`; if backwards-compat matters, re-export from `utils/`
- Use `cn()` from `@/lib/utils` for conditional class names

### Do Not

- Do not call `fetch` inside a component or page — use a service
- Do not hardcode auth tokens, user IDs, or API responses in route handlers
- Do not duplicate type definitions — import from `@/types/`
- Do not define navigation in `Sidebar.tsx` — it already reads from `navigationService`
- Do not use `localStorage` directly — the Zustand store handles persistence
- Do not merge a PR that fails `pnpm build` or `pnpm lint`

### Placeholder Pages

Pages using `<PlaceholderPage />` are explicitly unimplemented. Before building one:
1. Create a ticket with full acceptance criteria
2. Get design mockup approved
3. Follow the layer pattern — no one-off inline data

### Adding a New Feature Page

1. Create `app/<feature>/page.tsx` — thin, delegates to components
2. Create `components/<feature>/` for domain components
3. Create `Services/<feature>Service.ts` for all fetch logic
4. Create `hooks/use<Feature>.ts` to wire service → component state
5. Add the route to `Services/navigationService.ts`
6. Add types to `types/<feature>.ts` if needed
