import React, { useState, useEffect } from "react";
import { Receipt } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Expense, Income } from "../types";
import { TransactionForm } from "../components/shared/TransactionForm";
import { TransactionList } from "../components/shared/TransactionList";
import { ExpensesPieChart } from "../components/shared/ExpensesPieChart";
import { IncomeExpenseProgress } from "../components/shared/IncomeExpenseProgress";

const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Housing",
  "Utilities",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Education",
  "Travel",
  "Bills",
  "Other",
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const { data, error } = await supabase
        .from("income")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setIncomes(data || []);
    } catch (err) {
      console.error("Error fetching income:", err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("date", { ascending: false })
        .limit(10);

      if (error) throw error;
      setExpenses(data || []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <TransactionForm
            type="expense"
            onSuccess={fetchExpenses}
            icon={<Receipt className="mr-2" />}
            title="Track New Expense"
            categories={EXPENSE_CATEGORIES}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <IncomeExpenseProgress incomes={incomes} expenses={expenses} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Recent Expenses
          </h2>
          <div className="max-h-[400px] overflow-y-auto">
            <TransactionList type="expense" transactions={expenses} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <ExpensesPieChart expenses={expenses} />
        </div>
      </div>
    </>
  );
}
