"use client";

import { Bars3Icon, BellIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-[84px] items-center justify-between border-b border-gold bg-paper px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => window.dispatchEvent(new Event("open-sidebar"))}
          aria-label="Open menu"
          className="rounded-lg border border-border bg-softstone p-2 text-charcoal md:hidden"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>
        <h2 className="text-l font-medium text-charcoal">{title}</h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden h-[37px] items-center gap-2 rounded-lg border border-border bg-softstone px-3 sm:flex">
          <MagnifyingGlassIcon className="h-4 w-4 text-slate" />
          <input
            className="w-36 bg-transparent text-s text-charcoal outline-none placeholder:text-slate md:w-48"
            placeholder="Search..."
          />
        </div>
        <button className="rounded-lg p-2 text-charcoal" aria-label="Notifications">
          <BellIcon className="h-5 w-5" />
        </button>
        <button
          className="rounded-full bg-gradient-to-b from-sage to-[#9caf88] p-2 text-white"
          aria-label="Sage actions"
        >
          <SparklesIcon className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
