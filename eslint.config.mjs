import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  // Ignore generated / build output
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "public/**",
  ]),

  // Next.js recommended rules (React, React Hooks, Core Web Vitals)
  ...nextVitals,

  // Next.js TypeScript rules (@typescript-eslint)
  ...nextTs,

  // Project-specific overrides
  {
    rules: {
      // ── TypeScript ────────────────────────────────────────────────
      // AGENTS.md: "No `any` types"
      "@typescript-eslint/no-explicit-any": "error",

      // Catch unused variables/imports after refactoring
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Enforce `import type` for type-only imports (keeps runtime bundle clean)
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // ── General quality ──────────────────────────────────────────
      // Flag leftover console.log statements
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Disallow magic string literals inline — use named constants
      "no-restricted-syntax": [
        "warn",
        {
          selector: "TSEnumDeclaration",
          message:
            "Prefer const object + 'as const' over TypeScript enums (tree-shaking friendly).",
        },
      ],

      // ── React ────────────────────────────────────────────────────
      // Already in nextVitals, but bump exhaustive-deps to error
      "react-hooks/exhaustive-deps": "error",

      // Disabled: too aggressive — flags every async data-fetch helper that calls setLoading
      // inside useEffect, which is the standard React pattern without an external data library.
      "react-hooks/set-state-in-effect": "off",

      // Self-closing tags for components with no children
      "react/self-closing-comp": ["warn", { component: true, html: false }],
    },
  },

  // Prettier must be last — disables all formatting rules ESLint would conflict with
  prettier,
]);

export default eslintConfig;
