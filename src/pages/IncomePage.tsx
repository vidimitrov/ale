import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Income } from "../types";
import { TransactionForm } from "../components/shared/TransactionForm";
import { TransactionList } from "../components/shared/TransactionList";

const INCOME_SOURCES = [
  "Salary",
  "Freelance",
  "Investments",
  "Business",
  "Rental",
  "Other",
];

export default function IncomePage() {
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const { data, error } = await supabase
        .from("income")
        .select("*")
        .order("date", { ascending: false })
        .limit(10);

      if (error) throw error;
      setIncomes(data || []);
    } catch (err) {
      console.error("Error fetching income:", err);
    }
  };

  return (
    <>
      <TransactionForm
        type="income"
        onSuccess={fetchIncomes}
        icon={<Briefcase className="mr-2" />}
        title="Record New Income"
        categories={INCOME_SOURCES}
      />

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Recent Income</h2>
        <TransactionList type="income" transactions={incomes} />
      </div>
    </>
  );
}
