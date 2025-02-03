import { useEffect, useState, useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { Expense } from "../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensesPieChartProps {
  expenses: Expense[];
}

export function ExpensesPieChart({ expenses }: ExpensesPieChartProps) {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          "#E0FFFF", // Light Cyan (primary-light)
          "#00FFFF", // Cyan (primary)
          "#008B8B", // Dark Cyan (primary-dark)
          "#E0F2F1", // Light Teal (secondary-light)
          "#008080", // Teal (secondary)
          "#004D40", // Dark Teal (secondary-dark)
          "#B2EBF2", // Light Cyan variant
          "#00BCD4", // Cyan variant
          "#006064", // Dark Cyan variant
          "#80CBC4", // Teal variant
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Group expenses by category and sum amounts
    const expensesByCategory = expenses.reduce((acc, expense) => {
      const category = expense.category;
      acc[category] = (acc[category] || 0) + Math.abs(expense.amount);
      return acc;
    }, {} as Record<string, number>);

    // Convert to arrays for chart data
    const labels = Object.keys(expensesByCategory);
    const data = Object.values(expensesByCategory);

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "#E0FFFF", // Light Cyan (primary-light)
            "#00FFFF", // Cyan (primary)
            "#008B8B", // Dark Cyan (primary-dark)
            "#E0F2F1", // Light Teal (secondary-light)
            "#008080", // Teal (secondary)
            "#004D40", // Dark Teal (secondary-dark)
            "#B2EBF2", // Light Cyan variant
            "#00BCD4", // Cyan variant
            "#006064", // Dark Cyan variant
            "#80CBC4", // Teal variant
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="w-full text-center p-4 text-primary dark:text-primary-light">
        No expenses to display
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center text-primary dark:text-primary-light">
        Expenses by Category
      </h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "rgb(0, 255, 255)", // Cyan (primary)
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.raw as number;
                  return `$${value.toFixed(2)}`;
                },
              },
              backgroundColor: "rgba(0, 139, 139, 0.8)", // Dark Cyan (primary-dark) with opacity
              titleColor: "rgb(224, 255, 255)", // Light Cyan (primary-light)
              bodyColor: "rgb(224, 255, 255)", // Light Cyan (primary-light)
            },
          },
        }}
      />
    </div>
  );
}
