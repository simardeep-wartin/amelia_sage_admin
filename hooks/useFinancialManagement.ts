"use client";

import { useState, useEffect } from "react";
import { type FinancialTab } from "@/types";

export function useFinancialManagement() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FinancialTab>("Revenue Dashboard");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return { loading, activeTab, setActiveTab };
}
