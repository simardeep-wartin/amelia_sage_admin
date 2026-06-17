"use client";

import FinanceLoader from "@/components/loaders/finance-loader";
import PageLayout from "@/components/layout/PageLayout";
import FinancialMain from "@/components/financial/FinancialMain";
import { useFinancialManagement } from "@/hooks/useFinancialManagement";

export default function FinancialPage() {
  const { loading, activeTab, setActiveTab } = useFinancialManagement();

  if (loading) return <FinanceLoader />;

  return (
    <PageLayout title="Financial Management">
      <FinancialMain activeTab={activeTab} setActiveTab={setActiveTab} />
    </PageLayout>
  );
}
