import React, { useEffect, useState } from "react";
import { TransactionForm } from "../shared/TransactionForm";
import { TransactionList } from "../shared/TransactionList";
import { IncomeExpenseProgress } from "../shared/IncomeExpenseProgress";
import { supabase } from "../../lib/supabase";

const incomeSources = [
  "Salary",
  "Freelance",
  "Investments",
  "Business",
  "Rental",
  "Other",
];

export default function IncomePage() {
  const [incomes, setIncomes] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const { data: incomesData } = await supabase
        .from("income")
        .select("*")
        .order("date", { ascending: false });

      const { data: expensesData } = await supabase
        .from("expenses")
        .select("*")
        .order("date", { ascending: false });

      setIncomes(incomesData || []);
      setExpenses(expensesData || []);
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
            type="income"
            onSuccess={fetchData}
            icon={<span className="text-2xl">💵</span>}
            title="Add Income"
            categories={incomeSources}
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
            <TransactionList type="income" transactions={incomes} />
          </div>
        </div>

        {/* Right Column - Coming Soon */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg h-[500px] flex items-center justify-center">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p className="text-lg font-medium">Income Distribution</p>
            <p className="mt-2">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
