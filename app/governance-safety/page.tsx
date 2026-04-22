"use client";

import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  EyeIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/common/Card";
import data from "@/data/governance-safety.json";

// ─── icon maps ────────────────────────────────────────────────────────────────

const METRIC_ICON_MAP = {
  flag: ExclamationTriangleIcon,
  check: CheckCircleIcon,
  shield: LockClosedIcon,
};
type MetricIconKey = keyof typeof METRIC_ICON_MAP;

const PANEL_ICON_MAP = {
  shield: ShieldCheckIcon,
  eye: EyeIcon,
};
type PanelIconKey = keyof typeof PANEL_ICON_MAP;

// ─── sub-components ───────────────────────────────────────────────────────────

function MetricCard({
  title,
  value,
  subtitle,
  iconType,
}: {
  title: string;
  value: string;
  subtitle: string;
  iconType: string;
}) {
  const Icon = METRIC_ICON_MAP[iconType as MetricIconKey] ?? CheckCircleIcon;
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm">
      <p className="text-m font-medium text-charcoal">{title}</p>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
          <Icon className="h-6 w-6 text-charcoal/60" />
        </div>
        <div>
          <p className="text-2xl font-bold leading-tight text-charcoal">{value}</p>
          <p className="mt-1 text-xs text-slate">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function RiskRow({
  label,
  count,
  dotColor,
}: {
  label: string;
  count: number;
  dotColor: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[10px] bg-softstone px-4 py-0 min-h-[68px]">
      <div className="flex items-center gap-3">
        <span
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        <span className="text-m font-medium text-charcoal">{label}</span>
        <span className="text-m font-medium text-charcoal">|</span>
        <span className="inline-flex h-[23px] items-center justify-center rounded-full bg-paper px-3">
          <span className="text-xs text-charcoal">{count} users flagged</span>
        </span>
      </div>
      <button
        type="button"
        className="flex items-center gap-2 text-s font-medium text-primary hover:underline"
      >
        Review Cases
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-paper">
          <ArrowUpRightIcon className="h-3.5 w-3.5 text-charcoal" />
        </span>
      </button>
    </div>
  );
}

function ModerationRow({
  title,
  time,
  status,
}: {
  title: string;
  time: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-[#e1e1e1] px-4 py-3 min-h-[73px]">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
          <DocumentTextIcon className="h-5 w-5 text-charcoal/60" />
        </div>
        <div>
          <p className="text-m font-medium text-charcoal">{title}</p>
          <p className="text-xs text-[#b0b0b0]">{time}</p>
        </div>
        <span className="ml-2 inline-flex items-center rounded-full bg-[linear-gradient(165deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)] px-3 py-1">
          <span className="text-xs text-[#bb4d00]">{status}</span>
        </span>
      </div>
      <button
        type="button"
        className="text-s font-medium text-primary hover:underline"
      >
        Review
      </button>
    </div>
  );
}

function CheckRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-s text-slate">{label}</span>
      <CheckCircleIcon className="h-5 w-5 text-[#4bb05d]" />
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function GovernanceSafetyPage() {
  return (
    <DashboardLayout title="Governance & Safety">
      <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="flex flex-col gap-1">
          <h1 className="text-l font-medium text-charcoal">Governance &amp; Safety</h1>
          <p className="text-s text-slate">Dashboard / Overview / Governance &amp; Safety</p>
        </div>

        {/* ── Metric Cards ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.metrics.map((m) => (
            <MetricCard
              key={m.title}
              title={m.title}
              value={m.value}
              subtitle={m.subtitle}
              iconType={m.iconType}
            />
          ))}
        </div>

        {/* ── Overwhelm Detection ───────────────────────────────────────────── */}
        <Card title="Overwhelm Detection & User Wellbeing">
          <p className="mb-4 text-s text-slate">{data.overwhelmDetection.description}</p>
          <div className="space-y-3">
            {data.overwhelmDetection.riskLevels.map((r) => (
              <RiskRow
                key={r.id}
                label={r.label}
                count={r.count}
                dotColor={r.dotColor}
              />
            ))}
          </div>
        </Card>

        {/* ── Content Moderation Queue ──────────────────────────────────────── */}
        <Card title="Content Moderation Queue">
          <div className="space-y-3">
            {data.moderationQueue.map((item) => (
              <ModerationRow
                key={item.id}
                title={item.title}
                time={item.time}
                status={item.status}
              />
            ))}
          </div>
        </Card>

        {/* ── Privacy & Data Governance ─────────────────────────────────────── */}
        <Card title="Privacy & Data Governance">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Data Anonymization */}
            <div className="space-y-3">
              <p className="text-m font-medium text-gold">
                {data.dataGovernance.dataAnonymization.title}
              </p>
              <div className="space-y-2">
                {data.dataGovernance.dataAnonymization.items.map((item) => (
                  <CheckRow key={item} label={item} />
                ))}
              </div>
            </div>
            {/* Compliance Checks */}
            <div className="space-y-3">
              <p className="text-m font-medium text-gold">
                {data.dataGovernance.complianceChecks.title}
              </p>
              <div className="space-y-2">
                {data.dataGovernance.complianceChecks.items.map((item) => (
                  <CheckRow key={item} label={item} />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ── Ethical AI Guidelines ─────────────────────────────────────────── */}
        <Card title="Ethical AI Guidelines & Sage Behavior">
          <p className="mb-4 text-s text-slate">{data.ethicalAI.description}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.ethicalAI.panels.map((panel) => {
              const Icon = PANEL_ICON_MAP[panel.iconType as PanelIconKey] ?? ShieldCheckIcon;
              return (
                <div
                  key={panel.id}
                  className="rounded-[10px] border border-[rgba(168,181,160,0.2)] bg-[linear-gradient(164deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)] p-4"
                >
                  <div className="mb-3 flex items-center gap-2 border-b border-black/10 pb-2">
                    <Icon className="h-5 w-5 text-[#4bb05d]" />
                    <p className="text-m font-medium text-charcoal">{panel.title}</p>
                  </div>
                  <ul className="space-y-1 pl-1">
                    {panel.items.map((item) => (
                      <li key={item} className="text-xs text-slate">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
