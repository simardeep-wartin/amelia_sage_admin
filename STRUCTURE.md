# Amelia Sage Admin — Structure Reference

> **One document. Read this before creating any new file.**
> ARCHITECTURE.md covers the stack. DEVELOPMENT_GUIDE.md covers process. This file covers **where code lives, what it looks like, and what already exists**.
>
> **Last updated:** 2026-05-27

---

## Table of Contents

1. [Folder Tree](#1-folder-tree)
2. [Layer Responsibilities](#2-layer-responsibilities)
3. [API Layer — BFF Proxy Pattern](#3-api-layer--bff-proxy-pattern)
4. [Service Layer — SOLID Structure](#4-service-layer--solid-structure)
5. [Where Does X Go?](#5-where-does-x-go)
6. [Naming Conventions](#6-naming-conventions)
7. [Code Templates](#7-code-templates)
8. [Common Components Catalog](#8-common-components-catalog)
9. [Hooks Catalog](#9-hooks-catalog)
10. [Import Path Rules](#10-import-path-rules)
11. [New Feature Checklist](#11-new-feature-checklist)

---

## 1. Folder Tree

```
amelia_sage_admin/
│
├── app/                                  # MVC: View (pages) + Controller (API routes)
│   ├── api/                              # ★ Server-only BFF proxies — secrets live here
│   │   ├── auth/
│   │   │   └── login/route.ts            # POST /api/auth/login
│   │   ├── demographics/
│   │   │   ├── overview/route.ts
│   │   │   ├── gender-identity/route.ts
│   │   │   ├── gender-identity/age-distribution/route.ts
│   │   │   ├── gender-identity/core-conversion/route.ts
│   │   │   ├── growth-trend/route.ts
│   │   │   ├── ethnicity/route.ts
│   │   │   ├── cultural-identity/route.ts
│   │   │   └── cultural-identity/core-conversation/route.ts
│   │   └── navigation/route.ts           # GET /api/navigation
│   ├── auth/
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── signin/page.tsx
│   ├── dashboard/page.tsx
│   ├── demographics/page.tsx
│   ├── calm-stillness-management/
│   │   ├── [categoryId]/page.tsx
│   │   └── page.tsx
│   ├── journal-management/page.tsx
│   ├── mindful-exercise-management/
│   │   ├── [categoryId]/page.tsx
│   │   └── page.tsx
│   ├── financial-management/page.tsx
│   ├── governance-safety/
│   │   ├── content-review/page.tsx
│   │   ├── review/pending/page.tsx
│   │   └── page.tsx
│   ├── access-tiers/page.tsx
│   ├── journey-orchestration/page.tsx
│   ├── notifications/page.tsx
│   ├── phase-2-roadmap/page.tsx
│   ├── sage-ai-settings/page.tsx
│   ├── settings/page.tsx
│   ├── user-insights/page.tsx
│   ├── wellth-plans/page.tsx
│   ├── work-on-me-exercises/page.tsx
│   ├── layout.tsx                        # Root layout (Sidebar + fonts)
│   └── page.tsx                          # / → redirect to /dashboard
│
├── Services/                             # MVC: Model (data access + business logic)
│   ├── api/                              # ★ Client-side service layer — one file per endpoint
│   │   ├── auth.ts                       # Auth API calls
│   │   └── demographics/                 # Demographics domain — SOLID / one responsibility per file
│   │       ├── index.ts                  # Barrel — import everything from here
│   │       ├── utils.ts                  # FilterParams type + buildFilterQuery helper
│   │       ├── overview.ts               # GET /demographics/overview
│   │       ├── genderIdentity.ts         # GET /demographics/gender-identity
│   │       ├── ageDistribution.ts        # GET /demographics/gender-identity/age-distribution
│   │       ├── coreConversion.ts         # GET /demographics/gender-identity/core-conversion
│   │       ├── growthTrend.ts            # GET /demographics/growth-trend + buildTrendChartData
│   │       ├── ethnicity.ts              # GET /demographics/ethnicity
│   │       ├── culturalIdentity.ts       # GET /demographics/cultural-identity
│   │       └── culturalCoreConversion.ts # GET /demographics/cultural-identity/core-conversation
│   ├── interfaces/                       # SOLID: Service contracts (DIP / ISP)
│   │   ├── IAuthService.ts
│   │   ├── ICalmAndStillnessService.ts
│   │   ├── IJournalService.ts
│   │   ├── IMindfulExerciseService.ts
│   │   ├── INavigationService.ts
│   │   └── index.ts                      # Barrel — import interfaces from here
│   ├── authApi.ts                        # TODO: DEAD CODE — real backend client, unwired
│   ├── calmAndStillnessService.ts        # Implements ICalmAndStillnessService
│   ├── journalService.ts                 # Implements IJournalService
│   ├── mindfulExerciseService.ts         # Implements IMindfulExerciseService
│   └── navigationService.ts             # Single source of truth for nav structure
│
├── components/
│   ├── auth/                             # Sign-in / forgot-password / reset UI
│   │   ├── AuthSuccessModal.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetLinkSentModal.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   ├── SignInForm.tsx
│   │   ├── SignInLayout.tsx
│   │   └── VideoBackground.tsx
│   │
│   ├── charts/                           # Recharts wrappers — never use Recharts directly in pages
│   │   ├── Chart.tsx
│   │   ├── DistributionBarChart.tsx
│   │   ├── DistributionDonutChart.tsx
│   │   ├── DistributionPieChart.tsx
│   │   ├── FeatureBarChart.tsx
│   │   ├── HorizontalBarChart.tsx
│   │   └── TrendLineChart.tsx
│   │
│   ├── common/                           # ★ SHARED — check here before building anything new
│   │   ├── AccordionItem.tsx             # Expandable accordion row
│   │   ├── ActionCard.tsx
│   │   ├── ActionModal.tsx               # Add/Edit modal (category / exercise / intro-screen)
│   │   ├── AddEditModal.tsx              # Add/Edit modal — "thumbnail" or "media" layout
│   │   ├── AvatarCircle.tsx              # Image inside a gradient circle  ← NEW
│   │   ├── Badge.tsx                     # Status pill (active / trial / cancelled)
│   │   ├── Card.tsx                      # Generic white card container with optional header
│   │   ├── CategoryManagementPanel.tsx
│   │   ├── CategoryTabs.tsx              # Tab row with cream background  ← NEW
│   │   ├── ChartCard.tsx
│   │   ├── DeleteConfirmationModal.tsx   # Confirm-before-delete dialog
│   │   ├── DynamicModal.tsx
│   │   ├── DynamicSidePanel.tsx
│   │   ├── EmptyState.tsx                # Empty list / zero-data placeholder
│   │   ├── ErrorBoundary.tsx             # React error boundary  ← NEW
│   │   ├── FinancialTableCard.tsx
│   │   ├── InsightGrid.tsx
│   │   ├── ListFilters.tsx               # Search + status filter + sort dropdown row  ← NEW
│   │   ├── MetricCard.tsx
│   │   ├── PageHeader.tsx                # Page title + breadcrumbs + action slot  ← NEW
│   │   ├── Pagination.tsx
│   │   ├── ProgressCard.tsx
│   │   ├── QueueItem.tsx
│   │   ├── StatsRow.tsx                  # Label : Value display row  ← NEW
│   │   ├── SummaryGrid.tsx
│   │   ├── SummaryStatCard.tsx
│   │   ├── Table.tsx                     # Generic typed data table
│   │   └── Tabs.tsx                      # Horizontal tab bar (used by Journal)
│   │
│   ├── dashboard/                        # Dashboard-specific panels
│   │   ├── DashboardLeftPanel.tsx        # Active users, progress, alerts, quick actions
│   │   └── DashboardRightPanel.tsx       # Sage AI, Calm & Stillness, Mindful stats
│   │
│   ├── calm-stillness/
│   │   └── CalmAndStillnessMain.tsx
│   │
│   ├── journal/
│   │   └── JournalMain.tsx
│   │
│   ├── layout/                           # App shell — do not put feature logic here
│   │   ├── Navbar.tsx
│   │   ├── PageLayout.tsx                # Wraps every authenticated page
│   │   └── Sidebar.tsx                   # Reads nav from navigationService.ts
│   │
│   ├── loaders/                          # Skeleton screens — one per page
│   │   ├── common/                       # Primitive skeleton shapes
│   │   │   ├── skeleton.tsx
│   │   │   ├── skeleton-action-card.tsx
│   │   │   ├── skeleton-avatar.tsx
│   │   │   ├── skeleton-card.tsx
│   │   │   ├── skeleton-chart.tsx
│   │   │   ├── skeleton-metric-card.tsx
│   │   │   ├── skeleton-table.tsx
│   │   │   └── skeleton-text.tsx
│   │   ├── dashboard-loader.tsx
│   │   ├── demographics-loader.tsx
│   │   ├── finance-loader.tsx
│   │   ├── governance-safety-loader.tsx
│   │   ├── journal-loader.tsx
│   │   ├── mindful-exercise-loader.tsx
│   │   ├── sage-ai-loader.tsx
│   │   ├── user-insight-loader.tsx
│   │   ├── wellth-plan-loader.tsx
│   │   ├── work-on-me-loader.tsx
│   │   └── [feature]-loader.tsx          # Add one per new page
│   │
│   ├── mindful-exercise/
│   │   ├── CategorySectionList.tsx
│   │   ├── ExerciseCard.tsx
│   │   ├── ExerciseGridView.tsx
│   │   └── MindfulExerciseMain.tsx
│   │
│   ├── sage-ai/
│   │   └── SageAiMain.tsx
│   │
│   └── ui/                               # ★ ATOMIC — base design system, no feature logic
│       ├── ActionsDropdownMenu.tsx        # Edit / Delete dropdown  ← NEW
│       ├── Button.tsx
│       ├── dropdown-menu.tsx
│       ├── FileUploadZone.tsx             # Dashed-border file upload box  ← NEW
│       ├── FilterDropdown.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── ProgressBar.tsx
│       └── SidePanel.tsx
│
├── controllers/
│   └── authController.ts                 # TODO: DEAD CODE — thin DI wrapper, never instantiated
│
├── data/
│   └── app-data.json                     # Static mock data — replace with real API calls
│
├── features/
│   └── financial/financial.types.ts      # TODO: DEAD CODE — moved to types/financial.ts
│
├── hooks/                                # Client-side React hooks (one concern per file)
│   ├── useAuth.ts                        # signIn / signOut / isAuthenticated
│   ├── useCalmAndStillness.ts
│   ├── useJournal.ts
│   ├── useMindfulExercise.ts
│   ├── useMobile.tsx                     # Responsive breakpoint detection
│   └── useModalState.ts                  # Add/Edit/Delete modal state  ← NEW
│
├── lib/                                  # Pure utilities (canonical location)
│   ├── apiClient.ts                      # ★ Server-side HTTP client — attaches ADMIN_API_KEY + Bearer token
│   ├── clientApi.ts                      # ★ Browser-side HTTP client — calls /api/... (no secrets)
│   ├── endpoints.ts                      # ★ Single source of truth for all API URL paths
│   ├── payloads.ts                       # Shared request/response payload types
│   ├── utils.ts                          # cn() — Tailwind class merging helper
│   ├── validators.ts                     # Barrel re-export of lib/validators/*
│   ├── validators/
│   │   ├── auth.ts                       # signInSchema, forgotPasswordSchema, resetPasswordSchema, signupSchema
│   │   ├── common.ts                     # thumbnailItemSchema, mediaItemSchema
│   │   ├── mindful-exercise.ts           # categorySchema, exerciseSchema, emotionSchema, focusSchema
│   │   └── index.ts                      # Barrel — re-exports all schemas
│   └── wellth-plans.config.ts
│
├── store/
│   └── authStore.ts                      # Zustand (persisted to localStorage key: amelia-auth)
│
├── types/                                # Shared TypeScript types — no logic, shapes only
│   ├── auth.ts                           # AuthUser, SignInRequest, SignInResponse
│   ├── financial.ts                      # FinancialTab, SubscriptionRow, PaymentRow, PromotionRow
│   ├── journal.ts                        # JournalEntry, JournalTab, JOURNAL_TABS
│   ├── mindful-exercise.ts               # Exercise, ExerciseSubCategory, ExerciseCategory
│   └── navigation.ts                     # NavigationItem, NavigationSection (from navigationService)
│
├── utils/                                # Re-exports from lib/ only — do not add logic here
│   ├── cn.ts                             # re-exports cn from @/lib/utils
│   └── constants.ts                      # UI gradient strings
│
├── middleware.ts                         # Auth guard — single enforcement point
├── tailwind.config.ts                    # Design tokens (colours, fonts, breakpoints)
├── next.config.ts
└── tsconfig.json
```

---

## 2. Layer Responsibilities

The codebase follows **MVC + SOLID**. Each layer has one job.

```
┌─────────────────────────────────────────────────────────┐
│  VIEW        app/[feature]/page.tsx                      │
│              components/[feature]/                        │
│              • Renders UI only                            │
│              • Passes props down, events up               │
│              • Max ~80 lines per page file                │
├─────────────────────────────────────────────────────────┤
│  CONTROLLER  hooks/use[Feature].ts                        │
│              app/api/[route]/route.ts  ← BFF proxy        │
│              • Bridges data and UI                        │
│              • Owns loading / error / data state          │
│              • Calls service methods only                 │
├─────────────────────────────────────────────────────────┤
│  MODEL       Services/api/[domain]/   ← client services   │
│              Services/[feature]Service.ts                 │
│              types/[feature].ts                           │
│              lib/validators/[feature].ts                  │
│              • All fetch / IO lives here                  │
│              • Returns typed domain objects               │
│              • Implements its interface                   │
└─────────────────────────────────────────────────────────┘
```

### SOLID mapping

| Principle                     | How it is enforced                                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **S** — Single Responsibility | Each service file owns exactly one endpoint. Each component = one UI concern. Each hook = one data concern.      |
| **O** — Open / Closed         | Services implement interfaces. Add behaviour by creating a new service that satisfies the same interface.        |
| **L** — Liskov Substitution   | Any object satisfying `IAuthService` (mock or real) is a valid drop-in.                                          |
| **I** — Interface Segregation | Five focused interfaces in `Services/interfaces/`. No single interface mixes unrelated methods.                  |
| **D** — Dependency Inversion  | Services are typed against their interface (`const authService: IAuthService`). Hooks depend on the abstraction. |

---

## 3. API Layer — BFF Proxy Pattern

Every route handler under `app/api/` is a **Backend-for-Frontend proxy**. Its job is:

1. Read the `auth-token` httpOnly cookie ← **only readable server-side**
2. Forward the request to FastAPI at `BACKEND_URL` with both security headers
3. Stream the JSON response back to the browser

```
Browser  →  clientApi.get("/demographics/overview")
                └── fetch("/api/demographics/overview")         ← no secrets
                      └── app/api/demographics/overview/route.ts  ← server-only
                            └── apiClient.get(BACKEND_URL/demographics/overview, {
                                  token: cookie("auth-token"),
                                  apiKey: process.env.ADMIN_API_KEY,
                                })
```

### Security invariants — **never break these**

| Rule                                                            | Why                                           |
| --------------------------------------------------------------- | --------------------------------------------- |
| `ADMIN_API_KEY` is never in browser code                        | Exposed API key = unrestricted backend access |
| `auth-token` cookie has `httpOnly: true`                        | JS cannot read it → XSS-proof                 |
| `BACKEND_URL` has **no** `NEXT_PUBLIC_` prefix                  | Server-only — never sent to the client bundle |
| Every route handler reads the cookie and returns 401 if missing | Prevents unauthenticated backend calls        |

### `lib/apiClient.ts` vs `lib/clientApi.ts`

|               | `apiClient`                   | `clientApi`                           |
| ------------- | ----------------------------- | ------------------------------------- |
| Used in       | `app/api/*/route.ts` (server) | `Services/api/*/` (browser)           |
| Calls         | `BACKEND_URL` (FastAPI)       | `/api/...` (Next.js routes)           |
| Carries       | `x-api-key` + `Authorization` | Nothing — cookies handled server-side |
| Secret access | Yes (`process.env`)           | No                                    |

### `lib/endpoints.ts` — single source of truth

All URL path strings live here. **Never hardcode a URL anywhere else.**

```ts
export const ENDPOINTS = {
  auth: { login: "/auth/login" },
  demographics: {
    overview: "/demographics/overview",
    genderIdentity: "/demographics/gender-identity",
    ageDistribution: "/demographics/gender-identity/age-distribution",
    coreConversion: "/demographics/gender-identity/core-conversion",
    growthTrend: "/demographics/growth-trend",
    ethnicity: "/demographics/ethnicity",
    culturalIdentity: "/demographics/cultural-identity",
    culturalCoreConversion: "/demographics/cultural-identity/core-conversation",
    culturalAgeDistribution: "/demographics/cultural-identity/age-distribution",
  },
} as const;
```

---

## 4. Service Layer — SOLID Structure

### `Services/api/demographics/` — one file per endpoint

| File                        | Endpoint                              | Exports                                                     |
| --------------------------- | ------------------------------------- | ----------------------------------------------------------- |
| `utils.ts`                  | —                                     | `FilterParams`, `buildFilterQuery`                          |
| `overview.ts`               | `GET /demographics/overview`          | `OverviewData`, `getOverview`                               |
| `genderIdentity.ts`         | `GET /demographics/gender-identity`   | `GenderItem`, `GenderIdentityResponse`, `getGenderIdentity` |
| `ageDistribution.ts`        | `GET /…/age-distribution`             | `AgeItem`, `getAgeDistribution`                             |
| `coreConversion.ts`         | `GET /…/core-conversion`              | `CoreConversionItem`, `getCoreConversion`                   |
| `growthTrend.ts`            | `GET /demographics/growth-trend`      | `TrendGroup`, `buildTrendChartData`, `getGrowthTrend`       |
| `ethnicity.ts`              | `GET /demographics/ethnicity`         | `EthnicityData`, `getEthnicity`                             |
| `culturalIdentity.ts`       | `GET /demographics/cultural-identity` | `CulturalIdentityData`, `getCulturalIdentity`               |
| `culturalCoreConversion.ts` | `GET /…/core-conversation`            | `CulturalCoreItem`, `getCulturalCoreConversion`             |
| `index.ts`                  | —                                     | barrel re-export of all above                               |

**Always import from the barrel:**

```ts
import { getOverview, getEthnicity, type FilterParams } from "@/Services/api/demographics";
```

### Filter pattern

All time-range filters use a consistent shape defined in `utils.ts`:

```ts
type FilterParams = {
  filter?: string; // "all" | "today" | "week" | "month" | "year" | "custom"
  range?: { from: Date | null; to: Date | null }; // only for "custom"
};

buildFilterQuery({ filter: "week" });
// → "?filter=week"

buildFilterQuery({
  filter: "custom",
  range: { from: new Date("2026-01-01"), to: new Date("2026-01-31") },
});
// → "?filter=custom&start_date=01/01/2026&end_date=31/01/2026"
```

UI label values (`"This Week"`, `"This Month"`) are auto-mapped to API values (`"week"`, `"month"`) inside `buildFilterQuery` — no mapping needed in page components.

### Adding a new domain service

```
1. lib/endpoints.ts                    → add the URL path
2. app/api/[domain]/route.ts           → BFF proxy route handler
3. Services/api/[domain]/feature.ts    → service function + co-located types
4. Services/api/[domain]/index.ts      → add export * from "./feature"
```

---

## 5. Where Does X Go?

| What you're adding                                     | Where it lives                                                         |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| New page                                               | `app/[feature]/page.tsx`                                               |
| Page UI components                                     | `components/[feature]/[ComponentName].tsx`                             |
| Reusable atomic element (button, input, badge variant) | `components/ui/`                                                       |
| Reusable composed block (card, modal, filter bar)      | `components/common/`                                                   |
| **New API endpoint (client-side call)**                | `Services/api/[domain]/featureName.ts` + barrel export                 |
| **New BFF proxy route**                                | `app/api/[domain]/route.ts` + URL in `lib/endpoints.ts`                |
| Legacy full-domain service                             | `Services/[feature]Service.ts`                                         |
| Service interface                                      | `Services/interfaces/I[Feature]Service.ts`                             |
| Client state hook                                      | `hooks/use[Feature].ts`                                                |
| Shared modal state                                     | Use `hooks/useModalState.ts` (already exists)                          |
| Zod validation schema                                  | `lib/validators/[domain].ts`, re-export from `lib/validators/index.ts` |
| TypeScript type / interface                            | `types/[feature].ts`                                                   |
| Global client state                                    | `store/[feature]Store.ts` (Zustand)                                    |
| Nav item                                               | `Services/navigationService.ts` only                                   |
| Pure utility function                                  | `lib/utils.ts` or a new `lib/[name].ts`                                |
| **API URL path string**                                | `lib/endpoints.ts` — never hardcode inline                             |
| Skeleton loader                                        | `components/loaders/[feature]-loader.tsx`                              |
| Static config (not types)                              | `lib/[feature].config.ts`                                              |

---

## 6. Naming Conventions

| Target                 | Convention                              | Example                                        |
| ---------------------- | --------------------------------------- | ---------------------------------------------- |
| Page files             | kebab-case folder + `page.tsx`          | `app/journal-management/page.tsx`              |
| Component files        | PascalCase                              | `JournalMain.tsx`, `PageHeader.tsx`            |
| Hook files             | camelCase, `use` prefix                 | `useJournal.ts`, `useModalState.ts`            |
| Service files          | camelCase, `Service` suffix             | `journalService.ts`                            |
| Interface files        | PascalCase, `I` prefix                  | `IJournalService.ts`                           |
| Type files             | kebab-case                              | `mindful-exercise.ts`                          |
| Validator files        | kebab-case by domain                    | `lib/validators/auth.ts`                       |
| Loader files           | kebab-case, `-loader` suffix            | `mindful-exercise-loader.tsx`                  |
| Zustand store          | camelCase, `Store` suffix               | `authStore.ts`                                 |
| Export in types file   | named exports only (no default)         | `export interface JournalEntry`                |
| Export in service file | named `const` + typed against interface | `export const journalService: IJournalService` |

---

## 7. Code Templates

### 7.1 — API Service File (new pattern)

```ts
// Services/api/[domain]/featureName.ts
import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "./utils";

// Co-locate response types with the service function that uses them
export type FeatureResponseData = {
  data: {
    total: number;
    items: { id: string; label: string; count: number; percentage: number }[];
  };
};

export const getFeatureName = (params?: FilterParams) =>
  clientApi.get<FeatureResponseData>(`${ENDPOINTS.domain.featureName}${buildFilterQuery(params)}`);
```

Then add to `Services/api/[domain]/index.ts`:

```ts
export * from "./featureName";
```

### 7.2 — BFF Route Handler

```ts
// app/api/[domain]/feature/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/apiClient";
import { ENDPOINTS } from "@/lib/endpoints";

export async function GET(request: Request) {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const params = new URL(request.url).searchParams.toString();
  const path = params ? `${ENDPOINTS.domain.featureName}?${params}` : ENDPOINTS.domain.featureName;

  try {
    const raw = await apiClient.get(path, { token, apiKey: process.env.ADMIN_API_KEY });
    return NextResponse.json(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
```

### 7.4 — Service Interface

```ts
// Services/interfaces/I[Feature]Service.ts
import type { [Feature]Type } from "@/types/[feature]";

export interface I[Feature]Service {
  get[Items](): Promise<[Feature]Type[]>;
}
```

Remember to add the export to `Services/interfaces/index.ts`:

```ts
export type { I[Feature]Service } from "./I[Feature]Service";
```

### 7.5 — Hook

```ts
// hooks/use[Feature].ts
"use client";

import { useState, useEffect } from "react";
import { [feature]Service } from "@/Services/[feature]Service";
import type { [Feature]Type } from "@/types/[feature]";

export function use[Feature]() {
  const [[items], set[Items]] = useState<[Feature]Type[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    [feature]Service
      .get[Items]()
      .then(set[Items])
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Failed to load."))
      .finally(() => setLoading(false));
  }, []);

  return { [items], loading, error };
}
```

### 7.6 — Page (thin)

```tsx
// app/[feature]/page.tsx
"use client";

import PageLayout from "@/components/layout/PageLayout";
import [Feature]Loader from "@/components/loaders/[feature]-loader";
import [Feature]Main from "@/components/[feature]/[Feature]Main";
import { use[Feature] } from "@/hooks/use[Feature]";

export default function [Feature]Page() {
  const { [items], loading } = use[Feature]();

  if (loading) return <[Feature]Loader />;

  return (
    <PageLayout title="[Page Title]">
      <[Feature]Main [items]={[items]} />
    </PageLayout>
  );
}
```

### 7.7 — Feature Main Component

```tsx
// components/[feature]/[Feature]Main.tsx
"use client";

import PageHeader from "@/components/common/PageHeader";
import { useModalState } from "@/hooks/useModalState";
import AddEditModal from "@/components/common/AddEditModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import type { [Feature]Type } from "@/types/[feature]";

type Props = { [items]: [Feature]Type[] };

const BREADCRUMBS = [
  { label: "Dashboard" },
  { label: "[Section]" },
  { label: "[Feature] Management" },
];

export default function [Feature]Main({ [items] }: Props) {
  const modal = useModalState<[Feature]Type>();

  const handleSave = (data: unknown) => {
    console.log("save", data); // TODO: wire to service
  };

  const handleConfirmDelete = () => {
    console.log("delete", modal.itemToDelete); // TODO: wire to service
    modal.closeDelete();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="[Feature] Management"
        breadcrumbs={BREADCRUMBS}
      />

      {/* list / grid / table here */}

      <AddEditModal
        isOpen={modal.isModalOpen}
        onClose={modal.closeModal}
        onSave={handleSave}
        layout="thumbnail"
        title={modal.editingItem ? "Edit Item" : "Add New Item"}
        initialData={modal.editingItem}
      />

      <DeleteConfirmationModal
        isOpen={modal.isDeleteModalOpen}
        onClose={modal.closeDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Item"
        message="Are you sure? This cannot be undone."
      />
    </div>
  );
}
```

### 7.8 — POST Route Handler (with Zod validation)

```ts
// app/api/[feature]/route.ts
import { NextResponse } from "next/server";
import { [feature]Schema } from "@/lib/validators/[feature]";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = [feature]Schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  // TODO: call real backend / DB
  return NextResponse.json({ success: true, data: parsed.data }, { status: 200 });
}
```

### 7.9 — Zod Validator

```ts
// lib/validators/[feature].ts
import { z } from "zod";

export const [feature]Schema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(["active", "draft", "inactive"]).default("active"),
});

export type [Feature]FormData = z.infer<typeof [feature]Schema>;
```

Then add to `lib/validators/index.ts`:

```ts
export * from "./[feature]";
```

### 7.10 — Types File

```ts
// types/[feature].ts
export type [Feature]Status = "active" | "draft" | "inactive";

export interface [Feature]Item {
  id: string;
  name: string;
  status: [Feature]Status;
  createdAt: string;
}
```

---

## 8. Common Components Catalog

**Check this list before building anything new. If it exists — use it.**

### `components/ui/` — Atomic (no feature logic)

| Component             | Props summary                                                            | Use for              |
| --------------------- | ------------------------------------------------------------------------ | -------------------- |
| `Button`              | `variant` solid/outline/ghost, `size`, `leftIcon`, `href`                | All buttons          |
| `Input`               | `label`, `error: string`, `placeholder`                                  | All text inputs      |
| `Modal`               | `isOpen`, `onClose`, `title`, `footer`, `maxWidth`, `zIndex`             | All dialogs          |
| `SidePanel`           | `isOpen`, `onClose`, `title`, `footer`, `width`                          | Slide-in panels      |
| `FilterDropdown`      | `options`, `value`, `onChange`, `variant` icon/text                      | Filter selects       |
| `ProgressBar`         | `progress: number`, `gradient`                                           | Progress bars        |
| `FileUploadZone`      | `label`, `accept`, `selectedFile`, `onFileSelect`, `placeholder`, `hint` | Any file upload box  |
| `ActionsDropdownMenu` | `onEdit`, `onDelete`, `trigger` vertical/horizontal, `stopPropagation`   | Any Edit/Delete menu |

### `components/common/` — Composed blocks

| Component                 | Props summary                                                                                  | Use for                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `PageHeader`              | `title`, `breadcrumbs[]`, `action?`, `description?`                                            | Every feature page header                |
| `Card`                    | `title?`, `actions?`, `children`, `className?`                                                 | Any white card container                 |
| `CategoryTabs`            | `tabs[]` `{id,name}`, `activeTab`, `onTabChange`                                               | Category tab rows                        |
| `ListFilters`             | `searchQuery`, `onSearchChange`, `statusOptions?`, `sortOptions?`                              | Search + filter bar                      |
| `Table`                   | `columns[]`, `rows[]`, `headerTextColor?`, `emptyMessage?`                                     | Data tables                              |
| `Tabs`                    | `items[]`, `activeTab`, `onTabChange`                                                          | Horizontal tab navigation                |
| `Pagination`              | `currentPage`, `totalPages`, `totalItems`, `itemsPerPage`, `onPageChange`, `itemLabel`         | Paginated lists                          |
| `Badge`                   | `variant` active/trial/cancelled, `label`, `className?`                                        | Status pills                             |
| `EmptyState`              | `title?`, `description?`, `action?`                                                            | Zero-data placeholders                   |
| `ErrorBoundary`           | `children`, `fallback?`                                                                        | Wrapping any async feature               |
| `AvatarCircle`            | `src`, `alt`, `innerWidth?`, `innerHeight?`, `objectFit?`, `rounded?`                          | Image inside gradient circle             |
| `StatsRow`                | `label`, `value`, `valueClassName?`                                                            | Label : Value stat lines                 |
| `AddEditModal`            | `isOpen`, `onClose`, `onSave`, `layout` thumbnail/media, `title`, `showDraft?`, `initialData?` | Add or edit items                        |
| `ActionModal`             | `isOpen`, `onClose`, `type`, `title`, `onSave`, `initialData?`                                 | category / exercise / intro-screen modal |
| `DeleteConfirmationModal` | `isOpen`, `onClose`, `onConfirm`, `title`, `message`                                           | Delete confirmation dialogs              |
| `AccordionItem`           | `title`, `children`, `defaultOpen?`                                                            | Expandable sections                      |

### `components/charts/` — Chart wrappers

| Component                | Use for                                          |
| ------------------------ | ------------------------------------------------ |
| `Chart`                  | Default line/area chart (dashboard active users) |
| `TrendLineChart`         | Trend data over time                             |
| `DistributionDonutChart` | Percentage breakdown                             |
| `DistributionPieChart`   | Segment proportions                              |
| `DistributionBarChart`   | Category distribution                            |
| `HorizontalBarChart`     | Ranked comparison                                |
| `FeatureBarChart`        | Feature usage stats                              |

---

## 9. Hooks Catalog

**Check before writing a new hook.**

| Hook                  | Returns                                                                                                                 | Purpose                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `useAuth`             | `{ signIn, signOut, isAuthenticated, user, token, isLoading, error }`                                                   | Auth actions and state          |
| `useMindfulExercise`  | `{ categories, loading, error }`                                                                                        | Mindful exercise categories     |
| `useCalmAndStillness` | `{ categories, loading, error }`                                                                                        | Calm & stillness categories     |
| `useJournal`          | `{ entries, loading, error, refetch }`                                                                                  | Journal entry list              |
| `useMobile`           | `boolean`                                                                                                               | Is viewport < md breakpoint     |
| `useModalState<T>`    | `{ isModalOpen, editingItem, isDeleteModalOpen, itemToDelete, openAdd, openEdit, openDelete, closeModal, closeDelete }` | Add / Edit / Delete modal state |

---

## 10. Import Path Rules

Always use the `@/` alias. The correct casing **must** match the folder name exactly.

```ts
import ... from "@/Services/..."        // capital S — business logic
import ... from "@/components/..."      // lowercase c
import ... from "@/hooks/..."           // lowercase h
import ... from "@/lib/..."             // lowercase l
import ... from "@/store/..."           // lowercase s
import ... from "@/types/..."           // lowercase t
import ... from "@/data/..."            // lowercase d
```

### Common import patterns

```ts
// API service (new pattern — demographics style)
import { getOverview, getEthnicity, type FilterParams } from "@/Services/api/demographics";

// Types
import type { JournalEntry } from "@/types/journal";

// Service (via interface type)
import type { IJournalService } from "@/Services/interfaces";
import { journalService } from "@/Services/journalService";

// Validators — prefer domain-scoped import
import { signInSchema } from "@/lib/validators/auth";
// or use the barrel for mixed usage
import { signInSchema, categorySchema } from "@/lib/validators";

// Endpoints (always use constant, never a string literal)
import { ENDPOINTS } from "@/lib/endpoints";

// HTTP clients
import { clientApi } from "@/lib/clientApi"; // browser-side only
import { apiClient } from "@/lib/apiClient"; // route handlers only

// Common components
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import ActionsDropdownMenu from "@/components/ui/ActionsDropdownMenu";

// Hooks
import { useModalState } from "@/hooks/useModalState";
import { useJournal } from "@/hooks/useJournal";

// Store (only when you need raw auth state outside a hook)
import { useAuthStore } from "@/store/authStore";

// Utility
import { cn } from "@/lib/utils";
```

---

## 11. New Feature Checklist

Follow this sequence every time you build a new section of the admin.

### Before writing code

- [ ] Ticket has clear acceptance criteria and a linked design mockup
- [ ] Routes / API endpoints are identified and added to `lib/endpoints.ts`
- [ ] Backend dependency is documented (mock or real)
- [ ] Check [Common Components Catalog](#8-common-components-catalog) — do not duplicate existing components
- [ ] Check [Hooks Catalog](#9-hooks-catalog) — do not duplicate existing hooks

### Files to create (in order)

```
1. lib/endpoints.ts                         Add the URL path constants
2. types/[feature].ts                       Add domain types
3. lib/validators/[feature].ts              Add Zod schema + export from index.ts
4. Services/api/[domain]/featureName.ts     Service function + co-located response type
5. Services/api/[domain]/index.ts           Add export * from "./featureName"
6. app/api/[domain]/route.ts                BFF proxy route handler
7. Services/interfaces/I[Feature]Service.ts Add service interface + export from index.ts  (if full-domain service)
8. hooks/use[Feature].ts                    Wire service → component state (optional)
9. components/[feature]/[Feature]Main.tsx   Main feature component (uses common components)
10. components/loaders/[feature]-loader.tsx Skeleton loader
11. app/[feature]/page.tsx                  Thin page (delegates to [Feature]Main)
12. Services/navigationService.ts           Add nav entry if this is a top-level page
```

### Before raising a PR

- [ ] No `any` types introduced (use `unknown` and narrow)
- [ ] No raw `fetch` calls in components or hooks — all I/O in `Services/`
- [ ] Service is typed against its interface
- [ ] New Zod schema exported from `lib/validators/index.ts`
- [ ] New type in `types/` (not inline in the component)
- [ ] New reusable component added to this catalog (Section 6)
- [ ] Nav entry added to `navigationService.ts` if applicable
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] Page component is under 80 lines

### Dead code to clean up before going to production

| File                                    | Reason                                                                      |
| --------------------------------------- | --------------------------------------------------------------------------- |
| `Services/authApi.ts`                   | Real backend client — unused until `NEXT_PUBLIC_API_BASE_URL` is configured |
| `controllers/authController.ts`         | Imports deleted `Services/authService` — broken reference, TS error         |
| `app/api/navigation/route.ts`           | Nav consumed directly from `navigationService.ts`; route is never called    |
| `app/signup/page.tsx`                   | Calls `authApi` (unwired); not in admin navigation                          |
| `features/financial/financial.types.ts` | Moved to `types/financial.ts`                                               |

### Known TypeScript issues (pre-existing, not demographics-related)

| Severity | File                                                | Issue                                          |
| -------- | --------------------------------------------------- | ---------------------------------------------- |
| 🔴 Error | `controllers/authController.ts:4`                   | Cannot find `@/Services/authService` (deleted) |
| 🟠 Error | `app/wellth-plans/page.tsx:76`                      | `unknown` type in state setter                 |
| 🟡 Error | `components/common/DynamicModal.tsx:80`             | `{}` not assignable to input value type        |
| 🟡 Error | `components/common/DynamicSidePanel.tsx:85`         | `unknown` props                                |
| 🟡 Error | `components/common/CategoryManagementPanel.tsx:186` | Narrow callback vs wide param type             |
