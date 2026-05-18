"use client";

import { useState, useEffect } from "react";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import FinanceLoader from "@/components/loaders/finance-loader";
import PageLayout from "@/components/layout/PageLayout";
import MetricCard from "@/components/common/MetricCard";
import Tabs from "@/components/common/Tabs";
import FinancialTableCard from "@/components/common/FinancialTableCard";
import SummaryStatCard from "@/components/common/SummaryStatCard";
import ChartCard from "@/components/common/ChartCard";
import Badge from "@/components/common/Badge";
import { FINANCIAL_TABS } from "@/types/financial";
import type { FinancialTab } from "@/types/financial";
import type { BadgeVariant } from "@/components/common/Badge";
import appData from "@/data/app-data.json";

function FilterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M7 12h10M10 18h4" stroke="#6C6C6C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FinancialPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FinancialTab>("Revenue Dashboard");

  const [subSearch, setSubSearch] = useState("");
  const [subPlan, setSubPlan] = useState("All Plans");
  const [subStatus, setSubStatus] = useState("All Status");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FinanceLoader />;

  const financialData = appData.financial;
  const metrics =
    activeTab === "Revenue Dashboard" ? financialData.metrics.revenue : financialData.metrics.other;
  const cols = activeTab === "Revenue Dashboard" ? "l:grid-cols-3" : "l:grid-cols-4";

  // --- Render Functions ---

  const renderRevenueDashboard = () => {
    const data = appData.revenueDashboard;

    return (
      <div className="space-y-4">
        {/* Stat summary cards */}
        <div className="grid grid-cols-1 gap-4 l:grid-cols-2">
          <SummaryStatCard {...data.stats.monthlyRevenue} />
          <SummaryStatCard {...data.stats.trialConversion} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 l:grid-cols-2">
          <ChartCard
            title="Revenue Over Time"
            actions={<FilterIcon />}
            footer={
              <div className="flex justify-center items-center gap-2 text-[10px] text-[#6B6B6B]">
                <span className="inline-block h-3 w-3 rounded-full border-2 border-[#D4A574]" />
                Total Revenue
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data.lineData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6B6B6B" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12, fill: "#6B6B6B" }}
                  axisLine={false}
                  tickLine={false}
                  width={44}
                  domain={[0, 60000]}
                  ticks={[0, 15000, 30000, 45000, 60000]}
                />
                <Tooltip
                  formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
                  contentStyle={{ borderRadius: 10, border: "1px solid #F3F4F6", fontSize: 13 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#D4A574"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#fff", stroke: "#D4A574", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#fff", stroke: "#D4A574", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Revenue by Plan Type"
            actions={<FilterIcon />}
            footer={
              <div className="space-y-2">
                {data.barData.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-[14px]">
                    <span className="flex items-center gap-2 text-[#6B6B6B]">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ background: item.color }}
                      />
                      {item.label}
                    </span>
                    <span className="font-medium text-[#2D2D2D]">{item.revenue}</span>
                  </div>
                ))}
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data.barData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#6B6B6B" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B6B6B" }}
                  axisLine={false}
                  tickLine={false}
                  width={44}
                  domain={[0, 10000]}
                  ticks={[0, 2500, 5000, 7500, 10000]}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid #F3F4F6", fontSize: 13 }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={58}>
                  {data.barData.map((entry) => (
                    <Cell key={entry.label} fill={entry.color as string} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Subscription Health Table */}
        <FinancialTableCard
          title="Subscription Health Metrics"
          headerAction={<FilterIcon />}
          columns={[
            { key: "plan", label: "Plan" },
            { key: "active", label: "Active", align: "right" },
            { key: "revenue", label: "Revenue", align: "right" },
          ]}
          rows={data.healthRows}
          headerTextColor="#2D2D2D"
        />
      </div>
    );
  };

  const renderSubscriptions = () => {
    const rows = appData.subscriptions.rows.filter((r) => {
      const q = subSearch.toLowerCase();
      return (
        (r.email.toLowerCase().includes(q) || r.plan.toLowerCase().includes(q)) &&
        (subPlan === "All Plans" || r.plan === subPlan) &&
        (subStatus === "All Status" || r.status === subStatus)
      );
    });

    return (
      <FinancialTableCard
        title="Manage Subscriptions"
        filters={
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={subSearch}
              onChange={(e) => setSubSearch(e.target.value)}
              className="h-[37px] flex-1 rounded-[10px] border border-[#E5E7EB] px-4 text-[14px] outline-none"
            />
            <select
              value={subPlan}
              onChange={(e) => setSubPlan(e.target.value)}
              className="h-[37px] rounded-[9px] border border-[#CDCDCD] px-3 text-[14px]"
            >
              {["All Plans", "Core Monthly", "Core Annual", "Freemium"].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <select
              value={subStatus}
              onChange={(e) => setSubStatus(e.target.value)}
              className="h-[37px] rounded-[9px] border border-[#CDCDCD] px-3 text-[14px]"
            >
              {["All Status", "active", "trial", "cancelled"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        }
        columns={[
          { key: "email", label: "User" },
          { key: "plan", label: "Plan" },
          {
            key: "status",
            label: "Status",
            render: (row) => <Badge variant={row.status.toLowerCase() as BadgeVariant} />,
          },
          { key: "started", label: "Started" },
          { key: "nextBilling", label: "Next Billing" },
          { key: "amount", label: "Amount", align: "right" },
          {
            key: "actions",
            label: "Actions",
            align: "right",
            render: (row) => (
              <button
                className="text-[14px] font-medium"
                style={{
                  color:
                    row.status === "active"
                      ? "#8BAA87"
                      : row.status === "trial"
                        ? "#8B7EC8"
                        : "#6C6C6C",
                }}
              >
                Manage
              </button>
            ),
          },
        ]}
        rows={rows}
        headerTextColor="#D6B26A"
      />
    );
  };

  const renderPayments = () => {
    return (
      <FinancialTableCard
        title="Manage Payments"
        stats={[
          {
            label: "Success Rate",
            value: "98.5%",
            borderColor: "#B9F8CF",
            bgColor: "#F0FDF4",
            textColor: "#008236",
          },
          {
            label: "Failed Payments",
            value: 12,
            borderColor: "#FFC9C9",
            bgColor: "#FEF2F2",
            textColor: "#C10007",
          },
        ]}
        subtitle="Recent Transactions"
        columns={[
          { key: "date", label: "Date" },
          { key: "user", label: "User" },
          { key: "type", label: "Type" },
          { key: "amount", label: "Amount", align: "right" },
          {
            key: "status",
            label: "Status",
            align: "right",
            render: (row) => <Badge variant={row.status.toLowerCase() as BadgeVariant} />,
          },
          {
            key: "actions",
            label: "Actions",
            align: "right",
            render: () => <button className="text-sageGreen">View</button>,
          },
        ]}
        rows={appData.payments.rows}
        headerTextColor="#2D2D2D"
      />
    );
  };

  const renderPromotions = () => {
    return (
      <FinancialTableCard
        title="Manage Promotions"
        headerAction={
          <button className="flex items-center gap-2 rounded-[8px] bg-sageGreen px-4 py-2 text-white">
            <PlusIcon className="h-4 w-4" /> Create Promotion
          </button>
        }
        columns={[
          { key: "code", label: "Code" },
          { key: "discount", label: "Discount" },
          { key: "type", label: "Type" },
          { key: "validUntil", label: "Valid Until" },
          { key: "uses", label: "Uses" },
          {
            key: "status",
            label: "Status",
            render: (row) => (
              <Badge variant={row.status.toLowerCase() as BadgeVariant} label={row.status} />
            ),
          },
          {
            key: "actions",
            label: "",
            render: () => <button className="text-[#6C6C6C]">•••</button>,
          },
        ]}
        rows={appData.promotions.rows}
        headerTextColor="#618078"
      />
    );
  };

  return (
    <PageLayout title="Financial Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 s:flex-row s:items-center s:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-medium text-customBlack">Financial Management</h1>
            <p className="text-[14px] text-[#6B6B6B]">
              Dashboard / Financial / Financial Management
            </p>
          </div>
          <button className="flex h-12 items-center gap-2.5 rounded-[8px] bg-sageGreen px-6 font-semibold text-white hover:bg-sageGreenHover">
            <ArrowDownTrayIcon className="h-4 w-4" /> Export Report
          </button>
        </div>

        {/* Metrics */}
        <div className={`grid grid-cols-1 gap-4 s:grid-cols-2 ${cols}`}>
          {metrics.map((m) => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>

        <Tabs items={FINANCIAL_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        {activeTab === "Revenue Dashboard" && renderRevenueDashboard()}
        {activeTab === "Subscriptions" && renderSubscriptions()}
        {activeTab === "Payments" && renderPayments()}
        {activeTab === "Promotions" && renderPromotions()}
      </div>
    </PageLayout>
  );
}
