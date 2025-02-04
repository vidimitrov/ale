import React from "react";
import type { Income, Expense } from "../../types";

interface IncomeExpenseProgressProps {
  incomes: Income[];
  expenses: Expense[];
}

export function IncomeExpenseProgress({
  incomes,
  expenses,
}: IncomeExpenseProgressProps) {
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const remainingPercentage = Math.max(
    0,
    ((totalIncome - totalExpenses) / totalIncome) * 100
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Monthly Overview
      </h2>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Total Income: ${totalIncome.toFixed(2)}</span>
          <span>Remaining: ${(totalIncome - totalExpenses).toFixed(2)}</span>
        </div>

        <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500"
            style={{ width: `${remainingPercentage}%` }}
          />
          <div
            className="absolute top-0 right-0 h-full bg-red-500 transition-all duration-500"
            style={{ width: `${100 - remainingPercentage}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Expenses: ${totalExpenses.toFixed(2)}</span>
          <span>{remainingPercentage.toFixed(1)}% Remaining</span>
        </div>
      </div>
    </div>
  );
}
