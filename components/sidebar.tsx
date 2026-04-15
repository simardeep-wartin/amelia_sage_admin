import Link from "next/link";
import { getNavigationSections } from "@/Services/services/navigation-service";

export default function Sidebar() {
  const navSections = getNavigationSections();

  return (
    <aside className="h-screen w-72 shrink-0 overflow-y-auto border-r border-black/10 bg-[#88a785] px-4 py-6 text-white">
      <nav className="space-y-6">
        {navSections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-white/80">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium transition hover:bg-white/15"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  );
}
