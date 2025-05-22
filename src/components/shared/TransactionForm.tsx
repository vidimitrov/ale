import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { PlusCircle, DollarSign, Upload, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
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
    receiptImage: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Clean up the object URL when component unmounts or when a new image is selected
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // Clear previous preview if exists
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setTransaction({ ...transaction, receiptImage: file });
    } else {
      setImagePreview(null);
      setTransaction({ ...transaction, receiptImage: null });
    }
  };

  const clearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setTransaction({ ...transaction, receiptImage: null });

    // Reset the file input
    const fileInput = document.getElementById(
      "receipt-image"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const uploadReceiptImage = async (userId: string): Promise<string | null> => {
    if (!transaction.receiptImage) return null;

    try {
      // Generate a unique file name with timestamp and original extension
      const fileExt = transaction.receiptImage.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("ale-images")
        .upload(fileName, transaction.receiptImage, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Storage upload error:", error);
        throw error;
      }

      // Get the public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from("ale-images").getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading receipt image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(transaction.receiptImage !== null);

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

      // Upload receipt image if provided (only for expenses)
      let receiptImageUrl = null;
      if (type === "expense" && transaction.receiptImage) {
        receiptImageUrl = await uploadReceiptImage(user.id);
      }

      const { error: submitError } = await supabase
        .from(type === "expense" ? "expenses" : "income")
        .insert([
          {
            amount: parseFloat(transaction.amount),
            [type === "expense" ? "category" : "source"]: transaction.category,
            ...(type === "expense" && { description: transaction.description }),
            ...(type === "expense" &&
              receiptImageUrl && { receipt_image_url: receiptImageUrl }),
            date: transaction.date,
            user_id: user.id,
          },
        ]);

      if (submitError) throw submitError;

      // Clear form and image preview
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setTransaction({
        amount: "",
        category: categories[0],
        date: format(new Date(), "yyyy-MM-dd"),
        description: "",
        receiptImage: null,
      });
      setImagePreview(null);
      setIsUploading(false);

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
      setIsUploading(false);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg">
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

        {type === "expense" && (
          <div className="col-span-full">
            <label
              htmlFor="receipt-image"
              className="block text-sm font-medium text-black dark:text-white mb-1"
            >
              Receipt Image (optional)
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Upload className="h-5 w-5 text-black dark:text-white" />
                </div>
                <input
                  type="file"
                  id="receipt-image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="pl-10 block w-full rounded-md border-primary dark:border-primary-light focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white sm:text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                />
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                  aria-label="Clear image"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {imagePreview && (
              <div className="mt-2 relative">
                <div className="relative w-40 h-40 border border-primary dark:border-primary-light rounded-md overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Receipt preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className={type === "expense" ? "col-span-full" : ""}>
          <button
            type="submit"
            disabled={isUploading}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 dark:hover:bg-primary-light dark:text-white dark:hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5 mr-2" />
                Add {type === "expense" ? "Expense" : "Income"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
