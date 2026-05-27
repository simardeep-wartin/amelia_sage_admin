export type FilterParams = {
  filter?: string;
  range?: { from: Date | null; to: Date | null };
};

const LABEL_TO_API: Record<string, string> = {
  // Title-case UI labels → API values
  All: "all",
  Today: "today",
  Week: "week",
  Month: "month",
  Year: "year",
  Custom: "custom",
  // Legacy labels (keep for backwards compat)
  "This Week": "week",
  "This month": "month",
  "This Year": "year",
};

function resolveFilter(filter: string): string {
  return LABEL_TO_API[filter] ?? filter;
}

export function buildFilterQuery(params?: FilterParams): string {
  if (!params?.filter) return "";
  const filter = resolveFilter(params.filter);
  const q: Record<string, string> = { filter };
  if (filter === "custom" && params.range?.from && params.range?.to) {
    const fmt = (d: Date) =>
      `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    q.start_date = fmt(params.range.from);
    q.end_date = fmt(params.range.to);
  }
  const qs = new URLSearchParams(q).toString();
  return qs ? `?${qs}` : "";
}
