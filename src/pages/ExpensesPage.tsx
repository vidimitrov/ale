import React, { useState, useEffect } from "react";
import { Receipt } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Expense } from "../types";
import { TransactionForm } from "../components/shared/TransactionForm";
import { TransactionList } from "../components/shared/TransactionList";

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
  "Other",
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

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
      <TransactionForm
        type="expense"
        onSuccess={fetchExpenses}
        icon={<Receipt className="mr-2" />}
        title="Track New Expense"
        categories={EXPENSE_CATEGORIES}
      />

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Recent Expenses</h2>
        <TransactionList type="expense" transactions={expenses} />
      </div>
    </>
  );
}
