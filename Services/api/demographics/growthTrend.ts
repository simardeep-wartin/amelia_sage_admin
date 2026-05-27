import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type TrendGroup = { group: string; data: { month: string; count: number }[] };

export type GrowthTrendResponse = {
  data: { group_by: string; trend: TrendGroup[] };
};

const COLORS = ["#9CAF88", "#D4A574", "#7B4CE2", "#6B6B6B", "#E87C6B", "#5B9BD5"];

function fmtMonth(ym: string) {
  const [y, m] = ym.split("-");
  return new Date(Number(y), Number(m) - 1).toLocaleString("default", {
    month: "short",
    year: "2-digit",
  });
}

export function buildTrendChartData(trend: TrendGroup[]) {
  const months = Array.from(new Set(trend.flatMap((g) => g.data.map((d) => d.month)))).sort();
  const data = months.map((month) => {
    const row: Record<string, unknown> = { month: fmtMonth(month) };
    trend.forEach((g) => {
      row[g.group] = g.data.find((d) => d.month === month)?.count ?? 0;
    });
    return row;
  });
  const series = trend.map((g, i) => ({
    key: g.group,
    label: g.group,
    color: COLORS[i % COLORS.length],
  }));
  return { data, series };
}

export const getGrowthTrend = (groupBy: string, filter: string) => {
  const apiGroupBy = groupBy === "all" ? "gender_identity" : groupBy;
  const qs = new URLSearchParams({ group_by: apiGroupBy, filter }).toString();
  return clientApi.get<GrowthTrendResponse>(`${ENDPOINTS.demographics.growthTrend}?${qs}`);
};
