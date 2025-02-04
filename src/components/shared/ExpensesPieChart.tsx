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
          "#4CAF50", // Green
          "#F44336", // Red
          "#FFC107", // Yellow
          "#FF9800", // Orange
          "#9C27B0", // Purple
          "#2196F3", // Blue
          "#E91E63", // Pink
          "#795548", // Brown
          "#607D8B", // Blue Grey
          "#8BC34A", // Light Green
          "#FF5722", // Deep Orange
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
            "#4CAF50", // Green
            "#F44336", // Red
            "#FFC107", // Yellow
            "#FF9800", // Orange
            "#9C27B0", // Purple
            "#2196F3", // Blue
            "#E91E63", // Pink
            "#795548", // Brown
            "#607D8B", // Blue Grey
            "#8BC34A", // Light Green
            "#FF5722", // Deep Orange
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
    <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center text-black dark:text-white">
        Expenses by Category
      </h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "rgb(75, 85, 99)", // Gray-600
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
              backgroundColor: "rgba(31, 41, 55, 0.9)", // Gray-800 with opacity
              titleColor: "rgb(243, 244, 246)", // Gray-100
              bodyColor: "rgb(243, 244, 246)", // Gray-100
            },
          },
        }}
      />
    </div>
  );
}
