"use client";

import { useState, useEffect } from "react";
import { ArrowDownTrayIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import FinanceLoader from "@/components/loaders/finance-loader";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricCard from "@/components/common/MetricCard";
import Tabs from "@/components/common/Tabs";
import RevenueDashboard from "@/components/financial/Revenue/RevenueDashboard";
import SubscriptionTab from "@/components/financial/Subscription/SubscriptionTab";
import PaymentTab from "@/components/financial/Payment/PaymentTab";
import PromotionTab from "@/components/financial/Promotion/PromotionTab";
import { FINANCIAL_TABS } from "@/features/financial/financial.types";
import type { FinancialTab } from "@/features/financial/financial.types";

import appData from "@/data/app-data.json";

type Metric = {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  iconSrc: string;
};

export default function FinancialPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FinancialTab>("Revenue Dashboard");

    useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);


  if (loading) return <FinanceLoader />;

  const financialData = appData.financial;

  const metrics: Metric[] =
    activeTab === "Revenue Dashboard"
      ? (financialData.metrics.revenue as Metric[])
      : (financialData.metrics.other as Metric[]);

  const cols =
    activeTab === "Revenue Dashboard" ? "l:grid-cols-3" : "l:grid-cols-4";

  return (
    <DashboardLayout title="Financial Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 s:flex-row s:items-center s:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-arial text-[24px] font-medium leading-[32px] text-customBlack">
              Financial Management
            </h1>
            <p className="font-arial text-[14px] leading-[20px] text-[#6B6B6B]">
              Dashboard / Financial / Financial Management
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button className="flex h-12 items-center gap-2.5 rounded-[8px] bg-sageGreen px-6 text-[16px] justify-center cursor-pointer lg:min-w-[269px] font-semibold text-white hover:bg-sageGreenHover">
              <ArrowDownTrayIcon className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className={`grid grid-cols-1 gap-4 s:grid-cols-2 ${cols}`}>
          {metrics.map((m) => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>

        {/* Tabs */}
        <Tabs
          items={FINANCIAL_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content */}
        {activeTab === "Revenue Dashboard" && <RevenueDashboard />}
        {activeTab === "Subscriptions" && <SubscriptionTab />}
        {activeTab === "Payments" && <PaymentTab />}
        {activeTab === "Promotions" && <PromotionTab />}
      </div>
    </DashboardLayout>
  );
}