import React from "react";
import { format } from "date-fns";
import type { Expense, Income } from "../../types";

interface TransactionListProps {
  type: "expense" | "income";
  transactions: (Expense | Income)[];
}

export function TransactionList({ type, transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
        You haven't tracked any {type === "expense" ? "expenses" : "income"}{" "}
        yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              {type === "expense" ? "Category" : "Source"}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Amount
            </th>
            {type === "expense" && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Notes
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {format(new Date(transaction.date), "MMM d, yyyy")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {"category" in transaction
                  ? transaction.category
                  : transaction.source}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  type === "expense"
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {type === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
              </td>
              {type === "expense" && "description" in transaction && (
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {transaction.description || "-"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
