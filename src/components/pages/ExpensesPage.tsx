import React, { useEffect, useState } from "react";
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
            <TransactionList type="expense" transactions={expenses} />
          </div>
        </div>

        {/* Right Column - Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg h-[500px]">
          <ExpensesPieChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
