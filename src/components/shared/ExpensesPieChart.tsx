import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ExpensesPieChartProps {
  expenses: Array<{
    category: string;
    amount: number;
  }>;
}

interface ChartData {
  name: string;
  value: number;
}

export function ExpensesPieChart({ expenses }: ExpensesPieChartProps) {
  const data = useMemo<ChartData[]>(() => {
    const categoryTotals = expenses.reduce<Record<string, number>>(
      (acc, expense) => {
        const category = expense.category;
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
      },
      {}
    );

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenses]);

  const COLORS = [
    "#10B981", // primary
    "#EF4444", // red
    "#F59E0B", // yellow
    "#F97316", // orange
    "#8B5CF6", // purple
    "#3B82F6", // blue
    "#EC4899", // pink
    "#6B7280", // gray
  ];

  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Expenses by Category
      </h2>
      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={({ name, value }) => {
                const percentage = ((value / totalExpenses) * 100).toFixed(0);
                return `${name} (${percentage}%)`;
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
