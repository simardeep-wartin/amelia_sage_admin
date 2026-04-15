import Link from "next/link";
import { getNavigationItems } from "@/Services/services/navigation-service";

export default function Home() {
  const pages = getNavigationItems();

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
        Page Routes
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Each item has a separate TypeScript page route.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {pages.map((pageItem) => (
          <li key={pageItem.href}>
            <Link
              href={pageItem.href}
              className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-900 transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              {pageItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
