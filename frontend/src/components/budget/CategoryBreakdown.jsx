import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

import { CircleDollarSign } from "lucide-react";
import { currency } from "../../data/budgetData";

export default function CategoryBreakdown({ categories, totalSpent }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Category Breakdown
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            See how your expenses are distributed.
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-slate-500">
          <CircleDollarSign size={22} />
        </div>
      </div>

      <div className="mt-6 grid items-center gap-5 sm:grid-cols-2">
        <div className="relative mx-auto h-[230px] w-full max-w-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="84%"
                paddingAngle={2}
                stroke="none"
              >
                {categories.map((category) => (
                  <Cell key={category.name} fill={category.color} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => currency(Number(value))}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-slate-500">Total Spent</span>

            <span className="mt-1 text-xl font-bold text-slate-900">
              {currency(totalSpent)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {categories.map((category) => {
            const share =
              totalSpent > 0 ? (category.amount / totalSpent) * 100 : 0;

            return (
              <div key={category.name}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />

                    <span className="truncate text-sm font-medium text-slate-700">
                      {category.name}
                    </span>
                  </div>

                  <span className="text-sm font-semibold tabular-nums text-slate-600">
                    {share.toFixed(1)}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${share}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
