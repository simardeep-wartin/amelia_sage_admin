"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { useAuthStore } from "@/store/authStore";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) {
      router.replace("/signin");
    }
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="min-h-screen bg-softstone">
      <Navbar title={title} />
      <main className="p-3 sm:p-4 md:p-6">{children}</main>
    </div>
  );
}
