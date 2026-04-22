"use client";

import {
  ArrowPathIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MicrophoneIcon,
  PlusIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import FilterDropdown from "@/components/common/FilterDropdown";
import Chart from "@/components/dashboard/Chart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import appData from "@/data/app-data.json";

const dashboardData = appData.dashboard;

const ICONS = {
  plus: <PlusIcon className="h-4 w-4" />,
  sparkles: <SparklesIcon className="h-4 w-4" />,
  microphone: <MicrophoneIcon className="h-4 w-4" />,
  arrowPath: <ArrowPathIcon className="h-4 w-4" />,
} as const;

type ActionIconKey = keyof typeof ICONS;

export default function DashboardPage() {
  const [activeUsersFilter, setActiveUsersFilter] = useState("This Week");

  const filterOptions = ["This Week", "Last Week", "This Month"];

  const alertStyles = {
    warning: {
      bg: "bg-[#fef3c6]",
      text: "text-[#973c00]",
      icon: <ExclamationTriangleIcon className="h-3.5 w-3.5 text-[#973c00]" />,
    },
    info: {
      bg: "bg-[#dbeafe]",
      text: "text-[#1e40af]",
      icon: <InformationCircleIcon className="h-3.5 w-3.5 text-[#1e40af]" />,
    },
    error: {
      bg: "bg-[#f4e2e3]",
      text: "text-[#9f1239]",
      icon: <ExclamationCircleIcon className="h-3.5 w-3.5 text-[#9f1239]" />,
    },
  } as const;

  return (
    <DashboardLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
            <Card
              title={dashboardData.activeUsers.title}
              actions={
                <FilterDropdown
                  options={filterOptions}
                  value={activeUsersFilter}
                  onChange={setActiveUsersFilter}
                />
              }
            >
              <div className="mb-4">
                <div>
                  <p className="font-cormorant text-xxl font-bold text-charcoal">
                    {dashboardData.activeUsers.value}
                  </p>
                  <p className="text-s text-grey">{dashboardData.activeUsers.subtitle}</p>
                </div>
                <div className="mt-3 flex justify-start sm:mt-2 sm:justify-end">
                  <span className="inline-flex rounded-full bg-trendBg px-3 py-1 text-s text-trendGreen">
                    {dashboardData.activeUsers.trend}
                  </span>
                </div>
              </div>
              <Chart data={dashboardData.activeUsersChart} />
            </Card>
            <Card title="Wellth Plan Progress">
              <div className="space-y-4">
                {dashboardData.progressItems.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-cormorant text-customBlack">{item.label}</span>
                      <span className="text-[#6b6b6b]">{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[linear-gradient(178deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card title="Journal & Insights Activity">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex h-[76px] items-center justify-center rounded-2xl bg-[linear-gradient(165deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                  <div className="text-center">
                    <p className="font-cormorant text-xl font-bold text-customBlack">
                      {dashboardData.journalInsights.journalsCreated}
                    </p>
                    <p className="text-xs font-medium text-customBlack">Total journals created</p>
                  </div>
                </div>
                <div className="flex h-[76px] items-center justify-center rounded-2xl bg-[linear-gradient(165deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                  <div className="text-center">
                    <p className="font-cormorant text-xl font-bold text-customBlack">
                      {dashboardData.journalInsights.insightsGenerated}
                    </p>
                    <p className="text-xs font-medium text-customBlack">Insights generated</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-cardBorder pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-customBlack">Most active topic:</span>
                  <div className="inline-flex items-center gap-2">
                    <span className="h-[11px] w-[11px] rounded-full bg-[#d4a574]" />
                    <span className="text-sm text-charcoal">
                      {dashboardData.journalInsights.mostActiveTopic}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Core vs Free Distribution">
            <div className="overflow-hidden rounded-2xl">
              <div className="grid grid-cols-[1fr_1.5fr]">
                <div className="flex h-24 flex-col items-center justify-center bg-gradient-to-r from-primary to-gold">
                  <p className="font-cormorant text-3xl font-bold text-customBlack">
                    {dashboardData.coreVsFree.core}
                  </p>
                  <p className="text-xs font-medium text-charcoal">Core</p>
                </div>
                <div className="flex h-24 flex-col items-center justify-center bg-[linear-gradient(166deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                  <p className="font-cormorant text-3xl font-bold text-customBlack">
                    {dashboardData.coreVsFree.free}
                  </p>
                  <p className="text-xs font-medium text-slate">Free</p>
                </div>
              </div>
            </div>
            <div className="mt-4 border-t border-cardBorder pt-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#6b6b6b]">Conversion rate:</p>
                <p className="font-cormorant text-2xl font-semibold text-customBlack">
                  {dashboardData.coreVsFree.conversionRate}
                </p>
              </div>
            </div>
          </Card>

          <Card title="Governance Alerts">
            <div className="space-y-3">
              {dashboardData.alerts.map((alert) => {
                const variant = alertStyles[alert.type as keyof typeof alertStyles];
                return (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between rounded-[10px] bg-[linear-gradient(175deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-[10px] ${variant.bg}`}
                      >
                        {variant.icon}
                      </div>
                      <p className="text-s text-charcoal">{alert.message}</p>
                    </div>
                    <button className={`text-s font-medium ${variant.text} hover:underline`}>
                      {alert.action}
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Quick Actions">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {dashboardData.quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant as "solid" | "outline" | "ghost" | "custom"}
                  leftIcon={ICONS[action.icon as ActionIconKey]}
                  href={action.href}
                  className="w-full border border-primary bg-paper text-primary hover:bg-primary hover:text-white focus-visible:ring-0"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Sage AI Interactions">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-[88px] w-[89px] items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                <div className="relative h-[88px] w-[89px] overflow-hidden rounded-lg">
                  <img
                    src={dashboardData.sageAiImage}
                    alt="Sage AI"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="font-cormorant text-5xl font-bold text-customBlack">
                  {dashboardData.sageAi.totalInteractions}
                </p>
                <p className="text-xs font-medium text-slate">Total Interactions</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#6b6b6b]">Voice interactions:</span>
                <span className="font-cormorant text-lg font-semibold text-charcoal">
                  {dashboardData.sageAi.voiceInteractions}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b6b6b]">Chat sessions:</span>
                <span className="font-cormorant text-lg font-semibold text-charcoal">
                  {dashboardData.sageAi.chatSessions}
                </span>
              </div>
              <div className="border-t border-cardBorder pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#6b6b6b]">Satisfaction:</span>
                  <span className="font-medium text-customBlack">
                    {dashboardData.sageAi.satisfaction}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Calm & Stillness Stats">
            <div className="mb-4 flex justify-center">
              <div className="flex h-[88px] w-[89px] items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                <div className="relative h-[77px] w-[76px] overflow-hidden rounded-lg">
                  <img
                    src={dashboardData.calmStillnessImage}
                    alt="Calm and stillness"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {dashboardData.calmStillness.map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-[#6b6b6b]">{item.label}:</span>
                  <span className="font-cormorant text-lg font-semibold text-charcoal">
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="border-t border-cardBorder pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6b6b6b]">Total tutorials active:</span>
                  <div className="inline-flex items-center gap-2">
                    <span className="h-[11px] w-[11px] rounded-full bg-[#d4a574]" />
                    <span className="text-xs text-charcoal">
                      {dashboardData.calmStillnessSummary}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Mindful Exercises Stats">
            <div className="mb-4 flex justify-center">
              <div className="flex h-[88px] w-[89px] items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                <div className="relative h-[74px] w-[55px]">
                  <img
                    src={dashboardData.mindfulExercisesImage}
                    alt="Mindful exercises"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {dashboardData.mindfulExercises.map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-[#6b6b6b]">{item.label}:</span>
                  <span className="font-medium text-customBlack">{item.value}</span>
                </div>
              ))}
              <div className="border-t border-cardBorder pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6b6b6b]">Total exercises active:</span>
                  <div className="inline-flex items-center gap-2">
                    <span className="h-[11px] w-[11px] rounded-full bg-[#d4a574]" />
                    <span className="text-xs text-charcoal">{dashboardData.mindfulSummary}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
