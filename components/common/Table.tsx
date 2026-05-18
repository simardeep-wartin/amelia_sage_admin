import { type ReactNode } from "react";

export interface TableColumn<T extends object> {
  key: keyof T | string;
  label: string;
  align?: "left" | "center" | "right";
  render?: (row: T) => ReactNode;
}

interface TableProps<T extends object> {
  columns: TableColumn<T>[];
  rows: T[];
  headerTextColor?: string;
  emptyMessage?: string;
}

export default function Table<T extends object>({
  columns,
  rows,
  headerTextColor = "#6C6C6C",
  emptyMessage = "No data available.",
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[#F3F4F6]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`whitespace-nowrap px-4 py-3 text-xs font-semibold ${
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                      ? "text-center"
                      : "text-left"
                }`}
                style={{ color: headerTextColor }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-[#6C6C6C]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-b border-[#F3F4F6] last:border-0 hover:bg-[#F9FAFB]">
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`whitespace-nowrap px-4 py-3 text-[#2B2B2B] ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                          ? "text-center"
                          : "text-left"
                    }`}
                  >
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[String(col.key)] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
