"use client";

import Navbar from "@/components/layout/Navbar";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-softstone">
      <Navbar title={title} />
      <main className="p-3 sm:p-4 md:p-6">{children}</main>
    </div>
  );
}
