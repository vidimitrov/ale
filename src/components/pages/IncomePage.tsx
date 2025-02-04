import React, { useEffect, useState } from "react";
import {
  showDeleteConfirmation,
  showDeleteSuccess,
} from "../../utils/deleteConfirmation";
import Swal from "sweetalert2";
import { TransactionForm } from "../shared/TransactionForm";
import { TransactionList } from "../shared/TransactionList";
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

  const handleDelete = async (id: string) => {
    const confirmed = await showDeleteConfirmation({
      text: "Are you sure you want to delete this income?",
    });

    if (confirmed) {
      try {
        const { error } = await supabase.from("income").delete().eq("id", id);

        if (error) throw error;
        await showDeleteSuccess();
        await fetchData();
      } catch (error) {
        console.error("Error deleting income:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the income. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      }
    }
  };

  const fetchData = async () => {
    try {
      const { data: incomesData } = await supabase
        .from("income")
        .select("*")
        .order("date", { ascending: false });

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
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <TransactionForm
          type="income"
          onSuccess={fetchData}
          icon={<span className="text-2xl">💵</span>}
          title="Add Income"
          categories={incomeSources}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg h-[500px]">
        <div className="h-full overflow-auto">
          <TransactionList
            type="income"
            transactions={incomes}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
