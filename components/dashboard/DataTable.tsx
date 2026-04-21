import Card from "@/components/common/Card";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  columns: TableColumn<T>[];
  rows: T[];
}

export default function DataTable<T extends Record<string, unknown>>({ title, columns, rows }: DataTableProps<T>) {
  return (
    <Card title={title} className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-[620px] w-full">
          <thead className="bg-softstone">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-cardBorder">
                {columns.map((column) => {
                  const value = row[column.key];
                  return (
                    <td key={String(column.key)} className="px-5 py-4 text-s text-charcoal">
                      {column.render ? column.render(value, row) : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
