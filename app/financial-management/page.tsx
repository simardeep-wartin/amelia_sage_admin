"use client";

import { useState } from "react";
import { ArrowDownTrayIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
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
  const [activeTab, setActiveTab] = useState<FinancialTab>("Revenue Dashboard");

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
            <button className="flex h-12 items-center gap-2.5 rounded-[9px] border border-[#6C6C6C] px-4 text-[14px] text-[#2B2B2B]">
              This Month
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            <button className="flex h-12 items-center gap-2.5 rounded-[8px] bg-sageGreen px-6 text-[16px] font-semibold text-white hover:bg-primaryHover">
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