import React, { useState } from "react";
import { format } from "date-fns";
import { PlusCircle, DollarSign } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface TransactionFormProps {
  type: "expense" | "income";
  onSuccess: () => void;
  icon: React.ReactNode;
  title: string;
  categories: string[];
}

export function TransactionForm({
  type,
  onSuccess,
  icon,
  title,
  categories,
}: TransactionFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [transaction, setTransaction] = useState({
    amount: "",
    category: categories[0],
    date: format(new Date(), "yyyy-MM-dd"),
    description: type === "expense" ? "" : undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("You must be logged in to add transactions");

      const { error: submitError } = await supabase
        .from(type === "expense" ? "expenses" : "income")
        .insert([
          {
            amount: parseFloat(transaction.amount),
            [type === "expense" ? "category" : "source"]: transaction.category,
            description: transaction.description,
            date: transaction.date,
            user_id: user.id,
          },
        ]);

      if (submitError) throw submitError;

      setTransaction({
        amount: "",
        category: categories[0],
        date: format(new Date(), "yyyy-MM-dd"),
        description: type === "expense" ? "" : undefined,
      });

      onSuccess();
      setSuccess(
        `${type === "expense" ? "Expense" : "Income"} added successfully!`
      );
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(`Error adding ${type}:`, err);
      setError(
        err instanceof Error
          ? err.message
          : `Failed to add ${type}. Please try again.`
      );
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-1 ${
          type === "expense"
            ? "md:grid-cols-2 lg:grid-cols-4"
            : "md:grid-cols-3"
        } gap-4`}
      >
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="amount"
              required
              value={transaction.amount}
              onChange={(e) =>
                setTransaction({ ...transaction, amount: e.target.value })
              }
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {type === "expense" ? "Category" : "Source"}
          </label>
          <select
            id="category"
            required
            value={transaction.category}
            onChange={(e) =>
              setTransaction({ ...transaction, category: e.target.value })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={transaction.date}
            onChange={(e) =>
              setTransaction({ ...transaction, date: e.target.value })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {type === "expense" && (
          <div className="md:col-span-2 lg:col-span-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes
            </label>
            <textarea
              id="description"
              value={transaction.description}
              onChange={(e) =>
                setTransaction({ ...transaction, description: e.target.value })
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows={1}
              placeholder="Optional notes..."
            />
          </div>
        )}

        <div className={type === "expense" ? "col-span-full" : ""}>
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add {type === "expense" ? "Expense" : "Income"}
          </button>
        </div>
      </form>
    </div>
  );
}
