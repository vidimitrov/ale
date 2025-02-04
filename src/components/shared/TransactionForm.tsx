import React, { useState } from "react";
import { format } from "date-fns";
import { PlusCircle, DollarSign } from "lucide-react";
import { supabase } from "../../lib/supabase";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
import toast from "react-hot-toast";

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
  const [transaction, setTransaction] = useState({
    amount: "",
    category: categories[0],
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
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

      // Get current income and expenses for balance check
      const { data: incomeData } = await supabase
        .from("income")
        .select("amount");
      const { data: expenseData } = await supabase
        .from("expenses")
        .select("amount");

      const { error: submitError } = await supabase
        .from(type === "expense" ? "expenses" : "income")
        .insert([
          {
            amount: parseFloat(transaction.amount),
            [type === "expense" ? "category" : "source"]: transaction.category,
            ...(type === "expense" && { description: transaction.description }),
            date: transaction.date,
            user_id: user.id,
          },
        ]);

      if (submitError) throw submitError;

      setTransaction({
        amount: "",
        category: categories[0],
        date: format(new Date(), "yyyy-MM-dd"),
        description: "",
      });

      onSuccess();

      // Check balance after expense is added
      if (type === "expense" && incomeData && expenseData) {
        const totalIncome = incomeData.reduce(
          (sum, inc) => sum + inc.amount,
          0
        );
        const totalExpenses = expenseData.reduce(
          (sum, exp) => sum + exp.amount,
          0
        );
        const remainingPercentage =
          ((totalIncome - totalExpenses) / totalIncome) * 100;

        if (remainingPercentage < 10) {
          try {
            const response = await fetch("/api/send-balance-notification", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                remainingBalance: totalIncome - totalExpenses,
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
        }
      }

      toast.success(
        `${type === "expense" ? "Expense" : "Income"} added successfully!`,
        {
          style: {
            background: "#10B981",
            color: "#fff",
          },
        }
      );
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
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-black dark:text-white">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>

      {error && (
        <div className="mb-4 bg-primary-light dark:bg-primary-dark border border-primary dark:border-primary-light text-primary-dark dark:text-primary-light px-4 py-3 rounded-md">
          {error}
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
            className="block text-sm font-medium text-black dark:text-white mb-1"
          >
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-black dark:text-white" />
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
              className="pl-10 block w-full rounded-md border-primary dark:border-primary-light focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-black dark:text-white mb-1"
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
            className="block w-full rounded-md border-primary dark:border-primary-light focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white sm:text-sm"
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
            className="block text-sm font-medium text-black dark:text-white mb-1"
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
            className="block w-full rounded-md border-primary dark:border-primary-light focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        {type === "expense" && (
          <div className="md:col-span-2 lg:col-span-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-black dark:text-white mb-1"
            >
              Notes
            </label>
            <textarea
              id="description"
              value={transaction.description}
              onChange={(e) =>
                setTransaction({ ...transaction, description: e.target.value })
              }
              className="block w-full rounded-md border-primary dark:border-primary-light focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white sm:text-sm"
              rows={1}
              placeholder="Optional notes..."
            />
          </div>
        )}

        <div className={type === "expense" ? "col-span-full" : ""}>
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 dark:hover:bg-primary-light dark:text-white dark:hover:text-gray-600"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add {type === "expense" ? "Expense" : "Income"}
          </button>
        </div>
      </form>
    </div>
  );
}
