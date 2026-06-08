"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getNavigationSections } from "@/Services/navigationService";

const ICON_MAP: Record<string, string> = {
  "/dashboard": "/auth/dashboard.svg",
  "/user-insights": "/auth/user-insights.svg",
  "/governance-safety": "/auth/governance.svg",
  "/demographics": "/auth/demographics.svg",
  "/financial-management": "/auth/financial.svg",
  "/access-tiers": "/auth/access-tiers.svg",
  "/wellth-plans": "/auth/wealth-plans.svg",
  "/work-on-me-exercises": "/auth/work-on-me.svg",
  "/mindful-exercise-management": "/auth/mindful-excercise.svg",
  "/calm-stillness-management": "/auth/calm-stillness.svg",
  "/exercises-draft-management": "/auth/fluent_drafts-24-regular.svg",
  "/sage-ai-settings": "/auth/sage-AI.svg",
  "/notifications": "/auth/notifications.svg",
  "/settings": "/auth/settings.svg",
  "/phase-2-roadmap": "/auth/phase-2.svg",
};

const AUTH_PATHS = ["/signin", "/signup"];
const NAV_LINK_BASE =
  "flex min-h-10 w-full items-center gap-3 rounded-lg px-3 py-2 text-softstone transition-colors";
const NAV_LINK_ACTIVE = "bg-gold shadow-sm";
const NAV_LINK_HOVER = "hover:bg-gold hover:shadow-sm";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navSections = getNavigationSections();

  useEffect(() => {
    const openSidebar = () => setIsOpen(true);
    window.addEventListener("open-sidebar", openSidebar);
    return () => window.removeEventListener("open-sidebar", openSidebar);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (AUTH_PATHS.includes(pathname) || pathname?.startsWith("/auth/")) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-sageGreen transition-transform [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:sticky md:top-0 md:z-30 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo header */}
        <div className="flex h-[84px] shrink-0 items-center justify-between gap-3 pl-5 pr-3">
          <div className="flex items-center gap-3">
            <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[13px] bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)]">
              <Image
                src="/auth/butterfly-illustration.png"
                alt="Amelia Sage logo"
                width={46}
                height={46}
                className="object-contain"
              />
            </div>
            <span className="font-cormorant text-xl font-bold leading-none text-paper">
              Amelia Sage
            </span>
          </div>
          <button
            className="rounded p-1 text-paper md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation — source of truth: Services/navigationService.ts */}
        <nav className="flex flex-col gap-6 px-4 pb-6 pt-4">
          {navSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <p className="px-3 font-cormorant text-xs font-bold tracking-wide text-softstone">
                {section.title}
              </p>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const iconSrc = ICON_MAP[item.href];
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                        className={[
                          NAV_LINK_BASE,
                          isActive ? NAV_LINK_ACTIVE : NAV_LINK_HOVER,
                        ].join(" ")}
                      >
                        {iconSrc && (
                          <Image
                            src={iconSrc}
                            alt=""
                            width={20}
                            height={20}
                            className="shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-s font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
