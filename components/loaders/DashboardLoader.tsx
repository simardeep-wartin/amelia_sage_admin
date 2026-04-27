"use client";

import {
  BellIcon,
  CheckIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";

const Card = ({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <div className="rounded-xl border border-cardBorder bg-paper p-5">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-charcoal">{title}</h3>
      {action}
    </div>
    {children}
  </div>
);

const Empty = ({ title, body }: { title: string; body: string }) => (
  <div>
    <p className="text-sm font-medium text-charcoal">{title}</p>
    <p className="mt-1 text-xs leading-relaxed text-slate">{body}</p>
  </div>
);

const Bar = ({ w = "w-full" }: { w?: string }) => (
  <div className={`h-2 rounded-full bg-cardBorder ${w}`} />
);

const Action = ({ icon, label, primary }: { icon: React.ReactNode; label: string; primary?: boolean }) => (
  <button
    className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-medium transition ${
      primary
        ? "bg-sageGreen text-white hover:opacity-90"
        : "border border-cardBorder bg-paper text-charcoal hover:bg-softstone"
    }`}
  >
    {icon}
    {label}
  </button>
);

const StatCard = ({ title, emptyTitle, body }: { title: string; emptyTitle: string; body: string }) => (
  <Card title={title}>
    <div className="flex justify-center py-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-softstone text-sageGreen">
        <SparklesIcon className="h-6 w-6" />
      </div>
    </div>
    <div className="mt-4">
      <Empty title={emptyTitle} body={body} />
    </div>
    <button className="mt-4 text-xs font-medium text-sageGreen hover:underline">
      Manage Exercises
    </button>
  </Card>
);

export const DashboardLoader = () => (
  <div className="min-h-screen bg-softstone p-6">
    {/* Header */}
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-base font-semibold text-charcoal">
        Dashboard Overview
      </h1>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate" />
          <input
            placeholder="Search..."
            className="h-9 w-64 rounded-lg border border-cardBorder bg-paper pl-9 pr-3 text-xs text-charcoal placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-sageGreen/30"
          />
        </div>

        {/* Notification */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-cardBorder bg-paper">
          <BellIcon className="h-4 w-4 text-slate" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
        </button>

        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sageGreen text-xs font-medium text-white">
          A
        </div>
      </div>
    </div>

    {/* Layout */}
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Left */}
      <div className="space-y-4 lg:col-span-2">
        <Card title="Active Users This Week">
          <Empty
            title="No activity yet"
            body="User engagement will appear here once activity begins."
          />
          <svg viewBox="0 0 300 80" className="mt-8 w-full" fill="none">
            <path
              d="M0 50 C 40 20, 80 70, 120 45 S 200 10, 240 50 S 290 40, 300 30"
              stroke="#E5E7EB"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>
        </Card>

        <Card title="Core vs Free Distribution">
          <Empty
            title="No conversion data available yet."
            body="All Core vs Free distributions and comparisons will be displayed here."
          />
          <div className="mt-6 flex items-end justify-center gap-2">
            {[28, 40, 52, 36, 24].map((h, i) => (
              <div
                key={i}
                className="w-7 rounded-md bg-cardBorder"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </Card>

        <Card title="Journal & Insights Activity">
          <Empty
            title="No journal activity yet"
            body="User reflections and insights will appear here once entries are created."
          />
          <div className="mt-6 space-y-2">
            <Bar />
            <Bar w="w-5/6" />
          </div>
        </Card>

        <Card title="Governance Alerts">
          <div className="flex flex-col items-center py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-softstone">
              <CheckIcon className="h-5 w-5 text-sageGreen" />
            </div>
            <p className="mt-3 text-sm font-medium text-charcoal">
              All systems are stable
            </p>
            <p className="mt-1 text-xs text-slate">
              No alerts or issues detected at this time.
            </p>
          </div>
        </Card>

        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-3">
            <Action
              primary
              icon={<PlusIcon className="h-3.5 w-3.5" />}
              label="Create New Wealth Plan"
            />
            <Action
              icon={<SparklesIcon className="h-3.5 w-3.5" />}
              label="Add Mindful Exercise"
            />
            <Action
              icon={<PlusIcon className="h-3.5 w-3.5" />}
              label="Add Calm & Stillness Exercise"
            />
            <Action
              icon={<ArrowUpRightIcon className="h-3.5 w-3.5" />}
              label="Go to Work on Me"
            />
          </div>
        </Card>
      </div>

      {/* Right */}
      <div className="space-y-4">
        <Card
          title="Wealth Plan Progress"
          action={<span className="text-lg text-slate">⋯</span>}
        >
          <Empty
            title="No plan activity yet"
            body="Progress will be displayed once users begin their Wealth journey."
          />
          <div className="mt-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-cardBorder">
              <PlusIcon className="h-5 w-5 text-slate" />
            </div>
          </div>
        </Card>

        <Card title="Sage AI Interactions">
          <Empty
            title="No interactions recorded"
            body="Conversations with Sage AI will appear here once users engage."
          />
          <div className="mt-6 space-y-2">
            <Bar />
            <Bar w="w-5/6" />
            <Bar w="w-4/6" />
          </div>
        </Card>

        <StatCard
          title="Calm & Stillness Stats"
          emptyTitle="No calm sessions yet"
          body="Breathwork and stillness activity will be tracked here."
        />

        <StatCard
          title="Mindful Exercises Stats"
          emptyTitle="No exercise activity yet"
          body="Yoga, Pilates, and other sessions will appear here once users begin."
        />
      </div>
    </div>
  </div>
);

export default DashboardLoader;