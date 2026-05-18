# Lint & Code Quality

## Tools

| Tool        | Purpose                                                          |
| ----------- | ---------------------------------------------------------------- |
| ESLint      | Catches bugs, bad patterns, and rule violations                  |
| Prettier    | Enforces consistent formatting                                   |
| Husky       | Runs checks automatically before every `git commit`              |
| lint-staged | Runs ESLint + Prettier only on staged files (not the whole repo) |

---

## Commands

```bash
pnpm lint          # Check all files for errors and warnings
pnpm lint:fix      # Auto-fix everything that can be fixed safely
pnpm format        # Format all files with Prettier
pnpm format:check  # Check formatting without writing changes
```

---

## Pre-commit Hook

Every `git commit` automatically runs `lint-staged`, which:

1. Runs `eslint --fix` on staged `.ts` / `.tsx` / `.js` files
2. Runs `prettier --write` on staged files
3. **Blocks the commit** if any errors remain after auto-fix

You cannot commit code with lint errors. Fix them first.

---

## Rules Enforced

### TypeScript

| Rule                                         | What it catches                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `@typescript-eslint/no-explicit-any`         | **Error** — No `any` types. Use `unknown`, `Record<string, unknown>`, or a proper interface |
| `@typescript-eslint/no-unused-vars`          | **Error** — Unused variables and imports                                                    |
| `@typescript-eslint/consistent-type-imports` | **Warn** — Use `import { type X }` when importing only a type                               |

### React & Hooks

| Rule                          | What it catches                                                             |
| ----------------------------- | --------------------------------------------------------------------------- |
| `react-hooks/exhaustive-deps` | **Error** — Missing dependencies in `useEffect` / `useCallback` / `useMemo` |
| `react-hooks/rules-of-hooks`  | **Error** — Hooks called conditionally or outside components                |
| `react/self-closing-comp`     | **Warn** — `<Component></Component>` should be `<Component />`              |

### General

| Rule         | What it catches                                                                        |
| ------------ | -------------------------------------------------------------------------------------- |
| `no-console` | **Warn** — `console.log` left in code (`console.warn` and `console.error` are allowed) |

---

## Type Import Rule Explained

```ts
// Wrong — ExerciseCategory only used as a type, but emits a runtime import
import { ExerciseCategory } from "@/types/mindful-exercise";

// Correct — erased at build time, zero runtime cost
import { type ExerciseCategory } from "@/types/mindful-exercise";
```

Use `import { type X }` when X is only used in:

- Function parameter types: `(cat: ExerciseCategory) => void`
- `useState<ExerciseCategory>()`
- Return type annotations: `): ExerciseCategory`

Use a regular import when X is used as a value:

- `new ExerciseCategory()`
- `ExerciseCategory.someStaticMethod()`
- A Zod schema or constant you actually call/access at runtime

---

## No `any` Rule Explained

`any` disables TypeScript entirely for that value — the whole point of TypeScript is lost.

```ts
// Wrong
const handleSave = (data: any) => { ... }

// Correct alternatives
const handleSave = (data: unknown) => { ... }           // truly unknown shape
const handleSave = (data: Record<string, unknown>) => { ... }  // object with unknown values
const handleSave = (data: ModalSubmitData) => { ... }   // proper typed interface
```

---

## Fixing Common Errors

**`no-explicit-any`**

```ts
// Before
(data: any) => void
useState<any>(null)

// After
(data: Record<string, unknown>) => void
useState<MyType | null>(null)
```

**`no-unused-vars`**

```ts
// Before
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
// ChevronDownIcon never used

// After
import { PlusIcon } from "@heroicons/react/24/outline";
```

**`exhaustive-deps`**

```ts
// Before — fetchData used in effect but not in deps
useEffect(() => { fetchData(); }, []);

// After — wrap in useCallback, add to deps
const fetchData = useCallback(async () => { ... }, []);
useEffect(() => { fetchData(); }, [fetchData]);
```

---

## Files

```
eslint.config.mjs   ← ESLint rules configuration
.prettierrc         ← Prettier formatting options
.prettierignore     ← Files Prettier skips
.husky/pre-commit   ← Git hook that runs lint-staged
package.json        ← lint-staged config under "lint-staged" key
```
