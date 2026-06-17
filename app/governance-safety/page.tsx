"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import PageLayout from "@/components/layout/PageLayout";
import Card from "@/components/common/Card";
import MetricCard from "@/components/common/MetricCard";
import GovernanceSafetyLoader from "@/components/loaders/governance-safety-loader";
import appData from "@/data/app-data.json";

const data = appData.governanceSafety;

const ICON_MAP: Record<string, string> = {
  flag: "/auth/exclamationTriangle.svg",
  check: "/auth/circleTick.svg",
};

// ─── Risk row ─────────────────────────────────────────────────────────────────
function RiskRow({ label, count, dotColor }: { label: string; count: number; dotColor: string }) {
  return (
    <div className="flex min-h-[68px] items-center justify-between rounded-[10px] bg-softstone px-4">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
        <span className="text-m font-medium text-charcoal">{label}</span>
        <span className="text-m font-medium text-charcoal/60">|</span>
        <span className="inline-flex h-[23px] min-w-[115px] items-center justify-center rounded-full bg-paper px-3">
          <span className="text-xs text-charcoal">{count} users flagged</span>
        </span>
      </div>
      <Link
        href="/governance-safety/review/pending"
        className="flex items-center gap-2.5 text-s font-medium text-sageGreen transition-opacity hover:opacity-70"
      >
        Review Cases
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-paper shadow-sm">
          <ArrowUpRightIcon className="h-3.5 w-3.5 text-sageGreen/70" />
        </span>
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GovernanceSafetyPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <GovernanceSafetyLoader />;

  return (
    <PageLayout title="Governance & Safety">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-l font-medium text-charcoal">Governance &amp; Safety</h1>
          <p className="text-s text-grey">Dashboard / Overview / Governance &amp; Safety</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              subtitle={metric.subtitle}
              iconSrc={ICON_MAP[metric.iconType] ?? "/auth/circleTick.svg"}
            />
          ))}
        </div>

        <Card
          title="Overwhelm Detection & User Wellbeing"
          actions={
            <button
              type="button"
              aria-label="View all"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-sageGreen/30 bg-paper transition-opacity hover:opacity-70"
            >
              <ArrowUpRightIcon className="h-3.5 w-3.5 text-sageGreen/70" />
            </button>
          }
        >
          <p className="mb-4 text-s text-grey">{data.overwhelmDetection.description}</p>
          <div className="space-y-3">
            {data.overwhelmDetection.riskLevels.map((riskLevel) => (
              <RiskRow
                key={riskLevel.id}
                label={riskLevel.label}
                count={riskLevel.count}
                dotColor={riskLevel.dotColor}
              />
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
