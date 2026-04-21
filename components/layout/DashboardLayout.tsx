"use client";

import Navbar from "@/components/layout/Navbar";

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardLayout({ title, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-softstone">
      <Navbar title={title} />
      <main className="p-3 sm:p-4 md:p-6">{children}</main>
    </div>
  );
}
