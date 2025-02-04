import React, { useMemo, useState } from "react";
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

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  const handlePieClick = (_: any, index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const handleContainerClick = () => {
    setActiveIndex(-1);
  };

  return (
    <div className="min-h-[600px] flex flex-col" onClick={handleContainerClick}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Expenses by Category
      </h2>
      <div
        className="flex flex-col md:flex-row gap-8"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={activeIndex === -1 ? 90 : 100}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                onClick={handlePieClick}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    opacity={
                      activeIndex === -1 || activeIndex === index ? 1 : 0.6
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toFixed(2)}`,
                  "Amount",
                ]}
                active={activeIndex !== -1}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start overflow-y-auto px-2">
          {data.map((entry, index) => (
            <div
              key={entry.name}
              className="flex items-center gap-2 cursor-pointer"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handlePieClick(null, index);
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                  opacity:
                    activeIndex === -1 || activeIndex === index ? 1 : 0.6,
                }}
              />
              <span
                className={`text-sm text-gray-700 dark:text-gray-300 ${
                  activeIndex === index && activeIndex !== -1 ? "font-bold" : ""
                }`}
                style={{ wordBreak: "break-word" }}
              >
                {entry.name} ({((entry.value / totalExpenses) * 100).toFixed(0)}
                %)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
