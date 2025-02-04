import React, { useEffect, useState } from "react";
import {
  showDeleteConfirmation,
  showDeleteSuccess,
} from "../../utils/deleteConfirmation";
import Swal from "sweetalert2";
import { TransactionForm } from "../shared/TransactionForm";
import { TransactionList } from "../shared/TransactionList";
import { ExpensesPieChart } from "../shared/ExpensesPieChart";
import { IncomeExpenseProgress } from "../shared/IncomeExpenseProgress";
import { supabase } from "../../lib/supabase";

const expenseCategories = [
  "Food & Dining",
  "Transportation",
  "Housing",
  "Utilities",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Other",
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [incomes, setIncomes] = useState<any[]>([]);

  const handleDelete = async (id: string) => {
    const confirmed = await showDeleteConfirmation({
      text: "Are you sure you want to delete this expense?",
    });

    if (confirmed) {
      try {
        const { error } = await supabase.from("expenses").delete().eq("id", id);

        if (error) throw error;
        await showDeleteSuccess();
        await fetchData();
      } catch (error) {
        console.error("Error deleting expense:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the expense. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      }
    }
  };

  const fetchData = async () => {
    try {
      const { data: expensesData } = await supabase
        .from("expenses")
        .select("*")
        .order("date", { ascending: false });

      const { data: incomesData } = await supabase
        .from("income")
        .select("*")
        .order("date", { ascending: false });

      setExpenses(expensesData || []);
      setIncomes(incomesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <TransactionForm
            type="expense"
            onSuccess={fetchData}
            icon={<span className="text-2xl">💰</span>}
            title="Add Expense"
            categories={expenseCategories}
          />
        </div>

        {/* Right Column */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <IncomeExpenseProgress incomes={incomes} expenses={expenses} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Transaction List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg h-[500px]">
          <div className="h-full overflow-auto">
            <TransactionList
              type="expense"
              transactions={expenses}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {/* Right Column - Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <ExpensesPieChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
