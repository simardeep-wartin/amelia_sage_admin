"use client";

import { useRef, useState, useEffect } from "react";
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { logout } from "@/Services/api/auth/logout";
import LogoutConfirmationModal from "@/components/common/LogoutConfirmationModal";

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout().catch(() => {});
    window.location.replace("/signin");
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex h-[84px] items-center justify-between border-b border-gold bg-paper px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("open-sidebar"))}
            aria-label="Open menu"
            className="rounded-lg border border-border bg-softstone p-2 text-charcoal md:hidden"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
          <h2 className="text-l font-medium text-charcoal font-inter">{title}</h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden h-[37px] md:min-w-[256px] sm:min-w-[200px] items-center gap-2 rounded-lg border border-border bg-softstone px-3 sm:flex">
            <MagnifyingGlassIcon className="h-4 w-4 text-slate" />
            <input
              className="bg-transparent text-s text-charcoal outline-none placeholder:text-slate font-arial"
              placeholder="Search..."
            />
          </div>
          <button className="rounded-lg p-2 text-charcoal" aria-label="Notifications">
            <BellIcon className="h-5 w-5" />
          </button>

          {/* Profile dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="rounded-full bg-gradient-to-b from-sage to-[#9caf88] cursor-pointer text-white w-8 h-8 flex justify-center items-center"
              aria-label="Profile"
            >
              <img src="/auth/user.svg" alt="icon" className="h-4 w-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl border border-border bg-white shadow-lg p-1 z-50">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setConfirmOpen(true);
                  }}
                  className="flex w-full items-center rounded-xl gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LogoutConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
}
