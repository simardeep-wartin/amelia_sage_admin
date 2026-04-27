<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Agent Roles & Responsibilities

## Developer

**Owns:** Feature implementation, bug fixes, code quality, and CI green.

Responsibilities:
- Follow the folder conventions in `ARCHITECTURE.md` — new features go in the correct layer (service → hook → component → page)
- Never skip the Definition of Ready checklist before picking up a ticket
- No `any` types; no inline magic strings; no hardcoded secrets
- Keep page components thin: data-fetching in hooks, logic in services, rendering only in components
- All new public utilities go in `lib/`; `utils/` only re-exports from `lib/`
- Route handlers under `app/api/` must validate input with Zod before touching any data

**Does NOT own:** QA sign-off, product scope decisions.

---

## QA Engineer

**Owns:** Acceptance testing, regression coverage, and release sign-off.

Responsibilities:
- Verify the Definition of Done checklist before approving any PR
- Test auth flows end-to-end (sign-in, protected routes, sign-out, cookie expiry)
- Validate navigation consistency — sidebar must match `Services/navigationService.ts`
- Confirm no regressions in chart/data components when page-level changes ship
- Flag any `any` type usage or missing error boundaries as a defect

**Does NOT own:** Code implementation, architectural decisions.

---

## Product Manager

**Owns:** Feature scope, acceptance criteria, and priority.

Responsibilities:
- Write tickets with a clear Definition of Ready (see `DEVELOPMENT_GUIDE.md`) before handing off to dev
- Coordinate UI changes with design — developers do NOT change CSS without a design ticket
- Treat placeholder pages as explicitly out of scope until a ticket is created for each
- Manage the Phase 2 Roadmap page as the single source of truth for upcoming features

**Does NOT own:** Implementation approach, tech-debt resolution priority.

---

## AI Agent (Claude / Copilot)

**Owns:** Code generation, refactoring, and documentation within the scope given.

Rules:
- Read `node_modules/next/dist/docs/` before generating any Next.js-specific code
- Never change UI or CSS unless explicitly instructed
- Never introduce breaking API or type changes
- Always import from `@/Services/` (capital S), `@/lib/`, `@/types/`, `@/store/`, `@/hooks/`, `@/components/`
- Dead code must be flagged, not silently removed
- Secrets and hardcoded tokens must be flagged as critical issues
