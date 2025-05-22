import React, { useState } from "react";
import { format } from "date-fns";
import type { Expense, Income } from "../../types";
import { Receipt, X } from "lucide-react";

interface TransactionListProps {
  type: "expense" | "income";
  transactions: (Expense | Income)[];
  onDelete?: (id: string) => Promise<void>;
}

export function TransactionList({
  type,
  transactions,
  onDelete,
}: TransactionListProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  const openReceiptModal = (imageUrl: string) => {
    setSelectedReceipt(imageUrl);
  };

  const closeReceiptModal = () => {
    setSelectedReceipt(null);
  };

  if (transactions.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
        You haven't tracked any {type === "expense" ? "expenses" : "income"}{" "}
        yet.
      </p>
    );
  }

  return (
    <div>
      {/* Receipt Image Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Receipt Image
              </h3>
              <button
                onClick={closeReceiptModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 flex-grow flex items-center justify-center">
              <img
                src={selectedReceipt}
                alt="Receipt"
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 space-y-2"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {format(new Date(transaction.date), "MMM d, yyyy")}
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {"category" in transaction
                    ? transaction.category
                    : transaction.source}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm font-medium ${
                    type === "expense"
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {type === "expense" ? "-" : "+"}$
                  {transaction.amount.toFixed(2)}
                </span>
                {type === "expense" &&
                  "receipt_image_url" in transaction &&
                  transaction.receipt_image_url && (
                    <button
                      onClick={() =>
                        openReceiptModal(transaction.receipt_image_url!)
                      }
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      title="View Receipt"
                    >
                      <Receipt className="h-5 w-5" />
                    </button>
                  )}
                <button
                  onClick={() => onDelete?.(transaction.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  title="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {type === "expense" &&
              "description" in transaction &&
              transaction.description && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {transaction.description}
                </div>
              )}
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white pb-6">
          Recent {type === "expense" ? "expenses" : "incomes"}
        </h2>
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
              {type === "expense" && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Receipt
                </th>
              )}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
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
                  {type === "expense" ? "-" : "+"}$
                  {transaction.amount.toFixed(2)}
                </td>
                {type === "expense" && "description" in transaction && (
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {transaction.description || "-"}
                  </td>
                )}
                {type === "expense" && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {"receipt_image_url" in transaction &&
                    transaction.receipt_image_url ? (
                      <button
                        onClick={() =>
                          openReceiptModal(transaction.receipt_image_url!)
                        }
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View Receipt"
                      >
                        <Receipt className="h-5 w-5" />
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <button
                    onClick={() => onDelete?.(transaction.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
