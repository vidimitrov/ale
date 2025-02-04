import React, { useEffect } from "react";
import type { Income, Expense } from "../../types";
import { useAuth } from "../../hooks/useAuth";

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
  const { user } = useAuth();
  const remainingBalance = totalIncome - totalExpenses;
  const remainingPercentage = Math.max(
    0,
    (remainingBalance / totalIncome) * 100
  );

  useEffect(() => {
    const sendLowBalanceNotification = async () => {
      if (!user?.email || remainingPercentage > 10) return;

      try {
        const response = await fetch("/api/send-balance-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remainingBalance,
            remainingPercentage,
            userEmail: user.email,
          }),
        });

        if (!response.ok) {
          console.error("Failed to send balance notification");
        }
      } catch (error) {
        console.error("Error sending balance notification:", error);
      }
    };

    sendLowBalanceNotification();
  }, [remainingPercentage, remainingBalance, user?.email]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Monthly Overview
      </h2>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Total Income: ${totalIncome.toFixed(2)}</span>
          <span>Remaining: ${remainingBalance.toFixed(2)}</span>
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
