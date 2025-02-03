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
      <p className="text-gray-500 text-center py-8">
        You haven't tracked any {type === "expense" ? "expenses" : "income"}{" "}
        yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {type === "expense" ? "Category" : "Source"}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            {type === "expense" && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Notes
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {format(new Date(transaction.date), "MMM d, yyyy")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {"category" in transaction
                  ? transaction.category
                  : transaction.source}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  type === "expense" ? "text-red-600" : "text-green-600"
                }`}
              >
                {type === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
              </td>
              {type === "expense" && "description" in transaction && (
                <td className="px-6 py-4 text-sm text-gray-500">
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
